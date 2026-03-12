"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const sectors = [
  {
    title: "FinTech & Wealth",
    desc: "Secure, compliant, and lightning-fast financial interfaces.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Dark fintech data visualization",
  },
  {
    title: "SaaS & Infrastructure",
    desc: "Complex data visualizations and user management at scale.",
    image:
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Enterprise cloud infrastructure servers",
  },
  {
    title: "Luxury E-commerce",
    desc: "High-fidelity brand storytelling through immersive digital experiences.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Luxury retail interior in dark mood",
  },
];

export default function Sectors() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section
      className="py-32 bg-sphere-gray border-y border-sphere-border"
      id="architecture"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
              Tailored for High-Growth Sectors
            </h2>
            <p className="text-zinc-400 font-light text-lg mb-10">
              We specialize in industries where precision is non-negotiable and
              scale is a requirement.
            </p>

            <div className="space-y-6">
              {sectors.map((sector, index) => {
                const isSelected = selectedIndex === index;

                return (
                <div
                  key={sector.title}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onFocus={() => setSelectedIndex(index)}
                  tabIndex={0}
                  className={`group p-6 border-l-2 transition-all duration-500 ease-out cursor-pointer focus:outline-none ${
                    isSelected
                      ? "border-sphere-accent bg-sphere-black/40"
                      : "border-transparent"
                  }`}
                >
                  <div className={`transition-transform duration-300 ease-out ${isSelected ? "translate-x-2" : "translate-x-0"}`}>
                    <h4 className="font-medium text-white mb-2">{sector.title}</h4>
                    <p className={`text-sm transition-colors duration-300 ease-out ${isSelected ? "text-zinc-400" : "text-zinc-500"}`}>{sector.desc}</p>
                  </div>
                </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column — Abstract Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative group"
          >
            <div className="aspect-square bg-gradient-to-br from-zinc-900 to-black border border-sphere-border relative overflow-hidden flex items-center justify-center">
              {sectors.map((sector, index) => (
                <Image
                  key={sector.title}
                  src={sector.image}
                  alt={sector.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover grayscale transition-all duration-700 ease-out ${
                    selectedIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-sphere-black/55" />
              <svg
                className="w-64 h-64 text-sphere-accent/5 opacity-50 group-hover:scale-110 transition-transform duration-700 ease-out"
                viewBox="0 0 200 200"
              >
                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.5" />
                <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.5" />
              </svg>
              <div className="absolute inset-0 gradient-glow pointer-events-none" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-sphere-accent text-sphere-black px-6 py-4 text-xs font-bold tracking-widest uppercase">
              EST. 2024
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
