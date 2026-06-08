#!/bin/bash

underline='\033[4;37m'
cyan='\033[1;36m'
green='\033[1;32m'
red='\033[1;31m'
nc='\033[0m' # No Color

CMD=$1
shift
REST="$@"

run_command() {
  echo_command "$1"
  eval "$1"
  retVal=$?
  if [ $retVal -ne 0 ]; then
    exit $retVal
  fi
}

echo_command() {
  echo -e "${underline}$ $npm_package_name${nc} ${green}$1${nc}"
}

echo_header() {
  echo -e "${underline}$ $npm_package_name${nc} ${cyan}$1${nc}"
}

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

if [[ ! $PATH == *"$SCRIPT_DIR"* ]]; then
  export PATH="$PATH:$SCRIPT_DIR"
fi

backup_file() {
  run_command "cp $1 $1.backup"
}

restore_flie() {
  run_command "mv $1.backup $1"
}

cleanup() {
  run_command "rm -rf ./dist"
  run_command "rm -rf ./test-utils"
}


if [ "$CMD" == "prepack" ]; then
  run_command "pnpm build"
  echo_header "updating package.json"
  backup_file "./package.json"
  run_command "pnpm update-package-json"
fi

if [ "$CMD" == "package" ]; then
  ARTIFACT_FOLDER="../../artifacts"
  run_command "npm pack"
  run_command "mkdir -p $ARTIFACT_FOLDER && mv *.tgz $ARTIFACT_FOLDER"
fi

if [ "$CMD" == "postpack" ]; then
  restore_flie "./package.json"
  cleanup
fi
