import Image from "next/image";
import { socialLinks } from "@/lib/socials";

const whatsapp = socialLinks.find((link) => link.icon === "whatsapp");

export function FloatingWhatsApp() {
  if (!whatsapp) return null;
  return <a className="floating-whatsapp" href={whatsapp.href} aria-label={whatsapp.label} target="_blank" rel="noopener noreferrer">
    <Image src="/whatsapp-logo.png" width={300} height={300} alt="" aria-hidden="true" />
    <span className="floating-whatsapp-label" aria-hidden="true">Chat with us</span>
  </a>;
}
