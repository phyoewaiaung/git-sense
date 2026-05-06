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
    .name("aic")
    .description("AI-powered git commit generator")
    .version("1.0.6");

program
    .command("commit")
    .description("Generate AI commit message")
    .action(async () => {
        const diff = await getStagedDiff();

        if (!diff.trim()) {
            console.log("No staged changes found.");
            process.exit(0);
        }

        console.log("Analyzing staged changes...\n");

        const suggestion = await generateCommitMessage(diff);

        console.log("Suggested commit:\n");
        console.log(suggestion);
        console.log("");

        const { confirm } = await inquirer.prompt([
            {
                type: "confirm",
                name: "confirm",
                message: "Commit with this message?",
            },
        ]);

        if (!confirm) {
            console.log("Cancelled.");
            process.exit(0);
        }

        await git.commit(suggestion!);

        console.log("Commit created successfully.");
    });

program.parse();