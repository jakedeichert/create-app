const { events, test } = require('../../lib/test');
const { listen } = require('../../lib/utils/event-logger');
const { currentDir } = require('../utils/helpers');
const log = require('../utils/logger');
const command = 'test';
const describe = 'run tests';
const builder = {
  f: {
    alias: 'full',
    describe: 'Run tests and lint',
  },
};

const startEventListener = () => {
  listen((eventCode, ctx) => {
    switch (eventCode) {
      case events.commandFail:
        return log.errExit(`Failed to run tests`, ctx);
    }
  });
};

const handler = async argv => {
  startEventListener();
  await test(currentDir, argv.full);
};

module.exports = {
  command,
  describe,
  builder,
  handler,
};
