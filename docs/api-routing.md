# API Routing Reference (Frontend)

This document summarizes the backend `/go/*` routing endpoints so frontend content and CTAs use the correct patterns.

Base host: `https://api.gubbu.io`

## Canonical Endpoints

- `/go/flights`
- `/go/hotels`
- `/go/activities`
- `/go/amazon`
- `/go/rakuten`

## Flights

Purpose: affiliate flight search redirect.

Supported params:
- `from` (IATA code, optional)
- `to` (IATA code, optional)
- `depart` (YYYY-MM-DD, optional)
- `return` (YYYY-MM-DD, optional)
- `adults` (number, optional)
- `src` (source tag, optional)

Example:
`https://api.gubbu.io/go/flights?from=EWR&to=BKK&depart=2026-02-10&return=2026-02-18&adults=2&src=blog`

## Hotels

Purpose: affiliate hotel search redirect.

Supported params:
- `city` (optional)
- `country` (optional)
- `adults` (optional)
- `src` (source tag, optional)

Important:
- Do not pass check-in/check-out dates in `/go/hotels`.

Example:
`https://api.gubbu.io/go/hotels?city=Carlsbad&country=US&adults=2&src=blog`

## Activities

Purpose: tours and activities redirect.

Supported params:
- `city` (optional)
- `country` (optional)
- `src` (source tag, optional)

Example:
`https://api.gubbu.io/go/activities?city=Bangkok&country=TH&src=blog`

## Amazon

Purpose: product discovery with Amazon Associates tracking.

Supported params (use one of `asin` or `query`):
- `asin` (preferred when known)
- `query` (search term)
- `category` (optional, Amazon search category)
- `market` (optional: US, UK, CA, IN, AU, DE, FR, IT, ES, JP)
- `src` or `source` (source tag, optional)

Examples:
- `https://api.gubbu.io/go/amazon?asin=B09XYZ1234&market=US&source=blog`
- `https://api.gubbu.io/go/amazon?query=dog%20food&market=US&source=blog`

## Rakuten

Purpose: product discovery via Rakuten Advertising (LinkShare) deeplinks.

Supported params (use one of `url` or `query`):
- `url` (full destination URL, URL-encoded)
- `query` (search term; uses configured `RAKUTEN_SEARCH_BASE`)
- `src` or `source` (source tag, optional)

Examples:
- `https://api.gubbu.io/go/rakuten?url=https%3A%2F%2Fwww.canadapetcare.com%2F&source=blog`
- `https://api.gubbu.io/go/rakuten?query=dog%20food&source=blog`

## Governance

For affiliate and outbound link rules, see `docs/affiliate-governance.md`.
