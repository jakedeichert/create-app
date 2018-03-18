const { events, initProject } = require('../../lib/init');
const { listen } = require('../../lib/utils/event-logger');
const { currentDir } = require('../utils/helpers');
const log = require('../utils/logger');
exports.command = 'init <type>';
exports.describe = 'create a new project';
exports.builder = yargs => yargs.commandDir('init-cmds');

const startEventListener = () => {
  listen(eventCode => {
    switch (eventCode) {
      case events.createDirFail:
        return log.errExit(`Directory already exists`);
      case events.cloneProjectFail:
        return log.errExit(`Failed to clone project`);
    }
  });
};

exports.handler = async ({ appName }, projectType) => {
  startEventListener();
  await initProject(currentDir, appName, projectType);
};
