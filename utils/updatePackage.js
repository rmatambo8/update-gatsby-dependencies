const fs = require("fs");
const PACKAGE_FILE = `${process.cwd()}/package.json`;
const makeUpdatedGatsbyDeps = (arrayOfDeps) => {
  return arrayOfDeps.reduce((acc, curr) => {
    const { name, version } = curr;
    if (name && version) {
      acc[name] = `^${version}`;
    }
    return acc;
  }, {});
};
const updatePackageFile = (updatedGatsbyDeps, field = `dependencies`) => {
  fs.readFile(PACKAGE_FILE, (err, data) => {
    if (err) throw err;
    const newPackage = makeNewPackage(data, field, updatedGatsbyDeps);
    writeNewPackage(newPackage);
  });
};
const makeNewPackage = (data, field, updatedGatsbyDeps) => {
  const package = JSON.parse(data);
  package[field] = {
    ...package[field],
    ...updatedGatsbyDeps,
  };
  const newPackage = JSON.stringify(package, null, 2);
  return newPackage;
};
const writeNewPackage = (newPackage) => {
  fs.writeFile(PACKAGE_FILE, newPackage, (err) => {
    if (err) throw err;
  });
};

const format = (field) => {
  return field.replace("D", " d");
};

const getPackageNames = (queue) => {
  return Promise.all(
    queue
      .list()
      .map((repo) => repo.version(process.env.GATSBY_VERSION_TAG || "next"))
  );
};

const updateDependencies = async (arrayOfDeps, queue, callback) => {
  if (arrayOfDeps.length === 0)
    return console.log(
      `there are no ${format(queue.field)} that need to be updated`
    );
  const updatedGatsbyDeps = makeUpdatedGatsbyDeps(arrayOfDeps);
  if (callback) {
    callback(updatedGatsbyDeps, queue.field);
  } else {
    await updatePackageFile(updatedGatsbyDeps, queue.field);
  }
};

module.exports = { getPackageNames, updateDependencies, writeNewPackage };
