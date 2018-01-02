const remark = require('remark');
const grayMatter = require('gray-matter');
const visit = require('unist-util-visit');
const rangeParser = require('parse-numeric-range');
const prism = require('prismjs');

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
    if (!lang) return;

    const { splitLanguage, highlightLines } = parseLineNumberRange(lang);
    lang = splitLanguage;
    let highlightedCode = prism.highlight(node.value, getPrismLang(lang));

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

    node.type = 'html';
    node.value = `<div class="prismjs-highlight">
      <pre class="language-${lang.toLowerCase()}"><code>${highlightedCode}</code></pre>
      </div>`;
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

module.exports = function(source) {
  this.cacheable && this.cacheable();
  // const options = getOptions(this);

  const { content, data } = grayMatter(source);
  const ast = customRemark.parse(content);
  applySyntaxHighlighting(ast);

  // grayMatter also has an excerpt option, but it keeps all raw markdown.
  // Bold/styles/links would remain and I don't want that... I want plain text.
  const excerpt = getExcerpt(ast);

  return `
    export const frontmatter =  ${JSON.stringify(data)};
    export const excerpt = ${JSON.stringify(excerpt)};
    export const ast = ${JSON.stringify(ast)};
  `;
};
