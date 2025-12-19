# Deployment Guide - TravelHub Website

Your travel blog website is ready to deploy! This guide covers deploying to Netlify with your custom domain.

## 📋 Pre-Deployment Checklist

Before deploying, make sure you have:

- ✅ Your Travelpayouts Marker (affiliate ID)
- ✅ Your custom domain name
- ✅ Access to your domain's DNS settings
- ✅ A Netlify account (free - sign up at netlify.com)

## 🚀 Deployment Options

### Option 1: Netlify Drop (Easiest - No Git Required)

1. **Build the website** (already done ✓)
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag and drop the entire `dist` folder
   - Your site will be live in seconds!

3. **Add your Travelpayouts credentials:**
   - In Netlify dashboard, go to **Site Settings** → **Environment Variables**
   - Add: `VITE_TRAVELPAYOUTS_MARKER` = your marker ID
   - Click **Save**

4. **Redeploy** to apply the environment variables:
   - Go to **Deploys** tab
   - Click **Trigger Deploy** → **Deploy Site**

### Option 2: Netlify CLI (Recommended for Updates)

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

4. Follow the prompts to create a new site or link to existing

### Option 3: Git-Based Deployment (Best for Teams)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - TravelHub website"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [https://app.netlify.com](https://app.netlify.com)
   - Click **Add new site** → **Import an existing project**
   - Choose GitHub and select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add environment variables (see below)
   - Click **Deploy**

3. **Auto-deploys:** Every push to main branch will auto-deploy!

## 🔧 Environment Variables Setup

In Netlify dashboard (**Site Settings** → **Environment Variables**):

| Variable Name | Value | Required |
|--------------|-------|----------|
| `VITE_TRAVELPAYOUTS_MARKER` | Your Travelpayouts marker | Yes |
| `VITE_TRAVELPAYOUTS_API_TOKEN` | Your API token | Optional |

**Important:** After adding environment variables, you must redeploy for changes to take effect.

## 🌐 Connect Your Custom Domain

### Step 1: Add Domain in Netlify

1. In Netlify dashboard, go to **Domain Settings**
2. Click **Add custom domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Click **Verify**

### Step 2: Configure DNS

Netlify will provide DNS instructions. You have two options:

#### Option A: Use Netlify DNS (Easiest)
1. In your domain registrar, update nameservers to Netlify's:
   - `dns1.p01.nsone.net`
   - `dns2.p01.nsone.net`
   - `dns3.p01.nsone.net`
   - `dns4.p01.nsone.net`
2. Wait for DNS propagation (can take up to 48 hours)

#### Option B: Keep Your Current DNS
1. In your domain's DNS settings, add these records:

   **For root domain (yourdomain.com):**
   - Type: `A`
   - Name: `@`
   - Value: `75.2.60.5` (Netlify's load balancer)

   **For www subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `your-site-name.netlify.app`

2. Save DNS changes

### Step 3: Enable HTTPS

1. In Netlify, go to **Domain Settings** → **HTTPS**
2. Click **Verify DNS configuration**
3. Once verified, click **Provision certificate**
4. Free SSL certificate will be automatically issued!

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Website loads on your custom domain
- [ ] HTTPS is working (green padlock in browser)
- [ ] All pages are accessible (Home, Blog, Hotels, Flights, Destinations)
- [ ] Hotel search redirects with your Travelpayouts marker
- [ ] Flight search redirects with your Travelpayouts marker
- [ ] "Book Now" buttons include your affiliate tracking
- [ ] Mobile responsive design works correctly
- [ ] Images load properly

## 🧪 Testing Your Affiliate Links

1. Click on a hotel "Book Now" button
2. Check the URL - it should include your marker parameter
3. Click on a flight "Book Now" button
4. Verify your marker is in the URL
5. Check your Travelpayouts dashboard for click tracking

## 🔄 Making Updates

### If you used Netlify Drop:
1. Make changes locally
2. Run `npm run build`
3. Drag the new `dist` folder to Netlify

### If you used Git deployment:
1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
3. Netlify auto-deploys!

## 📊 Performance Optimization

Your site is already optimized, but for even better performance:

1. **Enable Netlify's Asset Optimization:**
   - Go to **Site Settings** → **Build & Deploy** → **Post Processing**
   - Enable: Bundle CSS, Minify CSS, Minify JS, Compress images

2. **Add Netlify Analytics** (optional, paid):
   - Get real-time visitor data
   - No cookies or tracking scripts needed

## 🐛 Troubleshooting

### Site shows 404 on refresh
- Check that `netlify.toml` exists with the redirect rule (already included ✓)

### Affiliate links not working
- Verify environment variables are set
- Check that you redeployed after adding variables
- Confirm your Travelpayouts marker is correct

### Domain not connecting
- Wait 24-48 hours for DNS propagation
- Use [https://dnschecker.org](https://dnschecker.org) to check DNS status
- Verify DNS records are correct

### Build fails
- Check that all dependencies are in `package.json`
- Ensure Node version is 16+
- Review build logs in Netlify dashboard

## 📞 Support Resources

- **Netlify Docs:** [https://docs.netlify.com](https://docs.netlify.com)
- **Netlify Support:** [https://answers.netlify.com](https://answers.netlify.com)
- **Travelpayouts Support:** [https://support.travelpayouts.com](https://support.travelpayouts.com)

## 🎉 You're Live!

Once deployed, your travel blog is ready to:
- Attract visitors with beautiful design
- Share travel tips and guides
- Earn affiliate commissions from bookings
- Grow your travel business!

**Next Steps:**
1. Add your Travelpayouts marker to `src/config/affiliate.js`
2. Deploy using one of the methods above
3. Connect your custom domain
4. Start promoting your site!
5. Monitor earnings in your Travelpayouts dashboard

---

**Need help?** Check the troubleshooting section or reach out to Netlify/Travelpayouts support.

Good luck with your travel blog! 🌍✈️
