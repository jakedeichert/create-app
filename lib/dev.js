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
      await runWebpack(workingDir);
      break;
  }
};

const runWebpack = async workingDir => {
  const configPath =
    'node_modules/@jakedeichert/create-app/lib/env-configs/react/webpack.config.js';
  return spawnStream(
    'node_modules/webpack-dev-server/bin/webpack-dev-server.js',
    [`--config ${configPath}`],
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
  dev,
};
