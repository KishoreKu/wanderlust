# 📱 Zapier Social Media Automation Setup

This guide shows you how to automatically post your blog content to Instagram, Facebook, LinkedIn, TikTok, YouTube, Twitter, and Pinterest using Zapier.

## 🎯 What You Have

**Your Zapier Webhook URL:**
```
https://hooks.zapier.com/hooks/catch/16151270/uwsuse2/
```

This is already configured in `/public/api/notify-zapier.php`

## 📋 How It Works

```
Your Blog → notify-zapier.php → Zapier Webhook → Zapier Distributes → All Social Platforms
```

## 🚀 Setup Instructions

### Step 1: Configure Zapier Zap

1. Go to [Zapier](https://zapier.com/app/zaps)
2. Find your Zap with the webhook trigger `https://hooks.zapier.com/hooks/catch/16151270/uwsuse2/`
3. Add these **Actions** (one for each platform):

#### Instagram Action
- **App:** Instagram for Business
- **Action:** Create Photo Post
- **Fields to Map:**
  - Image URL: `image`
  - Caption: `instagram_caption`

#### Facebook Action
- **App:** Facebook Pages
- **Action:** Create Page Post
- **Fields to Map:**
  - Message: `facebook_post`
  - Link: `url`
  - Photo URL: `image`

#### LinkedIn Action
- **App:** LinkedIn
- **Action:** Create Share Update
- **Fields to Map:**
  - Content: `linkedin_post`
  - Link: `url`

#### Twitter Action
- **App:** Twitter
- **Action:** Create Tweet
- **Fields to Map:**
  - Message: `twitter_text`
  - Media URL: `image` (optional)

#### Pinterest Action
- **App:** Pinterest
- **Action:** Create Pin
- **Fields to Map:**
  - Image URL: `image`
  - Description: `pinterest_description`
  - Link: `url`

#### TikTok Action
- **App:** TikTok for Business (or use Buffer/Hootsuite)
- **Note:** TikTok doesn't have direct Zapier integration for posting videos
- **Workaround:** Send to Buffer/Hootsuite which can post to TikTok

#### YouTube Action
- **App:** YouTube
- **Action:** Upload Video (requires video file)
- **Note:** For blog posts, you might want to skip this or create video content separately

### Step 2: Test the Webhook

1. Open your browser and go to:
   ```
   https://yourdomain.com/post-to-social.html
   ```

2. Select a blog post (e.g., "Barcelona Activities Guide")

3. Click **"Post to All Platforms"**

4. Check Zapier dashboard to see if the webhook was received

5. Verify posts appear on your social media accounts

### Step 3: Automate New Blog Posts

To automatically post when you publish a new blog, you have two options:

#### Option A: Manual Posting (Recommended for now)
- Use the `/post-to-social.html` interface
- Select which blog post to share
- Click to post

#### Option B: Automatic on Publish (Advanced)
Add this code to your blog publishing workflow:

```javascript
// After publishing a blog post
const blogData = {
    title: "Your Blog Title",
    url: "https://yourdomain.com/blog/post-slug",
    excerpt: "Your excerpt...",
    image: "https://...",
    category: "Destinations",
    date: new Date().toISOString()
};

fetch('/api/notify-zapier.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blogData)
});
```

## 📊 Data Fields Sent to Zapier

The webhook sends these fields that you can use in your Zaps:

| Field | Description | Example |
|-------|-------------|---------|
| `title` | Blog post title | "Best Things to Do in Barcelona" |
| `url` | Full blog post URL | "https://yourdomain.com/blog/barcelona" |
| `excerpt` | Short description | "Experience the best of Barcelona..." |
| `image` | Header image URL | "https://images.unsplash.com/..." |
| `category` | Post category | "Destinations" |
| `published_date` | Publication date | "2026-01-04 22:00:00" |
| `instagram_caption` | Pre-formatted for Instagram | "✨ Best Things to Do in Barcelona..." |
| `twitter_text` | Pre-formatted for Twitter (280 chars) | "🌍 Best Things to Do in Barcelona..." |
| `linkedin_post` | Pre-formatted for LinkedIn | "Best Things to Do in Barcelona..." |
| `facebook_post` | Pre-formatted for Facebook | "📍 Best Things to Do in Barcelona..." |
| `pinterest_description` | Pre-formatted for Pinterest | "Best Things to Do in Barcelona | ..." |

## 🎨 Customizing Social Media Content

Edit `/public/api/notify-zapier.php` to customize how content is formatted for each platform:

```php
function generateInstagramCaption($post) {
    // Customize Instagram captions here
    $caption = "✨ " . $post['title'] . "\n\n";
    $caption .= $post['excerpt'] . "\n\n";
    $caption .= "#travel #wanderlust";
    return $caption;
}
```

## 🔍 Troubleshooting

### Webhook not receiving data
1. Check `/public/api/zapier-notifications.log` for errors
2. Verify the webhook URL in `notify-zapier.php` matches Zapier
3. Test with: `curl -X POST https://yourdomain.com/api/notify-zapier.php -d '{"title":"Test"}'`

### Posts not appearing on social media
1. Check Zapier dashboard for errors
2. Verify you've connected all social media accounts
3. Check each platform's API limits
4. Ensure images are publicly accessible URLs

### Instagram not posting
- Instagram requires a **Business Account**
- Images must be publicly accessible
- Caption must be under 2,200 characters

### TikTok/YouTube limitations
- These platforms don't support direct posting via Zapier
- Use Buffer, Hootsuite, or Later as intermediary
- Or manually post video content

## 📝 Best Practices

1. **Test First:** Always test with one platform before enabling all
2. **Image Quality:** Use high-resolution images (1200x630px minimum)
3. **Hashtags:** Customize hashtags for each platform
4. **Timing:** Schedule posts for optimal engagement times
5. **Monitoring:** Check the log file regularly: `/public/api/zapier-notifications.log`

## 🔐 Security

The webhook URL is public but only accepts POST requests. To add authentication:

```php
// Add to notify-zapier.php
$apiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';
if ($apiKey !== 'your-secret-key') {
    http_response_code(401);
    exit;
}
```

## 📞 Support

If you need help:
1. Check Zapier's task history for errors
2. Review the log file: `/public/api/zapier-notifications.log`
3. Test the webhook manually using the web interface

---

**Quick Start:**
1. ✅ Webhook URL is already configured
2. ✅ PHP handler is ready at `/public/api/notify-zapier.php`
3. ✅ Web interface available at `/post-to-social.html`
4. ⏳ Configure your Zapier Zap with the actions above
5. 🚀 Start posting!
