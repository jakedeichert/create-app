exports.command = 'docker <cmd>';
exports.describe = 'manage docker';
exports.builder = yargs => yargs.commandDir('docker-cmds');
