import Image from "next/image";
import { CONTACT_EMAIL, navLinks, whatsappHref } from "@/app/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink pb-10 text-paper">
      <div className="mx-auto max-w-[76rem] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 border-t border-night-line pt-14 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[24rem]">
            <Image src="/logo-mark.png" alt="SiteSphere" width={1040} height={225} className="h-9 w-auto" />
            <p className="mt-5 text-paper/60">
              Websites, local SEO and Google Business Profile management for
              businesses that serve their neighbourhood.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-16 gap-y-3 text-paper/70 sm:grid-cols-3">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-paper">
                {link.label}
              </a>
            ))}
            <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-paper">
              Email
            </a>
            <a
              href={whatsappHref("Hello SiteSphere!")}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-paper"
            >
              WhatsApp
            </a>
          </nav>
        </div>

        <p className="mt-16 text-sm text-paper/45">
          © {new Date().getFullYear()} SiteSphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
