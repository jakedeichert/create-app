const command = 'gatsby';
const describe = 'create a new gatsby project';

const handler = argv => {
  console.log(`CREATING NEW GATSBY PROJECT`, argv);
};

module.exports = {
  command,
  describe,
  // builder,
  handler,
};
