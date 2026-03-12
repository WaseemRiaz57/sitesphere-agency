"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <Image
          src="https://images.unsplash.com/photo-1463438690606-f6778b8c1d10?auto=format&fit=crop&w=1800&q=80"
          alt="Dark abstract enterprise texture"
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-sphere-black/70 via-sphere-black/60 to-sphere-black/90" />

      {/* Abstract Floating Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-800/10 rounded-full blur-[120px] animate-float-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-zinc-700/5 rounded-full blur-[150px] animate-float-slow"
          style={{ animationDelay: "-5s" }}
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-zinc-500 uppercase tracking-[0.3em] text-xs mb-8"
        >
          Architecture for the Digital Era
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl md:text-8xl lg:text-9xl leading-[1.1] mb-12 font-light"
        >
          Building <span className="italic">Modern</span> Standards.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed mb-12"
        >
          Scale your enterprise with high-fidelity web experiences engineered
          for performance, precision, and permanence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="bg-sphere-accent text-sphere-black px-10 py-4 font-medium hover:opacity-90 transition-all duration-300 ease-out">
            Start Project
          </button>
        </motion.div>
      </div>
    </main>
  );
}
