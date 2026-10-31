"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BarChart3,
  Gauge,
  LayoutTemplate,
  MapPinned,
  Megaphone,
  MousePointerClick,
  Store,
  Video,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

type Service = {
  name: string;
  Icon: LucideIcon;
  summary: string;
  includes: string[];
  outcome: string;
};

const services: Service[] = [
  {
    name: "Website design & development",
    Icon: LayoutTemplate,
    summary:
      "A custom site built around how your customers decide: clear services, real photos, and booking, call and WhatsApp buttons exactly where thumbs land.",
    includes: [
      "Custom design for your brand",
      "Mobile-first build on Next.js",
      "Booking, call and WhatsApp actions",
      "Copy written for your services",
      "Hosting, SSL and domain setup",
      "Training so your team can edit",
    ],
    outcome: "Visitors understand what you do, where you are and how to book within seconds.",
  },
  {
    name: "Local SEO",
    Icon: MapPinned,
    summary:
      "Rank in the map results and on page one for the searches that bring people to your door, in your city and the neighbourhoods around it.",
    includes: [
      "Keyword and competitor research",
      "Service and location pages",
      "On-page SEO for every page",
      "Citations and consistent listings",
      "LocalBusiness and FAQ schema",
      "Monthly rank tracking",
    ],
    outcome: "More people find you before they find your competitors.",
  },
  {
    name: "Google Business Profile",
    Icon: Store,
    summary:
      "Your profile is often seen before your website. We set it up properly, keep it active and help you earn a steady flow of reviews.",
    includes: [
      "Full profile optimisation",
      "Categories, services and areas",
      "Regular posts and photos",
      "Review request system",
      "Review reply templates",
      "Q&A management",
    ],
    outcome: "A profile that earns the call, not just the impression.",
  },
  {
    name: "UGC video ads",
    Icon: Video,
    summary:
      "Short, phone-shot videos of real people using and recommending your business. They feel like a friend's tip, not an advert, which is why they stop the scroll on Reels, TikTok and Shorts.",
    includes: [
      "Hook and script writing",
      "Creator sourcing and briefing",
      "Filming at your location",
      "Edits for Reels, TikTok and Shorts",
      "Captions, subtitles and cut-downs",
      "Multiple hooks per video for testing",
    ],
    outcome: "Ads people watch to the end, and then call you.",
  },
  {
    name: "Paid ads & social media",
    Icon: Megaphone,
    summary:
      "We run Meta, Google and TikTok campaigns aimed at people within reach of your business, and keep your social pages active between campaigns.",
    includes: [
      "Meta and Instagram ads",
      "Google Search and Maps ads",
      "TikTok ads",
      "Location and radius targeting",
      "Monthly content calendar",
      "Budget and results reporting",
    ],
    outcome: "Ad spend you can trace to calls, messages and bookings.",
  },
  {
    name: "Speed & technical SEO",
    Icon: Gauge,
    summary:
      "Fast pages rank better and lose fewer visitors. We fix what slows you down and make sure search engines can read every page.",
    includes: [
      "Core Web Vitals improvements",
      "Indexing and crawl fixes",
      "Image and font optimisation",
      "Redirects and safe migrations",
      "Sitemaps and robots rules",
      "Accessibility checks",
    ],
    outcome: "Pages that open instantly on a phone with weak signal.",
  },
  {
    name: "Conversion & tracking",
    Icon: MousePointerClick,
    summary:
      "Traffic only matters if it turns into enquiries. We measure every call, form and WhatsApp message, then improve the pages that underperform.",
    includes: [
      "Call and WhatsApp click tracking",
      "Form and booking tracking",
      "Analytics and Search Console",
      "Landing pages for ads",
      "Heatmap reviews",
      "A/B tests on key pages",
    ],
    outcome: "You know which pages and searches bring in paying customers.",
  },
  {
    name: "Care & growth",
    Icon: BarChart3,
    summary:
      "After launch we stay on: updates, backups and security, new content each month, and a short report that tells you what changed and why.",
    includes: [
      "Managed hosting and backups",
      "Security and plugin updates",
      "New pages and blog content",
      "Monthly report and call",
      "Priority fixes",
      "Quarterly strategy review",
    ],
    outcome: "Your site keeps improving instead of slowly going stale.",
  },
];

function ServiceDetail({ service }: { service: Service }) {
  return (
    <>
      <p className="text-pretty text-lg leading-relaxed text-ink">{service.summary}</p>
      <ul className="mt-7 grid gap-x-8 gap-y-3 text-[0.9375rem] text-ink-soft sm:grid-cols-2">
        {service.includes.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-cobalt" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-8 border-t border-line pt-6 font-serif text-xl italic leading-snug text-ink">
        {service.outcome}
      </p>
    </>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="services" aria-labelledby="services-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[76rem] px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <h2
            id="services-title"
            className="text-balance text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.04em]"
          >
            Everything it takes to get found, get chosen and get booked.
          </h2>
          <p className="max-w-[34rem] text-lg text-ink-soft lg:pb-2">
            One team handles your website, your search rankings, your reviews and
            your ads. Nothing gets lost between four different suppliers, and every
            piece is measured by the same thing: new customers.
          </p>
        </div>

        {/* Desktop: list on the left, details on the right */}
        <div className="mt-14 hidden gap-12 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div role="tablist" aria-label="Services" aria-orientation="vertical" className="flex flex-col">
            {services.map((service, i) => {
              const selected = i === active;
              return (
                <button
                  key={service.name}
                  role="tab"
                  id={`service-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="service-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
                    e.preventDefault();
                    const next = (i + (e.key === "ArrowDown" ? 1 : services.length - 1)) % services.length;
                    setActive(next);
                    document.getElementById(`service-tab-${next}`)?.focus();
                  }}
                  className={cn(
                    "group relative flex items-center gap-4 border-b border-line py-3.5 text-left text-[1.375rem] font-bold tracking-[-0.03em] transition-colors duration-200",
                    selected ? "text-ink" : "text-ink/35 hover:text-ink/70"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full transition-[background-color,color] duration-300",
                      selected ? "bg-cobalt text-paper" : "bg-transparent text-ink/35"
                    )}
                  >
                    <service.Icon className="size-5" aria-hidden="true" />
                  </span>
                  {service.name}
                </button>
              );
            })}
          </div>

          <div
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${active}`}
            className="relative self-start overflow-hidden rounded-[var(--radius-panel)] bg-card shadow-lift lg:sticky lg:top-28"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative overflow-hidden bg-ink px-10 py-9 text-paper">
                  <current.Icon
                    className="absolute -right-6 -bottom-8 size-44 text-paper/[0.07]"
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                  <span className="grid size-12 place-items-center rounded-full bg-cobalt text-paper">
                    <current.Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[2rem] leading-tight font-extrabold tracking-[-0.035em]">
                    {current.name}
                  </h3>
                  <p className="mt-2 text-sm text-paper/60">
                    Service {active + 1} of {services.length}
                  </p>
                </div>
                <div className="p-10">
                  <ServiceDetail service={current} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile and tablet: every service stacked */}
        <div className="mt-12 flex flex-col gap-4 lg:hidden">
          {services.map((service) => (
            <article key={service.name} className="rounded-[var(--radius-panel)] bg-card p-6 sm:p-8">
              <h3 className="mb-5 flex items-center gap-3 text-xl font-bold tracking-[-0.025em]">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cobalt text-paper">
                  <service.Icon className="size-[1.125rem]" aria-hidden="true" />
                </span>
                {service.name}
              </h3>
              <ServiceDetail service={service} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
