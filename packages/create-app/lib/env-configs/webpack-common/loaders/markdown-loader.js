// const loaderUtils = require('loader-utils'); // inherited from webpack
const WebpackModule = require('module'); // inherited from webpack
const remark = require('remark');
const grayMatter = require('gray-matter');
const visit = require('unist-util-visit');
const rangeParser = require('parse-numeric-range');
const prism = require('prismjs');

// https://github.com/webpack/webpack.js.org/issues/1268#issuecomment-313513988
const webpackExecSource = (loaderContext, code, filename) => {
  const mod = new WebpackModule(filename, loaderContext);
  mod.paths = WebpackModule._nodeModulePaths(loaderContext.context);
  mod.filename = filename;
  mod._compile(code, filename);
  return mod.exports;
};

const customRemark = new remark().data('settings', {
  commonmark: true,
  footnotes: true,
  pedantic: true,
});

// Manually have to require all prism langs
// https://github.com/PrismJS/prism/issues/593
const getPrismLang = lang => {
  if (!prism.languages[lang]) require(`prismjs/components/prism-${lang}.js`);
  return prism.languages[lang];
};

const parseLineNumberRange = language => {
  if (!language) return '';
  if (language.split('{').length > 1) {
    let [splitLanguage, rangeStr] = language.split('{');
    rangeStr = rangeStr.slice(0, -1);
    return {
      splitLanguage,
      highlightLines: rangeParser.parse(rangeStr).filter(n => n > 0),
    };
  }

  return { splitLanguage: language };
};

// from here https://github.com/gatsbyjs/gatsby/blob/e08b2778d5fa0b1d9e6cfcbab21fe00943452ead/packages/gatsby-remark-prismjs/src/index.js
const applySyntaxHighlighting = ast => {
  visit(ast, 'code', node => {
    let { lang } = node;
    let highlightedCode = node.value;

    if (lang) {
      const { splitLanguage, highlightLines } = parseLineNumberRange(lang);
      lang = splitLanguage;
      highlightedCode = prism.highlight(node.value, getPrismLang(lang));

      if (highlightLines) {
        const codeSplits = highlightedCode.split('\n').map((split, i) => {
          if (highlightLines.includes(i + 1)) {
            return {
              highlighted: true,
              code: `<span class="prismjs-highlight-code-line">${split}\n</span>`,
            };
          }
          return { code: split };
        });

        highlightedCode = '';
        // Don't add a new line character after highlighted lines as they
        // need to be display: block and full-width.
        codeSplits.forEach(split => {
          split.highlighted
            ? (highlightedCode += split.code)
            : (highlightedCode += `${split.code}\n`);
        });
      }
    }

    const classLang = lang ? lang.toLowerCase() : 'none';
    node.type = 'html';
    node.value = `<div class="prismjs-highlight">
      <pre class="language-${classLang}"><code>${highlightedCode}</code></pre>
      </div>`;
  });
};

const collectImageNodes = ast => {
  const nodes = [];
  visit(ast, 'image', n => {
    nodes.push(n);
  });
  return nodes;
};

const loadImageForNode = (loaderContext, node) => {
  const contentPath = loaderContext.resourcePath
    .split('/')
    .slice(0, -1)
    .join('/');
  const loader =
    '!file-loader?publicPath=/content-images/&outputPath=content-images/!';
  return new Promise((resolve, reject) => {
    const imgPath = `${contentPath}/${node.url}`;
    loaderContext.loadModule(`${loader}${imgPath}`, function(err, source) {
      if (err) return reject(err);

      // Exectute the js module to get the file path that file-loader created
      const outputPath = webpackExecSource(loaderContext, source, imgPath);
      node.url = outputPath;

      resolve();
    });
  });
};

const getExcerpt = ast => {
  const textNodes = [];
  // Only include up until <!-- more --> in the contents
  const indexOfMore = ast.children.findIndex(n => n.value === '<!-- more -->');
  const astUntilMoreFound = {
    type: 'root',
    children: ast.children.slice(0, indexOfMore),
    // [0] { type: 'paragraph', children: [], position: [] },
    // [1] { type: 'html', value: '<!-- more -->', position: [] },
  };
  visit(astUntilMoreFound, 'text', textNode => textNodes.push(textNode.value));
  return textNodes.join('');
};

const getFrontmatterAndAstFromSource = source => {
  const { content, data } = grayMatter(source);
  const ast = customRemark.parse(content);
  return { ast, frontmatter: data };
};

// LOADER API https://webpack.js.org/api/loaders/
module.exports = function(source) {
  const cb = this.async();
  const loaderContent = this;
  const { ast, frontmatter } = getFrontmatterAndAstFromSource(source);
  applySyntaxHighlighting(ast);
  // grayMatter also has an excerpt option, but it keeps all raw markdown.
  // Bold/styles/links would remain and I don't want that... I want plain text.
  const excerpt = getExcerpt(ast);
  const imgNodes = collectImageNodes(ast);

  Promise.all(imgNodes.map(n => loadImageForNode(loaderContent, n))).then(
    () => {
      const result = `
        export const frontmatter = ${JSON.stringify(frontmatter)};
        export const excerpt = ${JSON.stringify(excerpt)};
        export const ast = ${JSON.stringify(ast)};
      `;

      cb(null, result);
    }
  );
};

// So I can reuse these in my rss feed generator
module.exports.getExcerpt = getExcerpt;
module.exports.getFrontmatterAndAstFromSource = getFrontmatterAndAstFromSource;