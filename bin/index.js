#!/usr/bin/env node

const Updater = require("../src/updater");

const argv = require("minimist")(process.argv.slice(2));

(async () => {
  try {
    const updater = new Updater(argv.yarn || argv.y);
    await updater.findDependenciesOnNPM();
    updater.createInstallCommand();
    if (argv.install !== undefined || argv.i !== undefined) {
      console.log(`installing dependencies...`);
      await updater.installDependencies();
    } else if (argv.package !== undefined || argv.p !== undefined) {
      console.log(`updating your package.json file...`);
      await updater.updatePackageJSON();
    } else {
      console.log(
        `\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ install command ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
      );
      updater.outputInstallCommand();
      console.log(
        `\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
      );
      console.log(
        `\n Pro Tip: add -i or --install to install the dependencies automatically ${
          argv.beta || argv.b
            ? ``
            : "or add --beta to install beta dependencies"
        }`
      );
    }
  } catch (error) {
    console.log(`failed: `, error.message);
  }
})();
