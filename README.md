# Glowpsy

Page de proposition pour les salons afro : un site web professionnel en échange de tresses, dès 50 €.
En ligne sur [glowpsy.com](https://glowpsy.com).

## Développement

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # build + pré-rendu de chaque page ville + sitemap.xml
npm run preview  # sert le dossier dist/
```

Stack : Vite, React, TypeScript, Tailwind CSS, Framer Motion, GSAP ScrollTrigger, Lenis.

## Où modifier quoi

| Quoi | Fichier |
|---|---|
| Tous les textes, formules, FAQ, contact | `src/data/pitch-data.ts` |
| Domaine, villes, titres et descriptions SEO | `src/data/seo.ts` |
| Données structurées (JSON-LD) et balises meta | `src/seo/meta.ts` |
| Résumé pour les assistants IA | `public/llms.txt` |

## Pages par ville

`glowpsy.com/<ville>` affiche la page avec le nom de la ville (par défaut : Paris).
Les villes listées dans `src/data/seo.ts` sont pré-rendues au build (HTML complet, balises SEO propres,
présentes dans le sitemap et le pied de page). Les autres villes fonctionnent aussi, rendues côté navigateur.

## Déploiement

Vercel : `vercel.json` gère les URL propres et le repli vers `index.html`.
