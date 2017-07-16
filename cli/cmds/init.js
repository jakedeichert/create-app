const command = 'init <type>';
const describe = 'create a new project';

const builder = yargs => {
  return yargs.commandDir('init-cmds');
};

// only works if subcommand is [optional]
// const handler = argv => {
//   console.log(`build main handler`);
// };

module.exports = {
  command,
  describe,
  builder,
  // handler,
};
