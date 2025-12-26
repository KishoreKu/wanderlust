# Deployment Information

## Current Deployment Setup

**Hosting:** cPanel (gubbu.io)
**Auto-Deploy:** ✅ YES - GitHub Actions
**Method:** GitHub Actions + FTP Deploy

---

## How Auto-Deploy Works

### Workflow File
`.github/workflows/deploy-cpanel.yml`

### Trigger
- Automatically deploys on every push to `main` branch
- No manual deployment needed!

### Process
1. Push code to GitHub
2. GitHub Actions automatically:
   - Builds the project (`npm run build`)
   - Creates `dist` folder
   - Uploads to cPanel via FTP
3. Site is live in 5-10 minutes

### Deployment Timeline
- **Build time:** 2-3 minutes
- **Upload time:** 1-2 minutes
- **Total:** 5-10 minutes from push to live

---

## Important Notes

### DO NOT:
- ❌ Manually upload files to cPanel
- ❌ Run `npm run build` and upload dist folder manually
- ❌ Use cPanel file manager to edit files

### INSTEAD:
- ✅ Make changes locally
- ✅ Commit to Git
- ✅ Push to GitHub
- ✅ Wait 5-10 minutes for auto-deploy

---

## Deployment Secrets (GitHub)

The following secrets are configured in GitHub repository settings:
- `FTP_SERVER` - cPanel FTP server
- `FTP_USERNAME` - cPanel FTP username
- `FTP_PASSWORD` - cPanel FTP password

**Location:** https://github.com/KishoreKu/wanderlust/settings/secrets/actions

---

## Verifying Deployment

### Check GitHub Actions
1. Go to: https://github.com/KishoreKu/wanderlust/actions
2. Latest workflow should show green checkmark ✅
3. Click on it to see deployment logs

### Check Live Site
1. Wait 5-10 minutes after push
2. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Check browser console for errors
4. Verify changes are live

---

## Troubleshooting

### If deployment fails:
1. Check GitHub Actions tab for errors
2. Verify FTP credentials in GitHub Secrets
3. Check cPanel file permissions
4. Review workflow logs for specific error

### If changes don't appear:
1. Wait full 10 minutes
2. Hard refresh browser (Ctrl+Shift+R)
3. Clear browser cache
4. Check GitHub Actions completed successfully

---

## Tech Stack

- **Framework:** React + Vite
- **Hosting:** cPanel (shared hosting)
- **Domain:** gubbu.io
- **CI/CD:** GitHub Actions
- **Deployment:** FTP Deploy Action

---

## Last Updated
December 25, 2024

**Status:** ✅ Auto-deploy is working correctly
