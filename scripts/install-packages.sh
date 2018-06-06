#!/bin/bash
set -e
echo "==========================================================="
echo "INSTALLING PACKAGES"
echo "==========================================================="

THIS_SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
root_dir="$THIS_SCRIPTS_DIR/.."

echo "Installing create-app..."
cd $root_dir/packages/create-app
yarn --no-lockfile

echo "Installing create-app-cli..."
cd $root_dir/packages/create-app-cli
yarn --no-lockfile
