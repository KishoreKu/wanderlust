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

// Hotels.com Affiliate Configuration
export const HOTELS_COM_CONFIG = {
  // General Hotels.com affiliate link
  affiliateLink: 'https://www.anrdoezrs.net/click-101618526-10438018',
  // Canada link for Canadian destinations
  canadaLink: 'https://www.tkqlhce.com/click-101618526-11131426',
  // Destination-specific links for better conversions
  destinations: {
    'new york': 'https://www.jdoqocy.com/click-101618526-10430139',
    'nyc': 'https://www.jdoqocy.com/click-101618526-10430139',
    'london': 'https://www.anrdoezrs.net/click-101618526-10437075',
    'tokyo': 'https://www.dpbolvw.net/click-101618526-13627287',
  },
};

// Helper function to build affiliate URL
export function buildAffiliateUrl(type, params = {}) {
  if (type === 'hotel') {
    // Use Hotels.com affiliate link
    return HOTELS_COM_CONFIG.affiliateLink;
  }

  if (type === 'flight') {
    const { origin, destination, departDate, returnDate } = params;
    const { marker } = TRAVELPAYOUTS_CONFIG;
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
  // Check if it's a Canadian destination
  const canadianCities = ['Quebec', 'Montreal', 'Toronto', 'Vancouver', 'Calgary'];
  const isCanada = canadianCities.some(city => location?.includes(city));

  // Return appropriate Hotels.com link
  return isCanada ? HOTELS_COM_CONFIG.canadaLink : HOTELS_COM_CONFIG.affiliateLink;
}

// Direct flight affiliate link
export function getFlightAffiliateLink(origin, destination) {
  return buildAffiliateUrl('flight', {
    origin,
    destination,
  });
}
