const path = require('path');

module.exports = (config, thisModuleDir, projectType) => {
  config.module.rules = [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        extends: path.join(thisModuleDir, getBabelRcPath(projectType)),
      },
    },
    {
      // Now we can import html files. Example: import 'static/html/about/index.html'
      test: /\.html$/,
      loader: 'file-loader',
      options: {
        name: '[name].html',
        context: './src/static/html/',
      },
    },
  ];
};

const getBabelRcPath = projectType => {
  switch (projectType) {
    case 'react':
      return 'lib/env-configs/react/.babelrc';
    case 'react-electron':
      return 'lib/env-configs/react-electron/.babelrc';
  }
};
