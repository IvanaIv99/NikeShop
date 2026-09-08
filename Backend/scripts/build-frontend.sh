#!/usr/bin/env bash
#
# Builds the Angular frontend and copies the compiled static files into
# Laravel's public/ directory, so a single Laravel Cloud deploy serves both
# the API and the SPA from one origin.
#
# Run from the Backend/ directory (Laravel Cloud's application root):
#   bash scripts/build-frontend.sh
#
set -euo pipefail

BACKEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUBLIC_DIR="$BACKEND_DIR/public"
# NOTE: do not `cd` into ../Frontend here — under `set -e` a missing directory
# would abort the script before the diagnostic below can run.
FRONTEND_DIR="$BACKEND_DIR/../Frontend"

echo "==> build-frontend.sh starting"
echo "==> pwd:          $(pwd)"
echo "==> BACKEND_DIR:  $BACKEND_DIR"
echo "==> FRONTEND_DIR: $FRONTEND_DIR"
echo "==> Contents of repo root ($BACKEND_DIR/..):"
ls -la "$BACKEND_DIR/.." || true

if [ ! -f "$FRONTEND_DIR/package.json" ]; then
  echo "ERROR: $FRONTEND_DIR/package.json not found."
  echo "       Laravel Cloud did NOT check out the Frontend/ sibling directory."
  echo "       This build cannot compile the SPA. See DEPLOY.md fallback (build in CI,"
  echo "       commit the compiled assets) if the whole repo is not available at build time."
  exit 1
fi

FRONTEND_DIR="$(cd "$FRONTEND_DIR" && pwd)"   # normalise now that we know it exists
DIST_DIR="$FRONTEND_DIR/dist/shoppsy"

echo "==> Node: $(node --version 2>/dev/null || echo 'NOT FOUND')  npm: $(npm --version 2>/dev/null || echo 'NOT FOUND')"

echo "==> Installing frontend dependencies (npm ci)"
( cd "$FRONTEND_DIR" && npm ci )

echo "==> Building Angular (production)"
( cd "$FRONTEND_DIR" && npm run build )

if [ ! -f "$DIST_DIR/index.html" ]; then
  echo "ERROR: build did not produce $DIST_DIR/index.html"
  echo "==> Contents of $FRONTEND_DIR/dist:"
  ls -laR "$FRONTEND_DIR/dist" || true
  exit 1
fi

echo "==> Copying build into $PUBLIC_DIR"
cp -R "$DIST_DIR/." "$PUBLIC_DIR/"

# Final guarantee: fail the BUILD (clear message) rather than 500 at runtime.
if [ ! -f "$PUBLIC_DIR/index.html" ]; then
  echo "ERROR: $PUBLIC_DIR/index.html missing after copy — deploy would 500 at runtime."
  exit 1
fi

echo "==> Done. SPA present at $PUBLIC_DIR/index.html ($(wc -c < "$PUBLIC_DIR/index.html") bytes)"
