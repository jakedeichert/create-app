const yargs = require('yargs');

yargs
  .usage(
    'create-app - a web app generator that abstracts away build configuration'
  )
  .commandDir('./cmds')
  .option('v', {
    alias: 'version',
    global: false,
  })
  .option('h', {
    alias: 'help',
  })
  .version()
  .help('h').argv;

// Must add this after otherwise catch all will prevent -v from working
yargs.command({
  command: '*',
  handler: () => {
    console.log('Missing command: run `create-app --help` for usage info');
    // This doesn't work for some reason
    // yargs.showHelp();
  },
}).argv;
