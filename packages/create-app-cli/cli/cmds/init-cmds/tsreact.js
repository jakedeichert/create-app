const { initHandler } = require('../init');
exports.command = 'tsreact <appName>';
exports.describe = 'create a new typescript react project';

exports.handler = async argv => {
  await initHandler(argv, 'tsreact');
};
