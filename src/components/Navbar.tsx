import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Mail } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { nav, contact } from "@/data/pitch-data";
import { scrollToSection, setScrollLocked } from "@/components/SmoothScroll";
import { pauseAnimatedBackground } from "@/hooks/useAnimatedBackground";
import { whatsappLink } from "@/lib/whatsapp";
import { useLieu, withLieu } from "@/hooks/useLieu";
import abdoPortrait from "@/assets/abdo-portrait.webp";

const NAV_IDS = nav.links.map((l) => l.id);

/** Which nav section is currently in the middle of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        setActive(ids.find((id) => visible.get(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/** Hide when scrolling down, show again when scrolling up. */
function useHideOnScroll() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    if (y < 160) setHidden(false);
    else if (y > prev + 4) setHidden(true);
    else if (y < prev - 4) setHidden(false);
  });
  return { hidden, scrolled };
}

function Avatar({ size = "h-9 w-9" }: { size?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`${size} shrink-0 rounded-full bg-foreground/10`}
      style={{ boxShadow: "0 0 0 2px var(--highlightColor)", backgroundImage: `url(${abdoPortrait})`, backgroundSize: "520%", backgroundPosition: "42% 42%" }}
    />
  );
}

function Brand({ onClick }: { onClick: () => void }) {
  return (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="group flex items-center gap-2.5"
      aria-label="Retour en haut de la page"
    >
      <Avatar />
      <span className="flex flex-col leading-none">
        <span className="font-['Rubik'] text-base font-bold tracking-tight text-foreground">
          {nav.brand}
          <span className="text-orange">.</span>
        </span>
        <span className="mt-0.5 font-['Fraunces'] text-xs italic text-foreground/60">{nav.brandTag}</span>
      </span>
    </a>
  );
}

export default function Navbar() {
  const lieu = useLieu();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const { hidden, scrolled } = useHideOnScroll();
  const active = useActiveSection(NAV_IDS);
  const waHref = whatsappLink(withLieu(contact.whatsappMessage, lieu));

  // Lock page scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    setScrollLocked(open);
    pauseAnimatedBackground(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      setScrollLocked(false);
      pauseAnimatedBackground(false);
    };
  }, [open]);

  // Close the menu if the window grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    // let the menu start closing (and unlock scroll) before moving
    requestAnimationFrame(() => scrollToSection(id));
  };

  const barHidden = hidden && !open;

  return (
    <>
      {/* ============================ Desktop ============================ */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: barHidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-50 hidden justify-center px-6 lg:flex"
      >
        <nav
          aria-label="Navigation principale"
          className={`flex w-full max-w-6xl items-center justify-between gap-6 rounded-full border px-3 py-2 pl-4 backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300 ${
            scrolled
              ? "border-foreground/10 bg-background/75 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)]"
              : "border-transparent bg-background/40"
          }`}
        >
          <Brand onClick={() => go("top")} />

          <ul className="flex items-center gap-1">
            {nav.links.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id} className="relative">
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.id);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative z-10 block rounded-full px-4 py-2 font-['Rubik'] text-sm font-medium transition-colors ${
                      isActive ? "text-background" : "text-foreground/75 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-foreground"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full bg-orange py-2.5 pl-4 pr-5 font-['Rubik'] text-sm font-medium text-on-orange transition-transform hover:scale-[1.03] active:scale-95"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <WhatsAppIcon className="h-4 w-4" />
            {nav.cta}
          </a>
        </nav>
      </motion.header>

      {/* ============================ Mobile ============================ */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: barHidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-3 top-3 z-50 lg:hidden"
      >
        <div
          className={`flex items-center justify-between rounded-full border py-1.5 pl-2 pr-1.5 transition-[background-color,box-shadow,border-color] duration-300 ${
            open
              ? "border-background/15 bg-foreground"
              : scrolled
                ? "border-foreground/10 bg-background/80 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.3)] backdrop-blur-md"
                : "border-transparent bg-background/50 backdrop-blur-md"
          }`}
        >
          <div className={open ? "[&_*]:!text-background" : ""}>
            <Brand onClick={() => go("top")} />
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="M'écrire sur WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-orange text-on-orange active:scale-95 transition-transform"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-colors active:scale-95 ${
                open ? "bg-background text-foreground" : "bg-foreground text-background"
              }`}
            >
              <motion.span
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="absolute h-0.5 w-5 rounded-full bg-current"
              />
              <motion.span
                animate={open ? { rotate: -45, y: 0, width: 20 } : { rotate: 0, y: 4, width: 14 }}
                transition={{ duration: 0.3 }}
                className="absolute h-0.5 rounded-full bg-current"
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              // static glow: a gradient is painted once, unlike a blurred blob
              backgroundImage:
                "radial-gradient(circle at 110% 40%, color-mix(in oklab, var(--highlightColor) 30%, transparent), transparent 55%)",
            }}
            className="fixed inset-0 z-[45] flex flex-col overflow-y-auto overscroll-contain bg-foreground px-6 pb-8 pt-28 text-background will-change-transform lg:hidden"
          >

            <nav aria-label="Navigation mobile" className="relative">
              <ul className="space-y-1">
                {nav.links.map((link, i) => {
                  const isActive = active === link.id;
                  return (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduce ? 0 : 0.08 + i * 0.035, duration: 0.25, ease: "easeOut" }}
                    >
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          go(link.id);
                        }}
                        aria-current={isActive ? "true" : undefined}
                        className="group flex items-baseline gap-4 border-b border-background/10 py-3.5"
                      >
                        <span className="w-7 font-['Fraunces'] text-base italic text-orange">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-['Rubik'] text-[2rem] font-bold leading-none tracking-tighter transition-colors ${
                            isActive ? "text-orange" : "group-active:text-orange"
                          }`}
                        >
                          {link.label}
                        </span>
                        {isActive && <span className="ml-auto h-2 w-2 self-center rounded-full bg-orange" />}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 0.25, duration: 0.25 }}
              className="relative mt-auto pt-10"
            >
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 font-['Rubik'] text-sm font-medium uppercase tracking-wide text-on-orange active:scale-[0.98] transition-transform"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {nav.mobileCta}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-background/25 px-6 py-4 font-['Rubik'] text-sm font-medium text-background/90"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {contact.email}
              </a>
              <p className="mt-6 text-center font-['Fraunces'] text-sm italic text-background/50">
                Proposition pour les salons afro à {lieu}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
