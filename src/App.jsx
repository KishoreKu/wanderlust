import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { NewsletterPopup } from './components/NewsletterPopup';
import { CanonicalTag } from './components/CanonicalTag';
import { ScrollToTop } from './components/ScrollToTop';
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Destinations = lazy(() => import('./pages/Destinations'));
const Hotels = lazy(() => import('./pages/Hotels'));
const Flights = lazy(() => import('./pages/Flights'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Deals = lazy(() => import('./pages/Deals'));
const Media = lazy(() => import('./pages/Media'));
const WorkFromAnywhere = lazy(() => import('./pages/WorkFromAnywhere'));
const LifestylePicks = lazy(() => import('./pages/LifestylePicks'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const AffiliateDisclosure = lazy(() => import('./pages/AffiliateDisclosure'));
const AirHelp = lazy(() => import('./pages/AirHelp'));
const Klook = lazy(() => import('./pages/Klook'));
const NewYearActivities = lazy(() => import('./pages/NewYearActivities'));
const NewYearNYC = lazy(() => import('./pages/NewYearNYC'));
const EuropeDestinations = lazy(() => import('./pages/EuropeDestinations'));
const AsiaDestinations = lazy(() => import('./pages/AsiaDestinations'));
const AmericasDestinations = lazy(() => import('./pages/AmericasDestinations'));
const AfricaDestinations = lazy(() => import('./pages/AfricaDestinations'));
const OceaniaDestinations = lazy(() => import('./pages/OceaniaDestinations'));

function PageFallback() {
  return (
    <div className="flex items-center justify-center py-24 text-sm text-gray-500">
      Loading...
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <GoogleAnalytics />
        <CanonicalTag />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/airhelp" element={<AirHelp />} />
                <Route path="/klook" element={<Klook />} />
                <Route path="/new-year-activities" element={<NewYearActivities />} />
                <Route path="/new-year-nyc-2026" element={<NewYearNYC />} />
                <Route path="/europe-destinations" element={<EuropeDestinations />} />
                <Route path="/asia-destinations" element={<AsiaDestinations />} />
                <Route path="/americas-destinations" element={<AmericasDestinations />} />
                <Route path="/africa-destinations" element={<AfricaDestinations />} />
                <Route path="/oceania-destinations" element={<OceaniaDestinations />} />
                <Route path="/work-from-anywhere" element={<WorkFromAnywhere />} />
                <Route path="/lifestyle-picks" element={<LifestylePicks />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/media" element={<Media />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <NewsletterPopup />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App
