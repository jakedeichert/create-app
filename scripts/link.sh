#!/bin/bash
set -e
echo "==========================================================="
echo "🔗 INSTALLING AND LINKING PACKAGES"
echo "==========================================================="

THIS_SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$THIS_SCRIPTS_DIR/.."

# Need to install each project since some dependencies depend on certain
# modules existing under node_modules. (eslint, webpack-hot-client)
# cd $ROOT_DIR
# ./scripts/install-projects.sh

echo "Installing lerna..."
cd $ROOT_DIR
yarn --no-lockfile

echo "Linking with lerna bootstrap..."
cd $ROOT_DIR
./node_modules/.bin/lerna bootstrap

# If multiple webpack modules exist under node_modules, webpack will compile multiple times
# Also, eslint commands will not work with symlinking it seems
echo "Preventing linking-related bugs..."
cd $ROOT_DIR

# Fix babel runtime reference
mkdir react-starter/node_modules/@babel
cp -R packages/create-app/node_modules/@babel/runtime       react-starter/node_modules/@babel/runtime

# Fix eslint config issues
# ln -s $ROOT_DIR/packages/eslint-config/     react-starter/node_modules/@jakedeichert/eslint-config-create-app
# ln -s $ROOT_DIR/packages/eslint-config/     typescript-react-starter/node_modules/@jakedeichert/eslint-config-create-app

