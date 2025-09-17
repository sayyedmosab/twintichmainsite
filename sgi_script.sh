#!/bin/bash

# Change to the project root directory explicitly
cd "/home/mosab/projects/mainsite/twintichmainsite/twintichmainsite/"

# Load environment variables from .env file
# This assumes .env is in the same directory as this script
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Activate the Python virtual environment
source .venv/bin/activate

# Set Qdrant MCP server environment variables
# These are read from the .env file, but explicitly set here for clarity
export QDRANT_URL="${QDRANT_URL}"
export QDRANT_API_KEY="${QDRANT_API_KEY}"
export COLLECTION_NAME="codebase_index" # Using the confirmed original collection name

# Run the codebase indexing script (now incremental)
# python index_codebase.py

# Start the local Qdrant MCP server in the background
# It will now connect to the cloud Qdrant instance
uvx mcp-server-qdrant --transport sse &

# Get the PID of the background process
QDRANT_MCP_PID=$!

# Wait for Qdrant MCP server to be ready
echo "Waiting for Qdrant MCP server to start (3 seconds)..."
sleep 3

# Start Memory MCP server in the background
echo "Starting Memory MCP server..."
nohup npx mem100x > memory_mcp.log 2>&1 &
MEMORY_PID=$!
echo "Memory MCP server started with PID: $MEMORY_PID"

# Start the Gemini CLI
gemini

# Clean up: Kill the Qdrant MCP server when Gemini exits
kill $QDRANT_MCP_PID

# Clean up: Kill the Memory MCP server when Gemini exits
kill $MEMORY_PID
