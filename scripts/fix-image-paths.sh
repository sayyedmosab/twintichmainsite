#!/bin/bash

# Fix all image paths in HTML files to point to /images folder
# This replaces old Word export PATHS only, keeping original image names
# ONLY processes files in public/article-assets folder

echo "Fixing image paths in article HTML files..."

# Process each HTML file in article-assets ONLY
find public/article-assets -type f -name "*.html" | while read file; do
    echo "Processing: $file"
    
    # Replace old Word export folder paths with /images/
    # Keep the original image filenames unchanged
    
    sed -i 's|src="Master%20merged%20Doc_files/|src="/images/|g' "$file"
    sed -i 's|src="Master%20merged%20Doc%20ar_files/|src="/images/|g' "$file"
done

echo "Done! All article image paths updated to /images/"
