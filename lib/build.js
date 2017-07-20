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
    case 'react':
      await runWebpack(workingDir, isDevMode);
      break;
  }
};

const runWebpack = async (workingDir, isDevMode) => {
  const env = !isDevMode ? 'NODE_ENV=production ' : '';
  const options = !isDevMode ? '-p ' : '';
  const configPath =
    'node_modules/@jakedeichert/create-app/lib/env-configs/react/webpack.config.js';
  return spawnStream(
    `${env} node_modules/webpack/bin/webpack.js ${options}`,
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
  build,
};
