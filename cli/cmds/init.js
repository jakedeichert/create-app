const { events, initProject } = require('../../lib/init');
const { listen } = require('../../lib/utils/event-logger');
const log = require('utils/logger');
const command = 'init <type>';
const describe = 'create a new project';
const builder = yargs => yargs.commandDir('init-cmds');

listen(eventCode => {
  switch (eventCode) {
    case events.createDirFail:
      return log.errExit(`Directory already exists`);
    case events.cloneProjectFail:
      return log.errExit(`Could not clone project`);
  }
});

const initHandler = async ({ appName }, projectType) => {
  await initProject(process.cwd(), appName, projectType);
};

module.exports = {
  command,
  describe,
  builder,
  initHandler,
};
