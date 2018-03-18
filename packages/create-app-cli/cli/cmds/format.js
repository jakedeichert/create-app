const { events, format, check } = require('../../lib/format');
const { listen } = require('../../lib/utils/event-logger');
const { currentDir } = require('../utils/helpers');
const log = require('../utils/logger');
exports.command = 'format';
exports.describe = 'run prettier';
exports.builder = {
  c: {
    alias: 'check',
    describe: 'List files that need to be formatted',
  },
};

const startEventListener = () => {
  listen((eventCode, ctx) => {
    switch (eventCode) {
      case events.formatCommandFail:
        return log.errExit(`Failed to format code`, ctx);
      case events.checkCommandFail:
        return log.errExit(`Failed to run format check`, ctx);
    }
  });
};

exports.handler = async argv => {
  startEventListener();
  if (argv.check) {
    await check(currentDir);
    console.log(`Check complete`);
    return;
  }
  await format(currentDir);
};
