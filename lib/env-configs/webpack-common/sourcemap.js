module.exports = config => {
  if (process.env.NODE_ENV === 'production') {
    // Generate full source maps
    config.devtool = 'source-map';
  } else {
    // Generate eval source maps (optional - slows down rebuilds)
    config.devtool = 'eval';
  }
};
