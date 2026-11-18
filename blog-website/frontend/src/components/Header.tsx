import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";


function Header(){
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleSignOut = ()=>{
        authService.logout();
        navigate('/')
    }
    
    return (
        <header className="sticky top-0 z-30 border-b border-white/7 bg-ink/82 backdrop-blur-[14px]">
        <div className="mx-auto flex max-w-content items-center justify-between gap-7 px-10 py-4">
          <Link to="/" className="flex items-center gap-2.75 text-cream no-underline">
            <span className="brand-gradient flex size-8 items-center justify-center rounded-[10px] font-display text-[15px] font-bold text-white shadow-[0_6px_20px_rgba(124,92,255,0.45)]">
              F
            </span>
            <span className="font-display text-[18px] font-semibold tracking-[-0.01em]">
              fieldnotes
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className="rounded-full px-4 py-2.25 text-[14px] font-medium text-cream/60 no-underline transition-all duration-160 hover:text-cream"
            >
              Home
            </Link>
            <Link
              to="/articles"
              className="rounded-full px-4 py-2.25 text-[14px] font-medium text-cream/60 no-underline transition-all duration-160 hover:text-cream"
            >
              Articles
            </Link>
            {/* About is the active pill on this page */}
            <Link
              to="/about"
              className="rounded-full bg-white/7 px-4 py-2.25 text-[14px] font-medium text-cream no-underline transition-all duration-160"
            >
              About
            </Link>
            <Link
              to={ user ? '/dashboard': '/login' }
              className="brand-gradient ml-2 rounded-full px-5.5 py-2.75 text-[14px] font-semibold whitespace-nowrap text-white no-underline shadow-[0_8px_24px_rgba(124,92,255,0.4)] transition-transform duration-160 hover:-translate-y-0.5"
            >
              { user ? "dashboard": "login" }
            </Link>

            {
                user && (
                    <>
                        <span className="ml-3 flex items-center gap-2.5" >
                            <span className="brand-gradient flex size-8 items-center justify-center rounded-full font-display text-[13px] font-semibold text-white" >
                                { user?.name.charAt(0).toUpperCase() }
                            </span>

                            <span className="text-[14px] font-medium" >{user?.name}</span>
                        </span>

                        <button onClick={handleSignOut} className="ml-1 cursor-pointer rounded-full border border-white/12 bg-white/6 px-4 py-2.25 text-[14px] font-semibold whitespace-nowrap text-cream transition-colors duration-160 hover:bg-white/11" >
                            Sign out
                        </button>
                    
                    </>
                )
            }

          </nav>
        </div>
      </header>
    )

}


export default Header;