# Cheche Exotic — Production Roadmap

**Owner:** Kzee
**Client:** Cheche Exotic (luxury car rental + affiliate program)
**Backend:** HQ Rental Software
**Repo basis:** existing MVP (Next.js 16, React 19, Tailwind 4, GSAP, Lenis, Motion)
**Document date:** June 1, 2026

---

## Reality check on the June 4 launch date

The requested target is **June 4, 2026 — 3 days from today**. The scope as captured is:

- 10 pages (Home, Fleet, Vehicle detail, Booking, Affiliate, About, Locations, Contact, Journal, FAQ)
- Custom API integration with HQ Rentals (not embed, not redirect)
- Affiliate program with **five tracks**: commissions, paid course, mentorship, fleet partnership, member portal
- Real brand voice + fully curated copy
- AI-generated visual continuity with the current Higgsfield/Claude assets

A faithful build of all of that takes **6–10 weeks** at a competent solo pace — minimum. HQ Rentals custom API integration alone is typically 2–3 weeks once you have credentials, sandbox access, and their API docs. The affiliate member portal (auth, role-based access, commission tracking, course content) is its own 3–4 week module.

**Recommendation: split the launch.** Ship a Phase 1 "brand reveal" by **June 4** using the existing MVP as boilerplate — rebranded, with real copy and lead capture — then sequence the rest as Phase 2 and Phase 3. That gives the client a credible public presence on the requested date without faking depth that doesn't exist yet.

If June 4 is hard for a reason I don't know (event, press, investor demo), tell me and I'll adjust. If it's a "sooner is better" date, the phased plan below is the honest path.

---

## Now — Phase 1: Brand reveal (June 1 – June 4)

Goal: a polished single-page-plus-light-routing presence at checheexotic.com that establishes the brand, showcases the fleet visually, captures leads, and deep-links into HQ Rentals for actual bookings. Use existing MVP as boilerplate — rebrand it, swap copy, point assets at Cheche's Higgsfield generations.

| Item | Status | Owner | Notes |
|---|---|---|---|
| Rebrand existing MVP (logo, colors, typography, meta) | Not Started | Kzee | Tailwind tokens + global CSS sweep |
| Final brand voice direction (1 page brief) | Not Started | Kzee + client | Decision input for all copy |
| Curate Higgsfield asset inventory (hero video, fleet stills, B-roll) | Not Started | Kzee + client | Audit what exists, list gaps |
| Real copy for Hero, Fleet teaser, Reserve CTA, footer | Not Started | Kzee | Drafted with Claude, client-approved |
| Affiliate teaser section + waitlist form | Not Started | Kzee | Captures interest, no portal yet |
| Contact form → email or HQ Rentals lead endpoint | Not Started | Kzee | Resend or Formspree as stopgap |
| Deep-link "Reserve" buttons to existing HQ Rentals booking page | Not Started | Kzee | Param-prefilled where possible |
| Legal essentials: Terms, Privacy, basic FAQ block | Not Started | Kzee | Standard templates, client sign-off |
| Domain + Vercel production deploy + analytics | Not Started | Kzee | Plausible or PostHog |
| OG images + favicons + sitemap + robots | Not Started | Kzee | SEO floor |

**At Risk:** This phase only works if (a) Higgsfield assets are already in hand or generatable in 24h, (b) client can turn around copy/brand approvals same-day, (c) domain is registered and DNS is reachable. Any one of those slipping pushes the date.

---

## Next — Phase 2: Fleet + booking depth (June 5 – July 5)

Goal: real fleet catalog with per-vehicle pages, embedded booking flow, locations, journal scaffolding, and About story. This is when the site actually *competes* with the brand it's branching from.

| Item | Status | Target | Notes |
|---|---|---|---|
| HQ Rentals API discovery: credentials, sandbox, docs, scoping | Blocked | June 7 | **Blocker for custom UI track** |
| Fleet catalog page: filter by category, price, availability | Not Started | June 14 | API-driven or static-first with API swap |
| Vehicle detail pages (dynamic route) | Not Started | June 18 | Per-car spec, photos, availability calendar |
| Custom booking flow UI (dates, location, extras, checkout handoff) | Not Started | June 28 | Hybrid: custom UI, HQ handles payment |
| Locations / service area page | Not Started | June 22 | Map + delivery radius copy |
| About / founder story page | Not Started | June 24 | Brand voice anchor page |
| Journal scaffold (MDX or headless CMS) + 3 launch posts | Not Started | June 30 | SEO foundation |
| Expanded FAQ + insurance / policies | Not Started | July 1 | Client legal sign-off required |
| Performance pass (Lighthouse > 90, asset budget audit) | Not Started | July 3 | Higgsfield video is heavy — needs streaming |
| Phase 2 launch | Not Started | July 5 | |

**Dependencies:** HQ Rentals API access is the single biggest risk. If they can't provide it within 7 days, the booking flow stays on deep-link and we revisit in Phase 3.

---

## Later — Phase 3: Affiliate program + member portal (July 6 – August 30)

Goal: launch the affiliate program as a real product, not a waitlist. This is the differentiator from MVP ATL and the reason the client is investing in the brand.

| Item | Status | Target | Notes |
|---|---|---|---|
| Affiliate program GTM brief (positioning, pricing, tiers) | Not Started | July 10 | Client-led, Kzee facilitates |
| Auth layer (Clerk or Supabase) | Not Started | July 15 | Required for portal + course |
| Affiliate dashboard (referral link, commission tracker) | Not Started | July 28 | Read HQ Rentals booking events |
| Paid course module (lessons, gated video, progress) | Not Started | August 15 | Mux for video, Stripe for payments |
| Mentorship booking + calendar integration | Not Started | August 20 | Cal.com embed or custom |
| Fleet partnership flow (list-your-car application + approval) | Not Started | August 25 | Form → HQ Rentals owner record |
| Member resources hub | Not Started | August 27 | Docs, templates, community link |
| Phase 3 launch | Not Started | August 30 | |

**Strategic question:** the affiliate program covers a lot of ground — commissions, course, mentorship, fleet partnership, member resources. Each of those is a business in itself. The biggest risk to Phase 3 is shipping a wide-but-shallow program. **Recommendation:** pick one of the five as the hero offer (likely the course or fleet partnership) and treat the rest as supporting. Surface that conversation with the client before July.

---

## Dependencies and blockers (cross-phase)

| Dependency | Owner | Need-by | Risk |
|---|---|---|---|
| HQ Rentals API credentials + sandbox + docs | Client → HQ Rentals | June 7 | **High** — gates Phase 2 booking flow |
| Final brand voice direction | Client + Kzee | June 2 | Medium — gates all copy |
| Domain registration + DNS | Client | June 3 | High — gates Phase 1 deploy |
| Fleet inventory list (real vehicles, real specs, real availability) | Client | June 5 | Medium — Phase 2 needs source of truth |
| Higgsfield asset library audit | Kzee | June 2 | Medium — Phase 1 visual continuity |
| Decision: affiliate hero offer | Client | July 1 | High — Phase 3 scope-sprawl risk |
| Legal review of Terms / Privacy / rental policies | Client's lawyer | June 28 | Medium — required before real bookings |

---

## Capacity assumption

Solo dev (Kzee), full-time, with Claude as paired collaborator. ~35 productive hours/week after meetings, client reviews, and async. The schedule above assumes no parallel client work eats this capacity. If parallel work is real, push every Phase 2 / Phase 3 date right by the ratio of capacity loss.

---

## Changes since the original MVP

| Area | MVP (current) | Production target |
|---|---|---|
| Brand | MVP ATL placeholder | Cheche Exotic — full identity |
| Copy | Placeholder / AI-generated stub | Real brand voice, client-approved |
| Pages | Single-page showcase | 10 pages routed |
| Booking | Static `<Reserve>` section | HQ Rentals API-backed custom flow |
| Visuals | Higgsfield generations (showcase only) | Higgsfield + real fleet photography over time |
| Affiliate | None | Multi-track program with portal |
| Analytics | None | Plausible/PostHog + conversion goals |
| SEO | Minimal | Sitemap, journal, structured data |

---

## Next decisions I need from you (or the client) this week

1. **June 4 launch — phased Phase 1, or push the date?** This shapes everything.
2. **HQ Rentals API access** — who's the contact, when can they hand over credentials?
3. **Affiliate hero offer** — which of the five tracks leads? (Don't have to decide today, but Phase 3 stalls without it.)
4. **Brand voice anchors** — three reference brands or three adjectives we're optimizing for? I'll run brand-voice discovery once we have those.
5. **Budget for paid tools** — Clerk/Supabase, Mux, Stripe, Resend, Plausible. Most have free tiers but the portal phase will cost ~$100–250/month at modest usage.
