import { Link } from "react-router-dom";

import { FILTERS } from "../data/categories";
import { useEffect, useState } from "react";
import type { Listing } from "../types/Listing";
import { listingService } from "../services/listingService";
import { formatPrice, imageUrl, timeAgo } from "../services/helpers";

// The home screen: hero, category tiles and the newest listings.
function Browse() {

  const [ listings, setListings ] = useState<Listing[]>([])


  useEffect(()=>{

    const fetchListings = async () => {
      try {
        
        const data = await listingService.getAll();
        setListings(data);
       
      } catch (err) {
        console.log(err);
      }
    };

    fetchListings();


  }, [])


  const fresh = listings.slice(0,8);

  // how many listings are in one category, for the tiles
  const countOf = (category: string) =>
    listings.filter((item) => item.category === category).length;

  const titles = [
    { cat: "Cars", label: "Cars & bikes", glyph: "⛋" },
    { cat: "Electronics", label: "Electronics", glyph: "▭" },
    { cat: "Rentals", label: "Rentals", glyph: "⌂" },
    { cat: "Jobs", label: "Jobs", glyph: "◈" },
  ];

  return (
    <>
        {/* ---------------- hero ---------------- */}
        <section className="mx-auto max-w-content px-8 pt-14 pb-10">
          <div className="grid grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] items-end gap-12">
            <div>
              <p className="mb-4.5 inline-flex items-center gap-2 rounded-full border border-ink/8 bg-surface py-1.5 pr-3 pl-1.75 text-[13px] text-ink-3 shadow-[0_1px_2px_rgba(19,19,22,0.03)]">
                {/* the cobalt dot carries a halo ring, not a border */}
                <span className="size-1.75 rounded-full bg-accent shadow-[0_0_0_3px_rgba(59,91,255,0.18)]" />
                { listings.length } listings posted right now
              </p>

              <h1 className="mb-5 max-w-[17ch] text-[76px] leading-[0.98] font-semibold tracking-[-0.052em] text-pretty">
                Buy and sell anything nearby.
              </h1>

              <p className="mb-7.5 max-w-[50ch] text-[18px] leading-[1.6] text-ink-3">
                Post a listing in under a minute. Cars, electronics, rentals, jobs — you talk
                to the seller directly, and nothing goes through us.
              </p>

              <div className="flex gap-2.5">
                <Link
                  to="/post"
                  className="rounded-[14px] bg-ink px-6.5 py-3.5 text-[15px] font-semibold text-white no-underline shadow-[0_1px_2px_rgba(19,19,22,0.1),0_12px_24px_-12px_rgba(19,19,22,0.5)] transition-all duration-180 hover:-translate-y-px"
                >
                  Post a listing
                </Link>
                <Link
                  to="/search"
                  className="rounded-[14px] border border-ink/8 bg-surface px-6.5 py-3.5 text-[15px] font-semibold text-ink no-underline shadow-[0_1px_2px_rgba(19,19,22,0.04)] transition-all duration-180 hover:-translate-y-px"
                >
                  Browse everything
                </Link>
              </div>
            </div>

            {/* how it works */}
            <div className="rounded-[22px] border border-ink/7 bg-surface px-6.5 py-6 shadow-[0_1px_2px_rgba(19,19,22,0.04),0_20px_40px_-24px_rgba(19,19,22,0.18)]">
              <p className="mb-4 font-mono text-[11px] font-medium tracking-[0.12em] text-ink-4 uppercase">
                How Kiosk works
              </p>

              <div className="flex flex-col gap-3.5">
                <div className="flex items-start gap-3">
                  <span className="mt-px flex size-5.5 shrink-0 items-center justify-center rounded-[7px] bg-accent/10 font-mono text-[11px] text-accent">
                    1
                  </span>
                  <p className="text-[15px] leading-[1.5] text-ink-2">
                    Create an account with your phone number.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-px flex size-5.5 shrink-0 items-center justify-center rounded-[7px] bg-accent/10 font-mono text-[11px] text-accent">
                    2
                  </span>
                  <p className="text-[15px] leading-[1.5] text-ink-2">
                    Post the item with a price and a photo.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-px flex size-5.5 shrink-0 items-center justify-center rounded-[7px] bg-accent/10 font-mono text-[11px] text-accent">
                    3
                  </span>
                  <p className="text-[15px] leading-[1.5] text-ink-2">
                    Buyers call or message you directly.
                  </p>
                </div>
              </div>

              <p className="mt-4.5 border-t border-ink/7 pt-4 text-[13px] leading-[1.55] text-ink-4">
                Kiosk never handles payments. Meet in a public place and check the item
                yourself.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- category tiles ---------------- */}
        <section className="mx-auto max-w-content px-8 pb-2">
          <div className="grid grid-cols-4 gap-3.5">
            {
              titles.map((title)=>(
                <Link
                  key={title.cat}
                  to={"/search?cat=" + title.cat}
                  className="flex items-center gap-3.25 rounded-[18px] border border-ink/7 bg-surface px-4.25 py-3.75 text-ink no-underline shadow-[0_1px_2px_rgba(19,19,22,0.03)] transition-all duration-180 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(19,19,22,0.05),0_16px_30px_-18px_rgba(19,19,22,0.28)]"
                >
                  {/* Cars is the one cobalt-tinted tile */}
                  <span className="flex size-9.5 shrink-0 items-center justify-center rounded-[12px] bg-accent/9 text-[16px] text-accent">
                    {title.glyph}
                  </span>
                  <div className="min-w-0">
                    <p className="mb-0.5 text-[15px] font-semibold tracking-[-0.015em]">
                      {title.label}
                    </p>
                    <p className="font-mono text-[12px] text-ink-4">{ countOf(title.cat) } live</p>
                  </div>
                </Link>
              ))
            }

           
          </div>
        </section>

        {/* ---------------- fresh today ---------------- */}
        <section className="mx-auto max-w-content px-8 pt-10 pb-22">
          <div className="mb-5 flex items-baseline justify-between">
            <h2 className="text-[26px] font-semibold tracking-[-0.035em]">Fresh today</h2>
            <Link to="/search" className="text-[14px] font-semibold text-accent no-underline">
              See all listings
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-4.5">
            {
              fresh.map((item)=>(
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
    
    </>
  );
}

export default Browse;
