# TravelHub - Travel Blog & Affiliate Marketing Website

A stunning, modern travel blog website built with React, featuring destination guides, travel tips, and integrated affiliate marketing for hotel and flight bookings.

## 🌟 Features

- **Beautiful Homepage** with hero section and featured destinations
- **Travel Blog** with articles, categories, and search functionality
- **Destination Guides** showcasing popular travel locations worldwide
- **Hotel Booking Integration** with affiliate links to booking platforms
- **Flight Search** with popular routes and price comparisons
- **Responsive Design** optimized for all devices
- **Modern UI** built with TailwindCSS and custom components
- **Fast Performance** powered by Vite and React

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
travel-blog-website/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   ├── Destinations.jsx
│   │   ├── Hotels.jsx
│   │   └── Flights.jsx
│   ├── utils/           # Utility functions
│   │   └── cn.js
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Static assets
└── package.json
```

## 🎨 Tech Stack

- **React 19** - UI library
- **React Router 6** - Client-side routing
- **TailwindCSS 3** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Lucide React** - Beautiful icon library

## 💼 Travelpayouts Affiliate Integration ✅

**This website is fully integrated with Travelpayouts!** All hotel and flight bookings automatically track your affiliate commissions.

### Quick Setup (2 minutes):

1. **Get your Travelpayouts credentials:**
   - Sign up at [Travelpayouts.com](https://www.travelpayouts.com/)
   - Get your **Marker** (affiliate ID) from the dashboard

2. **Configure your website:**
   - Open `src/config/affiliate.js`
   - Replace `'YOUR_MARKER_ID'` with your actual Travelpayouts marker
   - Replace `'YOUR_API_TOKEN'` with your API token (optional)

3. **That's it!** Your affiliate links are ready to earn commissions.

### What's Included:

- ✅ **Hotel Search** - Redirects to Booking.com with your affiliate tracking
- ✅ **Flight Search** - Redirects to Aviasales with your affiliate tracking
- ✅ **Individual Hotel Cards** - Each "Book Now" button includes your marker
- ✅ **Popular Flight Routes** - All flight bookings tracked with your ID

### Earn Commissions From:
- Booking.com (up to 40% commission)
- Aviasales (up to $40 per booking)
- Agoda, Hotels.com, and more

📖 **Detailed Setup Guide:** See `TRAVELPAYOUTS_SETUP.md` for complete instructions

## 🔧 Customization

### Update Branding

- Edit `src/components/Navbar.jsx` to change the site name and logo
- Modify `src/components/Footer.jsx` for footer content
- Update colors in `tailwind.config.js`

### Add Blog Posts

Edit the `blogPosts` array in `src/pages/Blog.jsx` to add your own content.

### Modify Destinations

Update the `destinations` array in `src/pages/Destinations.jsx` with your featured locations.

## 📝 Content Management

Currently, the website uses static data. To add a CMS:

1. Consider integrating with Contentful, Sanity, or Strapi
2. Replace static arrays with API calls
3. Add environment variables for API keys

## 🌐 Deployment

### Netlify

```bash
npm run build
# Deploy the dist folder to Netlify
```

### Vercel

```bash
npm run build
# Deploy using Vercel CLI or GitHub integration
```

### Other Platforms

The built files in `dist/` can be deployed to any static hosting service.

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📧 Support

For questions or support, please open an issue in the repository.

---

Built with ❤️ for travel enthusiasts and digital entrepreneurs
