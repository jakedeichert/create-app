#!/bin/bash
set -e
echo "==========================================================="
echo "INSTALLING PACKAGES"
echo "==========================================================="

THIS_SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
root_dir="$THIS_SCRIPTS_DIR/.."

# Need to install each package since create-app depends on a specific
# directory structure to find the node_module bin files. When using
# lerna bootstrap only, it doesn't install all modules and submodules
# since it just links them instead.

echo "Installing react-starter..."
cd $root_dir/react-starter
yarn

echo "Installing typescript-react-starter..."
cd $root_dir/typescript-react-starter
yarn

echo "Installing packages/create-app"
cd $root_dir/typescript-react-starter
yarn --no-lockfile

echo "Installing lerna..."
cd $root_dir
yarn --no-lockfile

echo "Linking with lerna bootstrap..."
cd $root_dir
lerna bootstrap

