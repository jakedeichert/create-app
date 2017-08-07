module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.js$':
      './node_modules/@jakedeichert/create-app/lib/env-configs/react-electron/jest.transform.js',
  },
};
