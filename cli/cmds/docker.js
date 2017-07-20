const command = 'docker <cmd>';
const describe = 'manage docker';
const builder = yargs => yargs.commandDir('docker-cmds');

module.exports = {
  command,
  describe,
  builder,
};
