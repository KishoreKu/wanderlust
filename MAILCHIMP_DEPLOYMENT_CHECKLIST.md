# Mailchimp Deployment Checklist

## ✅ What's Been Done:
1. ✅ Created secure PHP backend for Mailchimp (`/public/api/subscribe.php`)
2. ✅ Updated Blog page to use Mailchimp instead of Formspree
3. ✅ Added loading states and better error messages
4. ✅ Configured environment variables for security
5. ✅ Pushed code to GitHub (automated deployment triggered)

## 🔧 What You Need to Do on cPanel:

### Step 1: Set Environment Variables
After the automated deployment completes, you need to configure Mailchimp credentials:

**Get your credentials from:** `MAILCHIMP_CREDENTIALS_PRIVATE.txt` (in your project folder)

**Option A: Using cPanel PHP Options (Recommended)**
1. Login to your cPanel
2. Navigate to: **Software** → **Select PHP Version** → **Switch to PHP Options**
3. Click "Add" and create these environment variables (use values from MAILCHIMP_CREDENTIALS_PRIVATE.txt):
   ```
   MAILCHIMP_API_KEY = [your-api-key-from-private-file]
   MAILCHIMP_LIST_ID = [your-list-id-from-private-file]
   MAILCHIMP_SERVER = [your-server-prefix-from-private-file]
   ```
4. Save changes

**Option B: Using .htaccess File**
1. Go to cPanel → File Manager
2. Navigate to `/public_html/api/` (or wherever your site is deployed)
3. Create a new file named `.htaccess`
4. Add content from `MAILCHIMP_CREDENTIALS_PRIVATE.txt` (see the .htaccess format in that file)
5. Save the file

### Step 2: Test the Newsletter
1. Visit your live website
2. Go to the Blog page
3. Scroll to the newsletter subscription form
4. Enter a test email address
5. Click "Subscribe"
6. You should see: "🎉 Thanks for subscribing! You're now part of our travel community."

### Step 3: Verify in Mailchimp
1. Login to your Mailchimp account
2. Go to: Audience → All contacts
3. Check if your test email appears in the list

## 🐛 Troubleshooting:

### If you see "Newsletter service is not configured":
- Environment variables are not set correctly
- Double-check the variable names match exactly
- Try Option B (.htaccess) if Option A doesn't work

### If you see "Something went wrong":
- Check that your Mailchimp API key is still valid
- Verify the Audience ID is correct
- Check PHP error logs in cPanel

### If nothing happens:
- Make sure the `/api/subscribe.php` file exists on your server
- Check that PHP is enabled on your hosting
- Verify CORS is not blocking the request

## 📝 Notes:

- The credentials file `MAILCHIMP_CREDENTIALS_PRIVATE.txt` is on your local machine only (not in Git)
- Keep this file safe for future reference
- The automated deployment will copy the PHP file to your server
- Environment variables need to be set manually (one-time setup)

## 🎉 Once Complete:

Your newsletter will be fully integrated with Mailchimp! All new subscribers will be automatically added to your Mailchimp audience.
