const { getPath } = require('../../utils/helpers');
const commonConfig = require('../jest-common/common.config.js');

module.exports = {
  ...commonConfig,
  transform: {
    '\\.jsx?$': `./${getPath(
      '@jakedeichert/create-app/lib/env-configs/react-electron/jest.transform.js'
    )}`,
  },
};
