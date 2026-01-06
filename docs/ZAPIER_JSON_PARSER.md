# Parsing JSON in Zapier for Social Media Posts

Since your webhook sends JSON data in the `raw_body` field, you need to parse it before using it in Hootsuite/Buffer.

## 🔧 Solution: Add a "Code by Zapier" Step

### Step-by-Step:

1. **Between your Webhook and Hootsuite**, add a new step
2. Search for **"Code by Zapier"**
3. Choose **"Run JavaScript"**
4. Use this code:

```javascript
// Input Data
const rawBody = inputData.raw_body;

// Parse the JSON
const data = JSON.parse(rawBody);

// Return the parsed fields
return {
  title: data.title || '',
  url: data.url || '',
  excerpt: data.excerpt || '',
  image: data.image || '',
  twitter_text: data.twitter_text || '',
  instagram_caption: data.instagram_caption || '',
  linkedin_post: data.linkedin_post || '',
  facebook_post: data.facebook_post || '',
  pinterest_description: data.pinterest_description || ''
};
```

### Then in Hootsuite:

- **Text field**: Use `twitter_text` from the Code step output
- **Photo URL**: Use `image` from the Code step output

---

## ✅ Alternative Options (Easier):

### Option 2: Use Buffer
- Buffer has better Zapier integration
- Supports Twitter/X, Instagram, Facebook, LinkedIn, Pinterest
- **Add Action** → Search "Buffer" → "Create Post"

### Option 3: Use Make.com Instead of Zapier
- Make.com (formerly Integromat) has better social media integrations
- Still supports Twitter/X posting
- Free tier available

### Option 4: Use Airtable as Intermediary
1. Webhook → Save to Airtable
2. Manually review posts in Airtable
3. Use Airtable automations to post to social media

---

## 🎯 Recommended: Use Buffer

Buffer is the best option because:
- ✅ Works with Zapier
- ✅ Supports all platforms (Twitter, Instagram, Facebook, LinkedIn, Pinterest, TikTok)
- ✅ Has scheduling features
- ✅ Free tier available

### Setup with Buffer:

1. Sign up for Buffer (free): https://buffer.com
2. Connect your social accounts to Buffer
3. In Zapier:
   - **Action**: Buffer → "Create Post"
   - **Text**: Use the parsed `twitter_text` field
   - **Media**: Use the parsed `image` field
   - **Profiles**: Select which social accounts to post to

This way you can post to ALL platforms with one action!
