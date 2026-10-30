export const WHATSAPP_NUMBER = "923155741347";
export const CONTACT_EMAIL = "hello@sitesphere.tech";

export function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Engagements", href: "#engagements" },
  { label: "FAQ", href: "#faq" },
];
