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
const isfindingPackage = Boolean(process.env.PACKAGE_TYPE);
const regexp = new RegExp(process.env.PACKAGE_TYPE || "alpha-9689ff", "i");
let command = process.argv.slice(2);
const keys = Object.keys(deps);
const desiredDeps = keys.filter((key) => {
  let currentlyValue = key;
  if (isfindingPackage) {
    currentValue = deps[key];
  }
  return regexp.test(currentlyValue);
});

command = command.join(" ") || "npm i";
const output = `${command} ${desiredDeps.join("@next ")}@next`;

if (/npm i @next/.test(output))
  return console.log(
    "We found your package.json but it looks like there are no packages that match what you're looking for in this package.json."
  );

(async () => {
  const { stdout } = await execa("echo", [output]);
  console.log(stdout);
})();
