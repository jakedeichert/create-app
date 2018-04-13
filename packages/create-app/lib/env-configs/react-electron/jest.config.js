const { getPath } = require('../../utils/helpers');

module.exports = {
  verbose: true,
  testRegex: 'test/.*\\.test\\.jsx?$',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  modulePaths: ['<rootDir>/src'],
  transform: {
    '^.+\\.js$': `./${getPath(
      '@jakedeichert/create-app/lib/env-configs/react-electron/jest.transform.js'
    )}`,
  },
};
