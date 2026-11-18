import { Link } from "react-router-dom";

// My listings. The stats and the four rows are fixed, and the tabs are
// drawn with All selected — filtering comes later.
function Dashboard() {
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
              className="rounded-[10px] bg-surface px-3.25 py-2 text-[14px] font-medium text-ink no-underline transition-all duration-160"
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
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-content px-8 pt-11 pb-22">
          <div className="mb-6.5 flex items-end justify-between gap-8">
            <div className="flex items-center gap-3.75">
              <span className="flex size-13.5 shrink-0 items-center justify-center rounded-[18px] bg-ink text-[20px] font-semibold text-canvas">
                R
              </span>
              <div>
                <h1 className="mb-0.75 text-[34px] leading-[1.04] font-semibold tracking-[-0.045em]">
                  Rohan Kulkarni
                </h1>
                <p className="font-mono text-[12px] tracking-[0.04em] text-ink-4">
                  Member since 2023 · Pune
                </p>
              </div>
            </div>

            <Link
              to="/post"
              className="rounded-[12px] bg-accent px-5 py-3 text-[14px] font-semibold text-white no-underline shadow-[0_1px_2px_rgba(19,19,22,0.08),0_10px_22px_-12px_rgba(59,91,255,0.8)] transition-all duration-180 hover:-translate-y-px"
            >
              Post a listing
            </Link>
          </div>

          {/* ---------------- stats ---------------- */}
          <div className="mb-7.5 grid grid-cols-4 gap-3.5">
            <div className="rounded-[20px] border border-ink/7 bg-surface px-5.5 py-5 shadow-[0_1px_2px_rgba(19,19,22,0.03)]">
              <p className="mb-1 text-[32px] leading-none font-semibold tracking-[-0.045em] tabular-nums">
                4
              </p>
              <p className="font-mono text-[11px] tracking-[0.08em] text-ink-4 uppercase">
                Active listings
              </p>
            </div>

            <div className="rounded-[20px] border border-ink/7 bg-surface px-5.5 py-5 shadow-[0_1px_2px_rgba(19,19,22,0.03)]">
              <p className="mb-1 text-[32px] leading-none font-semibold tracking-[-0.045em] tabular-nums">
                691
              </p>
              <p className="font-mono text-[11px] tracking-[0.08em] text-ink-4 uppercase">
                Total views
              </p>
            </div>

            {/* replies is the one cobalt numeral */}
            <div className="rounded-[20px] border border-ink/7 bg-surface px-5.5 py-5 shadow-[0_1px_2px_rgba(19,19,22,0.03)]">
              <p className="mb-1 text-[32px] leading-none font-semibold tracking-[-0.045em] text-accent tabular-nums">
                12
              </p>
              <p className="font-mono text-[11px] tracking-[0.08em] text-ink-4 uppercase">
                Replies received
              </p>
            </div>

            <div className="rounded-[20px] border border-ink/7 bg-surface px-5.5 py-5 shadow-[0_1px_2px_rgba(19,19,22,0.03)]">
              <p className="mb-1 text-[32px] leading-none font-semibold tracking-[-0.045em] tabular-nums">
                2
              </p>
              <p className="font-mono text-[11px] tracking-[0.08em] text-ink-4 uppercase">
                Items sold
              </p>
            </div>
          </div>

          {/* ---------------- tabs ---------------- */}
          <div className="mb-4 inline-flex gap-1.5 rounded-full border border-ink/7 bg-surface p-1 shadow-[0_1px_2px_rgba(19,19,22,0.03)]">
            <button
              type="button"
              className="cursor-pointer rounded-full bg-sunken px-4 py-1.75 text-[13px] font-medium text-ink shadow-[inset_0_0_0_1px_rgba(19,19,22,0.05)]"
            >
              All
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-full px-4 py-1.75 text-[13px] font-medium text-ink-4 transition-all duration-160 hover:text-ink"
            >
              Live
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-full px-4 py-1.75 text-[13px] font-medium text-ink-4 transition-all duration-160 hover:text-ink"
            >
              Sold
            </button>
          </div>

          {/* ---------------- table ---------------- */}
          <div className="overflow-hidden rounded-[24px] border border-ink/7 bg-surface shadow-[0_1px_2px_rgba(19,19,22,0.03),0_24px_48px_-32px_rgba(19,19,22,0.18)]">
            <div className="grid grid-cols-[84px_minmax(0,1fr)_130px_100px_110px_84px] items-center gap-5 border-b border-ink/7 px-5.5 py-3.25 font-mono text-[10px] tracking-[0.1em] text-ink-4 uppercase">
              <p>Photo</p>
              <p>Listing</p>
              <p>Price</p>
              <p>Views</p>
              <p>Status</p>
              <p className="text-right">Action</p>
            </div>

            <div className="grid grid-cols-[84px_minmax(0,1fr)_130px_100px_110px_84px] items-center gap-5 border-b border-ink/5 px-5.5 py-3.5 transition-colors duration-160 hover:bg-[#FAFAF8]">
              <div className="placeholder-fill aspect-[4/3] rounded-[11px]" />

              <div className="min-w-0">
                <Link
                  to="/listing/swift"
                  className="text-[15px] font-medium tracking-[-0.015em] text-ink no-underline transition-colors duration-160 hover:text-accent"
                >
                  <p className="mb-0.75">2019 Maruti Swift VXi, single owner</p>
                </Link>
                <p className="font-mono text-[11px] tracking-[0.04em] text-ink-5">
                  Cars · posted 2 hours ago
                </p>
              </div>

              <p className="text-[17px] font-semibold tracking-[-0.03em] tabular-nums">
                ₹4,80,000
              </p>

              <p className="text-[15px] text-ink-3 tabular-nums">184</p>

              <span className="inline-flex items-center gap-1.5 justify-self-start rounded-full bg-[rgba(23,114,69,0.08)] px-2.75 py-1.25 text-[12px] font-medium text-[#177245]">
                <span className="size-1.5 rounded-full bg-[#22A45D]" />
                Live
              </span>

              <button
                type="button"
                className="cursor-pointer justify-self-end rounded-[10px] border border-ink/7 bg-canvas px-3.5 py-1.75 text-[13px] font-semibold text-ink transition-colors duration-160 hover:bg-sunken"
              >
                Edit
              </button>
            </div>

            <div className="grid grid-cols-[84px_minmax(0,1fr)_130px_100px_110px_84px] items-center gap-5 border-b border-ink/5 px-5.5 py-3.5 transition-colors duration-160 hover:bg-[#FAFAF8]">
              <div className="placeholder-fill aspect-[4/3] rounded-[11px]" />

              <div className="min-w-0">
                <Link
                  to="/listing/desk"
                  className="text-[15px] font-medium tracking-[-0.015em] text-ink no-underline transition-colors duration-160 hover:text-accent"
                >
                  <p className="mb-0.75">Standing desk, electric, 120 × 60 cm</p>
                </Link>
                <p className="font-mono text-[11px] tracking-[0.04em] text-ink-5">
                  Furniture · posted 4 days ago
                </p>
              </div>

              <p className="text-[17px] font-semibold tracking-[-0.03em] tabular-nums">
                ₹7,200
              </p>

              <p className="text-[15px] text-ink-3 tabular-nums">96</p>

              <span className="inline-flex items-center gap-1.5 justify-self-start rounded-full bg-[rgba(23,114,69,0.08)] px-2.75 py-1.25 text-[12px] font-medium text-[#177245]">
                <span className="size-1.5 rounded-full bg-[#22A45D]" />
                Live
              </span>

              <button
                type="button"
                className="cursor-pointer justify-self-end rounded-[10px] border border-ink/7 bg-canvas px-3.5 py-1.75 text-[13px] font-semibold text-ink transition-colors duration-160 hover:bg-sunken"
              >
                Edit
              </button>
            </div>

            <div className="grid grid-cols-[84px_minmax(0,1fr)_130px_100px_110px_84px] items-center gap-5 border-b border-ink/5 px-5.5 py-3.5 transition-colors duration-160 hover:bg-[#FAFAF8]">
              <div className="placeholder-fill aspect-[4/3] rounded-[11px]" />

              <div className="min-w-0">
                <Link
                  to="/listing/pixel"
                  className="text-[15px] font-medium tracking-[-0.015em] text-ink no-underline transition-colors duration-160 hover:text-accent"
                >
                  <p className="mb-0.75">Google Pixel 8, 128 GB, unlocked</p>
                </Link>
                <p className="font-mono text-[11px] tracking-[0.04em] text-ink-5">
                  Phones · posted 2 days ago
                </p>
              </div>

              <p className="text-[17px] font-semibold tracking-[-0.03em] tabular-nums">
                ₹31,000
              </p>

              <p className="text-[15px] text-ink-3 tabular-nums">268</p>

              <span className="inline-flex items-center gap-1.5 justify-self-start rounded-full bg-[rgba(138,90,0,0.08)] px-2.75 py-1.25 text-[12px] font-medium text-[#8A5A00]">
                <span className="size-1.5 rounded-full bg-[#D98A00]" />
                Paused
              </span>

              <button
                type="button"
                className="cursor-pointer justify-self-end rounded-[10px] border border-ink/7 bg-canvas px-3.5 py-1.75 text-[13px] font-semibold text-ink transition-colors duration-160 hover:bg-sunken"
              >
                Edit
              </button>
            </div>

            <div className="grid grid-cols-[84px_minmax(0,1fr)_130px_100px_110px_84px] items-center gap-5 border-b border-ink/5 px-5.5 py-3.5 transition-colors duration-160 hover:bg-[#FAFAF8]">
              <div className="placeholder-fill aspect-[4/3] rounded-[11px]" />

              <div className="min-w-0">
                <Link
                  to="/listing/sofa"
                  className="text-[15px] font-medium tracking-[-0.015em] text-ink no-underline transition-colors duration-160 hover:text-accent"
                >
                  <p className="mb-0.75">Three-seater fabric sofa, teak frame</p>
                </Link>
                <p className="font-mono text-[11px] tracking-[0.04em] text-ink-5">
                  Furniture · posted 2 days ago
                </p>
              </div>

              <p className="text-[17px] font-semibold tracking-[-0.03em] tabular-nums">
                ₹18,500
              </p>

              <p className="text-[15px] text-ink-3 tabular-nums">143</p>

              <span className="inline-flex items-center gap-1.5 justify-self-start rounded-full bg-[rgba(19,19,22,0.06)] px-2.75 py-1.25 text-[12px] font-medium text-ink-3">
                <span className="size-1.5 rounded-full bg-ink-5" />
                Sold
              </span>

              <button
                type="button"
                className="cursor-pointer justify-self-end rounded-[10px] border border-ink/7 bg-canvas px-3.5 py-1.75 text-[13px] font-semibold text-ink transition-colors duration-160 hover:bg-sunken"
              >
                Edit
              </button>
            </div>
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

export default Dashboard;
