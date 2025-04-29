#!/bin/bash

# Define the file path
YARN_RC="./.yarnrc.yml"
NPM_RC="./.npmrc"

# Check if the file exists, if so, delete it
if [ -f "$NPM_RC" ]; then
  echo "File $NPM_RC exists. Deleting it..."
  rm "$NPM_RC"
fi

# Check if the file exists, if so, delete it
if [ -f "$YARN_RC" ]; then
  echo "File $YARN_RC exists. Deleting it..."
  rm "$YARN_RC"
fi

# Check if the file exists, if not, create it
if [ ! -f "$YARN_RC" ]; then
  echo "File $YARN_RC does not exist. Creating it..."
  touch "$YARN_RC"
  echo "nodeLinker: node-modules" >> "$YARN_RC"
  echo "npmScopes:" >> "$YARN_RC"
  echo "  vpvnguyen:" >> "$YARN_RC"
  echo "    npmRegistryServer: \"https://npm.pkg.github.com\"" >> "$YARN_RC"
  echo "    npmAlwaysAuth: true" >> "$NODE_AUTH_TOKEN"
fi
