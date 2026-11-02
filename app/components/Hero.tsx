import { Check } from "lucide-react";
import { LinkButton } from "./ui/button";
import LocalSearchDemo from "./LocalSearchDemo";

const commitments = [
  "Custom-built, never a template",
  "You own the site, domain and data",
  "Monthly reports in plain language",
];

export default function Hero() {
  // Entrance animations are plain CSS so they start with the HTML, even on a
  // slow phone connection before any JavaScript has loaded.
  const rise = (delay: number) => ({
    style: { animationDelay: `${delay}s` },
  });

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-28"
    >
      <div
        aria-hidden="true"
        className="street-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,#000_20%,transparent_75%)]"
      />

      <div className="mx-auto grid grid-cols-1 max-w-[76rem] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.08fr_1fr] lg:gap-16 lg:px-8">
        <div>
          <h1
            id="hero-title"
            {...rise(0)}
            className="hero-rise text-balance text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.95] font-extrabold tracking-[-0.045em] [font-stretch:92%]"
          >
            Be the first name
            <span className="mt-1 block font-serif text-[1.04em] font-normal tracking-[-0.03em] italic [font-stretch:100%]">
              people find nearby.
            </span>
          </h1>

          <p
            {...rise(0.12)}
            className="hero-rise mt-6 max-w-[34rem] text-pretty text-[1.0625rem] leading-relaxed text-ink-soft sm:mt-8 sm:text-xl"
          >
            SiteSphere is a web design and marketing agency for local businesses.
            We build fast, custom websites, rank you in local search, and run UGC
            and paid ads that turn attention into calls and bookings.
          </p>

          <div {...rise(0.22)} className="hero-rise mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
            <LinkButton href="#contact" size="lg">
              Book a free strategy call
            </LinkButton>
            <LinkButton href="#industries" size="lg" variant="secondary">
              See what we build
            </LinkButton>
          </div>

          <ul
            {...rise(0.32)}
            className="hero-rise mt-8 flex flex-col gap-2.5 text-[0.9375rem] text-ink-soft sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-x-6"
          >
            {commitments.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 text-cobalt" strokeWidth={2.5} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{ animationDelay: "0.25s" }}
          className="hero-panel-in relative mx-auto w-full max-w-[30rem] lg:max-w-none"
        >
          <LocalSearchDemo />
          <p className="mt-4 text-center text-sm text-ink-faint lg:text-left">
            An illustration of a local search. Our work is getting you to the top of it.
          </p>
        </div>
      </div>
    </section>
  );
}
