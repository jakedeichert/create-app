#!/bin/bash
set -e
echo "==========================================================="
echo "PUBLISHING ALL PACKAGES"
echo "==========================================================="

THIS_SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
root_dir="$THIS_SCRIPTS_DIR/.."

cd $root_dir
lerna publish
