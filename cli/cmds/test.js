const { events, test } = require('../../lib/test');
const { listen } = require('../../lib/utils/event-logger');
const { currentDir } = require('../utils/helpers');
const log = require('../utils/logger');
const command = 'test';
const describe = 'run tests';

const startEventListener = () => {
  listen((eventCode, ctx) => {
    switch (eventCode) {
      case events.commandFail:
        return log.errExit(`Failed to run tests`, ctx);
    }
  });
};

const handler = async () => {
  startEventListener();
  await test(currentDir);
};

module.exports = {
  command,
  describe,
  handler,
};
