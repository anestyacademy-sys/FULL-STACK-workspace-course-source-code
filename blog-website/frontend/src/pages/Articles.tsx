import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Post } from "../types/Post";
import { postService } from "../services/postService";
import { formatDate, imageUrl } from "../services/helpers";

function Articles() {

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

  return (
  
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-70 left-1/2 h-140 w-205 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.26)_0%,rgba(11,10,26,0)_70%)]" />

          <div className="relative mx-auto max-w-content px-10 pt-19 pb-24">
            <div className="mb-12 text-center">
              <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-violet-soft">
                The archive
              </p>

              <h1 className="mx-auto mb-4 max-w-[20ch] font-display text-[54px] leading-[1.08] font-bold tracking-[-0.035em]">
                Everything I&rsquo;ve <span className="headline-gradient">written</span>
              </h1>

              <p className="text-[16px] text-cream/55"> { posts.length } posts, oldest at the bottom</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
             
               {
                    posts.map((post)=>(
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
          </div>
        </section>
     
  );
}

export default Articles;
