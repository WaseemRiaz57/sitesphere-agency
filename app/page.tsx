import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import ServicesBento from "./components/ServicesBento";
import Sectors from "./components/Sectors";
import CaseStudies from "./components/CaseStudies";
import Pricing from "./components/Pricing";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* Grain overlay */}
      <div aria-hidden="true" className="grain-overlay" />

      <Navbar />
      <Hero />
      <Marquee />
      <ServicesBento />
      <Sectors />
      <CaseStudies />
      <Pricing />
      <ContactForm />
      <Footer />
    </>
  );
}
