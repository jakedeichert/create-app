const path = require('path');
const { send } = require('./utils/event-logger');
const { loadProjectConfig, spawnStream } = require('./utils/helpers');
const events = {
  lifeCycleBegin: 'test.lifeCycle.begin',
  lifeCycleEnd: 'test.lifeCycle.end',
  commandFail: 'test.command.fail',
};

const test = async workingDir => {
  send(events.lifeCycleBegin);
  const config = loadProjectConfig(workingDir);
  await run(workingDir, config.type);
  send(events.lifeCycleEnd);
};

const run = async (workingDir, projectType) => {
  switch (projectType) {
    case 'react':
    case 'react-electron':
    case 'typescript-react':
      await runJest(workingDir, projectType);
      break;
  }
};

const runJest = async (workingDir, projectType) => {
  const configFile = 'jest.config.js';
  const configPath = path.join(
    `node_modules/@jakedeichert/create-app/lib/env-configs/${projectType}`,
    configFile
  );
  // Jest sets NODE_ENV=test
  return spawnStream(
    `node_modules/jest/bin/jest.js`,
    [`--config ${configPath} --rootDir ${workingDir}`],
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
  test,
};
