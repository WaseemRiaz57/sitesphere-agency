"use client";

import { useState } from "react";
import Image from "next/image";
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
  photo: string;
  photoAlt: string;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=75`;

const industries: Industry[] = [
  {
    name: "Restaurants & cafés",
    Icon: UtensilsCrossed,
    domain: "yourrestaurant.com",
    headline: "Fresh food, ten minutes from your door.",
    action: "Reserve a table",
    features: ["Menu with photos", "Online ordering links", "Table reservations", "Hours synced to Google"],
    photo: unsplash("1517248135467-4c7edcad34c4"),
    photoAlt: "Warmly lit restaurant dining room with set tables",
  },
  {
    name: "Clinics & healthcare",
    Icon: Stethoscope,
    domain: "yourclinic.com",
    headline: "Calm, careful treatment close to home.",
    action: "Book an appointment",
    features: ["Treatment pages", "Online booking", "Doctor profiles", "Patient FAQs"],
    photo: unsplash("1606811971618-4486d14f3f99"),
    photoAlt: "Modern dental clinic treatment room",
  },
  {
    name: "Law & professional services",
    Icon: Briefcase,
    domain: "yourfirm.com",
    headline: "Clear advice from people who know your city.",
    action: "Request a consultation",
    features: ["Practice area pages", "Consultation forms", "Team profiles", "Credentials and reviews"],
    photo: unsplash("1589829545856-d10d557cf95f"),
    photoAlt: "Scales of justice statue in a law office",
  },
  {
    name: "Salons & spas",
    Icon: Scissors,
    domain: "yoursalon.com",
    headline: "Look good, feel better, book in seconds.",
    action: "Book a service",
    features: ["Service menu", "Online booking", "Before and after gallery", "Gift vouchers"],
    photo: unsplash("1560066984-138dadb4c035"),
    photoAlt: "Bright hair salon with styling chairs and mirrors",
  },
  {
    name: "Home services & trades",
    Icon: Wrench,
    domain: "yourservice.com",
    headline: "Same-day repairs across your area.",
    action: "Get a quote",
    features: ["Service area pages", "Quote request forms", "One-tap emergency call", "Job photo gallery"],
    photo: unsplash("1581578731548-c64695cc6952"),
    photoAlt: "Service professional working in a home",
  },
  {
    name: "Real estate",
    Icon: Home,
    domain: "youragency.com",
    headline: "Homes for sale and rent in the neighbourhoods you know.",
    action: "View listings",
    features: ["Property listings", "Area guides", "Valuation requests", "Agent profiles"],
    photo: unsplash("1560518883-ce09059eeffa"),
    photoAlt: "Modern family house exterior",
  },
  {
    name: "Gyms & studios",
    Icon: Dumbbell,
    domain: "yourgym.com",
    headline: "Classes every day, five minutes away.",
    action: "Start a free trial",
    features: ["Class timetable", "Membership sign-up", "Trainer profiles", "Trial offers"],
    photo: unsplash("1534438327276-14e5300c3a48"),
    photoAlt: "Gym floor with weights and training equipment",
  },
  {
    name: "Retail & local shops",
    Icon: ShoppingBag,
    domain: "yourshop.com",
    headline: "Shop online, collect in store today.",
    action: "Shop now",
    features: ["Product catalogue", "Click and collect", "WhatsApp orders", "Store finder"],
    photo: unsplash("1441986300917-64674bd600d8"),
    photoAlt: "Local clothing shop interior with racks",
  },
];

// Falls back to a designed panel if the photo cannot load.
function IndustryPhoto({ industry }: { industry: Industry }) {
  const [failed, setFailed] = useState<string | null>(null);
  if (failed === industry.photo) {
    return (
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_80%_20%,var(--color-cobalt),transparent_55%),linear-gradient(135deg,#13243b,var(--color-ink))]">
        <industry.Icon
          className="absolute -right-8 -bottom-10 size-72 text-paper/10"
          strokeWidth={1}
          aria-hidden="true"
        />
      </div>
    );
  }
  return (
    <Image
      src={industry.photo}
      alt={industry.photoAlt}
      fill
      sizes="(max-width: 1024px) 100vw, 640px"
      onError={() => setFailed(industry.photo)}
      className="-z-20 object-cover animate-[photo-settle_1.2s_var(--ease-out-soft)_forwards]"
    />
  );
}

export default function Industries() {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <section
      id="industries"
      aria-labelledby="industries-title"
      className="bg-ink py-16 text-paper sm:py-32"
    >
      <div className="mx-auto grid grid-cols-1 max-w-[76rem] items-start gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-8">
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

          <div
            className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-10 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
            role="group"
            aria-label="Choose an industry"
          >
            {industries.map((industry, i) => {
              const selected = i === active;
              return (
                <button
                  key={industry.name}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActive(i)}
                  className={cn(
                    "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[0.9375rem] font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 active:scale-95",
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
            className="mt-10 hidden lg:inline-flex"
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Photo hero of the sample site */}
              <div className="relative isolate flex min-h-[19rem] flex-col justify-between overflow-hidden p-6 text-paper sm:min-h-[22rem] sm:p-8">
                <IndustryPhoto industry={current} />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/30" />

                <div className="flex items-center justify-between gap-4" aria-hidden="true">
                  <span className="flex items-center gap-2 font-bold tracking-[-0.02em]">
                    <span className="grid size-8 place-items-center rounded-lg bg-paper text-ink">
                      <current.Icon className="size-4" />
                    </span>
                    {current.domain.replace(".com", "").replace("your", "Your ")}
                  </span>
                  <span className="hidden gap-4 text-sm text-paper/80 sm:flex">
                    <span>Services</span>
                    <span>Reviews</span>
                    <span>Contact</span>
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.05] font-extrabold tracking-[-0.04em]">
                    {current.headline}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="inline-flex h-11 items-center rounded-full bg-cobalt px-5 text-[0.9375rem] font-semibold text-paper shadow-press">
                      {current.action}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-paper/85">
                      4.9 <span className="text-marigold">★★★★★</span> local reviews
                    </span>
                  </div>
                </motion.div>
              </div>

              <ul className="grid grid-cols-2 gap-3 p-5 sm:p-6">
                {current.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 rounded-xl border border-line bg-card px-4 py-3.5 text-[0.9375rem] font-medium"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-cobalt" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <LinkButton
          href={whatsappHref(`Hello SiteSphere! I run a business in ${current.name.toLowerCase()} and I'd like to talk about a website.`)}
          target="_blank"
          rel="noreferrer"
          variant="inverse"
          size="lg"
          className="w-full lg:hidden"
        >
          Talk to us about your business
        </LinkButton>
      </div>
    </section>
  );
}
