const path = require('path');
const { send } = require('./utils/event-logger');
const { loadProjectConfig, spawnStream } = require('./utils/helpers');
const { lint } = require('./lint');
const events = {
  lifeCycleBegin: 'test.lifeCycle.begin',
  lifeCycleEnd: 'test.lifeCycle.end',
  commandFail: 'test.command.fail',
};

const test = async (workingDir, isFull) => {
  send(events.lifeCycleBegin);
  const config = loadProjectConfig(workingDir);
  await run(workingDir, isFull, config.type);
  send(events.lifeCycleEnd);
};

const run = async (workingDir, isFull, projectType) => {
  switch (projectType) {
    case 'react':
      await runMocha(workingDir);
      isFull && (await lint(workingDir).catch(commandFail));
      break;
    case 'react-electron':
      await runJest(workingDir);
      isFull && (await lint(workingDir).catch(commandFail));
      break;
  }
};

const runMocha = async workingDir => {
  return spawnStream(
    `NODE_PATH=src NODE_ENV=test node_modules/mocha/bin/mocha`,
    [`--recursive --require test/setup.js test/**/*.test.js`],
    {
      stdio: 'inherit',
      cwd: workingDir,
    }
  ).catch(commandFail);
};

const runJest = async workingDir => {
  const configFile = 'jest.config.js';
  const configPath = path.join(
    'node_modules/@jakedeichert/create-app/lib/env-configs/react-electron',
    configFile
  );
  // Jest sets NODE_ENV=test
  return spawnStream(
    `node_modules/jest/bin/jest.js`,
    [`--config ${configPath} --no-cache --rootDir ${workingDir}`],
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
