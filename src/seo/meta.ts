import { AUTHOR, BRAND, CITIES, SERVICE_AREA, SITE_URL, cityUrl, seoDescription, seoPlace, seoTitle } from "@/data/seo";
import { contact, faq, plans } from "@/data/pitch-data";
import { withLieu } from "@/hooks/useLieu";

export type Seo = {
  title: string;
  description: string;
  url: string;
  image: string;
  jsonLd: object;
};

/** Numeric prices for the structured data (the visible labels live in pitch-data). */
const PRICES: Record<string, { min: number; max?: number; unit?: string }> = {
  echange: { min: 0 },
  annuel: { min: 50, unit: "an" },
  standard: { min: 100 },
  "sur-mesure": { min: 150, max: 400 },
  application: { min: 1400 },
};

/** The page's own place (a neighbourhood is contained in its city) + the rest of the area served. */
function areaServed(city: string) {
  const page = CITIES.find((c) => c.name === city);
  const own = page?.parent
    ? { "@type": "Place", name: `${page.name}, ${page.region}`, containedInPlace: { "@type": "City", name: page.parent } }
    : { "@type": "City", name: city };
  const others = SERVICE_AREA.filter((a) => a !== city && !a.includes(city)).map((name) => ({ "@type": "Place", name }));
  return [own, ...others];
}

export function getSeo(city: string): Seo {
  const url = cityUrl(city);
  const title = seoTitle(city);
  const description = seoDescription(city);
  const image = `${SITE_URL}/og-image.jpg`;

  const person = {
    "@type": "Person",
    "@id": `${SITE_URL}/#abdo`,
    name: AUTHOR,
    jobTitle: "Développeur web, étudiant en ingénierie de l'intelligence artificielle",
    description:
      "Étudiant international en alternance en ingénierie de l'IA, développeur web. Crée des sites internet pour les salons afro et de tresses.",
    image: `${SITE_URL}/abdo.webp`,
    url: `${SITE_URL}/#qui-suis-je`,
    knowsLanguage: ["fr", "en"],
    knowsAbout: ["Création de sites web", "Référencement naturel (SEO)", "Intelligence artificielle", "Salons de coiffure afro"],
    email: `mailto:${contact.email}`,
  };

  const service = {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: `${BRAND} : création de sites web pour salons afro`,
    url: SITE_URL,
    image,
    description: `Création de sites internet pour salons afro et de tresses à ${seoPlace(city)} : design sur mesure, référencement Google, configuration pour les assistants IA, prise de rendez-vous par formulaire ou WhatsApp.`,
    founder: { "@id": person["@id"] },
    areaServed: areaServed(city),
    telephone: contact.phone.replace(/\s/g, ""),
    email: contact.email,
    priceRange: "0 € - 1400 €",
    makesOffer: plans.items.map((p) => {
      const price = PRICES[p.id];
      return {
        "@type": "Offer",
        name: `Formule ${p.name}`,
        description: `${p.pitch} ${p.give.join(". ")}.`,
        priceCurrency: "EUR",
        ...(price?.max !== undefined
          ? { priceSpecification: { "@type": "PriceSpecification", minPrice: price.min, maxPrice: price.max, priceCurrency: "EUR" } }
          : price?.unit
            ? { priceSpecification: { "@type": "UnitPriceSpecification", price: price.min, priceCurrency: "EUR", unitText: price.unit } }
            : { price: price?.min ?? 0 }),
        areaServed: areaServed(city)[0],
      };
    }),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: BRAND, inLanguage: "fr-FR" },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "fr-FR",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": service["@id"] },
        author: { "@id": person["@id"] },
      },
      service,
      person,
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a.map((a) => withLieu(a, city)).join(" ") },
        })),
      },
    ],
  };

  return { title, description, url, image, jsonLd };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** <head> tags for the pre-rendered HTML (build time). */
export function renderHeadTags(seo: Seo): string {
  return [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<link rel="canonical" href="${seo.url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:locale" content="fr_FR" />`,
    `<meta property="og:url" content="${seo.url}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:image" content="${seo.image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Votre salon afro en ligne, site web dès 50 €" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${seo.image}" />`,
    `<script type="application/ld+json" id="ld-json">${JSON.stringify(seo.jsonLd).replace(/</g, "\u003c")}</script>`,
  ].join("\n    ");
}

/** Same tags, updated in the live document (client-side city changes, unknown cities). */
export function applySeo(seo: Seo) {
  document.title = seo.title;
  const set = (selector: string, attr: string, value: string, create: () => HTMLElement) => {
    let el = document.head.querySelector(selector);
    if (!el) {
      el = create();
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };
  const meta = (key: "name" | "property", name: string, value: string) =>
    set(`meta[${key}="${name}"]`, "content", value, () => {
      const m = document.createElement("meta");
      m.setAttribute(key, name);
      return m;
    });
  meta("name", "description", seo.description);
  meta("property", "og:url", seo.url);
  meta("property", "og:title", seo.title);
  meta("property", "og:description", seo.description);
  meta("name", "twitter:title", seo.title);
  meta("name", "twitter:description", seo.description);
  set('link[rel="canonical"]', "href", seo.url, () => {
    const l = document.createElement("link");
    l.rel = "canonical";
    return l;
  });
  let ld = document.getElementById("ld-json");
  if (!ld) {
    ld = document.createElement("script");
    ld.id = "ld-json";
    ld.setAttribute("type", "application/ld+json");
    document.head.appendChild(ld);
  }
  ld.textContent = JSON.stringify(seo.jsonLd);
}
