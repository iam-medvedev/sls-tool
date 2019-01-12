#!/usr/bin/env node
const path = require("path");
const fs = require("fs");

const currentDir = process.cwd();
const packageJsonPath = path.resolve(currentDir, "package.json");

if (fs.existsSync(packageJsonPath)) {
  try {
    const data = require(packageJsonPath);
    if (data && data.scripts) {
      console.log("package.json scripts:");
      Object.keys(data.scripts).forEach(key => {
        console.log(`* ${key} (${data.scripts[key]})`);
      });
    } else {
      console.error("package.json does not contains any scripts 🤔");
    }
  } catch (err) {
    console.error("There is something wrong with your package.json 🤔");
  }
} else {
  console.error("package.json is not exists in current folder 😞");
}
