#!/bin/bash
set -e
echo "==========================================================="
echo "INSTALLING AND LINKING PACKAGES"
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
lerna bootstrap

# If multiple webpack modules exist under node_modules, webpack will compile multiple times
# Also, eslint commands will not work with symlinking it seems
echo "Preventing linking-related bugs..."
cd $ROOT_DIR

rm -rf react-starter/node_modules/webpack*
rm -rf react-starter/node_modules/.bin/webpack*
cp -R packages/create-app/node_modules/webpack-hot-client   react-starter/node_modules/webpack-hot-client
cp -R packages/create-app/node_modules/loglevelnext         react-starter/node_modules/loglevelnext
# ln -s $ROOT_DIR/packages/eslint-config/                    react-starter/node_modules/@jakedeichert/eslint-config-create-app

rm -rf typescript-react-starter/node_modules/webpack*
rm -rf typescript-react-starter/node_modules/.bin/webpack*
cp -R packages/create-app/node_modules/webpack-hot-client   typescript-react-starter/node_modules/webpack-hot-client
cp -R packages/create-app/node_modules/loglevelnext         typescript-react-starter/node_modules/loglevelnext
# ln -s $ROOT_DIR/packages/eslint-config/                     typescript-react-starter/node_modules/@jakedeichert/eslint-config-create-app

