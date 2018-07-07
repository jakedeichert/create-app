#!/bin/bash
set -e
echo "==========================================================="
echo "🗑 REMOVING ALL NODE_MODULES"
echo "==========================================================="

THIS_SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$THIS_SCRIPTS_DIR/.."

rm -rf $ROOT_DIR/node_modules
rm -rf $ROOT_DIR/*/node_modules
rm -rf $ROOT_DIR/packages/*/node_modules
rm -rf $ROOT_DIR/packages/*/yarn.lock
