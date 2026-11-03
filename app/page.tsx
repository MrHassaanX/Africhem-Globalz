import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Africhem Globalz — Sourcing Simplified",
  description: "International chemical sourcing across six categories, with quotation enquiries based on material, specification, quantity and destination.",
  alternates: { canonical: "/" },
};

export default function Page() { return <HomePage />; }
