const { events, dev } = require('../../lib/dev');
const { listen } = require('../../lib/utils/event-logger');
const { currentDir } = require('../utils/helpers');
const log = require('../utils/logger');
const command = 'dev';
const describe = 'start webpack dev server';
const builder = {
  d: {
    alias: 'dash',
    describe: 'Use webpack dashboard',
  },
};

const startEventListener = () => {
  listen((eventCode, ctx) => {
    switch (eventCode) {
      case events.commandFail:
        return log.errExit(`Failed to start webpack dev server`, ctx);
    }
  });
};

const handler = async argv => {
  startEventListener();
  await dev(currentDir, argv.dash);
};

module.exports = {
  command,
  describe,
  builder,
  handler,
};
