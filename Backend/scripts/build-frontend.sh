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
FRONTEND_DIR="$(cd "$BACKEND_DIR/../Frontend" && pwd)"
DIST_DIR="$FRONTEND_DIR/dist/shoppsy"
PUBLIC_DIR="$BACKEND_DIR/public"

echo "==> Frontend: $FRONTEND_DIR"

if [ ! -f "$FRONTEND_DIR/package.json" ]; then
  echo "ERROR: $FRONTEND_DIR/package.json not found."
  echo "       The full repo must be checked out (Frontend + Backend) for the bundled build."
  exit 1
fi

echo "==> Installing frontend dependencies"
( cd "$FRONTEND_DIR" && npm ci )

echo "==> Building Angular (production)"
( cd "$FRONTEND_DIR" && npm run build )

if [ ! -f "$DIST_DIR/index.html" ]; then
  echo "ERROR: build did not produce $DIST_DIR/index.html"
  exit 1
fi

echo "==> Copying build into $PUBLIC_DIR"
cp -R "$DIST_DIR/." "$PUBLIC_DIR/"

echo "==> Done. SPA is now served from public/index.html"