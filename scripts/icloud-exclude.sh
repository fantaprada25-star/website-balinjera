#!/usr/bin/env bash
# Keep build artifacts out of iCloud Drive.
#
# The project used to live under ~/Documents, which macOS syncs to iCloud when
# "Desktop & Documents Folders" is enabled. That corrupted things: iCloud
# resolves concurrent writes by renaming files, which produced "abs 2.js"
# inside node_modules (breaking ESLint) and even duplicated git objects and
# refs inside .git.
#
# The project has since been moved to ~/Developer, which is not synced, so
# this script is now defensive rather than load-bearing: it still protects
# anyone who clones this repo into a synced folder.
#
# com.apple.fileprovider.ignore#P tells the File Provider layer to skip a
# path. It does not survive the directory being deleted and recreated, so this
# runs from postinstall and prebuild.
#
# No-ops on non-macOS and never fails the build.

set -u

[ "$(uname -s)" = "Darwin" ] || exit 0
command -v xattr >/dev/null 2>&1 || exit 0

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

for dir in node_modules .next; do
  target="$root/$dir"
  [ -e "$target" ] || mkdir -p "$target" 2>/dev/null || continue
  xattr -w 'com.apple.fileprovider.ignore#P' 1 "$target" 2>/dev/null || true
done

exit 0
