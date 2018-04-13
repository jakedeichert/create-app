const callbacks = [];

exports.listen = cb => {
  callbacks.push(cb);
};

exports.send = (eventCode, contextInfo = {}) => {
  callbacks.forEach(cb => cb(eventCode, contextInfo));
};
