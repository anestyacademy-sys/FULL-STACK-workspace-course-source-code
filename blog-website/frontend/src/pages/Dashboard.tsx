import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useEffect, useState } from "react";
import { postService } from "../services/postService";
import Swal from "sweetalert2";
import type { Post } from "../types/Post.ts";
import { formatDate, imageUrl } from "../services/helpers";

// The signed-in view: write a new post, and manage the ones already there.
function Dashboard() {


   // the fields of the form
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [tag, setTag] = useState("");
  const [readTime, setReadTime] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [quote, setQuote] = useState("");
  const [image, setImage] = useState<File | null>(null);  

  const [ editingId, setEditingId ] = useState<string | null>(null);

  const [ posts , setPosts ] = useState<Post[]>([]);

  // put everything in a FormData because we also send the cover image
  const buildFormData = (status: "published" | "draft") => {
    const data = new FormData();

    data.append("title", title);
    data.append("slug", slug);
    data.append("tag", tag || "Notes");
    data.append("readTime", readTime || "5 min");
    data.append("excerpt", excerpt);
    data.append("body", body);
    data.append("quote", quote);
    data.append("status", status);

    if (image) {
      data.append("image", image);
    }

    return data;
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setTag("");
    setReadTime("");
    setExcerpt("");
    setBody("");
    setQuote("");
    setImage(null);
    setEditingId(null);
  };


  const handleSave = async (status: "published" | "draft") => {
    try {
      const data = buildFormData(status);

      if (editingId) {
        // we are editing an existing post
        const updated = await postService.update(editingId, data);
        setPosts((prev)=>prev.map((p)=>( p._id === editingId ? updated : p )))
      } else {
        // we are creating a new one
        const created = await postService.create(data);
        setPosts(prev=>[ created, ...prev ])
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: editingId ? "Post updated" : "Post saved",
        showConfirmButton: false,
        timer: 1500,
      });

      resetForm();
     
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Could not save the post",
        text: err.response?.data?.error || "Something went wrong",
      });
      console.log(err);
    }
  };
  

  const handleDelete = async (id: string)=>{

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
            try {
                await postService.delete(id);
                setPosts((prev)=>prev.filter(p=>p._id !== id));
            } catch (error) {
                console.log(error);
                
            }
        }
    });


  }

  const handleEdit = (post: Post)=>{
    setTitle(post.title);
    setSlug(post.slug);
    setTag(post.tag);
    setReadTime(post.readTime);
    setExcerpt(post.excerpt);
    setBody(post.body);
    setQuote(post.quote || "");
    setImage(null);
    setEditingId(post._id);

    window.scrollTo(0, 0);
  }

const publishedCount = posts.filter((p) => p.status === 'published' ).length;
const draftCount = posts.filter((p) => p.status === 'draft' ).length;


//   const user = authService.getCurrentUser();
  const navigate = useNavigate();

  useEffect(()=>{

    if(!authService.isLoggedIn()){
        navigate('/login');
        return;
    }


    const fetchPosts = async ()=>{
        try {
            const data = await postService.getMine();
            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    }

    fetchPosts();


  } , [navigate] )

  return (
  
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-65 left-1/2 h-140 w-215 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.28)_0%,rgba(11,10,26,0)_70%)]" />

          <div className="relative mx-auto max-w-content px-10 pt-19 pb-24">
            {/* ---------------- page head ---------------- */}
            <div className="mb-10">
              <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-violet-soft">
                Your desk
              </p>

              <h1 className="mb-4 font-display text-[50px] leading-[1.08] font-bold tracking-[-0.035em]">
                Write something <span className="headline-gradient">new</span>
              </h1>

              <p className="max-w-[54ch] text-[19px] leading-[1.7] text-cream/66">
                Everything you have written lives here. Drafts stay private until you
                publish them.
              </p>
            </div>

            {/* ---------------- stats ---------------- */}
            <div className="mb-12 grid grid-cols-3 gap-4">
              <div className="rounded-[18px] border border-white/8 bg-surface px-5 py-5.5">
                <p className="mb-1.5 bg-linear-to-br from-[#A78BFA] to-pink bg-clip-text font-display text-[30px] font-bold text-transparent">
                  { publishedCount }
                </p>
                <p className="text-[13px] text-cream/60">Published</p>
              </div>

              <div className="rounded-[18px] border border-white/8 bg-surface px-5 py-5.5">
                <p className="mb-1.5 bg-linear-to-br from-pink to-orange bg-clip-text font-display text-[30px] font-bold text-transparent">
                  { draftCount }
                </p>
                <p className="text-[13px] text-cream/60">Drafts</p>
              </div>

              <div className="rounded-[18px] border border-white/8 bg-surface px-5 py-5.5">
                <p className="mb-1.5 bg-linear-to-br from-violet to-[#A78BFA] bg-clip-text font-display text-[30px] font-bold text-transparent">
                  3.1k
                </p>
                <p className="text-[13px] text-cream/60">Readers a month</p>
              </div>
            </div>

            {/* ---------------- composer ---------------- */}
            <div className="mb-14 rounded-[26px] bg-[linear-gradient(140deg,rgba(124,92,255,0.6),rgba(236,72,153,0.4)_55%,rgba(255,255,255,0.06))] p-px">
              <div className="rounded-[25px] bg-surface p-9.5">
                <h2 className="mb-7 font-display text-[24px] font-semibold tracking-[-0.02em]">
                  { editingId ? "Edit Post" : "New Post" }
                </h2>

                <form className="flex flex-col gap-5" onSubmit={(e)=>{  
                    e.preventDefault();
                    handleSave('published');
                }} >
                  <label className="flex flex-col gap-2.25 text-[13px] font-semibold text-cream/80">
                    Title
                    <input
                      type="text"
                      placeholder="The state you don't need"
                      value={title}
                      onChange={(e)=>setTitle(e.target.value)}
                      className="rounded-[14px] border border-white/12 bg-field px-4 py-3.5 font-sans text-[16px] text-cream outline-none transition-colors duration-160 focus:border-violet"
                    />
                  </label>

                  <div className="grid grid-cols-3 gap-4">
                    <label className="flex flex-col gap-2.25 text-[13px] font-semibold text-cream/80">
                      Slug
                      <input
                        type="text"
                        value={slug}
                        onChange={(e)=>setSlug(e.target.value)}
                        placeholder="state-you-dont-need"
                        className="rounded-[14px] border border-white/12 bg-field px-4 py-3.5 font-sans text-[16px] text-cream outline-none transition-colors duration-160 focus:border-violet"
                      />
                    </label>

                    <label className="flex flex-col gap-2.25 text-[13px] font-semibold text-cream/80">
                      Tag
                      <input
                        type="text"
                        value={tag}
                        onChange={(e)=>setTag(e.target.value)}
                        placeholder="React"
                        className="rounded-[14px] border border-white/12 bg-field px-4 py-3.5 font-sans text-[16px] text-cream outline-none transition-colors duration-160 focus:border-violet"
                      />
                    </label>

                    <label className="flex flex-col gap-2.25 text-[13px] font-semibold text-cream/80">
                      Read time
                      <input
                        type="text"
                        value={readTime}
                        onChange={(e)=>setReadTime(e.target.value)}
                        placeholder="8 min"
                        className="rounded-[14px] border border-white/12 bg-field px-4 py-3.5 font-sans text-[16px] text-cream outline-none transition-colors duration-160 focus:border-violet"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-2.25 text-[13px] font-semibold text-cream/80">
                    Excerpt
                    <textarea
                      rows={2}
                      value={excerpt}
                      onChange={(e)=>setExcerpt(e.target.value)}
                      placeholder="One or two sentences for the card."
                      className="resize-y rounded-[14px] border border-white/12 bg-field px-4 py-3.5 font-sans text-[16px] leading-[1.6] text-cream outline-none transition-colors duration-160 focus:border-violet"
                    />
                  </label>

                  <label className="flex flex-col gap-2.25 text-[13px] font-semibold text-cream/80">
                    Body
                    <textarea
                      rows={10}
                      value={body}
                      onChange={(e)=>setBody(e.target.value)}
                      placeholder="Write the post. One paragraph per line."
                      className="resize-y rounded-[14px] border border-white/12 bg-field px-4 py-3.5 font-sans text-[16px] leading-[1.7] text-cream outline-none transition-colors duration-160 focus:border-violet"
                    />
                  </label>

                  <label className="flex flex-col gap-2.25 text-[13px] font-semibold text-cream/80">
                    Pull quote
                    <input
                      type="text"
                      value={quote}
                      onChange={(e)=>setQuote(e.target.value)}
                      placeholder="The one line people will remember."
                      className="rounded-[14px] border border-white/12 bg-field px-4 py-3.5 font-sans text-[16px] text-cream outline-none transition-colors duration-160 focus:border-violet"
                    />
                  </label>

                  {/* cover image drop area */}
                  <div className="flex flex-col gap-2.25">
                    <p className="text-[13px] font-semibold text-cream/80">Cover image</p>
                    <div className="placeholder-fill flex h-36 items-center justify-center rounded-[14px] border border-dashed border-white/12">
                      <label className="text-[12px] uppercase tracking-[0.14em] text-cream/34">
                        Drop an image, or click to browse

                        <input type="file" accept="image/*" className="hidden" onChange={(e)=>setImage(e.target.files ? e.target.files[0]! : null)}  />
                      </label>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-3.5">
                    <button
                      type="submit"
                      className="brand-gradient inline-flex cursor-pointer items-center justify-center rounded-full px-7.5 py-4 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(124,92,255,0.38)] transition-transform duration-160 hover:-translate-y-0.5"
                    >
                      { editingId ? 'Update Post': 'Publish post' }
                    </button>

                    <button
                      type="button"
                      onClick={()=>handleSave('draft')}
                      className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/12 bg-white/6 px-7.5 py-4 text-[15px] font-semibold text-cream transition-colors duration-160 hover:bg-white/11"
                    >
                      Save as draft
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* ---------------- existing posts ---------------- */}
            <div className="mb-7.5 flex items-center justify-between">
              <h2 className="font-display text-[27px] font-semibold tracking-[-0.02em]">
                Your posts
              </h2>
              <p className="text-[14px] text-cream/45">{ publishedCount } posts &middot; { draftCount } drafts</p>
            </div>

            <div className="flex flex-col gap-4">
              {
                posts.map((post)=>(
                    <div key={post._id} className="flex items-center justify-between gap-6 rounded-[20px] border border-white/8 bg-surface px-6 py-5 transition-all duration-200 hover:border-violet/50">
                        <div className="flex min-w-0 items-center gap-4">
                            
                            {
                                post.image ? (
                                    <img src={ imageUrl(post.image)! } alt="" className="size-14 shrink-0 rounded-xl border object-cover"  />
                                ): (
                                    <div className="placeholder-fill size-14 shrink-0 rounded-xl border border-white/8" />
                                )
                            }
                            <div className="min-w-0">
                                <div className="mb-1.5 flex items-center gap-2">
                                <span className="rounded-full border border-violet/30 bg-violet/16 px-2.75 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-soft">
                                    { post.tag }
                                </span>
                                <span className="rounded-full border border-violet/30 bg-violet/16 px-2.75 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-soft">
                                    { post.status }
                                </span>
                                </div>
                                <h3 className="font-display text-[18px] font-semibold tracking-[-0.015em]">
                                    { post.title }
                                </h3>
                                <p className="mt-1 text-[13px] text-cream/40">
                                   { formatDate(post.createdAt) }  &middot; { post.readTime } read &middot;
                                </p>
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                        <button
                            onClick={()=>handleEdit(post)}
                            className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[13px] font-semibold text-cream no-underline transition-colors duration-160 hover:bg-white/11"
                        >
                            Edit
                        </button>
                        <button
                            onClick={()=>handleDelete(post._id)}
                            type="button"
                            className="cursor-pointer rounded-full border border-pink/34 bg-pink/12 px-4 py-2 text-[13px] font-semibold text-[#F9A8D4] transition-colors duration-160 hover:bg-pink/20"
                        >
                            Delete
                        </button>
                        </div>
                    </div>

                ))
              }

         
            </div>
          </div>
        </section>
   
  );
}

export default Dashboard;
