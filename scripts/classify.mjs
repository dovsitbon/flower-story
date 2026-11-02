// Copie la sélection de assets/raw/ vers assets/<catégorie>/ (noms courts et stables)
import { copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const RAW = path.join(ROOT, "assets/raw");

const PICKS = {
  hero: ["027", "063", "001", "077"],
  roses: ["021", "022", "023", "024", "027", "028", "029", "030", "054", "056", "057", "059", "061", "072", "073", "075", "077", "078", "085"],
  bouquets: ["005", "007", "008", "009", "062"],
  "bouquets-ballons": ["001", "002", "003", "004", "006", "010", "033", "037", "043", "046", "047", "049", "050", "064", "066", "068", "086", "089", "090", "091", "093", "096"],
  coffrets: ["039", "042", "080", "087"],
  desserts: ["011", "012", "014", "017", "018"],
  "coeurs-compositions": ["038", "040", "041", "069", "070", "071", "081", "082", "084", "088"],
  ballons: ["015", "016", "019", "020", "025", "026"],
  baby: ["031"],
  evenements: [],
};

const files = await readdir(RAW);
for (const [cat, nums] of Object.entries(PICKS)) {
  const dir = path.join(ROOT, "assets", cat);
  await mkdir(dir, { recursive: true });
  for (const num of nums) {
    const f = files.find((x) => x.startsWith(`flowerstory_${num}_`) && x.endsWith(".jpg"));
    if (!f) { console.warn(`${cat}: ${num} introuvable`); continue; }
    await copyFile(path.join(RAW, f), path.join(dir, `${cat}-${num}.jpg`));
  }
}
await copyFile(path.join(RAW, "flowerstory_photo-profil.jpg"), path.join(ROOT, "assets/hero/shir-portrait.jpg"));
console.log("ok");
