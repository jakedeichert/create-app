const { send } = require('./utils/event-logger');
const { spawnStream, getPath, setEnv } = require('./utils/helpers');
const { loadProjectConfig } = require('./utils/configHelpers');
const events = {
  lifeCycleBegin: 'dev.lifeCycle.begin',
  lifeCycleEnd: 'dev.lifeCycle.end',
  commandFail: 'dev.command.fail',
};

const dev = async workingDir => {
  setEnv('dev', 'server_mode', true);
  send(events.lifeCycleBegin);
  const config = loadProjectConfig(workingDir);
  await run(workingDir, config.type);
  send(events.lifeCycleEnd);
};

const run = async (workingDir, projectType) => {
  switch (projectType) {
    case 'react':
      await cleanDistDirectory();
      await runWebpack(workingDir, projectType);
      break;
    case 'react-electron':
      await copyElectronConfig(workingDir, 'dev');
      runWebpack(workingDir, projectType);
      runElectron(workingDir);
      break;
    case 'typescript-react':
      await cleanDistDirectory();
      await runWebpack(workingDir, projectType);
      break;
  }
};

// Clean it so that webpack-serve doesn't load older versions of things.
const cleanDistDirectory = async workingDir => {
  return spawnStream(`rm -rf dist/`, [], {
    stdio: 'inherit',
    cwd: workingDir,
  }).catch(commandFail);
};

const runWebpack = async (workingDir, projectType) => {
  const configPath = getPath(
    `@jakedeichert/create-app/lib/env-configs/${projectType}/webpack.config.js`
  );
  return spawnStream(
    getPath(`webpack-serve/cli.js`),
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

const runElectron = async workingDir => {
  const electron = getPath('electron/cli.js');
  return spawnStream(`${electron} .`, [], {
    stdio: 'inherit',
    cwd: workingDir,
  }).catch(commandFail);
};

const commandFail = err => {
  send(events.commandFail, { err });
  throw err;
};

module.exports = {
  events,
  dev,
};
