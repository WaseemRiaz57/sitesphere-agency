import { whatsappHref } from "@/app/lib/site";
import { LinkButton } from "./ui/button";

const engagements = [
  {
    name: "Launch",
    bestFor: "You need a new website, or your current one is holding you back.",
    includes: [
      "Custom website design and build",
      "Local SEO foundations on every page",
      "Google Business Profile setup",
      "Call, form and WhatsApp tracking",
      "30 days of post-launch support",
    ],
    shape: "A one-off project with a fixed scope",
  },
  {
    name: "Grow",
    bestFor: "You have a site, but it isn't bringing in enough calls and bookings.",
    includes: [
      "Monthly local SEO work",
      "Profile posts and review generation",
      "UGC video ads every month",
      "Meta, Google or TikTok ad management",
      "Monthly report and review call",
    ],
    shape: "An ongoing monthly engagement",
  },
  {
    name: "Partner",
    bestFor: "You run several locations or want a full outsourced marketing team.",
    includes: [
      "Website, SEO and profiles for every location",
      "Full-funnel ads with UGC creative",
      "Social media management",
      "A dedicated project lead",
      "Quarterly strategy sessions",
    ],
    shape: "Ongoing, scoped per location",
  },
];

export default function Engagements() {
  return (
    <section
      id="engagements"
      aria-labelledby="engagements-title"
      className="bg-paper-deep/60 py-16 sm:py-32"
    >
      <div className="mx-auto max-w-[76rem] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2
            id="engagements-title"
            className="max-w-[40rem] text-balance text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.04em]"
          >
            Three ways to work with us.
          </h2>
          <p className="max-w-[28rem] text-lg text-ink-soft">
            Every proposal is scoped after a free audit of your site and listings,
            so you pay for the work your business actually needs.
          </p>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[var(--radius-panel)] bg-card shadow-lift md:grid-cols-3">
          {engagements.map((e) => (
            <article
              key={e.name}
              className="flex flex-col border-line p-7 not-first:border-t sm:p-9 md:not-first:border-t-0 md:not-first:border-l"
            >
              <h3 className="text-[1.75rem] font-extrabold tracking-[-0.035em]">{e.name}</h3>
              <p className="mt-3 min-h-[3.2em] text-pretty text-ink-soft">{e.bestFor}</p>
              <ul className="mt-7 flex flex-1 flex-col gap-3 border-t border-line pt-7 text-[0.9375rem]">
                {e.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-cobalt" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-serif text-lg italic text-ink-soft">{e.shape}</p>
              <LinkButton
                href={whatsappHref(`Hello SiteSphere! I'd like to discuss the ${e.name} engagement for my business.`)}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                className="mt-5 w-full"
              >
                Discuss {e.name}
              </LinkButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
