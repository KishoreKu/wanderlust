# Mailchimp Newsletter Integration

This project uses Mailchimp for newsletter subscriptions via a secure PHP backend.

## Configuration

The Mailchimp integration uses **environment variables** for security.

### Setting Up on cPanel:

**Option 1: Using cPanel Environment Variables (Recommended)**
1. Login to cPanel
2. Go to **Software** → **Select PHP Version** → **Switch to PHP Options**
3. Add these environment variables:
   - `MAILCHIMP_API_KEY` = `your-mailchimp-api-key-here`
   - `MAILCHIMP_LIST_ID` = `your-audience-id-here`
   - `MAILCHIMP_SERVER` = `your-server-prefix` (e.g., us18)

**Option 2: Using .htaccess**
1. Create a file `/public/api/.htaccess` with:
   ```apache
   SetEnv MAILCHIMP_API_KEY "your-mailchimp-api-key-here"
   SetEnv MAILCHIMP_LIST_ID "your-audience-id-here"
   SetEnv MAILCHIMP_SERVER "your-server-prefix"
   ```
2. **DO NOT** commit this file to Git
3. Upload it directly to your server via cPanel File Manager

### Current Settings:
- **Audience ID**: Set via environment variables
- **Server Prefix**: Set via environment variables
- **API Key**: Set via environment variables (secure!)

## How It Works

1. User enters email in the newsletter form (Blog page)
2. Form submits to `/api/subscribe.php`
3. PHP script validates email and sends to Mailchimp API
4. User receives success/error message

## Security Notes

⚠️ **IMPORTANT**: The API key is stored in the PHP file. This is secure because:
- PHP runs server-side (not exposed to browsers)
- The API key is never sent to the client
- Only the PHP script can access it

## Updating Mailchimp Credentials

To update your Mailchimp credentials:

1. Edit `/public/api/subscribe.php`
2. Update these variables:
   ```php
   $apiKey = 'your-api-key-here';
   $listId = 'your-audience-id-here';
   $dataCenter = 'your-server-prefix-here';
   ```
3. Commit and push changes to deploy

## Testing

### Local Testing:
The PHP file won't work on the Vite dev server. To test locally:
1. Use a local PHP server: `php -S localhost:8000 -t public`
2. Or test directly on your live site after deployment

### Production:
After deployment, test the newsletter form on your live site.

## Troubleshooting

### "Failed to subscribe" error:
- Check that the API key is valid
- Verify the Audience ID is correct
- Ensure the server prefix matches your Mailchimp account

### "Already subscribed" message:
- This is normal if the email is already in your list
- User will see: "This email is already subscribed to our newsletter."

### CORS errors:
- The PHP script includes CORS headers
- Should work from any domain

## Mailchimp Dashboard

View your subscribers at:
https://us18.admin.mailchimp.com/lists/members/?id=XXXXXX

Replace XXXXXX with your list web ID (found in Audience settings).

## Double Opt-In

Currently set to **single opt-in** (immediate subscription).

To enable double opt-in:
1. Edit `/public/api/subscribe.php`
2. Change `'status' => 'subscribed'` to `'status' => 'pending'`
3. Users will receive a confirmation email before being added

## Features

✅ Email validation
✅ Duplicate detection
✅ Error handling
✅ Loading states
✅ User-friendly messages
✅ Secure API key storage
