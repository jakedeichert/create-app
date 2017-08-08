module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleDirectories: ['node_modules', 'src'],
  modulePathIgnorePatterns: ['dist'],
  transform: {
    '\\.jsx?$':
      './node_modules/@jakedeichert/create-app/lib/env-configs/react/jest.transform.js',
  },
  moduleNameMapper: {
    '\\.css$':
      '<rootDir>/node_modules/@jakedeichert/create-app/lib/env-configs/jest-common/identity-mock.js',
  },
};
