module.exports = {
  verbose: true,
  testRegex: 'test/.*\\.test\\.jsx?$',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  modulePaths: ['<rootDir>/src'],
  transform: {
    '^.+\\.js$':
      './node_modules/@jakedeichert/create-app/lib/env-configs/react-electron/jest.transform.js',
  },
};
