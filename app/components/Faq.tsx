import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export const faqs = [
  {
    q: "How much does a website cost?",
    a: "It depends on how many services and locations you have and what the site needs to do. We start with a free audit, then send a written proposal with a fixed scope and cost, so there are no surprises later.",
  },
  {
    q: "How long until my new site is live?",
    a: "Most local business sites go live within four to eight weeks of kickoff. Your proposal includes a dated plan, and you can follow progress on a private preview link the whole time.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. The domain, the design, the code, the content and your analytics data are yours. If you ever move on, we hand everything over.",
  },
  {
    q: "Can you help us rank in our city and nearby areas?",
    a: "Yes, that is at the heart of what we do. We build pages for each service and area you cover, optimise your Google Business Profile, fix your listings across directories and track rankings month by month.",
  },
  {
    q: "When will we see results from SEO?",
    a: "Fixes to your profile and site speed often show up within weeks. Ranking for competitive searches usually takes three to six months of steady work. Your monthly report shows exactly what moved.",
  },
  {
    q: "What are UGC ads, and do they work for local businesses?",
    a: "UGC ads are short, phone-shot videos of real people talking about your business, like a friend's recommendation. They often outperform polished adverts on Instagram, TikTok and YouTube Shorts because they feel trustworthy. For local businesses they work especially well when the creator shows the real place, the real staff and the real result.",
  },
  {
    q: "Do you run the ads, or only make the videos?",
    a: "Both, or either. We can produce UGC videos for you to post and boost yourself, or handle the whole campaign: scripts, creators, editing, targeting people near your business, budget management and monthly reporting on calls and bookings.",
  },
  {
    q: "We already have a website. Do we need a new one?",
    a: "Not always. Our audit tells you whether improving your current site is enough or whether a rebuild will pay off sooner. We will recommend the cheaper option when it does the job.",
  },
];

export default function Faq() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-16 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <div className="mx-auto grid grid-cols-1 max-w-[76rem] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20 lg:px-8">
        <div>
          <h2
            id="faq-title"
            className="text-balance text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.04em]"
          >
            Questions business owners ask us.
          </h2>
          <p className="mt-5 max-w-[28rem] text-lg text-ink-soft">
            Something else on your mind?{" "}
            <a href="#contact" className="font-semibold text-cobalt underline decoration-cobalt/30 underline-offset-4 transition-colors hover:decoration-cobalt">
              Ask us directly
            </a>
            .
          </p>
        </div>

        <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-line">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
