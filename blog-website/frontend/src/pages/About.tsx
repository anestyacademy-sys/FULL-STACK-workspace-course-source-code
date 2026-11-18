
function About() {
  return (

        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-65 -right-30 h-135 w-190 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.22)_0%,rgba(11,10,26,0)_70%)]" />

          <div className="relative mx-auto max-w-content px-10 pt-19 pb-24">
            <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] items-start gap-16">
              {/* portrait, inside a 1px gradient border */}
              <div className="rounded-[26px] bg-[linear-gradient(140deg,rgba(124,92,255,0.8),rgba(236,72,153,0.5)_55%,rgba(251,146,60,0.35))] p-px">
                <div className="overflow-hidden rounded-[25px] bg-surface">
                  <div className="flex aspect-4/5 items-center justify-center bg-[linear-gradient(150deg,#241C4A,#3A1B3D)]">
                    <p className="text-[12px] uppercase tracking-[0.16em] text-cream/34">
                      Portrait
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-violet-soft">
                  About
                </p>

                <h1 className="mb-6.5 font-display text-[50px] leading-[1.08] font-bold tracking-[-0.035em]">
                  Hello, I&rsquo;m <span className="headline-gradient">Mira</span>
                </h1>

                <p className="mb-5.5 text-[19px] leading-[1.78] text-cream/80">
                  I&rsquo;m a front-end developer in Pune. I spend my days on design
                  systems and my evenings rebuilding things I already understand, which is
                  how I learn anything at all.
                </p>

                <p className="mb-10 text-[19px] leading-[1.78] text-cream/80">
                  This blog is where those evenings end up: half-finished experiments,
                  notes on the tools I use, and the occasional thing that actually worked.
                </p>

                {/* Placeholder figures — swap for real numbers or delete the row. */}
                <div className="mb-10 grid grid-cols-3 gap-4">
                  <div className="rounded-[18px] border border-white/8 bg-surface px-5 py-5.5">
                    <p className="mb-1.5 bg-linear-to-br from-[#A78BFA] to-pink bg-clip-text font-display text-[30px] font-bold text-transparent">
                      7
                    </p>
                    <p className="text-[13px] text-cream/60">Years writing</p>
                  </div>

                  <div className="rounded-[18px] border border-white/8 bg-surface px-5 py-5.5">
                    <p className="mb-1.5 bg-linear-to-br from-pink to-orange bg-clip-text font-display text-[30px] font-bold text-transparent">
                      142
                    </p>
                    <p className="text-[13px] text-cream/60">Posts published</p>
                  </div>

                  <div className="rounded-[18px] border border-white/8 bg-surface px-5 py-5.5">
                    <p className="mb-1.5 bg-linear-to-br from-violet to-[#A78BFA] bg-clip-text font-display text-[30px] font-bold text-transparent">
                      3.1k
                    </p>
                    <p className="text-[13px] text-cream/60">Readers a month</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2.25 text-[13px] font-medium text-cream/82">
                    React
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2.25 text-[13px] font-medium text-cream/82">
                    Design systems
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2.25 text-[13px] font-medium text-cream/82">
                    CSS
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2.25 text-[13px] font-medium text-cream/82">
                    Teaching
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      
  );
}

export default About;
