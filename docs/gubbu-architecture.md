# Gubbu.io - Codex-Ready Architecture Summary

## 1. System Overview

Gubbu.io is a decision-first travel & lifestyle platform that combines:
- AI-guided recommendations
- Content (blogs, guides)
- Affiliate routing via controlled /go/* endpoints

The system is intentionally non-transactional:
- Gubbu never books directly
- All monetization happens via tracked affiliate redirects

Primary goals:
- Reduce decision friction (clarity before booking)
- Maintain strict partner & compliance guardrails
- Be extensible into a Decision-as-a-Service (DaaS) platform

## 2. High-Level Architecture

Client (Web / Mobile)
        |
        v
Node.js API (api.gubbu.io)
        |
        |-- Chat Endpoint (/chat)
        |      |
        |      +-- OpenAI (LLM)
        |      +-- Supabase (RAG + logging)
        |
        |-- Affiliate Redirects (/go/*)
               |
               +-- Affiliate Selection Logic
               +-- Redirect (302)
               +-- Click Logging (Supabase)

## 3. Application Layer

Frontend
- React (Vite)
- Content-driven UX (blogs, landing pages, decision pages)

Backend
- Node.js (no framework, lightweight HTTP server)
- Stateless
- Acts as:
- AI orchestration layer
- Guardrail enforcement layer
- Affiliate router
- Observability emitter

## 4. Chat & AI Orchestration

Chat Flow (POST /chat)
1. User message received
2. Embedding generated (text-embedding-3-small)
3. Similar content retrieved from Supabase (match_documents)
4. Relevant chunks filtered by similarity threshold (>= 0.7)
5. System rules injected
6. Few-shot examples injected
7. Final prompt sent to OpenAI Chat Completion
8. Response returned to client

Models
- Chat: gpt-4o-mini (configurable)
- Embeddings: text-embedding-3-small

## 5. Hallucination Prevention & Guardrails

Hallucinations are mitigated through multiple layers:

Prompt-Level Guardrails
- Explicit system rules:
- No external platform names
- No real-time pricing
- No fabricated dates for hotels
- No unsupported URL parameters
- Strict response formats for:
- Hotels
- Flights
- Activities
- Few-shot examples that enforce correct patterns

RAG Grounding
- Blog content used only as context, never instructions
- Low-similarity chunks discarded
- Assistant never claims real-time availability

## 6. Affiliate Routing Layer (/go/*)

Supported Endpoints
- /go/flights
- /go/hotels
- /go/activities

Responsibilities
- Validate incoming params
- Choose affiliate via rules table
- Build affiliate URL
- Log click
- Redirect (302)

Affiliate Selection
- Rules stored in Supabase (affiliate_rules)
- Matching by:
- Type (flights / hotels / activities)
- Country
- City
- Priority
- Defaults to Travelpayouts if no rule matches

## 7. Hotel-Specific Design (Important)

Current constraint:
- Expedia fallback does NOT accept clean deeplinks with city + dates reliably

Therefore:
- /go/hotels intentionally does not pass dates
- City & adults may be passed
- Users select dates on partner site

Mitigations:
- UX copy warns users to update search fields if previous data appears
- Optional ?web=1 interstitial prevents forced app opens on mobile

Future plan:
- Replace fallback with true Expedia search deeplinks
- Store patterns in env vars
- Keep /go/hotels interface unchanged

## 8. Observability & Logging

Implemented
- Click logging to Supabase (clicks table)
- Captured fields:
- user_agent
- ip
- source (chat / web / campaign)
- affiliate
- type
- destination query
- adults
- metadata (path, click_id)

Not Yet Implemented (Planned)
- LLM latency metrics
- Token usage per request
- Conversion attribution postback
- Error aggregation (Sentry / OpenTelemetry)

Current observability is conversion-first, not infra-first.

## 9. Content System (Blogs & Lifestyle Picks)

Storage
- Markdown files (/content/*.md)
- Frontmatter-driven metadata:
- title
- description
- category
- tags
- featured
- author
- date

Processing
- Parsed at build time via import.meta.glob
- Rendered with a lightweight markdown -> HTML converter
- Used for:
- SEO
- RAG grounding
- Internal linking

## 10. Agents (Current & Planned)

Current State
- Single orchestrator agent
- Uses rules + RAG + few-shots
- Deterministic, low temperature (0.3)

Planned Agents
- Destination Advisor Agent
- Work-From-Anywhere Advisor Agent
- Lifestyle Picks Agent
- Booking Intent Classifier Agent

All agents will share:
- Same /go/* routing
- Same compliance rules
- Same logging layer

## 11. End Goal

Gubbu is evolving from:

Travel affiliate site
into
Decision-as-a-Service (DaaS) platform

Long-term value:
- User intent intelligence
- Cross-vertical decision guidance (travel, lifestyle, pets, work)
- Monetization via trusted execution partners
- API-first decision layer usable by other platforms

## 12. Design Principles (Non-Negotiable)

- Decisions before transactions
- Centralized affiliate control
- AI with guardrails, not autonomy
- Explainability over hype
- SEO + AI synergy, not conflict

## How to use this with Codex

Use this as the source of truth.
Help me refactor / extend / audit this system.
For outbound link and affiliate CTA governance, see `docs/affiliate-governance.md`.
