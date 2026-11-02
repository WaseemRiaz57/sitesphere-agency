import { Compass, KeyRound, LineChart, Zap, type LucideIcon } from "lucide-react";

const principles: { title: string; body: string; Icon: LucideIcon }[] = [
  {
    title: "Strategy before design",
    body: "We start with your customers, your competitors and the searches that matter in your area. The design follows from that, never from a template.",
    Icon: Compass,
  },
  {
    title: "Speed is a feature",
    body: "Our sites are built on modern frameworks and load fast on any phone, even on a weak signal. Search engines and customers both reward it.",
    Icon: Zap,
  },
  {
    title: "Measured, not guessed",
    body: "Every call, form, WhatsApp message and booking is tracked, so each decision rests on what actually brings customers through your door.",
    Icon: LineChart,
  },
  {
    title: "Yours to keep",
    body: "You own your domain, website, content and ad accounts from day one. No lock-in contracts, no holding your site hostage.",
    Icon: KeyRound,
  },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-16 sm:py-32">
      <div className="mx-auto grid grid-cols-1 max-w-[76rem] gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20 lg:px-8">
        <div>
          <h2
            id="about-title"
            className="text-balance text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.04em]"
          >
            The marketing department your business never had.
          </h2>
          <div className="mt-6 flex max-w-[36rem] flex-col gap-4 text-pretty text-lg leading-relaxed text-ink-soft">
            <p>
              SiteSphere is a digital agency for local businesses. We design and
              build websites, handle SEO and Google Business Profiles, and produce
              UGC video and paid ad campaigns.
            </p>
            <p>
              Busy owners rarely have time to manage a developer, an SEO consultant
              and an ad freelancer separately, and those pieces rarely work together. We bring all of it under one roof, with one point of contact
              and one monthly report.
            </p>
          </div>
          <p className="mt-10 max-w-[30rem] border-l-2 border-cobalt pl-5 font-serif text-2xl leading-snug italic">
            We measure our work by one thing: how many new customers find you, choose
            you and get in touch.
          </p>
        </div>

        <dl className="grid content-start gap-x-10 gap-y-10 sm:grid-cols-2 lg:pt-3">
          {principles.map(({ title, body, Icon }) => (
            <div key={title}>
              <dt className="flex items-center gap-3 text-xl font-bold tracking-[-0.025em]">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cobalt-wash text-cobalt">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                {title}
              </dt>
              <dd className="mt-3 text-pretty text-ink-soft">{body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
