const NodeModuleLoader = require('module');

// https://github.com/webpack/webpack.js.org/issues/1268#issuecomment-313513988
exports.execSource = (loaderContext, codeSourceString, filename) => {
  const mod = new NodeModuleLoader(filename, loaderContext);
  mod.paths = NodeModuleLoader._nodeModulePaths(loaderContext.context);
  mod.filename = filename;
  mod._compile(codeSourceString, filename);
  return mod.exports;
};
