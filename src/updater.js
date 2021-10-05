const NpmApi = require("npm-api");
const cp = require("child_process");
const {
  PACKAGE_FILE,
  DEPENDENCIES,
  DEV_DEPENDENCIES,
  PEER_DEPENDENCIES,
  YARN_INSTALL,
  NPM_INSTALL,
} = require("../utils/constants");
const { version, package: packageJSONFile } = require("../utils/getConfig");
const {
  writeNewPackage,
  makeUpdatedGatsbyDeps,
} = require("../utils/updatePackage");

class Updater {
  constructor(isYarn) {
    const installCommand = isYarn ? YARN_INSTALL : NPM_INSTALL;
    this.npm = new NpmApi();
    this.installCommand = installCommand;
    this.init();
  }

  async findDependenciesOnNPM() {
    const { dependencies, devDependencies, peerDependencies } = this.package;
    this.dependencies = await this.#findDependencies(dependencies);
    if (devDependencies !== undefined)
      this.devDependencies = await this.#findDependencies(
        devDependencies,
        DEV_DEPENDENCIES
      );
    if (peerDependencies !== undefined)
      this.peerDependencies = await this.#findDependencies(
        peerDependencies,
        PEER_DEPENDENCIES
      );
  }
  async #findDependencies(dependencies, field = DEPENDENCIES) {
    if (dependencies === undefined) return;
    const keys = Object.keys(dependencies).filter((nameOfDependency) =>
      nameOfDependency.startsWith("gatsby")
    );
    const arrayOfDependencies = keys.map((nameOfDep) =>
      this.npm.repo(nameOfDep)
    );
    const arrayOfDeps = await Promise.all(
      arrayOfDependencies.map((repo) => repo.version("next"))
    );

    return makeUpdatedGatsbyDeps(arrayOfDeps);
  }
  createInstallCommand() {
    if (this.dependencies === undefined)
      return console.log(`unable to find dependencies`);
    const updatedDependencies = Object.keys(this.dependencies);
    const [cmd, install] = this.installCommand.split(" ");
    const output = `${install} ${
      updatedDependencies.join(`${version} `) + String(version)
    }`.split(` `);
    this.fullInstallCommand = [cmd, [...output]];
  }

  outputInstallCommand() {
    const [cmd, args] = this.fullInstallCommand;
    console.log(cmd, args.join(" "));
  }

  async installDependencies() {
    try {
      const subprocess = cp.spawn(...this.fullInstallCommand, {
        stdio: "inherit",
        env: { ...process.env, FORCE_COLOR: true },
      });

      subprocess.stdout?.pipe(process.stdout);
      subprocess.stderr?.pipe(process.stderr);
      subprocess.on("close", (code) => {
        let message = `installation finished`;
        if (code)
          message = `it looks like there may have been some problems in the installation process, check your config and try again`;
        console.log(message);
      });
      await Promise.all([subprocess]);
    } catch (error) {
      console.log("main error: ", error.message);
    }
  }
  async updatePackageJSON() {
    const { dependencies, peerDependencies, devDependencies, ...other } =
      this.package;
    const newPackage = {
      ...other,
    };

    if (dependencies)
      newPackage.dependencies = { ...dependencies, ...this.dependencies };
    if (devDependencies)
      newPackage.devDependencies = {
        ...devDependencies,
        ...this.devDependencies,
      };
    if (peerDependencies)
      newPackage.peerDependencies = {
        ...peerDependencies,
        ...this.peerDependencies,
      };
    try {
      await writeNewPackage(JSON.stringify(newPackage, null, 2));
    } catch (error) {
      console.log(`unable to update package.json`);
    }
  }
  init() {
    this.package = packageJSONFile;
  }
}

module.exports = Updater;
