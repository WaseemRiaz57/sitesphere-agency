"use client";

import { useEffect, useMemo, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { Globe, MapPin, Navigation, Phone, Search, Star } from "lucide-react";
import { cn } from "@/app/lib/utils";

type Listing = {
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  pin: { x: number; y: number };
};

type Scenario = {
  query: string;
  category: string;
  you: Listing;
  others: Listing[];
};

const scenarios: Scenario[] = [
  {
    query: "biryani open now",
    category: "Restaurant",
    you: { name: "Your restaurant", rating: 4.8, reviews: 1046, distance: "0.4 km", pin: { x: 46, y: 58 } },
    others: [
      { name: "Spice Route Kitchen", rating: 4.3, reviews: 540, distance: "0.9 km", pin: { x: 72, y: 36 } },
      { name: "Karachi Grill House", rating: 4.1, reviews: 311, distance: "1.5 km", pin: { x: 18, y: 50 } },
      { name: "Saffron Corner", rating: 3.9, reviews: 96, distance: "2.2 km", pin: { x: 84, y: 70 } },
    ],
  },
  {
    query: "dentist near me",
    category: "Dental clinic",
    you: { name: "Your clinic", rating: 4.9, reviews: 312, distance: "0.6 km", pin: { x: 58, y: 44 } },
    others: [
      { name: "Smile Care Dental", rating: 4.4, reviews: 128, distance: "1.2 km", pin: { x: 24, y: 30 } },
      { name: "City Dental Centre", rating: 4.2, reviews: 87, distance: "2.0 km", pin: { x: 80, y: 22 } },
      { name: "Bright Teeth Studio", rating: 4.0, reviews: 41, distance: "2.7 km", pin: { x: 34, y: 72 } },
    ],
  },
  {
    query: "ac repair same day",
    category: "HVAC service",
    you: { name: "Your service", rating: 4.9, reviews: 208, distance: "1.4 km", pin: { x: 38, y: 40 } },
    others: [
      { name: "CoolFix Technicians", rating: 4.5, reviews: 97, distance: "2.1 km", pin: { x: 76, y: 28 } },
      { name: "Metro Air Services", rating: 4.2, reviews: 64, distance: "2.9 km", pin: { x: 22, y: 70 } },
      { name: "QuickCool Repairs", rating: 3.8, reviews: 31, distance: "3.4 km", pin: { x: 84, y: 66 } },
    ],
  },
  {
    query: "hair salon near me",
    category: "Hair salon",
    you: { name: "Your salon", rating: 4.9, reviews: 455, distance: "0.5 km", pin: { x: 54, y: 36 } },
    others: [
      { name: "Studio Glow", rating: 4.5, reviews: 210, distance: "1.0 km", pin: { x: 26, y: 58 } },
      { name: "The Cutting Room", rating: 4.3, reviews: 148, distance: "1.7 km", pin: { x: 80, y: 24 } },
      { name: "Velvet Hair & Beauty", rating: 4.0, reviews: 52, distance: "2.5 km", pin: { x: 72, y: 72 } },
    ],
  },
  {
    query: "family lawyer nearby",
    category: "Law firm",
    you: { name: "Your firm", rating: 5.0, reviews: 74, distance: "1.1 km", pin: { x: 66, y: 62 } },
    others: [
      { name: "Hassan & Co. Advocates", rating: 4.6, reviews: 38, distance: "1.8 km", pin: { x: 30, y: 24 } },
      { name: "Northgate Legal", rating: 4.3, reviews: 22, distance: "2.4 km", pin: { x: 84, y: 30 } },
      { name: "Parkview Law Chambers", rating: 4.1, reviews: 15, distance: "3.0 km", pin: { x: 20, y: 66 } },
    ],
  },
];

type Phase = "typing" | "results" | "ranked";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-ink" aria-label={`${rating} out of 5 stars`}>
      <span className="font-semibold tabular-nums">{rating.toFixed(1)}</span>
      <Star className="size-3.5 fill-marigold text-marigold" aria-hidden="true" />
    </span>
  );
}

export default function LocalSearchDemo() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  const scenario = scenarios[index];

  // One orchestrated loop: type the query, show results, then promote "your" listing to #1.
  useEffect(() => {
    if (reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (typed < scenario.query.length) {
        timer = setTimeout(() => setTyped((t) => t + 1), 60);
      } else {
        timer = setTimeout(() => setPhase("results"), 350);
      }
    } else if (phase === "results") {
      timer = setTimeout(() => setPhase("ranked"), 1100);
    } else {
      timer = setTimeout(() => {
        setIndex((i) => (i + 1) % scenarios.length);
        setTyped(0);
        setPhase("typing");
      }, 3600);
    }
    return () => clearTimeout(timer);
  }, [phase, typed, scenario.query.length, reduceMotion]);

  const showFinal = reduceMotion ?? false;
  const effectivePhase: Phase = showFinal ? "ranked" : phase;
  const queryText = showFinal ? scenario.query : scenario.query.slice(0, typed);
  const ranked = effectivePhase === "ranked";
  const showResults = effectivePhase !== "typing";

  const listings = useMemo(() => {
    const you = { ...scenario.you, isYou: true };
    const rest = scenario.others.map((o) => ({ ...o, isYou: false }));
    return ranked ? [you, ...rest] : [...rest, you];
  }, [scenario, ranked]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-[var(--radius-panel)] border border-line bg-card shadow-lift"
      role="img"
      aria-label={`Illustration: a local search for "${scenario.query}" where your business moves to the first result.`}
    >
      {/* Search bar */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3.5 sm:px-5">
        <Search className="size-4 shrink-0 text-ink-faint" aria-hidden="true" />
        <p className="min-w-0 flex-1 truncate text-[0.9375rem] text-ink" aria-hidden="true">
          {queryText}
          {!showFinal && effectivePhase === "typing" && (
            <span className="caret ml-px inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-cobalt" />
          )}
        </p>
        <span className="hidden rounded-full bg-paper-deep px-2.5 py-1 text-xs font-medium text-ink-soft sm:inline">
          Within 3 km
        </span>
      </div>

      {/* Map */}
      <div className="street-grid relative h-36 overflow-hidden bg-paper sm:h-44" aria-hidden="true">
        <svg className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M-5 62 C 20 58, 38 70, 60 52 S 92 40, 105 46" fill="none" stroke="white" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 9 }} />
          <path d="M40 -5 C 44 30, 36 60, 44 105" fill="none" stroke="white" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 7 }} />
          <path d="M70 -5 L 76 105" fill="none" stroke="white" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 4 }} />
        </svg>
        <div className="absolute top-[12%] right-[8%] h-[26%] w-[20%] rounded-md bg-[#d5e2cf]" />

        {scenario.others.map((o) => (
          <span
            key={`${scenario.query}-${o.name}`}
            className={cn(
              "absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-ink-faint transition-opacity duration-500",
              showResults ? "opacity-100" : "opacity-0"
            )}
            style={{ left: `${o.pin.x}%`, top: `${o.pin.y}%` }}
          />
        ))}

        <span
          className={cn(
            "absolute -translate-x-1/2 -translate-y-full transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)]",
            showResults ? "opacity-100" : "opacity-0",
            ranked ? "scale-110" : "scale-90"
          )}
          style={{ left: `${scenario.you.pin.x}%`, top: `${scenario.you.pin.y}%` }}
        >
          {ranked && (
            <span className="absolute bottom-0 left-1/2 size-6 -translate-x-1/2 translate-y-1/2 rounded-full bg-cobalt/40 animate-ping-soft" />
          )}
          <MapPin
            className={cn(
              "relative size-8 drop-shadow-sm transition-colors duration-500",
              ranked ? "fill-cobalt text-white" : "fill-ink-faint text-white"
            )}
            strokeWidth={1.5}
          />
        </span>
      </div>

      {/* Results */}
      <LayoutGroup>
        <ol className="relative min-h-[17.5rem] divide-y divide-line px-2 py-1.5 sm:min-h-[18.5rem]" aria-hidden="true">
          {showResults &&
            listings.map((item, i) => (
              <motion.li
                key={`${scenario.query}-${item.name}`}
                layout={!showFinal}
                initial={showFinal ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  layout: { type: "spring", stiffness: 260, damping: 30 },
                  opacity: { duration: 0.3, delay: i * 0.05 },
                  y: { duration: 0.3, delay: i * 0.05 },
                }}
                className={cn(
                  "relative flex items-start gap-3 rounded-xl px-3 py-3 transition-colors duration-500",
                  item.isYou && ranked && "bg-cobalt-wash"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold tabular-nums transition-colors duration-500",
                    item.isYou && ranked ? "bg-cobalt text-paper" : "bg-paper-deep text-ink-soft"
                  )}
                >
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className={cn("truncate font-semibold tracking-[-0.01em]", item.isYou ? "text-ink" : "text-ink/80")}>
                      {item.name}
                    </span>
                    <span className="shrink-0 text-xs text-ink-faint tabular-nums">{item.distance}</span>
                  </span>
                  <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[0.8125rem] text-ink-soft">
                    <Stars rating={item.rating} />
                    <span className="tabular-nums">({item.reviews.toLocaleString("en-US")})</span>
                    <span>{scenario.category}</span>
                    <span className="font-medium text-[#1f7a4a]">Open</span>
                  </span>
                  {item.isYou && ranked && (
                    <motion.span
                      initial={showFinal ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.35, delay: 0.25 }}
                      className="flex gap-1.5 overflow-hidden pt-2.5"
                    >
                      {[
                        { label: "Call", Icon: Phone },
                        { label: "Website", Icon: Globe },
                        { label: "Directions", Icon: Navigation },
                      ].map(({ label, Icon }) => (
                        <span
                          key={label}
                          className="inline-flex items-center gap-1 rounded-full border border-cobalt/25 bg-card px-2.5 py-1 text-xs font-medium text-cobalt"
                        >
                          <Icon className="size-3" aria-hidden="true" />
                          {label}
                        </span>
                      ))}
                    </motion.span>
                  )}
                </span>
              </motion.li>
            ))}
          {!showResults && (
            <li className="flex h-full flex-col gap-3 px-3 py-4">
              {[0, 1, 2, 3].map((n) => (
                <span key={n} className="h-12 animate-pulse rounded-xl bg-paper-deep/70" />
              ))}
            </li>
          )}
        </ol>
      </LayoutGroup>
    </div>
  );
}
