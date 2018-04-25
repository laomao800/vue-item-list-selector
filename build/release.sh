#!/bin/bash
set -e

if [[ -z $1 ]]; then
  echo "Enter new version: "
  read -r VERSION
else
  VERSION=$1
fi

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Releasing $VERSION ..."

  # build
  VERSION=$VERSION npm run build

  # commit
  git add -f dist lib

  # tag version
  npm version -f "$VERSION" --message "build: $VERSION"

  # push
  git push origin refs/tags/v"$VERSION"
  git push
fi
