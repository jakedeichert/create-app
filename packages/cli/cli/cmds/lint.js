const { events, lint } = require('@jakedeichert/create-app/lib/lint');
const { listen } = require('@jakedeichert/create-app/lib/utils/event-logger');
const { currentDir } = require('../utils/helpers');
const log = require('../utils/logger');
exports.command = 'lint';
exports.describe = 'run lint tests';

const startEventListener = () => {
  listen((eventCode, ctx) => {
    switch (eventCode) {
      case events.commandFail:
        return log.errExit(`Failed to lint code`, ctx);
    }
  });
};

exports.handler = async () => {
  startEventListener();
  await lint(currentDir);
};
