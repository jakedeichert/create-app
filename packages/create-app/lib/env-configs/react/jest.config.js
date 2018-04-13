const { getPath } = require('../../utils/helpers');

module.exports = {
  verbose: true,
  testRegex: 'test/.*\\.test\\.jsx?$',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  modulePaths: ['<rootDir>/src'],
  transform: {
    '\\.jsx?$': `./${getPath(
      '@jakedeichert/create-app/lib/env-configs/react/jest.transform.js'
    )}`,
  },
  // Was used for css modules
  // moduleNameMapper: {
  //   '\\.css$':
  //     '<rootDir>/node_modules/@jakedeichert/create-app/lib/env-configs/jest-common/identity-mock.js',
  // },
};
