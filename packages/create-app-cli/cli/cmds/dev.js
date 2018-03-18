const { events, dev } = require('../../lib/dev');
const { listen } = require('../../lib/utils/event-logger');
const { currentDir } = require('../utils/helpers');
const log = require('../utils/logger');
exports.command = 'dev';
exports.describe = 'start webpack dev server';

const startEventListener = () => {
  listen((eventCode, ctx) => {
    switch (eventCode) {
      case events.commandFail:
        return log.errExit(`Failed to start webpack dev server`, ctx);
    }
  });
};

exports.handler = async () => {
  startEventListener();
  await dev(currentDir);
};
