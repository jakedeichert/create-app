#!/bin/bash
set -e
echo "==========================================================="
echo "REMOVING ALL NODE_MODULES"
echo "==========================================================="

THIS_SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
root_dir="$THIS_SCRIPTS_DIR/.."

rm -rf $root_dir/node_modules
rm -rf $root_dir/*/node_modules
rm -rf $root_dir/packages/*/node_modules
rm -rf $root_dir/packages/*/yarn.lock
