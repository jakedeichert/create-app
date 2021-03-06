exports.info = (...msg) => console.log('INFO:', ...msg);

exports.err = (...msg) => console.log('ERROR:', ...msg);

exports.errExit = (...msg) => {
  exports.err(...msg);
  process.exit(1);
};
