import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Services from "./components/Services";
import Ugc from "./components/Ugc";
import Industries from "./components/Industries";
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
  url: "https://www.sitesphere.me",
  logo: "https://www.sitesphere.me/logo-mark.png",
  email: CONTACT_EMAIL,
  description:
    "Digital agency for local businesses: custom website design and development, local SEO, Google Business Profile management, UGC video ads and paid social campaigns.",
  knowsAbout: [
    "Web design",
    "Web development",
    "Local SEO",
    "Technical SEO",
    "Google Business Profile",
    "UGC video ads",
    "Meta ads",
    "Google Ads",
    "TikTok ads",
    "Social media marketing",
  ],
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
        <About />
        <Services />
        <Ugc />
        <Industries />
        <Process />
        <Engagements />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
