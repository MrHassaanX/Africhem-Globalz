import { ImageResponse } from "next/og";
import { logoDataUrl } from "@/lib/seo/brand-image";
export const alt = "Africhem Globalz — Sourcing Simplified. Chemical sourcing, trading and distribution.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage() {
  const src = await logoDataUrl();
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#f4efe6", padding: 60 }}>
    <div style={{ display: "flex", justifyContent: "space-between", color: "#0b1f33", fontSize: 15, letterSpacing: 3 }}><span>AFRICHEM GLOBALZ</span><span>SOURCING SIMPLIFIED</span></div>
    <div style={{ display: "flex", height: 310, width: 1080, position: "relative", overflow: "hidden", marginTop: 35, background: "#fff" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="Africhem Globalz — Sourcing Simplified" src={src} width={1080} height={1080 * 957 / 1644} style={{ position: "absolute", top: -135, left: 0 }} />
    </div>
    <div style={{ display: "flex", flex: 1, alignItems: "flex-end", justifyContent: "space-between", color: "#0b1f33" }}><span style={{ fontSize: 30, maxWidth: 650 }}>Chemical sourcing. Trading. Distribution.</span><span style={{ fontSize: 18 }}>africhem-globalz.com</span></div>
    <div style={{ position: "absolute", display: "flex", height: 12, bottom: 0, left: 0, right: 0, background: "linear-gradient(90deg,#081c48,#009d9b,#78d43e)" }} />
  </div>, size);
}
