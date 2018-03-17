#!/bin/bash
set -e
echo "==========================================================="
echo "STARTING APP"
echo "==========================================================="

THIS_SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $THIS_SCRIPTS_DIR/../app

echo ">>> Installing"
yarn

echo ">>> Building"
yarn build

echo ">>> Serving"
yarn run serve --port 8080
