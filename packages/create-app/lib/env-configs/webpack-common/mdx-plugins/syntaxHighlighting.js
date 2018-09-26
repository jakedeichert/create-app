const visit = require('unist-util-visit');
const rangeParser = require('parse-numeric-range');
const prism = require('prismjs');

// Manually have to require all prism langs
// https://github.com/PrismJS/prism/issues/593
const getPrismLang = lang => {
  if (!prism.languages[lang]) require(`prismjs/components/prism-${lang}.js`);
  return prism.languages[lang];
};

const parseLineNumberRange = language => {
  if (!language) return '';
  if (language.split('{').length > 1) {
    const [splitLanguage, rangeStr] = language.split('{');
    const range = rangeStr.slice(0, -1);
    return {
      splitLanguage,
      highlightLines: rangeParser.parse(range).filter(n => n > 0),
    };
  }

  return { splitLanguage: language };
};

// from here https://github.com/gatsbyjs/gatsby/blob/e08b2778d5fa0b1d9e6cfcbab21fe00943452ead/packages/gatsby-remark-prismjs/src/index.js
module.exports = () => {
  const transformer = ast => {
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

      node.value = highlightedCode;
    });
  };

  return transformer;
};
