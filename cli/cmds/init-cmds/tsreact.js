const { initHandler } = require('../init');
const command = 'tsreact <appName>';
const describe = 'create a new typescript react project';

const handler = async argv => {
  await initHandler(argv, 'tsreact');
};

module.exports = {
  command,
  describe,
  handler,
};
