import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Listing } from "../types/Listing";
import { listingService } from "../services/listingService";
import { formatPrice, imageUrl, timeAgo } from "../services/helpers";

// The results grid. Every listing is written out here — a real build would
// filter this list by the ?cat= query parameter instead.
function Results() {

  const [searchParams] = useSearchParams();

  const cat = searchParams.get("cat") || "All";
  const q = searchParams.get("q") || "";


  const [sort, setSort] = useState("newest");
  const [listings, setListings] = useState<Listing[]>([]);


  useEffect(() => {
    const fetchListings = async () => {
      try {
  
        const data = await listingService.getAll({ cat, q, sort });
        setListings(data);
  
      } catch (err) {
     
        console.log(err);
      }
    };

    fetchListings();
  }, [cat, q, sort]);


   const sorts = [
    { key: "newest", label: "Newest" },
    { key: "price_asc", label: "Price low" },
    { key: "price_desc", label: "Price high" },
  ];
  return (
    <section className="mx-auto max-w-content px-8 pt-10 pb-22">
          <div className="mb-6 flex items-end justify-between gap-8">
            <div>
              <p className="mb-3 font-mono text-[11px] font-medium tracking-[0.14em] text-ink-4 uppercase">
                {cat}
              </p>
              <h1 className="mb-2 text-[46px] leading-[1.02] font-semibold tracking-[-0.045em]">
                { cat === 'All' ? "Everything on kiosk" : cat + " for sale" }
              </h1>
              <p className="text-[15px] text-ink-3">{listings.length} listings · within 25 km of Pune</p>
            </div>

            {/* segmented control — Newest is drawn as the active pill */}
            <div className="flex items-center gap-1.5 rounded-full border border-ink/7 bg-surface p-1 shadow-[0_1px_2px_rgba(19,19,22,0.03)]">
              {
                sorts.map((item)=>(
                  <button
                    key={item.key}
                    onClick={()=>setSort(item.key)}
                    type="button"
                    className={
                      item.key === sort 
                        ? 'cursor-pointer rounded-full bg-sunken px-3.75 py-1.75 text-[13px] font-medium text-ink shadow-[inset_0_0_0_1px_rgba(19,19,22,0.05)]'
                        : 'cursor-pointer rounded-full px-3.75 py-1.75 text-[13px] font-medium text-ink-4 transition-all duration-160 hover:text-ink'
                    }
                  >
                    {item.label}
                  </button>
                ))
              }
             
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4.5">
            
              {
                listings.map((item)=>(
                  <Link
                    key={item._id}
                    to={"/listing/" + item._id}
                    className="flex flex-col rounded-[20px] border border-ink/7 bg-surface p-2 text-ink no-underline shadow-[0_1px_2px_rgba(19,19,22,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_2px_4px_rgba(19,19,22,0.05),0_22px_40px_-22px_rgba(19,19,22,0.3)]"
                  >
                    <div className=" relative aspect-[4/3] overflow-hidden rounded-[14px]">
  
                      {
                        item.image ? (
                          <img src={imageUrl(item.image)} alt="" className="size-full object-cover"  />
                        ):(
                          <div className="placeholder-fill size-full" />
                        )
                      }
                      <span className="absolute top-[9px] left-[9px] rounded-full bg-white/86 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-2 uppercase backdrop-blur-[8px]">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col px-2.5 pt-3.5 pb-2.5">
                      <p className="mb-1.5 text-[21px] font-semibold tracking-[-0.035em] tabular-nums">
                        { formatPrice(item.price) }
                      </p>
                      <h3 className="mb-3.5 text-[14px] leading-[1.45] font-normal text-ink-3">
                        {item.title}
                      </h3>
                      <p className="mt-auto font-mono text-[11px] tracking-[0.04em] text-ink-5">
                        {item.place} · {timeAgo(item.createdAt)}
                      </p>
                    </div>
                  </Link>
  
                ))
              }

          </div>
        </section>
  );
}

export default Results;
