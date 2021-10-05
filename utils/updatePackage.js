const fs = require("fs");
const { PACKAGE_FILE } = require("./constants");

const makeUpdatedGatsbyDeps = (arrayOfDeps) => {
  return arrayOfDeps.reduce((acc, curr) => {
    const { name, version } = curr;
    if (name && version && /zz-next/.test(version)) {
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
