const { initHandler } = require('common/init');
const command = 'gatsby <appName>';
const describe = 'create a new gatsby project';

const handler = async argv => {
  await initHandler(argv, 'gatsby');
};

module.exports = {
  command,
  describe,
  handler,
};
