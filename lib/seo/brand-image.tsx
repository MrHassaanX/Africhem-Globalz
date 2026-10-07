import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export async function logoDataUrl() {
  const logo = await readFile(join(process.cwd(), "assets/brand/africhem-original.png"));
  return `data:image/png;base64,${logo.toString("base64")}`;
}

export async function brandIcon(size: number) {
  const src = await logoDataUrl();
  const ratio = size / 64;
  // A viewport over the supplied A mark, with its original pixels/proportions.
  // The underlying brand artwork is neither traced nor redesigned.
  return new ImageResponse(<div style={{ width: size, height: size, display: "flex", background: "#fff", overflow: "hidden", position: "relative" }}>
    {/* ImageResponse requires an HTML image, not next/image. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img alt="" src={src} width={420 * ratio} height={420 * 957 / 1644 * ratio} style={{ position: "absolute", width: 420 * ratio, maxWidth: 420 * ratio, left: -40 * ratio, top: -59 * ratio }} />
  </div>, { width: size, height: size });
}
