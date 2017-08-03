# @jakedeichert/eslint-config-create-app

An eslint config for `create-app`

This includes rules for both ES2016 and React.


## Installation

~~~sh
yarn add --dev @jakedeichert/create-app
~~~

## Extending

Update your `.eslintrc.js` file to extend the configs you want.

~~~js
module.exports = {
  extends: [
    './node_modules/@jakedeichert/create-app/lib/env-configs/react/eslintrc.js',
  ],
};
~~~
