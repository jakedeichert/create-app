module.exports = config => {
  config.resolve = {
    // Allows you to require('file') instead of require('file.ext')
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // Searches these directories for modules
    modules: ['node_modules', 'src'],
  };
};
