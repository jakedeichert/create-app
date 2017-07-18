const { send } = require('./utils/event-logger');
const { loadProjectConfig, spawnStream } = require('./utils/helpers');
const events = {
  lifeCycleBegin: 'format.lifeCycle.begin',
  lifeCycleEnd: 'format.lifeCycle.end',
  formatCommandFail: 'format.command.fail',
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

const commandFail = err => {
  send(events.formatCommandFail, { err });
  throw err;
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
  return spawnStream('node_modules/.bin/prettier', [writeOrCheck, ...options], {
    stdio: 'inherit',
    cwd: workingDir,
  }).catch(commandFail);
};

module.exports = {
  events,
  format,
  check,
};