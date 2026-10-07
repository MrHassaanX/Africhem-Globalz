import { PageTransition } from "@/components/motion/PageTransition";

export default function SiteTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PageTransition>{children}</PageTransition>;
}
