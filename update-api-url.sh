#!/bin/bash

# Update all API references to the new Azure Container App URL

echo "🔄 Updating API URLs to Azure Container Apps..."
echo ""

NEW_API_URL="https://gubbu-api.proudwater-f3417084.eastus2.azurecontainerapps.io"
OLD_API_URL_1="https://api.gubbu.io"
OLD_API_URL_2="https://gubbu-api-612568200950.us-central1.run.app"

# Count total references
TOTAL_1=$(grep -r "$OLD_API_URL_1" src/ 2>/dev/null | wc -l | tr -d ' ')
TOTAL_2=$(grep -r "$OLD_API_URL_2" src/ 2>/dev/null | wc -l | tr -d ' ')
echo "Found $TOTAL_1 references to $OLD_API_URL_1"
echo "Found $TOTAL_2 references to $OLD_API_URL_2"
echo ""

# Update references to OLD_API_URL_1
if [ "$TOTAL_1" -gt 0 ]; then
    echo "Replacing $OLD_API_URL_1 with $NEW_API_URL..."
    find src/ -type f \( -name "*.jsx" -o -name "*.js" -o -name "*.md" \) -exec sed -i '' "s|$OLD_API_URL_1|$NEW_API_URL|g" {} +
fi

# Update references to OLD_API_URL_2
if [ "$TOTAL_2" -gt 0 ]; then
    echo "Replacing $OLD_API_URL_2 with $NEW_API_URL..."
    find src/ -type f \( -name "*.jsx" -o -name "*.js" -o -name "*.md" \) -exec sed -i '' "s|$OLD_API_URL_2|$NEW_API_URL|g" {} +
fi

# Verify
REMAINING_1=$(grep -r "$OLD_API_URL_1" src/ 2>/dev/null | wc -l | tr -d ' ')
REMAINING_2=$(grep -r "$OLD_API_URL_2" src/ 2>/dev/null | wc -l | tr -d ' ')

if [ "$REMAINING_1" -eq 0 ] && [ "$REMAINING_2" -eq 0 ]; then
    echo "✅ Successfully updated all references to Azure Container App endpoint!"
    echo ""
    echo "Updated files:"
    git diff --name-only src/
else
    echo "⚠️  Warning: Some references still remain (api.gubbu.io: $REMAINING_1, gcp-run: $REMAINING_2)"
fi
