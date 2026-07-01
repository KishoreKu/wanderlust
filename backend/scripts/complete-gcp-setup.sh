#!/bin/bash

# Complete GCP Setup - Run this to finish the setup after service account creation

set -e

PROJECT_ID="gubbu-api"
SA_EMAIL="github-actions@${PROJECT_ID}.iam.gserviceaccount.com"

echo "🔧 Completing GCP Setup for Gubbu API"
echo "======================================"
echo ""

# Grant remaining permissions
echo "Granting permissions to service account..."
echo ""

echo "1/4: Adding storage.admin role..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/storage.admin" \
  --condition=None

echo "2/4: Adding artifactregistry.writer role..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/artifactregistry.writer" \
  --condition=None

echo "3/4: Adding iam.serviceAccountUser role..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/iam.serviceAccountUser" \
  --condition=None

echo "4/4: Adding run.admin role (if not already added)..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/run.admin" \
  --condition=None 2>/dev/null || echo "  (already exists)"

echo ""
echo "✅ Permissions granted"
echo ""

# Create service account key
echo "Creating service account key..."
KEY_FILE="$HOME/gubbu-api-key.json"

if [ -f "$KEY_FILE" ]; then
    echo "⚠️  Key file already exists at $KEY_FILE"
    read -p "Overwrite? (y/n): " OVERWRITE
    if [ "$OVERWRITE" != "y" ]; then
        echo "Using existing key file"
    else
        gcloud iam service-accounts keys create $KEY_FILE \
          --iam-account=$SA_EMAIL \
          --project=$PROJECT_ID
        echo "✅ New service account key created"
    fi
else
    gcloud iam service-accounts keys create $KEY_FILE \
      --iam-account=$SA_EMAIL \
      --project=$PROJECT_ID
    echo "✅ Service account key created at: $KEY_FILE"
fi

echo ""

# Copy to clipboard
echo "Copying key to clipboard..."
cat $KEY_FILE | pbcopy
echo "✅ Key copied to clipboard!"

echo ""
echo "======================================"
echo "🎉 Setup Complete!"
echo "======================================"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Add GitHub Secrets:"
echo "   Go to: https://github.com/KishoreKu/gubbu-api/settings/secrets/actions"
echo ""
echo "   Add these secrets:"
echo "   - GCP_PROJECT_ID: gubbu-api"
echo "   - GCP_SA_KEY: (paste from clipboard - already copied!)"
echo ""
echo "2. Add environment variable secrets from your .env file:"
echo "   - GOOGLE_API_KEY"
echo "   - SUPABASE_URL"
echo "   - SUPABASE_SERVICE_ROLE_KEY"
echo "   - TP_FLIGHTS_BASE"
echo "   - TP_HOTELS_BASE"
echo "   - TP_ACTIVITIES_BASE"
echo "   - AMAZON_ASSOCIATE_TAG"
echo "   - RAKUTEN_AFFILIATE_ID"
echo "   - RAKUTEN_MERCHANT_ID"
echo "   - RAKUTEN_SEARCH_BASE"
echo ""
echo "3. Deploy:"
echo "   git add ."
echo "   git commit -m 'feat: migrate to FastAPI + Google Cloud Run'"
echo "   git push origin main"
echo ""
echo "⚠️  IMPORTANT: Delete $KEY_FILE after adding to GitHub!"
echo ""
