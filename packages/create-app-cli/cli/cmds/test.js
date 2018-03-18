const { events, test } = require('@jakedeichert/create-app/lib/test');
const { listen } = require('@jakedeichert/create-app/lib/utils/event-logger');
const { currentDir } = require('../utils/helpers');
const log = require('../utils/logger');
exports.command = 'test';
exports.describe = 'run tests';

const startEventListener = () => {
  listen((eventCode, ctx) => {
    switch (eventCode) {
      case events.commandFail:
        return log.errExit(`Failed to run tests`, ctx);
    }
  });
};

exports.handler = async () => {
  startEventListener();
  await test(currentDir);
};
