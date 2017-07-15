const command = 'tsreact';
const describe = 'create a new typescript react project';

const handler = argv => {
  console.log(`CREATING NEW TYPESCRIPT REACT PROJECT`, argv);
};

module.exports = {
  command,
  describe,
  // builder,
  handler,
};
