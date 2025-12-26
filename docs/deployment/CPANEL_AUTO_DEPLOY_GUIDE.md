# Auto-Deploy to cPanel from GitHub

This guide shows you how to automatically deploy your travel blog website to cPanel whenever you push to GitHub.

## Methods Overview

There are 3 main approaches:

1. **Git Version Control (cPanel Built-in)** - Easiest, but limited
2. **GitHub Actions + FTP** - Most reliable, recommended
3. **Webhooks + Custom Script** - Advanced, requires SSH access

---

## Method 1: cPanel Git Version Control (Easiest)

### Requirements
- cPanel with "Git Version Control" feature
- Your hosting must support this (check cPanel → Software → Git Version Control)

### Limitations
⚠️ **This method has a major limitation**: It only pulls source code, it doesn't run `npm run build`!

This means you'd need to:
- Commit your `dist` folder to GitHub (not recommended)
- OR manually build and upload

**Verdict**: Not ideal for React/Vite projects. Skip to Method 2.

---

## Method 2: GitHub Actions + FTP (Recommended) ✅

This automatically builds and deploys your site whenever you push to GitHub.

### Step 1: Get Your cPanel FTP Credentials

1. Login to cPanel
2. Go to **FTP Accounts**
3. Note your FTP credentials:
   - **FTP Server**: `ftp.yourdomain.com` or your server IP
   - **Username**: Your cPanel username
   - **Password**: Your cPanel password
   - **Port**: 21 (or 22 for SFTP)

### Step 2: Add Secrets to GitHub

1. Go to your GitHub repository: `https://github.com/KishoreKu/wanderlust`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:

   - **Name**: `FTP_SERVER`  
     **Value**: `ftp.yourdomain.com`

   - **Name**: `FTP_USERNAME`  
     **Value**: Your cPanel FTP username

   - **Name**: `FTP_PASSWORD`  
     **Value**: Your cPanel FTP password

### Step 3: Create GitHub Actions Workflow

Create this file in your repository:

**File**: `.github/workflows/deploy-cpanel.yml`

```yaml
name: Deploy to cPanel

on:
  push:
    branches:
      - main  # Deploy when pushing to main branch

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Deploy to cPanel via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/
          server-dir: /public_html/
          dangerous-clean-slate: false

      - name: Upload .htaccess
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./
          server-dir: /public_html/
          exclude: |
            **
            !.htaccess
```

### Step 4: Create .htaccess in Your Repository

Create this file in your project root:

**File**: `.htaccess`

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# GZIP Compression
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
```

### Step 5: Commit and Push

```bash
git add .github/workflows/deploy-cpanel.yml .htaccess
git commit -m "Add auto-deployment to cPanel via GitHub Actions"
git push origin main
```

### Step 6: Verify Deployment

1. Go to GitHub → Your repository → **Actions** tab
2. You should see the workflow running
3. Wait for it to complete (usually 2-3 minutes)
4. Check your website!

### How It Works

Every time you push to the `main` branch:
1. ✅ GitHub Actions spins up a server
2. ✅ Installs Node.js 20
3. ✅ Installs your dependencies
4. ✅ Runs `npm run build`
5. ✅ Uploads the `dist` folder to your cPanel via FTP
6. ✅ Your site is live!

---

## Method 3: Webhooks + Custom Script (Advanced)

### Requirements
- SSH access to your cPanel server
- Node.js installed on the server
- Ability to run custom scripts

### Overview
1. Set up a webhook endpoint on your server
2. Configure GitHub to call this webhook on push
3. Script pulls code, builds, and deploys

### Why This Is Complex
- Most shared hosting doesn't allow long-running processes
- Building on the server requires Node.js and sufficient resources
- Requires advanced server configuration

**Verdict**: Only use if you have VPS/dedicated server with SSH access.

---

## Comparison

| Method | Ease | Build Support | Recommended |
|--------|------|---------------|-------------|
| cPanel Git | ⭐⭐⭐ | ❌ No | ❌ |
| GitHub Actions + FTP | ⭐⭐ | ✅ Yes | ✅ **Best** |
| Webhooks + Script | ⭐ | ✅ Yes | Only for VPS |

---

## Troubleshooting GitHub Actions

### Build fails with "npm ci" error
**Solution**: Make sure `package-lock.json` is committed to your repository.

### FTP upload fails
**Solution**: 
- Verify FTP credentials in GitHub Secrets
- Check that FTP port 21 is not blocked by your host
- Try using SFTP (port 22) instead

### Files uploaded but site doesn't work
**Solution**: 
- Check that `server-dir` is correct (`/public_html/` or `/public_html/yourdomain/`)
- Verify `.htaccess` was uploaded
- Check file permissions in cPanel

### Want to deploy to a subdomain?
**Solution**: Change `server-dir` in the workflow:
```yaml
server-dir: /public_html/subdomain_name/
```

---

## Next Steps

1. **Choose Method 2** (GitHub Actions + FTP)
2. **Set up FTP credentials** in GitHub Secrets
3. **Create the workflow file**
4. **Push to GitHub**
5. **Watch it deploy automatically!** 🚀

From now on, every time you push to GitHub, your cPanel site will automatically update!
