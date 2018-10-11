#!/bin/bash
set -e
echo "==========================================================="
echo "📦 INSTALLING PACKAGES"
echo "==========================================================="

THIS_SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$THIS_SCRIPTS_DIR/.."

echo "Installing create-app..."
cd $ROOT_DIR/packages/create-app
yarn --no-lockfile

echo "Installing create-app-plugin-electron..."
cd $ROOT_DIR/packages/plugin-electron
yarn --no-lockfile

echo "Installing create-app-cli..."
cd $ROOT_DIR/packages/cli
yarn --no-lockfile

echo "Installing eslint-config..."
cd $ROOT_DIR/packages/eslint-config
yarn --no-lockfile
