import { Link } from "react-router-dom";

// The post form. Cars is drawn as the selected chip and the live preview
// shows its empty-state fallbacks — nothing here reacts to typing yet.
function PostListing() {
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
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-content px-8 pt-12 pb-22">
          <div className="mb-7">
            <p className="mb-3 font-mono text-[11px] font-medium tracking-[0.14em] text-ink-4 uppercase">
              New listing
            </p>
            <h1 className="mb-2.5 text-[50px] leading-none font-semibold tracking-[-0.05em]">
              What are you selling?
            </h1>
            <p className="text-[17px] text-ink-3">
              A clear title, a real price and one honest photo get replies faster than anything
              else.
            </p>
          </div>

          <form className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-start gap-6.5">
            {/* ---------------- form card ---------------- */}
            <div className="flex flex-col gap-5.5 rounded-[26px] border border-ink/7 bg-surface p-7 shadow-[0_1px_2px_rgba(19,19,22,0.04),0_24px_48px_-30px_rgba(19,19,22,0.2)]">
              <div>
                <p className="mb-2.5 text-[13px] font-medium text-ink-2">Category</p>
                <div className="flex flex-wrap gap-1.75">
                    <button
                      type="button"
                      className="cursor-pointer rounded-full border border-accent bg-accent px-4 py-2.25 font-sans text-[13px] font-medium text-white"
                    >
                      Cars
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer rounded-full border border-ink/8 bg-canvas px-4 py-2.25 font-sans text-[13px] font-medium text-ink-2 transition-all duration-160 hover:text-ink"
                    >
                      Electronics
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer rounded-full border border-ink/8 bg-canvas px-4 py-2.25 font-sans text-[13px] font-medium text-ink-2 transition-all duration-160 hover:text-ink"
                    >
                      Rentals
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer rounded-full border border-ink/8 bg-canvas px-4 py-2.25 font-sans text-[13px] font-medium text-ink-2 transition-all duration-160 hover:text-ink"
                    >
                      Jobs
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer rounded-full border border-ink/8 bg-canvas px-4 py-2.25 font-sans text-[13px] font-medium text-ink-2 transition-all duration-160 hover:text-ink"
                    >
                      Furniture
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer rounded-full border border-ink/8 bg-canvas px-4 py-2.25 font-sans text-[13px] font-medium text-ink-2 transition-all duration-160 hover:text-ink"
                    >
                      Phones
                    </button>
                </div>
              </div>

              <label className="flex flex-col gap-1.75 text-[13px] font-medium text-ink-2">
                Title
                <input
                  type="text"
                  placeholder="e.g. 2019 Maruti Swift VXi, single owner"
                  className="rounded-[13px] border border-ink/8 bg-canvas px-3.75 py-3.25 font-sans text-[16px] text-ink outline-none transition-all duration-160 focus:border-accent focus:bg-surface"
                />
              </label>

              <div className="grid grid-cols-2 gap-3.5">
                <label className="flex flex-col gap-1.75 text-[13px] font-medium text-ink-2">
                  Price (₹)
                  <input
                    type="text"
                    placeholder="4,80,000"
                    className="rounded-[13px] border border-ink/8 bg-canvas px-3.75 py-3.25 font-sans text-[16px] text-ink outline-none transition-all duration-160 focus:border-accent focus:bg-surface"
                  />
                </label>

                <label className="flex flex-col gap-1.75 text-[13px] font-medium text-ink-2">
                  Location
                  <input
                    type="text"
                    placeholder="Kothrud, Pune"
                    className="rounded-[13px] border border-ink/8 bg-canvas px-3.75 py-3.25 font-sans text-[16px] text-ink outline-none transition-all duration-160 focus:border-accent focus:bg-surface"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.75 text-[13px] font-medium text-ink-2">
                Description
                <textarea
                  rows="6"
                  placeholder="Condition, age, what's included, why you're selling. Mention anything a buyer would notice in person."
                  className="resize-y rounded-[13px] border border-ink/8 bg-canvas px-3.75 py-3.25 font-sans text-[16px] leading-[1.6] text-ink outline-none transition-all duration-160 focus:border-accent focus:bg-surface"
                />
              </label>

              <div>
                <p className="mb-2.5 text-[13px] font-medium text-ink-2">Photos</p>
                <div className="grid grid-cols-4 gap-2.5">
                  <div className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-0.75 rounded-[16px] border border-dashed border-accent/42 bg-accent/5">
                    <span className="text-[20px] text-accent">+</span>
                    <span className="font-mono text-[10px] tracking-[0.08em] text-[#6B7FFF] uppercase">
                      Add
                    </span>
                  </div>
                  <div className="placeholder-fill aspect-square rounded-[16px]" />
                  <div className="placeholder-fill aspect-square rounded-[16px]" />
                  <div className="aspect-square rounded-[16px] border border-dashed border-ink/14" />
                </div>
              </div>

              <button
                type="submit"
                className="cursor-pointer self-start rounded-[14px] border-none bg-accent px-7.5 py-3.75 font-sans text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(19,19,22,0.08),0_14px_28px_-14px_rgba(59,91,255,0.9)] transition-all duration-180 hover:-translate-y-px"
              >
                Publish listing
              </button>
            </div>

            {/* ---------------- sticky sidebar ---------------- */}
            <div className="sticky top-[132px] flex flex-col gap-3.5">
              <div className="rounded-[24px] border border-ink/7 bg-surface p-5 shadow-[0_1px_2px_rgba(19,19,22,0.03)]">
                <p className="mb-3.5 font-mono text-[11px] tracking-[0.12em] text-ink-4 uppercase">
                  Live preview
                </p>
                {/* the same card shape as the grid, on a canvas inset */}
                <div className="rounded-[18px] border border-ink/6 bg-canvas p-2">
                  <div className="placeholder-fill aspect-[4/3] rounded-[13px]" />
                  <div className="px-2.5 pt-3.25 pb-2">
                    <p className="mb-1.5 text-[21px] font-semibold tracking-[-0.035em] tabular-nums">
                      ₹ —
                    </p>
                    <h3 className="mb-3 text-[14px] leading-[1.45] font-normal text-ink-3">
                      Your title appears here
                    </h3>
                    <p className="font-mono text-[11px] tracking-[0.04em] text-ink-5">
                      Your area · just now
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[22px] border border-accent/16 bg-accent/5 px-5.5 py-5">
                <p className="mb-3 text-[15px] font-semibold tracking-[-0.02em]">
                  Listings that sell fast
                </p>
                <p className="mb-2 text-[14px] leading-[1.6] text-ink-2">
                  Name the exact model and year in the title.
                </p>
                <p className="mb-2 text-[14px] leading-[1.6] text-ink-2">
                  Photograph the item where it is, in daylight.
                </p>
                <p className="text-[14px] leading-[1.6] text-ink-2">
                  Say what is wrong with it. Buyers trust that.
                </p>
              </div>
            </div>
          </form>

          {/* The success state replaces everything above once a listing is
              published. Kept here so the markup is not lost:

          <div className="mx-auto max-w-[520px] pt-7.5 pb-15 text-center">
            <span className="mb-5.5 inline-flex size-14 items-center justify-center rounded-[18px] bg-accent text-[24px] text-white shadow-[0_1px_2px_rgba(19,19,22,0.1),0_16px_32px_-16px_rgba(59,91,255,0.9)]">
              ✓
            </span>
            <h1 className="mb-3 text-[34px] leading-[1.06] font-semibold tracking-[-0.045em]">
              Your listing is live
            </h1>
            <p className="mb-7 text-[17px] leading-[1.65] text-ink-3">
              It will appear in search within a few minutes. You can edit or pause it any time
              from My listings.
            </p>
            <div className="flex justify-center gap-2.5">
              <Link to="/dashboard" className="rounded-[14px] bg-ink px-6.5 py-3.5 text-[15px] font-semibold text-white no-underline shadow-[0_1px_2px_rgba(19,19,22,0.1),0_12px_24px_-14px_rgba(19,19,22,0.6)]">
                Go to my listings
              </Link>
              <button type="button" className="cursor-pointer rounded-[14px] border border-ink/8 bg-surface px-6.5 py-3.5 text-[15px] font-semibold text-ink transition-colors duration-160 hover:bg-sunken">
                Post another
              </button>
            </div>
          </div>
          */}
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

export default PostListing;
