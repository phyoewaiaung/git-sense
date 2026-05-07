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
        console.log(chalk.bold.cyan("\n🚀 Welcome to GitSense CLI!" + " Version(" + program.version() + ")"));
        console.log(chalk.dim("The intelligent, zero-config Git assistant.\n"));
        console.log(`GitSense traces your staged changes and uses AI to generate`);
        console.log(`meaningful, conventional commit messages instantly.\n`);

        console.log(chalk.bold("Available Commands:"));
        console.log(`  ${chalk.cyan("gs commit")}    Analyze changes and generate a commit message`);
        console.log(`  ${chalk.cyan("gs --help")}    Show all options and help information\n`);

        console.log(chalk.dim("Tip: Run 'gs commit' to get started with your first AI commit!\n"));
    });

program
    .command("commit")
    .description("Generate AI commit message")
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