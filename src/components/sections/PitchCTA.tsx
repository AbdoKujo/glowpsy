import { contact } from "@/data/pitch-data";
import { motion } from "framer-motion";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { whatsappLink } from "@/lib/whatsapp";
import { useLieu, withLieu } from "@/hooks/useLieu";
import { SERVICE_AREA } from "@/data/seo";

/**
 * PitchCTA Component
 * Final call-to-action with contact links
 */
export default function PitchCTA() {
  const lieu = useLieu();
  return (
    <section id="contact" className="w-full max-w-7xl mx-auto px-8 md:px-12 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="h-px bg-foreground origin-left mb-16" />

        <h2 className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-none tracking-tighter uppercase text-orange font-['Rubik'] mb-8">
          ON COMMENCE ?
        </h2>

        <p className="text-xl md:text-3xl leading-tight font-['Rubik'] text-foreground mb-12 max-w-3xl">
          Écrivez-moi et recevez une première version de votre site, sans aucun
          engagement.
          <span className="mt-4 block text-lg md:text-xl text-foreground/70">
            Je préfère être contacté sur WhatsApp : c'est là que je réponds le plus vite.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          <a
            href={whatsappLink(withLieu(contact.whatsappMessage, lieu))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-orange text-on-orange font-['Rubik'] font-medium uppercase tracking-wide text-sm hover:opacity-80 transition-opacity"
          >
            <WhatsAppIcon className="h-4 w-4" />
            M'écrire sur WhatsApp
          </a>
          <a
            href={`mailto:${contact.email}?subject=${encodeURIComponent(
              "Première version de mon site web"
            )}`}
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-orange text-orange font-['Rubik'] font-medium uppercase tracking-wide text-sm hover:opacity-80 transition-opacity"
          >
            M'écrire par email
          </a>
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-orange text-orange font-['Rubik'] font-medium uppercase tracking-wide text-sm hover:opacity-80 transition-opacity"
          >
            M'appeler
          </a>
        </div>

        <div className="mt-16 max-w-4xl">
          <h3 className="font-['Rubik'] text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
            Je me déplace dans votre salon
          </h3>
          <p className="mt-3 text-base md:text-lg leading-relaxed text-foreground/75">
            {SERVICE_AREA.join(" · ")}. Ailleurs en Île-de-France&nbsp;? Écrivez-moi, on en parle.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
