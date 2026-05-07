#!/usr/bin/env node

import "dotenv/config";

import { Command } from "commander";
import inquirer from "inquirer";
import { simpleGit } from "simple-git";

import { getStagedDiff } from "./git.js";
import { generateCommitMessage } from "./ai.js";

const git = simpleGit();

const program = new Command();

program
    .name("gs")
    .description("AI-powered Git commit message generator using Llama and GPT models")
    .version("1.0.9")
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
            console.log(suggestion);
            console.log("");

            const { action } = await inquirer.prompt([
                {
                    type: "list",
                    name: "action",
                    message: "What would you like to do?",
                    choices: [
                        { name: "✅ Yes", value: "yes" },
                        { name: "🔄 Retry", value: "retry" },
                        { name: "❌ No", value: "no" },
                    ],
                    default: "yes",
                },
            ]);

            if (action === "yes") {
                confirmed = true;
            } else if (action === "retry") {
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