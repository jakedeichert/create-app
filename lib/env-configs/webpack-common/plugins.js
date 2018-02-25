const { EnvironmentPlugin } = require('webpack');

module.exports = config => {
  config.plugins = [envVariables()];
};

const envVariables = () =>
  new EnvironmentPlugin({
    // Used with react-router when serving under a specific directory
    // Example: this example below allows react-router to work with gh-pages since
    // repo sites are prefixed with their name...
    //
    // BASE_URL: 'react-starter' is needed for https://jakedeichert.github.io/react-starter/
    BASE_URL: '',
  });
