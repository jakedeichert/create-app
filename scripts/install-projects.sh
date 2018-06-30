#!/bin/bash
set -e
echo "==========================================================="
echo "INSTALLING STARTER PROJECTS"
echo "==========================================================="

THIS_SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$THIS_SCRIPTS_DIR/.."

echo "Installing react-starter..."
cd $ROOT_DIR/react-starter
yarn

echo "Installing typescript-react-starter..."
cd $ROOT_DIR/typescript-react-starter
yarn

echo "Installing typescript-lib-starter..."
cd $ROOT_DIR/typescript-lib-starter
yarn
