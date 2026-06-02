# Cheche Exotics — Implementation Tracker

> Source of truth for what's done, what's next, what's blocked, and what decisions are owed.
> Mirrors Jira (project key **CE**) but lives in the repo so we can update it alongside the code.

**Owner:** Kzee
**Stack:** Next.js 16 · React 19 · Tailwind 4 · Motion · Lenis · GSAP
**Brand guide:** `Cheche_Exotics_Brand_Guidelines.pdf` (uploaded 2026-06-02)
**Repo basis:** existing MVP, rebranded
**Target launch:** by 2026-06-15 (2-week sprint)

---

## Status legend

| Symbol | Meaning |
|---|---|
| Done | Shipped to the repo, typecheck clean |
| In Progress | Actively being worked |
| Blocked | Waiting on a decision, asset, or external |
| Not Started | Queued, no work yet |
| Deferred | Intentionally pushed to v2 |

---

## Brand foundation (CE-2)

| Item | Status | Notes |
|---|---|---|
| Color tokens (matte black `#0A0A0A`, luxury gold `#D4AF37`, midnight `#121212`, pure white) | Done | `src/app/globals.css` |
| Champagne `#F3D27A`, graphite `#2A2A2A`, silver `#C0C0C0` tokens added | Done | `globals.css` |
| Cinzel display font (variable, weights 400–700) | Done | `layout.tsx` |
| Montserrat body font (weights 300–700) | Done | `layout.tsx` |
| Geist Mono kept for tickers / spec numbers | Done | `layout.tsx` |
| Brand name normalized to "Cheche Exotics" (24 refs swapped) | Done | repo-wide sed |
| Page metadata + OG title set to "Cheche Exotics — Experience Excellence" | Done | `layout.tsx` |
| Shield logo (gold-on-black) extracted from brand PDF | Done | `/public/assets/brand/logo-shield-gold.png` (272 KB) |
| Shield logo (mono white) extracted | Done | `/public/assets/brand/logo-shield-white.png` |
| Shield wired into desktop SiteNav (36×42 mark + wordmark) | Done | `SiteNav.tsx` |
| Shield wired into SiteFooter | Done | `SiteFooter.tsx` |
| Hero brand reveal updated to "Cheche / presents / Cheche Exotics" | Done | `Hero.tsx` |
| Hero tagline → "Luxury in Motion · Concierge Service · Members Privilege" | Done | `Hero.tsx` |
| Marquee bands populated with brand-book secondary taglines and CTAs | Done | `page.tsx` |
| Reserve section legal disclaimer updated | Done | `Reserve.tsx` |
| Footer location ATL not MIA, brand-aligned positioning copy | Done | `SiteFooter.tsx` |

---

## Route scaffold (CE-11, CE-13)

| Route | Status | Notes |
|---|---|---|
| `/` (home) | Done | Hero · Marquee · RotationScrub · Marquee · FleetShowroom · SpecTicker · Reserve |
| `/fleet` (listing) | Done | Wired to `lib/fleet.ts`, 5 cars rendering with category + 2 specs |
| `/fleet/[slug]` (detail) | Done | Dynamic routes via `generateStaticParams`, includes 404 fallback |
| `/about` | Placeholder | CE-24 — needs real founder story |
| `/contact` | Done (form scaffolded) | CE-25 — submit is a stub, see "API & vendor" below |
| `/loyalty` | Done (form scaffolded) | CE-22 — submit is a stub, exact Jira fields |
| Shared chrome: `SiteNav` + `SiteFooter` + `PageHero` | Done | |
| Desktop nav decluttered (no 01/02/03 prefixes, no Hero embedded nav) | Done | per user feedback |
| Lenis smooth scroll, CinematicAtmosphere particles, RotationScrub video scrub | Done | original motion restored after revert |

---

## Fleet data (CE-18, CE-19)

| Item | Status | Notes |
|---|---|---|
| `src/lib/fleet.ts` — single source of truth, typed `FleetVehicle[]` | Done | 5 placeholder vehicles |
| `FleetShowroom` (home bento) imports from `lib/fleet` | Done | removed inline FLEET, schema kept compatible |
| `/fleet` listing imports from `lib/fleet` | Done | |
| `/fleet/[slug]` imports from `lib/fleet` + `getVehicleBySlug` helper | Done | |
| Per-vehicle: brand, model, year, category, tagline, description, specs, baseDayRate, image, video | Done | placeholder rates ($1,700–$2,600/day) |
| HQ Rentals deep-link per vehicle (`reserveUrl`) | Blocked | falls back to `/contact` until HQ link format confirmed |
| **Replace placeholder fleet with client's real inventory** | Blocked | needs client to send actual vehicles in service |

---

## Forms & lead capture (CE-22, CE-23, CE-25)

| Item | Status | Notes |
|---|---|---|
| `/loyalty` apply form (First name · Last name · Email · Location · Why · Schedule a call · Message) | Done | matches CE-22 field spec verbatim |
| `/contact` form (Name · Email · Phone · Message) | Done | |
| Home `Reserve` form (Name · Email · Phone · Notes) | Done | |
| POST API route + destination (Resend / Supabase / HubSpot) | Blocked | **vendor decision needed** — recommended: Resend for v1 |
| Spam protection (honeypot or Turnstile) | Blocked | depends on vendor |
| Applicant auto-reply email | Blocked | depends on vendor |
| Referral tracking (`?ref=` cookie capture, attribution on submit) | Blocked | depends on persistence layer (Supabase or HubSpot) |
| Affiliate monthly summary email | Deferred | v2 — after vendor is wired |

See full breakdown in Jira: CE-22 + CE-23 comments.

---

## HQ Rentals integration (CE-3, CE-14, CE-15, CE-16, CE-17)

| Item | Status | Notes |
|---|---|---|
| Integration mode: HQ Rentals booking (per CE-3 description) | Decided | deep-link / iframe, not custom API for v1 |
| Reserve CTAs point to HQ booking page with vehicle prefilled | Blocked | needs HQ booking URL pattern from client |
| Per-vehicle deep links populated on each fleet record | Blocked | same blocker |
| Payment, confirmation emails | Done by HQ | handled inside HQ Rentals |
| Custom booking UI (Phase 2+) | Deferred | only if client decides to leave HQ later |

---

## Site polish & launch readiness

| Item | Status | Notes |
|---|---|---|
| Privacy policy + cookies banner (CE-27, CE-10) | Not Started | minimum: standard template + cookie consent |
| Sitemap.xml + robots.txt | Not Started | Next.js metadata exports |
| OG image (gold shield on matte black, 1200×630) | Not Started | derive from extracted logo |
| Favicon set (16/32/180/512) | Not Started | derive from extracted logo |
| Performance pass — Lighthouse > 90, image budget, video posters | Not Started | day 11–12 |
| Mobile QA on real device | Not Started | day 12 |
| Vercel production deploy + smoke test | Not Started | day 14 |

---

## Out of scope for v1 (deferred to v2+)

| Item | Why deferred |
|---|---|
| CE-5 AI Chatbot | Contact form covers v1 needs; revisit after launch |
| CE-9 Admin / CMS | HQ Rentals dashboard handles operational content during v1 |
| Membership tier system (CE / CE Black / Privé / Prestige / Executive) | Brand book defines tiers, but client asked to go lean — single loyalty enrollment for v1 |
| Concierge Services dedicated route | Brand book lists it; absorbed into About / Loyalty for v1 |
| Future extensions (chauffeur, airport pickup, executive transport) | Brand book roadmap items, not v1 |
| Custom member portal (login, dashboard, referral tracker UI) | Lean v1 = single application form; portal in v2 |
| Stripe subscriptions for monthly membership | Lean v1 = application + concierge follow-up |

---

## Decisions owed (block real progress)

| # | Decision | Owner | Blocks |
|---|---|---|---|
| 1 | Form submit vendor: Resend / Supabase / HubSpot | Kzee + client | CE-22, CE-23, CE-25 wiring (~3 hr work after answer) |
| 2 | HQ Rentals booking URL pattern (or sandbox access) | Client → HQ | All "Reserve" CTAs going anywhere real |
| 3 | Real fleet inventory list (make/model/year/photos) | Client | CE-18, CE-19 swap from placeholder cars |
| 4 | Domain registration + DNS | Client | Production deploy + email sending domain |
| 5 | Confirm: scope stays lean (single loyalty), or expand to full membership tiers from brand book | Client | Phase 2/3 roadmap |
| 6 | About page founder story + mission copy | Client | CE-24 fill |

---

## Sprint timeline (2-week)

| Day | Date | Focus | Status |
|---|---|---|---|
| 1 | Jun 1 | Brand foundation — tokens, fonts, naming | Done |
| 2 | Jun 1 | Route scaffold + nav cleanup | Done |
| 3 | Jun 2 | Brand book applied + fleet data unified | Done |
| 4 | Jun 3 | About page content, fleet card polish | Next |
| 5 | Jun 4 | Contact + Loyalty page polish, hero copy pass | Queued |
| 6 | Jun 5 | HQ Rentals deep-links wired (needs URL from client) | Queued — blocked |
| 7 | Jun 6 | Form vendor wired (needs vendor decision) | Queued — blocked |
| 8 | Jun 7 | Privacy / cookies / legal | Queued |
| 9 | Jun 8 | OG images, favicons, sitemap, robots | Queued |
| 10 | Jun 9 | Real fleet content swap (needs client inventory) | Queued — blocked |
| 11 | Jun 10 | Performance pass — Lighthouse, image budgets | Queued |
| 12 | Jun 11 | Mobile QA, accessibility sweep | Queued |
| 13 | Jun 12 | Client review pass | Queued |
| 14 | Jun 13 | Vercel production deploy + smoke test | Queued |
| Launch | **Jun 15** | Public | Target |

---

## Jira mapping

| Jira | Epic | Status in repo |
|---|---|---|
| CE-2 Website Foundation & Navigation | Epic | In Progress |
| CE-3 Vehicle Booking & Reservation | Epic | In Progress (HQ deep-link only) |
| CE-4 Fleet Management Experience | Epic | In Progress |
| CE-5 AI Chatbot & Customer Support | Epic | Deferred to v2 |
| CE-6 Affiliate Program (renamed Loyalty) | Epic | In Progress |
| CE-7 About Us & Brand Presence | Epic | In Progress (page scaffolded) |
| CE-8 Contact & Communication | Epic | In Progress |
| CE-9 Admin & CMS Management | Epic | Deferred to v2 |
| CE-10 Security & Compliance | Epic | Queued (privacy/cookies pass) |
| CE-11 Navigate Website Sections | Story | Done (SiteNav + MobileNav) |
| CE-13 Access Website Across Devices | Story | Done (responsive scaffold) |
| CE-14 Vehicle Search & Availability | Story | Blocked (HQ URL) |
| CE-15 Vehicle Reservation | Story | Blocked (HQ URL) |
| CE-16 Complete Secure Online Payments | Story | Handled by HQ Rentals |
| CE-17 Receive Booking Confirmation | Story | Handled by HQ Rentals |
| CE-18 Fleet Listing Page | Story | Done (placeholder data) |
| CE-19 Vehicle Detail Information | Story | Done (placeholder data) |
| CE-20 Chat With Virtual Assistant | Story | Deferred to v2 |
| CE-21 Contact Customer Support | Story | Done (form scaffold) |
| CE-22 Apply to Become an Affiliate | Story | Done (form) + Blocked (API) |
| CE-23 Track Affiliate Referrals | Story | Blocked (vendor) |
| CE-24 Learn About the Company | Story | In Progress (placeholder copy) |
| CE-25 Contact Us Page | Story | Done (form) + Blocked (API) |
| CE-26 Manage Website Content | Story | Deferred to v2 |
| CE-27 Protect Customer Data | Story | Queued (privacy + cookies) |

---

## Brand book — quick reference

- **Colors:** lead with matte black (~80%), white type, **luxury gold `#D4AF37` ≤ 7%** as the precious accent
- **Display type:** Cinzel — for headlines, logotype, "Drive Prestige" energy
- **Body type:** Montserrat — refined sans, weight 400 default
- **Primary taglines:** "Luxury is a standard" · "Drive what reflects your presence" · "Arrive differently"
- **CTAs:** Reserve Your Experience · Drive Prestige · Book Luxury · Elevate Your Journey
- **Photography mood:** cinematic, premium, refined — night city, golden light, refined lifestyle
- **Voice:** sophisticated, smooth, premium, trustworthy, modern. Few words, high impact.

---

## Log

| Date | Change |
|---|---|
| 2026-06-02 | Brand book applied: tokens, Cinzel/Montserrat, shield logo, naming sweep |
| 2026-06-02 | Fleet data unified into `src/lib/fleet.ts`, /fleet + /fleet/[slug] wired |
| 2026-06-02 | Top nav decluttered: removed 01/02/03 prefixes, removed Hero embedded buttons |
| 2026-06-02 | Mobile motion revert: restored original Lenis + atmosphere + MobileNav timings |
| 2026-06-02 | NUL byte corruption swept from all source files (Windows mount sync issue) |
| 2026-06-02 | Route scaffold: /fleet, /fleet/[slug], /about, /contact, /loyalty |
| 2026-06-02 | Day 1 brand foundation, Cheche Exotic rebrand (later corrected to Cheche Exotics) |
| 2026-06-01 | Phased roadmap ROADMAP.md authored |
