const path = require('path');
const { createDir, cloneProject } = require('utils/helpers');
const log = require('utils/logger');
const command = 'react <appName>';
const describe = 'create a new react project';
const repo = 'react-starter';

const handler = async argv => {
  const dirName = argv.appName;
  const dirPath = path.join(process.cwd(), dirName);
  await createDir(dirName).catch(createDirFailed);
  log.info(`clone project into ${dirPath}`);
  await cloneProject(dirPath, repo);
  log.info(`DONE`);
};

const createDirFailed = () => {
  log.err(`Directory already exists`);
  process.exit(1);
};

module.exports = {
  command,
  describe,
  // builder,
  handler,
};
