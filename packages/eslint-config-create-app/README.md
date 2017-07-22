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
extends: [
    '@jakedeichert/create-app/packages/eslint-config-create-app/index.js',
    '@jakedeichert/create-app/packages/eslint-config-create-app/react.js'
]
~~~
