const { send } = require('./utils/event-logger');
const { loadProjectConfig, spawnStream } = require('./utils/helpers');
const events = {
  lifeCycleBegin: 'docker.lifeCycle.begin',
  lifeCycleEnd: 'docker.lifeCycle.end',
  initCommandFail: 'docker.init.command.fail',
  startCommandFail: 'docker.start.command.fail',
  startContainer: 'docker.start.container',
};

const start = async workingDir => {
  send(events.lifeCycleBegin);
  const config = loadProjectConfig(workingDir);
  await runInit(workingDir, config.type).catch(initCommandFail);
  send(events.startContainer);
  await runStart(workingDir, config.type).catch(startCommandFail);
  send(events.lifeCycleEnd);
};

const runInit = async (workingDir, projectType) => {
  switch (projectType) {
    case 'react':
      await runReactInit(workingDir);
      break;
  }
};

const runStart = async (workingDir, projectType) => {
  switch (projectType) {
    case 'react':
      await runReactStart(workingDir);
      break;
  }
};

const runReactInit = async workingDir => {
  const dockerfile =
    'node_modules/@jakedeichert/create-app/lib/env-configs/react/Dockerfile';
  return spawnStream(
    `docker build -t img_react_starter`,
    [`- < ${dockerfile}`],
    {
      stdio: 'inherit',
      cwd: workingDir,
    }
  );
};

// Run in the foreground with a bash shell (auto destroys after exit)
const runReactStart = async workingDir => {
  return spawnStream(
    `docker run -it --rm \
      -p 8080:8080 \
      -v ${workingDir}:/var/www/html \
      img_react_starter
    `,
    [],
    {
      stdio: 'inherit',
      cwd: workingDir,
    }
  );
};

const initCommandFail = err => {
  send(events.initCommandFail, { err });
  throw err;
};

const startCommandFail = err => {
  send(events.startCommandFail, { err });
  throw err;
};

module.exports = {
  events,
  start,
};
