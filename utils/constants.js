const PACKAGE_FILE = `${process.cwd()}/package.json`;
const DEPENDENCIES = `dependencies`;
const DEV_DEPENDENCIES = `devDependencies`;
const PEER_DEPENDENCIES = `peerDependencies`;
const YARN_INSTALL = `yarn add`;
const NPM_INSTALL = `npm install`;
module.exports = {
  PACKAGE_FILE,
  DEV_DEPENDENCIES,
  PEER_DEPENDENCIES,
  DEPENDENCIES,
  YARN_INSTALL,
  NPM_INSTALL,
};
