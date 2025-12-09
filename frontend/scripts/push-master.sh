#!/usr/bin/env bash
set -euo pipefail

TARGET_BRANCH="${TARGET_BRANCH:-master}"

# Ensure we are inside a git repo
git rev-parse --is-inside-work-tree >/dev/null 2>&1

current_branch="$(git rev-parse --abbrev-ref HEAD)"
if [[ "${current_branch}" != "${TARGET_BRANCH}" ]]; then
  echo "⚠️  You are on '${current_branch}'. This script pushes to '${TARGET_BRANCH}'."
  read -r -p "Continue? [y/N] " confirm
  if [[ ! "${confirm}" =~ ^[Yy]$ ]]; then
    echo "Aborting."
    exit 1
  fi
fi

# Show status up front
git status --short

# Bail if nothing to commit
if git diff --quiet && git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

read -r -p "Commit message: " commit_msg

if [[ -z "${commit_msg// }" ]]; then
  echo "Commit message cannot be empty."
  exit 1
fi

git add -A
git commit -m "${commit_msg}"
git push origin "${TARGET_BRANCH}"

echo "Pushed to ${TARGET_BRANCH}."
