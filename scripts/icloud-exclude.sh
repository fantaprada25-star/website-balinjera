#!/usr/bin/env bash
# Keep build artifacts out of iCloud Drive.
#
# This project lives under ~/Documents, which macOS syncs to iCloud when
# "Desktop & Documents Folders" is enabled. Syncing node_modules/.next is both
# wasteful (~600MB of churn) and actively harmful: iCloud resolves concurrent
# writes by renaming files ("abs.js" -> "abs 2.js"), which silently corrupts
# dependencies and Next.js build output.
#
# The com.apple.fileprovider.ignore#P attribute tells the File Provider layer
# to skip a path. It does not survive the directory being deleted and
# recreated, so this runs from postinstall and prebuild.
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
