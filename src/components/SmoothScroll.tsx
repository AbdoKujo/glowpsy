import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/**
 * Navigate to a section: smooth for short hops, instant jump for long
 * distances (so we don't scroll through half the page, pinned section included).
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = id === "top" ? 0 : el.getBoundingClientRect().top + window.scrollY - 90;
  const far = Math.abs(top - window.scrollY) > window.innerHeight * 2.5;
  if (lenis) lenis.scrollTo(top, far ? { immediate: true, force: true } : { duration: 1.1, force: true });
  else window.scrollTo({ top, behavior: far ? "auto" : "smooth" });
  if (far) ScrollTrigger.update();
}

/** Pause / resume smooth scrolling (e.g. while the mobile menu is open). */
export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

/**
 * Jump straight to a FAQ question (no long scroll through the page),
 * open it and flash it so the eye lands on it.
 */
export function goToFaq(id: string) {
  const item = document.getElementById(`faq-${id}`);
  if (!item) return;
  if (item instanceof HTMLDetailsElement) item.open = true;

  const top = item.getBoundingClientRect().top + window.scrollY - 120;
  if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
  else window.scrollTo({ top, behavior: "auto" });
  ScrollTrigger.update();

  item.classList.remove("faq-flash");
  void item.offsetWidth; // restart the animation
  item.classList.add("faq-flash");
}

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger
 * and framer-motion's useScroll stay in sync with the smoothed position.
 * Disabled when the user prefers reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis = instance;
    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
