const info = (...msg) => console.log('INFO:', ...msg);
const err = (...msg) => console.log('ERROR:', ...msg);

module.exports = {
  info,
  err,
};
