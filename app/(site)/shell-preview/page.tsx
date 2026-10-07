import { createPageMetadata } from "@/lib/seo/metadata";
export const metadata = { ...createPageMetadata({ title: "Shell Preview | Africhem Globalz", description: "Temporary navigation and website shell review.", path: "/shell-preview" }), robots: { index: false, follow: false } };
const sections = ["01", "02", "03"] as const;

export default function ShellPreview() {
  return (
    <>
      <section
        className="full-site-container"
        style={{ minHeight: "70vh", paddingBlock: "clamp(5rem, 10vw, 9rem)" }}
      >
        <p style={{ margin: 0, fontSize: "0.75rem", letterSpacing: "0.16em" }}>
          AFRICHEM GLOBALZ
        </p>
        <h1
          style={{
            maxWidth: "16ch",
            margin: "1.5rem 0",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 550,
            lineHeight: 1.1,
          }}
        >
          Phase 2 Shell Preview
        </h1>
        <p style={{ maxWidth: "42rem", margin: 0, color: "var(--text-muted)", lineHeight: 1.6 }}>
          Navigation, loader, mobile menu, page transitions and footer are being
          reviewed before homepage development.
        </p>
      </section>

      {sections.map((number) => (
        <section
          key={number}
          className="full-site-container"
          aria-labelledby={`preview-section-${number}`}
          style={{ minHeight: "65vh", paddingBlock: "5rem", borderTop: "1px solid var(--border-subtle)" }}
        >
          <h2 id={`preview-section-${number}`} style={{ margin: 0, fontSize: "1.5rem", fontWeight: 500 }}>
            Section {number}
          </h2>
        </section>
      ))}
    </>
  );
}
