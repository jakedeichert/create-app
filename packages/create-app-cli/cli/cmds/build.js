const { events, build } = require('@jakedeichert/create-app/lib/build');
const { listen } = require('@jakedeichert/create-app/lib/utils/event-logger');
const { currentDir } = require('../utils/helpers');
const log = require('../utils/logger');
exports.command = 'build';
exports.describe = 'bundle for production';
exports.builder = {
  d: {
    alias: 'dev',
    describe: 'Build in dev mode, not for production',
  },
};

const startEventListener = () => {
  listen((eventCode, ctx) => {
    switch (eventCode) {
      case events.commandFail:
        return log.errExit(`Failed to build`, ctx);
    }
  });
};

exports.handler = async argv => {
  startEventListener();
  await build(currentDir, argv.dev);
};
