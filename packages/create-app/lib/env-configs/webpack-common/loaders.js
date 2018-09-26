const path = require('path');
const { getEnv } = require('../../utils/helpers');
const mdxSyntaxHighlighting = require('./mdx-plugins/syntaxHighlighting');

module.exports = (config, thisModuleDir, projectType) => {
  const langLoader = getLanguageLoader(thisModuleDir, projectType);
  config.module.rules = [
    langLoader,
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
      test: /\.mdx?$/,
      use: [
        {
          loader: langLoader.loader,
          options: langLoader.options,
        },
        {
          loader: '@mdx-js/loader',
          options: {
            mdPlugins: [mdxSyntaxHighlighting],
          },
        },
      ],
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
    case 'react': {
      if (getEnv('build', 'keepProptypes')) {
        return 'lib/env-configs/react/.keepProptypes.babelrc';
      }
      return 'lib/env-configs/react/.babelrc';
    }
    case 'react-electron':
      return 'lib/env-configs/react-electron/.babelrc';
  }
};
