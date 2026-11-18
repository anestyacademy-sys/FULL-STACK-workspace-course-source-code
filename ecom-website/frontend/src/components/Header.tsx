import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useState, type FormEvent } from "react";
import { FILTERS } from "../data/categories";

function Header (){

    const user = authService.getCurrentUser();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleSignOut = ()=>{
        authService.logout();
        navigate('/signin')
    }


    const handleSearch = (e: FormEvent)=>{
      e.preventDefault();
      navigate('/search?q=' + query)
    }

    return (
        <header className="sticky top-0 z-30 border-b border-ink/7 bg-canvas/78 backdrop-blur-[20px] backdrop-saturate-[1.4]">
                <div className="mx-auto flex max-w-content items-center gap-5 px-8 py-3.5">
                  <Link to="/" className="flex shrink-0 items-center gap-2.5 text-ink no-underline">
                    <span className="flex size-7.5 items-center justify-center rounded-[9px] bg-ink text-[14px] font-semibold text-canvas">
                      K
                    </span>
                    <span className="text-[18px] font-semibold tracking-[-0.03em]">Kiosk</span>
                  </Link>
        
                  {/* the search field is markup only — nothing is submitted yet */}
                  <form onSubmit={handleSearch} className="flex max-w-[520px] flex-1 items-center gap-2.5 rounded-[14px] border border-ink/8 bg-surface py-1.5 pr-1.5 pl-3.5 shadow-[0_1px_2px_rgba(19,19,22,0.04)]">
                    <span className="text-[14px] text-ink-5">⌕</span>
                    <input
                      type="text"
                      value={query}
                      onChange={(e)=>setQuery(e.target.value)}
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
                    {
                        user ? (
                            <button
                                onClick={handleSignOut}
                                className="rounded-[10px] px-3.25 py-2 text-[14px] font-medium text-ink-3 no-underline transition-all duration-160 hover:text-ink"
                            >
                                Sign out
                            </button>
                        ):(
                            <Link
                                to="/signin"
                                className="rounded-[10px] px-3.25 py-2 text-[14px] font-medium text-ink-3 no-underline transition-all duration-160 hover:text-ink"
                            >
                                Sign in
                            </Link>
                        )
                    }
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
                    {
                      FILTERS.map((item)=>(
                        <Link
                          key={item}
                          to={ item === 'All' ? '/search' : '/search?cat=' + item }
                          className="rounded-full border border-ink/8 px-3.25 py-1.5 text-[13px] font-medium text-ink-3 no-underline transition-all duration-160 hover:text-ink"
                        >
                          {item}
                        </Link>
                      ))
                    }
                   
                  </div>
                </div>
              </header>
    )
}

export default Header;