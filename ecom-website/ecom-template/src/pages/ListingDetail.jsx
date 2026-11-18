import { Link } from "react-router-dom";

// One hardcoded listing. Every card on the site points at /listing/:id and
// they all land here — read the id from the URL once there is data to look up.
function ListingDetail() {
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
              className="rounded-full border border-ink/8 px-3.25 py-1.5 text-[13px] font-medium text-ink-3 no-underline transition-all duration-160 hover:text-ink"
            >
              All
            </Link>
            <Link
              to="/search?cat=Cars"
              className="rounded-full border border-ink/14 bg-surface px-3.25 py-1.5 text-[13px] font-medium text-ink no-underline"
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
        <section className="mx-auto max-w-content px-8 pt-6.5 pb-22">
          <Link
            to="/search"
            className="mb-5 inline-block rounded-[10px] border border-ink/7 bg-surface px-3.5 py-2 text-[13px] font-semibold text-ink-3 no-underline transition-colors duration-160 hover:text-ink"
          >
            ← Back to results
          </Link>

          <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start gap-8">
            {/* ---------------- left column ---------------- */}
            <div>
              <div className="placeholder-fill mb-7 flex aspect-[16/10] items-center justify-center rounded-[24px] border border-ink/6">
                <p className="font-mono text-[11px] tracking-[0.12em] text-ink-5 uppercase">
                  Listing photo
                </p>
              </div>

              <span className="mb-3.5 inline-block rounded-full bg-accent/10 px-3 py-1.25 font-mono text-[11px] tracking-[0.08em] text-accent uppercase">
                Cars
              </span>

              <h1 className="mb-3 text-[40px] leading-[1.06] font-semibold tracking-[-0.045em] text-pretty">
                2019 Maruti Swift VXi, single owner
              </h1>

              <p className="mb-8 font-mono text-[12px] tracking-[0.04em] text-ink-4">
                Posted 2 hours ago · Kothrud · 184 views
              </p>

              <h2 className="mb-3 text-[19px] font-semibold tracking-[-0.025em]">Description</h2>
              <p className="mb-8.5 max-w-[62ch] text-[17px] leading-[1.72] text-ink-2">
                Bought new in 2019 and driven mostly on weekends — 41,000 km on the clock, all
                servicing done at the authorised centre with records in the folder. New tyres in
                March, insurance valid until next August. Small scuff on the rear bumper that I
                have not bothered to fix, visible in the photos. Selling because I have moved to
                a company car.
              </p>

              <h2 className="mb-3.5 text-[19px] font-semibold tracking-[-0.025em]">Details</h2>
              <div className="max-w-[580px] overflow-hidden rounded-[20px] border border-ink/7 bg-surface shadow-[0_1px_2px_rgba(19,19,22,0.03)]">
                <dl className="grid grid-cols-[200px_minmax(0,1fr)]">
                  <dt className="border-b border-ink/6 px-5 py-3.25 font-mono text-[12px] tracking-[0.04em] text-ink-4">
                    Year
                  </dt>
                  <dd className="border-b border-ink/6 px-5 py-3.25 text-[15px] font-medium">
                    2019
                  </dd>

                  <dt className="border-b border-ink/6 px-5 py-3.25 font-mono text-[12px] tracking-[0.04em] text-ink-4">
                    Kilometres
                  </dt>
                  <dd className="border-b border-ink/6 px-5 py-3.25 text-[15px] font-medium">
                    41,000 km
                  </dd>

                  <dt className="border-b border-ink/6 px-5 py-3.25 font-mono text-[12px] tracking-[0.04em] text-ink-4">
                    Fuel
                  </dt>
                  <dd className="border-b border-ink/6 px-5 py-3.25 text-[15px] font-medium">
                    Petrol
                  </dd>

                  <dt className="border-b border-ink/6 px-5 py-3.25 font-mono text-[12px] tracking-[0.04em] text-ink-4">
                    Transmission
                  </dt>
                  <dd className="border-b border-ink/6 px-5 py-3.25 text-[15px] font-medium">
                    Manual
                  </dd>

                  <dt className="border-b border-ink/6 px-5 py-3.25 font-mono text-[12px] tracking-[0.04em] text-ink-4">
                    Owners
                  </dt>
                  <dd className="border-b border-ink/6 px-5 py-3.25 text-[15px] font-medium">
                    First
                  </dd>
                </dl>
              </div>
            </div>

            {/* ---------------- sticky sidebar ---------------- */}
            <aside className="sticky top-[132px] flex flex-col gap-3.5">
              <div className="rounded-[24px] border border-ink/7 bg-surface p-6 shadow-[0_1px_2px_rgba(19,19,22,0.04),0_24px_48px_-28px_rgba(19,19,22,0.24)]">
                <p className="mb-1 font-mono text-[11px] tracking-[0.12em] text-ink-4 uppercase">
                  Asking price
                </p>
                <p className="mb-5.5 text-[38px] leading-none font-semibold tracking-[-0.045em] tabular-nums">
                  ₹4,80,000
                </p>

                <div className="mb-4.5 flex items-center gap-3 border-b border-ink/7 pb-4.5">
                  <span className="flex size-10.5 shrink-0 items-center justify-center rounded-[14px] bg-sunken text-[16px] font-semibold">
                    R
                  </span>
                  <div className="min-w-0">
                    <p className="mb-0.5 text-[15px] font-semibold">Rohan Kulkarni</p>
                    <p className="font-mono text-[12px] text-ink-4">Member since 2023</p>
                  </div>
                </div>

                {/* The phone number stays hidden in this template. Clicking the
                    button should swap it for the panel kept below. */}
                <button
                  type="button"
                  className="w-full cursor-pointer rounded-[14px] border-none bg-accent px-5 py-3.5 font-sans text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(19,19,22,0.08),0_10px_22px_-12px_rgba(59,91,255,0.8)] transition-all duration-180 hover:-translate-y-px"
                >
                  Show phone number
                </button>

                {/* the revealed state, kept for when this gets wired up:
                <div className="rounded-[14px] border border-accent/20 bg-accent/7 px-4.5 py-3.25 text-center">
                  <p className="mb-0.75 font-mono text-[10px] tracking-[0.12em] text-accent-deep uppercase">
                    Seller's number
                  </p>
                  <p className="text-[21px] font-semibold tracking-[-0.02em] text-accent-deep tabular-nums">
                    +91 98765 43210
                  </p>
                </div>
                */}

                <button
                  type="button"
                  className="mt-2.25 w-full cursor-pointer rounded-[14px] border border-ink/7 bg-canvas px-5 py-3.25 font-sans text-[15px] font-semibold text-ink transition-colors duration-160 hover:bg-sunken"
                >
                  Message seller
                </button>
              </div>

              <div className="rounded-[20px] border border-ink/7 bg-surface px-5 py-4.5">
                <p className="mb-2.25 font-mono text-[11px] tracking-[0.12em] text-ink-4 uppercase">
                  Before you pay
                </p>
                <p className="text-[14px] leading-[1.65] text-ink-3">
                  Meet in a public place, check the item yourself, and never send a deposit
                  before you have seen it. Kiosk never handles payments.
                </p>
              </div>
            </aside>
          </div>

          {/* ---------------- similar listings ---------------- */}
          <div className="mt-17">
            <h2 className="mb-5 text-[24px] font-semibold tracking-[-0.035em]">
              Similar listings
            </h2>
            <div className="grid grid-cols-4 gap-4.5">
              <Link
                to="/listing/macbook"
                className="flex flex-col rounded-[20px] border border-ink/7 bg-surface p-2 text-ink no-underline shadow-[0_1px_2px_rgba(19,19,22,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_2px_4px_rgba(19,19,22,0.05),0_22px_40px_-22px_rgba(19,19,22,0.3)]"
              >
                <div className="placeholder-fill aspect-[4/3] rounded-[14px]" />
                <div className="flex flex-1 flex-col px-2.5 pt-3.5 pb-2.5">
                  <p className="mb-1.5 text-[20px] font-semibold tracking-[-0.035em] tabular-nums">
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
                <div className="placeholder-fill aspect-[4/3] rounded-[14px]" />
                <div className="flex flex-1 flex-col px-2.5 pt-3.5 pb-2.5">
                  <p className="mb-1.5 text-[20px] font-semibold tracking-[-0.035em] tabular-nums">
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
                <div className="placeholder-fill aspect-[4/3] rounded-[14px]" />
                <div className="flex flex-1 flex-col px-2.5 pt-3.5 pb-2.5">
                  <p className="mb-1.5 text-[20px] font-semibold tracking-[-0.035em] tabular-nums">
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
                <div className="placeholder-fill aspect-[4/3] rounded-[14px]" />
                <div className="flex flex-1 flex-col px-2.5 pt-3.5 pb-2.5">
                  <p className="mb-1.5 text-[20px] font-semibold tracking-[-0.035em] tabular-nums">
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

export default ListingDetail;
