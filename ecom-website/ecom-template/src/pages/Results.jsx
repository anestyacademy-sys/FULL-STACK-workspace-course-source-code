import { Link } from "react-router-dom";

// The results grid. Every listing is written out here — a real build would
// filter this list by the ?cat= query parameter instead.
function Results() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-canvas font-sans text-ink">
      {/* ---------------- header ---------------- */}
      <header className="sticky top-0 z-30 border-b border-ink/7 bg-canvas/78 backdrop-blur-[20px] backdrop-saturate-[1.4]">
        <div className="mx-auto flex max-w-content items-center gap-5 px-8 py-3.5">
          <Link to="/" className="flex shrink-0 items-center gap-2.5 text-ink no-underline">
            <span className="flex size-7.5 items-center justify-center rounded-[9px] bg-ink text-[14px] font-semibold text-canvas">
              K
            </span>
            <span className="text-[18px] font-semibold tracking-[-0.03em]">Kiosk</span>
          </Link>

          {/* the search field is markup only — nothing is submitted yet */}
          <form className="flex max-w-[520px] flex-1 items-center gap-2.5 rounded-[14px] border border-ink/8 bg-surface py-1.5 pr-1.5 pl-3.5 shadow-[0_1px_2px_rgba(19,19,22,0.04)]">
            <span className="text-[14px] text-ink-5">⌕</span>
            <input
              type="text"
              placeholder="Search cars, laptops, rentals…"
              className="min-w-0 flex-1 border-none bg-transparent font-sans text-[15px] text-ink outline-none"
            />
            <button
              type="submit"
              className="shrink-0 cursor-pointer rounded-[10px] border-none bg-ink px-4 py-2 font-sans text-[13px] font-semibold text-white transition-colors duration-160 hover:bg-accent"
            >
              Search
            </button>
          </form>

          <nav className="ml-auto flex shrink-0 items-center gap-1">
            <Link
              to="/dashboard"
              className="rounded-[10px] px-3.25 py-2 text-[14px] font-medium text-ink-3 no-underline transition-all duration-160 hover:text-ink"
            >
              My listings
            </Link>
            <Link
              to="/signin"
              className="rounded-[10px] px-3.25 py-2 text-[14px] font-medium text-ink-3 no-underline transition-all duration-160 hover:text-ink"
            >
              Sign in
            </Link>
            <Link
              to="/post"
              className="ml-1.5 rounded-[12px] bg-accent px-4.5 py-2.5 text-[14px] font-semibold text-white no-underline shadow-[0_1px_2px_rgba(19,19,22,0.08),0_8px_20px_-10px_rgba(59,91,255,0.7)] transition-all duration-180 hover:-translate-y-px hover:shadow-[0_2px_4px_rgba(19,19,22,0.1),0_12px_26px_-10px_rgba(59,91,255,0.8)]"
            >
              Post a listing
            </Link>
          </nav>
        </div>
        {/* the category strip only shows on browse, results and detail */}
        <div className="border-t border-ink/5">
          <div className="mx-auto flex max-w-content flex-wrap gap-1.5 px-8 py-2.25">
            <Link
              to="/search"
              className="rounded-full border border-ink/14 bg-surface px-3.25 py-1.5 text-[13px] font-medium text-ink no-underline"
            >
              All
            </Link>
            <Link
              to="/search?cat=Cars"
              className="rounded-full border border-ink/8 px-3.25 py-1.5 text-[13px] font-medium text-ink-3 no-underline transition-all duration-160 hover:text-ink"
            >
              Cars
            </Link>
            <Link
              to="/search?cat=Electronics"
              className="rounded-full border border-ink/8 px-3.25 py-1.5 text-[13px] font-medium text-ink-3 no-underline transition-all duration-160 hover:text-ink"
            >
              Electronics
            </Link>
            <Link
              to="/search?cat=Rentals"
              className="rounded-full border border-ink/8 px-3.25 py-1.5 text-[13px] font-medium text-ink-3 no-underline transition-all duration-160 hover:text-ink"
            >
              Rentals
            </Link>
            <Link
              to="/search?cat=Jobs"
              className="rounded-full border border-ink/8 px-3.25 py-1.5 text-[13px] font-medium text-ink-3 no-underline transition-all duration-160 hover:text-ink"
            >
              Jobs
            </Link>
            <Link
              to="/search?cat=Furniture"
              className="rounded-full border border-ink/8 px-3.25 py-1.5 text-[13px] font-medium text-ink-3 no-underline transition-all duration-160 hover:text-ink"
            >
              Furniture
            </Link>
            <Link
              to="/search?cat=Phones"
              className="rounded-full border border-ink/8 px-3.25 py-1.5 text-[13px] font-medium text-ink-3 no-underline transition-all duration-160 hover:text-ink"
            >
              Phones
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-content px-8 pt-10 pb-22">
          <div className="mb-6 flex items-end justify-between gap-8">
            <div>
              <p className="mb-3 font-mono text-[11px] font-medium tracking-[0.14em] text-ink-4 uppercase">
                All
              </p>
              <h1 className="mb-2 text-[46px] leading-[1.02] font-semibold tracking-[-0.045em]">
                Everything on Kiosk
              </h1>
              <p className="text-[15px] text-ink-3">8 listings · within 25 km of Pune</p>
            </div>

            {/* segmented control — Newest is drawn as the active pill */}
            <div className="flex items-center gap-1.5 rounded-full border border-ink/7 bg-surface p-1 shadow-[0_1px_2px_rgba(19,19,22,0.03)]">
              <button
                type="button"
                className="cursor-pointer rounded-full bg-sunken px-3.75 py-1.75 text-[13px] font-medium text-ink shadow-[inset_0_0_0_1px_rgba(19,19,22,0.05)]"
              >
                Newest
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-full px-3.75 py-1.75 text-[13px] font-medium text-ink-4 transition-all duration-160 hover:text-ink"
              >
                Price low
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-full px-3.75 py-1.75 text-[13px] font-medium text-ink-4 transition-all duration-160 hover:text-ink"
              >
                Price high
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4.5">
            <Link
              to="/listing/swift"
              className="flex flex-col rounded-[20px] border border-ink/7 bg-surface p-2 text-ink no-underline shadow-[0_1px_2px_rgba(19,19,22,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_2px_4px_rgba(19,19,22,0.05),0_22px_40px_-22px_rgba(19,19,22,0.3)]"
            >
              <div className="placeholder-fill relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <span className="absolute top-[9px] left-[9px] rounded-full bg-white/86 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-2 uppercase backdrop-blur-[8px]">
                  Cars
                </span>
              </div>
              <div className="flex flex-1 flex-col px-2.5 pt-3.5 pb-2.5">
                <p className="mb-1.5 text-[21px] font-semibold tracking-[-0.035em] tabular-nums">
                  ₹4,80,000
                </p>
                <h3 className="mb-3.5 text-[14px] leading-[1.45] font-normal text-ink-3">
                  2019 Maruti Swift VXi, single owner
                </h3>
                <p className="mt-auto font-mono text-[11px] tracking-[0.04em] text-ink-5">
                  Kothrud · 2 hours ago
                </p>
              </div>
            </Link>

            <Link
              to="/listing/macbook"
              className="flex flex-col rounded-[20px] border border-ink/7 bg-surface p-2 text-ink no-underline shadow-[0_1px_2px_rgba(19,19,22,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_2px_4px_rgba(19,19,22,0.05),0_22px_40px_-22px_rgba(19,19,22,0.3)]"
            >
              <div className="placeholder-fill relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <span className="absolute top-[9px] left-[9px] rounded-full bg-white/86 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-2 uppercase backdrop-blur-[8px]">
                  Electronics
                </span>
              </div>
              <div className="flex flex-1 flex-col px-2.5 pt-3.5 pb-2.5">
                <p className="mb-1.5 text-[21px] font-semibold tracking-[-0.035em] tabular-nums">
                  ₹72,000
                </p>
                <h3 className="mb-3.5 text-[14px] leading-[1.45] font-normal text-ink-3">
                  MacBook Air M2, 16 GB, boxed
                </h3>
                <p className="mt-auto font-mono text-[11px] tracking-[0.04em] text-ink-5">
                  Baner · 5 hours ago
                </p>
              </div>
            </Link>

            <Link
              to="/listing/flat"
              className="flex flex-col rounded-[20px] border border-ink/7 bg-surface p-2 text-ink no-underline shadow-[0_1px_2px_rgba(19,19,22,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_2px_4px_rgba(19,19,22,0.05),0_22px_40px_-22px_rgba(19,19,22,0.3)]"
            >
              <div className="placeholder-fill relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <span className="absolute top-[9px] left-[9px] rounded-full bg-white/86 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-2 uppercase backdrop-blur-[8px]">
                  Rentals
                </span>
              </div>
              <div className="flex flex-1 flex-col px-2.5 pt-3.5 pb-2.5">
                <p className="mb-1.5 text-[21px] font-semibold tracking-[-0.035em] tabular-nums">
                  ₹28,000/mo
                </p>
                <h3 className="mb-3.5 text-[14px] leading-[1.45] font-normal text-ink-3">
                  2 BHK on rent, furnished, Viman Nagar
                </h3>
                <p className="mt-auto font-mono text-[11px] tracking-[0.04em] text-ink-5">
                  Viman Nagar · yesterday
                </p>
              </div>
            </Link>

            <Link
              to="/listing/frontend"
              className="flex flex-col rounded-[20px] border border-ink/7 bg-surface p-2 text-ink no-underline shadow-[0_1px_2px_rgba(19,19,22,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_2px_4px_rgba(19,19,22,0.05),0_22px_40px_-22px_rgba(19,19,22,0.3)]"
            >
              <div className="placeholder-fill relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <span className="absolute top-[9px] left-[9px] rounded-full bg-white/86 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-2 uppercase backdrop-blur-[8px]">
                  Jobs
                </span>
              </div>
              <div className="flex flex-1 flex-col px-2.5 pt-3.5 pb-2.5">
                <p className="mb-1.5 text-[21px] font-semibold tracking-[-0.035em] tabular-nums">
                  ₹9–14 LPA
                </p>
                <h3 className="mb-3.5 text-[14px] leading-[1.45] font-normal text-ink-3">
                  Front-end developer, React, 2+ years
                </h3>
                <p className="mt-auto font-mono text-[11px] tracking-[0.04em] text-ink-5">
                  Kharadi · yesterday
                </p>
              </div>
            </Link>

            <Link
              to="/listing/sofa"
              className="flex flex-col rounded-[20px] border border-ink/7 bg-surface p-2 text-ink no-underline shadow-[0_1px_2px_rgba(19,19,22,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_2px_4px_rgba(19,19,22,0.05),0_22px_40px_-22px_rgba(19,19,22,0.3)]"
            >
              <div className="placeholder-fill relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <span className="absolute top-[9px] left-[9px] rounded-full bg-white/86 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-2 uppercase backdrop-blur-[8px]">
                  Furniture
                </span>
              </div>
              <div className="flex flex-1 flex-col px-2.5 pt-3.5 pb-2.5">
                <p className="mb-1.5 text-[21px] font-semibold tracking-[-0.035em] tabular-nums">
                  ₹18,500
                </p>
                <h3 className="mb-3.5 text-[14px] leading-[1.45] font-normal text-ink-3">
                  Three-seater fabric sofa, teak frame
                </h3>
                <p className="mt-auto font-mono text-[11px] tracking-[0.04em] text-ink-5">
                  Aundh · 2 days ago
                </p>
              </div>
            </Link>

            <Link
              to="/listing/pixel"
              className="flex flex-col rounded-[20px] border border-ink/7 bg-surface p-2 text-ink no-underline shadow-[0_1px_2px_rgba(19,19,22,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_2px_4px_rgba(19,19,22,0.05),0_22px_40px_-22px_rgba(19,19,22,0.3)]"
            >
              <div className="placeholder-fill relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <span className="absolute top-[9px] left-[9px] rounded-full bg-white/86 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-2 uppercase backdrop-blur-[8px]">
                  Phones
                </span>
              </div>
              <div className="flex flex-1 flex-col px-2.5 pt-3.5 pb-2.5">
                <p className="mb-1.5 text-[21px] font-semibold tracking-[-0.035em] tabular-nums">
                  ₹31,000
                </p>
                <h3 className="mb-3.5 text-[14px] leading-[1.45] font-normal text-ink-3">
                  Google Pixel 8, 128 GB, unlocked
                </h3>
                <p className="mt-auto font-mono text-[11px] tracking-[0.04em] text-ink-5">
                  Hinjawadi · 2 days ago
                </p>
              </div>
            </Link>

            <Link
              to="/listing/royal"
              className="flex flex-col rounded-[20px] border border-ink/7 bg-surface p-2 text-ink no-underline shadow-[0_1px_2px_rgba(19,19,22,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_2px_4px_rgba(19,19,22,0.05),0_22px_40px_-22px_rgba(19,19,22,0.3)]"
            >
              <div className="placeholder-fill relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <span className="absolute top-[9px] left-[9px] rounded-full bg-white/86 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-2 uppercase backdrop-blur-[8px]">
                  Cars
                </span>
              </div>
              <div className="flex flex-1 flex-col px-2.5 pt-3.5 pb-2.5">
                <p className="mb-1.5 text-[21px] font-semibold tracking-[-0.035em] tabular-nums">
                  ₹1,35,000
                </p>
                <h3 className="mb-3.5 text-[14px] leading-[1.45] font-normal text-ink-3">
                  Royal Enfield Classic 350, 2021
                </h3>
                <p className="mt-auto font-mono text-[11px] tracking-[0.04em] text-ink-5">
                  Wakad · 3 days ago
                </p>
              </div>
            </Link>

            <Link
              to="/listing/desk"
              className="flex flex-col rounded-[20px] border border-ink/7 bg-surface p-2 text-ink no-underline shadow-[0_1px_2px_rgba(19,19,22,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_2px_4px_rgba(19,19,22,0.05),0_22px_40px_-22px_rgba(19,19,22,0.3)]"
            >
              <div className="placeholder-fill relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <span className="absolute top-[9px] left-[9px] rounded-full bg-white/86 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-2 uppercase backdrop-blur-[8px]">
                  Furniture
                </span>
              </div>
              <div className="flex flex-1 flex-col px-2.5 pt-3.5 pb-2.5">
                <p className="mb-1.5 text-[21px] font-semibold tracking-[-0.035em] tabular-nums">
                  ₹7,200
                </p>
                <h3 className="mb-3.5 text-[14px] leading-[1.45] font-normal text-ink-3">
                  Standing desk, electric, 120 × 60 cm
                </h3>
                <p className="mt-auto font-mono text-[11px] tracking-[0.04em] text-ink-5">
                  Pimple Saudagar · 4 days ago
                </p>
              </div>
            </Link>
          </div>
        </section>
      </main>

      {/* ---------------- footer ---------------- */}
      <footer className="border-t border-ink/7 bg-surface">
        <div className="mx-auto grid max-w-content grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-10 px-8 pt-11 pb-7">
          <div>
            <div className="mb-3.25 flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-[9px] bg-ink text-[13px] font-semibold text-canvas">
                K
              </span>
              <span className="text-[17px] font-semibold tracking-[-0.03em]">Kiosk</span>
            </div>
            <p className="max-w-[34ch] text-[15px] leading-[1.6] text-ink-4">
              A classifieds board for your city. Buyers and sellers talk directly.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="mb-1 font-mono text-[10px] tracking-[0.12em] text-ink-5 uppercase">
              Browse
            </p>
            <Link
              to="/search?cat=Cars"
              className="text-[15px] text-ink-2 no-underline transition-colors duration-160 hover:text-accent"
            >
              Cars
            </Link>
            <Link
              to="/search?cat=Electronics"
              className="text-[15px] text-ink-2 no-underline transition-colors duration-160 hover:text-accent"
            >
              Electronics
            </Link>
            <Link
              to="/search?cat=Rentals"
              className="text-[15px] text-ink-2 no-underline transition-colors duration-160 hover:text-accent"
            >
              Rentals
            </Link>
            <Link
              to="/search?cat=Jobs"
              className="text-[15px] text-ink-2 no-underline transition-colors duration-160 hover:text-accent"
            >
              Jobs
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="mb-1 font-mono text-[10px] tracking-[0.12em] text-ink-5 uppercase">
              Account
            </p>
            <Link
              to="/signin"
              className="text-[15px] text-ink-2 no-underline transition-colors duration-160 hover:text-accent"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="text-[15px] text-ink-2 no-underline transition-colors duration-160 hover:text-accent"
            >
              Create account
            </Link>
            <Link
              to="/dashboard"
              className="text-[15px] text-ink-2 no-underline transition-colors duration-160 hover:text-accent"
            >
              My listings
            </Link>
            <Link
              to="/post"
              className="text-[15px] text-ink-2 no-underline transition-colors duration-160 hover:text-accent"
            >
              Post a listing
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="mb-1 font-mono text-[10px] tracking-[0.12em] text-ink-5 uppercase">
              Help
            </p>
            {/* plain text in the design, not links */}
            <p className="text-[15px] text-ink-2">Safety tips</p>
            <p className="text-[15px] text-ink-2">Listing rules</p>
            <p className="text-[15px] text-ink-2">Report a listing</p>
          </div>
        </div>

        <div className="mx-auto flex max-w-content justify-between border-t border-ink/6 px-8 pt-4 pb-7 font-mono text-[12px] text-ink-5">
          <p>© 2026 Kiosk</p>
          <p>Kiosk never handles payments</p>
        </div>
      </footer>
    </div>
  );
}

export default Results;
