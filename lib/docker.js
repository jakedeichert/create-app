const { send } = require('./utils/event-logger');
const { loadProjectConfig, spawnStream } = require('./utils/helpers');

const events = {
  lifeCycleBegin: 'docker.lifeCycle.begin',
  lifeCycleEnd: 'docker.lifeCycle.end',
  initCommandFail: 'docker.init.command.fail',
  startCommandFail: 'docker.start.command.fail',
  startContainer: 'docker.start.container',
};
exports.events = events;

exports.start = async (workingDir, port) => {
  send(events.lifeCycleBegin);
  const config = loadProjectConfig(workingDir);
  await runInit(workingDir, config.type).catch(initCommandFail);
  send(events.startContainer);
  await runStart(workingDir, config.type, port).catch(startCommandFail);
  send(events.lifeCycleEnd);
};

const runInit = async (workingDir, projectType) => {
  switch (projectType) {
    case 'react':
    case 'typescript-react':
      await runReactInit(workingDir);
      break;
  }
};

const runStart = async (workingDir, projectType, port) => {
  switch (projectType) {
    case 'react':
    case 'typescript-react':
      await runReactStart(workingDir, port);
      break;
  }
};

const runReactInit = async workingDir => {
  const buildCmd = `docker build \
    -t img_create_app \
    --build-arg USE_NODE_VERSION=8.9.4 \
    .
  `;
  return spawnStream(buildCmd, [], {
    stdio: 'inherit',
    cwd: `${workingDir}/node_modules/@jakedeichert/create-app/lib/env-configs/docker-common`,
  });
};

// Run in the foreground with a bash shell (auto destroys after exit)
const runReactStart = async (workingDir, port) => {
  return spawnStream(
    `docker run -it --rm \
      -p ${port}:8080 \
      -v ${workingDir}:/root/app \
      img_create_app
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
