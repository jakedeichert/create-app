#!/bin/bash
set -e
echo "==========================================================="
echo "🚚 PUBLISHING ALL PACKAGES"
echo "==========================================================="

THIS_SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$THIS_SCRIPTS_DIR/.."

cd $ROOT_DIR

if [[ "$NPM_CONFIG_OTP" == "" ]]; then
    echo "ERROR: NPM_CONFIG_OTP should be set"
    exit 1
fi

lerna publish
