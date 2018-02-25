const { send } = require('./utils/event-logger');
const { loadProjectConfig, spawnStream } = require('./utils/helpers');
const events = {
  lifeCycleBegin: 'dev.lifeCycle.begin',
  lifeCycleEnd: 'dev.lifeCycle.end',
  commandFail: 'dev.command.fail',
};

const dev = async workingDir => {
  send(events.lifeCycleBegin);
  const config = loadProjectConfig(workingDir);
  await run(workingDir, config.type);
  send(events.lifeCycleEnd);
};

const run = async (workingDir, projectType) => {
  switch (projectType) {
    case 'react':
      await runWebpack(workingDir, projectType);
      break;
    case 'react-electron':
      await copyElectronConfig(workingDir, 'dev');
      runWebpack(workingDir, projectType);
      runElectron(workingDir);
      break;
    case 'typescript-react':
      await runWebpack(workingDir, projectType);
      break;
  }
};

const runWebpack = async (workingDir, projectType) => {
  const configPath = `node_modules/@jakedeichert/create-app/lib/env-configs/${projectType}/webpack.config.js`;
  return spawnStream(
    `node_modules/webpack-serve/cli.js`,
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
  const electron = 'node_modules/electron/cli.js';
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
