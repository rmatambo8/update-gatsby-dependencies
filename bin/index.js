#!/usr/bin/env node

const execa = require("execa");
const {
  updatePackageJSON,
  findBetaPackages,
} = require("../src/updatePackageJSON");
var argv = require("minimist")(process.argv.slice(2));

if (argv.package !== undefined) {
  return updatePackageJSON();
}

if (argv.install !== undefined) {
  return findBetaPackages((updatedDependencies, field) => {
    console.log(
      "npm i",
      Object.keys(updatedDependencies).join("@next ") + "@next"
    );
  });
}

// handle config options: Load all environment variables and arguments that are needed that are needed
const version = `@${process.env.GATSBY_VERSION_TAG || "next"}`;
const isfindingPackage = Boolean(
  process.env.PACKAGE_NAME || process.env.PACKAGE_TYPE
);
const packageNameRegex = new RegExp(
  process.env.PACKAGE_NAME || process.env.PACKAGE_TYPE,
  "i"
);
const packageVersionRegex = new RegExp(
  process.env.PACKAGE_VERSION || "alpha-9689ff",
  "i"
);
const command = process.argv.slice(2).join(" ") || "npm i";
const projectRoot = process.cwd();

// find package.json file and its dependencies
let deps;
try {
  deps = require(`${projectRoot}/package.json`).dependencies;
} catch (error) {
  return console.log(
    "you must be in a directory that has a package.json file at the same level"
  );
}

// find the desired dependencies based on config
const keys = Object.keys(deps);
const desiredDeps = keys.filter((key) => {
  let currentValue = key;
  if (!isfindingPackage) {
    currentValue = deps[currentValue];
    return packageVersionRegex.test(currentValue);
  } else if (isfindingPackage && Boolean(process.env.PACKAGE_VERSION)) {
    return (
      packageNameRegex.test(currentValue) &&
      packageVersionRegex.test(deps[currentValue])
    );
  }
  return packageNameRegex.test(currentValue);
});

// test that the dependencies were found and create the cli command
if (desiredDeps.length === 0)
  return console.log(
    "We found your package.json but it looks like there are no packages that match what you're looking for in this package.json, by default, this command checks for dependencies that have a version: alpha-9689ff."
  );

const output = `${command} ${desiredDeps.join(`${version} `)}${version}`;

// echo the command to the console
(async () => {
  const { stdout } = await execa("echo", [output]);
  console.log(stdout);
})();
