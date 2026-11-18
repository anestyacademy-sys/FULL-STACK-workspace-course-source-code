import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Listing } from "../types/Listing";
import { listingService } from "../services/listingService";
import { formatPrice, imageUrl, timeAgo, yearOf } from "../services/helpers";

// One hardcoded listing. Every card on the site points at /listing/:id and
// they all land here — read the id from the URL once there is data to look up.
function ListingDetail() {

  const {id} = useParams<{id: string}>();
  const [listing, setListing] = useState<Listing | null>(null)
  const [ similar, setSimilar ] = useState<Listing[]>([]);

  const [showPhone, setShowPhone] = useState(false);

  useEffect(()=>{

    const fetchListing = async () => {
      try {
  
        setShowPhone(false);

        const data = await listingService.getById(id!);
        setListing(data);

        // "similar" is simply the first four other listings
        const all = await listingService.getAll();
        setSimilar(all.filter((item) => item._id !== id).slice(0, 4));

      } catch (err) {
        console.log(err);
      }
    };

    fetchListing();
  }, [id]);


  return (
    <>
    {
    listing && (

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
              {
                listing.image ? (
                  <img src={imageUrl(listing.image)} className="mb-7 aspect-[16/10] w-full border border-ink/6 object-cover rounded-2xl" alt={listing.title} />
                ): (
                  <div className="placeholder-fill mb-7 flex aspect-[16/10] items-center justify-center rounded-[24px] border border-ink/6">
                    <p className="font-mono text-[11px] tracking-[0.12em] text-ink-5 uppercase">
                      Listing photo
                    </p>
                  </div>
                )
              }

              <span className="mb-3.5 inline-block rounded-full bg-accent/10 px-3 py-1.25 font-mono text-[11px] tracking-[0.08em] text-accent uppercase">
                {listing.category}
              </span>

              <h1 className="mb-3 text-[40px] leading-[1.06] font-semibold tracking-[-0.045em] text-pretty">
                { listing.title }
              </h1>

              <p className="mb-8 font-mono text-[12px] tracking-[0.04em] text-ink-4">
                Posted {timeAgo(listing.createdAt)} · {listing.place} · {listing.views} views
              </p>

              <h2 className="mb-3 text-[19px] font-semibold tracking-[-0.025em]">Description</h2>
              <p className="mb-8.5 max-w-[62ch] text-[17px] leading-[1.72] text-ink-2">
                { listing.description }
              </p>

              <h2 className="mb-3.5 text-[19px] font-semibold tracking-[-0.025em]">Details</h2>
              <div className="max-w-[580px] overflow-hidden rounded-[20px] border border-ink/7 bg-surface shadow-[0_1px_2px_rgba(19,19,22,0.03)]">
                <dl className="grid grid-cols-[200px_minmax(0,1fr)]">
                  <dt className="border-b border-ink/6 px-5 py-3.25 font-mono text-[12px] tracking-[0.04em] text-ink-4">
                    Category
                  </dt>
                  <dd className="border-b border-ink/6 px-5 py-3.25 text-[15px] font-medium">
                    {listing.category}
                  </dd>

                  <dt className="border-b border-ink/6 px-5 py-3.25 font-mono text-[12px] tracking-[0.04em] text-ink-4">
                    Location
                  </dt>
                  <dd className="border-b border-ink/6 px-5 py-3.25 text-[15px] font-medium">
                    {listing.place}
                  </dd>

                  <dt className="border-b border-ink/6 px-5 py-3.25 font-mono text-[12px] tracking-[0.04em] text-ink-4">
                    Posted
                  </dt>
                  <dd className="border-b border-ink/6 px-5 py-3.25 text-[15px] font-medium">
                    { timeAgo(listing.createdAt) }
                  </dd>

                  <dt className="border-b border-ink/6 px-5 py-3.25 font-mono text-[12px] tracking-[0.04em] text-ink-4">
                    Views
                  </dt>
                  <dd className="border-b border-ink/6 px-5 py-3.25 text-[15px] font-medium">
                    {listing.views}
                  </dd>

                  <dt className="border-b border-ink/6 px-5 py-3.25 font-mono text-[12px] tracking-[0.04em] text-ink-4">
                    Status
                  </dt>
                  <dd className="border-b border-ink/6 px-5 py-3.25 text-[15px] font-medium">
                    {listing.status}
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
                  {formatPrice(listing.price)}
                </p>

                <div className="mb-4.5 flex items-center gap-3 border-b border-ink/7 pb-4.5">
                  <span className="flex size-10.5 shrink-0 items-center justify-center rounded-[14px] bg-sunken text-[16px] font-semibold">
                    { listing.userId.name.charAt(0).toUpperCase() }
                  </span>
                  <div className="min-w-0">
                    <p className="mb-0.5 text-[15px] font-semibold"> { listing.userId.name } </p>
                    <p className="font-mono text-[12px] text-ink-4">Member since { yearOf(listing.userId.createdAt) }</p>
                  </div>
                </div>

                {/* The phone number stays hidden in this template. Clicking the
                    button should swap it for the panel kept below. */}

                {
                  showPhone ? (
                    <div className="rounded-[14px] border border-accent/20 bg-accent/7 px-4.5 py-3.25 text-center">
                      <p className="mb-0.75 font-mono text-[10px] tracking-[0.12em] text-accent-deep uppercase">
                        Seller's number
                      </p>
                      <p className="text-[21px] font-semibold tracking-[-0.02em] text-accent-deep tabular-nums">
                        { listing.userId.phone }
                      </p>
                    </div>
                  ): (
                    <button
                      type="button"
                      onClick={()=>setShowPhone(true)}
                      className="w-full cursor-pointer rounded-[14px] border-none bg-accent px-5 py-3.5 font-sans text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(19,19,22,0.08),0_10px_22px_-12px_rgba(59,91,255,0.8)] transition-all duration-180 hover:-translate-y-px"
                    >
                      Show phone number
                    </button>
                    
                  )
                }

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
              
            {
              similar.map((item)=>(
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
          </div>
    </section>
    )
   }
    </>
  );
}

export default ListingDetail;
