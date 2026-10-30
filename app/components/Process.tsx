"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  {
    title: "Audit",
    body: "We look at how you show up today: search rankings, your map listing, reviews, site speed and what nearby competitors are doing better.",
  },
  {
    title: "Plan",
    body: "We agree on the pages, the searches to target and the one action each page should drive, whether that is a call, a booking or a visit.",
  },
  {
    title: "Design & build",
    body: "You see designs early, give feedback, and watch the site come together on a private preview link before anything goes live.",
  },
  {
    title: "Launch",
    body: "We move your domain without losing existing rankings, connect call and form tracking, and update your Google Business Profile to match.",
  },
  {
    title: "Grow",
    body: "Every month: SEO work, new content, review generation and a short report on calls, bookings and rankings.",
  },
];

export default function Process() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The rail fills as the reader scrolls through the steps.
        gsap.fromTo(
          ".process-rail-fill",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".process-list",
              start: "top 60%",
              end: "bottom 60%",
              scrub: 0.4,
            },
          }
        );

        gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 60%",
            onEnter: () => step.classList.add("is-active"),
            onLeaveBack: () => step.classList.remove("is-active"),
          });
          gsap.from(step.querySelector(".process-copy"), {
            opacity: 0.25,
            ease: "none",
            scrollTrigger: { trigger: step, start: "top 85%", end: "top 55%", scrub: true },
          });
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".process-rail-fill", { scaleY: 1 });
        gsap.utils.toArray<HTMLElement>(".process-step").forEach((s) => s.classList.add("is-active"));
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      id="process"
      aria-labelledby="process-title"
      className="border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-[76rem] gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-8">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2
            id="process-title"
            className="text-balance text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.04em]"
          >
            How a project runs, from first call to first booking.
          </h2>
          <p className="mt-5 max-w-[30rem] text-lg text-ink-soft">
            Five stages, one point of contact, and a dated plan in your proposal so
            you always know what happens next.
          </p>
        </div>

        <ol className="process-list relative">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-line" />
          <span
            aria-hidden="true"
            className="process-rail-fill absolute top-2 bottom-2 left-[1.375rem] w-px origin-top bg-cobalt"
          />
          {steps.map((step, i) => (
            <li key={step.title} className="process-step group relative flex gap-6 pb-14 last:pb-0 sm:gap-8">
              <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full border border-line bg-paper text-sm font-bold tabular-nums text-ink-soft transition-[background-color,color,border-color] duration-300 group-[.is-active]:border-cobalt group-[.is-active]:bg-cobalt group-[.is-active]:text-paper">
                {i + 1}
              </span>
              <div className="process-copy pt-1.5">
                <h3 className="text-2xl font-bold tracking-[-0.03em] sm:text-[1.75rem]">{step.title}</h3>
                <p className="mt-3 max-w-[36rem] text-pretty text-ink-soft">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
