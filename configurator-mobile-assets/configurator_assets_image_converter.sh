#!/bin/bash

# Variables
INPUT_FORMAT=png  # e.g., jpg, png
OUTPUT_FORMAT=webp  # e.g., webp, png
SOURCE_DIR=${1:-$(pwd)}  # Default to current directory if not provided
DEST_DIR=${2:-$SOURCE_DIR}  # Default to source directory if not provided
BASE_FILENAME="configurator_mobile_white_"  # Base name for output files
WIDTH=375  # Output width
QUALITY=85  # Output quality (for certain formats like JPEG, WebP)

# Counter for filename
COUNTER=1

# Creating the destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Loop through each file in the source directory
for FILE in "$SOURCE_DIR"/*.$INPUT_FORMAT; do
    if [ -f "$FILE" ]; then
        # Formatting the filename with leading zeros
        OUTPUT_FILENAME="${BASE_FILENAME}$(printf "%05d" $COUNTER).${OUTPUT_FORMAT}"
        
        # Process the image with ImageMagick
        convert "$FILE" -resize "${WIDTH}x" -quality "$QUALITY" "$DEST_DIR/$OUTPUT_FILENAME"
        
        let COUNTER=COUNTER+1
    fi
done

echo "Conversion completed."
