# Affiliate Governance

This document defines hard guardrails for outbound links and affiliate routing in blog content and AI outputs.

## Core Rules

- All commercial booking and discovery CTAs must route through canonical `/go/*` endpoints.
- Do not expose raw affiliate links in content or AI responses.
- Do not include outbound links to hotel brand websites or suppliers where Gubbu does not earn commission.
- External brand/supplier links are prohibited for hotels and accommodations.
- Amazon affiliate CTAs must route through `/go/amazon` (no direct Amazon links).
- Rakuten affiliate CTAs must route through `/go/rakuten` (no direct Rakuten links).
- Informational references may remain as non-clickable text only.
- Direct outbound links are reserved for non-commercial informational references only.
- For endpoint details and parameters, see `docs/api-routing.md`.

## Canonical Endpoints

- `/go/hotels`
- `/go/flights`
- `/go/activities`
- `/go/amazon`
- `/go/rakuten`

## Editorial Notes

- "No external platform names" and "no real-time pricing" are strict for AI chat responses.
- For blog content, these function as editorial guidelines, allowing limited platform mentions and non-specific price ranges under human review.

## AI Output Link Control

- AI is not allowed to generate raw affiliate URLs.
- AI outputs may only include `https://api.gubbu.io/go/*`.

## Content Affiliate Safety

- Amazon affiliate blogs:
- Explicit disclosure
- No pricing claims
- Informational tone
- Travel affiliate CTAs:
- Soft CTAs
- Decision-first language
