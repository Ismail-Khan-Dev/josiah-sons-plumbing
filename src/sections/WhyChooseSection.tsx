import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const checklistItems = [
    'Licensed, insured, background-checked',
    'Upfront pricing before any work begins',
    'Same-day scheduling when you need it',
    'Warranty-backed repairs',
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
        tl.fromTo(portraitRef.current, { x: '-60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
          .fromTo(headlineRef.current, { x: '40vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.05)
          .fromTo(bodyRef.current, { x: '40vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.1);

        const checklistItems = checklistRef.current?.querySelectorAll('.check-item');
        if (checklistItems) {
          tl.fromTo(checklistItems, { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, ease: 'none' }, 0.12);
        }

        tl.fromTo(ctaRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.2);

        // EXIT (70-100%)
        tl.to(portraitRef.current, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
          .to([headlineRef.current, bodyRef.current], { x: '14vw', opacity: 0, ease: 'power2.in' }, 0.7);
        
        if (checklistItems) {
          tl.to(checklistItems, { opacity: 0, ease: 'power2.in' }, 0.75);
        }
        
        tl.to(ctaRef.current, { opacity: 0, ease: 'power2.in' }, 0.75);
      } else {
        // Mobile entrance animations
        gsap.fromTo(portraitRef.current, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: portraitRef.current, start: 'top 80%' }
        });
        gsap.fromTo(headlineRef.current, { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: headlineRef.current, start: 'top 85%' }
        });
        const items = checklistRef.current?.querySelectorAll('.check-item');
        if (items) {
          gsap.fromTo(items, { y: 15, opacity: 0 }, {
            y: 0, opacity: 1, stagger: 0.1, duration: 0.5, scrollTrigger: { trigger: checklistRef.current, start: 'top 85%' }
          });
        }
        gsap.set([bodyRef.current, ctaRef.current], { opacity: 1 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen bg-[#0B0F1C] overflow-hidden z-40 flex flex-col py-20 lg:py-0"
    >
      <div className="relative w-full h-full flex flex-col lg:flex-row items-center px-6 lg:px-[6vw] gap-12 lg:gap-0">
        {/* Portrait Frame */}
        <div
          ref={portraitRef}
          className="relative lg:absolute lg:left-[6vw] lg:top-[16vh] w-full lg:w-[42vw] h-[40vh] lg:h-[68vh] opacity-0 order-2 lg:order-1"
        >
          <div className="relative w-full h-full border border-[#D4A24F]">
            <div className="absolute inset-2 border border-[#D4A24F]/30" />
            <img
              src="/images/hero_plumber.jpg"
              alt="Professional Josiah and Sons plumber"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative lg:absolute lg:left-[54vw] lg:top-[18vh] w-full lg:w-[40vw] order-1 lg:order-2">
          {/* Headline */}
          <div ref={headlineRef} className="opacity-0">
            <h2 className="font-display text-[clamp(32px,3.6vw,52px)] leading-[1.05] text-[#F4F6FA]">
              Why homeowners
              <br />
              <span className="italic text-[#D4A24F]">choose us</span>
            </h2>
          </div>

          {/* Body Copy */}
          <div ref={bodyRef} className="mt-6 opacity-0">
            <p className="text-lg text-[#F4F6FA]/70 leading-relaxed max-w-md">
              We treat your home like it's our own—clean arrival, clear communication, and work that lasts.
            </p>
          </div>

          {/* Checklist */}
          <div ref={checklistRef} className="mt-10 space-y-4">
            {checklistItems.map((item, index) => (
              <div
                key={index}
                className="check-item flex items-center gap-4 opacity-0"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4A24F]/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#D4A24F]" />
                </div>
                <span className="text-[#F4F6FA]/90">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="mt-10 opacity-0">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 text-[#D4A24F] font-medium group"
            >
              See pricing
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
