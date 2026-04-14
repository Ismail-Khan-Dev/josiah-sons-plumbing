import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import WhyChooseSection from './sections/WhyChooseSection';
import HowItWorksSection from './sections/HowItWorksSection';
import PricingSection from './sections/PricingSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ServiceAreaSection from './sections/ServiceAreaSection';
import FAQSection from './sections/FAQSection';
import FinalCTASection from './sections/FinalCTASection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const isMobile = window.innerWidth < 1024;
      
      if (isMobile) {
        // Simple refresh for mobile, no complex snap logic
        ScrollTrigger.refresh();
        return;
      }

      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center:
          (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value) => {
            // Check if within any pinned range (allow small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value; // flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });

      // Refresh ScrollTrigger
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-[#0B0F1C] min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero - pin: true */}
        <HeroSection />

        {/* Sections 2-3: Services - pin: true */}
        <ServicesSection />

        {/* Section 4: Why Choose Us - pin: true */}
        <WhyChooseSection />

        {/* Section 5: How It Works - pin: true */}
        <HowItWorksSection />

        {/* Section 6: Pricing - pin: true */}
        <PricingSection />

        {/* Section 7: Testimonials - pin: false */}
        <TestimonialsSection />

        {/* Section 8: Service Area - pin: true */}
        <ServiceAreaSection />

        {/* Section 9: FAQ - pin: false */}
        <FAQSection />

        {/* Section 10: Final CTA - pin: true */}
        <FinalCTASection />

        {/* Section 11: Contact - pin: false */}
        <ContactSection />

        {/* Section 12: Footer - pin: false */}
        <FooterSection />
      </main>

      {/* Grain Overlay */}
      <div className="grain-overlay" />
    </div>
  );
}

export default App;
