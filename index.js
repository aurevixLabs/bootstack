#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import {createSpinner} from "nanospinner";
import {createReactViteProject} from "./src/templates/reactVite.js";

async function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-app",
      validate: (input) => {
        if (!input.trim()) {
          return "Project name cannot be empty";
        }
        if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
          return "Use only letters, numbers, hyphens, and underscores";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "useTypeScript",
      message: "Choose language:",
      choices: [
        {name: "JavaScript", value: false},
        {name: "TypeScript", value: true},
      ],
      default: false,
    },
  ]);
}

async function run() {
  console.log(
    chalk.cyan("\nSession 1: Minimal CLI Generator for testing purpose...\n"),
  );

  const answers = await promptUser();

  const spinner = createSpinner("Creating project...").start();

  try {
    await createReactViteProject(answers.projectName, answers.useTypeScript);
    spinner.success({text: "Project created successfully"});

    console.log(chalk.green("\nNext steps:"));
    console.log(chalk.white(`  cd ${answers.projectName}`));
    console.log(chalk.white("  npm run dev\n"));

    console.log(chalk.white(" Happy coding babu... \n"));
  } catch (error) {
    spinner.error({text: `Failed: ${error.message}`});
    process.exit(1);
  }
}

run();
