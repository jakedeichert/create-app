const { send } = require('./utils/event-logger');
const { loadProjectConfig, spawnStream } = require('./utils/helpers');
const events = {
  lifeCycleBegin: 'format.lifeCycle.begin',
  lifeCycleEnd: 'format.lifeCycle.end',
  formatCommandFail: 'format.format.command.fail',
  checkCommandFail: 'format.check.command.fail',
};

const format = async workingDir => {
  send(events.lifeCycleBegin);
  const config = loadProjectConfig(workingDir);
  await runPrettier(true, workingDir, formatConfig(config.type));
  send(events.lifeCycleEnd);
};

const check = async workingDir => {
  send(events.lifeCycleBegin);
  const config = loadProjectConfig(workingDir);
  await runPrettier(false, workingDir, checkConfig(config.type, false));
  await runPrettier(false, workingDir, checkConfig(config.type, true));
  send(events.lifeCycleEnd);
};

const formatConfig = projectType => {
  const jsAndCssConfig =
    '--single-quote --trailing-comma es5 --jsx-bracket-same-line';
  const jsAndCss = "'{src,test}/**/*.{js,css}'";

  switch (projectType) {
    case 'react':
      return [jsAndCssConfig, jsAndCss];
  }
};

const checkConfig = (projectType, isCss) => {
  const jsConfig =
    '--single-quote --trailing-comma es5 --jsx-bracket-same-line';
  const cssConfig = '--parser postcss';
  const cssFiles = "'src/**/*.css'";
  const jsFiles = "'{src,test}/**/*.js'";

  if (isCss) {
    return [cssConfig, cssFiles];
  }
  switch (projectType) {
    case 'react':
      return [jsConfig, jsFiles];
  }
};

const runPrettier = async (isWrite, workingDir, options) => {
  const writeOrCheck = isWrite ? '--write' : '--list-different';
  return spawnStream(
    'node_modules/prettier/bin/prettier.js',
    [writeOrCheck, ...options],
    {
      stdio: 'inherit',
      cwd: workingDir,
    }
  ).catch(isWrite ? formatCommandFail : checkCommandFail);
};

const formatCommandFail = err => {
  send(events.formatCommandFail, { err });
  throw err;
};
const checkCommandFail = err => {
  send(events.checkCommandFail, { err });
  throw err;
};

module.exports = {
  events,
  format,
  check,
};
