/**
 * Build-time pre-render entry (vite build --ssr). Used by scripts/prerender.mjs
 * to write the full HTML of every city page, so search engines and AI crawlers
 * that don't run JavaScript still read the whole content.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Providers, AppRoutes } from "./App";
import { getSeo, renderHeadTags } from "./seo/meta";
import { CITIES, DEFAULT_CITY, SITE_URL } from "./data/seo";

export function render(url: string): string {
  return renderToString(
    <Providers>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </Providers>
  );
}

export function headFor(city: string): string {
  return renderHeadTags(getSeo(city));
}

export { CITIES, DEFAULT_CITY, SITE_URL };
