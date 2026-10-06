/**
 * SEO configuration: domain, brand and the city pages that get their own
 * pre-rendered URL (glowpsy.com/<slug>) and sitemap entry.
 * Add a city here and it is automatically built, linked and listed.
 */

export const SITE_URL = "https://glowpsy.com";
export const BRAND = "Glowpsy";
export const AUTHOR = "Abdo";
export const DEFAULT_CITY = "paris";

/**
 * Pages with their own URL. `region` gives context (hero, titles, structured data);
 * Paris neighbourhoods are where afro salons actually concentrate.
 */
export const CITIES: { slug: string; name: string; region: string; parent?: string }[] = [
  { slug: "paris", name: "Paris", region: "France" },
  { slug: "epinay-sur-seine", name: "Épinay-sur-Seine", region: "Seine-Saint-Denis" },
  { slug: "saint-denis", name: "Saint-Denis", region: "Seine-Saint-Denis" },
  { slug: "chateau-rouge", name: "Château-Rouge", region: "Paris 18e", parent: "Paris" },
  { slug: "chateau-d-eau", name: "Château-d'Eau", region: "Paris 10e", parent: "Paris" },
];

/**
 * Where I go to salons, without a dedicated page: shown on every page and in the
 * structured data, so searches and AI assistants know the area I cover.
 */
export const SERVICE_AREA = [
  "Épinay-sur-Seine",
  "Saint-Denis",
  "Villetaneuse",
  "Pierrefitte-sur-Seine",
  "Stains",
  "L'Île-Saint-Denis",
  "Villeneuve-la-Garenne",
  "Deuil-la-Barre",
  "Enghien-les-Bains",
  "Argenteuil",
  "Aubervilliers",
  "Paris 18e (Château-Rouge, Barbès)",
  "Paris 10e (Château-d'Eau, Strasbourg-Saint-Denis)",
];

export function regionFor(name: string): string {
  return CITIES.find((c) => c.name === name)?.region ?? "Île-de-France";
}

/** "Château-Rouge (Paris 18e)" for neighbourhoods, plain name otherwise. */
export function seoPlace(name: string): string {
  const c = CITIES.find((x) => x.name === name);
  return c?.parent ? `${c.name} (${c.region})` : name;
}

export function citySlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Canonical URL of a city page (the default city is the home page). */
export function cityUrl(name: string): string {
  const slug = citySlug(name);
  return slug === DEFAULT_CITY ? `${SITE_URL}/` : `${SITE_URL}/${slug}`;
}

export function seoTitle(city: string): string {
  return `Création de site web pour salon afro à ${seoPlace(city)} dès 50 € | ${BRAND}`;
}

export function seoDescription(city: string): string {
  return `Site internet pour salon afro et de tresses à ${seoPlace(city)} : référencement Google, visibilité sur ChatGPT et Gemini, rendez-vous WhatsApp. Dès 50 €, première version sans engagement.`;
}
