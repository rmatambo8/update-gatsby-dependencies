#!/usr/bin/env node

const execa = require("execa");

const targetDir = process.cwd();

const deps = require(`${targetDir}/package.json`).dependencies;
let command = process.argv.slice(2);
const keys = Object.keys(deps);
const alphaDeps = keys.filter((key) => /alpha-9689ff/.test(deps[key]));
command = command.join(" ") || "npm i";
const output = `${command} ${alphaDeps.join("@next ")}@next`;

(async () => {
  const { stdout } = await execa("echo", [output]);
  console.log(stdout);
})();
