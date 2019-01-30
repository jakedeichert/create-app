# React Starter [![Build Status](https://travis-ci.org/jakedeichert/react-starter.svg?branch=master)](https://travis-ci.org/jakedeichert/react-starter)

A simple react starter kit that I use for prototyping new projects.

It's pretty opinionated... so I don't recommend you use it!


### Installed Modules

* [react](https://github.com/facebook/react)
* [redux](https://github.com/reactjs/redux)
    * [redux-thunk](https://github.com/gaearon/redux-thunk)
* [immer](https://github.com/mweststrate/immer)
* [styled-components](https://github.com/styled-components/styled-components)
* [@jakedeichert/create-app](https://github.com/jakedeichert/create-app) (build tool)
    * [webpack 4](https://github.com/webpack/webpack)
    * [jest](https://github.com/facebook/jest)
    * [prettier](https://github.com/prettier/prettier)
    * [eslint](https://github.com/eslint/eslint)


### Setting Up the Environment

#### Building Locally

~~~sh
# Install dependencies & run tests
yarn
yarn test
yarn run lint

# Run webpack-dev-server with hot reload
# Open http://localhost:8080 in your browser
yarn run dev

# Or build to the `dist` directory for production
yarn run build
# And then serve it on http://localhost:8080
yarn run serve

# Format your code with prettier
yarn run format
~~~
