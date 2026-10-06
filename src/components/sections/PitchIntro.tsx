import { useRef } from "react";
import { pitchIntro, marquee } from "@/data/pitch-data";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * PitchIntro — the hook: braids against a website.
 * Both halves drift apart as the section scrolls away,
 * then a scroll-driven marquee of braid styles takes over.
 */
export default function PitchIntro() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, reduce ? 1 : 0.15]);

  return (
    <>
      <section ref={ref} className="w-full max-w-7xl mx-auto px-8 md:px-12 pb-16 md:pb-24 overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ opacity: fade }}
          className="font-['Rubik'] font-bold tracking-tighter leading-[0.95] text-[clamp(2.25rem,8vw,6rem)] text-foreground"
        >
          <motion.span style={{ x: leftX }} className="block">
            {pitchIntro.hook[0]}{" "}
            <span className="font-['Fraunces'] italic font-normal text-orange">contre</span>
          </motion.span>
          <motion.span style={{ x: rightX }} className="block">
            votre site web.
          </motion.span>
        </motion.h2>
      </section>

      <Marquee />
    </>
  );
}

/** Two rows of braid styles sliding in opposite directions with the scroll. */
function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-35%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], reduce ? ["-20%", "-20%"] : ["-35%", "0%"]);
  const words = [...marquee, ...marquee, ...marquee];

  return (
    <div ref={ref} aria-hidden="true" className="relative w-full overflow-hidden py-10 md:py-16">
      <div className="-rotate-2">
      <motion.div
        style={{ x: x1 }}
        className="-ml-[5vw] flex w-max whitespace-nowrap bg-orange py-3 md:py-4 font-['Rubik'] text-2xl md:text-4xl font-bold uppercase tracking-tight text-on-orange"
      >
        {words.map((w, i) => (
          <span key={i} className="flex items-center">
            <span className="px-5">{w}</span>
            <span className="font-['Fraunces'] italic font-normal">✦</span>
          </span>
        ))}
      </motion.div>
      <motion.div
        style={{ x: x2 }}
        className="-ml-[5vw] flex w-max whitespace-nowrap py-3 md:py-4 font-['Fraunces'] text-2xl md:text-4xl italic text-foreground/70"
      >
        {words.map((w, i) => (
          <span key={i} className="px-6">
            {w}
          </span>
        ))}
      </motion.div>
      </div>
    </div>
  );
}
