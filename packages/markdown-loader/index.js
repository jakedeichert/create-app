const remark = require('remark');
const grayMatter = require('gray-matter');
const visit = require('unist-util-visit');

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
  const ast = remark.parse(content);
  // grayMatter also has an excerpt option, but it keeps all raw markdown.
  // Bold/styles/links would remain and I don't want that... I want plain text.
  const excerpt = getExcerpt(ast);

  return `
    export const frontmatter =  ${JSON.stringify(data)};
    export const excerpt = ${JSON.stringify(excerpt)};
    export const ast = ${JSON.stringify(ast)};
  `;
};
