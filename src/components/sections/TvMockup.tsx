import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import salonHero from "@/assets/salon-hero.jpg";
import { mockup } from "@/data/pitch-data";

/** Designs are drawn at a fixed "desktop" size, then scaled to fit the TV screen. */
const SCREEN_W = 1280;
const SCREEN_H = 720;
const AUTOPLAY_MS = 6000;

type DesignProps = { lieu: string };

/* ----------------------------- Design 1 : Élégant ----------------------------- */
function DesignElegant({ lieu }: DesignProps) {
  return (
    <div className="flex h-full w-full flex-col bg-[#f6efe6] text-[#3b2a20]">
      <nav className="flex items-center justify-between px-16 py-8 text-[17px]">
        <span className="font-['Fraunces'] text-3xl italic">{mockup.salon}</span>
        <div className="flex gap-10 text-[#3b2a20]/70">
          <span>Prestations</span>
          <span>Galerie</span>
          <span>Avis</span>
          <span>Contact</span>
        </div>
        <span className="rounded-full border border-[#3b2a20] px-6 py-2.5">Réserver</span>
      </nav>

      <div className="grid flex-1 grid-cols-[1.1fr_1fr] items-center gap-12 px-16">
        <div>
          <p className="text-[15px] uppercase tracking-[0.35em] text-[#b8875a]">Tresses & beauté · {lieu}</p>
          <h3 className="mt-6 font-['Fraunces'] text-[84px] leading-[0.95] italic">
            L'art de la tresse,
            <br />
            <span className="text-[#b8875a]">sur mesure.</span>
          </h3>
          <div className="mt-10 flex gap-4 text-[17px]">
            <span className="rounded-full bg-[#3b2a20] px-8 py-4 text-[#f6efe6]">Prendre rendez-vous</span>
            <span className="rounded-full border border-[#3b2a20]/40 px-8 py-4">Voir les tarifs</span>
          </div>
        </div>
        <div className="relative h-[460px]">
          <img src={salonHero} alt="" decoding="async" className="h-full w-full rounded-t-full object-cover" />
          <div className="absolute -left-10 bottom-10 rounded-2xl bg-white px-6 py-4 shadow-xl">
            <p className="font-['Fraunces'] text-3xl italic">4,9 ★</p>
            <p className="text-[14px] text-[#3b2a20]/60">128 avis Google</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 border-t border-[#3b2a20]/15 px-16 py-6 text-[17px]">
        {mockup.services.map((s) => (
          <div key={s.name}>
            <p className="font-medium">{s.name}</p>
            <p className="text-[#b8875a]">{s.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- Design 2 : Vibrant ----------------------------- */
function DesignVibrant({ lieu }: DesignProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#111] text-white">
      <img src={salonHero} alt="" decoding="async" className="absolute inset-y-0 right-0 h-full w-[55%] object-cover" />
      <div className="absolute inset-y-0 right-0 w-[55%] bg-gradient-to-r from-[#111] via-[#111]/40 to-transparent" />

      <div className="relative flex h-full flex-col px-16 py-10">
        <nav className="flex items-center justify-between text-[16px] font-medium uppercase tracking-widest">
          <span className="font-['Rubik'] text-2xl font-bold">
            VOTRE<span className="text-[#ff6b35]">SALON</span>
          </span>
          <span className="rounded-full bg-[#25d366] px-6 py-2.5 text-[#111]">WhatsApp</span>
        </nav>

        <div className="mt-16 max-w-[640px]">
          <span className="inline-block rounded-full bg-[#ff6b35] px-4 py-1.5 text-[14px] font-bold uppercase tracking-widest">
            Salon afro · {lieu}
          </span>
          <h3 className="mt-6 font-['Rubik'] text-[96px] font-bold uppercase leading-[0.88] tracking-tighter">
            Box braids.
            <br />
            Knotless.
            <br />
            <span className="text-[#ff6b35]">Vous.</span>
          </h3>
        </div>

        <div className="mt-auto flex max-w-[680px] gap-4">
          {mockup.services.slice(0, 3).map((s) => (
            <div key={s.name} className="flex-1 rounded-2xl border border-white/15 bg-white/10 px-5 py-4">
              <p className="text-[16px] text-white/70">{s.name}</p>
              <p className="mt-1 font-['Rubik'] text-2xl font-bold text-[#ff6b35]">{s.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Design 3 : Doux ------------------------------ */
function DesignDoux({ lieu }: DesignProps) {
  return (
    <div className="flex h-full w-full flex-col items-center bg-gradient-to-b from-[#fde8ec] to-[#efe4fb] px-16 py-10 text-[#4a2c3d]">
      <nav className="flex w-full items-center justify-between text-[17px]">
        <span className="font-['Rubik'] text-2xl font-bold">{mockup.salon} ✿</span>
        <div className="flex gap-3">
          {["Accueil", "Tarifs", "Galerie"].map((l) => (
            <span key={l} className="rounded-full bg-white/70 px-5 py-2">
              {l}
            </span>
          ))}
        </div>
      </nav>

      <img src={salonHero} alt="" decoding="async" className="mt-8 h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg" />
      <h3 className="mt-5 text-center font-['Fraunces'] text-[64px] leading-none italic">Des tresses qui vous ressemblent</h3>
      <p className="mt-4 text-[19px] text-[#4a2c3d]/70">Salon afro & soins · {lieu} · Mar-Sam 9h-19h</p>

      <div className="mt-8 grid w-full grid-cols-4 gap-4">
        {mockup.services.map((s) => (
          <div key={s.name} className="rounded-3xl bg-white/80 p-5 text-center shadow-sm">
            <p className="text-[18px] font-medium">{s.name}</p>
            <p className="mt-1 text-[16px] text-[#c2577a]">{s.price}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto flex gap-4 text-[17px]">
        <span className="rounded-full bg-[#c2577a] px-8 py-3.5 text-white">Choisir une prestation</span>
        <span className="rounded-full bg-[#25d366] px-8 py-3.5 text-white">Écrire sur WhatsApp</span>
      </div>
    </div>
  );
}

const DESIGNS = [DesignElegant, DesignVibrant, DesignDoux];

/** Scales a fixed 1280×720 canvas to whatever width the screen has. */
function useScreenScale() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / SCREEN_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, scale };
}

export default function TvMockup({ lieu }: { lieu: string }) {
  const [[index, dir], setSlide] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const { ref: screenRef, scale } = useScreenScale();
  const reduce = useReducedMotion();

  const go = (step: number) =>
    setSlide(([i]) => [(i + step + DESIGNS.length) % DESIGNS.length, step]);

  // Autoplay only while the TV is on screen (no slide changes while scrolling elsewhere)
  const wrapRef = useRef<HTMLDivElement>(null);
  const onScreen = useInView(wrapRef, { amount: 0.4 });
  const playing = onScreen && !paused && !reduce;

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, playing]);

  const Design = DESIGNS[index];

  return (
    <div ref={wrapRef} className="mt-14">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-5xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Bezel */}
        <div className="relative rounded-[1.25rem] bg-gradient-to-b from-[#2a2a2e] to-[#0d0d0f] p-2.5 md:p-4 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
          {/* Screen */}
          <div
            ref={screenRef}
            className="relative aspect-video overflow-hidden rounded-md bg-black [contain:layout_paint]"
            role="region"
            aria-roledescription="carrousel"
            aria-label={`Maquette ${index + 1} sur ${DESIGNS.length} : ${mockup.designs[index].label}`}
          >
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={index}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ x: `${d * 100}%`, opacity: 0.4 }),
                  center: { x: "0%", opacity: 1 },
                  exit: (d: number) => ({ x: `${d * -100}%`, opacity: 0.4 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduce ? 0 : 0.7, ease: [0.65, 0, 0.35, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing will-change-transform"
              >
                <div
                  className="origin-top-left select-none"
                  style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})` }}
                >
                  <Design lieu={lieu} />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Glass reflection */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent" />

            {/* Autoplay progress */}
            {playing && (
              <div
                key={`p-${index}`}
                style={{ animation: `tv-progress ${AUTOPLAY_MS}ms linear forwards` }}
                className="absolute inset-x-0 bottom-0 h-1 origin-left bg-orange"
              />
            )}
          </div>

          {/* Brand + power LED on the bottom bezel */}
          <div className="flex items-center justify-center gap-2 pt-2 md:pt-3">
            <span className="font-['Rubik'] text-[9px] md:text-[11px] uppercase tracking-[0.4em] text-white/35">votre-salon.fr</span>
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_6px_2px_rgba(239,68,68,0.6)]" />
          </div>
        </div>

        {/* Stand */}
        <div className="mx-auto h-8 md:h-12 w-16 md:w-24 bg-gradient-to-b from-[#1a1a1d] to-[#3a3a3f]" />
        <div className="mx-auto h-2.5 md:h-3 w-56 md:w-80 rounded-full bg-gradient-to-b from-[#3a3a3f] to-[#111] shadow-[0_12px_24px_-6px_rgba(0,0,0,0.5)]" />
      </motion.div>

      {/* Controls */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Maquette précédente"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-orange text-orange transition-opacity hover:opacity-70"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {mockup.designs.map((d, i) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setSlide([i, i > index ? 1 : -1])}
            aria-current={i === index}
            className={`rounded-full px-5 py-2.5 font-['Rubik'] text-sm font-medium uppercase tracking-wide transition-colors ${
              i === index ? "bg-orange text-on-orange" : "border border-foreground/25 text-foreground hover:border-orange"
            }`}
          >
            {d.label}
          </button>
        ))}

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Maquette suivante"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-orange text-orange transition-opacity hover:opacity-70"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
