const { events, start } = require('@jakedeichert/create-app/lib/docker');
const { listen } = require('@jakedeichert/create-app/lib/utils/event-logger');
const { currentDir } = require('../../utils/helpers');
const log = require('../../utils/logger');
exports.command = 'start';
exports.describe = 'build the container and serve';
exports.builder = {
  p: {
    alias: 'port',
    describe: 'Which port for docker to serve on',
  },
};

exports.handler = async argv => {
  const { port } = argv;
  startEventListener();
  await start(currentDir, port);
};

const startEventListener = () => {
  listen((eventCode, ctx) => {
    switch (eventCode) {
      case events.startCommandFail:
        return log.errExit(`Failed to start docker container`, ctx);
      case events.startContainer:
        return log.info(`Starting docker container...`);
    }
  });
};
