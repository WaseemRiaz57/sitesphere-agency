"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Briefcase,
  Dumbbell,
  Home,
  Scissors,
  ShoppingBag,
  Stethoscope,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { whatsappHref } from "@/app/lib/site";
import { LinkButton } from "./ui/button";

type Industry = {
  name: string;
  Icon: LucideIcon;
  domain: string;
  headline: string;
  action: string;
  features: string[];
};

const industries: Industry[] = [
  {
    name: "Restaurants & cafés",
    Icon: UtensilsCrossed,
    domain: "yourrestaurant.com",
    headline: "Fresh food, ten minutes from your door.",
    action: "Reserve a table",
    features: ["Menu with photos", "Online ordering links", "Table reservations", "Hours synced to Google"],
  },
  {
    name: "Clinics & healthcare",
    Icon: Stethoscope,
    domain: "yourclinic.com",
    headline: "Calm, careful treatment close to home.",
    action: "Book an appointment",
    features: ["Treatment pages", "Online booking", "Doctor profiles", "Patient FAQs"],
  },
  {
    name: "Law & professional services",
    Icon: Briefcase,
    domain: "yourfirm.com",
    headline: "Clear advice from people who know your city.",
    action: "Request a consultation",
    features: ["Practice area pages", "Consultation forms", "Team profiles", "Credentials and reviews"],
  },
  {
    name: "Salons & spas",
    Icon: Scissors,
    domain: "yoursalon.com",
    headline: "Look good, feel better, book in seconds.",
    action: "Book a service",
    features: ["Service menu", "Online booking", "Before and after gallery", "Gift vouchers"],
  },
  {
    name: "Home services & trades",
    Icon: Wrench,
    domain: "yourservice.com",
    headline: "Same-day repairs across your area.",
    action: "Get a quote",
    features: ["Service area pages", "Quote request forms", "One-tap emergency call", "Job photo gallery"],
  },
  {
    name: "Real estate",
    Icon: Home,
    domain: "youragency.com",
    headline: "Homes for sale and rent in the neighbourhoods you know.",
    action: "View listings",
    features: ["Property listings", "Area guides", "Valuation requests", "Agent profiles"],
  },
  {
    name: "Gyms & studios",
    Icon: Dumbbell,
    domain: "yourgym.com",
    headline: "Classes every day, five minutes away.",
    action: "Start a free trial",
    features: ["Class timetable", "Membership sign-up", "Trainer profiles", "Trial offers"],
  },
  {
    name: "Retail & local shops",
    Icon: ShoppingBag,
    domain: "yourshop.com",
    headline: "Shop online, collect in store today.",
    action: "Shop now",
    features: ["Product catalogue", "Click and collect", "WhatsApp orders", "Store finder"],
  },
];

export default function Industries() {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <section
      id="industries"
      aria-labelledby="industries-title"
      className="bg-ink py-24 text-paper sm:py-32"
    >
      <div className="mx-auto grid max-w-[76rem] items-start gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-8">
        <div>
          <h2
            id="industries-title"
            className="text-balance text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.04em]"
          >
            Built around how your customers buy.
          </h2>
          <p className="mt-6 max-w-[34rem] text-pretty text-lg leading-relaxed text-paper/70">
            A restaurant needs reservations, a plumber needs quote requests, a
            clinic needs bookings. Every site we build is planned around the one
            action that brings you business. Pick your industry to see what that
            looks like.
          </p>

          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Choose an industry">
            {industries.map((industry, i) => {
              const selected = i === active;
              return (
                <button
                  key={industry.name}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActive(i)}
                  className={cn(
                    "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-[0.9375rem] font-medium transition-[background-color,color,border-color] duration-200",
                    selected
                      ? "border-paper bg-paper text-ink"
                      : "border-night-line text-paper/75 hover:border-paper/40 hover:text-paper"
                  )}
                >
                  <industry.Icon className="size-4" aria-hidden="true" />
                  {industry.name}
                </button>
              );
            })}
          </div>

          <LinkButton
            href={whatsappHref(`Hello SiteSphere! I run a business in ${current.name.toLowerCase()} and I'd like to talk about a website.`)}
            target="_blank"
            rel="noreferrer"
            variant="inverse"
            size="lg"
            className="mt-10"
          >
            Talk to us about your business
          </LinkButton>
        </div>

        {/* Illustrative site preview that changes with the chosen industry */}
        <div
          aria-live="polite"
          className="overflow-hidden rounded-[14px] border border-night-line bg-paper text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]"
        >
          <div className="flex items-center gap-2 border-b border-line bg-paper-deep px-4 py-3">
            <span className="size-2.5 rounded-full bg-ink/15" aria-hidden="true" />
            <span className="size-2.5 rounded-full bg-ink/15" aria-hidden="true" />
            <span className="size-2.5 rounded-full bg-ink/15" aria-hidden="true" />
            <span className="ml-3 truncate rounded-full bg-card px-3 py-1 text-xs text-ink-soft">
              {current.domain}
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 sm:p-9"
            >
              <div className="flex items-center justify-between gap-4" aria-hidden="true">
                <span className="flex items-center gap-2 font-bold tracking-[-0.02em]">
                  <span className="grid size-8 place-items-center rounded-lg bg-ink text-paper">
                    <current.Icon className="size-4" />
                  </span>
                  {current.domain.replace(".com", "").replace("your", "Your ")}
                </span>
                <span className="hidden gap-4 text-sm text-ink-soft sm:flex">
                  <span>Services</span>
                  <span>Reviews</span>
                  <span>Contact</span>
                </span>
              </div>

              <p className="mt-10 max-w-[22ch] text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.05] font-extrabold tracking-[-0.04em]">
                {current.headline}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex h-11 items-center rounded-full bg-cobalt px-5 text-[0.9375rem] font-semibold text-paper shadow-press">
                  {current.action}
                </span>
                <span className="text-sm text-ink-soft">4.9 from local reviews</span>
              </div>

              <ul className="mt-10 grid grid-cols-2 gap-3">
                {current.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-xl border border-line bg-card px-4 py-4 text-[0.9375rem] font-medium"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
