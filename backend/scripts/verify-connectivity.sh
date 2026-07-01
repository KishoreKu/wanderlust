#!/bin/bash

# DNS and API Verification Script for api.gubbu.io
# Run this after adding the DNS A record to verify everything works

set -e

echo "🔍 Gubbu API Connectivity Test"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: DNS Resolution
echo "1️⃣  Testing DNS resolution for api.gubbu.io..."
DNS_RESULT=$(dig api.gubbu.io +short 2>&1 || echo "FAILED")

if [ -z "$DNS_RESULT" ] || [ "$DNS_RESULT" = "FAILED" ]; then
    echo -e "${RED}❌ FAILED: api.gubbu.io does not resolve${NC}"
    echo ""
    echo "📋 Action Required:"
    echo "   1. Log into Namecheap"
    echo "   2. Go to Domain List → Manage gubbu.io → Advanced DNS"
    echo "   3. Add A Record:"
    echo "      - Host: api"
    echo "      - Value: [Your cPanel Server IP]"
    echo "      - TTL: Automatic"
    echo ""
    echo "   Wait 5-15 minutes after adding the record, then run this script again."
    exit 1
else
    echo -e "${GREEN}✅ PASSED: api.gubbu.io resolves to: $DNS_RESULT${NC}"
fi

echo ""

# Test 2: HTTP Connectivity
echo "2️⃣  Testing HTTP connectivity..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 https://api.gubbu.io/health 2>&1 || echo "000")

if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ PASSED: API is reachable (HTTP $HTTP_STATUS)${NC}"
elif [ "$HTTP_STATUS" = "000" ]; then
    echo -e "${RED}❌ FAILED: Cannot connect to API (connection timeout or SSL error)${NC}"
    echo ""
    echo "📋 Possible Issues:"
    echo "   - SSL certificate not yet provisioned (wait 1-24 hours)"
    echo "   - cPanel Node.js app not running"
    echo "   - Firewall blocking connections"
    echo ""
    echo "   Try HTTP instead:"
    echo "   curl -I http://api.gubbu.io/health"
    exit 1
else
    echo -e "${YELLOW}⚠️  WARNING: API returned HTTP $HTTP_STATUS${NC}"
    echo ""
    echo "📋 Check cPanel:"
    echo "   - Verify Node.js app is running"
    echo "   - Check application logs"
    echo "   - Ensure app is bound to api.gubbu.io domain"
fi

echo ""

# Test 3: API Health Response
echo "3️⃣  Testing API health endpoint..."
HEALTH_RESPONSE=$(curl -s https://api.gubbu.io/health 2>&1 || echo "{}")

if echo "$HEALTH_RESPONSE" | grep -q '"status":"ok"'; then
    echo -e "${GREEN}✅ PASSED: API health check successful${NC}"
    echo ""
    echo "📊 API Status:"
    echo "$HEALTH_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$HEALTH_RESPONSE"
else
    echo -e "${RED}❌ FAILED: Invalid health response${NC}"
    echo "Response: $HEALTH_RESPONSE"
    exit 1
fi

echo ""

# Test 4: CORS Headers
echo "4️⃣  Testing CORS configuration..."
CORS_ORIGIN=$(curl -s -H "Origin: https://gubbu.io" -I https://api.gubbu.io/health 2>&1 | grep -i "access-control-allow-origin" || echo "")

if echo "$CORS_ORIGIN" | grep -q "https://gubbu.io"; then
    echo -e "${GREEN}✅ PASSED: CORS headers configured correctly${NC}"
else
    echo -e "${YELLOW}⚠️  WARNING: CORS headers may not be configured${NC}"
    echo "   This could cause issues with frontend requests"
fi

echo ""

# Test 5: Frontend DNS
echo "5️⃣  Verifying frontend DNS (gubbu.io)..."
FRONTEND_DNS=$(dig gubbu.io +short 2>&1 || echo "FAILED")

if echo "$FRONTEND_DNS" | grep -q "199.36.158.100"; then
    echo -e "${GREEN}✅ PASSED: gubbu.io points to Firebase (199.36.158.100)${NC}"
else
    echo -e "${YELLOW}⚠️  WARNING: gubbu.io DNS may have changed${NC}"
    echo "   Current: $FRONTEND_DNS"
    echo "   Expected: 199.36.158.100 (Firebase)"
fi

echo ""
echo "================================"
echo -e "${GREEN}🎉 All critical tests passed!${NC}"
echo ""
echo "Next Steps:"
echo "1. Test the chatbot at https://gubbu.io"
echo "2. Send a test message"
echo "3. Verify you receive a response"
echo ""
echo "If chatbot still fails, check browser console for errors:"
echo "  - Press F12 → Console tab"
echo "  - Look for network errors or CORS issues"
echo ""
