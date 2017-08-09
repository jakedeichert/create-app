module.exports = {
  verbose: true,
  testRegex: 'test/.*\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleDirectories: ['node_modules', 'src'],
  modulePathIgnorePatterns: ['dist'],
  transform: {
    '\\.tsx?$': './node_modules/ts-jest/preprocessor.js',
  },
  moduleNameMapper: {
    '\\.css$':
      '<rootDir>/node_modules/@jakedeichert/create-app/lib/env-configs/jest-common/identity-mock.js',
  },
};
