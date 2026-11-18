import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Post } from "../types/Post";
import { postService } from "../services/postService";
import { formatDate, imageUrl } from "../services/helpers";

function Home() {

  const [ posts, setPosts ] = useState<Post[]>([]);


  useEffect(()=>{

    const fetchPosts = async ()=>{

        try {
            
            const data = await postService.getAll();
            setPosts(data);

        } catch (error) {
            console.log(error);
            
        }
    }

    fetchPosts();

  }, [])

  const featured = posts[0];
  const others = posts.slice(1, 4);


  return (
    <>
        {/* ---------------- hero ---------------- */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-65 left-1/2 h-155 w-225 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.34)_0%,rgba(236,72,153,0.16)_42%,rgba(11,10,26,0)_72%)]" />

          <div className="relative mx-auto max-w-content px-10 pt-23 pb-16 text-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1.75 pr-4 pl-2 text-[13px] text-cream/80">
              <span className="brand-gradient rounded-full px-2.5 py-0.75 text-[11px] font-bold uppercase tracking-[0.06em] text-white">
                New
              </span>
              A personal blog about learning to build
            </div>

            <h1 className="mx-auto mt-7 mb-6 max-w-[18ch] font-display text-[68px] leading-[1.06] font-bold tracking-[-0.035em] text-pretty">
              Notes on building things{" "}
              <span className="bg-[linear-gradient(100deg,#A78BFA,#EC4899_55%,#FB923C)] bg-clip-text text-transparent">
                slowly
              </span>
            </h1>

            <p className="mx-auto mb-9 max-w-[58ch] text-[19px] leading-[1.7] text-cream/66">
              I write about learning in public &mdash; mostly code, sometimes the quieter
              parts of making software. New posts land most weeks, and none of them are
              finished.
            </p>

            <div className="flex justify-center gap-3.5">
              <Link
                to="/articles"
                className="brand-gradient inline-flex items-center justify-center rounded-full px-7.5 py-3.75 text-[15px] font-semibold text-white no-underline shadow-[0_12px_34px_rgba(124,92,255,0.42)] transition-transform duration-160 hover:-translate-y-0.5"
              >
                Start reading &rarr;
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-7.5 py-3.75 text-[15px] font-semibold text-cream no-underline transition-colors duration-160 hover:bg-white/11"
              >
                Who writes this
              </Link>
            </div>
          </div>

       
        </section>

        {/* ---------------- featured post ---------------- */}
        
        {
            featured && (
                <section className="mx-auto max-w-content px-10 pt-19 pb-5">
                <Link
                    to={`/articles/${featured.slug}`}
                    className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-center gap-10 rounded-3xl border border-white/8 bg-surface p-6.5 text-cream no-underline transition-all duration-200 hover:border-violet/50 hover:shadow-[0_20px_50px_rgba(124,92,255,0.18)]"
                >
                    {
                        featured.image ? (

                            <img src={ imageUrl(featured.image)! } className="aspect-16/10 w-full rounded-2xl border object-cover" alt="" />
                        ) : (
                            <div className="placeholder-fill flex aspect-16/10 items-end rounded-2xl border border-white/8 p-4">
                                <p className="text-[11px] uppercase tracking-[0.14em] text-cream/34">
                                    Cover image
                                </p>
                            </div>
                        )
                    }

                    <div className="pr-3.5">
                    <div className="mb-4 flex gap-2">
                        <span className="brand-gradient inline-flex items-center rounded-full px-3 py-1.25 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                        Latest
                        </span>
                        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/6 px-3 py-1.25 text-[11px] font-semibold uppercase tracking-[0.06em] text-cream/70">
                            { featured.tag }
                        </span>
                    </div>

                    <h2 className="mb-3.5 font-display text-[36px] leading-[1.16] font-semibold tracking-tight text-pretty">
                        { featured.title }
                    </h2>

                    <p className="mb-5.5 text-[17px] leading-[1.65] text-cream/64">
                        { featured.excerpt }
                    </p>

                    <p className="text-[14px] text-cream/45"> { formatDate(featured.createdAt) } &middot; { featured.readTime } read</p>
                    </div>
                </Link>
                </section>
            )
        }

        {/* ---------------- more from the blog ---------------- */}
        

        {
            others.length > 0 && (
                <section className="mx-auto max-w-content px-10 pt-11 pb-23">
                    <div className="mb-7.5 flex items-center justify-between">
                        <h2 className="font-display text-[27px] font-semibold tracking-[-0.02em]">
                        More from the blog
                        </h2>
                        <Link
                        to="/articles"
                        className="text-[14px] font-semibold text-violet-soft no-underline transition-colors duration-160 hover:text-[#F0ABFC]"
                        >
                        See all articles &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        {/* card 1 */}
                        {
                            others.map((post)=>(
                                <Link
                                    key={post._id}
                                    to={`/articles/${post.slug}`}
                                    className="flex flex-col overflow-hidden rounded-[20px] border border-white/8 bg-surface text-cream no-underline transition-all duration-200 hover:-translate-y-1.25 hover:border-pink/45 hover:shadow-[0_18px_44px_rgba(236,72,153,0.16)]"
                                >
                                    {
                                        post.image ? (
                                            <img src={ imageUrl(post.image)! } className="aspect-video w-full border-b object-cover"  alt="" />
                                        ): (
                                            <div className="aspect-video border-b border-white/7 bg-[linear-gradient(140deg,#221B45,#35203F)]" />
                                        )
                                    }

                                    <div className="px-5.5 pt-5 pb-6">
                                        <span className="mb-3.25 inline-block rounded-full border border-violet/30 bg-violet/16 px-2.75 py-1.25 text-[10px] font-bold uppercase tracking-widest text-violet-soft">
                                            { post.tag }
                                        </span>
                                        <h3 className="mb-2.5 font-display text-[20px] leading-[1.3] font-semibold tracking-[-0.015em]">
                                            { post.title }
                                        </h3>
                                        <p className="mb-4.5 text-[14px] leading-[1.62] text-cream/60">
                                            { post.excerpt }
                                        </p>
                                        <p className="text-[12px] text-cream/40">{ formatDate(post.createdAt) } &middot;  { post.readTime } </p>
                                    </div>
                                </Link>
                            ))
                        }

                     
                    </div>
                    </section>
            )
        }

    </>
    
    
  );
}

export default Home;
