# create-app

A cli build tool for react projects that abstracts away configuration.


## Why?

I have a few small react projects on the go and keeping their build dependencies up to date individually has become a hassle. I realized that most of my project setups are 95% the same which means I can share configuration to a certain extent.

I was inspired by how [create-react-app][1] hides build configuration so cleanly. Although CRA is great, it doesn't fit my goals exactly.

I made `create-app` to be a multipurpose build tool for myself. The first step I took was to move all build configuration from my [react-starter][2] project to `create-app` and then update the npm/yarn run commands to call `create-app` commands instead. This also happens to result in an extremely clean [package.json][3] file.

### Commands

~~~sh
# Run eslint
create-app lint

# Run tests
create-app test

# Format code with prettier
create-app format
# Check if code is properly formatted
create-app format --check

# Run webpack dev server with hot reloading on localhost:8080
create-app dev

# Build for production
create-app build
# Or include a base path when serving under a specific directory
BASE_PATH=react-starter create-app build

# Serve the dist directory on localhost:8080
create-app serve
# Or a different port
create-app serve --port 4000

# Build for production and serve through a docker container on localhost:8080
create-app docker start
# Or a different port
create-app docker start --port 4000
~~~


### Installation

You really want to use this? It's heavily opinionated and only supports my starter projects... but okay!

~~~sh
yarn add --dev @jakedeichert/create-app
~~~


## Build Setup

### React

Starter project: [react-starter][2]

* [babel](https://github.com/babel/babel)
    * [env](https://github.com/babel/babel-preset-env)
    * [react](https://babeljs.io/docs/plugins/preset-react/)
    * [transform-class-properties](https://babeljs.io/docs/plugins/transform-class-properties/)
    * [transform-object-rest-spread](https://babeljs.io/docs/plugins/transform-object-rest-spread/)
* [webpack 4](https://github.com/webpack/webpack)
* [jest](https://github.com/facebook/jest)
* [eslint](https://github.com/eslint/eslint)
    * [my custom config](https://github.com/jakedeichert/create-app/tree/master/packages/eslint-config-create-app)
    * [react](https://github.com/yannickcr/eslint-plugin-react)
    * [jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)
* [prettier](https://github.com/prettier/prettier)


### TypeScript React

Starter project: [typescript-react-starter][4]

* [typescript](https://github.com/Microsoft/TypeScript)
* [webpack 4](https://github.com/webpack/webpack)
* [jest](https://github.com/facebook/jest)
* [prettier](https://github.com/prettier/prettier)


### Other Environments

Support for my other environment setups will be coming soon.

* TypeScript React Electron
* React Electron






[1]: https://github.com/facebookincubator/create-react-app
[2]: https://github.com/jakedeichert/create-app/tree/master/react-starter
[3]: https://github.com/jakedeichert/create-app/blob/master/react-starter/package.json
[4]: https://github.com/jakedeichert/create-app/tree/master/typescript-react-starter
