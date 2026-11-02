"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";
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
  const panelRef = useRef<HTMLDivElement>(null);
  // Only run while the panel is on screen, so phone visitors who scroll to it
  // see the cycle from a clean state instead of halfway through a reset.
  const inView = useInView(panelRef, { amount: 0.35 });

  // Start fully loaded: the first query is typed and its results are showing.
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(scenarios[0].query.length);
  const [phase, setPhase] = useState<Phase>("results");
  // Results shown in the list. While the next query is typed, the previous
  // results stay visible (dimmed) rather than being replaced by placeholders.
  const [listIndex, setListIndex] = useState(0);

  const scenario = scenarios[index];
  const shown = scenarios[listIndex];

  // One orchestrated loop: type the query, show results, then promote "your" listing to #1.
  useEffect(() => {
    if (!inView) return;
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (typed < scenario.query.length) {
        timer = setTimeout(() => setTyped((t) => t + 1), 60);
      } else {
        timer = setTimeout(() => {
          setListIndex(index);
          setPhase("results");
        }, 350);
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
  }, [phase, typed, index, scenario.query.length, inView]);

  // With "reduce motion" on, the loop still plays but rows fade instead of sliding.
  const calm = reduceMotion ?? false;
  const effectivePhase: Phase = phase;
  const queryText = scenario.query.slice(0, typed);
  const typing = effectivePhase === "typing";
  // While typing, the previous search stays in its finished (ranked) order.
  const ranked = effectivePhase === "ranked" || typing;

  const listings = useMemo(() => {
    const you = { ...shown.you, isYou: true };
    const rest = shown.others.map((o) => ({ ...o, isYou: false }));
    return ranked ? [you, ...rest] : [...rest, you];
  }, [shown, ranked]);

  return (
    <div
      ref={panelRef}
      className="relative w-full overflow-hidden rounded-[var(--radius-panel)] border border-ink/15 bg-card shadow-[0_40px_80px_-30px_rgb(11_26_46/0.55),0_16px_32px_-20px_rgb(11_26_46/0.3)] ring-1 ring-white/60"
      role="img"
      aria-label={`Illustration: a local search for "${scenario.query}" where your business moves to the first result.`}
    >
      {/* Search bar */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3.5 sm:px-5">
        <Search className="size-4 shrink-0 text-ink-faint" aria-hidden="true" />
        <p className="min-w-0 flex-1 truncate text-[0.9375rem] text-ink" aria-hidden="true">
          {queryText}
          {effectivePhase === "typing" && (
            <span className="caret ml-px inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-cobalt" />
          )}
        </p>
        <span className="hidden rounded-full bg-paper-deep px-2.5 py-1 text-xs font-medium text-ink-soft sm:inline">
          Within 3 km
        </span>
      </div>

      {/* Map: satellite-style aerial view */}
      <div className="relative h-44 overflow-hidden bg-[#4a4e42] sm:h-60" aria-hidden="true">
        <Image
          src="/map-aerial.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-cover saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(11_26_46/0.35))]" />

        <span className="absolute top-3 left-3 rounded-md bg-ink/75 px-2 py-1 text-[0.6875rem] font-semibold text-paper backdrop-blur-sm">
          Satellite
        </span>
        <span className="absolute top-3 right-3 flex flex-col overflow-hidden rounded-md bg-card text-ink shadow-md">
          <span className="grid size-7 place-items-center border-b border-line text-base leading-none">+</span>
          <span className="grid size-7 place-items-center text-base leading-none">−</span>
        </span>

        {shown.others.map((o) => (
          <span
            key={`${shown.query}-${o.name}`}
            className={cn(
              "absolute grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-[#d14b3c] shadow-md transition-opacity duration-500",
              typing ? "opacity-40" : "opacity-100"
            )}
            style={{ left: `${o.pin.x}%`, top: `${o.pin.y}%` }}
          >
            <span className="size-1.5 rounded-full bg-white" />
          </span>
        ))}

        <span
          className={cn(
            "absolute -translate-x-1/2 -translate-y-full transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)]",
            typing ? "opacity-40" : "opacity-100",
            ranked && !typing ? "scale-110" : "scale-90"
          )}
          style={{ left: `${shown.you.pin.x}%`, top: `${shown.you.pin.y}%` }}
        >
          {ranked && !typing && (
            <span className="absolute bottom-0 left-1/2 size-8 -translate-x-1/2 translate-y-1/2 rounded-full bg-cobalt/50 animate-ping-soft" />
          )}
          <MapPin
            className={cn(
              "relative size-10 drop-shadow-[0_4px_6px_rgb(0_0_0/0.45)] transition-colors duration-500",
              ranked && !typing ? "fill-cobalt text-white" : "fill-ink-faint text-white"
            )}
            strokeWidth={1.5}
          />
          <span
            className={cn(
              "absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-ink shadow-lg transition-[opacity,transform] duration-500",
              shown.you.pin.y > 45 ? "bottom-full mb-1" : "top-full mt-1",
              ranked && !typing ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            )}
          >
            {shown.you.name}
            <span className="inline-flex items-center gap-0.5 text-ink-soft">
              {shown.you.rating.toFixed(1)}
              <Star className="size-3 fill-marigold text-marigold" />
            </span>
          </span>
        </span>
      </div>

      {/* Results */}
      <LayoutGroup>
        <ol
          className={cn(
            "relative h-[22rem] divide-y divide-line overflow-hidden px-2 py-1.5 transition-opacity duration-300",
            typing && "opacity-45"
          )}
          aria-hidden="true"
        >
          {listings.map((item, i) => (
              <motion.li
                key={`${shown.query}-${item.name}`}
                layout={calm ? false : "position"}
                initial={calm ? { opacity: 0 } : { opacity: 0, y: 8 }}
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
                    <span>{shown.category}</span>
                    <span className="font-medium text-[#1f7a4a]">Open</span>
                  </span>
                  {item.isYou && ranked && (
                    <motion.span
                      key={`${shown.query}-actions`}
                      initial={{ opacity: 0, height: 0 }}
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
        </ol>
      </LayoutGroup>
    </div>
  );
}
