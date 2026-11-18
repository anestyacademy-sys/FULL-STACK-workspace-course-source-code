import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { authService } from "../services/authService";
import { useEffect, useState } from "react";
import { CATEGORIES } from "../data/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { listingService } from "../services/listingService";
import { formatPrice } from "../services/helpers";

const postSchema = z.object({
  title: z.string().min(5, "title must contain at least 5 characters"),
  price: z.string().min(1, "price is required").regex(/^[0-9]+$/, "price must be digits only"),
  place: z.string().min(2, "location is required"),
  description: z.string().min(10, "description must contain at least 10 characters"),
});

type PostForm = z.infer<typeof postSchema>;

// The post form. Cars is drawn as the selected chip and the live preview
// shows its empty-state fallbacks — nothing here reacts to typing yet.
function PostListing() {

  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const [category, setCategory] = useState('Cars');
  const [ image, setImage ] = useState<File | null>(null);
  const [ posted, setPosted ] = useState(false);


  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostForm>({ resolver: zodResolver(postSchema) });
 

   // the live preview reads the fields while you type
  const previewTitle = watch("title");
  const previewPrice = watch("price");
  const previewPlace = watch("place");
  

   const onSubmit = async (data: PostForm) => {
    try {
      const body = new FormData();

      body.append("title", data.title);
      body.append("price", data.price);
      body.append("place", data.place);
      body.append("description", data.description);
      body.append("category", category);

      if (image) {
        body.append("image", image);
      }

      await listingService.create(body);

      setPosted(true);
      window.scrollTo(0, 0);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Could not publish the listing",
        text: err.response?.data?.error || "Something went wrong",
      });
      console.log(err);
    }
  };


  const postAnother = ()=>{
    reset();
    setImage(null);
    setCategory('Cars');
    setPosted(false);
  }


  useEffect(()=>{

    if(!user){
      navigate('/signin')
    }

  }, [user])

  return (
    <section className="mx-auto max-w-content px-8 pt-12 pb-22">
      {
        posted ? (
           <div className="mx-auto max-w-[520px] pt-7.5 pb-15 text-center">
              <span className="mb-5.5 inline-flex size-14 items-center justify-center rounded-[18px] bg-accent text-[24px] text-white shadow-[0_1px_2px_rgba(19,19,22,0.1),0_16px_32px_-16px_rgba(59,91,255,0.9)]">
                ✓
              </span>
              <h1 className="mb-3 text-[34px] leading-[1.06] font-semibold tracking-[-0.045em]">
                Your listing is live
              </h1>
              <p className="mb-7 text-[17px] leading-[1.65] text-ink-3">
                It will appear in search within a few minutes. You can edit or pause it any
                time from My listings.
              </p>
              <div className="flex justify-center gap-2.5">
                <Link
                  to="/dashboard"
                  className="rounded-[14px] bg-ink px-6.5 py-3.5 text-[15px] font-semibold text-white no-underline shadow-[0_1px_2px_rgba(19,19,22,0.1),0_12px_24px_-14px_rgba(19,19,22,0.6)]"
                >
                  Go to my listings
                </Link>
                <button
                  type="button"
                  onClick={postAnother}
                  className="cursor-pointer rounded-[14px] border border-ink/8 bg-surface px-6.5 py-3.5 text-[15px] font-semibold text-ink transition-colors duration-160 hover:bg-sunken"
                >
                  Post another
                </button>
              </div>
            </div>
        ) : (
        <div>
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

          <form className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-start gap-6.5" onSubmit={handleSubmit(onSubmit)} >
            {/* ---------------- form card ---------------- */}
            <div className="flex flex-col gap-5.5 rounded-[26px] border border-ink/7 bg-surface p-7 shadow-[0_1px_2px_rgba(19,19,22,0.04),0_24px_48px_-30px_rgba(19,19,22,0.2)]">
              <div>
                <p className="mb-2.5 text-[13px] font-medium text-ink-2">Category</p>
                <div className="flex flex-wrap gap-1.75">
                    {
                      CATEGORIES.map((item)=>(
                        <button
                          key={item}
                          type="button"
                          onClick={()=>setCategory(item)}
                          className={
                            item === category 
                              ? "cursor-pointer rounded-full border border-accent bg-accent px-4 py-2.25 font-sans text-[13px] font-medium text-white" 
                              : "cursor-pointer rounded-full border border-ink/8 bg-canvas px-4 py-2.25 font-sans text-[13px] font-medium text-ink" 
                          }
                        >
                          {item}
                        </button>
                      ))
                    }
                    
                   
                </div>
              </div>

              <label className="flex flex-col gap-1.75 text-[13px] font-medium text-ink-2">
                Title
                <input
                  type="text"
                  placeholder="e.g. 2019 Maruti Swift VXi, single owner"
                  {...register('title')}
                  className="rounded-[13px] border border-ink/8 bg-canvas px-3.75 py-3.25 font-sans text-[16px] text-ink outline-none transition-all duration-160 focus:border-accent focus:bg-surface"
                />
                {errors.title && (
                      <span className="text-[13px] text-[#C2410C]">{errors.title.message}</span>
                )}
              </label>

              <div className="grid grid-cols-2 gap-3.5">
                <label className="flex flex-col gap-1.75 text-[13px] font-medium text-ink-2">
                  Price (₹)
                  <input
                    type="text"
                    placeholder="4,80,000"
                    {...register('price')}
                    className="rounded-[13px] border border-ink/8 bg-canvas px-3.75 py-3.25 font-sans text-[16px] text-ink outline-none transition-all duration-160 focus:border-accent focus:bg-surface"
                  />
                  {errors.price && (
                      <span className="text-[13px] text-[#C2410C]">{errors.price.message}</span>
                  )}
                </label>

                <label className="flex flex-col gap-1.75 text-[13px] font-medium text-ink-2">
                  Location
                  <input
                    type="text"
                    placeholder="Kothrud, Pune"
                    {...register('place')}
                    className="rounded-[13px] border border-ink/8 bg-canvas px-3.75 py-3.25 font-sans text-[16px] text-ink outline-none transition-all duration-160 focus:border-accent focus:bg-surface"
                  />
                  {errors.place && (
                      <span className="text-[13px] text-[#C2410C]">{errors.place.message}</span>
                    )}
                </label>
              </div>

              <label className="flex flex-col gap-1.75 text-[13px] font-medium text-ink-2">
                Description
                <textarea
                  rows={6}
                  {...register('description')}
                  placeholder="Condition, age, what's included, why you're selling. Mention anything a buyer would notice in person."
                  className="resize-y rounded-[13px] border border-ink/8 bg-canvas px-3.75 py-3.25 font-sans text-[16px] leading-[1.6] text-ink outline-none transition-all duration-160 focus:border-accent focus:bg-surface"
                />
                {errors.description && (
                      <span className="text-[13px] text-[#C2410C]">{errors.description.message}</span>
                    )}
              </label>

              <div>
                <p className="mb-2.5 text-[13px] font-medium text-ink-2">Photos</p>
                <div className="grid grid-cols-4 gap-2.5">
                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-0.75 rounded-[16px] border border-dashed border-accent/42 bg-accent/5">
                    <span className="text-[20px] text-accent">+</span>
                    <span className="font-mono text-[10px] tracking-[0.08em] text-[#6B7FFF] uppercase">
                      Add
                    </span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e)=>setImage(e.target.files ? e.target.files[0]: null)} />
                  </label>
                  
                  {
                    image ? (
                      <img src={ URL.createObjectURL(image) } alt="" className="aspect-square rounded-2xl object-cover" />
                    ): (
                      <div className="placeholder-fill aspect-square rounded-[16px]" />
                    )
                  }

                
                </div>
              </div>

              <button
                type="submit"
                className="cursor-pointer self-start rounded-[14px] border-none bg-accent px-7.5 py-3.75 font-sans text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(19,19,22,0.08),0_14px_28px_-14px_rgba(59,91,255,0.9)] transition-all duration-180 hover:-translate-y-px"
              >
                { isSubmitting ? 'loading ...' : 'Publish listing' }
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
                
                   {
                    image ? (
                      <img src={ URL.createObjectURL(image) } alt="" className="aspect-[4/3] rounded-2xl object-cover" />
                    ): (
                      <div className="placeholder-fill aspect-[4/3] rounded-[16px]" />
                    )
                  }
                  <div className="px-2.5 pt-3.25 pb-2">
                    <p className="mb-1.5 text-[21px] font-semibold tracking-[-0.035em] tabular-nums">
                      { previewPrice ? formatPrice( Number(previewPrice )) : '$-' }
                    </p>
                    <h3 className="mb-3 text-[14px] leading-[1.45] font-normal text-ink-3">
                      { previewTitle || 'Your title appears here' }
                    </h3>
                    <p className="font-mono text-[11px] tracking-[0.04em] text-ink-5">
                      { previewPlace ||  ' Your area' } · just now
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
          </div>
        )
      }


         

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
  );
}

export default PostListing;
