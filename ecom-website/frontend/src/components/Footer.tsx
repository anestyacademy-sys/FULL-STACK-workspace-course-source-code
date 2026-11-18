import { Link } from "react-router-dom";

function Footer (){
    return (
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
    )
}

export default Footer;