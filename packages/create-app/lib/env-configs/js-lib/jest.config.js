const { getPath } = require('../../utils/helpers');

module.exports = {
  verbose: true,
  testRegex: 'test/.*\\.test\\.js$',
  moduleFileExtensions: ['js', 'json'],
  modulePaths: ['<rootDir>/src'],
};
