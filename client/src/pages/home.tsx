import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import TechnologySection from "@/components/technology-section";
import ProductsSection from "@/components/products-section";
import TestimonialsSection from "@/components/testimonials-section";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <TechnologySection />
      <ProductsSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
