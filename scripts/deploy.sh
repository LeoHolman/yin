#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/yin}"
REPO_URL="${REPO_URL:-https://github.com/LeoHolman/YinReact.git}"
BRANCH="${BRANCH:-main}"

echo "Ensuring app directory exists: ${APP_DIR}"
mkdir -p "${APP_DIR}"

if [ -d "${APP_DIR}/.git" ]; then
  echo "Updating existing checkout..."
  git -C "${APP_DIR}" fetch --all --prune
  git -C "${APP_DIR}" checkout "${BRANCH}"
  git -C "${APP_DIR}" pull --ff-only origin "${BRANCH}"
else
  echo "Cloning repository into ${APP_DIR}"
  git clone --branch "${BRANCH}" --single-branch "${REPO_URL}" "${APP_DIR}"
fi

cd "${APP_DIR}/app"

echo "Installing app dependencies..."
npm install --include=dev --no-fund --no-audit

echo "Building Next.js app..."
npm run build

echo "Restarting Yin service..."
systemctl daemon-reload || true
systemctl enable yin || true
systemctl restart yin

if command -v nginx >/dev/null 2>&1; then
  echo "Reloading nginx..."
  systemctl reload nginx || true
fi

echo "Deployment complete."
