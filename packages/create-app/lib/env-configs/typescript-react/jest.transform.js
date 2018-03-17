const tsc = require('typescript');
const tsConfig = require('./tsconfig.test.json');

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      const compiled = tsc.transpileModule(src, {
        compilerOptions: tsConfig.compilerOptions,
        fileName: path,
      });
      return compiled.outputText;
    }
    return src;
  },
};
