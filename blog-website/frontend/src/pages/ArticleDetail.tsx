import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Post } from "../types/Post";
import { postService } from "../services/postService";
import { formatDate, imageUrl } from "../services/helpers";

// One hardcoded article. Every card in the site points at /articles/:slug,
// and this page is what they all land on — swap the text below by hand.
function ArticleDetail() {

    const { slug } = useParams<{ slug: string }>();

    const [ post , setPost ] = useState<Post>();

    useEffect(()=>{

        const fetchPost = async ()=>{


            try {
                
                const data = await postService.getBySlug(slug!);
                setPost(data);

            } catch (error) {
                console.log(error);
                
            }
        }

        fetchPost();

    }, [slug])


  return (
   
       <div>

            {
                post && (
                     <article className="relative overflow-hidden">
                        <div className="pointer-events-none absolute -top-75 left-1/2 h-150 w-225 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.2)_0%,rgba(124,92,255,0.14)_40%,rgba(11,10,26,0)_72%)]" />

                        {/* ---------------- article header ---------------- */}
                        <div className="relative mx-auto max-w-200 px-10 pt-11 text-center">
                            <Link
                            to="/articles"
                            className="mb-7.5 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-semibold text-cream/75 no-underline transition-colors duration-160 hover:bg-white/10"
                            >
                            &larr; All articles
                            </Link>

                            <div className="mb-5.5 flex justify-center gap-2">
                            <span className="brand-gradient inline-flex items-center rounded-full px-3 py-1.25 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                                { post?.tag }
                            </span>
                            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/6 px-3 py-1.25 text-[11px] font-semibold text-cream/70">
                                { post?.readTime } read
                            </span>
                            </div>

                            <h1 className="mb-5 font-display text-[48px] leading-[1.1] font-bold tracking-[-0.035em] text-pretty">
                            { post?.title }
                            </h1>

                            <p className="mb-8 text-[19px] leading-[1.7] text-cream/64">
                            { post?.excerpt }
                            </p>

                            <p className="pb-10 text-[13px] text-cream/50"> { formatDate(post.createdAt) } </p>
                        </div>

                        {/* ---------------- hero image ---------------- */}
                        <div className="relative mx-auto max-w-250 px-10">
                            {
                                post.image ? (

                                    <img src={ imageUrl(post.image)! } className="aspect-21/9 w-full rounded-2xl border border-white/8 object-cover"  alt="" />
                                ) : (
                                    <div className="placeholder-fill flex aspect-21/9 items-center justify-center rounded-[22px] border border-white/8">
                                        <p className="text-[12px] uppercase tracking-[0.14em] text-cream/30">
                                            Hero image
                                        </p>
                                    </div>
                                )
                            }
                        </div>

                        {/* ---------------- body ---------------- */}
                        <div className="relative mx-auto max-w-180 px-10 pt-13">
                            {/* lede */}
                            <p className="mb-6.5 text-[20px] leading-[1.8] text-cream/92">
                                { post.body }
                            </p>

                          

                            {/* pull quote */}
                            {
                                post.quote && (
                                    <div className="my-10 rounded-[20px] border border-violet/30 bg-[linear-gradient(135deg,rgba(124,92,255,0.16),rgba(236,72,153,0.12))] px-7.5 py-7">
                                        <p className="font-display text-[23px] leading-[1.45] font-medium tracking-[-0.015em]">
                                            { post.quote }
                                        </p>
                                    </div>
                                )
                            }

                          
                        </div>

                        {/* ---------------- read next ---------------- */}
                        <div className="relative mx-auto max-w-content px-10 pt-18 pb-24">
                            <h2 className="mb-6 font-display text-[24px] font-semibold tracking-[-0.02em]">
                            Read next
                            </h2>

                            <div className="grid grid-cols-2 gap-6">
                            <Link
                                to="/articles/learning-in-public"
                                className="block rounded-[20px] border border-white/8 bg-surface p-6 text-cream no-underline transition-all duration-200 hover:-translate-y-1 hover:border-violet/50"
                            >
                                <span className="mb-3 inline-block rounded-full border border-violet/30 bg-violet/16 px-2.75 py-1.25 text-[10px] font-bold uppercase tracking-widest text-violet-soft">
                                Habits
                                </span>
                                <h3 className="mb-2.25 font-display text-[21px] leading-[1.28] font-semibold tracking-[-0.02em]">
                                Learning in public, quietly
                                </h3>
                                <p className="text-[15px] leading-[1.6] text-cream/60">
                                Sharing work early is supposed to be terrifying. Mostly it is just slow,
                                and that turns out to be the useful part.
                                </p>
                            </Link>

                            <Link
                                to="/articles/reading-error-messages"
                                className="block rounded-[20px] border border-white/8 bg-surface p-6 text-cream no-underline transition-all duration-200 hover:-translate-y-1 hover:border-violet/50"
                            >
                                <span className="mb-3 inline-block rounded-full border border-violet/30 bg-violet/16 px-2.75 py-1.25 text-[10px] font-bold uppercase tracking-widest text-violet-soft">
                                Debugging
                                </span>
                                <h3 className="mb-2.25 font-display text-[21px] leading-[1.28] font-semibold tracking-[-0.02em]">
                                How to actually read an error message
                                </h3>
                                <p className="text-[15px] leading-[1.6] text-cream/60">
                                The stack trace is not punishment. It is the most specific documentation
                                you will ever get about your own code.
                                </p>
                            </Link>
                            </div>
                        </div>
                    </article>
                )
            }

       </div>
     
  );
}

export default ArticleDetail;
