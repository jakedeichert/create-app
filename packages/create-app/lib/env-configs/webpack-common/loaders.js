const path = require('path');

module.exports = (config, thisModuleDir, projectType) => {
  config.module.rules = [
    getLanguageLoader(thisModuleDir, projectType),
    // {
    //   // Now we can import html files. Example: import 'static/html/about/index.html'
    //   test: /\.html$/,
    //   loader: 'file-loader',
    //   options: {
    //     name: '[name].html',
    //     context: './src/static/html/',
    //   },
    // },
    // Returns path to images required. If less than 8kb, inlines image as base64
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[path][hash].[ext]',
            context: './src',
          },
        },
      ],
    },
    {
      test: /\.md$/,
      loader: path.resolve(__dirname, './loaders/markdown-loader'),
    },
  ];
};

const getLanguageLoader = (thisModuleDir, projectType) => {
  switch (projectType) {
    case 'react':
    case 'react-electron':
      return {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          extends: path.join(thisModuleDir, getBabelRcPath(projectType)),
        },
      };
    case 'typescript-react':
      return {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      };
  }
};

const getBabelRcPath = projectType => {
  switch (projectType) {
    case 'react':
      return 'lib/env-configs/react/.babelrc';
    case 'react-electron':
      return 'lib/env-configs/react-electron/.babelrc';
  }
};
