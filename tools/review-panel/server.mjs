import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { randomBytes } from "node:crypto";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const editsFile = join(root, "app/products/review-edits.json");
const imageSlotsFile = join(root, "lib/site-image-slots.json");
const imageEditsFile = join(root, "lib/site-image-edits.json");
const publicDir = join(root, "public");
const uploadDir = join(publicDir, "review-images");
const panelFile = join(root, "tools/review-panel/index.html");
const port = Number(process.env.REVIEW_PANEL_PORT || 3182);
const token = randomBytes(24).toString("hex");
const source = await readFile(join(root, "app/products/product-presentations.ts"), "utf8");
const names = [...source.matchAll(/^  ("(?:[^"\\]|\\.)+"|[A-Za-z][A-Za-z0-9]*): \{ description:/gm)]
  .map(match => match[1].startsWith('"') ? JSON.parse(match[1]) : match[1]);
const defaults = Object.fromEntries([...source.matchAll(/^  ("(?:[^"\\]|\\.)+"|[A-Za-z][A-Za-z0-9]*): \{ description: ("(?:[^"\\]|\\.)+"), image: (\w+) \},?$/gm)]
  .map(match => [match[1].startsWith('"') ? JSON.parse(match[1]) : match[1], { description: JSON.parse(match[2]), image: ({ polymers: "/materials/mineral-crystal.webp", fuels: "/stock/industrial-tanks-sunset.webp", coatings: "/materials/chemical-transfer.webp", solvents: "/materials/liquid-glass.webp", industrial: "/materials/industrial-fluid.webp", transfer: "/materials/chemical-transfer.webp", refinery: "/stock/industrial-refinery.webp", port: "/stock/port-logistics.webp" })[match[3]] }]));
if (names.length !== Object.keys(defaults).length) throw new Error("Could not load all product cards.");
const imageSlots = JSON.parse(await readFile(imageSlotsFile, "utf8"));
const validImage = path => typeof path === "string" && /^\/(materials|stock|partners|review-images)\/[a-zA-Z0-9._-]+\.(webp|png|jpe?g)$/.test(path);

async function edits() { return JSON.parse(await readFile(editsFile, "utf8")); }
function send(res, status, value) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  res.end(JSON.stringify(value));
}
async function body(req, max = 5_000_000) {
  const chunks = []; let size = 0;
  for await (const chunk of req) { size += chunk.length; if (size > max) throw new Error("File or request is too large."); chunks.push(chunk); }
  return Buffer.concat(chunks);
}
const server = createServer(async (req, res) => {
  try {
    const host = req.headers.host;
    if (![`127.0.0.1:${port}`, `localhost:${port}`].includes(host)) return send(res, 403, { error: "Local access only." });
    const url = new URL(req.url, `http://${host}`);
    if (req.method === "GET" && url.pathname === "/") {
      const html = (await readFile(panelFile, "utf8")).replace("__PANEL_TOKEN__", token);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "Content-Security-Policy": "default-src 'self'; img-src 'self' http://localhost:3181 http://localhost:3000 data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'" });
      return res.end(html);
    }
    if (req.method === "GET" && url.pathname === "/api/products") { const current = await edits(); return send(res, 200, { products: names.map(name => ({ name, ...defaults[name], ...current[name] })) }); }
    if (req.method === "GET" && url.pathname === "/api/images") { const current = JSON.parse(await readFile(imageEditsFile, "utf8")); return send(res, 200, { images: imageSlots.map(slot => ({ ...slot, image: current[slot.key] ?? slot.image })) }); }
    if (req.method === "GET" && url.pathname.startsWith("/image/")) {
      const path = url.pathname.slice(6);
      if (!validImage(path)) return send(res, 404, { error: "Image not found." });
      const file = await readFile(join(publicDir, path));
      res.writeHead(200, { "Content-Type": path.endsWith(".png") ? "image/png" : path.endsWith(".webp") ? "image/webp" : "image/jpeg", "Cache-Control": "no-store" }); return res.end(file);
    }
    if (req.method === "POST" && ["/api/products", "/api/images", "/api/upload"].includes(url.pathname)) {
      if (req.headers.origin !== `http://${host}` || req.headers["x-panel-token"] !== token) return send(res, 403, { error: "Invalid panel request." });
      if (url.pathname === "/api/products") {
        const data = JSON.parse((await body(req, 100_000)).toString());
        if (!names.includes(data.name) || typeof data.description !== "string" || data.description.trim().length < 8 || data.description.length > 300 || !validImage(data.image)) return send(res, 400, { error: "Enter a valid description and image." });
        await readFile(join(publicDir, data.image));
        const current = await edits(); current[data.name] = { description: data.description.trim(), image: data.image };
        await writeFile(editsFile, JSON.stringify(current, null, 2) + "\n");
        return send(res, 200, { saved: true });
      }
      if (url.pathname === "/api/images") {
        const data = JSON.parse((await body(req, 20_000)).toString());
        if (!imageSlots.some(slot => slot.key === data.key) || !validImage(data.image)) return send(res, 400, { error: "Select a listed image placement and valid image." });
        await readFile(join(publicDir, data.image));
        const current = JSON.parse(await readFile(imageEditsFile, "utf8")); current[data.key] = data.image;
        await writeFile(imageEditsFile, JSON.stringify(current, null, 2) + "\n");
        return send(res, 200, { saved: true });
      }
      const type = req.headers["content-type"];
      const ext = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" }[type];
      if (!ext) return send(res, 400, { error: "Use PNG, JPEG, or WebP." });
      const file = await body(req);
      const valid = ext === "png" ? file.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) : ext === "jpg" ? file[0] === 255 && file[1] === 216 : file.toString("ascii", 0, 4) === "RIFF" && file.toString("ascii", 8, 12) === "WEBP";
      if (!valid) return send(res, 400, { error: "Invalid image file." });
      await mkdir(uploadDir, { recursive: true });
      const name = `${randomBytes(10).toString("hex")}.${ext}`;
      await writeFile(join(uploadDir, name), file, { flag: "wx" });
      return send(res, 200, { image: `/review-images/${name}` });
    }
    send(res, 404, { error: "Not found." });
  } catch (error) { send(res, error.code === "ENOENT" ? 404 : 400, { error: error.message }); }
});
server.listen(port, "127.0.0.1", () => console.log(`Review panel: http://127.0.0.1:${port}`));
