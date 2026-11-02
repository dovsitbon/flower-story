// Prépare les photos classées dans assets/<catégorie>/ pour le web :
// public/media/<catégorie>/<nom>.jpg (côté long 1800 px max, 2400 pour le hero).
// next/image sert ensuite des variantes AVIF/WebP à la bonne taille.
//   npm run media
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const CATS = ["hero", "roses", "bouquets", "bouquets-ballons", "coffrets", "desserts", "coeurs-compositions", "ballons", "baby", "evenements"];

let n = 0;
for (const cat of CATS) {
  const src = path.join(ROOT, "assets", cat);
  const out = path.join(ROOT, "public/media", cat);
  await mkdir(out, { recursive: true });
  const files = (await readdir(src).catch(() => [])).filter((f) => /\.jpe?g$/i.test(f));
  const max = cat === "hero" ? 2400 : 1800;
  for (const f of files) {
    await sharp(path.join(src, f))
      .rotate()
      .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(out, f.replace(/\.jpe?g$/i, ".jpg")));
    n += 1;
  }
}

// Image Open Graph 1200x630 (bouquet de roses rouges)
await sharp(path.join(ROOT, "assets/hero/hero-027.jpg"))
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));

console.log(`${n} images prêtes`);
