import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useEffect, useState } from "react";
import type { Listing } from "../types/Listing";
import { listingService } from "../services/listingService";
import { formatPrice, imageUrl, timeAgo, yearOf } from "../services/helpers";
import Swal from "sweetalert2";
// My listings. The stats and the four rows are fixed, and the tabs are
// drawn with All selected — filtering comes later.


// the colours of the three status pills
const STATUS_STYLE: Record<string, string> = {
  Live: "bg-[rgba(23,114,69,0.08)] text-[#177245]",
  Paused: "bg-[rgba(138,90,0,0.08)] text-[#8A5A00]",
  Sold: "bg-[rgba(19,19,22,0.06)] text-ink-3",
};

const STATUS_DOT: Record<string, string> = {
  Live: "bg-[#22A45D]",
  Paused: "bg-[#D98A00]",
  Sold: "bg-ink-5",
};

function Dashboard() {
  
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const [ listings , setListings ] = useState<Listing[]>([]);
  const [ tab, setTab ] = useState('All');

  useEffect(()=>{

    if(!user){
        navigate('/signin')
        return;
    }


    const fetchMine = async ()=>{
      try {
        const data = await listingService.getMine();
        setListings(data);
      } catch (error) {
          console.log(error);
          
      }
    }

    fetchMine();

  }, [ user ])


  const rows = tab === 'All' ? listings : listings.filter(item => item.status === tab);

  const active = listings.filter((item) => item.status === "Live").length;
  const sold = listings.filter((item) => item.status === "Sold").length;
  const totalViews = listings.reduce((total, item) => total + item.views, 0);


  const handleDelete = async (id: string) =>{
    try {

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then( async (result) => {
        if (result.isConfirmed){
          await listingService.delete(id);
          window.location.reload();
        }
      });
      
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <section className="mx-auto max-w-content px-8 pt-11 pb-22">
          <div className="mb-6.5 flex items-end justify-between gap-8">
            <div className="flex items-center gap-3.75">
              <span className="flex size-13.5 shrink-0 items-center justify-center rounded-[18px] bg-ink text-[20px] font-semibold text-canvas">
                {user?.name.charAt(0).toUpperCase()}
              </span>
              <div>
                <h1 className="mb-0.75 text-[34px] leading-[1.04] font-semibold tracking-[-0.045em]">
                  { user?.name }
                </h1>
                <p className="font-mono text-[12px] tracking-[0.04em] text-ink-4">
                  Member since { user ? yearOf(user.createdAt): "" }
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
                {active}
              </p>
              <p className="font-mono text-[11px] tracking-[0.08em] text-ink-4 uppercase">
                Active listings
              </p>
            </div>

            <div className="rounded-[20px] border border-ink/7 bg-surface px-5.5 py-5 shadow-[0_1px_2px_rgba(19,19,22,0.03)]">
              <p className="mb-1 text-[32px] leading-none font-semibold tracking-[-0.045em] tabular-nums">
                {totalViews}
              </p>
              <p className="font-mono text-[11px] tracking-[0.08em] text-ink-4 uppercase">
                Total views
              </p>
            </div>

            {/* replies is the one cobalt numeral */}
            <div className="rounded-[20px] border border-ink/7 bg-surface px-5.5 py-5 shadow-[0_1px_2px_rgba(19,19,22,0.03)]">
              <p className="mb-1 text-[32px] leading-none font-semibold tracking-[-0.045em] text-accent tabular-nums">
                NaN
              </p>
              <p className="font-mono text-[11px] tracking-[0.08em] text-ink-4 uppercase">
                Replies received
              </p>
            </div>

            <div className="rounded-[20px] border border-ink/7 bg-surface px-5.5 py-5 shadow-[0_1px_2px_rgba(19,19,22,0.03)]">
              <p className="mb-1 text-[32px] leading-none font-semibold tracking-[-0.045em] tabular-nums">
                {sold}
              </p>
              <p className="font-mono text-[11px] tracking-[0.08em] text-ink-4 uppercase">
                Items sold
              </p>
            </div>
          </div>

          {/* ---------------- tabs ---------------- */}
          <div className="mb-4 inline-flex gap-1.5 rounded-full border border-ink/7 bg-surface p-1 shadow-[0_1px_2px_rgba(19,19,22,0.03)]">
            {
              ['All', 'Live', 'Sold', 'Paused'].map(item=>(
                <button
                  type="button"
                  key={item}
                  onClick={()=>setTab(item)}
                  className={
                    item === tab 
                    ? 'cursor-pointer rounded-full bg-sunken px-4 py-1.75 text-[13px] font-medium text-ink shadow-[inset_0_0_0_1px_rgba(19,19,22,0.05)]'
                    : 'cursor-pointer rounded-full  px-4 py-1.75 text-[13px] font-medium text-ink shadow-[inset_0_0_0_1px_rgba(19,19,22,0.05)]'
                  }
                >
                  { item }
                </button>
              ))
            }
            
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

           
            { 
              rows.map((item)=>(
                 <div key={item._id} className="grid grid-cols-[84px_minmax(0,1fr)_130px_100px_110px_84px] items-center gap-5 border-b border-ink/5 px-5.5 py-3.5 transition-colors duration-160 hover:bg-[#FAFAF8]">
                  {
                    item.image ? (
                      <img src={imageUrl(item.image)} className="aspect-[4/3] rounded-[11px] object-cover" alt="" />
                    ):(
                      <div className="placeholder-fill aspect-[4/3] rounded-[11px]" />
                    )
                  }

                  <div className="min-w-0">
                    <Link
                      to={ '/listing/'+item._id }
                      className="text-[15px] font-medium tracking-[-0.015em] text-ink no-underline transition-colors duration-160 hover:text-accent"
                    >
                      <p className="mb-0.75"> {item.title} </p>
                    </Link>
                    <p className="font-mono text-[11px] tracking-[0.04em] text-ink-5">
                      {item.category} · posted { timeAgo(item.createdAt) }
                    </p>
                  </div>

                  <p className="text-[17px] font-semibold tracking-[-0.03em] tabular-nums">
                    { formatPrice(item.price) }
                  </p>

                  <p className="text-[15px] text-ink-3 tabular-nums">{item.views}</p>

                  <span className={
                    "inline-flex items-center gap-1.5 justify-self-start rounded-full  px-2.75 py-1.25 text-[12px] font-medium " + STATUS_STYLE[item.status]
                  }>
                    <span className={ "size-1.5 rounded-full " + STATUS_DOT[item.status] } />
                    { item.status }
                  </span>

                  <div className="flex">
                    <button
                      type="button"
                      onClick={()=>handleDelete(item._id)}
                      className="cursor-pointer justify-self-end rounded-[10px] border border-ink/7 bg-red-600 px-1.5 py-0.75 text-[8px] font-semibold text-white transition-colors duration-160 hover:bg-sunken"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer ms-2 justify-self-end rounded-[10px] border border-ink/7 bg-canvas px-1.5 py-0.75 text-[8px] font-semibold text-ink transition-colors duration-160 hover:bg-sunken"
                    >
                      Edit
                    </button>
                  </div>
                </div>

              ))

            }

            
          </div>
    </section>
  );
}

export default Dashboard;
