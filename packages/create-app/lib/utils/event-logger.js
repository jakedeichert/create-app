const callbacks = [];

const listen = cb => {
  callbacks.push(cb);
};

const send = (eventCode, contextInfo = {}) => {
  callbacks.forEach(cb => cb(eventCode, contextInfo));
};

module.exports = {
  listen,
  send,
};
