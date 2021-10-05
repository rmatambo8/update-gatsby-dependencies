#!/usr/bin/env node

const Updater = require("../src/updater");

const argv = require("minimist")(process.argv.slice(2));

(async () => {
  try {
    const updater = new Updater(argv.yarn);
    await updater.findDependenciesOnNPM();
    updater.createInstallCommand();
    if (argv.install !== undefined || argv.i !== undefined) {
      await updater.installDependencies();
    } else if (argv.package !== undefined || argv.p !== undefined) {
      await updater.updatePackageJSON();
    } else {
      updater.outputInstallCommand();
    }
  } catch (error) {
    console.log(`failed: `, error.message);
  }
})();
