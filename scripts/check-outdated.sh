#!/bin/bash
echo "==========================================================="
echo "CHECKING OUTDATED DEPENDENCIES"
echo "==========================================================="

THIS_SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
root_dir="$THIS_SCRIPTS_DIR/.."

echo "create-app..."
echo "--------------------------------------------------"
cd $root_dir/packages/create-app
npm outdated

echo "--------------------------------------------------"
echo "create-app-cli..."
echo "--------------------------------------------------"
cd $root_dir/packages/create-app-cli
npm outdated

echo "--------------------------------------------------"
echo "react-starter..."
echo "--------------------------------------------------"
cd $root_dir/react-starter
yarn outdated

echo "--------------------------------------------------"
echo "typescript-react-starter..."
echo "--------------------------------------------------"
cd $root_dir/typescript-react-starter
yarn outdated
