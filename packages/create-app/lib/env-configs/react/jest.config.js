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
    '\\.jsx?$': `./${getPath(
      '@jakedeichert/create-app/lib/env-configs/react/jest.transform.js'
    )}`,
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/${getPath(
      '@jakedeichert/create-app/lib/env-configs/jest-common/file-mock.js'
    )}`,
    // Was used for css modules
    // '\\.css$':
    //   '<rootDir>/node_modules/@jakedeichert/create-app/lib/env-configs/jest-common/identity-mock.js',
  },
};
