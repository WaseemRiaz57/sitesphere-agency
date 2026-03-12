"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Architecture", href: "#architecture" },
  { label: "Case Studies", href: "#cases" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 w-full z-40 glass-nav"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section - Image Size Forcibly Increased */}
        <a href="#" className="flex items-center py-2">
          <Image
            src="/logo.png"
            alt="SiteSphere logo"
            width={1000} 
            height={300}
            // Yahan w-[200px] aur md:w-[300px] laga kar image ko zabardasti bara kiya gaya hai
            className="w-[180px] sm:w-[220px] md:w-[280px] h-auto object-contain transition-all duration-300"
            priority
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-12 text-sm uppercase tracking-widest text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative hover:text-zinc-100 transition-all duration-300 ease-out"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-zinc-100 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-block px-6 py-2 border border-sphere-accent text-sphere-accent text-sm hover:bg-sphere-accent hover:text-sphere-black transition-all duration-300 ease-out"
          >
            Inquire
          </a>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden relative z-50 text-sphere-accent"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden absolute top-20 left-0 w-full overflow-hidden bg-[#0a0a0a]/98 backdrop-blur-xl border-t border-white/5"
          >
            <div className="flex flex-col items-center gap-8 py-12">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="text-lg uppercase tracking-widest text-zinc-300 hover:text-white transition-all duration-300 ease-out"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.3 }}
                className="px-8 py-3 border border-sphere-accent text-sphere-accent text-sm hover:bg-sphere-accent hover:text-sphere-black transition-all duration-300 ease-out mt-4"
              >
                Inquire
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}