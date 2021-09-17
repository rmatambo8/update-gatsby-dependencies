#!/usr/bin/env node

const execa = require("execa");

const targetDir = process.cwd();
let deps;
try {
  deps = require(`${targetDir}/package.json`).dependencies;
} catch (error) {
  return console.log(
    "you must be in a directory that has a package.json file at the same level"
  );
}

let command = process.argv.slice(2);
const keys = Object.keys(deps);
const alphaDeps = keys.filter((key) => /alpha-9689ff/.test(deps[key]));
command = command.join(" ") || "npm i";
const output = `${command} ${alphaDeps.join("@next ")}@next`;

if (/npm i @next/.test(output))
  return console.log("must have a package to install");

(async () => {
  const { stdout } = await execa("echo", [output]);
  console.log(stdout);
})();
