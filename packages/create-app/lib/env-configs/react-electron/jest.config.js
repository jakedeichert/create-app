const { getPath } = require('../../utils/helpers');

module.exports = {
  verbose: true,
  testRegex: 'test/.*\\.test\\.jsx?$',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  modulePaths: ['<rootDir>/src'],
  setupFiles: [
    `./${getPath(
      '@jakedeichert/create-app/lib/env-configs/jest-common/jest.init.js'
    )}`,
  ],
  transform: {
    '^.+\\.js$': `./${getPath(
      '@jakedeichert/create-app/lib/env-configs/react-electron/jest.transform.js'
    )}`,
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `${getPath(
      '@jakedeichert/create-app/lib/env-configs/jest-common/file-mock.js'
    )}`,
  },
};
