const path = require('path');
const { send } = require('./utils/event-logger');
const { loadProjectConfig, spawnStream, getPath } = require('./utils/helpers');
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
    case 'react-electron':
      await runReactElectronEslint(workingDir, false);
      await runReactElectronEslint(workingDir, true);
      break;
    case 'typescript-react':
      await runEchoNoLintRules();
      break;
  }
};

const runReactEslint = async (workingDir, isTest) => {
  const root = isTest ? './test' : '.';
  const ignores = !isTest
    ? `--ignore-pattern 'dist/' --ignore-pattern 'test/'`
    : '';
  return spawnStream(getPath('eslint/bin/eslint.js'), [root, `${ignores}`], {
    stdio: 'inherit',
    cwd: workingDir,
  }).catch(commandFail);
};

const runReactElectronEslint = async (workingDir, isTest) => {
  const configFile = isTest ? 'eslintrc.test.js' : 'eslintrc.js';
  const configPath = path.join(
    getPath('@jakedeichert/create-app/lib/env-configs/react-electron'),
    configFile
  );
  const root = isTest ? './test' : '.';
  const ignores = !isTest
    ? `--ignore-pattern 'dist/' --ignore-pattern 'test/' --ignore-pattern 'package/'`
    : '';
  return spawnStream(
    getPath('eslint/bin/eslint.js'),
    [root, `--config ${configPath} ${ignores}`],
    {
      stdio: 'inherit',
      cwd: workingDir,
    }
  ).catch(commandFail);
};

const runEchoNoLintRules = async () => {
  return spawnStream(
    'echo',
    [
      'There are no linting rules for typescript-react projects. TypeScript itself does good linting.',
    ],
    {
      stdio: 'inherit',
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
