const { events, lint } = require('../../lib/lint');
const { listen } = require('../../lib/utils/event-logger');
const { currentDir } = require('../utils/helpers');
const log = require('../utils/logger');
const command = 'lint';
const describe = 'run lint tests';

const startEventListener = () => {
  listen((eventCode, ctx) => {
    switch (eventCode) {
      case events.commandFail:
        return log.errExit(`Failed to lint code`, ctx);
    }
  });
};

const handler = async () => {
  startEventListener();
  await lint(currentDir);
};

module.exports = {
  command,
  describe,
  handler,
};
