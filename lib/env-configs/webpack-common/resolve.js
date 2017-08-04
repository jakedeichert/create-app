module.exports = config => {
  config.resolve = {
    // Allows you to require('file') instead of require('file.js')
    extensions: ['.js', '.jsx'],
    // Searches these directories for modules
    modules: ['node_modules', 'src'],
  };
};
