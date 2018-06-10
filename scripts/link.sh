#!/bin/bash
set -e
echo "==========================================================="
echo "INSTALLING AND LINKING PACKAGES"
echo "==========================================================="

THIS_SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
root_dir="$THIS_SCRIPTS_DIR/.."

# Need to install each project since some dependencies depend on certain
# modules existing under node_modules. (eslint, webpack-hot-client)
# cd $root_dir
# ./scripts/install-projects.sh

echo "Installing lerna..."
cd $root_dir
yarn --no-lockfile

echo "Linking with lerna bootstrap..."
cd $root_dir
lerna bootstrap

# If multiple webpack modules exist under node_modules, webpack will compile multiple times
# Also, eslint commands will not work with symlinking it seems
echo "Preventing linking-related bugs..."
cd $root_dir

rm -rf react-starter/node_modules/webpack*
rm -rf react-starter/node_modules/.bin/webpack*
cp -R packages/create-app/node_modules/webpack-hot-client   react-starter/node_modules/webpack-hot-client
cp -R packages/create-app/node_modules/loglevelnext         react-starter/node_modules/loglevelnext
# ln -s $root_dir/packages/eslint-config/                    react-starter/node_modules/@jakedeichert/eslint-config-create-app

rm -rf typescript-react-starter/node_modules/webpack*
rm -rf typescript-react-starter/node_modules/.bin/webpack*
cp -R packages/create-app/node_modules/webpack-hot-client   typescript-react-starter/node_modules/webpack-hot-client
cp -R packages/create-app/node_modules/loglevelnext         typescript-react-starter/node_modules/loglevelnext
# ln -s $root_dir/packages/eslint-config/                     typescript-react-starter/node_modules/@jakedeichert/eslint-config-create-app

