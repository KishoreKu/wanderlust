#!/bin/bash

# Update all api.gubbu.io references to Cloud Run URL

echo "🔄 Updating API URLs to Cloud Run..."
echo ""

NEW_API_URL="https://gubbu-api-612568200950.us-central1.run.app"
OLD_API_URL="https://api.gubbu.io"

# Count total references
TOTAL=$(grep -r "$OLD_API_URL" src/ 2>/dev/null | wc -l | tr -d ' ')
echo "Found $TOTAL references to update"
echo ""

# Update all files
find src/ -type f \( -name "*.jsx" -o -name "*.js" -o -name "*.md" \) -exec sed -i '' "s|$OLD_API_URL|$NEW_API_URL|g" {} +

# Verify
REMAINING=$(grep -r "$OLD_API_URL" src/ 2>/dev/null | wc -l | tr -d ' ')

if [ "$REMAINING" -eq 0 ]; then
    echo "✅ Successfully updated all $TOTAL references!"
    echo ""
    echo "Updated files:"
    git diff --name-only src/
else
    echo "⚠️  Warning: $REMAINING references still remain"
fi

echo ""
echo "Next steps:"
echo "1. Review changes: git diff"
echo "2. Test locally: npm run dev"
echo "3. Commit: git add . && git commit -m 'feat: update API to Cloud Run endpoint'"
echo "4. Deploy: npm run build && firebase deploy --only hosting"
