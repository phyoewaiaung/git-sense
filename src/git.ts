import { simpleGit } from "simple-git";

const git = simpleGit();

const MAX_DIFF_LENGTH = 12000;

export async function getStagedDiff() {
    const diff = await git.raw([
        "diff",
        "--cached",
        "--",
        ":(exclude)package-lock.json",
        ":(exclude)yarn.lock",
        ":(exclude)pnpm-lock.yaml",
    ]);

    return diff.slice(0, MAX_DIFF_LENGTH);
}