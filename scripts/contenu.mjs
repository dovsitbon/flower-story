// Génère CONTENU.md : infos manquantes, tous les textes (he/en/fr/es) et le catalogue.
//   npm run contenu
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LANGS = ["he", "en", "fr", "es"];
const json = async (p) => JSON.parse(await readFile(path.join(ROOT, p), "utf8"));
const loc = Object.fromEntries(await Promise.all(LANGS.map(async (l) => [l, await json(`locales/${l}.json`)])));
const cat = await json("data/products.json");
const site = await json("data/site.json");

const MISSING = [
  "Prix réels de chaque création, des options (taille, nombre de roses…) et des suppléments → `data/products.json`, puis passer `pricesConfirmed` à `true`.",
  "Adresse du studio (retrait) et horaires d'ouverture précis → `data/site.json` (`address`, `hours`).",
  "Zones de livraison réelles et frais par zone → `data/products.json` › `delivery.zones`.",
  "Délai minimum de commande (24 h par défaut), créneaux de livraison, livraison le jour même ou non.",
  "Jours fériés bloqués (veilles de fête comprises ?) → `delivery.blockedDates` (liste 2027 à vérifier).",
  "Solution de paiement en ligne choisie : Cardcom, Tranzila, Grow (Meshulam) ou Stripe, avec ses clés.",
  "Numéro d'entreprise (ח.פ / עוסק מורשה) et mentions légales, conditions de vente et de remboursement.",
  "E-mail de Shir pour les notifications de commande + compte Resend (domaine d'envoi vérifié).",
  "Vrais avis clients (avec accord) → `data/reviews.json` (la section reste masquée tant qu'elle est vide).",
  "Logo officiel en vectoriel : le portrait montre un logo au mur du studio (« Flower Story Boutique · Premium Flowers »). Le logo typographique actuel (`public/logo.svg`, `public/logo-he.svg`) est provisoire.",
  "Stock réel des éditions limitées (`stock` dans `products.json`, mis à jour à la main).",
  "Photos manquantes : gâteaux en fleurs (עוגת פרחים), coffrets naissance (une seule photo), événements et ateliers (aucune), desserts en gros plan.",
  "Nom de domaine souhaité (ex. flowerstory.co.il) pour remplacer l'adresse Vercel.",
  "Validation des textes en hébreu par Shir (ton, formulations) et accord sur l'usage de son portrait.",
];

const flat = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) return flat(v, key);
    if (Array.isArray(v)) return v.flatMap((item, i) => (item && typeof item === "object" ? flat(item, `${key}.${i}`) : [[`${key}.${i}`, item]]));
    return [[key, v]];
  });

const get = (obj, key) => key.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);

let md = `# Flower Story Boutique – contenu du site\n\n`;
md += `Généré par \`npm run contenu\` à partir de \`locales/*.json\` et \`data/products.json\`. Pour modifier un texte, éditer ces fichiers (pas ce document).\n\n`;
md += `Contact affiché : WhatsApp ${site.phoneDisplay} · Instagram ${site.instagramHandle}\n\n`;
md += `## Informations à demander à Shir\n\n${MISSING.map((m, i) => `${i + 1}. ${m}`).join("\n")}\n\n`;

md += `## Textes du site (4 langues)\n\n`;
let section = "";
for (const [key] of flat(loc.he)) {
  if (key.startsWith("lang.")) continue;
  const top = key.split(".")[0];
  if (top !== section) {
    section = top;
    md += `### ${section}\n\n`;
  }
  const vals = LANGS.map((l) => get(loc[l], key));
  if (vals.every((v) => v === "" || v == null)) continue;
  md += `**${key}**\n\n${LANGS.map((l, i) => `- ${l.toUpperCase()} : ${vals[i] === "" ? "_(vide)_" : vals[i]}`).join("\n")}\n\n`;
}

md += `## Catalogue\n\n`;
md += `> Prix d'exemple, à remplir (\`pricesConfirmed: ${cat.pricesConfirmed}\` : les prix ne sont pas affichés sur le site).\n\n`;
for (const c of cat.categories) {
  const items = cat.products.filter((p) => p.category === c.id);
  if (!items.length) continue;
  md += `### ${c.name.he} · ${c.name.fr}\n\n`;
  for (const p of items) {
    md += `#### ${p.name.he} / ${p.name.en} / ${p.name.fr} / ${p.name.es}\n\n`;
    md += `- Identifiant : \`${p.id}\` · à partir de ${p.priceFrom} ₪ (À REMPLIR)${p.stock !== null ? ` · stock : ${p.stock} (À REMPLIR)` : ""}\n`;
    md += `- Occasions : ${p.occasions.map((o) => cat.occasions.find((x) => x.id === o)?.name.fr).join(", ")}\n`;
    md += `- Options : ${p.options.map((o) => o.id).join(", ") || "aucune"}${p.personalWord ? " · mot personnalisé" : ""}\n`;
    md += `- Photos : ${p.images.map((i) => `\`${i}\``).join(", ")}\n`;
    for (const l of LANGS) md += `- ${l.toUpperCase()} : ${p.description[l]}\n`;
    md += `\n`;
  }
}
md += `### Suppléments\n\n${cat.addons.map((a) => `- ${a.name.he} / ${a.name.fr} : ${a.price} ₪ (À REMPLIR)`).join("\n")}\n\n`;
md += `### Livraison\n\n${cat.delivery.zones.map((z) => `- ${z.name.he} / ${z.name.fr} : ${z.fee ?? "sur demande"} ₪ (À REMPLIR)`).join("\n")}\n`;
md += `- Délai minimum : ${cat.delivery.minLeadHours} h · fermé : samedi · créneaux : ${cat.delivery.slots.join(", ")} (vendredi : ${cat.delivery.fridaySlots.join(", ")})\n`;

await writeFile(path.join(ROOT, "CONTENU.md"), md);
console.log("CONTENU.md généré");
