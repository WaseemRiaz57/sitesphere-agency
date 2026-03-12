"use client";

import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "923155741347";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
};

export default function ServicesBento() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto" id="solutions">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <h2 className="font-serif text-4xl mb-4">Core Disciplines</h2>
        <p className="text-zinc-500 font-light">
          The fundamental pillars of our architectural approach.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]"
      >
        {/* Big Card: Enterprise Architecture */}
        <motion.div
          variants={itemVariants}
          className="bento-card md:col-span-2 md:row-span-2 p-10 flex flex-col justify-end group border-white/5 hover:border-white/20 group-hover:-translate-y-1 transition-all duration-500 ease-out"
        >
          <div className="mb-auto text-sphere-accent/20 transition-colors duration-500 ease-out font-serif text-6xl">
            01
          </div>
          <div>
            <h3 className="font-serif text-3xl mb-4 transition-all duration-500 ease-out">
              Enterprise Architecture
            </h3>
            <p className="text-zinc-400 transition-all duration-500 ease-out font-light leading-relaxed">
              Robust, production-ready structures built with Next.js 14 and
              specialized cloud infrastructure. We engineer for zero-downtime,
              global availability, and sub-second latency.
            </p>
          </div>
        </motion.div>

        {/* Medium Card: Interface Design */}
        <motion.div
          variants={itemVariants}
          className="bento-card md:col-span-2 md:row-span-1 p-8 flex items-center space-x-8 group border-white/5 hover:border-white/20 group-hover:-translate-y-1 transition-all duration-500 ease-out"
        >
          <div className="flex-1">
            <h3 className="font-serif text-2xl mb-2 transition-all duration-500 ease-out">Interface Design</h3>
            <p className="text-zinc-500 transition-all duration-500 ease-out text-sm font-light">
              Minimalist aesthetics meet functional utility. We craft
              high-fidelity digital interfaces that prioritize cognitive ease and
              user conversion.
            </p>
          </div>
          <div className="w-20 h-20 border border-sphere-accent/10 rounded-full flex items-center justify-center transition-all duration-500 ease-out">
            <div className="w-10 h-[1px] bg-sphere-accent/50 rotate-0 group-hover:rotate-45 transition-transform duration-500 ease-out" />
          </div>
        </motion.div>

        {/* Small Card: Cloud Native */}
        <motion.div
          variants={itemVariants}
          className="bento-card p-8 flex flex-col justify-between group border-white/5 hover:border-white/20 group-hover:-translate-y-1 transition-all duration-500 ease-out"
        >
          <div className="w-8 h-8 border border-sphere-accent/20 bg-transparent group-hover:bg-white transition-colors duration-500 ease-out" />
          <div className="mt-4">
            <h3 className="font-serif text-xl mb-2 transition-all duration-500 ease-out">Cloud Native</h3>
            <p className="text-zinc-500 transition-all duration-500 ease-out text-xs font-light">
              Serverless infrastructure optimized for infinite scalability and
              security.
            </p>
          </div>
        </motion.div>

        {/* Small Card: SEO Mastery (White Card) */}
        <motion.div
          variants={itemVariants}
          className="bento-card p-8 flex flex-col justify-between group border-white/5 hover:border-white/20 group-hover:-translate-y-1 transition-all duration-500 ease-out"
        >
          <div className="w-8 h-8 border border-sphere-accent/20 bg-transparent group-hover:bg-white transition-colors duration-500 ease-out" />
          <div className="mt-4">
            <h3 className="font-serif text-xl mb-2 transition-all duration-500 ease-out">SEO Mastery</h3>
            <p className="text-zinc-500 transition-all duration-500 ease-out text-xs font-light">
              Technical SEO strategies that ensure visibility in a crowded
              digital landscape.
            </p>
          </div>
        </motion.div>

        {/* Small Card: Motion Design */}
        <motion.div
          variants={itemVariants}
          className="bento-card md:col-span-1 p-8 group border-white/5 hover:border-white/20 group-hover:-translate-y-1 transition-all duration-500 ease-out"
        >
          <h3 className="font-serif text-xl mb-4 transition-all duration-500 ease-out">Motion Design</h3>
          <p className="text-zinc-500 transition-all duration-500 ease-out text-sm font-light leading-snug">
            Purposeful animation that guides the eye, provides feedback, and
            adds a layer of sophistication to every interaction.
          </p>
        </motion.div>

        {/* Placeholder/Request Card */}
        <motion.button
          variants={itemVariants}
          type="button"
          onClick={() =>
            window.open(
              `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hello SiteSphere! I want to request the project spec details."
              )}`,
              "_blank"
            )
          }
          className="bento-card md:col-span-1 p-8 border-dashed group border-white/5 hover:border-white/20 group-hover:-translate-y-1 transition-all duration-500 ease-out"
        >
          <div className="h-full flex items-center justify-center">
            <span className="text-zinc-600 hover:text-zinc-200 transition-all duration-300 ease-out text-xs tracking-widest uppercase">
              Request Spec
            </span>
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
}
