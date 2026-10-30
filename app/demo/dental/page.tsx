import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  HeartPulse,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
} from "lucide-react";

type SearchParamValue = string | string[] | undefined;
type SearchParams = Record<string, SearchParamValue>;
type PageProps = {
  searchParams?: Promise<SearchParams>;
};

type ClinicDetails = {
  name: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  latitude: string;
  longitude: string;
  website: string;
  heroImage: string;
};

const FALLBACK_CLINIC = {
  name: "BrightSmile Dental Clinic",
  phone: "+1 (555) 014-7890",
  address: "123 Wellness Avenue",
  city: "Austin",
  region: "TX",
  postalCode: "78701",
  country: "US",
  latitude: "30.2672",
  longitude: "-97.7431",
  website: "",
  heroImage:
    "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1800&q=85",
};

const paramKeys = {
  name: ["name", "Name", "clinic", "clinicName", "businessName", "business_name"],
  phone: ["phone", "Phone", "telephone", "tel", "mobile", "number"],
  whatsapp: ["whatsapp", "WhatsApp", "whatsappNumber", "wa", "waNumber"],
  address: ["address", "Address", "streetAddress", "location"],
  city: ["city", "City", "locality", "addressLocality"],
  region: ["state", "State", "region", "province", "addressRegion"],
  postalCode: ["postalCode", "zip", "zipcode", "postal_code"],
  country: ["country", "Country", "addressCountry"],
  latitude: ["lat", "latitude", "Latitude"],
  longitude: ["lng", "long", "longitude", "Longitude"],
  website: ["website", "Website", "url", "site"],
  heroImage: ["image", "imageUrl", "heroImage", "photo"],
};

const treatmentServices = [
  {
    title: "Preventive dental checkups",
    answer:
      "Routine exams, digital X-rays, cleanings, fluoride care, and gum health screening for long-term oral wellness.",
    icon: ShieldCheck,
  },
  {
    title: "Cosmetic dentistry and smile design",
    answer:
      "Teeth whitening, bonding, veneers, contouring, and natural-looking cosmetic planning for confident smiles.",
    icon: Sparkles,
  },
  {
    title: "Dental implants and crowns",
    answer:
      "Restorative treatment for missing or damaged teeth, including implant consultations, crowns, and bridges.",
    icon: Smile,
  },
  {
    title: "Root canal treatment",
    answer:
      "Gentle endodontic care to relieve tooth pain, treat infection, and preserve your natural tooth whenever possible.",
    icon: Stethoscope,
  },
  {
    title: "Emergency dental care",
    answer:
      "Same-day guidance for toothache, swelling, broken teeth, lost fillings, and urgent dental concerns.",
    icon: HeartPulse,
  },
  {
    title: "Clear aligners and orthodontic consults",
    answer:
      "Smile alignment assessments, clear aligner planning, and bite guidance for adults and teens.",
    icon: BadgeCheck,
  },
];

const visitSteps = [
  "Share your concern, symptoms, goals, and dental history with the clinical team.",
  "Receive a focused exam with digital imaging when needed.",
  "Review a clear diagnosis, treatment options, timelines, and estimated costs.",
  "Choose a care plan and book your next appointment before you leave.",
];

const faqs = [
  {
    question: "How often should I book a dental checkup?",
    answer:
      "Most patients benefit from a checkup and professional cleaning every six months. Patients with gum disease, implants, braces, or recurring sensitivity may need a more frequent recall schedule.",
  },
  {
    question: "Can I book an emergency dentist appointment?",
    answer:
      "Yes. Call or message the clinic as early as possible if you have severe tooth pain, swelling, dental trauma, or a broken restoration so the team can triage your case quickly.",
  },
  {
    question: "Do cosmetic dental treatments look natural?",
    answer:
      "Modern cosmetic dentistry is planned around facial balance, tooth shade, bite function, and gum shape so veneers, whitening, bonding, and crowns look clean rather than artificial.",
  },
  {
    question: "What should I bring to my first dental visit?",
    answer:
      "Bring a photo ID, insurance details if applicable, a list of medications, recent dental X-rays if you have them, and notes about pain, sensitivity, or smile goals.",
  },
];

function readParam(params: SearchParams, keys: string[], fallback: string) {
  return readParamOptional(params, keys) ?? fallback;
}

function readParamOptional(params: SearchParams, keys: string[]) {
  for (const key of keys) {
    const value = params[key];
    const normalized = Array.isArray(value) ? value[0] : value;

    if (typeof normalized === "string" && normalized.trim().length > 0) {
      return normalized.trim();
    }
  }

  return undefined;
}

function sanitizeWhatsAppNumber(rawNumber: string) {
  const digits = rawNumber.replace(/[^\d]/g, "");

  if (digits.startsWith("00")) {
    return digits.slice(2);
  }

  return digits;
}

function sanitizeTelHref(rawNumber: string) {
  return rawNumber.replace(/[^\d+]/g, "");
}

function safeExternalUrl(rawUrl: string) {
  if (!rawUrl) {
    return "";
  }

  try {
    const url = new URL(rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
  } catch {
    return "";
  }

  return "";
}

function safeUnsplashImage(rawUrl: string) {
  try {
    const url = new URL(rawUrl);

    if (url.protocol === "https:" && url.hostname === "images.unsplash.com") {
      return rawUrl;
    }
  } catch {
    return FALLBACK_CLINIC.heroImage;
  }

  return FALLBACK_CLINIC.heroImage;
}

function safeCoordinate(rawCoordinate: string, fallback: string) {
  const coordinate = Number(rawCoordinate);
  return Number.isFinite(coordinate) ? String(coordinate) : fallback;
}

async function resolveSearchParams(searchParams: PageProps["searchParams"]) {
  return searchParams ? await searchParams : {};
}

function getClinicDetails(params: SearchParams): ClinicDetails {
  const city = readParamOptional(params, paramKeys.city) ?? FALLBACK_CLINIC.city;
  const region =
    readParamOptional(params, paramKeys.region) ?? FALLBACK_CLINIC.region;
  const phone = readParam(params, paramKeys.phone, FALLBACK_CLINIC.phone);
  const whatsappSource = readParam(params, paramKeys.whatsapp, phone);
  const rawHeroImage = readParam(params, paramKeys.heroImage, FALLBACK_CLINIC.heroImage);
  const postalCode =
    readParamOptional(params, paramKeys.postalCode) ??
    (city === FALLBACK_CLINIC.city && region === FALLBACK_CLINIC.region
      ? FALLBACK_CLINIC.postalCode
      : "");

  return {
    name: readParam(params, paramKeys.name, FALLBACK_CLINIC.name),
    phone,
    whatsappNumber:
      sanitizeWhatsAppNumber(whatsappSource) || sanitizeWhatsAppNumber(phone),
    address: readParam(params, paramKeys.address, FALLBACK_CLINIC.address),
    city,
    region,
    postalCode,
    country: readParam(params, paramKeys.country, FALLBACK_CLINIC.country),
    latitude: safeCoordinate(
      readParam(params, paramKeys.latitude, FALLBACK_CLINIC.latitude),
      FALLBACK_CLINIC.latitude
    ),
    longitude: safeCoordinate(
      readParam(params, paramKeys.longitude, FALLBACK_CLINIC.longitude),
      FALLBACK_CLINIC.longitude
    ),
    website: safeExternalUrl(
      readParam(params, paramKeys.website, FALLBACK_CLINIC.website)
    ),
    heroImage: safeUnsplashImage(rawHeroImage),
  };
}

function buildWhatsAppHref(clinic: ClinicDetails) {
  const message = `Hello ${clinic.name}, I would like to book a dental appointment in ${clinic.city}.`;

  return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function buildLocalBusinessSchema(clinic: ClinicDetails) {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    additionalType: "https://schema.org/MedicalClinic",
    name: clinic.name,
    description: `${clinic.name} provides preventive, cosmetic, restorative, emergency, and family dental care in ${clinic.city}.`,
    telephone: clinic.phone,
    url: clinic.website || undefined,
    image: clinic.heroImage,
    priceRange: "$$",
    medicalSpecialty: "Dentistry",
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address,
      addressLocality: clinic.city,
      addressRegion: clinic.region,
      postalCode: clinic.postalCode || undefined,
      addressCountry: clinic.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.latitude,
      longitude: clinic.longitude,
    },
    areaServed: {
      "@type": "City",
      name: clinic.city,
    },
    availableService: treatmentServices.map((service) => ({
      "@type": "MedicalProcedure",
      name: service.title,
      description: service.answer,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
  };
}

function jsonLd(schema: ReturnType<typeof buildLocalBusinessSchema>) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const clinic = getClinicDetails(await resolveSearchParams(searchParams));
  const title = `${clinic.name} | Dentist in ${clinic.city}`;
  const description = `Book preventive, cosmetic, emergency, and restorative dental care at ${clinic.name} in ${clinic.city}. Call ${clinic.phone} for appointments.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: clinic.heroImage,
          alt: `${clinic.name} dental clinic and smile care team in ${clinic.city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [clinic.heroImage],
    },
  };
}

export default async function Home({ searchParams }: PageProps) {
  const clinic = getClinicDetails(await resolveSearchParams(searchParams));
  const whatsappHref = buildWhatsAppHref(clinic);
  const telHref = `tel:${sanitizeTelHref(clinic.phone)}`;
  const cityLine = [clinic.city, clinic.region].filter(Boolean).join(", ");
  const postalLine = clinic.postalCode ? ` ${clinic.postalCode}` : "";
  const schema = buildLocalBusinessSchema(clinic);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />

      <div className="min-h-screen bg-white text-slate-950">
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
          <nav
            aria-label="Primary navigation"
            className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
          >
            <a href="#top" className="group flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full border border-teal-100 bg-teal-50 text-teal-700 transition duration-300 group-hover:border-teal-200 group-hover:bg-teal-100">
                <Smile aria-hidden="true" className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-slate-950">
                  {clinic.name}
                </span>
                <span className="block text-xs text-slate-500">
                  Dentist in {cityLine}
                </span>
              </span>
            </a>

            <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
              <a href="#treatments" className="transition hover:text-teal-700">
                Treatments
              </a>
              <a href="#first-visit" className="transition hover:text-teal-700">
                First visit
              </a>
              <a href="#faq" className="transition hover:text-teal-700">
                FAQs
              </a>
              <a href="#contact" className="transition hover:text-teal-700">
                Contact
              </a>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_20px_-4px_rgba(15,118,110,0.35)] transition duration-300 hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              aria-label={`Book a dental appointment with ${clinic.name} on WhatsApp`}
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">Book appointment</span>
              <span className="sm:hidden">Book</span>
            </a>
          </nav>
        </header>

        <main id="top">
          <article>
            <section
              aria-labelledby="hero-title"
              className="relative isolate overflow-hidden border-b border-slate-200 bg-white"
            >
              <Image
                src={clinic.heroImage}
                alt={`${clinic.name} dentist providing calm dental treatment and smile care in ${clinic.city}`}
                fill
                priority
                sizes="100vw"
                className="absolute inset-0 -z-20 object-cover object-[62%_center]"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/95 to-white/45" />
              <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-white to-transparent" />

              <div className="mx-auto grid min-h-[86svh] max-w-7xl items-center px-5 py-24 sm:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(280px,0.5fr)] lg:gap-16">
                <div className="max-w-3xl">
                  <p className="reveal-up mb-5 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase text-teal-700 shadow-sm">
                    <MapPin aria-hidden="true" className="size-3.5" />
                    Dental clinic in {cityLine}
                  </p>

                  <h1
                    id="hero-title"
                    className="reveal-up max-w-4xl text-4xl font-semibold leading-[1.05] text-slate-950 sm:text-6xl lg:text-7xl"
                    style={{ animationDelay: "80ms" }}
                  >
                    Looking for a dentist in {clinic.city}? {clinic.name} makes
                    dental care feel calm, clear, and precise.
                  </h1>

                  <p
                    className="reveal-up mt-7 max-w-2xl text-lg leading-8 text-slate-600"
                    style={{ animationDelay: "160ms" }}
                  >
                    Book preventive checkups, cosmetic dentistry, emergency
                    dental visits, implants, crowns, and family dental care with
                    a clinic focused on comfort, honest explanations, and
                    beautiful long-term results.
                  </p>

                  <div
                    className="reveal-up mt-9 flex flex-col gap-3 sm:flex-row"
                    style={{ animationDelay: "240ms" }}
                  >
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_-4px_rgba(15,118,110,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                    >
                      <CalendarDays aria-hidden="true" className="size-4" />
                      Book a dental visit
                    </a>
                    <a
                      href={telHref}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/85 px-6 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                    >
                      <Phone aria-hidden="true" className="size-4" />
                      Call {clinic.phone}
                    </a>
                  </div>

                  <dl
                    className="reveal-up mt-12 grid max-w-2xl grid-cols-1 gap-6 border-t border-slate-200 pt-8 text-sm sm:grid-cols-3"
                    style={{ animationDelay: "320ms" }}
                  >
                    <div>
                      <dt className="font-semibold text-slate-950">
                        Same-day help
                      </dt>
                      <dd className="mt-1 text-slate-500">
                        Urgent pain and broken tooth guidance.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-950">
                        Clear plans
                      </dt>
                      <dd className="mt-1 text-slate-500">
                        Options, timelines, and costs explained.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-950">
                        Smile-focused
                      </dt>
                      <dd className="mt-1 text-slate-500">
                        Function, comfort, and aesthetics together.
                      </dd>
                    </div>
                  </dl>
                </div>

                <aside
                  aria-label="Clinic appointment summary"
                  className="reveal-up mt-12 hidden border-l border-teal-200 pl-6 lg:block"
                  style={{ animationDelay: "400ms" }}
                >
                  <p className="text-sm font-semibold text-slate-950">
                    Need dental care soon?
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Message {clinic.name} with your preferred time, dental
                    concern, and whether you are booking a new patient exam,
                    cleaning, cosmetic consultation, or emergency visit.
                  </p>
                </aside>
              </div>
            </section>

            <section
              aria-labelledby="answers-title"
              className="bg-slate-50 px-5 py-20 sm:px-8 lg:py-24"
            >
              <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <header className="reveal-up">
                  <p className="text-sm font-semibold uppercase text-teal-700">
                    Quick answer
                  </p>
                  <h2
                    id="answers-title"
                    className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl"
                  >
                    What dental treatments does {clinic.name} offer in{" "}
                    {clinic.city}?
                  </h2>
                  <p className="mt-5 max-w-xl leading-7 text-slate-600">
                    {clinic.name} provides complete dental care for prevention,
                    pain relief, smile improvement, tooth replacement, and
                    long-term oral health.
                  </p>
                </header>

                <ul className="grid gap-3">
                  {treatmentServices.slice(0, 5).map((service, index) => (
                    <li
                      key={service.title}
                      className="reveal-up flex gap-3 rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm"
                      style={{ animationDelay: `${index * 70}ms` }}
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-0.5 size-5 flex-none text-teal-700"
                      />
                      <span>
                        <strong className="font-semibold text-slate-950">
                          {service.title}:
                        </strong>{" "}
                        <span className="text-slate-600">{service.answer}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section
              id="treatments"
              aria-labelledby="treatments-title"
              className="px-5 py-20 sm:px-8 lg:py-28"
            >
              <div className="mx-auto max-w-7xl">
                <div className="reveal-up flex max-w-3xl flex-col gap-4">
                  <p className="text-sm font-semibold uppercase text-teal-700">
                    Comprehensive care
                  </p>
                  <h2
                    id="treatments-title"
                    className="text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl"
                  >
                    Comprehensive dental treatments in {clinic.city}, explained
                    in plain language.
                  </h2>
                  <p className="text-lg leading-8 text-slate-600">
                    Each treatment starts with diagnosis, transparent options,
                    and a plan that protects your teeth, gums, bite, and smile.
                  </p>
                </div>

                <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {treatmentServices.map((service, index) => {
                    const Icon = service.icon;

                    return (
                      <li key={service.title}>
                        <article
                          className="reveal-up h-full rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
                          style={{ animationDelay: `${index * 80}ms` }}
                        >
                          <div className="mb-6 flex size-11 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                            <Icon aria-hidden="true" className="size-5" />
                          </div>
                          <h3 className="text-xl font-semibold text-slate-950">
                            {service.title}
                          </h3>
                          <p className="mt-3 leading-7 text-slate-600">
                            {service.answer}
                          </p>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>

            <section
              aria-labelledby="why-title"
              className="border-y border-slate-200 bg-slate-50 px-5 py-20 sm:px-8 lg:py-28"
            >
              <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div className="relative min-h-[420px] overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=85"
                    alt={`${clinic.name} dentist discussing cosmetic dentistry and treatment planning with a patient in ${clinic.city}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="reveal-up">
                  <p className="text-sm font-semibold uppercase text-teal-700">
                    Why patients choose us
                  </p>
                  <h2
                    id="why-title"
                    className="mt-4 text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl"
                  >
                    Why choose {clinic.name} for your smile in {clinic.city}?
                  </h2>
                  <p className="mt-5 text-lg leading-8 text-slate-600">
                    Patients choose a dentist when the care feels competent,
                    kind, and easy to understand. This clinic page is structured
                    to answer the questions people and answer engines ask before
                    booking.
                  </p>

                  <ul className="mt-8 grid gap-4">
                    {[
                      "Gentle clinical approach for anxious patients and first-time visitors.",
                      "Treatment plans that explain what is urgent, optional, cosmetic, or preventive.",
                      "Modern diagnostics for clearer decisions and more predictable dental outcomes.",
                      "Direct booking through phone or WhatsApp for fast appointment requests.",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 text-slate-700">
                        <Star
                          aria-hidden="true"
                          className="mt-1 size-4 flex-none fill-teal-100 text-teal-700"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section
              id="first-visit"
              aria-labelledby="visit-title"
              className="px-5 py-20 sm:px-8 lg:py-28"
            >
              <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
                <header className="reveal-up">
                  <p className="text-sm font-semibold uppercase text-teal-700">
                    First appointment
                  </p>
                  <h2
                    id="visit-title"
                    className="mt-4 text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl"
                  >
                    What happens during your first dental visit?
                  </h2>
                  <p className="mt-5 leading-7 text-slate-600">
                    The goal is to leave with a diagnosis, a clear path forward,
                    and confidence about the next step.
                  </p>
                </header>

                <ol className="grid gap-4 md:grid-cols-2">
                  {visitSteps.map((step, index) => (
                    <li
                      key={step}
                      className="reveal-up rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm"
                      style={{ animationDelay: `${index * 90}ms` }}
                    >
                      <span className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                        {index + 1}
                      </span>
                      <p className="mt-5 leading-7 text-slate-700">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section
              id="faq"
              aria-labelledby="faq-title"
              className="bg-slate-50 px-5 py-20 sm:px-8 lg:py-28"
            >
              <div className="mx-auto max-w-4xl">
                <header className="reveal-up">
                  <p className="text-sm font-semibold uppercase text-teal-700">
                    Patient questions
                  </p>
                  <h2
                    id="faq-title"
                    className="mt-4 text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl"
                  >
                    Questions people ask before booking a dentist in{" "}
                    {clinic.city}
                  </h2>
                </header>

                <div className="mt-10 divide-y divide-slate-200 rounded-[8px] border border-slate-200 bg-white shadow-sm">
                  {faqs.map((faq, index) => (
                    <section
                      key={faq.question}
                      aria-labelledby={`faq-${index}`}
                      className="reveal-up p-6"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <h3
                        id={`faq-${index}`}
                        className="text-lg font-semibold text-slate-950"
                      >
                        {faq.question}
                      </h3>
                      <p className="mt-3 leading-7 text-slate-600">
                        {faq.answer}
                      </p>
                    </section>
                  ))}
                </div>
              </div>
            </section>

            <section
              id="contact"
              aria-labelledby="contact-title"
              className="px-5 py-20 sm:px-8 lg:py-28"
            >
              <div className="mx-auto grid max-w-7xl gap-12 rounded-[8px] border border-slate-200 bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-14">
                <div className="reveal-up">
                  <p className="text-sm font-semibold uppercase text-teal-700">
                    Book dental care
                  </p>
                  <h2
                    id="contact-title"
                    className="mt-4 text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl"
                  >
                    Ready to schedule with {clinic.name}?
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                    Contact the clinic for appointments, emergency dental
                    guidance, treatment estimates, or a second opinion about
                    your smile.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_-4px_rgba(15,118,110,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                    >
                      <MessageCircle aria-hidden="true" className="size-4" />
                      Message on WhatsApp
                    </a>
                    <a
                      href={telHref}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                    >
                      <Phone aria-hidden="true" className="size-4" />
                      Call the clinic
                    </a>
                  </div>
                </div>

                <aside
                  aria-label={`${clinic.name} contact information`}
                  className="reveal-up rounded-[8px] border border-slate-200 bg-slate-50 p-6"
                  style={{ animationDelay: "100ms" }}
                >
                  <dl className="grid gap-6">
                    <div className="flex gap-4">
                      <MapPin
                        aria-hidden="true"
                        className="mt-1 size-5 flex-none text-teal-700"
                      />
                      <div>
                        <dt className="font-semibold text-slate-950">
                          Clinic address
                        </dt>
                        <dd className="mt-1 text-slate-600">
                          {clinic.address}, {cityLine}
                          {postalLine}
                        </dd>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Phone
                        aria-hidden="true"
                        className="mt-1 size-5 flex-none text-teal-700"
                      />
                      <div>
                        <dt className="font-semibold text-slate-950">Phone</dt>
                        <dd className="mt-1 text-slate-600">{clinic.phone}</dd>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Clock3
                        aria-hidden="true"
                        className="mt-1 size-5 flex-none text-teal-700"
                      />
                      <div>
                        <dt className="font-semibold text-slate-950">
                          Typical hours
                        </dt>
                        <dd className="mt-1 text-slate-600">
                          Monday to Friday, 9:00 AM to 6:00 PM. Saturday,
                          10:00 AM to 2:00 PM.
                        </dd>
                      </div>
                    </div>
                  </dl>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-800 transition hover:gap-3"
                  >
                    Ask about an appointment
                    <ChevronRight aria-hidden="true" className="size-4" />
                  </a>
                </aside>
              </div>
            </section>
          </article>
        </main>

        <footer className="border-t border-slate-200 bg-slate-50 px-5 py-10 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {clinic.name}. Dental care in{" "}
              {cityLine}.
            </p>
            <p>
              {clinic.address}, {cityLine}
              {postalLine} · {clinic.phone}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
