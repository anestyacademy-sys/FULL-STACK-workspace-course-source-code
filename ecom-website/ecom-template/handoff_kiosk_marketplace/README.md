# Handoff: Kiosk — classifieds marketplace

## Overview

A seven-screen classifieds marketplace where users sign up and post their own listings: cars, electronics, rentals, jobs, furniture, phones. Buyers contact sellers directly — no cart, no checkout, no payments. Desktop-first. Screens: Browse (home), Results, Listing detail, Sign in, Sign up, Post a listing, My listings (dashboard).

## About the design files

The files in `design/` are **design references created in HTML** — prototypes showing intended look and behaviour, not production code to copy directly. Recreate them in the target codebase using its established patterns and libraries. If no environment exists yet, Vite + React + Tailwind CSS v4 + `react-router-dom` is the intended target; `claude-code-prompt.md` is a ready-to-paste build prompt for that stack.

- `design/markup.html` — the entire design as one inline-styled HTML document. **Source of truth for every measurement, color and string.**
- `design/data.js` — seed data: 8 listings (with specs, seller, phone), category list, category tiles, the three how-it-works steps, the dashboard rows and status styles.
- `design/Marketplace.dc.html` — the interactive prototype. Open in a browser to click through all seven screens.

`markup.html` uses a small template syntax: `{{ x }}` → `{x}`; `<sc-for list="{{ items }}" as="item">` → `items.map(...)`; `<sc-if value="{{ isBrowse }}">` → a route (the seven of these are the seven screens; `phoneHidden`/`posted`/`showCats` are UI states, not routes); `style-hover="…"` → hover utilities; `onClick="{{ item.open }}"` → a link to `/listing/:id`.

## Fidelity

**High-fidelity.** Final colors, typography, spacing and interactions — recreate pixel-perfectly. The only unresolved items are image areas, which are intentional placeholder blocks (see Assets).

---

## Design tokens

### Color

| Token | Value | Use |
|---|---|---|
| canvas | `#F7F6F3` | page background, sunken inputs |
| surface | `#FFFFFF` | cards, panels, header search field, footer |
| sunken | `#F0EFEB` | input hover, avatar tiles, active segment |
| ink | `#131316` | primary text, dark buttons, logo mark |
| ink-2 | `#35353D` | body copy, chip labels |
| ink-3 | `#55555F` | secondary text, inactive nav |
| ink-4 | `#8A8A93` | metadata, mono labels |
| ink-5 | `#A3A3AC` | placeholders, faintest meta, footer headers |
| accent | `#3B5BFF` | primary actions, active dot, tag pills |
| accent-deep | `#2D49E0` | revealed phone number + its label |
| placeholder fill | `linear-gradient(160deg, #EFEDE8, #E4E2DC)` | every image area |

Status colors — dot / background / text: Live `#22A45D` / `rgba(23,114,69,0.08)` / `#177245`; Paused `#D98A00` / `rgba(138,90,0,0.08)` / `#8A5A00`; Sold `#A3A3AC` / `rgba(19,19,22,0.06)` / `#55555F`.

Accent tints: `rgba(59,91,255,0.05)` (form-tip panel, photo dropzone), `0.07` (phone-reveal panel), `0.09–0.10` (category icon tile, tag pill), `0.16–0.20` (tinted borders), `0.18` (hero dot halo).

Borders: `rgba(19,19,22,0.07)` on every card, panel and field; `0.05–0.06` on inner dividers and table rows; `0.08` on inputs and ghost buttons; `0.14` on an active category chip.

### Typography

**Instrument Sans** 400/500/600/700 for everything structural. **DM Mono** 400/500 for all metadata — this is the design's main texture.

| Role | Size / line-height / weight / tracking |
|---|---|
| Browse H1 | 76 / 0.98 / 600 / −0.052em |
| Post-listing H1 | 50 / 1.00 / 600 / −0.05em |
| Results H1 | 46 / 1.02 / 600 / −0.045em |
| Detail H1, Auth H1 | 40 / 1.06 / 600 / −0.045em |
| Dashboard H1, success H1 | 34 / 1.04–1.06 / 600 / −0.045em |
| Sidebar price | 38 / 1.00 / 600 / −0.045em, tabular |
| Dashboard stat numeral | 32 / 1.00 / 600 / −0.045em, tabular |
| Section heading | 24–26 / 600 / −0.035em |
| Card price | 20–21 / 600 / −0.035em, tabular |
| Subsection heading | 19 / 600 / −0.025em |
| Hero / intro paragraph | 18 / 1.60 |
| Body paragraph | 17 / 1.72 |
| Input text, spec value | 15–16 / 400–500 |
| Card title | 14 / 1.45 / 400 / ink-3 |
| Form label | 13 / 500 / ink-2 |
| Mono meta | 11–12 / 0.04–0.14em / often uppercase / ink-4 or ink-5 |
| Mono table header | 10 / 0.10em / uppercase |

`font-variant-numeric: tabular-nums` on every price and count.

### Spacing, radius, elevation

- Content column `max-width: 1280px`, `padding: 0 32px`. Header inner `14px 32px`; page sections `40–56px 32px 88px`.
- Grid gaps: 4-up card grids `18px`; category tiles `14px`; 2-column page splits `26–48px`; footer columns `40px`.
- Radius: cards `20px`; large panels `22–26px`; card inner image `14px`; spec/table panels `20–24px`; inputs `13px`; buttons `12–14px`; pills `999px`; icon and avatar tiles `12–18px`.
- Elevation is always two layers — a 1px contact shadow plus a wide soft one. Resting `0 1px 2px rgba(19,19,22,0.03)`; elevated panels `0 1px 2px rgba(19,19,22,0.04), 0 20px 40px -24px rgba(19,19,22,0.18)` (sidebar `-28px/0.24`, auth card `-30px/0.26`). Card hover `translateY(-3px)` + `0 2px 4px rgba(19,19,22,0.05), 0 22px 40px -22px rgba(19,19,22,0.3)`. Cobalt buttons `0 1px 2px rgba(19,19,22,0.08), 0 8px 20px -10px rgba(59,91,255,0.7)`; dark buttons the same shape with `rgba(19,19,22,0.5–0.6)`.
- Transitions: `160ms` links / inputs / pills, `180ms` buttons, `200ms` cards. Button and card hover lift is `translateY(-1px)` and `-3px` respectively.

---

## Screens

### Shared — Header

Sticky, `z-index 30`, `rgba(247,246,243,0.78)` with `backdrop-filter: blur(20px) saturate(1.4)`, bottom border `0.07`.

- **Left:** 30px `9px`-radius ink tile with `K`, then wordmark "Kiosk" (18/600/−0.03em). Links to browse.
- **Center:** search field — white, `1px` border, `14px` radius, `max-width 520px`, a `⌕` glyph at `ink-5`, borderless input, and an ink "Search" button (`10px` radius) that turns cobalt on hover.
- **Right:** nav pills "My listings" and "Sign in" (`8px 13px`, `10px` radius; active = white background + ink text, inactive = ink-3), then the cobalt **"Post a listing"** button (`10px 18px`, `12px` radius, cobalt glow, hover lift 1px). `/signin` and `/signup` both light the Sign in pill.
- **Category strip** — only on browse, results and detail. A row of 999px chips: All, Cars, Electronics, Rentals, Jobs, Furniture, Phones. Active (when not on browse) = white fill + `0.14` border; inactive = transparent + `0.08` border. Clicking one goes to results filtered by that category.

### Shared — Footer

White, top border `0.07`. Four columns `1.5fr 1fr 1fr 1fr`, gap 40, padding `44px 32px 28px`: brand block (28px logo tile + wordmark, then "A classifieds board for your city. Buyers and sellers talk directly." at 15/1.6 ink-4, max 34ch); **Browse** (Cars, Electronics, Rentals, Jobs); **Account** (Sign in, Create account, My listings, Post a listing); **Help** (Safety tips, Listing rules, Report a listing — plain text, not links). Column headers are 10px mono, `0.12em`, uppercase, ink-5. Bottom bar above a `0.06` rule, mono 12px ink-5: "© 2026 Kiosk" left, "Kiosk never handles payments" right.

### 1. Browse (`/`)

Purpose: orient a new visitor and surface the newest listings.

1. **Hero**, `56px 32px 40px`, grid `1.45fr 1fr` gap 48, items end.
   - Left: a white pill badge containing a 7px cobalt dot with a `0 0 0 3px rgba(59,91,255,0.18)` halo and "4,812 listings posted this week"; H1 **"Buy and sell anything nearby."** (76px, max 17ch); an 18/1.6 ink-3 paragraph, max 50ch; two buttons — ink **"Post a listing"** and white **"Browse everything"**, both `14px 26px` at `14px` radius.
   - Right: a **"How Kiosk works"** card (`22px` radius, elevated) with a 11px mono uppercase header and three numbered steps — each a 22px `7px`-radius cobalt-tinted square holding a mono numeral, beside 15/1.5 ink-2 text. Below a `0.07` rule: "Kiosk never handles payments. Meet in a public place and check the item yourself." at 13px ink-4.
2. **Category tiles** — 4-column grid, gap 14. Each is a white `18px`-radius row card: a 38px `12px`-radius icon tile (Cars is cobalt-tinted with cobalt glyph; the rest are `sunken` with ink-2), then the label (15/600) and a mono "`count` live" line. Links to that category's results.
3. **Fresh today** — heading 26/600/−0.035em with a cobalt "See all listings" link, then a 4-column grid (gap 18) of all eight listings as **ListingCard**.

**ListingCard** — white, `1px` border, `20px` radius, **`padding: 8px`**, resting shadow. Inside: a `4/3` placeholder block at `14px` radius with a frosted category pill top-left (`rgba(255,255,255,0.86)` + `blur(8px)`, 10px mono uppercase). Then `14px 10px 10px`: price (20–21/600/−0.035em, tabular), title (14/1.45/400 ink-3), and a mono `place · time` line pushed to the bottom with `margin-top: auto`. Hover lifts 3px with the two-layer shadow.

### 2. Results (`/search`)

Purpose: browse one category or everything.

Header row: mono eyebrow with the active category, H1 (`Everything on Kiosk` for All, else `<Category> for sale`), and "`n` listings · within 25 km of Pune". Right side: the **segmented control** with Newest / Price low / Price high.

Then the same 4-column ListingCard grid, filtered by the active category.

**SegmentedControl** — white pill container, `padding: 4px`, `1px` border, resting shadow. Items are 999px, `7px 15–16px`, 13/500. Active: `sunken` background + `inset 0 0 0 1px rgba(19,19,22,0.05)` + ink text. Inactive: transparent + ink-4. Used for the sort row and the dashboard tabs.

### 3. Listing detail (`/listing/:id`)

Purpose: read one listing and reach the seller.

Ghost "← Back to results" pill, then grid `1.6fr 1fr` gap 32, items start.

**Left column:** a `16/10` placeholder at `24px` radius with a mono caption; a cobalt-tinted category pill; H1 40px; a mono line "Posted `time` · `place` · `views` views"; **Description** heading and a 17/1.72 paragraph (max 62ch); **Details** heading and a white `20px`-radius panel holding a `200px 1fr` definition grid — mono 12px keys in ink-4, 15/500 values, rows divided by `0.06` rules.

**Right column** (sticky, `top: 132px`):
- **Price card** (`24px` radius, elevated): mono "ASKING PRICE" label, the price at 38/600 tabular, a `0.07` rule, then the seller row — a 42px `14px`-radius `sunken` tile with the seller's initial, the name (15/600) and a mono "Member since `year`".
- **Phone reveal** — a full-width cobalt button **"Show phone number"**. On click it is replaced by a `rgba(59,91,255,0.07)` panel with a `0.20` border: a 10px mono uppercase **"SELLER'S NUMBER"** label in `#2D49E0` (darkened for contrast — keep it) above the number at 21/600 tabular in `#2D49E0`. Below either state, a secondary **"Message seller"** button on `canvas`.
- **"Before you pay"** card: mono header and 14/1.65 ink-3 safety copy.

**Similar listings** — heading 24/600 and a 4-column ListingCard grid (no category pill on these), the first four listings excluding the current one.

### 4. Sign in (`/signin`)

Centered `440px` column. Title "Welcome back" (40/600) + "Sign in to manage your listings." Then a white `26px`-radius card with the strongest shadow (`-30px/0.26`), `padding: 30px`: Email and Password fields (13/500 label above a `canvas` input, `13px` radius, `1px` border; focus turns the field white and the border cobalt), a row with a cobalt-accented "Keep me signed in" checkbox and a cobalt "Forgot password?" link, then a full-width ink **"Sign in"** button. Below the card: "New to Kiosk? **Create an account**".

### 5. Sign up (`/signup`)

Same centered card treatment. Title "Create your account" + "Free, and takes about thirty seconds." Fields: Full name, Email, Phone, Password. Ink **"Create account"** button, then 13px ink-4 fine print "By creating an account you agree to the terms and the listing rules." Below the card: "Already have an account? **Sign in**".

### 6. Post a listing (`/post`)

Purpose: create a listing.

Header: mono "NEW LISTING" eyebrow, H1 **"What are you selling?"** (50px), and a 17px ink-3 line. Then a `1.35fr 1fr` grid, gap 26.

**Left — form card** (`26px` radius, elevated, `padding: 28px`, `gap: 22px`):
- **Category** — 999px chips for the six real categories. Active = solid cobalt with white text; inactive = `canvas` with ink-2 and a `0.08` border.
- **Title** — full-width input.
- **Price (₹)** and **Location** — two columns, gap 14.
- **Description** — 6-row textarea, `resize: vertical`.
- **Photos** — 4-column grid of `aspect-ratio: 1` tiles at `16px` radius: a cobalt-tinted dashed dropzone with `+` and a mono "ADD", two filled placeholder blocks, and one empty dashed slot.
- A cobalt **"Publish listing"** button, `align-self: start`.

**Right — sticky sidebar** (`top: 132px`):
- **Live preview** card: mono "LIVE PREVIEW" header over a miniature of the real ListingCard on a `canvas` inset, wired to the form state. Fallbacks when empty: "Your title appears here", "₹ —", "Your area", and the meta line reads "· just now".
- **"Listings that sell fast"** — a cobalt-tinted `22px`-radius panel with three one-line tips.

**Success state** replaces the whole screen: a 56px `18px`-radius cobalt tile with `✓`, "Your listing is live" (34/600), a 17/1.65 ink-3 paragraph, and two buttons — ink "Go to my listings" and white "Post another" (which clears the form and returns to it).

### 7. My listings (`/dashboard`)

Purpose: manage what you have posted.

Header row: a 54px `18px`-radius ink avatar tile with `R`, the name "Rohan Kulkarni" (34/600) and a mono "Member since 2023 · Pune"; on the right, the cobalt "Post a listing" button.

**Stats** — 4-column grid, gap 14, of white `20px`-radius cards: a 32/600 tabular numeral over a 11px mono uppercase label. 4 Active listings · 691 Total views · **12 Replies received (cobalt numeral)** · 2 Items sold.

**Tabs** — the SegmentedControl with All / Live / Sold, filtering the rows by status.

**Table** — a white `24px`-radius panel, `overflow: hidden`. Columns `84px 1fr 130px 100px 110px 84px`, gap 20. Header row is 10px mono uppercase ink-4 over a `0.07` rule: Photo, Listing, Price, Views, Status, Action. Each row (`14px 22px`, `0.05` divider, hover `#FAFAF8`): an `11px`-radius placeholder thumb; the title (15/500, links to the listing, cobalt on hover) above a mono "`cat` · posted `time`"; price 17/600 tabular; views 15px tabular; a **status pill** — a 6px colored dot inside a tinted 999px pill; and a ghost **"Edit"** button right-aligned.

---

## Interactions & behaviour

- **Routing:** `/` · `/search` · `/listing/:id` · `/signin` · `/signup` · `/post` · `/dashboard`. Scroll to top on every navigation.
- **Active nav:** exact route match; `/signin` and `/signup` both mark Sign in.
- **Category filter:** header chips and the home tiles all navigate to results with that category active. Put it in the URL (`/search?cat=Cars`) so it survives a refresh. `All` shows everything.
- **Sort pills:** set state only — the design does not show reordered output.
- **Search field:** submitting goes to results with `All` active. No text matching is designed; wire it to a real query when the API exists.
- **Phone reveal:** hidden by default, revealed on click, and **resets to hidden when a different listing opens**.
- **Auth forms:** controlled inputs, `preventDefault`, then navigate to the dashboard. No validation beyond input types — add real validation when wiring up.
- **Post form:** one active category chip; title/price/location/description drive the live preview as you type; submit swaps in the success state; "Post another" clears the fields.
- **Dashboard tabs:** filter rows by status.
- **Hover:** cards lift 3px with a two-layer shadow (200ms); buttons lift 1px (180ms); table rows tint to `#FAFAF8`; nav and chips shift to ink.
- **Loading / error / empty states:** none designed. A skeleton should reuse the ListingCard shell with the placeholder gradient. An empty category is currently impossible with the seed data — design one before shipping real data.
- **Responsive:** not designed. Desktop-first, holds at 1280px. Mobile is out of scope for this handoff.

## State

Prototype state, all local:

| State | Type | Notes |
|---|---|---|
| route | string | replaced by the router |
| id | string | comes from `/listing/:id` |
| cat | string | belongs in the URL as a query param |
| sort, tab | string | local UI state |
| query | string | search field |
| phone | boolean | phone-reveal toggle, resets per listing |
| email, password, name, phoneNum, remember | string / boolean | auth fields |
| fCat, fTitle, fPrice, fPlace, fBody | string | post-listing fields |
| posted | boolean | post-listing success state |

Derived, not stored: current listing (`find` by id), filtered results, similar listings (first four excluding current), result count, the preview strings, dashboard rows (joined from `MINE` + `LISTINGS` + `STATUS`). Nothing is fetched — `data.js` is imported directly.

## Assets

**None.** Every image area is an intentional placeholder: `linear-gradient(160deg, #EFEDE8, #E4E2DC)` at the aspect ratio given per screen, some with an uppercase mono caption. Replace with real images at handoff — listing photos (`4/3`), one `16/10` detail photo, square upload thumbs, and `4/3` dashboard thumbs.

No icon library. The only glyphs are `K` (logo), `⌕` (search), `⛋` `▭` `⌂` `◈` (category tiles), `✓`, `+`, `←` and `·`. Swap the category glyphs for a real icon set if you have one; keep the 38px tile and its tint. Fonts are Google-hosted: Instrument Sans and DM Mono.

Copy — headings, paragraphs, labels, button text and all eight listings — is final and should be used verbatim from `design/markup.html` and `design/data.js`.

## Open questions for the team

1. **Search** has a designed input but no designed result state for a text query — decide whether it filters titles client-side or hits an endpoint, and design a no-results state.
2. **Sort** pills are visual only. Confirm the three orders (newest, price ascending, price descending) before wiring.
3. **"Message seller"** is designed as a button with no destination — there is no inbox in this handoff.
4. **Dashboard stats** are static figures; confirm what the real API returns.
5. **Jobs and Rentals** reuse the price field (`₹9–14 LPA`, `₹28,000/mo`). If those become structured fields, the card's price line needs a variant.

## Files

```
design/markup.html            entire design, inline-styled — source of truth
design/data.js                listings, categories, tiles, steps, dashboard rows, status styles
design/Marketplace.dc.html    interactive prototype, open in a browser
claude-code-prompt.md         ready-to-paste build prompt for Vite + React + Tailwind v4
screenshots/                  full-page captures of all seven screens (plus the phone-revealed state)
```
