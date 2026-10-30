"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { LinkButton } from "./ui/button";
import LocalSearchDemo from "./LocalSearchDemo";

const commitments = [
  "Custom-built, never a template",
  "You own the site, domain and data",
  "Monthly reports in plain language",
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 lg:pt-40 lg:pb-28"
    >
      <div
        aria-hidden="true"
        className="street-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,#000_20%,transparent_75%)]"
      />

      <div className="mx-auto grid max-w-[76rem] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.08fr_1fr] lg:gap-16 lg:px-8">
        <div>
          <motion.h1
            id="hero-title"
            {...rise(0)}
            className="text-balance text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.95] font-extrabold tracking-[-0.045em] [font-stretch:92%]"
          >
            Be the first name
            <span className="mt-1 block font-serif text-[1.04em] font-normal tracking-[-0.03em] italic [font-stretch:100%]">
              people find nearby.
            </span>
          </motion.h1>

          <motion.p
            {...rise(0.12)}
            className="mt-8 max-w-[34rem] text-pretty text-lg leading-relaxed text-ink-soft sm:text-xl"
          >
            SiteSphere designs fast, custom websites and runs the local SEO behind
            them, so clinics, restaurants, law firms and trades win the search, the
            click and the call.
          </motion.p>

          <motion.div {...rise(0.22)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="#contact" size="lg">
              Book a free strategy call
            </LinkButton>
            <LinkButton href="#work" size="lg" variant="secondary">
              See a live demo
            </LinkButton>
          </motion.div>

          <motion.ul
            {...rise(0.32)}
            className="mt-10 flex flex-col gap-2.5 text-[0.9375rem] text-ink-soft sm:flex-row sm:flex-wrap sm:gap-x-6"
          >
            {commitments.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 text-cobalt" strokeWidth={2.5} aria-hidden="true" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 40, rotate: 1.5 },
                animate: { opacity: 1, y: 0, rotate: 0 },
                transition: { duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const },
              })}
          className="relative mx-auto w-full max-w-[30rem] lg:max-w-none"
        >
          <LocalSearchDemo />
          <p className="mt-4 text-center text-sm text-ink-faint lg:text-left">
            An illustration of a local search. Our work is getting you to the top of it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
