#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const cliSelect = require("cli-select");
const { execSync } = require("child_process");

const currentDir = process.cwd();
const packageJsonPath = path.resolve(currentDir, "package.json");

/**
 * Interactive mode
 */
const runInteractive = (data) => {
  const env = Object.assign({}, process.env);
  env.PATH =
    path.resolve("./node_modules/.bin") +
    (process.platform === "win32" ? ";" : ":") +
    env.PATH;

  const options = {
    cleanup: true,
    selected: "●",
    unselected: "○",
    values: Object.keys(data.scripts).map((key) => ({
      command: data.scripts[key],
      name: key,
    })),
    valueRenderer: (item, selected) => {
      if (selected) {
        return "\033[4m" + item.name + "\033[0m" + " — " + item.command;
      }

      return `${item.name} — ${item.command}`;
    },
  };

  cliSelect(options, (result) => {
    if (result.id !== null) {
      execSync(result.value.command, {
        cwd: process.cwd(),
        env: env,
        stdio: "inherit",
      });
    } else {
      console.log("Bye");
    }
  });
};

// Start
(() => {
  if (fs.existsSync(packageJsonPath)) {
    try {
      const data = require(packageJsonPath);
      if (data && data.scripts) {
        console.log("package.json scripts:");
        runInteractive(data);
      } else {
        console.error("package.json does not contains any scripts 🤔");
      }
    } catch (err) {
      console.error("There is something wrong with your package.json 🤔");
    }
  } else {
    console.error("package.json is not exists in current folder 😞");
  }
})();
