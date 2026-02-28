#!/bin/bash

# Script to convert all .MOV and .mov files to .mp4 in subdirectories
# Requires ffmpeg to be installed: brew install ffmpeg

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Starting MOV to MP4 conversion in: $SCRIPT_DIR"
echo "================================================"

# Counter for converted files
converted=0
skipped=0

# Find all .MOV and .mov files in subdirectories using null delimiter for safety
while IFS= read -r -d '' mov_file; do
    # Get the directory and filename without extension
    dir=$(dirname "$mov_file")
    filename=$(basename "$mov_file")
    name="${filename%.*}"
    
    # Output mp4 file path
    mp4_file="$dir/${name}.mp4"
    
    # Check if mp4 already exists
    if [ -f "$mp4_file" ]; then
        echo "SKIP: $mp4_file already exists"
        ((skipped++))
        continue
    fi
    
    echo "Converting: $mov_file"
    echo "       To: $mp4_file"
    
    # Convert using ffmpeg with H.264 codec for broad compatibility
    # -nostdin prevents ffmpeg from waiting for interactive input
    ffmpeg -nostdin -i "$mov_file" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart -y "$mp4_file"
    
    if [ $? -eq 0 ]; then
        echo "SUCCESS: Converted $filename"
        ((converted++))
    else
        echo "ERROR: Failed to convert $filename"
    fi
    
    echo "------------------------------------------------"
done < <(find "$SCRIPT_DIR" -type f \( -iname "*.MOV" -o -iname "*.mov" \) -print0)

echo "================================================"
echo "Conversion complete!"
echo "Original .MOV files have been preserved."
