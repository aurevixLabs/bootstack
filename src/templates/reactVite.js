import chalk from "chalk";
import path from "path";
import {runCommand} from "../utils/runCommand.js";

export async function createReactViteProject(projectName, useTypeScript) {
  const template = useTypeScript ? "react-ts" : "react";
  const command = `npm create vite@latest ${projectName} -- --template ${template}`;

  console.log(chalk.dim(`\n  Running: ${command}\n`));
  await runCommand(command, process.cwd());

  const projectPath = path.join(process.cwd(), projectName);

  console.log(chalk.dim("  📦 Installing dependencies..."));
  await runCommand("npm install", projectPath);
  console.log(chalk.dim("  ✓ Dependencies installed"));
}
