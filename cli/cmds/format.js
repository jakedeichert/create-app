const { events, format, check } = require('../../lib/format');
const { listen } = require('../../lib/utils/event-logger');
const { currentDir } = require('utils/helpers');
const log = require('utils/logger');
const command = 'format';
const describe = 'run prettier';
const builder = {
  check: {
    describe: 'list files that need to be formatted',
  },
};

listen((eventCode, ctx) => {
  switch (eventCode) {
    case events.formatCommandFail:
      return log.errExit(`Failed to format code`, ctx);
    case events.checkCommandFail:
      return log.errExit(`Failed to run format check`, ctx);
  }
});

const handler = async argv => {
  if (argv.check) {
    await check(currentDir);
    console.log(`Check success`);
    return;
  }
  await format(currentDir);
  console.log(`Format success`);
};

module.exports = {
  command,
  describe,
  builder,
  handler,
};
