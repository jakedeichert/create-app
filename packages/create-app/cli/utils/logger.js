const info = (...msg) => console.log('INFO:', ...msg);
const err = (...msg) => console.log('ERROR:', ...msg);
const errExit = (...msg) => {
  err(...msg);
  process.exit(1);
};

module.exports = {
  info,
  err,
  errExit,
};
