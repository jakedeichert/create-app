const { send } = require('./utils/event-logger');
const { spawnStream } = require('./utils/helpers');
const events = {
  lifeCycleBegin: 'format.lifeCycle.begin',
  lifeCycleEnd: 'format.lifeCycle.end',
  formatCommandFail: 'format.format.command.fail',
  checkCommandFail: 'format.check.command.fail',
};

const format = async workingDir => {
  send(events.lifeCycleBegin);
  await runPrettier(true, workingDir);
  send(events.lifeCycleEnd);
};

const check = async workingDir => {
  send(events.lifeCycleBegin);
  await runPrettier(false, workingDir);
  send(events.lifeCycleEnd);
};

const runPrettier = async (isWrite, workingDir) => {
  const writeOrCheck = isWrite ? '--write' : '--list-different';
  const files = "'{src,test,electron}/**/*.{js,jsx,ts,tsx,css}' '*.js'";
  const configOption =
    '--config node_modules/@jakedeichert/create-app/lib/env-configs/prettier-common/prettier.config.js';

  return spawnStream(
    'node_modules/prettier/bin/prettier.js',
    [writeOrCheck, configOption, files],
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
