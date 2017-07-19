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
      await runReactEslint(workingDir, false);
      await runReactEslint(workingDir, true);
      break;
  }
};

const runReactEslint = async (workingDir, isTest) => {
  const configFile = isTest ? 'eslintrc.test.js' : 'eslintrc.js';
  const configPath = path.join(
    'node_modules/@jakedeichert/create-app/lib/env-configs/react',
    configFile
  );
  return spawnStream(
    'node_modules/eslint/bin/eslint.js',
    [
      '.',
      `--config ${configPath}`,
      `--ignore-pattern 'dist/' --ignore-pattern 'test/'`,
    ],
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
