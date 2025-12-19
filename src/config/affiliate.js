// Travelpayouts Affiliate Configuration
// Replace these with your actual Travelpayouts credentials

export const TRAVELPAYOUTS_CONFIG = {
  // Your Travelpayouts marker (affiliate ID)
  marker: '691211',
  
  // Hotel search widget settings
  hotels: {
    // Booking.com affiliate program through Travelpayouts
    baseUrl: 'https://www.travelpayouts.com/click',
    // Alternative: Direct Booking.com link with your affiliate ID
    bookingComUrl: 'https://www.booking.com/searchresults.html',
  },
  
  // Flight search settings
  flights: {
    // Aviasales/JetRadar (Travelpayouts flight search)
    searchUrl: 'https://www.aviasales.com',
    // Alternative widgets
    jetRadarUrl: 'https://www.jetradar.com',
  },
  
  // Travelpayouts API settings (optional - for dynamic data)
  api: {
    token: 'YOUR_API_TOKEN',
    host: 'api.travelpayouts.com',
  }
};

// Helper function to build affiliate URL
export function buildAffiliateUrl(type, params = {}) {
  const { marker } = TRAVELPAYOUTS_CONFIG;
  
  if (type === 'hotel') {
    const { destination, checkIn, checkOut, adults = 2 } = params;
    // Booking.com search with affiliate tracking
    const searchParams = new URLSearchParams({
      ss: destination || '',
      checkin: checkIn || '',
      checkout: checkOut || '',
      group_adults: adults,
      aid: marker, // Your affiliate ID
    });
    return `${TRAVELPAYOUTS_CONFIG.hotels.bookingComUrl}?${searchParams.toString()}`;
  }
  
  if (type === 'flight') {
    const { origin, destination, departDate, returnDate } = params;
    // Aviasales search with affiliate tracking
    const searchParams = new URLSearchParams({
      origin_iata: origin || '',
      destination_iata: destination || '',
      depart_date: departDate || '',
      return_date: returnDate || '',
      marker: marker,
    });
    return `${TRAVELPAYOUTS_CONFIG.flights.searchUrl}/search?${searchParams.toString()}`;
  }
  
  return '#';
}

// Direct hotel affiliate link
export function getHotelAffiliateLink(hotelName, location) {
  return buildAffiliateUrl('hotel', {
    destination: location,
  });
}

// Direct flight affiliate link
export function getFlightAffiliateLink(origin, destination) {
  return buildAffiliateUrl('flight', {
    origin,
    destination,
  });
}
