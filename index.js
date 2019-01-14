#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const cliSelect = require("cli-select");
const { exec } = require("child_process");

const currentDir = process.cwd();
const packageJsonPath = path.resolve(currentDir, "package.json");
const isInteractive = process.argv.includes("-i");

/**
 * Interactive mode
 */
const runInteractive = data => {
  const env = Object.assign({}, process.env);
  env.PATH =
    path.resolve("./node_modules/.bin") +
    (process.platform === "win32" ? ";" : ":") +
    env.PATH;

  const options = {
    cleanup: true,
    selected: "●",
    unselected: "○",
    values: Object.keys(data.scripts).map(key => ({
      command: data.scripts[key],
      name: key
    })),
    valueRenderer: (item, selected) => {
      if (selected) {
        return "\033[4m" + item.name + "\033[0m" + " — " + item.command;
      }

      return `${item.name} — ${item.command}`;
    }
  };

  cliSelect(options, result => {
    if (result.id !== null) {
      const child = exec(result.value.command, {
        cwd: process.cwd(),
        env: env
      });

      child.stdout.on("data", function(data) {
        console.log(data.toString());
      });
    } else {
      console.log("Bye");
    }
  });
};

/**
 * Static mode
 */
const runStatic = data => {
  Object.keys(data.scripts).forEach(key => {
    console.log(`* ${key} (${data.scripts[key]})`);
  });
};

const run = () => {
  if (fs.existsSync(packageJsonPath)) {
    try {
      const data = require(packageJsonPath);
      if (data && data.scripts) {
        console.log("package.json scripts:");
        isInteractive ? runInteractive(data) : runStatic(data);
      } else {
        console.error("package.json does not contains any scripts 🤔");
      }
    } catch (err) {
      console.error("There is something wrong with your package.json 🤔");
    }
  } else {
    console.error("package.json is not exists in current folder 😞");
  }
};

run();
