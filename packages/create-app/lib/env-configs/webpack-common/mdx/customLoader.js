// FROM HERE https://github.com/mdx-js/mdx/blob/master/packages/loader/index.js
const { getOptions } = require('loader-utils'); // inherited from webpack
const mdx = require('@mdx-js/mdx');
const excerptPlugin = require('./excerptPlugin');

module.exports = async function(content) {
  const callback = this.async();
  const options = Object.assign({}, getOptions(this), {
    filepath: this.resourcePath,
    // Supply loaderContext to every plugin for advanced use cases
    // https://webpack.js.org/api/loaders/#the-loader-context
    loaderContext: this,
  });

  // Use custom excerpt plugin
  const excerpt = excerptPlugin();
  options.mdPlugins.push(excerpt.transformer);

  let result;

  try {
    result = await mdx(content, options);
  } catch (err) {
    return callback(err);
  }

  const code = `
  import React from 'react'
  import { MDXTag } from '@mdx-js/tag'
  ${result}
  export const excerpt = ${JSON.stringify(excerpt.value)};
  `;

  return callback(null, code);
};
