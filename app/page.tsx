import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Work from "./components/Work";
import Process from "./components/Process";
import Engagements from "./components/Engagements";
import Faq from "./components/Faq";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import { CONTACT_EMAIL } from "./lib/site";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SiteSphere",
  url: "https://sitesphere.tech",
  logo: "https://sitesphere.tech/logo-mark.png",
  email: CONTACT_EMAIL,
  description:
    "Custom website design, local SEO and Google Business Profile management for local businesses.",
  knowsAbout: ["Web design", "Web development", "Local SEO", "Technical SEO", "Google Business Profile"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <Process />
        <Engagements />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
