// FROM https://github.com/mdx-js/mdx/blob/master/packages/loader/index.js
const { getOptions } = require('loader-utils'); // inherited from webpack
const mdx = require('@mdx-js/mdx');

module.exports = async function(content) {
  const callback = this.async();
  const options = Object.assign({}, getOptions(this), {
    filepath: this.resourcePath,
    // Supply loaderContext to every plugin for advanced use cases
    // https://webpack.js.org/api/loaders/#the-loader-context
    loaderContext: this,
  });
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
  `;

  return callback(null, code);
};
