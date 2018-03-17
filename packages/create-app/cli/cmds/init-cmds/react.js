const { initHandler } = require('../init');
const command = 'react <appName>';
const describe = 'create a new react project';

const handler = async argv => {
  await initHandler(argv, 'react');
};

module.exports = {
  command,
  describe,
  handler,
};
