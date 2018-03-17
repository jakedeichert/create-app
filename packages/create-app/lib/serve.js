const { send } = require('./utils/event-logger');
const { spawnStream } = require('./utils/helpers');

const events = {
  lifeCycleBegin: 'serve.lifeCycle.begin',
  lifeCycleEnd: 'serve.lifeCycle.end',
  serveCommandFail: 'serve.command.fail',
};
exports.events = events;

exports.serve = async (workingDir, port = '8080') => {
  send(events.lifeCycleBegin);
  await runServe(workingDir, port);
  send(events.lifeCycleEnd);
};

const runServe = async (workingDir, port) => {
  return spawnStream(
    'node_modules/serve/bin/serve.js dist',
    [`--port ${port} --single`],
    {
      stdio: 'inherit',
      cwd: workingDir,
    }
  ).catch(serveCommandFail);
};

const serveCommandFail = err => {
  send(events.serveCommandFail, { err });
  throw err;
};
