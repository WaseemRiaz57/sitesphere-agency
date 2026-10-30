"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Heart, MessageCircle, Play, Send, Volume2 } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { whatsappHref } from "@/app/lib/site";
import { LinkButton } from "./ui/button";

type Concept = {
  format: string;
  hook: string;
  caption: string;
  creator: string;
  tone: string;
};

// Example ad concepts, shown as phone mockups. Illustrative, not client work.
const concepts: Concept[] = [
  {
    format: "First visit",
    hook: "POV: you finally found a dentist who explains everything",
    caption: "No lecture, no upsell. Booked my cleaning on WhatsApp in a minute.",
    creator: "@sana.everyday",
    tone: "from-[#1d3b8f] to-[#0b1a2e]",
  },
  {
    format: "Taste test",
    hook: "I tried the biryani everyone on my street keeps talking about",
    caption: "Rating it honestly. Spice level, rice, portion size. Watch till the end.",
    creator: "@hamza.eats",
    tone: "from-[#8a4b12] to-[#2a1606]",
  },
  {
    format: "Before / after",
    hook: "Our AC died at 2pm. This is what 5pm looked like.",
    caption: "Called, they came the same day, explained the fault. Cold air by evening.",
    creator: "@the.malik.home",
    tone: "from-[#1f5f5b] to-[#0a2221]",
  },
];

const formats = [
  { name: "Testimonials", body: "A real customer explains why they chose you and what happened next." },
  { name: "First visit", body: "A creator walks through booking, arriving and being looked after." },
  { name: "Before and after", body: "The problem, the fix and the result, told in under thirty seconds." },
  { name: "Founder stories", body: "You, on camera, explaining what makes your business different." },
  { name: "Offers and launches", body: "New menu, new branch, seasonal deal, announced the way people share news." },
  { name: "FAQ answers", body: "Short videos that answer the questions customers ask before buying." },
];

const steps = [
  "We research your customers and write hooks and scripts",
  "We match and brief creators who fit your audience",
  "Creators film on location, we edit for each platform",
  "We run the ads, test hooks and scale what brings in customers",
];

function Phone({ concept, featured }: { concept: Concept; featured: boolean }) {
  return (
    <div
      className={cn(
        "relative aspect-[9/16] w-full overflow-hidden rounded-[28px] border-[6px] border-[#16263c] bg-gradient-to-b text-paper shadow-[0_40px_70px_-30px_rgb(0_0_0/0.7)]",
        concept.tone
      )}
    >
      {/* Light shapes standing in for phone-shot footage */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -top-10 -left-10 size-48 rounded-full bg-paper/10 blur-2xl" />
        <div className="absolute right-[-30%] bottom-[18%] size-56 rounded-full bg-marigold/15 blur-3xl" />
        <div className="absolute inset-x-[22%] top-[30%] bottom-[30%] rounded-[40%] bg-paper/10" />
      </div>

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 text-[0.6875rem] text-paper/80">
        <span className="rounded-full bg-black/25 px-2 py-0.5 backdrop-blur-sm">{concept.format}</span>
        <Volume2 className="size-3.5" aria-hidden="true" />
      </div>

      <p className="absolute inset-x-3 top-[16%] rounded-lg bg-paper px-2.5 py-2 text-center text-[0.8125rem] leading-tight font-bold text-ink shadow-md sm:text-sm">
        {concept.hook}
      </p>

      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper/20 backdrop-blur-sm transition-opacity",
          featured ? "opacity-0" : "opacity-100"
        )}
      >
        <Play className="size-5 fill-paper" />
      </span>

      <div aria-hidden="true" className="absolute right-2 bottom-24 flex flex-col items-center gap-3 text-paper/90">
        <Heart className="size-5" />
        <MessageCircle className="size-5" />
        <Send className="size-5" />
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-10">
        <p className="text-xs font-semibold">{concept.creator}</p>
        <p className="mt-1 line-clamp-2 text-[0.6875rem] leading-snug text-paper/85">{concept.caption}</p>
        <div className="mt-2.5 h-0.5 overflow-hidden rounded-full bg-paper/25">
          <div
            className={cn(
              "h-full bg-paper transition-[width] ease-linear",
              featured ? "w-full duration-[6000ms]" : "w-0 duration-0"
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default function Ugc() {
  const [featured, setFeatured] = useState(1);
  const reduceMotion = useReducedMotion();

  return (
    <section id="ugc" aria-labelledby="ugc-title" className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-[76rem] px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <h2
            id="ugc-title"
            className="text-balance text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.04em]"
          >
            UGC ads that feel like a recommendation, not an advert.
          </h2>
          <p className="max-w-[34rem] text-pretty text-lg leading-relaxed text-ink-soft">
            User-generated content is short, vertical video filmed by real people on
            their phones. For a local business it is the closest thing to word of
            mouth you can buy. We write it, cast it, film it, edit it and run it as
            ads to people near you.
          </p>
        </div>

        {/* Example concepts */}
        {/* Swipeable on phones, three across from sm up */}
        <div className="-mx-4 mt-16 flex snap-x snap-mandatory items-center gap-4 overflow-x-auto px-[15%] pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:mx-auto lg:max-w-[52rem]">
          {concepts.map((concept, i) => {
            const isFeatured = i === featured;
            return (
              <motion.button
                key={concept.creator}
                type="button"
                onClick={() => setFeatured(i)}
                aria-pressed={isFeatured}
                aria-label={`Example UGC ad: ${concept.format}. ${concept.hook}`}
                animate={reduceMotion ? undefined : { scale: isFeatured ? 1 : 0.9, opacity: isFeatured ? 1 : 0.75 }}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                className="block w-[70%] shrink-0 snap-center rounded-[28px] text-left sm:w-full"
              >
                <Phone concept={concept} featured={isFeatured} />
              </motion.button>
            );
          })}
        </div>
        <p className="mt-6 text-center text-sm text-ink-faint">
          Example ad concepts. <span className="sm:hidden">Swipe and tap</span>
          <span className="hidden sm:inline">Tap</span> one to play it.
        </p>

        <div className="mt-20 grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div>
            <h3 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-[1.75rem]">
              Formats that work for local businesses
            </h3>
            <dl className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {formats.map((f) => (
                <div key={f.name}>
                  <dt className="font-bold tracking-[-0.01em]">{f.name}</dt>
                  <dd className="mt-1.5 text-pretty text-ink-soft">{f.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-[var(--radius-panel)] bg-card p-7 shadow-lift sm:p-9">
            <h3 className="text-2xl font-extrabold tracking-[-0.03em]">How a UGC campaign runs</h3>
            <ol className="mt-7 flex flex-col gap-5">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cobalt text-sm font-bold text-paper tabular-nums">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-pretty">{step}</span>
                </li>
              ))}
            </ol>
            <LinkButton
              href={whatsappHref("Hello SiteSphere! I'd like to talk about UGC video ads for my business.")}
              target="_blank"
              rel="noreferrer"
              className="mt-9 w-full sm:w-auto"
            >
              Plan a UGC campaign
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
