const { send } = require('./utils/event-logger');
const {
  loadProjectConfig,
  spawnStream,
  getPath,
  setEnv,
} = require('./utils/helpers');
exports.events = {
  lifeCycleBegin: 'build.lifeCycle.begin',
  lifeCycleEnd: 'build.lifeCycle.end',
  commandFail: 'build.command.fail',
};

exports.build = async (workingDir, isDevMode, infoAnalyzer) => {
  setEnv('build', 'info', !!infoAnalyzer);
  send(exports.events.lifeCycleBegin);
  const config = loadProjectConfig(workingDir);
  await run(workingDir, isDevMode, config.type);
  send(exports.events.lifeCycleEnd);
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
  const configPath = getPath(
    `@jakedeichert/create-app/lib/env-configs/${projectType}/webpack.config.js`
  );
  const webpackBinPath = getPath('webpack-cli/bin/cli.js');
  return spawnStream(`${env} ${webpackBinPath}`, [`--config ${configPath}`], {
    stdio: 'inherit',
    cwd: workingDir,
  }).catch(commandFail);
};

const copyElectronConfig = async (workingDir, env) => {
  return spawnStream(`cp config/${env}.json electron/config.json`, [], {
    stdio: 'inherit',
    cwd: workingDir,
  }).catch(commandFail);
};

const buildElectronPackage = async workingDir => {
  const env = 'NODE_ENV=production';
  const electronPackagerPath = getPath('electron-packager/cli.js');
  // NOTE: packageManager needs to be yarn until they fix npm prune --production
  return spawnStream(
    `${env} ${electronPackagerPath} .`,
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
  send(exports.events.commandFail, { err });
  throw err;
};
