// Télécharge les médias Instagram listés dans un JSON { list: [{id,i,video,url,vurl}], caps }
// (liste extraite depuis le navigateur, Instagram refusant les requêtes serveur)
// vers ~/Downloads/flowerstory_NNN_<shortcode>[_video-cover].jpg
//   node scripts/fetch-instagram.mjs <liste.json>
import { readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const OUT = path.join(os.homedir(), "Downloads");
const { list, caps } = JSON.parse(await readFile(process.argv[2], "utf8"));

let n = 0;
for (const it of list) {
  n += 1;
  const name = `flowerstory_${String(n).padStart(3, "0")}_${it.id}${it.video ? "_video-cover" : ""}.jpg`;
  const res = await fetch(it.url);
  if (!res.ok) { console.warn(`${name}: HTTP ${res.status}`); continue; }
  await writeFile(path.join(OUT, name), Buffer.from(await res.arrayBuffer()));
  if (it.video && it.vurl) {
    const v = await fetch(it.vurl);
    if (v.ok) await writeFile(path.join(OUT, name.replace("_video-cover.jpg", "_video.mp4")), Buffer.from(await v.arrayBuffer()));
    else console.warn(`${name} vidéo: HTTP ${v.status}`);
  }
}
await writeFile(path.join(OUT, "flowerstory_captions.json"), JSON.stringify(caps, null, 2));
console.log(`Total : ${n}`);
