import { useEffect, useRef, useState } from "react";
import {
  exchange,
  constat,
  gains,
  mockup,
  steps,
  profile,
  plans,
  faq,
  type Plan,
} from "@/data/pitch-data";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLieu, withLieu } from "@/hooks/useLieu";
import TvMockup from "./TvMockup";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { whatsappLink } from "@/lib/whatsapp";
import abdoPortrait from "@/assets/abdo-portrait.webp";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
} as const;

function useIsDesktop() {
  const query = "(min-width: 768px)";
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

function Eyebrow({ children, dark }: { children: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-6 font-['Rubik'] text-sm font-medium uppercase tracking-[0.2em] text-orange">
      <span className="h-px w-10 bg-orange" />
      <span className={dark ? "text-orange" : ""}>{children}</span>
    </div>
  );
}

function Check() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-1 h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

/** Two cards : ce que j'apporte × ce que vous apportez — they slide together as you scroll */
function Exchange() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const move = !reduce && isDesktop;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const leftX = useTransform(scrollYProgress, [0, 1], [move ? -120 : 0, 0]);
  const rightX = useTransform(scrollYProgress, [0, 1], [move ? 120 : 0, 0]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [move ? -180 : 0, 0]);
  const badgeScale = useTransform(scrollYProgress, [0.5, 1], [move ? 0 : 1, 1]);

  return (
    <section id="echange" ref={ref} className="w-full max-w-7xl mx-auto px-8 md:px-12 py-16 md:py-24 overflow-x-clip">
      <motion.div {...reveal}>
        <Eyebrow>{exchange.heading}</Eyebrow>
      </motion.div>
      <div className="relative grid gap-6 md:grid-cols-2">
        <motion.article
          style={{ x: leftX }}
          {...(move ? {} : reveal)}
          className="rounded-[2rem] bg-foreground p-8 md:p-10 text-background"
        >
          <p className="font-['Rubik'] text-sm uppercase tracking-widest text-orange">
            {exchange.give.tag}
          </p>
          <h3 className="mt-3 font-['Rubik'] text-3xl md:text-4xl font-bold leading-tight tracking-tight">
            {exchange.give.title}
          </h3>
          <ul className="mt-8 space-y-4 text-base md:text-lg leading-snug">
            {exchange.give.items.map((item) => {
              const [label, ...rest] = item.split(" : ");
              return (
                <li key={item} className="flex gap-3">
                  <span className="text-orange">
                    <Check />
                  </span>
                  <span>
                    {rest.length ? (
                      <>
                        <strong className="font-medium">{label}</strong> : {rest.join(" : ")}
                      </>
                    ) : (
                      item
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.article>

        <motion.article
          style={{ x: rightX }}
          {...(move ? {} : reveal)}
          className="rounded-[2rem] border-2 border-orange p-8 md:p-10 bg-background/40 backdrop-blur-sm md:self-start"
        >
          <p className="font-['Rubik'] text-sm uppercase tracking-widest text-orange">
            {exchange.take.tag}
          </p>
          <h3 className="mt-3 font-['Rubik'] text-3xl md:text-4xl font-bold leading-tight tracking-tight text-foreground">
            {exchange.take.title}
          </h3>
          <ul className="mt-8 space-y-4 text-base md:text-lg leading-snug text-foreground">
            {exchange.take.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-orange">
                  <Check />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.article>

        {/* × badge between the two cards */}
        <motion.div
          aria-hidden="true"
          style={{ rotate: badgeRotate, scale: badgeScale, x: "-50%", y: "-50%" }}
          className="absolute left-1/2 top-1/2 z-10 hidden h-16 w-16 items-center justify-center rounded-full bg-orange font-['Fraunces'] text-4xl italic text-on-orange shadow-xl md:flex"
        >
          ×
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Le constat : dark full-bleed band.
 * Desktop: the section pins and the three points scroll horizontally (GSAP ScrollTrigger).
 * Mobile / reduced motion: simple vertical stack.
 */
function Constat({ lieu }: { lieu: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current!;
        const distance = () => track.scrollWidth - window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to(track, { x: () => -distance(), ease: "none" }, 0);
        tl.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);

        // Big numerals drift a little faster than their panel for depth
        gsap.utils.toArray<HTMLElement>(".constat-num").forEach((num) => {
          gsap.fromTo(
            num,
            { xPercent: 40 },
            {
              xPercent: -20,
              ease: "none",
              scrollTrigger: {
                trigger: num.closest("article"),
                containerAnimation: tl,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="constat"
      ref={sectionRef}
      className="relative w-full bg-foreground text-background overflow-hidden md:h-screen"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-orange opacity-20 blur-3xl" />

      <div
        ref={trackRef}
        className="relative flex flex-col md:h-full md:w-max md:flex-row md:items-center"
      >
        {/* Intro panel */}
        <div className="px-8 md:px-12 pt-20 md:pt-0 md:w-[60vw] md:shrink-0 md:pl-[max(3rem,calc((100vw-80rem)/2+3rem))]">
          <motion.div {...reveal}>
            <Eyebrow dark>{constat.heading}</Eyebrow>
            <h2 className="max-w-3xl font-['Rubik'] text-3xl md:text-6xl font-bold leading-[1.05] tracking-tighter">
              {constat.title}
            </h2>
            <p className="mt-8 hidden md:flex items-center gap-3 font-['Rubik'] text-sm uppercase tracking-[0.2em] text-background/50">
              Continuez à défiler <span aria-hidden="true">→</span>
            </p>
          </motion.div>
        </div>

        {constat.items.map((item, i) => (
          <motion.article
            key={item.n}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="relative px-8 md:px-12 py-10 md:py-0 border-t border-background/15 md:border-t-0 md:border-l md:w-[42vw] md:max-w-[640px] md:shrink-0 last:pb-20 md:last:pb-0 md:last:mr-[8vw]"
          >
            <div className="constat-num font-['Fraunces'] italic text-7xl md:text-[10rem] text-orange leading-none">
              {item.n}
            </div>
            <h3 className="mt-6 font-['Rubik'] text-2xl md:text-3xl font-medium leading-snug">
              {item.title}
            </h3>
            <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed text-background/70">
              {item.text.map((p) => (
                <p key={p}>{withLieu(p, lieu)}</p>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      {/* Horizontal progress */}
      <div className="absolute inset-x-0 bottom-0 hidden h-1 bg-background/10 md:block">
        <div ref={barRef} className="h-full origin-left scale-x-0 bg-orange" />
      </div>
    </section>
  );
}

/** Ce que vous gagnez : 2x2 bento, columns drift at different speeds */
function Gains() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const move = !reduce && isDesktop;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const colA = useTransform(scrollYProgress, [0, 1], move ? [40, -40] : [0, 0]);
  const colB = useTransform(scrollYProgress, [0, 1], move ? [140, -60] : [0, 0]);

  const columns = [gains.items.filter((_, i) => i % 2 === 0), gains.items.filter((_, i) => i % 2 === 1)];

  return (
    <section id="gains" ref={ref} className="w-full max-w-7xl mx-auto px-8 md:px-12 py-20 md:py-32">
      <motion.div {...reveal}>
        <Eyebrow>{gains.heading}</Eyebrow>
        <h2 className="max-w-3xl font-['Rubik'] text-3xl md:text-6xl font-bold leading-[1.05] tracking-tighter text-foreground">
          {gains.title}
        </h2>
      </motion.div>

      <div className="mt-12 md:mt-16 grid gap-5 md:grid-cols-2">
        {columns.map((col, c) => (
          <motion.div key={c} style={{ y: c === 0 ? colA : colB }} className="space-y-5">
            {col.map((item) => (
              <motion.article
                key={item.tag}
                {...reveal}
                whileHover={{ y: -4 }}
                className="group rounded-3xl border border-foreground/15 bg-background/60 p-8 backdrop-blur-sm transition-colors hover:border-orange"
              >
                <span className="inline-block rounded-full bg-orange px-3 py-1 font-['Rubik'] text-xs font-medium uppercase tracking-widest text-on-orange">
                  {item.tag}
                </span>
                <h3 className="mt-6 font-['Rubik'] text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/75">{item.text}</p>
              </motion.article>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/** L'aperçu : a TV showing slideable salon designs */
function Mockup({ lieu }: { lieu: string }) {
  return (
    <section id="apercu" className="w-full max-w-7xl mx-auto px-8 md:px-12 pb-20 md:pb-28">
      <motion.div {...reveal}>
        <Eyebrow>{mockup.heading}</Eyebrow>
        <h2 className="max-w-3xl font-['Rubik'] text-3xl md:text-5xl font-bold leading-[1.05] tracking-tighter text-foreground">
          {mockup.title}
        </h2>
      </motion.div>

      <TvMockup lieu={lieu} />

      <p className="mt-6 text-center text-sm text-foreground/60">{mockup.note}</p>
    </section>
  );
}

/** Comment ça marche : vertical timeline whose line fills with the scroll */
function Steps() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });

  return (
    <section id="etapes" className="w-full bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-20 md:py-28 grid gap-12 md:grid-cols-[1fr_1.3fr]">
        <motion.div {...reveal} className="md:sticky md:top-28 md:self-start">
          <Eyebrow dark>{steps.heading}</Eyebrow>
          <h2 className="font-['Rubik'] text-3xl md:text-5xl font-bold leading-[1.05] tracking-tighter">
            {steps.title}
          </h2>
        </motion.div>

        <ol ref={listRef} className="relative pl-8 md:pl-12 space-y-14">
          <span aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-background/20" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: scrollYProgress }}
            className="absolute left-0 top-0 h-full w-0.5 -translate-x-1/4 origin-top bg-orange"
          />
          {steps.items.map((item, i) => (
            <motion.li
              key={item.n}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <span className="absolute -left-[3.125rem] md:-left-[4.125rem] top-0 flex h-9 w-9 items-center justify-center rounded-full bg-orange font-['Fraunces'] text-lg italic text-on-orange ring-4 ring-foreground">
                {item.n}
              </span>
              <h3 className="font-['Rubik'] text-xl md:text-2xl font-medium">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-background/70">{item.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Qui suis-je : sticky title on the left, cards on the right, giant name drifting behind */
/** Arched portrait: clip reveal, inner parallax, spinning text badge */
function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);
  const frameY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, -24]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[22rem] md:max-w-none">
      {/* Offset outline arch */}
      <motion.div
        aria-hidden="true"
        style={{ y: frameY }}
        className="absolute inset-0 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 rounded-t-full border-2 border-orange"
      />

      <motion.div
        initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-foreground/10 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)]"
      >
        <motion.img
          src={abdoPortrait}
          alt={profile.photoAlt}
          loading="lazy"
          style={{ y: imgY }}
          className="absolute inset-0 h-full w-full scale-[1.15] object-cover object-[50%_70%] contrast-[1.08] saturate-[1.15]"
        />
      </motion.div>

      {/* Sticker */}
      <motion.span
        initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.8 }}
        className="absolute right-0 top-[38%] translate-x-3 md:translate-x-8 rounded-full bg-orange px-4 py-2 font-['Rubik'] text-sm font-medium text-on-orange shadow-lg"
      >
        Votre futur client :)
      </motion.span>

      {/* Spinning circular badge */}
      <div className="absolute -bottom-6 -left-4 md:-left-8 h-28 w-28 md:h-32 md:w-32 rounded-full bg-background shadow-xl">
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="h-full w-full text-foreground animate-[spin_18s_linear_infinite] motion-reduce:animate-none"
        >
          <defs>
            <path id="portrait-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
          </defs>
          <text className="fill-current font-['Rubik'] text-[8.5px] font-medium uppercase">
            <textPath href="#portrait-circle" textLength="230" lengthAdjust="spacing">{profile.roles}</textPath>
          </text>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-['Fraunces'] text-3xl italic text-orange">
          A
        </span>
      </div>
    </div>
  );
}

function Profile() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const nameX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["10%", "-25%"]);

  return (
    <section id="qui-suis-je" ref={ref} className="relative w-full overflow-hidden">
      <motion.div
        aria-hidden="true"
        style={{ x: nameX }}
        className="pointer-events-none absolute top-10 left-0 whitespace-nowrap font-['Rubik'] text-[22vw] font-bold leading-none tracking-tighter opacity-15 [color:transparent] [-webkit-text-stroke:1.5px_var(--color-foreground)]"
      >
        ABDO · ABDO · ABDO
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-8 md:px-12 py-20 md:py-32 grid gap-16 md:gap-20 md:grid-cols-[0.85fr_1.15fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <Portrait />
        </div>

        <div>
        <motion.div {...reveal}>
          <Eyebrow>{profile.heading}</Eyebrow>
          <h2 className="font-['Rubik'] text-4xl md:text-6xl font-bold leading-[1.05] tracking-tighter text-foreground">
            {profile.title}
          </h2>
          <p className="mt-6 text-lg md:text-xl leading-relaxed text-foreground/80">{profile.intro}</p>
          <div className="mt-6 flex items-center gap-3 text-sm text-foreground/70">
            <span className="font-['Rubik'] uppercase tracking-widest">Je parle</span>
            {profile.languages.map((l) => (
              <span key={l} className="rounded-full bg-orange px-3 py-1 font-medium text-on-orange">
                {l}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="mt-10 space-y-6">
          <motion.article
            {...reveal}
            className="rounded-[2rem] border border-foreground/15 bg-background/60 p-8 md:p-10 backdrop-blur-sm"
          >
            <h3 className="font-['Fraunces'] text-2xl md:text-3xl italic text-orange">{profile.about.title}</h3>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-foreground/80">{profile.about.text}</p>
          </motion.article>

          <motion.article {...reveal} className="rounded-[2rem] bg-foreground p-8 md:p-10 text-background">
            <h3 className="font-['Fraunces'] text-2xl md:text-3xl italic text-orange">{profile.likes.title}</h3>
            <motion.ul
              className="mt-6 flex flex-wrap gap-2.5"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ show: { transition: { staggerChildren: 0.07 } } }}
            >
              {profile.likes.items.map((like) => (
                <motion.li
                  key={like}
                  variants={{
                    hidden: { opacity: 0, scale: 0.6, y: 10 },
                    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 18 } },
                  }}
                  className="rounded-full border border-background/25 px-4 py-2 text-sm"
                >
                  {like}
                </motion.li>
              ))}
            </motion.ul>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-background/75">{profile.likes.text}</p>
          </motion.article>
        </div>
        </div>
      </div>
    </section>
  );
}

/** Les formules : what the salon gets × what I get, for each price */
function PlanCard({ plan, i, lieu }: { plan: Plan; i: number; lieu: string }) {
  const dark = plan.highlight;
  return (
    <motion.article
      id={`formule-${plan.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: (i % 3) * 0.1 }}
      whileHover={{ y: -6 }}
      className={`relative flex flex-col rounded-[2rem] p-8 md:p-9 ${
        dark
          ? "bg-foreground text-background shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)] lg:-my-4"
          : plan.id === "echange"
            ? "border-2 border-dashed border-orange bg-background/60 backdrop-blur-sm text-foreground"
            : "border border-foreground/15 bg-background/60 backdrop-blur-sm text-foreground"
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-8 rounded-full bg-orange px-3 py-1 font-['Rubik'] text-xs font-medium uppercase tracking-widest text-on-orange">
          {plan.badge}
        </span>
      )}

      <p className="font-['Rubik'] text-sm uppercase tracking-widest text-orange">{plan.name}</p>
      <p className="mt-3 flex flex-wrap items-baseline gap-x-2 font-['Rubik']">
        {plan.pricePrefix && <span className="text-lg opacity-70">{plan.pricePrefix}</span>}
        <span className="text-4xl md:text-5xl font-bold tracking-tighter">{plan.price}</span>
        <span className="font-['Fraunces'] text-lg italic opacity-70">{plan.period}</span>
      </p>
      <p className={`mt-3 text-base leading-snug ${dark ? "text-background/80" : "text-foreground/80"}`}>{plan.pitch}</p>

      <div className={`my-6 h-px ${dark ? "bg-background/15" : "bg-foreground/15"}`} />

      <p className="font-['Rubik'] text-xs font-medium uppercase tracking-[0.2em] opacity-60">{plans.giveLabel}</p>
      <ul className="mt-3 space-y-2.5 text-[15px] leading-snug">
        {plan.give.map((g) => (
          <li key={g} className="flex gap-2.5">
            <span className="text-orange">
              <Check />
            </span>
            {g}
          </li>
        ))}
      </ul>

      <p className="mt-6 font-['Rubik'] text-xs font-medium uppercase tracking-[0.2em] opacity-60">{plans.getLabel}</p>
      <ul className="mt-3 space-y-2.5 text-[15px] leading-snug">
        {plan.get.map((g) => (
          <li key={g} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-px font-['Fraunces'] italic text-orange">
              ⇄
            </span>
            {g}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        {plan.note && (
          <p className={`font-['Fraunces'] text-[15px] italic leading-snug ${dark ? "text-background/60" : "text-foreground/60"}`}>
            {plan.note}
          </p>
        )}
        <a
          href={whatsappLink(withLieu(plan.message, lieu))}
          target="_blank"
          rel="noopener noreferrer"
          className={`group mt-5 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-['Rubik'] text-sm font-medium uppercase tracking-wide transition-all hover:gap-3 ${
            dark || plan.id === "echange"
              ? "bg-orange text-on-orange hover:opacity-90"
              : "border-2 border-orange text-orange hover:bg-orange hover:text-on-orange"
          }`}
        >
          <WhatsAppIcon className="h-4 w-4" />
          {plan.cta}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </motion.article>
  );
}

function Plans({ lieu }: { lieu: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["5%", "-30%"]);
  const [main, extra] = [plans.items.slice(0, 3), plans.items.slice(3)];

  return (
    <section id="formules" ref={ref} className="relative w-full overflow-hidden">
      <motion.div
        aria-hidden="true"
        style={{ x: bgX }}
        className="pointer-events-none absolute top-6 left-0 whitespace-nowrap font-['Rubik'] text-[18vw] font-bold leading-none tracking-tighter opacity-10 [color:transparent] [-webkit-text-stroke:1.5px_var(--color-foreground)]"
      >
        0 € · 50 € · 150 € · 0 € · 50 € · 150 €
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-8 md:px-12 py-20 md:py-32">
        <motion.div {...reveal} className="max-w-3xl">
          <Eyebrow>{plans.heading}</Eyebrow>
          <h2 className="font-['Rubik'] text-3xl md:text-6xl font-bold leading-[1.05] tracking-tighter text-foreground">
            {plans.title}
          </h2>
          <p className="mt-6 text-lg md:text-xl leading-relaxed text-foreground/80">{plans.intro}</p>
        </motion.div>

        <div className="mt-14 md:mt-20 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {main.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} i={i} lieu={lieu} />
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {extra.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} i={i} lieu={lieu} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq({ lieu }: { lieu: string }) {
  return (
    <section id="faq" className="w-full max-w-4xl mx-auto px-8 md:px-12 pb-16 md:pb-24">
      <motion.div {...reveal}>
        <Eyebrow>{faq.heading}</Eyebrow>
        <div className="border-t border-foreground/20">
          {faq.items.map((item) => (
            <details key={item.id} id={`faq-${item.id}`} className="group scroll-mt-24 border-b border-foreground/20 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-['Rubik'] text-lg md:text-xl font-medium text-foreground [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="font-['Fraunces'] text-3xl leading-none text-orange transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="mt-4 max-w-3xl space-y-3 text-base leading-relaxed text-foreground/75">
                {item.a.map((p) => (
                  <p key={p}>{withLieu(p, lieu)}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default function PitchContent() {
  const lieu = useLieu();
  return (
    <>
      <Exchange />
      <Constat lieu={lieu} />
      <Gains />
      <Mockup lieu={lieu} />
      <Steps />
      <Profile />
      <Plans lieu={lieu} />
      <Faq lieu={lieu} />
    </>
  );
}
