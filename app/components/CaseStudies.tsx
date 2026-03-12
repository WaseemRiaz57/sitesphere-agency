"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const cases = [
  {
    tag: "FinTech",
    title: "Fintech Global",
    desc: "Next-generation asset management platform with real-time data streaming and biometric security integration.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80",
  },
  {
    tag: "Luxury",
    title: "LuxRetail",
    desc: "Immersive 3D shopping experience for a global luxury fashion house, reducing bounce rates by 45%.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80",
  },
  {
    tag: "HealthTech",
    title: "HealthSync",
    desc: "Highly-compliant telemedicine infrastructure supporting millions of secure patient-provider interactions.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

export default function CaseStudies() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto" id="cases">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <h2 className="font-serif text-4xl mb-4">Proven Architectures</h2>
        <p className="text-zinc-500 font-light">
          Real-world applications of our digital principles.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cases.map((c, i) => (
          <motion.div
            key={c.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="group cursor-pointer overflow-hidden border border-sphere-border p-4 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/20"
          >
            <div className="aspect-[4/5] bg-sphere-gray border border-sphere-border mb-6 overflow-hidden relative">
              <Image
                src={c.image}
                alt={c.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/80 group-hover:from-black/20 group-hover:via-black/45 group-hover:to-black/90 transition-all duration-700 ease-out" />
              <div className="absolute bottom-6 left-6 transition-transform duration-500 ease-out group-hover:-translate-y-2">
                <p className="text-[10px] tracking-[0.2em] uppercase text-sphere-accent/70 mb-2">
                  {c.tag}
                </p>
                <h3 className="font-serif text-2xl text-white">{c.title}</h3>
              </div>
            </div>
            <p className="text-zinc-500 transition-all duration-500 ease-out text-sm font-light leading-relaxed group-hover:text-zinc-300">
              {c.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
