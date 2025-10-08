#!/bin/bash
# Remove all lines with 'Chapter X' or 'Episode X.Y' from all HTML files in public/article-assets/ar and en

find ./public/article-assets/ -type f -name '*.html' | while read -r file; do
  # Remove lines with Chapter X (any number)
  sed -i.bak '/Chapter [0-9]\+:/Id' "$file"
  # Remove lines with Episode X.Y (any number)
  sed -i.bak '/Episode [0-9]\+\.[0-9]\+:/Id' "$file"
  # Remove the specific line for 1.1 if it remains (for edge cases)
  sed -i.bak '/Episode 1\.1: What is an Organizational Transformation\?/Id' "$file"
  # Remove backup if not needed
  rm -f "$file.bak"
done

echo "Done. All matching lines removed from HTML files in public/article-assets/ar and en."
