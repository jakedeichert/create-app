#!/bin/bash
set -e
echo "==========================================================="
echo "INSTALLING PACKAGES"
echo "==========================================================="

THIS_SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
root_dir="$THIS_SCRIPTS_DIR/.."

echo "Installing react-starter..."
cd $root_dir/react-starter
yarn

echo "Installing typescript-react-starter..."
cd $root_dir/typescript-react-starter
yarn
