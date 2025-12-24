# Gubbu Travel Blog - Project Information

## 📋 Project Overview

**Project Name:** Gubbu  
**Type:** Travel Blog Website  
**Tech Stack:** React + Vite + Tailwind CSS  
**Hosting:** cPanel with automated Git deployment  
**Repository:** https://github.com/KishoreKu/wanderlust

---

## 🌐 Website & Social Media

### Website
- **Domain:** [YOUR DOMAIN HERE - Please add]
- **Status:** Live and deployed

### Social Media Accounts
- **Facebook:** https://www.facebook.com/profile.php?id=61585608988393
- **Instagram:** https://www.instagram.com/mygubbu9/
- **Pinterest:** https://www.pinterest.com/gubbuna/
- **YouTube:** https://www.youtube.com/@Gubbu-1
- **X (Twitter):** https://x.com/gubbuo
- **Bluesky:** https://bsky.app/profile/gubbu.bsky.social

---

## 🔧 Integrations & Services

### Mailchimp Newsletter
- **API Key:** Stored in environment variables
- **Audience ID:** 887adb19d6
- **Server Prefix:** us18
- **Backend:** `/public/api/subscribe.php`
- **Configuration:** See `MAILCHIMP_SETUP.md`

### Affiliate Programs
- **Travelpayouts:** Active
- **AirHelp:** Integrated
- **Klook:** Integrated
- **Aviasales:** Popular Flight Destinations widget

### Analytics
- **Google Analytics:** Integrated
- **GA Tracking ID:** [Add if you have one]

---

## 📁 Important Files & Locations

### Configuration Files
- **Mailchimp Backend:** `/public/api/subscribe.php`
- **Environment Variables:** `/public/api/.htaccess` (not in Git)
- **Credentials:** `MAILCHIMP_CREDENTIALS_PRIVATE.txt` (not in Git)

### Components
- **Newsletter Signup:** `/src/components/NewsletterSignup.jsx` (2 variants: default, compact)
- **Newsletter Popup:** `/src/components/NewsletterPopup.jsx`
- **Footer:** `/src/components/Footer.jsx`
- **Navbar:** `/src/components/Navbar.jsx`

### Key Pages
- **Home:** `/src/pages/Home.jsx`
- **Blog:** `/src/pages/Blog.jsx`
- **About:** `/src/pages/About.jsx`
- **Destinations:** `/src/pages/Destinations.jsx`
- **Hotels:** `/src/pages/Hotels.jsx`
- **Flights:** `/src/pages/Flights.jsx`

---

## 🚀 Deployment

### Method
- **Automated Git Deployment** via GitHub Actions
- Pushes to `main` branch trigger automatic deployment
- Build process: `npm run build`
- Deploy target: cPanel via FTP

### Workflow
1. Push code to GitHub
2. GitHub Actions builds the project
3. Uploads `dist` folder to cPanel
4. Site updates automatically

### Deployment Guides
- `CPANEL_AUTO_DEPLOY_GUIDE.md` - Automated deployment setup
- `CPANEL_DEPLOYMENT_GUIDE.md` - Manual deployment guide
- `DEPLOYMENT_GUIDE.md` - Netlify deployment (alternative)

---

## ✨ Features Implemented

### Newsletter System (Mailchimp)
- ✅ Popup (all pages) - 15s delay + exit-intent
- ✅ Inline forms (Home, Blog, Destinations)
- ✅ Footer compact form (all pages)
- ✅ About page form (Join Our Community section)

### Social Media Integration
- ✅ Footer links (all 5 platforms)
- ✅ About page buttons (all 5 platforms)

### Widgets & Tools
- ✅ Aviasales Popular Flight Destinations
- ✅ Hotel search (Travelpayouts)
- ✅ Flight search (Travelpayouts)
- ✅ AirHelp compensation widget
- ✅ Klook activities widget

### Pages & Content
- ✅ Home page with hero, features, destinations
- ✅ Blog with multiple articles
- ✅ Destinations directory (25+ destinations)
- ✅ About page with story and values
- ✅ Contact page
- ✅ Privacy Policy
- ✅ Terms of Service
- ✅ Affiliate Disclosure

---

## 🎨 Design & Branding

### Brand Name
**Gubbu**

### Color Scheme
- **Primary:** Blue (#0085FF and variations)
- **Secondary:** As defined in Tailwind config
- **Accent:** Primary colors with gradients

### Logo
- Plane icon (✈️) with "Gubbu" text
- Used in Navbar and Footer

---

## 📝 Content Strategy

### Target Audience
- Travel enthusiasts
- Budget travelers
- Adventure seekers
- Digital nomads

### Content Types
- Destination guides
- Travel tips
- Hotel/flight deals
- Travel inspiration

### SEO Focus
- Travel destinations
- Budget travel
- Travel tips
- Hotel and flight booking

---

## 🔐 Security & Privacy

### Sensitive Files (Not in Git)
- `/public/api/.htaccess` - Contains Mailchimp API key
- `MAILCHIMP_CREDENTIALS_PRIVATE.txt` - Backup of credentials
- `.env` files (if any)

### Environment Variables
All sensitive data (API keys, credentials) stored in:
- cPanel environment variables, OR
- `.htaccess` files (uploaded manually)

---

## 📊 Performance

### Optimization
- ✅ Vite build optimization
- ✅ Image lazy loading
- ✅ Code splitting
- ✅ GZIP compression (via .htaccess)
- ✅ Browser caching (via .htaccess)

---

## 🐛 Known Issues

### Aviasales Widget
- Currently shows only 1 destination instead of 6
- Issue is with external widget service, not our code
- Monitoring for resolution

---

## 📚 Documentation Files

- `README.md` - Project overview and setup
- `MAILCHIMP_SETUP.md` - Mailchimp integration guide
- `MAILCHIMP_DEPLOYMENT_CHECKLIST.md` - Deployment steps
- `NEWSLETTER_POPUP_GUIDE.md` - Popup customization
- `NEWSLETTER_MULTIPAGE_SUMMARY.md` - Multi-page newsletter summary
- `TRAVELPAYOUTS_SETUP.md` - Affiliate program setup
- `GROWTH_STRATEGY_GUIDE.md` - Marketing and growth strategies

---

## 🎯 Future Enhancements (Ideas)

- [ ] Add more blog posts
- [ ] Create video content for YouTube
- [ ] Implement blog post social sharing
- [ ] Add user comments on blog posts
- [ ] Create email drip campaigns
- [ ] A/B test newsletter popup timing
- [ ] Add more destination guides
- [ ] Implement search functionality
- [ ] Add travel resources page
- [ ] Create downloadable travel guides

---

## 📞 Support & Resources

### Hosting Support
- cPanel hosting provider

### Service Support
- **Mailchimp:** https://mailchimp.com/help/
- **Travelpayouts:** https://support.travelpayouts.com/

### Development
- **React Docs:** https://react.dev/
- **Vite Docs:** https://vitejs.dev/
- **Tailwind CSS:** https://tailwindcss.com/

---

## 📅 Project Timeline

- **Started:** 2016 (as mentioned in About page)
- **Current Version:** 1.0.0
- **Last Major Update:** December 2024 (Mailchimp integration, newsletter system)

---

## ✏️ Notes for AI Assistant

**When starting a new session, read this file first!**

This file contains all the important project information, URLs, integrations, and context needed to help effectively. Update this file whenever:
- New features are added
- Integrations change
- URLs or credentials update
- Important decisions are made

---

**Last Updated:** December 23, 2024
