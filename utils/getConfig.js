const { PACKAGE_FILE } = require("./constants");

const argv = require("minimist")(process.argv.slice(2));

const projectRoot = process.cwd();
// find package.json file and its dependencies
let package;
try {
  package = require(PACKAGE_FILE);
} catch (error) {
  console.log(
    "you must be in a directory that has a package.json file at the same level"
  );
  process.exit();
}
// handle config options: Load all environment variables and arguments that are needed that are needed
const version = `@${
  process.env.GATSBY_VERSION_TAG || argv.version || argv.v || `next`
} `;
const isfindingPackage = Boolean(
  process.env.PACKAGE_NAME || process.env.PACKAGE_TYPE
);
const packageNameRegex = new RegExp(
  process.env.PACKAGE_NAME || process.env.PACKAGE_TYPE,
  "i"
);
const packageVersionRegex = new RegExp(
  process.env.PACKAGE_VERSION || argv.version || "alpha-9689ff",
  "i"
);

module.exports = {
  version,
  isfindingPackage,
  packageNameRegex,
  packageVersionRegex,
  projectRoot,
  package,
};
