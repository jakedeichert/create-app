const { getPath } = require('../../utils/helpers');

module.exports = {
  verbose: true,
  testRegex: 'test/.*\\.test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  modulePaths: ['<rootDir>/src'],
  transform: {
    '\\.tsx?$': `./${getPath(
      '@jakedeichert/create-app/lib/env-configs/jest-common/typescript.transform.js'
    )}`,
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `${getPath(
      '@jakedeichert/create-app/lib/env-configs/jest-common/file-mock.js'
    )}`,
    // Was used for css modules
    // '\\.css$':
    //   '<rootDir>/node_modules/@jakedeichert/create-app/lib/env-configs/jest-common/identity-mock.js',
  },
};
