const fs = require("fs");
const { PACKAGE_FILE } = require("./constants");

const argv = require("minimist")(process.argv.slice(2));

const checkVersionType = (givenVersion) => {
  return argv.beta !== undefined ? /zz-next/.test(givenVersion) : true;
};

const makeUpdatedGatsbyDeps = (arrayOfDeps) => {
  return arrayOfDeps.reduce((acc, curr) => {
    const { name, version } = curr;
    if (name && version && checkVersionType(version)) {
      acc[name] = `^${version}`;
    }
    return acc;
  }, {});
};

const writeNewPackage = async (newPackage) => {
  await fs.writeFile(PACKAGE_FILE, newPackage, (err) => {
    if (err) throw err;
  });
};

module.exports = {
  writeNewPackage,
  makeUpdatedGatsbyDeps,
};
