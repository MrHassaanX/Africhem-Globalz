import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteLink } from "@/components/QuoteLink";
import { getBusiness } from "@/lib/businesses";
import styles from "../businesses.module.css";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getBusiness(slug);
  return data?.status === "documented" ? { title: data.name, description: data.description, alternates: { canonical: `/other-businesses/${slug}` } } : {};
}

export default async function BusinessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getBusiness(slug);
  if (!data || data.status !== "documented") notFound();

  return (
    <article className="revision-page other-businesses-revision">
      <header className={`revision-hero wrap ${styles.detail}`}>
        <div className={styles.detailCopy}>
          <Link className={`text-arrow ${styles.detailBack}`} href={`/other-businesses#${data.slug}`}>
            <span aria-hidden="true">←</span> Other Businesses and Partners
          </Link>
          <h1>{data.name}</h1>
          <p className="revision-lead">{data.description}</p>
          <ul className={`business-card-features ${styles.features}`} role="list">
            {data.features.map(feature => <li key={feature}>{feature}</li>)}
          </ul>
          <QuoteLink category={data.slug} />
        </div>
        <div className={styles.detailArt}>
          <Image src={data.image} alt="" fill sizes="(max-width: 767px) 91vw, (max-width: 1600px) 46vw, 730px" />
        </div>
      </header>
    </article>
  );
}
