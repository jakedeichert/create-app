const path = require('path');
const { send } = require('./utils/event-logger');
const { loadProjectConfig, spawnStream } = require('./utils/helpers');
const events = {
  lifeCycleBegin: 'lint.lifeCycle.begin',
  lifeCycleEnd: 'lint.lifeCycle.end',
  commandFail: 'lint.command.fail',
};

const lint = async workingDir => {
  send(events.lifeCycleBegin);
  const config = loadProjectConfig(workingDir);
  await runLint(workingDir, config.type);
  send(events.lifeCycleEnd);
};

const runLint = async (workingDir, projectType) => {
  switch (projectType) {
    case 'react':
      return runReactEslint(workingDir);
  }
};

const runReactEslint = async workingDir => {
  const eslintPath =
    'node_modules/@jakedeichert/create-app/lib/env-configs/react';
  const configPath = path.join(eslintPath, '.eslintrc.js');
  const ignorePath = path.join(eslintPath, '.eslintignore');
  return spawnStream(
    'node_modules/.bin/eslint',
    ['.', `--config ${configPath}`, `--ignore-path ${ignorePath}`],
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
  lint,
};
