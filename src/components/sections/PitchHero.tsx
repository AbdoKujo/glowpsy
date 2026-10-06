import { pitchInfo } from "@/data/pitch-data";
import salonHero from "@/assets/salon-hero.jpg";
import { motion } from "framer-motion";
import { useLieu, withLieu } from "@/hooks/useLieu";
import FaqLink from "@/components/FaqLink";
import { regionFor } from "@/data/seo";

/**
 * PitchHero Component
 * Resume-style header with 3 rows:
 * Row 1: Eyebrow info (left) | Headline (right)
 * Row 2: Headline (left) | Photo (right)
 * Row 3: Offer headline, orange (left) | Meta list (right)
 */
export default function PitchHero() {
  const lieu = useLieu();
  return (
    <div id="top" className="w-full max-w-7xl mx-auto px-8 md:px-12 pt-28 lg:pt-32 pb-16">
      {/* Row 1: Eyebrow + link to the pricing */}
      <div className="flex flex-row items-center gap-4 md:gap-8 mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2.5 text-xs md:text-base text-orange font-['Rubik']"
        >
          <span>{pitchInfo.eyebrow}</span>
          <FaqLink section="formules" className="text-orange" />
        </motion.div>
      </div>

      {/* Divider Line 1 */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="h-px bg-foreground origin-left mb-8"
      />

      {/* Row 2: Headline | Photo */}
      <div className="flex flex-row justify-between items-center gap-4 md:gap-8 mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-none tracking-tighter uppercase text-foreground font-['Rubik']">
            {pitchInfo.headline1}
            <span className="sr-only">
              {" "}en ligne : création de site web pour salon afro à {lieu}, à partir de 50 €
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <img
            src={salonHero}
            alt="Tresse africaine dans un salon"
            className="w-24 h-16 md:w-48 md:h-32 object-cover border-2 md:border-8 border-orange rounded-full"
          />
        </motion.div>
      </div>

      {/* Divider Line 2 */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="h-px bg-foreground origin-left mb-8"
      />

      {/* Row 3: Offer headline | Meta */}
      <div className="flex flex-row justify-between items-center gap-4 md:gap-8 mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p aria-hidden="true" className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-none tracking-tighter uppercase text-foreground font-['Rubik']">
            {pitchInfo.headline2}
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col space-y-0.5 md:space-y-1 text-xs md:text-base text-orange text-right font-['Rubik']"
        >
          {pitchInfo.meta.map((item) => (
            <li key={item.label} className="flex items-center justify-end gap-1.5">
              {item.label}
              {item.faq && <FaqLink id={item.faq} className="text-orange" />}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Divider Line 3 */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="h-px bg-foreground origin-left mb-8"
      />

      {/* Row 4: Price, orange | Location */}
      <div className="flex flex-row justify-between items-center gap-4 md:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p aria-hidden="true" className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-none tracking-tighter uppercase text-orange font-['Rubik']">
            {pitchInfo.headline3}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base">
            <FaqLink id="pourquoi-pas-0">{pitchInfo.whyNotZero}</FaqLink>
            <FaqLink id="zero">{pitchInfo.zeroPossible}</FaqLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col text-xs md:text-base text-orange text-right font-['Rubik']"
        >
          <div>{withLieu(pitchInfo.location, lieu).replace("{region}", regionFor(lieu))}</div>
        </motion.div>
      </div>

      {/* Divider Line 4 (Bottom) */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="h-px bg-foreground origin-left mt-8"
      />
    </div>
  );
}
