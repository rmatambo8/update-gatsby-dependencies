var argv = require("minimist")(process.argv.slice(2));

const NpmApi = require("npm-api");
const Queue = require("../utils/queue");
const npm = new NpmApi();
const {
  updateDependencies,
  getPackageNames,
  writeNewPackage,
} = require("../utils/updatePackage");

const makeQueues = (type) => {
  switch (type || process.env.DEPENDENCY_TYPE?.toUpperCase()) {
    case "DEPS_ONLY":
      return [new Queue("dependencies")];
    case "DEV":
      return [new Queue("devDependencies")];
    case "PEER":
      return [new Queue("peerDependencies")];
    default:
      return [
        new Queue("dependencies"),
        new Queue("devDependencies"),
        new Queue("peerDependencies"),
      ];
  }
};

const run = async (queues) => {
  const package = require(`${process.cwd()}/package.json`);
  try {
    for (let index = 0; index < queues.length; index++) {
      const queue = queues[index];
      const arrayOfDeps = await getPackageNames(queue);
      await updateDependencies(
        arrayOfDeps,
        queue,
        (updatedDependencies, field) =>
          (package[field] = { ...package[field], ...updatedDependencies })
      );
    }

    const newPackage = JSON.stringify(package, null, 2);
    await writeNewPackage(newPackage);
    console.log(`package.json has been successfully updated`);
  } catch (error) {
    console.log(error.message);
  }
};
const queues = makeQueues();

const addDepsToQueue = (queue) => {
  try {
    const package = require(`${process.cwd()}/package.json`);
    const keys = Object.keys(package[queue.field]);
    keys.forEach((key) => {
      if (key.startsWith("gatsby")) queue.enqueue(npm.repo(key));
    });
  } catch (error) {}
};
queues.forEach(addDepsToQueue);
const updatePackageJSON = () => run(queues);

const findBetaPackages = async (callback) => {
  const [depsQueue] = makeQueues(`DEPS_ONLY`);
  addDepsToQueue(depsQueue);
  const arrayOfDeps = await getPackageNames(depsQueue);
  await updateDependencies(arrayOfDeps, depsQueue, callback);
  return arrayOfDeps;
};
module.exports = { updatePackageJSON, findBetaPackages };
/*
    find the npm package by name
    check to see if the package has a specific version tag
    add the result to the queue
    when all packages are checked, return a command for the remaining 

*/
