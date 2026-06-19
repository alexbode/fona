#!/usr/bin/env bash

# Exit immediately if any command fails
set -e

# Find the directory where this script is located and navigate to it
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "Building project..."
ng build

echo "Resetting docs directory..."
rm -rf docs/
mkdir -p docs/

echo "Copying files to docs..."
# Ensure we copy the contents correctly
cp -r dist/fona/browser/* docs/

echo "Configuring for GitHub Pages..."
# Create 404.html for Angular routing on GitHub Pages
cp docs/index.html docs/404.html
# Bypass GitHub Pages Jekyll processing
touch docs/.nojekyll

echo "✅ Build and deployment preparation complete!"