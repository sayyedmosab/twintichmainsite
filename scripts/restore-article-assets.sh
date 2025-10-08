#!/bin/bash
# Restore article-assets from backup

BACKUP_DIR="$(dirname "$0")/../article-assets-backup/article-assets"
TARGET_DIR="$(dirname "$0")/../article-assets"

if [ ! -d "$BACKUP_DIR" ]; then
  echo "Backup directory not found: $BACKUP_DIR"
  exit 1
fi

echo "Restored article-assets from backup."
echo "Restored article-assets from backup."

# Restore only .html files from backup to article-assets, preserving all other files

if [ -d "$TARGET_DIR" ]; then
  # Remove current .html files (be careful!)
  find "$TARGET_DIR" -type f -name '*.html' -exec rm {} +
fi

# Find all .html files in the backup and copy them one by one
find "$BACKUP_DIR" -type f -name '*.html' | while read -r backup_file; do
  # Get the relative path from the backup dir
  rel_path="${backup_file#$BACKUP_DIR/}"
  target_file="$TARGET_DIR/$rel_path"
  target_dir="$(dirname "$target_file")"

  # Ensure the target directory exists
  mkdir -p "$target_dir"

  # Copy the backup html file to the target location
  cp "$backup_file" "$target_file"
  echo "Restored: $rel_path"
done

echo "All .html files restored from backup. Other files left untouched."

echo "Restored article-assets from backup."
