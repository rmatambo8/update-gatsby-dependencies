#!/usr/bin/env node

const Updater = require("../src/updater");

const argv = require("minimist")(process.argv.slice(2));

(async () => {
  try {
    const updater = new Updater(argv.yarn || argv.y);
    await updater.findDependenciesOnNPM();
    updater.createInstallCommand();
    if (argv.install !== undefined || argv.i !== undefined) {
      await updater.installDependencies();
    } else if (argv.package !== undefined || argv.p !== undefined) {
      await updater.updatePackageJSON();
    } else {
      updater.outputInstallCommand();
      console.log(`add -i or --install to install the dependencies`);
    }
  } catch (error) {
    console.log(`failed: `, error.message);
  }
})();
