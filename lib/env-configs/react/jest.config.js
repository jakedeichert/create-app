module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleDirectories: ['node_modules', 'src'],
  modulePathIgnorePatterns: ['dist'],
  transform: {
    '^.+\\.js$':
      './node_modules/@jakedeichert/create-app/lib/env-configs/react/jest.transform.js',
  },
};
