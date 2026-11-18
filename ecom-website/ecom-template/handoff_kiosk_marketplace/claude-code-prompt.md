# Prompt for Claude Code

**First copy the `design/` folder into your empty project folder**, then paste everything below the line.

---

I have an approved design I need built as a React app with Tailwind CSS. Do not redesign it, do not improve it, do not substitute your own colors, spacing, or copy.

## Source of truth

`design/markup.html` is the whole design as one inline-styled HTML document. `design/data.js` is the seed data. **Read both completely before writing any code.** Every value you produce must come from that markup — if a padding is `44px 32px 88px`, write it exactly, not "roughly py-20".

Template syntax in the markup, translated literally:

- `{{ x }}` → JSX `{x}`
- `<sc-for list="{{ items }}" as="item">…</sc-for>` → `items.map(item => …)` with a `key`
- `<sc-if value="{{ isBrowse }}">…</sc-if>` → a route. The seven of these are the seven screens. `phoneHidden`/`phoneShown`, `posted`/`notPosted` and `showCats` are UI states, not routes — render those conditionally.
- `style-hover="…"` → `hover:` utilities with the same values
- `onClick="{{ goPost }}"` → `<Link to="/post">`; `onClick="{{ item.open }}"` → `<Link to={'/listing/' + item.id}>`

## Stack

Vite + React (JS, not TS), Tailwind CSS v4 via `@tailwindcss/vite`, `react-router-dom`. Plain function components and `useState`. No state library, no UI kit, no icon library, no extra dependencies. This is a teaching project, so keep the code obvious and readable.

## Routes

`/` browse · `/search` results · `/listing/:id` detail · `/signin` · `/signup` · `/post` · `/dashboard`. A `Layout` holds the header and footer with an `<Outlet />`. Scroll to top on navigation.

The header's category strip only appears on browse, results and detail (`showCats` in the markup). Clicking a category navigates to `/search` with that category active — put it in the URL (`/search?cat=Cars`) and read it with `useSearchParams`, so the filter survives a refresh.

## Files

```
src/
  main.jsx
  App.jsx
  data/listings.js             // design/data.js, unchanged
  components/Layout.jsx
  components/Header.jsx        // logo, search field, nav pills, category strip
  components/Footer.jsx
  components/ListingCard.jsx   // the 4-up card, used on browse, results and "similar"
  components/SegmentedControl.jsx  // the sort pills and dashboard tabs — same control
  pages/Browse.jsx
  pages/Results.jsx
  pages/ListingDetail.jsx
  pages/SignIn.jsx
  pages/SignUp.jsx
  pages/PostListing.jsx
  pages/Dashboard.jsx
```

Only extract a component where the markup genuinely repeats. Everything else stays inline in its page — I would rather read one long page file than chase twelve tiny ones.

## Tokens

Put these in `src/index.css` under `@theme` and use the named utilities rather than re-typing hex values. These are the values already in the markup:

```css
@theme {
  --color-canvas: #F7F6F3;   /* page background */
  --color-surface: #FFFFFF;  /* cards, header fields, footer */
  --color-sunken: #F0EFEB;   /* input hover, avatar tiles, active segment */
  --color-ink: #131316;      /* primary text, dark buttons */
  --color-ink-2: #35353D;    /* body copy */
  --color-ink-3: #55555F;    /* secondary */
  --color-ink-4: #8A8A93;    /* meta */
  --color-ink-5: #A3A3AC;    /* placeholder, faintest meta */
  --color-accent: #3B5BFF;   /* cobalt — primary actions */
  --color-accent-deep: #2D49E0;
  --font-sans: "Instrument Sans", sans-serif;
  --font-mono: "DM Mono", monospace;
}
```

Load **Instrument Sans** (400/500/600/700) and **DM Mono** (400/500) from Google Fonts in `index.html`.

Borders are `1px solid rgba(19,19,22,0.07)` almost everywhere (`0.05`–`0.06` on inner dividers) — write as `border-[rgba(19,19,22,0.07)]` or a token; keep the alpha exact, don't round to Tailwind's nearest step.

Radii: cards `20px`, big panels `24–26px`, card image `14px`, inputs `13px`, buttons `12–14px`, pills `999px`, avatar/icon tiles `12–18px`.

Shadows — two layers, always:
- resting: `0 1px 2px rgba(19,19,22,0.03)` (`0.04` on elevated panels)
- elevated panels add `0 20px 40px -24px rgba(19,19,22,0.18)` (sidebar/forms use `-28px/-30px` variants, see markup)
- card hover: `translateY(-3px)` plus `0 2px 4px rgba(19,19,22,0.05), 0 22px 40px -22px rgba(19,19,22,0.3)`
- cobalt buttons: `0 1px 2px rgba(19,19,22,0.08), 0 8px 20px -10px rgba(59,91,255,0.7)`; dark buttons the same with `rgba(19,19,22,0.5–0.6)`

Transitions: `160ms` on links, inputs and pills; `180ms` on buttons; `200ms` on cards.

## Things that get dropped in ports — keep all of them

1. The **translucent header**: `rgba(247,246,243,0.78)` with `backdrop-filter: blur(20px) saturate(1.4)`. Not an opaque bar.
2. **DM Mono on every piece of metadata** — timestamps, locations, spec keys, stat labels, table headers, the "live" counts, footer column headers, the copyright line. This is the design's main texture; sans-serif metadata kills it.
3. `font-variant-numeric: tabular-nums` on **every price and count**, so digits line up down a column.
4. Card construction: the card has `padding: 8px` and the image is a **rounded inner block** inside it — not a flush image bleeding to the card edge.
5. The **segmented control** (results sort, dashboard tabs): a pill-shaped container with `padding: 4px` and a `1px` border; the active item gets `bg-sunken` plus `inset 0 0 0 1px rgba(19,19,22,0.05)`; inactive items are transparent with `ink-4` text.
6. Dashboard **status dots** — a 6px colored dot inside a tinted pill, three states: Live `#22A45D` on `rgba(23,114,69,0.08)` with `#177245` text; Paused `#D98A00` on `rgba(138,90,0,0.08)` with `#8A5A00` text; Sold `#A3A3AC` on `rgba(19,19,22,0.06)` with `#55555F` text.
7. The hero's **pulsing-dot badge**: a 7px cobalt dot with `box-shadow: 0 0 0 3px rgba(59,91,255,0.18)` as a halo ring.
8. The post form's **live preview** card in the sticky sidebar — it renders the same card shape and updates from the form state as you type, with fallbacks "Your title appears here" / "₹ —" / "Your area".
9. Every **image area is a placeholder block**: `linear-gradient(160deg, #EFEDE8, #E4E2DC)` at the aspect ratio in the markup, some with an uppercase mono caption. Do not add real images, stock photos, or SVG illustrations. The only glyphs in the design are `K`, `⌕`, `⛋`, `▭`, `⌂`, `◈`, `✓`, `+`, `←`, `·`.
10. The **cobalt label** on the revealed phone number is `#2D49E0`, not a lighter tint — it was darkened for contrast. Keep it.

## Copy

Use the exact text in the markup and `design/data.js`. Do not rewrite headings, paragraphs, labels or button text. Do not add sections that aren't there — no testimonials, no map, no favorites, no messaging inbox, no dark-mode toggle, no ratings.

## Interactive behaviour

- Header nav marks the active route; `/signin` and `/signup` both light the "Sign in" pill.
- Search submit and any category click go to `/search`; `All` shows everything, a named category filters `LISTINGS` by `cat`. Sort pills set state but don't need to reorder (the design doesn't show sorted output — keep them as state only).
- Detail page resolves the listing by `id` from the URL. **The phone number is hidden until "Show phone number" is clicked**, and it must reset to hidden when you open a different listing. "Similar listings" is the first four listings excluding the current one.
- Sign in and sign up: controlled inputs, `preventDefault`, then navigate to `/dashboard`. No validation beyond input types.
- Post listing: category chips set one active category; title/price/location/description are controlled and drive the live preview; submit swaps the whole form for the success state; "Post another" clears the fields and returns to the form.
- Dashboard: tabs filter the rows by status (`All` shows everything). Stats are static.
- Nothing persists and nothing is fetched — `listings.js` is imported directly. Note in a comment where a real API would go.

## Layout

Desktop-first, `max-w-[1280px] mx-auto px-8` content column, matching the markup. It must hold at 1280px. Sticky sidebars on detail and post-listing use `top: 132px`. Don't add responsive breakpoints I didn't ask for.

## Done means

All seven routes render and are visually indistinguishable from `design/markup.html` side by side at 1280px — same type sizes, same paddings, same shadows, same hover behaviour. The phone reveal, category filtering, post-form preview, success state and dashboard tabs all work. Tell me anything you had to approximate.
