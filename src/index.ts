#!/usr/bin/env node

import "dotenv/config";

import { Command } from "commander";
import inquirer from "inquirer";
import { simpleGit } from "simple-git";
import chalk from "chalk";

import { getStagedDiff } from "./git.js";
import { generateCommitMessage } from "./ai.js";

const git = simpleGit();

const program = new Command();

program
    .name("gs")
    .description("AI-powered Git commit message generator using Llama and GPT models")
    .version("1.0.10")
    .action(() => {
        program.help();
    });

program
    .command("commit", { isDefault: true })
    .description("Generate AI commit message (default)")
    .action(async () => {
        const diff = await getStagedDiff();

        if (!diff.trim()) {
            console.log("No staged changes found.");
            process.exit(0);
        }

        let confirmed = false;
        let suggestion = "";

        while (!confirmed) {
            console.log("Analyzing staged changes...\n");
            suggestion = (await generateCommitMessage(diff)) || "";

            console.log("Suggested commit:\n");
            console.log(chalk.bold.green(suggestion));
            console.log(
                `\n(${chalk.bold.cyan("y")}/${chalk.bold.cyan("enter")} to commit, ` +
                `${chalk.bold.yellow("r")} to retry, ` +
                `${chalk.bold.red("n")} to cancel)\n`
            );

            const { action } = await inquirer.prompt([
                {
                    type: "input",
                    name: "action",
                    message: "What would you like to do?",
                    default: "y",
                    validate: (input: string) => {
                        const val = input.toLowerCase().trim();
                        if (!val || ["y", "yes", "r", "retry", "n", "no"].includes(val)) {
                            return true;
                        }
                        return "Please enter y, r, or n";
                    },
                },
            ]);

            const normalizedAction = action.toLowerCase().trim() || "y";

            if (normalizedAction === "y" || normalizedAction === "yes") {
                confirmed = true;
            } else if (normalizedAction === "r" || normalizedAction === "retry") {
                console.log("\nRegenerating...\n");
                continue;
            } else {
                console.log("Cancelled.");
                process.exit(0);
            }
        }

        await git.commit(suggestion);
        console.log("Commit created successfully.");
    });

program.parse();