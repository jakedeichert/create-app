const visit = require('unist-util-visit');

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

      // The source looks like this:
      // module.exports = "/content-images/xxxxx.png"
      // Here we extract just the path: /content-images/xxxxx.png
      const outputPath = /".*"/.exec(source)[0].slice(1, -1);
      node.url = outputPath;

      resolve();
    });
  });
};

module.exports = ({ loaderContext }) => {
  const transformer = async ast => {
    const imgNodes = collectImageNodes(ast);
    await Promise.all(imgNodes.map(n => loadImageForNode(loaderContext, n)));
  };

  return transformer;
};
