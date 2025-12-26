# Newsletter Popup Configuration Guide

## 🎯 How the Popup Works

The newsletter popup appears on all pages with smart triggers:

### **Triggers:**
1. **Time-based**: Shows after 15 seconds on the page
2. **Exit-intent**: Shows when user moves mouse to leave (desktop only)
3. **Once per session**: Won't annoy users by showing repeatedly

### **Smart Behavior:**
- ✅ Shows only once per browser session
- ✅ If user closes it, won't show again (stored in localStorage)
- ✅ Auto-closes 3 seconds after successful subscription
- ✅ Mobile-responsive design
- ✅ Easy to close with X button or clicking outside

## ⚙️ Customization Options

### **Change Popup Delay**
Edit `/src/components/NewsletterPopup.jsx`, line 20:
```javascript
}, 15000); // Change 15000 to desired milliseconds (15000 = 15 seconds)
```

Examples:
- 10 seconds: `10000`
- 30 seconds: `30000`
- 1 minute: `60000`

### **Change Popup Text**
Edit `/src/components/NewsletterPopup.jsx`, lines 115-122:
```javascript
<h2 className="text-2xl font-bold text-gray-900 mb-2">
  Get Travel Tips & Deals!  {/* Change this */}
</h2>
<p className="text-gray-600">
  Join 1,000+ travelers...  {/* Change this */}
</p>
```

### **Change Button Text**
Line 143:
```javascript
{subscribeStatus === 'loading' ? 'Subscribing...' : 'Get Free Travel Tips'}
```

### **Disable Exit-Intent**
Comment out lines 24-31 in NewsletterPopup.jsx:
```javascript
// const handleMouseLeave = (e) => {
//   if (e.clientY <= 0 && !hasSeenPopup && !hasClosedPopup) {
//     setIsVisible(true);
//     sessionStorage.setItem('newsletterPopupSeen', 'true');
//   }
// };
// document.addEventListener('mouseleave', handleMouseLeave);
```

### **Change Icon/Emoji**
Line 112:
```javascript
<span className="text-3xl">✈️</span>  {/* Change emoji */}
```

Popular options: 🌍 🗺️ 📧 💌 🎁 ⭐

## 🎨 Styling Options

### **Change Colors**
The popup uses your theme colors. To customize:

**Background color** (line 98):
```javascript
className="bg-white..."  // Change to bg-gray-50, bg-primary-50, etc.
```

**Button** - Uses your Button component theme

### **Change Size**
Line 97:
```javascript
className="... max-w-md w-full..."  // Change max-w-md to:
// max-w-sm (smaller)
// max-w-lg (larger)
// max-w-xl (extra large)
```

## 📊 Testing the Popup

### **Test Immediately:**
Change the delay to 1 second for testing:
```javascript
}, 1000); // 1 second
```

### **Reset Popup (for testing):**
Open browser console (F12) and run:
```javascript
sessionStorage.removeItem('newsletterPopupSeen');
localStorage.removeItem('newsletterPopupClosed');
```
Then refresh the page.

### **Test Exit-Intent:**
Move your mouse quickly to the top of the browser window (like you're leaving).

## 🚫 Disable Popup (Temporarily)

### **Option 1: Comment out in App.jsx**
```javascript
// <NewsletterPopup />
```

### **Option 2: Add condition**
```javascript
{process.env.NODE_ENV === 'production' && <NewsletterPopup />}
```
This only shows in production, not during development.

## 📈 Best Practices

### **Timing:**
- **Too soon** (< 10s): Annoying
- **Sweet spot** (15-30s): User has time to engage
- **Too late** (> 60s): Might miss opportunity

### **Copy Tips:**
- ✅ Offer value ("Get free guide")
- ✅ Be specific ("Travel tips for Southeast Asia")
- ✅ Create urgency ("Limited spots")
- ✅ Show social proof ("Join 1,000+ travelers")

### **A/B Testing Ideas:**
- Different headlines
- Different delays
- With/without exit-intent
- Different offers (guide vs. tips vs. deals)

## 🎯 Current Settings

**Default Configuration:**
- Delay: 15 seconds
- Exit-intent: Enabled
- Session memory: Enabled
- Auto-close on success: 3 seconds
- Headline: "Get Travel Tips & Deals!"
- CTA: "Get Free Travel Tips"

## 🔧 Troubleshooting

### **Popup not showing:**
1. Check browser console for errors
2. Clear sessionStorage and localStorage
3. Verify NewsletterPopup is imported in App.jsx
4. Check if delay is too long

### **Popup showing too often:**
- Check sessionStorage/localStorage clearing
- Verify the storage keys are being set

### **Styling issues:**
- Check Tailwind CSS classes
- Verify Button component is working
- Check z-index conflicts

## 📝 Notes

- Popup uses sessionStorage (clears when browser closes)
- Close action uses localStorage (persists across sessions)
- Mobile-friendly and responsive
- Connects to same Mailchimp backend as other forms
