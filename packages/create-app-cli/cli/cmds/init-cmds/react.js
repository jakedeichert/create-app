const { initHandler } = require('../init');
exports.command = 'react <appName>';
exports.describe = 'create a new react project';

exports.handler = async argv => {
  await initHandler(argv, 'react');
};
