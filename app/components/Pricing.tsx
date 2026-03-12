"use client";

import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "923155741347";

const tiers = [
  {
    name: "Foundation",
    price: "$5k",
    priceSuffix: "/ project",
    recommended: false,
    features: [
      "Custom UI Design",
      "Next.js Performance Setup",
      "5 Core Templates",
      "Basic SEO",
    ],
    cta: "Select",
    waMessage: "Hello SiteSphere! I am interested in the *Foundation Plan ($5k)*. Could you share more details?",
  },
  {
    name: "Growth",
    price: "$12k",
    priceSuffix: "/ project",
    recommended: true,
    features: [
      "Full Design System",
      "Interactive Animations",
      "CMS Integration",
      "Advanced SEO & Analytics",
      "3 Month Support",
    ],
    cta: "Select Growth",
    waMessage: "Hello SiteSphere! I am interested in the *Growth Plan ($12k)*. Could you share more details?",
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceSuffix: "",
    recommended: false,
    features: [
      "Custom Micro-services",
      "24/7 Priority Support",
      "Dedicated Engineer",
      "Global CDN Config",
    ],
    cta: "Inquire",
    waMessage: "Hello SiteSphere! I am interested in the *Enterprise Plan (Custom)*. I'd love to discuss my requirements.",
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

export default function Pricing() {
  return (
    <section className="py-32 px-6" id="pricing">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl mb-4">Investment Tiers</h2>
          <p className="text-zinc-500 font-light">
            Transparent scaling for your digital footprint.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className={`p-10 border flex flex-col relative ${
                tier.recommended
                  ? "border-sphere-accent bg-sphere-black shadow-[0_0_50px_rgba(255,255,255,0.03)]"
                  : "border-sphere-border"
              } group transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] hover:border-white/20`}
            >
              {tier.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sphere-accent text-sphere-black px-4 py-1 text-[10px] font-bold tracking-[0.2em] uppercase">
                  Recommended
                </div>
              )}

              <span
                className={`text-xs uppercase tracking-widest mb-6 ${
                  tier.recommended
                    ? "text-sphere-accent"
                    : "text-zinc-500"
                }`}
              >
                {tier.name}
              </span>

              <div className="font-serif text-4xl mb-8">
                {tier.price}
                {tier.priceSuffix && (
                  <span className="text-sm font-sans text-zinc-600">
                    {" "}
                    {tier.priceSuffix}
                  </span>
                )}
              </div>

              <ul
                className={`space-y-4 mb-12 text-sm font-light flex-grow ${
                  tier.recommended ? "text-zinc-300" : "text-zinc-400"
                }`}
              >
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <span
                      className={`w-1 h-1 rounded-full ${
                        tier.recommended ? "bg-sphere-accent" : "bg-zinc-500"
                      }`}
                    />
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(tier.waMessage)}`,
                    "_blank"
                  )
                }
                className={`w-full py-4 text-sm uppercase tracking-widest transition-all ${
                  tier.recommended
                    ? "bg-sphere-accent text-sphere-black hover:opacity-90 duration-300 ease-out"
                    : "border border-sphere-border hover:bg-sphere-accent hover:text-sphere-black duration-300 ease-out"
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
