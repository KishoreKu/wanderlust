import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { NewsletterPopup } from './components/NewsletterPopup';
import { CanonicalTag } from './components/CanonicalTag';
import { ScrollToTop } from './components/ScrollToTop';
const lazyPage = (path, exportName) =>
  lazy(() => import(path).then((module) => ({ default: module[exportName] })));

const Home = lazyPage('./pages/Home', 'Home');
const Blog = lazyPage('./pages/Blog', 'Blog');
const BlogPost = lazyPage('./pages/BlogPost', 'BlogPost');
const Destinations = lazyPage('./pages/Destinations', 'Destinations');
const Hotels = lazyPage('./pages/Hotels', 'Hotels');
const Flights = lazyPage('./pages/Flights', 'Flights');
const About = lazyPage('./pages/About', 'About');
const Contact = lazyPage('./pages/Contact', 'Contact');
const Deals = lazyPage('./pages/Deals', 'Deals');
const Media = lazyPage('./pages/Media', 'Media');
const WorkFromAnywhere = lazyPage('./pages/WorkFromAnywhere', 'WorkFromAnywhere');
const LifestylePicks = lazyPage('./pages/LifestylePicks', 'LifestylePicks');
const PrivacyPolicy = lazyPage('./pages/PrivacyPolicy', 'PrivacyPolicy');
const TermsOfService = lazyPage('./pages/TermsOfService', 'TermsOfService');
const AffiliateDisclosure = lazyPage('./pages/AffiliateDisclosure', 'AffiliateDisclosure');
const AirHelp = lazyPage('./pages/AirHelp', 'AirHelp');
const Klook = lazyPage('./pages/Klook', 'Klook');
const NewYearActivities = lazyPage('./pages/NewYearActivities', 'NewYearActivities');
const NewYearNYC = lazyPage('./pages/NewYearNYC', 'NewYearNYC');
const EuropeDestinations = lazyPage('./pages/EuropeDestinations', 'EuropeDestinations');
const AsiaDestinations = lazyPage('./pages/AsiaDestinations', 'AsiaDestinations');
const AmericasDestinations = lazyPage('./pages/AmericasDestinations', 'AmericasDestinations');
const AfricaDestinations = lazyPage('./pages/AfricaDestinations', 'AfricaDestinations');
const OceaniaDestinations = lazyPage('./pages/OceaniaDestinations', 'OceaniaDestinations');

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
