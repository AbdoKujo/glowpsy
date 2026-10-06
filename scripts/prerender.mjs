/**
 * Post-build step: writes one fully rendered HTML file per city
 * (dist/index.html for the default city, dist/<slug>/index.html for the others)
 * with its own title, description, canonical URL and structured data,
 * then generates sitemap.xml. Run after `vite build` and `vite build --ssr`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, headFor, CITIES, DEFAULT_CITY, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");
const seoBlock = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
if (!seoBlock.test(template) || !template.includes("<!--app-->")) {
  throw new Error("index.html is missing the <!--seo:start/end--> or <!--app--> markers");
}

const today = new Date().toISOString().slice(0, 10);
const urls = [];

for (const city of CITIES) {
  const isDefault = city.slug === DEFAULT_CITY;
  const route = isDefault ? "/" : `/${city.slug}`;
  const html = template
    .replace(seoBlock, headFor(city.name))
    .replace("<!--app-->", render(route));
  const outFile = isDefault ? path.join(dist, "index.html") : path.join(dist, city.slug, "index.html");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  urls.push({ loc: isDefault ? `${SITE_URL}/` : `${SITE_URL}/${city.slug}`, priority: isDefault ? "1.0" : "0.8" });
  console.log(`  prerendered ${route} (${city.name})`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`  sitemap.xml: ${urls.length} URLs`);
