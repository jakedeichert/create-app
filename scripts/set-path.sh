#!/bin/bash
set -e
echo "==========================================================="
echo "🎯 SETTING PATH SO SCRIPTS CAN BE CALLED"
echo "==========================================================="

THIS_SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Call this script like this:
# . set-path.sh
# or
# source set-path.sh
export PATH="$THIS_SCRIPTS_DIR:$PATH"
