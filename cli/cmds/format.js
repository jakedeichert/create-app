const command = 'format';
const describe = 'run prettier';
const builder = {
  check: {
    describe: 'list files that need to be formatted',
  },
};

const handler = argv => {
  if (argv.check) {
    return console.info(`running prettier check`);
  }
  return console.info(`running prettier write`);
};

module.exports = {
  command,
  describe,
  builder,
  handler,
};
