const { events, serve } = require('../../lib/serve');
const { listen } = require('../../lib/utils/event-logger');
const { currentDir } = require('../utils/helpers');
const log = require('../utils/logger');
exports.command = 'serve';
exports.describe = 'serve the dist directory';
exports.builder = {
  p: {
    alias: 'port',
    describe: 'Which port to serve on',
  },
};

exports.handler = async argv => {
  const { port } = argv;
  startEventListener();
  await serve(currentDir, port);
};

const startEventListener = () => {
  listen((eventCode, ctx) => {
    switch (eventCode) {
      case events.serveCommandFail:
        return log.errExit(`Failed to serve the dist directory`, ctx);
    }
  });
};
