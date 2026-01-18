# Deployment (Auto + Manual)

This project uses GitHub Actions to automatically build and deploy to cPanel whenever you push to `main`. Manual options are included for reference.

## Auto-Deploy (Recommended)

**Hosting:** cPanel (gubbu.io)
**Workflow:** `.github/workflows/deploy-cpanel.yml`
**Trigger:** push to `main`

### How it works
1. Push code to GitHub (`main`)
2. GitHub Actions runs `npm ci` + `npm run build`
3. `dist/` is uploaded to cPanel via FTP
4. Site updates go live in ~5–10 minutes

### Required GitHub Secrets
Set these in GitHub → Settings → Secrets and variables → Actions:
- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`

### Verify deployment
1. Check Actions: https://github.com/KishoreKu/wanderlust/actions
2. Wait 5–10 minutes
3. Hard refresh the site (Cmd/Ctrl+Shift+R)

### Troubleshooting
- Build fails: check `npm run build` locally; confirm `package-lock.json` committed
- FTP fails: verify secrets and FTP port 21 access
- Changes not visible: wait 10 minutes, then hard refresh

## Manual cPanel Deploy (Fallback)

Only use if auto-deploy is unavailable.

1. Run `npm run build`
2. Upload `dist/` to `/public_html/`
3. Upload `.htaccess` to `/public_html/`

## Netlify / Other Hosts (Optional)

Build and deploy the `dist/` folder on your preferred static host.

```
npm run build
```

## Notes
- Do not edit files in cPanel directly when auto-deploy is enabled.
- Auto-deploy is the source of truth for production changes.
