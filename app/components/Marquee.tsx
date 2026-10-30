import { MapPin } from "lucide-react";

const industries = [
  "Dental clinics",
  "Medical practices",
  "Restaurants & cafés",
  "Law firms",
  "Salons & spas",
  "Real estate agents",
  "Home services",
  "Gyms & studios",
  "Schools & tutors",
  "Auto workshops",
];

// Lightweight, CSS-only marquee: the list is rendered twice and shifted by half its width.
export default function Marquee() {
  return (
    <section aria-label="Industries we work with" className="border-y border-line bg-paper-deep/60 py-6">
      <div className="marquee-mask group flex overflow-hidden">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]"
          >
            {industries.map((name) => (
              <li
                key={name}
                className="flex items-center gap-3 text-xl font-semibold tracking-[-0.02em] whitespace-nowrap text-ink/75 sm:text-2xl"
              >
                <MapPin className="size-5 text-cobalt" aria-hidden="true" />
                {name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
