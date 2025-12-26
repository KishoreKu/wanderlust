# cPanel Deployment Guide

This guide explains how to deploy your travel blog website to cPanel hosting.

## Prerequisites

- cPanel hosting account with File Manager access
- FTP/SFTP credentials (optional, but recommended)
- Your domain configured in cPanel

## Deployment Steps

### Step 1: Build the Production Files

On your local machine, run:

```bash
npm run build
```

This creates a `dist` folder with all the production-ready files.

### Step 2: Upload Files to cPanel

You have two options:

#### Option A: Using cPanel File Manager (Easier)

1. **Login to cPanel**
2. **Open File Manager**
3. **Navigate to public_html** (or your domain's root directory)
4. **Delete default files** (index.html, cgi-bin, etc.) if this is a new site
5. **Upload the dist folder contents**:
   - Click "Upload" button
   - Select ALL files from your local `dist` folder
   - Wait for upload to complete
6. **Extract if needed**: If you uploaded a zip, extract it

#### Option B: Using FTP/SFTP (Recommended for large sites)

1. **Use an FTP client** (FileZilla, Cyberduck, or Transmit)
2. **Connect to your cPanel**:
   - Host: your-domain.com or ftp.your-domain.com
   - Username: your cPanel username
   - Password: your cPanel password
   - Port: 21 (FTP) or 22 (SFTP)
3. **Navigate to public_html**
4. **Upload all files from the `dist` folder** (not the folder itself)

### Step 3: Configure .htaccess for React Router

Since your site uses React Router, you need to configure URL rewriting.

Create a `.htaccess` file in your `public_html` directory with this content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-XSS-Protection "1; mode=block"
  Header set X-Frame-Options "DENY"
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

### Step 4: Verify Deployment

1. Visit your domain: `https://your-domain.com`
2. Test all pages and navigation
3. Check that images load correctly
4. Test the newsletter subscription form
5. Verify affiliate links work

## File Structure in cPanel

After deployment, your `public_html` should look like:

```
public_html/
├── .htaccess
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
└── [other build files]
```

## Updating Your Site

Whenever you make changes:

1. **Build locally**: `npm run build`
2. **Backup current files** (optional but recommended)
3. **Delete old files** from public_html (except .htaccess)
4. **Upload new dist folder contents**

## Automated Deployment (Optional)

For easier updates, you can use Git deployment:

1. **Enable Git Version Control** in cPanel
2. **Create a deployment script** that runs `npm run build`
3. **Set up a webhook** from GitHub to trigger builds

## Troubleshooting

### Issue: Blank page or 404 errors

**Solution**: Make sure `.htaccess` is configured correctly and all files from `dist` are uploaded.

### Issue: Images not loading

**Solution**: Check that the `assets` folder is uploaded and file permissions are correct (644 for files, 755 for folders).

### Issue: Routes not working (404 on refresh)

**Solution**: Verify `.htaccess` is in place and `mod_rewrite` is enabled on your server.

### Issue: Affiliate links not working

**Solution**: Check that your Travelpayouts configuration in `src/config/affiliate.js` is correct before building.

## Performance Tips

1. **Enable cPanel's built-in caching** if available
2. **Use Cloudflare** (free) for CDN and additional caching
3. **Optimize images** before building (use WebP format)
4. **Enable GZIP compression** (included in .htaccess above)

## Domain Configuration

If using a subdomain or addon domain:

1. **Create the domain** in cPanel
2. **Note the document root** (e.g., `public_html/subdomain`)
3. **Upload files to that directory** instead of public_html
4. **Add .htaccess** to the same directory

## Need Help?

- Check cPanel documentation for your hosting provider
- Contact your hosting support for server-specific issues
- Verify Node.js/npm versions if using cPanel's Node.js features

---

**Ready to deploy?** Run `npm run build` and follow the steps above!
