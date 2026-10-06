/**
 * Pitch Data
 * Single source of truth for the salon pitch website content.
 * "{lieu}" is replaced at render time by the city read from the URL
 * (domaine/<lieu>, default: Paris) — see src/hooks/useLieu.ts.
 */

// ===== Contact =====

export const contact = {
  email: "abdo.abiido@gmail.com",
  phone: "+33 7 58 00 27 82",
  whatsapp: "33758002782", // format international sans + ni espaces (wa.me)
  whatsappMessage: "Bonjour Abdo ! J'ai vu votre proposition de site web pour mon salon à {lieu}. On peut en parler ?",
};

// ===== Navigation =====

export const nav = {
  brand: "Abdo",
  brandTag: "sites pour salons",
  links: [
    { id: "echange", label: "L'offre" },
    { id: "constat", label: "Le constat" },
    { id: "apercu", label: "Aperçu" },
    { id: "qui-suis-je", label: "Qui suis-je" },
    { id: "formules", label: "Formules" },
    { id: "faq", label: "FAQ" },
  ],
  cta: "WhatsApp",
  mobileCta: "M'écrire sur WhatsApp",
};

export const pitchInfo = {
  eyebrow: "Proposition de collaboration",
  audience: "Salon afro à {lieu}",
  location: "{lieu}, {region}",
  headline1: "VOTRE SALON",
  headline2: "EN LIGNE",
  headline3: "À PARTIR DE 50 €",
  whyNotZero: "Pourquoi pas 0 ?",
  zeroPossible: "Possible de le faire à 0 € ?",
  meta: [
    { label: "SEO inclus", faq: "seo" },
    { label: "Première version gratuite" },
  ] as { label: string; faq?: string }[],
  heroImage: "src/assets/salon-hero.jpg",
};

export const pitchIntro = {
  hook: ["Vos tresses", "contre votre site web."],
};

/** Words scrolling in the marquee band */
export const marquee = [
  "Box braids",
  "Knotless",
  "Cornrows",
  "Twists",
  "Fulani braids",
  "Locks",
  "Tissage",
  "Soins cheveux",
];

// ===== L'échange =====

export const exchange = {
  heading: "L'ÉCHANGE",
  give: {
    tag: "Je vous apporte",
    title: "Un site web clé en main",
    items: [
      "Recommandé par l'IA : vos services et tarifs lisibles par ChatGPT, Gemini et les autres, pour être suggéré quand quelqu'un cherche un salon près de chez lui",
      "Design sur mesure : services, tarifs, photos, horaires",
      "SEO : être trouvé sur Google dès la mise en ligne",
      "Prise de rendez-vous par formulaire ou WhatsApp",
    ],
  },
  take: {
    tag: "Vous m'apportez",
    title: "Votre savoir-faire",
    items: [
      "Mes tresses, dans un cadre défini ensemble (fréquence, prestations)",
      "À partir de 50 € au lieu du tarif du marché",
      "Paiement en une ou deux fois, seulement si le site vous plaît",
    ],
  },
};

// ===== Le constat =====

export const constat = {
  heading: "LE CONSTAT",
  title:
    "Aujourd'hui, vos futurs clients vous cherchent. Et ne trouvent pas le détail de vos services.",
  items: [
    {
      n: "01",
      title: "Pas de présence digitale",
      text: [
        "Quand quelqu'un tape « tresses {lieu} » ou « salon afro {lieu} », ce sont les salons avec un site référencé qui apparaissent en premier. Les autres n'apparaissent que dans la carte Google Maps, classés surtout selon leurs avis.",
        "Quand quelqu'un demande à une IA « je veux faire des box braids à {lieu} », elle met en avant les salons qui ont un site : leurs services et leurs tarifs sont accessibles, elle peut donc les lire et les expliquer. Sans site, elle n'a que les avis, et vous recommande moins.",
      ],
    },
    {
      n: "02",
      title: "Des services et des tarifs pas clairs",
      text: [
        "Sans tarifs visibles, le client se pose la question… et préfère souvent aller là où il sait déjà combien il va payer.",
        "Il ne connaît pas non plus tous les services que vous proposez, et veut le savoir sans avoir à vous appeler ou à se déplacer.",
      ],
    },
    {
      n: "03",
      title: "Un seul moyen de vous joindre",
      text: [
        "Si le client doit appeler ou passer sur place, beaucoup ne le feront jamais.",
        "Un formulaire où il choisit sa prestation et le créneau qu'il préfère, ou un lien WhatsApp, suffit à transformer un curieux en rendez-vous.",
      ],
    },
  ],
};

// ===== Ce que vous gagnez =====

export const gains = {
  heading: "CE QUE VOUS GAGNEZ",
  title: "Un salon visible partout où vos clients cherchent.",
  items: [
    {
      tag: "Site web",
      title: "Une vitrine professionnelle",
      text: "Vos services, vos prix, vos photos et vos horaires réunis sur une page claire. Vos clientes arrivent déjà informées.",
    },
    {
      tag: "Réservation",
      title: "Des rendez-vous directs",
      text: "Formulaire ou WhatsApp intégré : la cliente choisit sa prestation et vous écrit en deux clics. Moins d'appels, plus de réservations.",
    },
    {
      tag: "SEO · Google",
      title: "Mieux placé sur Google",
      text: "Le référencement est travaillé dès la création. Un site met du temps à monter dans les résultats : commencer maintenant, c'est prendre de l'avance.",
    },
    {
      tag: "IA",
      title: "Lisible par les IA",
      text: "De plus en plus de gens demandent à ChatGPT ou Gemini où se faire coiffer. Ces outils s'appuient sur le contenu des sites web : un site clair avec vos services et vos tarifs leur donne de quoi vous citer, ce qu'une fiche avec seulement des avis ne permet pas.",
    },
  ],
};

// ===== Aperçu du site =====

export const mockup = {
  heading: "L'APERÇU",
  title: "Voilà à quoi pourrait ressembler votre site.",
  note: "Maquettes indicatives : votre première version utilisera vos vrais services, prix, couleurs et photos.",
  salon: "Votre Salon",
  services: [
    { name: "Box braids", price: "dès 80 €" },
    { name: "Knotless", price: "dès 150 €" },
    { name: "Cornrows", price: "dès 40 €" },
    { name: "Soins cheveux", price: "dès 25 €" },
  ],
  designs: [
    { id: "elegant", label: "Élégant" },
    { id: "vibrant", label: "Vibrant" },
    { id: "doux", label: "Doux" },
  ],
};

// ===== Comment ça marche =====

export const steps = {
  heading: "COMMENT ÇA MARCHE",
  title: "Vous voyez votre site avant de décider.",
  items: [
    {
      n: "1",
      title: "On se rencontre",
      text: "On fixe un rendez-vous : au salon (si vous êtes vraiment intéressée, je me déplace), en visio ou par téléphone. On parle de vos services, de vos couleurs et de ce que vous voulez mettre en avant.",
    },
    {
      n: "2",
      title: "Une première version sous 48 h",
      text: "Vous recevez un lien vers la version en ligne de votre site. Gratuit.",
    },
    {
      n: "3",
      title: "Vous décidez",
      text: "Il vous plaît ? On finalise. Sinon : aucune obligation, aucun frais.",
    },
    {
      n: "4",
      title: "Mise en ligne",
      text: "Votre site est publié, référencé, prêt à accueillir vos futurs clients.",
    },
  ],
};

// ===== Qui suis-je =====

export const profile = {
  heading: "QUI SUIS-JE ?",
  title: "Je m'appelle Abdo.",
  intro:
    "Je suis un jeune étudiant international en alternance, en ingénierie de l'intelligence artificielle. Je travaille également dans une startup.",
  about: {
    title: "Une petite idée sur moi",
    text: "Si je devais me décrire en quelques mots, je dirais que je suis ouvert d'esprit, curieux, toujours en train d'apprendre ou de découvrir quelque chose. Un peu nerd aussi : je développe des applications sur mon temps libre. Mes amis me décrivent généralement comme quelqu'un de chaleureux et drôle.",
  },
  photoAlt: "Abdo, en chemise claire, devant la mer",
  roles: "Étudiant en IA · Développeur · ",
  languages: ["Français", "English"],
  likes: {
    title: "Ce que j'aime",
    items: ["Voyager", "Les échecs", "Les animes", "Le cinéma", "La photographie", "Les startups & le business"],
    text: "En photo, j'aime surtout capturer les gens que j'aime, pas seulement des paysages. Les discussions sur les startups et le business, je pourrais en parler pendant des heures ! Et surtout, ne me demandez pas de planifier une sortie : les meilleurs moments sont souvent ceux qu'on n'avait pas prévus.",
  },
};

// ===== Les formules =====

export type Plan = {
  id: string;
  name: string;
  price: string;
  pricePrefix?: string;
  period: string;
  badge?: string;
  highlight?: boolean;
  pitch: string;
  give: string[];
  get: string[];
  note?: string;
  cta: string;
  message: string;
};

export const plans: {
  heading: string;
  title: string;
  intro: string;
  giveLabel: string;
  getLabel: string;
  items: Plan[];
} = {
  heading: "LES FORMULES",
  title: "Choisissez votre échange.",
  intro:
    "Dans chaque formule, c'est un échange : vous recevez un site, je reçois mes tresses. Plus vous êtes flexible sur les tresses, moins vous payez.",
  giveLabel: "Vous recevez",
  getLabel: "Je reçois",
  items: [
    {
      id: "echange",
      name: "Échange",
      price: "0 €",
      period: "places limitées",
      badge: "Places limitées",
      pitch: "Votre site contre plus de tresses.",
      give: [
        "Le site standard complet : design, SEO, configuration pour les IA",
        "Rendez-vous par formulaire ou WhatsApp",
        "Modifications de prix et de photos incluses",
      ],
      get: ["Mes tresses, jusqu'à 3 fois par mois (selon ce qu'on définit ensemble)"],
      note: "Premier arrivé, premier servi.",
      cta: "Réclamer l'offre",
      message: "Bonjour Abdo ! Je réclame l'offre Échange à 0 € (places limitées) pour mon salon à {lieu}. Est-ce qu'il reste une place ?",
    },
    {
      id: "annuel",
      name: "Annuel",
      price: "50 €",
      period: "par an",
      pitch: "Pour commencer petit.",
      give: [
        "Le site standard complet",
        "Rendez-vous par formulaire ou WhatsApp",
        "En ligne tant que la formule est renouvelée chaque année",
        "Modifications de prix et de photos incluses",
      ],
      get: ["50 € par an", "Mes tresses, dans un cadre défini ensemble"],
      note: "Après deux ans, vous aurez payé 150 €, mais la formule ne devient pas « à vie ».",
      cta: "Choisir l'Annuel",
      message: "Bonjour Abdo ! Je choisis la formule Annuel (50 € par an) pour mon salon à {lieu}. On en parle ?",
    },
    {
      id: "standard",
      name: "Standard",
      price: "150 €",
      period: "à vie",
      badge: "Recommandé",
      highlight: true,
      pitch: "Payé une fois, en ligne pour toujours.",
      give: [
        "Site sur mesure : services, tarifs, photos, horaires",
        "SEO et configuration pour les IA",
        "Rendez-vous par formulaire ou WhatsApp",
        "Modifications de prix et de photos gratuites, pour toujours",
      ],
      get: ["150 €, en une ou deux fois", "Mes tresses, dans un cadre défini ensemble"],
      cta: "Choisir le Standard",
      message: "Bonjour Abdo ! Je choisis la formule Standard (150 €, à vie) pour mon salon à {lieu}. On en parle ?",
    },
    {
      id: "sur-mesure",
      name: "Sur mesure",
      price: "150 à 400 €",
      period: "selon les options",
      pitch: "Le Standard, avec plus de services et un design plus poussé.",
      give: [
        "Tout ce qu'il y a dans le Standard",
        "Design plus travaillé, animations",
        "Galerie photos, avis clients, plusieurs langues",
        "Réservation avancée avec choix des créneaux",
      ],
      get: ["150 à 400 €, selon les options choisies", "Mes tresses, dans un cadre défini ensemble"],
      cta: "Choisir le Sur mesure",
      message: "Bonjour Abdo ! Je suis intéressé(e) par la formule Sur mesure (150 à 400 €) pour mon salon à {lieu}. On peut parler des options ?",
    },
    {
      id: "application",
      name: "Application complète",
      price: "1 400 €",
      pricePrefix: "dès",
      period: "sur devis",
      pitch: "Un vrai outil pour gérer votre salon au quotidien.",
      give: [
        "Réservation en ligne avec agenda et rappels automatiques",
        "Comptes clients, historique, fidélité",
        "Paiement en ligne et acomptes",
        "Espace de gestion pour vous et votre équipe",
      ],
      get: ["À partir de 1 400 €, sur devis", "Mes tresses, dans un cadre défini ensemble"],
      cta: "Demander un devis",
      message: "Bonjour Abdo ! Je suis intéressé(e) par une application complète pour mon salon à {lieu}. Est-ce qu'on peut en parler pour un devis ?",
    },
  ],
};

// ===== FAQ =====

export const faq = {
  heading: "QUESTIONS FRÉQUENTES",
  items: [
    {
      id: "seo",
      q: "C'est quoi, le SEO ?",
      a: [
        "Le SEO (référencement naturel), c'est tout le travail qui permet à Google de comprendre votre site et de le montrer quand quelqu'un cherche « salon afro {lieu} » ou « box braids près de moi ».",
        "C'est la partie la plus importante : un beau site que personne ne trouve ne sert à rien. C'est aussi souvent la plus chère. Chez une agence, le référencement coûte généralement plus que le site lui-même, et se paie souvent tous les mois.",
        "Ce même travail (un contenu clair, des services et des tarifs bien structurés, des informations lisibles par les machines) permet aussi aux IA comme ChatGPT ou Gemini de trouver votre salon et de le recommander quand on leur demande conseil. Ici, tout ça est inclus dès la création, sans supplément.",
      ],
    },
    {
      id: "pourquoi-pas-0",
      q: "Pourquoi « à partir de 50 € » et pas 0 ?",
      a: [
        "Vous vous demandez peut-être pourquoi c'est une collaboration si vous payez quand même. Avec la formule Standard (150 €), votre site reste en ligne et fonctionnel pendant toutes les années qui suivent, même quand je ne viens plus me faire tresser. Un prix à changer, une photo à remplacer ? Je suis toujours là pour le faire, gratuitement.",
        "Faites le calcul : vous payez une fois pour un service qui fonctionne pour toujours. 150 € divisés par un nombre d'années qui ne fait que grandir, ça tend vers… presque zéro. Donc techniquement, c'est gratuit. (Hahaha, j'espère que cet argument va vous convaincre.)",
        "Et si vous tenez vraiment au 0 €, c'est possible aussi : voir la question juste en dessous.",
      ],
    },
    {
      id: "zero",
      q: "Possible de le faire à 0 € ?",
      a: [
        "Oui, avec une offre à places limitées. Tout dépend du nombre de fois où je peux venir me faire tresser par mois : plus vous êtes flexible, plus le prix baisse, jusqu'à être gratuit.",
        "Je ne veux pas abuser (haha) : le maximum, c'est 3 fois par mois. Premier arrivé, premier servi.",
      ],
    },
    {
      id: "cinquante",
      q: "Je veux payer juste 50 € ?",
      a: [
        "Oui, c'est possible. Mais 50 €, c'est pour un an : il faut renouveler chaque année pour garder le site en ligne. Les 150 €, c'est pour la vie.",
        "Attention : après deux ans à 50 €, vous aurez payé 150 €, mais ça ne devient pas « à vie » pour autant.",
      ],
    },
    {
      id: "paiement",
      q: "Comment se passe le paiement ?",
      a: [
        "En une seule fois, ou en deux fois selon votre situation. Et seulement si le site vous plaît : vous ne payez rien avant d'avoir vu et validé la première version.",
      ],
    },
    {
      id: "tresses",
      q: "Les tresses, ça veut dire quoi concrètement ?",
      a: [
        "On définit ensemble les limites au moment de la collaboration : fréquence, types de prestations. L'idée n'est pas d'abuser, c'est un échange équitable entre deux professionnels.",
      ],
    },
    {
      id: "premiere-version",
      q: "Et si la première version ne me plaît pas ?",
      a: ["On s'arrête là, il n'y a rien à payer. La première version est sans engagement."],
    },
    {
      id: "modifier",
      q: "Je pourrai modifier mes prix plus tard ?",
      a: [
        "Oui : un simple message suffit. Les modifications de prix et de photos sont gratuites, une refonte complète se discute.",
      ],
    },
    {
      id: "maintenance",
      q: "Qui s'occupe de la maintenance ?",
      a: [
        "Le site est livré autonome et tourne tout seul. Je reste joignable en cas de problème technique.",
      ],
    },
  ],
};
