const { getPath } = require('../../utils/helpers');

module.exports = {
  verbose: true,
  testRegex: 'test/.*\\.test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  modulePaths: ['<rootDir>/src'],
  transform: {
    '\\.tsx?$': `./${getPath(
      '@jakedeichert/create-app/lib/env-configs/typescript-react/jest.transform.js'
    )}`,
  },
  // Was used for css modules
  // moduleNameMapper: {
  //   '\\.css$':
  //     '<rootDir>/node_modules/@jakedeichert/create-app/lib/env-configs/jest-common/identity-mock.js',
  // },
};
