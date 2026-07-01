#!/bin/bash

# Gubbu API - Google Cloud Setup Script
# This script automates the initial Google Cloud setup

set -e

echo "🚀 Gubbu API - Google Cloud Setup"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ gcloud CLI not found${NC}"
    echo ""
    echo "Please install Google Cloud SDK:"
    echo "  brew install google-cloud-sdk"
    echo ""
    echo "Or visit: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

echo -e "${GREEN}✅ gcloud CLI found${NC}"
echo ""

# Login
echo "1️⃣  Authenticating with Google Cloud..."
gcloud auth login

# Get or create project
echo ""
echo "2️⃣  Setting up Google Cloud Project..."
echo ""
echo "ℹ️  You can find your Project ID at: https://console.cloud.google.com/home/dashboard"
echo "   (It's different from the Project Number!)"
echo ""
read -p "Enter your GCP Project ID (default: gubbu-api): " PROJECT_ID
PROJECT_ID=${PROJECT_ID:-gubbu-api}

# Validate it's not a number
if [[ "$PROJECT_ID" =~ ^[0-9]+$ ]]; then
    echo -e "${RED}❌ Error: You entered a project number, not a project ID${NC}"
    echo ""
    echo "Project ID should be like: gubbu-api"
    echo "Project Number looks like: 612568200950"
    echo ""
    echo "Please find your Project ID at: https://console.cloud.google.com/home/dashboard"
    exit 1
fi

# Check if project exists
if gcloud projects describe $PROJECT_ID &> /dev/null; then
    echo -e "${GREEN}✅ Using existing project: $PROJECT_ID${NC}"
else
    echo "Creating new project: $PROJECT_ID"
    gcloud projects create $PROJECT_ID --name="Gubbu API"
fi

# Set project using ID explicitly
gcloud config set project $PROJECT_ID
echo -e "${GREEN}✅ Project set to: $PROJECT_ID${NC}"

# Enable APIs
echo ""
echo "3️⃣  Enabling required Google Cloud APIs..."
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
echo -e "${GREEN}✅ APIs enabled${NC}"

# Create Artifact Registry
echo ""
echo "4️⃣  Creating Artifact Registry repository..."
REGION="us-central1"

if gcloud artifacts repositories describe gubbu-api --location=$REGION &> /dev/null; then
    echo -e "${GREEN}✅ Artifact Registry already exists${NC}"
else
    gcloud artifacts repositories create gubbu-api \
      --repository-format=docker \
      --location=$REGION \
      --description="Gubbu API Docker images"
    echo -e "${GREEN}✅ Artifact Registry created${NC}"
fi

# Create service account
echo ""
echo "5️⃣  Creating service account for GitHub Actions..."
SA_NAME="github-actions"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

if gcloud iam service-accounts describe $SA_EMAIL --project=$PROJECT_ID &> /dev/null; then
    echo -e "${YELLOW}⚠️  Service account already exists${NC}"
else
    gcloud iam service-accounts create $SA_NAME \
      --display-name="GitHub Actions Deployer" \
      --project=$PROJECT_ID
    echo -e "${GREEN}✅ Service account created${NC}"
    
    # Wait for service account to propagate
    echo "⏳ Waiting for service account to propagate (10 seconds)..."
    sleep 10
fi

# Grant permissions
echo ""
echo "6️⃣  Granting permissions to service account..."

# Add a retry mechanism for IAM binding
for i in {1..3}; do
    if gcloud projects add-iam-policy-binding $PROJECT_ID \
      --member="serviceAccount:$SA_EMAIL" \
      --role="roles/run.admin" \
      --condition=None 2>/dev/null; then
        break
    else
        if [ $i -lt 3 ]; then
            echo "⏳ Retrying in 5 seconds..."
            sleep 5
        fi
    fi
done

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/storage.admin" \
  --condition=None

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/artifactregistry.writer" \
  --condition=None

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/iam.serviceAccountUser" \
  --condition=None

echo -e "${GREEN}✅ Permissions granted${NC}"

# Create service account key
echo ""
echo "7️⃣  Creating service account key..."
KEY_FILE="$HOME/gubbu-api-key.json"

if [ -f "$KEY_FILE" ]; then
    echo -e "${YELLOW}⚠️  Key file already exists at $KEY_FILE${NC}"
    read -p "Overwrite? (y/n): " OVERWRITE
    if [ "$OVERWRITE" != "y" ]; then
        echo "Skipping key creation"
    else
        gcloud iam service-accounts keys create $KEY_FILE \
          --iam-account=$SA_EMAIL
        echo -e "${GREEN}✅ Service account key created${NC}"
    fi
else
    gcloud iam service-accounts keys create $KEY_FILE \
      --iam-account=$SA_EMAIL
    echo -e "${GREEN}✅ Service account key created at: $KEY_FILE${NC}"
fi

# Summary
echo ""
echo "=================================="
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "=================================="
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Add GitHub Secrets:"
echo "   Go to: https://github.com/KishoreKu/gubbu-api/settings/secrets/actions"
echo ""
echo "   Add these secrets:"
echo "   - GCP_PROJECT_ID: $PROJECT_ID"
echo "   - GCP_SA_KEY: (paste contents of $KEY_FILE)"
echo ""
echo "2. Copy the service account key:"
echo "   cat $KEY_FILE | pbcopy"
echo "   (Key is now in your clipboard)"
echo ""
echo "3. Add environment variable secrets from your .env file:"
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
echo "4. Push to GitHub to trigger deployment:"
echo "   git add ."
echo "   git commit -m 'feat: migrate to FastAPI + Google Cloud Run'"
echo "   git push origin main"
echo ""
echo "5. Monitor deployment:"
echo "   https://github.com/KishoreKu/gubbu-api/actions"
echo ""
echo "⚠️  IMPORTANT: Keep $KEY_FILE secure and delete after adding to GitHub!"
echo ""
