import { BRAND, CITIES, DEFAULT_CITY } from "@/data/seo";
import { useLieu } from "@/hooks/useLieu";

/** Footer with links to every city page (helps search engines discover them). */
export default function Footer() {
  const lieu = useLieu();
  return (
    <footer className="w-full max-w-7xl mx-auto px-8 md:px-12 pt-8 pb-12 mt-8 border-t border-foreground/15">
      <nav aria-label="Sites pour salons afro par ville">
        <p className="font-['Rubik'] text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
          Création de sites web pour salons afro
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {CITIES.map((c) => (
            <li key={c.slug}>
              <a
                href={c.slug === DEFAULT_CITY ? "/" : `/${c.slug}`}
                aria-current={c.name === lieu ? "page" : undefined}
                className={`transition-colors hover:text-orange ${c.name === lieu ? "text-orange" : "text-foreground/70"}`}
              >
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="mt-8 text-sm text-foreground/50">
        © {new Date().getFullYear()} {BRAND} · Abdo, développeur web
      </p>
    </footer>
  );
}
