const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = config => {
  if (process.env.NODE_ENV === 'production') return;
  config.plugins.push(new DashboardPlugin());
};
