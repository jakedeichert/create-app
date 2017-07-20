const { events, start } = require('../../../lib/docker');
const { listen } = require('../../../lib/utils/event-logger');
const { currentDir } = require('../../utils/helpers');
const log = require('../../utils/logger');
const command = 'start';
const describe = 'build the container and serve';

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

const handler = async () => {
  startEventListener();
  await start(currentDir);
};

module.exports = {
  command,
  describe,
  handler,
};
