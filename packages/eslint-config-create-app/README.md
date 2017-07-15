# eslint-config

My personal eslint config.

This includes rules for both ES2016 and React.


## Installation

~~~sh
npm install --save-dev eslint babel-eslint @jakedeichert/eslint-config
~~~

If you extend the React rules, you also have to install 2 more plugins.

~~~sh
npm install --save-dev eslint-plugin-react eslint-plugin-jsx-a11y
~~~


## Extending

Update your `.eslintrc.js` file to extend the configs you want.

~~~js
extends: [
    '@jakedeichert/eslint-config',
    '@jakedeichert/eslint-config/react'
]
~~~
