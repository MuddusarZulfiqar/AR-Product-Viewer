#!/bin/bash

# Helper script to run npm commands with the correct PATH
# This ensures npm can find system binaries like 'sh'

export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin:$PATH"

npm "$@"
