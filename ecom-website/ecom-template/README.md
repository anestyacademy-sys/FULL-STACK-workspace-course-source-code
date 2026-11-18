# Kiosk — static template

The seven screens of the Kiosk classifieds marketplace, built from
`handoff_kiosk_marketplace/`. This is **markup only**: the pages render, the
links navigate, and nothing else happens. Every piece of behaviour described in
the handoff is left for you to add.

```bash
npm install
npm run dev
```

Desktop-first — the design holds at 1280px and has no responsive breakpoints.

## Screens

| Route           | File                       |
| --------------- | -------------------------- |
| `/`             | `src/pages/Browse.jsx`     |
| `/search`       | `src/pages/Results.jsx`    |
| `/listing/:id`  | `src/pages/ListingDetail.jsx` |
| `/signin`       | `src/pages/SignIn.jsx`     |
| `/signup`       | `src/pages/SignUp.jsx`     |
| `/post`         | `src/pages/PostListing.jsx` |
| `/dashboard`    | `src/pages/Dashboard.jsx`  |

Each page holds its own header and footer, so there is no shared layout and no
components folder. The listings are written out in the JSX — there is no data
file yet.

## Tokens

`src/index.css` holds the palette, the two fonts and the content width under
`@theme`, so use `bg-surface`, `text-ink-3`, `font-mono`, `max-w-content` and so
on rather than retyping hex values. Borders are written as `border-ink/7` —
that alpha comes straight from the design and should not be rounded.

`placeholder-fill` is the grey gradient that stands in for every photo. There
are no images in this design on purpose.

## What is deliberately missing

Each of these is drawn in one fixed state:

- **Search** — the field submits nothing.
- **Category chips** — they link to `/search?cat=…`, but results are never filtered.
- **Sort pills and dashboard tabs** — `Newest` and `All` are drawn as active; clicking does nothing.
- **Listing detail** — one hardcoded listing. Every card points at `/listing/:id` and they all land on it.
- **Phone reveal** — always hidden. The revealed panel is kept as a comment in `ListingDetail.jsx`.
- **Sign in / sign up** — uncontrolled inputs, no submit handler.
- **Post a listing** — `Cars` is the selected chip, the live preview shows its empty-state fallbacks, and the success screen is kept as a comment in `PostListing.jsx`.
- **Dashboard** — fixed stats and four fixed rows.
- **Scroll-to-top on navigation** — not wired.

`handoff_kiosk_marketplace/README.md` documents what each of these should do.
