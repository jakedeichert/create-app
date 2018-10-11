#!/bin/bash
echo "==========================================================="
echo "🔎 CHECKING OUTDATED DEPENDENCIES"
echo "==========================================================="

THIS_SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$THIS_SCRIPTS_DIR/.."

echo "create-app..."
echo "--------------------------------------------------"
cd $ROOT_DIR/packages/create-app
npm outdated

echo "--------------------------------------------------"
echo "create-app-plugin-electron..."
echo "--------------------------------------------------"
cd $ROOT_DIR/packages/plugin-electron
npm outdated

echo "--------------------------------------------------"
echo "create-app-cli..."
echo "--------------------------------------------------"
cd $ROOT_DIR/packages/cli
npm outdated

echo "--------------------------------------------------"
echo "eslint-config..."
echo "--------------------------------------------------"
cd $ROOT_DIR/packages/eslint-config
npm outdated

echo "--------------------------------------------------"
echo "react-starter..."
echo "--------------------------------------------------"
cd $ROOT_DIR/react-starter
yarn outdated

echo "--------------------------------------------------"
echo "typescript-react-starter..."
echo "--------------------------------------------------"
cd $ROOT_DIR/typescript-react-starter
yarn outdated

echo "--------------------------------------------------"
echo "typescript-lib-starter..."
echo "--------------------------------------------------"
cd $ROOT_DIR/typescript-lib-starter
npm outdated

