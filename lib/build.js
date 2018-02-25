const { send } = require('./utils/event-logger');
const { loadProjectConfig, spawnStream } = require('./utils/helpers');
const events = {
  lifeCycleBegin: 'build.lifeCycle.begin',
  lifeCycleEnd: 'build.lifeCycle.end',
  commandFail: 'build.command.fail',
};

const build = async (workingDir, isDevMode) => {
  send(events.lifeCycleBegin);
  const config = loadProjectConfig(workingDir);
  await run(workingDir, isDevMode, config.type);
  send(events.lifeCycleEnd);
};

const run = async (workingDir, isDevMode, projectType) => {
  switch (projectType) {
    case 'typescript-react':
    case 'react':
      await cleanDistDirectory();
      await runWebpack(workingDir, isDevMode, projectType);
      break;
    case 'react-electron':
      await copyElectronConfig(workingDir, 'production');
      await runWebpack(workingDir, isDevMode, projectType);
      await buildElectronPackage(workingDir);
      break;
  }
};

const cleanDistDirectory = async workingDir => {
  return spawnStream(`rm -rf dist/`, [], {
    stdio: 'inherit',
    cwd: workingDir,
  }).catch(commandFail);
};

// https://webpack.js.org/guides/production/
const runWebpack = async (workingDir, isDevMode, projectType) => {
  const env = !isDevMode ? 'NODE_ENV=production ' : '';
  const configPath = `node_modules/@jakedeichert/create-app/lib/env-configs/${projectType}/webpack.config.js`;
  return spawnStream(
    `${env} node_modules/webpack-cli/bin/webpack.js`,
    [`--config ${configPath}`],
    {
      stdio: 'inherit',
      cwd: workingDir,
    }
  ).catch(commandFail);
};

const copyElectronConfig = async (workingDir, env) => {
  return spawnStream(`cp config/${env}.json electron/config.json`, [], {
    stdio: 'inherit',
    cwd: workingDir,
  }).catch(commandFail);
};

const buildElectronPackage = async workingDir => {
  const env = 'NODE_ENV=production';
  const electronPackager = 'node_modules/electron-packager/cli.js';
  // NOTE: packageManager needs to be yarn until they fix npm prune --production
  return spawnStream(
    `${env} ${electronPackager} .`,
    [
      '--out package --electronVersion 1.6.11 --overwrite --packageManager yarn',
    ],
    {
      stdio: 'inherit',
      cwd: workingDir,
    }
  ).catch(commandFail);
};

const commandFail = err => {
  send(events.commandFail, { err });
  throw err;
};

module.exports = {
  events,
  build,
};
