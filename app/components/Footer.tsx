"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const companyLinks = [
  { label: "Our Ethos", href: "#" },
  { label: "Architecture", href: "#architecture" },
  { label: "Case Studies", href: "#cases" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "X (Twitter)", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Dribbble", href: "#" },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className="bg-sphere-black border-t border-sphere-border py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-8">
              <Image
                src="/logo.png"
                alt="SiteSphere logo"
                width={180}
                height={48}
                className="h-10 w-auto"
              />
            </div>
            <h5 className="font-serif text-3xl max-w-sm mb-8 font-light">
              Let&apos;s build the next generation of digital.
            </h5>
            <p className="text-zinc-500 text-sm">hello@sitesphere.tech</p>
          </div>

          {/* Company Links */}
          <div>
            <h6 className="text-xs uppercase tracking-[0.2em] text-zinc-300 mb-8">
              Company
            </h6>
            <ul className="space-y-4 text-sm text-zinc-500">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-all duration-300 ease-out"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h6 className="text-xs uppercase tracking-[0.2em] text-zinc-300 mb-8">
              Social
            </h6>
            <ul className="space-y-4 text-sm text-zinc-500">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-all duration-300 ease-out"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-sphere-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-xs">
            © 2024 SiteSphere Studio. All rights reserved.
          </p>
          <div className="flex space-x-8 text-xs text-zinc-600 uppercase tracking-widest">
            <a href="#" className="hover:text-zinc-400 transition-all duration-300 ease-out">
              Privacy
            </a>
            <a href="#" className="hover:text-zinc-400 transition-all duration-300 ease-out">
              Terms
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
