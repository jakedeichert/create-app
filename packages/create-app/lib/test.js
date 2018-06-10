const path = require('path');
const { send } = require('./utils/event-logger');
const { spawnStream, getPath } = require('./utils/helpers');
const { loadProjectConfig } = require('./utils/configHelpers');
exports.events = {
  lifeCycleBegin: 'test.lifeCycle.begin',
  lifeCycleEnd: 'test.lifeCycle.end',
  commandFail: 'test.command.fail',
};

exports.test = async (workingDir, clearCache) => {
  send(exports.events.lifeCycleBegin);
  const config = loadProjectConfig(workingDir);
  await run(workingDir, config.type, clearCache);
  send(exports.events.lifeCycleEnd);
};

const run = async (workingDir, projectType, clearCache) => {
  switch (projectType) {
    case 'react':
    case 'react-electron':
    case 'typescript-react':
      await runJest(workingDir, projectType, clearCache);
      break;
  }
};

const runJest = async (workingDir, projectType, clearCache) => {
  const configFile = 'jest.config.js';
  const configPath = path.join(
    getPath(`@jakedeichert/create-app/lib/env-configs/${projectType}`),
    configFile
  );
  // Jest sets NODE_ENV=test
  const noCache = clearCache ? '--no-cache' : '';
  return spawnStream(
    getPath(`jest/bin/jest.js`),
    [`--config ${configPath} ${noCache} --rootDir ${workingDir}`],
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
