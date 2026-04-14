import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceAreaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const coverageRef = useRef<HTMLDivElement>(null);

  const neighborhoods = [
    'The Heights',
    'Midtown',
    'Montrose',
    'River Oaks',
    'West University',
    'Bellaire',
    'Galleria',
    'Eado',
    'Pearland',
    'Sugar Land',
  ];

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const ctx = gsap.context(() => {
      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          },
        });

        // ENTRANCE (0-30%)
        tl.fromTo(mapRef.current, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0)
          .fromTo(badgeRef.current, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0.1);

        const chips = coverageRef.current?.querySelectorAll('.neighborhood-chip');
        if (chips) {
          tl.fromTo(chips, { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 0.18);
        }

        // EXIT (70-100%)
        tl.to(mapRef.current, { scale: 1.05, opacity: 0, ease: 'power2.in' }, 0.7)
          .to(badgeRef.current, { opacity: 0, ease: 'power2.in' }, 0.7);

        if (chips) {
          tl.to(chips, { opacity: 0, ease: 'power2.in' }, 0.75);
        }
      } else {
        // Mobile simple entrance
        gsap.fromTo(mapRef.current, { opacity: 0 }, {
          opacity: 1, duration: 1, scrollTrigger: { trigger: mapRef.current, start: 'top 80%' }
        });
        gsap.fromTo(badgeRef.current, { scale: 0.9, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 0.8, scrollTrigger: { trigger: badgeRef.current, start: 'top 85%' }
        });
        const chips = coverageRef.current?.querySelectorAll('.neighborhood-chip');
        if (chips) {
          gsap.fromTo(chips, { y: 15, opacity: 0 }, {
            y: 0, opacity: 1, stagger: 0.05, duration: 0.5, scrollTrigger: { trigger: coverageRef.current, start: 'top 85%' }
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen bg-[#0B0F1C] overflow-hidden z-[80] flex flex-col pt-20 lg:pt-0"
    >
      {/* Map Background */}
      <div
        ref={mapRef}
        className="relative lg:absolute lg:inset-0 h-[40vh] lg:h-full opacity-0 lg:opacity-0"
      >
        {/* Google Maps Embed */}
        <div className="absolute inset-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d222142.98847989448!2d-95.6000078!3d29.7604267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b8b4488d8501%3A0xca0d02def365053b!2sHouston%2C%20TX!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'brightness(0.3) contrast(1.2) saturate(0)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-[#0B0F1C]/60" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative flex flex-col items-center justify-center h-full px-6 lg:px-0">
        {/* Location Badge */}
        <div
          ref={badgeRef}
          className="mb-12 lg:mb-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 opacity-0"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#D4A24F] flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 lg:w-8 lg:h-8 text-[#0B0F1C]" />
            </div>
            <div className="px-6 py-3 lg:px-8 lg:py-4 bg-[#0B0F1C] border border-[#D4A24F]">
              <span className="font-display text-xl lg:text-2xl text-[#F4F6FA]">Houston, TX</span>
            </div>
          </div>
        </div>

        {/* Coverage List */}
        <div
          ref={coverageRef}
          className="w-full lg:absolute lg:bottom-[12vh] lg:left-0 lg:right-0 mt-8 mb-12 lg:mt-0 lg:mb-0"
        >
          <p className="text-center text-[#F4F6FA]/60 mb-6 text-sm lg:text-base">
            Serving the greater Houston area with same-day availability.
          </p>
          <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
            {neighborhoods.map((neighborhood, index) => (
              <span
                key={index}
                className="neighborhood-chip px-3 py-1.5 lg:px-4 lg:py-2 bg-[#0B0F1C] border border-[#D4A24F]/50 text-[#D4A24F] text-xs lg:text-sm opacity-0"
              >
                {neighborhood}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <a
              href="tel:+13465700019"
              className="inline-flex items-center gap-2 text-[#D4A24F] font-medium hover:underline text-sm"
            >
              <Phone className="w-4 h-4" />
              Is my area covered? Call us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
