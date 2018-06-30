const { getPath } = require('../../utils/helpers');

module.exports = {
  verbose: true,
  testRegex: 'test/.*\\.test\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  modulePaths: ['<rootDir>/src'],
  transform: {
    '\\.ts$': `./${getPath(
      '@jakedeichert/create-app/lib/env-configs/jest-common/jest.typescript.transform.js'
    )}`,
  },
};
