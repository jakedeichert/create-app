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

module.exports = () => {
  const plugin = {
    value: '',
    transformer() {
      return ast => {
        plugin.value = getExcerpt(ast);
      };
    },
  };

  return plugin;
};

// Used in the rss generator
module.exports.getExcerpt = getExcerpt;
