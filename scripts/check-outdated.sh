#!/bin/bash
echo "==========================================================="
echo "CHECKING OUTDATED DEPENDENCIES"
echo "==========================================================="

THIS_SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
root_dir="$THIS_SCRIPTS_DIR/.."

echo "create-app..."
cd $root_dir/packages/create-app
npm outdated

echo "create-app-cli..."
cd $root_dir/packages/create-app-cli
npm outdated

echo "react-starter..."
cd $root_dir/react-starter
yarn outdated

echo "typescript-react-starter..."
cd $root_dir/typescript-react-starter
yarn outdated
