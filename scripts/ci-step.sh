#!/usr/bin/env bash
# Run one CI step. On failure, post the last 60 lines of its output as a
# GitHub annotation so the reason shows on the pull request.
#   bash scripts/ci-step.sh "Title" command args...
set -uo pipefail
title="$1"
shift
log="$(mktemp)"
"$@" 2>&1 | tee "$log"
status=${PIPESTATUS[0]}
if [ "$status" -ne 0 ]; then
  body="$(tail -n 60 "$log" | sed -e 's/%/%25/g' -e 's/\r//g' | awk '{printf "%s%%0A", $0}')"
  echo "::error title=${title} failed::${body}"
fi
exit "$status"
