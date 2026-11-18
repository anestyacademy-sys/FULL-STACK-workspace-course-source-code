import { Link } from "react-router-dom";

// Sign up. Same card treatment as sign in, four fields instead of two.
function SignUp() {
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
              className="rounded-[10px] bg-surface px-3.25 py-2 text-[14px] font-medium text-ink no-underline transition-all duration-160"
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
        <section className="flex justify-center">
          <div className="w-full max-w-[440px] px-8 pt-14 pb-26">
            <div className="mb-6.5 text-center">
              <h1 className="mb-2.5 text-[40px] leading-[1.04] font-semibold tracking-[-0.045em]">
                Create your account
              </h1>
              <p className="text-[16px] text-ink-3">Free, and takes about thirty seconds.</p>
            </div>

            <div className="rounded-[26px] border border-ink/7 bg-surface p-7.5 shadow-[0_1px_2px_rgba(19,19,22,0.04),0_30px_60px_-30px_rgba(19,19,22,0.26)]">
              <form className="flex flex-col gap-4">
                <label className="flex flex-col gap-1.75 text-[13px] font-medium text-ink-2">
                  Full name
                  <input
                    type="text"
                    placeholder="Your name"
                    className="rounded-[13px] border border-ink/8 bg-canvas px-3.75 py-3.25 font-sans text-[16px] text-ink outline-none transition-all duration-160 focus:border-accent focus:bg-surface"
                  />
                </label>

                <label className="flex flex-col gap-1.75 text-[13px] font-medium text-ink-2">
                  Email
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="rounded-[13px] border border-ink/8 bg-canvas px-3.75 py-3.25 font-sans text-[16px] text-ink outline-none transition-all duration-160 focus:border-accent focus:bg-surface"
                  />
                </label>

                <label className="flex flex-col gap-1.75 text-[13px] font-medium text-ink-2">
                  Phone
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="rounded-[13px] border border-ink/8 bg-canvas px-3.75 py-3.25 font-sans text-[16px] text-ink outline-none transition-all duration-160 focus:border-accent focus:bg-surface"
                  />
                </label>

                <label className="flex flex-col gap-1.75 text-[13px] font-medium text-ink-2">
                  Password
                  <input
                    type="password"
                    placeholder="At least 8 characters"
                    className="rounded-[13px] border border-ink/8 bg-canvas px-3.75 py-3.25 font-sans text-[16px] text-ink outline-none transition-all duration-160 focus:border-accent focus:bg-surface"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-1 cursor-pointer rounded-[14px] border-none bg-ink px-7 py-3.75 font-sans text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(19,19,22,0.1),0_12px_24px_-14px_rgba(19,19,22,0.6)] transition-all duration-180 hover:-translate-y-px"
                >
                  Create account
                </button>

                <p className="text-[13px] leading-[1.55] text-ink-4">
                  By creating an account you agree to the terms and the listing rules.
                </p>
              </form>

              <p className="mt-4.5 text-center text-[14px] text-ink-3">
                Already have an account?{" "}
                <Link to="/signin" className="font-semibold text-accent no-underline">
                  Sign in
                </Link>
              </p>
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

export default SignUp;
