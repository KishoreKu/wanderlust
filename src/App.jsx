import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { NewsletterPopup } from './components/NewsletterPopup';
import { CanonicalTag } from './components/CanonicalTag';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Destinations } from './pages/Destinations';
import { Hotels } from './pages/Hotels';
import { Flights } from './pages/Flights';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Deals } from './pages/Deals';
import { Media } from './pages/Media';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { AffiliateDisclosure } from './pages/AffiliateDisclosure';
import { AirHelp } from './pages/AirHelp';
import { Klook } from './pages/Klook';
import { NewYearActivities } from './pages/NewYearActivities';
import { NewYearNYC } from './pages/NewYearNYC';
import { EuropeDestinations } from './pages/EuropeDestinations';
import { AsiaDestinations } from './pages/AsiaDestinations';
import { AmericasDestinations } from './pages/AmericasDestinations';
import { AfricaDestinations } from './pages/AfricaDestinations';
import { OceaniaDestinations } from './pages/OceaniaDestinations';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <GoogleAnalytics />
      <CanonicalTag />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
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
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/media" element={<Media />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
          </Routes>
        </main>
        <Footer />
        <NewsletterPopup />
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App
