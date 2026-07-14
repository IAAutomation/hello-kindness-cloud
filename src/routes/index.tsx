import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, Check, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Unlimitly By ProFlow Tools — Unlimited Lovable, Zero Credits" },
      {
        name: "description",
        content:
          "Unlimitly by ProFlow Tools is the premium extension that unlocks unlimited prompts on Lovable — no credits, no limits, just shipping.",
      },
    ],
  }),
});

const WHATSAPP_URL =
  "https://wa.me/923165852898?text=" +
  encodeURIComponent(
    "✨ Hi ProFlow Tools! 💜 I'm interested in purchasing *Unlimitly Pro* 🚀\n\nCould you please share the payment details & next steps? 💫\n\nExcited to start shipping without limits! 🔥∞"
  );

/* --- tiny primitives --- */

function Tilt({
  children,
  className = "",
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateX(${(-y * intensity).toFixed(
      2
    )}deg) rotateY(${(x * intensity * 1.2).toFixed(2)}deg) translateZ(0)`;
  };
  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(1200px) rotateX(0) rotateY(0) translateZ(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.6s cubic-bezier(.2,.7,.2,1)" }}
      className={className}
    >
      {children}
    </div>
  );
}

/* Abstract geometric mark — replaces icons */
function Glyph({
  variant,
  tint = "coral",
}: {
  variant: "orb" | "arc" | "grid" | "wave" | "prism" | "ring" | "square" | "burst";
  tint?: string;
}) {
  const bg = `bg-${tint}`;
  switch (variant) {
    case "orb":
      return (
        <div className="relative h-12 w-12">
          <div className={`absolute inset-0 rounded-full ${bg} opacity-70 blur-[6px]`} />
          <div className={`absolute inset-1.5 rounded-full ${bg}`} />
          <div className="absolute inset-3 rounded-full bg-cream/70" />
        </div>
      );
    case "arc":
      return (
        <div className="relative h-12 w-12">
          <div className={`absolute inset-0 rounded-full border-4 ${`border-${tint}`}`} />
          <div className={`absolute right-0 top-0 h-4 w-4 rounded-full ${bg}`} />
        </div>
      );
    case "grid":
      return (
        <div className="grid h-12 w-12 grid-cols-3 grid-rows-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-[3px] ${bg}`}
              style={{ opacity: 0.3 + ((i * 37) % 70) / 100 }}
            />
          ))}
        </div>
      );
    case "wave":
      return (
        <svg viewBox="0 0 48 48" className="h-12 w-12">
          <path
            d="M2 30 Q 12 10 24 30 T 46 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className={`text-${tint}`}
          />
          <circle cx="24" cy="30" r="3" className={`fill-${tint}`} />
        </svg>
      );
    case "prism":
      return (
        <div className="relative h-12 w-12">
          <div className={`absolute inset-0 rotate-45 rounded-lg ${bg} opacity-60`} />
          <div className={`absolute inset-2 -rotate-12 rounded-lg ${bg}`} />
        </div>
      );
    case "ring":
      return (
        <div className="relative h-12 w-12">
          <div className={`absolute inset-0 rounded-full border-[6px] border-${tint} opacity-40`} />
          <div className={`absolute inset-3 rounded-full ${bg}`} />
        </div>
      );
    case "square":
      return (
        <div className="relative h-12 w-12">
          <div className={`absolute left-0 top-0 h-8 w-8 rounded-xl ${bg} opacity-70`} />
          <div className={`absolute bottom-0 right-0 h-7 w-7 rounded-xl ${bg}`} />
        </div>
      );
    case "burst":
      return (
        <svg viewBox="0 0 48 48" className="h-12 w-12">
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            return (
              <line
                key={i}
                x1={24}
                y1={24}
                x2={24 + Math.cos(a) * 18}
                y2={24 + Math.sin(a) * 18}
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className={`text-${tint}`}
              />
            );
          })}
          <circle cx="24" cy="24" r="4" className={`fill-${tint}`} />
        </svg>
      );
  }
}

function MiniBars() {
  const bars = [40, 65, 30, 78, 55, 90, 72];
  return (
    <div className="flex h-16 items-end gap-1.5">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-full rounded-t-md bg-gradient-to-t from-coral/80 to-apricot"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

/* --- page --- */

function Landing() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += 47;
      if (i >= 3842) {
        i = 3842;
        clearInterval(t);
      }
      setCount(i);
    }, 20);
    return () => clearInterval(t);
  }, []);

  const tools = [
    "Landing pages",
    "Dashboards",
    "Auth flows",
    "Pricing tables",
    "Blog CMS",
    "Onboarding",
    "Dark mode",
    "Stripe checkout",
    "Emails",
    "Admin panels",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden text-espresso">
      {/* Ambient pastel gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(900px 700px at 8% 0%, #F5D0D7cc, transparent 60%), radial-gradient(900px 700px at 100% 10%, #B7D7E8cc, transparent 60%), radial-gradient(1000px 800px at 50% 55%, #D8EAD7b3, transparent 60%), radial-gradient(800px 700px at 15% 100%, #FFDCC2bf, transparent 60%), radial-gradient(700px 600px at 95% 95%, #FFF1E3cc, transparent 60%), linear-gradient(180deg, #FFF5F7, #F8FBFF)",
        }}
      />
      {/* animated floating blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-coral/25 blur-3xl animate-blob" />
        <div className="absolute right-0 top-96 h-80 w-80 rounded-full bg-lavender/40 blur-3xl animate-blob [animation-delay:-4s]" />
        <div className="absolute left-1/3 top-[70%] h-72 w-72 rounded-full bg-mint/40 blur-3xl animate-blob [animation-delay:-8s]" />
      </div>
      {/* grain dots */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.3 0.05 40 / 0.07) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* NAV */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6">
        <div className="glass flex w-full items-center justify-between rounded-full border border-espresso/10 px-3 py-2 shadow-[0_10px_30px_-15px_oklch(0.3_0.05_40/0.35)]">
          <div className="flex items-center gap-2.5 pl-2">
            <div
              className="h-7 w-7 rounded-2xl"
              style={{
                background:
                  "conic-gradient(from 130deg, #FF61D6, #B7D7E8, #D8EAD7, #FFDCC2, #FF61D6)",
              }}
            />
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-tight">
                Unlimitly
              </span>
              <span className="text-[10px] text-espresso/50">
                by ProFlow Tools
              </span>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-espresso/70 md:flex">
            <a href="#features" className="hover:text-espresso transition">Features</a>
            <a href="#how" className="hover:text-espresso transition">How it works</a>
            <a href="#showcase" className="hover:text-espresso transition">Showcase</a>
            <a href="#pricing" className="hover:text-espresso transition">Pricing</a>
            <a href="#faq" className="hover:text-espresso transition">FAQ</a>
          </nav>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get Unlimitly Pro on WhatsApp"
            className="group btn-glow inline-flex items-center gap-1.5 rounded-2xl bg-espresso px-5 py-2.5 text-sm font-bold tracking-wide text-cream shadow-lg shadow-espresso/30 transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-espresso/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-espresso/40"
          >
            Get Pro
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-6 pb-8 pt-20 md:pt-28">
        <div className="grid items-center gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-coral/25 bg-cream/70 px-3 py-1 text-xs font-medium text-espresso/80 backdrop-blur animate-rise">
              <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
              Unlimitly by ProFlow Tools · v2.0
            </span>

            <h1 className="mt-7 font-display text-[54px] leading-[1.02] md:text-[92px]">
              Prompt Lovable{" "}
              <span className="italic-serif text-gradient">without limits.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-espresso/70">
              The premium extension that unlocks{" "}
              <b className="text-espresso">unlimited prompts</b> on Lovable —
              zero credits deducted, ever. Scratch, rebuild, iterate as much as
              your heart desires.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Buy Unlimitly Pro on WhatsApp"
                className="group btn-glow relative inline-flex items-center gap-2 rounded-2xl bg-espresso px-8 py-4 text-sm font-bold uppercase tracking-wider text-cream shadow-[0_18px_45px_-12px_oklch(0.28_0.05_240/0.55)] transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_55px_-10px_oklch(0.28_0.05_240/0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-espresso/40"
              >
                <span className="text-base">💬</span>
                Buy Pro on WhatsApp
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-2xl border border-espresso/20 bg-cream/70 px-6 py-4 text-sm font-semibold text-espresso backdrop-blur transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-cream hover:border-espresso/40"
              >
                See how it works
              </a>
            </div>
            <p className="mt-4 text-xs text-espresso/50">
              One-time payment · Lifetime updates · 4,200+ happy builders
            </p>
          </div>

          {/* Hero visual — floating glass composition */}
          <div className="md:col-span-5">
            <div className="relative mx-auto h-[440px] w-full max-w-md">
              {/* soft backdrop */}
              <div className="absolute inset-6 rounded-[2.5rem] bg-gradient-to-br from-lavender/40 via-rose/30 to-mint/40 blur-2xl" />

              {/* main glass card */}
              <Tilt intensity={6} className="absolute inset-0">
                <div className="glass h-full w-full rounded-[2rem] border border-cream/60 p-6 shadow-[0_40px_80px_-30px_oklch(0.4_0.1_40/0.35)]">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-cream/70 px-3 py-1 text-[11px] text-espresso/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Live · unlimited
                    </span>
                    <Glyph variant="orb" tint="coral" />
                  </div>

                  <div className="mt-6">
                    <div className="text-[11px] uppercase tracking-widest text-espresso/50">
                      Prompts sent today
                    </div>
                    <div className="mt-1 font-display text-6xl italic-serif tabular-nums">
                      {count.toLocaleString()}
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-emerald-700">
                      <TrendingUp className="h-3 w-3" /> 0.00 credits used
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-cream/60 bg-cream/50 p-4">
                    <MiniBars />
                    <div className="mt-1 flex justify-between text-[10px] text-espresso/50">
                      <span>M</span><span>T</span><span>W</span><span>T</span>
                      <span>F</span><span>S</span><span>S</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-gradient-to-br from-apricot/70 to-rose/50 p-3">
                      <div className="text-[10px] text-espresso/60">Saved</div>
                      <div className="font-display text-2xl italic-serif">
                        $482
                      </div>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-lavender/70 to-sky/50 p-3">
                      <div className="text-[10px] text-espresso/60">Streak</div>
                      <div className="font-display text-2xl italic-serif">
                        17 d
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>

              {/* floating chips */}
              <div className="absolute -left-8 top-24 hidden animate-float md:block">
                <div className="glass rounded-2xl border border-cream/60 px-3 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Glyph variant="ring" tint="lavender" />
                    <div>
                      <div className="text-[10px] text-espresso/60">Score</div>
                      <div className="font-display text-xl italic-serif">100</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-6 bottom-16 hidden animate-float [animation-delay:-3s] md:block">
                <div className="glass rounded-2xl border border-cream/60 px-3 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Glyph variant="burst" tint="coral" />
                    <div>
                      <div className="text-[10px] text-espresso/60">ROI</div>
                      <div className="font-display text-xl italic-serif">42×</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="mt-16 border-y border-espresso/10 bg-cream/30 py-5 backdrop-blur">
        <div className="text-center text-xs uppercase tracking-widest text-espresso/50">
          Build anything on Lovable — no credit anxiety
        </div>
        <div className="mt-4 flex overflow-hidden">
          <div className="flex shrink-0 items-center gap-4 pr-4 animate-marquee">
            {[...tools, ...tools, ...tools].map((t, i) => (
              <span
                key={i}
                className="whitespace-nowrap rounded-full border border-espresso/10 bg-cream/70 px-4 py-1.5 text-sm text-espresso/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES — bento glass grid */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-espresso/50">
            Features
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">
            Quiet on the surface.{" "}
            <span className="italic-serif text-coral">Loud where it counts.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-6 md:grid-rows-2">
          {/* big feature */}
          <Tilt intensity={5} className="md:col-span-3 md:row-span-2">
            <div className="glass relative h-full overflow-hidden rounded-[2rem] border border-cream/60 p-8 shadow-xl shadow-espresso/5">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-coral/30 blur-3xl" />
              <div className="relative">
                <Glyph variant="burst" tint="coral" />
                <h3 className="mt-6 font-display text-3xl">
                  Truly <span className="italic-serif text-coral">unlimited</span>
                </h3>
                <p className="mt-3 max-w-sm text-espresso/70">
                  No throttle. No soft cap. No daily reset. Prompt at 3am on a
                  Sunday — it just works. Forever.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    { l: "Prompts", v: "∞" },
                    { l: "Credits", v: "0" },
                    { l: "Limits", v: "0" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="rounded-2xl border border-cream/60 bg-cream/60 p-3 text-center"
                    >
                      <div className="font-display text-3xl italic-serif">
                        {s.v}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-espresso/50">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tilt>

          {[
            { g: "arc", tint: "lavender", t: "Instant activation", d: "Install once. Works across every project and workspace." },
            { g: "grid", tint: "mint", t: "Private by design", d: "Runs locally. No proxies, no telemetry, no data leaves your browser." },
            { g: "wave", tint: "rose", t: "Scratch & rebuild", d: "Blow up a screen, try 12 versions before lunch. Zero cost anxiety." },
            { g: "prism", tint: "sky", t: "Feels native", d: "Matches Lovable's UI so well you'll forget you installed it." },
          ].map((f, i) => (
            <Tilt key={i} intensity={7} className="md:col-span-3 lg:col-span-3 md:[&:nth-child(2)]:col-start-4 md:[&:nth-child(2)]:col-span-3">
              <div className="glass h-full rounded-3xl border border-cream/60 p-6 shadow-md shadow-espresso/5">
                <div className="flex items-start gap-4">
                  <Glyph variant={f.g as any} tint={f.tint} />
                  <div>
                    <h3 className="text-lg font-semibold">{f.t}</h3>
                    <p className="mt-1 text-sm text-espresso/70">{f.d}</p>
                  </div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-widest text-espresso/50">
            How it works
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">
            Three tiny steps.{" "}
            <span className="italic-serif text-coral">Zero drama.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            { n: "01", t: "Grab Pro on WhatsApp", d: "Message us — we deliver the extension & activation key within minutes.", g: "orb", tint: "coral", grad: "from-apricot/70 via-rose/50 to-coral/30" },
            { n: "02", t: "Install & refresh", d: "Drop it into Chrome, Edge, Brave or Arc. Refresh your Lovable project.", g: "square", tint: "lavender", grad: "from-lavender/70 via-sky/50 to-lavender/30" },
            { n: "03", t: "Prompt like you mean it", d: "Rebuild. Nuke. Redo. The credit counter never moves. Ever.", g: "burst", tint: "mint", grad: "from-mint/70 via-butter/50 to-mint/30" },
          ].map((s) => (
            <Tilt key={s.n} intensity={7}>
              <div className={`glass relative h-full overflow-hidden rounded-3xl border border-cream/60 bg-gradient-to-br ${s.grad} p-6 shadow-lg shadow-espresso/5`}>
                <div className="flex items-center justify-between">
                  <div className="font-display text-4xl italic-serif text-espresso/40">
                    {s.n}
                  </div>
                  <Glyph variant={s.g as any} tint={s.tint} />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-espresso/70">{s.d}</p>
                <div className="mt-6 inline-flex items-center gap-1 text-xs text-espresso/60">
                  Step <ArrowRight className="h-3 w-3" /> next
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </section>

      {/* SHOWCASE — mini glass cards */}
      <section id="showcase" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-espresso/50">
            Real numbers
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">
            Builders are{" "}
            <span className="italic-serif text-coral">shipping more.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {[
            { v: "4,200+", l: "happy builders", tint: "bg-apricot/60" },
            { v: "$482", l: "saved / month avg.", tint: "bg-lavender/60" },
            { v: "42×", l: "ROI in 30 days", tint: "bg-mint/60" },
            { v: "0.00", l: "credits ever used", tint: "bg-rose/60" },
          ].map((s) => (
            <Tilt key={s.l} intensity={6}>
              <div className={`glass h-full rounded-3xl border border-cream/60 ${s.tint} p-6 shadow-md shadow-espresso/5`}>
                <div className="font-display text-5xl italic-serif">{s.v}</div>
                <p className="mt-3 text-sm text-espresso/70">{s.l}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </section>

      {/* PRICING — single Pro plan */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-espresso/50">
            Pricing
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">
            One plan.{" "}
            <span className="italic-serif text-coral">One payment.</span>{" "}
            Forever unlimited.
          </h2>
          <p className="mt-4 text-espresso/70">
            No subscriptions. No renewals. No hidden fees. Just message us on
            WhatsApp and we'll set you up in minutes.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-2xl">
          <Tilt intensity={5}>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-cream/60 p-1 shadow-[0_40px_80px_-30px_oklch(0.28_0.05_240/0.4)]"
              style={{
                background:
                  "conic-gradient(from 140deg, #FF61D6, #B7D7E8, #D8EAD7, #FFDCC2, #FF61D6)",
              }}
            >
              <div className="glass relative rounded-[calc(2.5rem-4px)] p-10 md:p-12">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-coral/30 blur-3xl" />
                <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-lavender/40 blur-3xl" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-cream/70 px-3 py-1 text-[11px] font-medium text-espresso/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                        Most loved · lifetime deal
                      </div>
                      <div className="mt-4 font-display text-4xl">
                        Unlimitly{" "}
                        <span className="italic-serif text-coral">Pro</span>
                      </div>
                      <div className="text-sm text-espresso/60">
                        by ProFlow Tools
                      </div>
                    </div>
                    <Glyph variant="burst" tint="coral" />
                  </div>

                  <div className="mt-8 flex flex-wrap items-baseline gap-3">
                    <div className="font-display text-6xl italic-serif leading-none">
                      Let's talk
                    </div>
                    <div className="rounded-full bg-coral/20 px-3 py-1 text-[11px] font-semibold text-espresso">
                      Custom pricing
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-espresso/60">
                    No fixed sticker price — message us on WhatsApp and we'll
                    tailor a one-time deal that fits you. Lifetime access ·
                    every future update free.
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                      "Truly unlimited prompts",
                      "Zero credits deducted, ever",
                      "Chrome, Edge, Arc, Brave",
                      "Every future update — free",
                      "Priority WhatsApp support",
                      "Works on every project",
                    ].map((x) => (
                      <div
                        key={x}
                        className="flex items-center gap-2 rounded-2xl border border-cream/60 bg-cream/50 px-3 py-2 text-sm"
                      >
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-coral to-rose text-cream">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {x}
                      </div>
                    ))}
                  </div>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Buy Unlimitly Pro on WhatsApp"
                    className="group btn-glow mt-10 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-espresso px-6 py-5 text-base font-bold uppercase tracking-wider text-cream shadow-[0_22px_55px_-12px_oklch(0.28_0.05_240/0.6)] transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_28px_65px_-10px_oklch(0.28_0.05_240/0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-espresso/40"
                  >
                    <span className="text-lg">💬</span>
                    Buy Pro on WhatsApp
                    <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <p className="mt-3 text-center text-xs text-espresso/50">
                    Redirects to WhatsApp +92 316 5852898 · Reply in ~15 min
                  </p>
                </div>
              </div>
            </div>
          </Tilt>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-6 py-24">
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-espresso/50">
            FAQ
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">
            Honest <span className="italic-serif text-coral">answers.</span>
          </h2>
        </div>
        <div className="glass mt-12 divide-y divide-espresso/10 rounded-3xl border border-cream/60">
          {[
            { q: "How do I buy Unlimitly Pro?", a: "Tap any 'Buy Pro on WhatsApp' button. It opens a chat with ProFlow Tools at +92 316 5852898 with a message ready to send. We reply within ~15 minutes and deliver the extension immediately." },
            { q: "Is this safe?", a: "Yes. Unlimitly runs entirely in your browser, requires no login, and never proxies your data through third-party servers." },
            { q: "Will I ever get charged credits?", a: "Nope. That's the whole point. Your credit counter stays at 0.00 no matter how much you prompt." },
            { q: "Which browsers work?", a: "Chrome, Edge, Brave and Arc today. Firefox is on the roadmap." },
            { q: "Do updates cost extra?", a: "Never. Every future release is included in the one-time price. Forever means forever." },
            { q: "What if Lovable changes their site?", a: "We patch within 24 hours. If we ever can't, you get a full refund — no questions." },
          ].map((f) => (
            <details key={f.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-base font-medium">
                {f.q}
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-coral/70 to-lavender/70 text-cream transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-espresso/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-cream/60 p-12 text-center md:p-20"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.92 0.03 85 / 0.85), oklch(0.86 0.04 230 / 0.8), oklch(0.9 0.05 160 / 0.8), oklch(0.94 0.04 95 / 0.85))",
          }}
        >
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-cream/60 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-mint/50 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl">
              Stop counting.{" "}
              <span className="italic-serif">Start shipping.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-espresso/70">
              Join 4,200+ builders who prompt Lovable without ever watching
              their credit balance drop again.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buy Unlimitly Pro on WhatsApp"
              className="group btn-glow mt-8 inline-flex items-center gap-2 rounded-2xl bg-espresso px-9 py-5 text-base font-bold uppercase tracking-wider text-cream shadow-2xl shadow-espresso/40 transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_28px_65px_-10px_oklch(0.28_0.05_240/0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-espresso/40"
            >
              <span className="text-base">💬</span>
              Buy Unlimitly Pro on WhatsApp
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-10">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-espresso/10 pt-8 text-sm text-espresso/50 md:flex-row">
          <div className="flex items-center gap-2">
            <div
              className="h-5 w-5 rounded-xl"
              style={{
                background:
                  "conic-gradient(from 130deg, oklch(0.42 0.06 220), oklch(0.6 0.06 200), oklch(0.75 0.05 160), oklch(0.88 0.03 95), oklch(0.42 0.06 220))",
              }}
            />
            <span>
              © {new Date().getFullYear()} Unlimitly · by ProFlow Tools
            </span>
          </div>
          <div className="flex gap-6">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-espresso">WhatsApp</a>
            <a href="#pricing" className="hover:text-espresso">Pricing</a>
            <a href="#faq" className="hover:text-espresso">FAQ</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
