"use client";

import { useRef } from "react";
import Image from "next/image";
import { Check, ExternalLink, MessageCircle } from "lucide-react";
import { whatsappHref } from "@/app/lib/site";
import { LinkButton } from "./ui/button";

const features = [
  "Appointment booking over WhatsApp from every section",
  "Click-to-call on every screen size",
  "LocalBusiness schema with hours, address and map pin",
  "Treatment pages written around the questions patients ask",
];

export default function Work() {
  const frameRef = useRef<HTMLDivElement>(null);

  // Soft light that follows the pointer across the preview.
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32"
    >
      <div className="mx-auto grid max-w-[76rem] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:px-8">
        <div>
          <h2
            id="work-title"
            className="text-balance text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.04em]"
          >
            A dental clinic site, live and clickable.
          </h2>
          <p className="mt-6 max-w-[34rem] text-pretty text-lg leading-relaxed text-paper/70">
            We built this the way we build for clients. Open it on your phone, tap
            around, try to book. Before you commit, we can show you a version with
            your own business name and city in it.
          </p>

          <ul className="mt-8 flex flex-col gap-3 text-paper/85">
            {features.map((item) => (
              <li key={item} className="flex gap-3">
                <Check className="mt-1 size-4 shrink-0 text-marigold" strokeWidth={2.5} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/demo/dental" target="_blank" rel="noreferrer" variant="inverse" size="lg">
              Open the live demo
              <ExternalLink className="size-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton
              href={whatsappHref("Hello SiteSphere! Could you make a demo website for my business?")}
              target="_blank"
              rel="noreferrer"
              size="lg"
              className="border border-night-line bg-transparent text-paper shadow-none hover:bg-paper/10"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Request a demo for your business
            </LinkButton>
          </div>
        </div>

        <div
          ref={frameRef}
          onPointerMove={onPointerMove}
          className="group relative pb-10 sm:pb-12"
        >
          <a
            href="/demo/dental"
            target="_blank"
            rel="noreferrer"
            aria-label="Open the dental clinic demo in a new tab"
            className="relative block overflow-hidden rounded-[14px] border border-night-line bg-[#13243b] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]"
          >
            <div className="flex items-center gap-2 border-b border-night-line px-4 py-3" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-paper/20" />
              <span className="size-2.5 rounded-full bg-paper/20" />
              <span className="size-2.5 rounded-full bg-paper/20" />
              <span className="ml-3 truncate rounded-full bg-paper/10 px-3 py-1 text-xs text-paper/60">
                brightsmile-dental.com
              </span>
            </div>
            <div className="relative aspect-[16/10]">
              <Image
                src="/work/dental-desktop.jpg"
                alt="Homepage of the BrightSmile Dental Clinic demo site with an appointment booking button"
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.02]"
              />
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(420px circle at var(--spot-x) var(--spot-y), rgb(255 255 255 / 0.14), transparent 60%)",
              }}
            />
          </a>

          <div
            aria-hidden="true"
            className="absolute right-3 bottom-0 w-[26%] min-w-[96px] overflow-hidden rounded-[18px] border-[5px] border-[#1d2f48] bg-ink shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-2 sm:-right-4"
          >
            <div className="relative aspect-[9/19]">
              <Image
                src="/work/dental-mobile.jpg"
                alt=""
                fill
                sizes="180px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
