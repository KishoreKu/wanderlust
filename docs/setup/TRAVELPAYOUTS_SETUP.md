# Travelpayouts Integration Setup Guide

This website is fully integrated with Travelpayouts affiliate marketing platform for hotel and flight bookings.

## 🔑 Getting Your Travelpayouts Credentials

### Step 1: Sign Up for Travelpayouts
1. Go to [https://www.travelpayouts.com/](https://www.travelpayouts.com/)
2. Click "Sign Up" and create your account
3. Complete the registration process

### Step 2: Get Your Marker (Affiliate ID)
1. Log into your Travelpayouts dashboard
2. Go to **Tools** → **White Label**
3. Find your **Marker** (this is your unique affiliate ID)
4. Copy this marker - you'll need it in the next step

### Step 3: Get Your API Token (Optional)
1. In your Travelpayouts dashboard, go to **Settings** → **API**
2. Generate or copy your **API Token**
3. This is optional but recommended for advanced features

## ⚙️ Configure Your Website

### Option 1: Using Environment Variables (Recommended for Production)

1. Create a `.env` file in the project root:
```bash
cp .env.example .env
```

2. Edit `.env` and add your credentials:
```
VITE_TRAVELPAYOUTS_MARKER=your_actual_marker_here
VITE_TRAVELPAYOUTS_API_TOKEN=your_actual_token_here
```

3. Update `src/config/affiliate.js` to use environment variables:
```javascript
export const TRAVELPAYOUTS_CONFIG = {
  marker: import.meta.env.VITE_TRAVELPAYOUTS_MARKER || 'YOUR_MARKER_ID',
  // ... rest of config
};
```

### Option 2: Direct Configuration (Quick Setup)

1. Open `src/config/affiliate.js`
2. Replace `'YOUR_MARKER_ID'` with your actual Travelpayouts marker
3. Replace `'YOUR_API_TOKEN'` with your actual API token (if using)

Example:
```javascript
export const TRAVELPAYOUTS_CONFIG = {
  marker: '123456',  // Your actual marker
  // ...
};
```

## 🎯 How It Works

### Hotel Bookings
- Search form redirects to Booking.com with your affiliate tracking
- Individual hotel cards link to Booking.com with your marker
- You earn commission on completed bookings

### Flight Bookings
- Search form redirects to Aviasales/JetRadar with your affiliate tracking
- Popular route cards link to flight search with your marker
- You earn commission on flight bookings

## 💰 Affiliate Programs Available

Travelpayouts gives you access to multiple affiliate programs:

### Hotels
- **Booking.com** - Up to 40% commission
- **Agoda** - Up to 7% commission
- **Hotels.com** - Up to 6% commission

### Flights
- **Aviasales** - Up to $40 per booking
- **JetRadar** - Flight search engine
- **Skyscanner** - Price comparison

### Other Travel Services
- **GetYourGuide** - Tours and activities
- **Rentalcars** - Car rentals
- **Viator** - Experiences

## 📊 Tracking Your Earnings

1. Log into your Travelpayouts dashboard
2. Go to **Statistics** to see:
   - Clicks
   - Conversions
   - Earnings
   - Commission rates

## 🚀 Deployment Notes

### For Netlify/Vercel Deployment:

1. Add environment variables in your hosting dashboard:
   - Go to Site Settings → Environment Variables
   - Add `VITE_TRAVELPAYOUTS_MARKER` with your marker value
   - Add `VITE_TRAVELPAYOUTS_API_TOKEN` with your token (optional)

2. Rebuild and deploy your site

### Important:
- Never commit your `.env` file to Git (it's already in `.gitignore`)
- Use environment variables for production
- Test affiliate links before going live

## 🔗 Customization

You can customize the affiliate URLs in `src/config/affiliate.js`:

- Change the base URLs for different affiliate programs
- Modify search parameters
- Add tracking parameters
- Integrate additional Travelpayouts services

## ✅ Testing Your Integration

1. Click on a hotel or flight booking button
2. Check that the URL includes your marker parameter
3. Complete a test booking (you can cancel it)
4. Verify the conversion appears in your Travelpayouts dashboard

## 📞 Support

- **Travelpayouts Support**: [https://support.travelpayouts.com/](https://support.travelpayouts.com/)
- **Documentation**: [https://www.travelpayouts.com/developers/](https://www.travelpayouts.com/developers/)

---

**Ready to earn?** Configure your credentials and start promoting travel bookings! 🌍✈️
