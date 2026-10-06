import { useParams } from "react-router-dom";
import { CITIES, citySlug } from "@/data/seo";

export const DEFAULT_LIEU = "Paris";

const SMALL_WORDS = new Set(["sur", "sous", "de", "des", "du", "la", "le", "les", "en", "et", "lès", "aux"]);

/** "epinay-sur-seine" → "Epinay-sur-Seine", "saint_denis" → "Saint-Denis" */
export function formatLieu(slug?: string): string {
  if (!slug) return DEFAULT_LIEU;
  let raw: string;
  try {
    raw = decodeURIComponent(slug);
  } catch {
    raw = slug;
  }
  raw = raw.trim().replace(/[_+]/g, "-").replace(/\s+/g, "-");
  if (!raw) return DEFAULT_LIEU;
  // Known cities keep their proper spelling (accents): /epinay-sur-seine → "Épinay-sur-Seine"
  const known = CITIES.find((c) => c.slug === citySlug(raw));
  if (known) return known.name;
  return raw
    .toLowerCase()
    .split("-")
    .filter(Boolean)
    .map((w, i) =>
      i > 0 && SMALL_WORDS.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)
    )
    .join("-");
}

/** City shown on the page, read from the URL: domaine/<lieu> (default: Paris). */
export function useLieu(): string {
  const { lieu } = useParams();
  return formatLieu(lieu);
}

/** Replace every {lieu} token in a string. */
export function withLieu(text: string, lieu: string): string {
  return text.split("{lieu}").join(lieu);
}
