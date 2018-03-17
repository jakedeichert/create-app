// Identity Object Proxy - https://github.com/keyanzhang/identity-obj-proxy
// Returns the object key as the value
module.exports = new Proxy(
  {},
  {
    get(target, key) {
      if (key === '__esModule') return false;
      return key;
    },
  }
);
