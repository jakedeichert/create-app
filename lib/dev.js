const { send } = require('./utils/event-logger');
const { loadProjectConfig, spawnStream } = require('./utils/helpers');
const events = {
  lifeCycleBegin: 'dev.lifeCycle.begin',
  lifeCycleEnd: 'dev.lifeCycle.end',
  commandFail: 'dev.command.fail',
};

const dev = async (workingDir, useDashboard) => {
  send(events.lifeCycleBegin);
  const config = loadProjectConfig(workingDir);
  await run(workingDir, useDashboard, config.type);
  send(events.lifeCycleEnd);
};

const run = async (workingDir, useDashboard, projectType) => {
  switch (projectType) {
    case 'react':
    case 'react-electron':
      await runWebpack(workingDir, useDashboard, projectType);
      break;
  }
};

const runWebpack = async (workingDir, useDashboard, projectType) => {
  const dashboard = useDashboard
    ? 'node_modules/webpack-dashboard/bin/webpack-dashboard.js -- '
    : '';
  const configPath = `node_modules/@jakedeichert/create-app/lib/env-configs/${projectType}/webpack.config.js`;
  return spawnStream(
    `${dashboard} node_modules/webpack-dev-server/bin/webpack-dev-server.js`,
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
