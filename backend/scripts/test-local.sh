#!/bin/bash

# Local Testing Script for FastAPI Backend

set -e

echo "🧪 Gubbu API - Local Testing"
echo "============================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ .env file not found${NC}"
    echo "Please create .env file with required environment variables"
    exit 1
fi

echo -e "${GREEN}✅ .env file found${NC}"

# Check Python version
PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
echo "Python version: $PYTHON_VERSION"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo ""
    echo "Creating virtual environment..."
    python3 -m venv venv
    echo -e "${GREEN}✅ Virtual environment created${NC}"
fi

# Activate virtual environment
echo ""
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo ""
echo "Installing dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Load environment variables
echo ""
echo "Loading environment variables..."
export $(cat .env | grep -v '^#' | xargs)
echo -e "${GREEN}✅ Environment variables loaded${NC}"

# Start server in background
echo ""
echo "Starting FastAPI server..."
python main.py &
SERVER_PID=$!

# Wait for server to start
echo "Waiting for server to start..."
sleep 3

# Test health endpoint
echo ""
echo "Testing /health endpoint..."
HEALTH_RESPONSE=$(curl -s http://localhost:8080/health)

if echo "$HEALTH_RESPONSE" | grep -q '"status":"ok"'; then
    echo -e "${GREEN}✅ Health check passed${NC}"
    echo "$HEALTH_RESPONSE" | python3 -m json.tool
else
    echo -e "${RED}❌ Health check failed${NC}"
    echo "$HEALTH_RESPONSE"
    kill $SERVER_PID
    exit 1
fi

# Test chat endpoint
echo ""
echo "Testing /chat endpoint..."
CHAT_RESPONSE=$(curl -s -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Best time to visit Thailand?"}
    ]
  }')

if echo "$CHAT_RESPONSE" | grep -q '"answer"'; then
    echo -e "${GREEN}✅ Chat endpoint passed${NC}"
    echo "Response preview:"
    echo "$CHAT_RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print(f\"Answer: {data['answer'][:200]}...\")"
else
    echo -e "${YELLOW}⚠️  Chat endpoint returned unexpected response${NC}"
    echo "$CHAT_RESPONSE" | python3 -m json.tool
fi

# Test affiliate redirects
echo ""
echo "Testing /go/flights endpoint..."
FLIGHTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8080/go/flights?from=EWR&to=BKK&src=test")

if [ "$FLIGHTS_STATUS" = "302" ] || [ "$FLIGHTS_STATUS" = "307" ]; then
    echo -e "${GREEN}✅ Flights redirect working (HTTP $FLIGHTS_STATUS)${NC}"
else
    echo -e "${YELLOW}⚠️  Flights redirect returned HTTP $FLIGHTS_STATUS${NC}"
fi

# Summary
echo ""
echo "============================"
echo -e "${GREEN}🎉 Local testing complete!${NC}"
echo "============================"
echo ""
echo "Server is running at: http://localhost:8080"
echo "Server PID: $SERVER_PID"
echo ""
echo "To stop the server:"
echo "  kill $SERVER_PID"
echo ""
echo "To test manually:"
echo "  curl http://localhost:8080/health"
echo "  curl -X POST http://localhost:8080/chat -H 'Content-Type: application/json' -d '{\"messages\":[{\"role\":\"user\",\"content\":\"Hello\"}]}'"
echo ""
echo "Press Ctrl+C to stop the server and exit"
echo ""

# Keep script running
wait $SERVER_PID
