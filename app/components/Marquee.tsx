"use client";

import { motion } from "framer-motion";

const words = ["MODERNISM", "SCALABILITY", "FIDELITY", "PRECISION", "INNOVATION"];

export default function Marquee() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
      className="py-20 border-y border-sphere-border overflow-hidden"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {/* First set */}
        <div className="flex space-x-20 px-10">
          {words.map((word) => (
            <span key={word} className="font-serif text-3xl text-zinc-700">
              {word}
            </span>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex space-x-20 px-10">
          {words.map((word) => (
            <span key={`dup-${word}`} className="font-serif text-3xl text-zinc-700">
              {word}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
