import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const altActionRef = useRef<HTMLDivElement>(null);

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
        tl.fromTo(imageRef.current, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
          .fromTo(headlineRef.current, { x: '-40vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.05)
          .fromTo(subheadlineRef.current, { x: '-40vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.1)
          .fromTo(ctaRef.current, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0.12)
          .fromTo(altActionRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.15);

        // EXIT (70-100%)
        tl.to(imageRef.current, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)
          .to([headlineRef.current, subheadlineRef.current], { x: '-12vw', opacity: 0, ease: 'power2.in' }, 0.7)
          .to(ctaRef.current, { y: '8vh', opacity: 0, ease: 'power2.in' }, 0.7)
          .to(altActionRef.current, { opacity: 0, ease: 'power2.in' }, 0.75);
      } else {
        // Mobile simple entrance
        gsap.fromTo(headlineRef.current, { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: headlineRef.current, start: 'top 85%' }
        });
        gsap.fromTo(subheadlineRef.current, { y: 15, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, scrollTrigger: { trigger: subheadlineRef.current, start: 'top 90%' }
        });
        gsap.fromTo(ctaRef.current, { scale: 0.95, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 0.5, scrollTrigger: { trigger: ctaRef.current, start: 'top 90%' }
        });
        gsap.set([imageRef.current, altActionRef.current], { opacity: 1 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen bg-[#0B0F1C] overflow-hidden z-[100] flex flex-col pt-20 lg:pt-0"
    >
      <div className="relative w-full h-full flex flex-col lg:flex-row items-center px-6 lg:px-[7vw] gap-12 lg:gap-0">
        {/* Content - Left */}
        <div className="relative lg:absolute lg:left-[7vw] lg:top-[26vh] w-full lg:w-[34vw] order-1 lg:order-1 text-center lg:text-left">
          {/* Headline */}
          <div ref={headlineRef} className="opacity-0">
            <h2 className="font-display text-[clamp(36px,4.5vw,64px)] leading-[1.05] text-[#F4F6FA]">
              Ready to{' '}
              <br className="lg:hidden" />
              <span className="italic text-[#D4A24F]">book?</span>
            </h2>
          </div>

          {/* Subheadline */}
          <div ref={subheadlineRef} className="mt-6 opacity-0">
            <p className="text-base lg:text-lg text-[#F4F6FA]/70 leading-relaxed max-w-md mx-auto lg:mx-0">
              Schedule a visit today. We'll confirm quickly and show up on time.
            </p>
          </div>

          {/* CTA Button */}
          <div ref={ctaRef} className="mt-10 opacity-0 flex flex-col sm:flex-row lg:flex-col gap-4">
            <a href="#contact" className="btn-primary inline-block text-center w-full lg:w-auto">
              Book Online
            </a>
            <a href="tel:+13465700019" className="btn-ghost lg:hidden text-center w-full">
               Call Now
            </a>
          </div>

          {/* Alt Action - Desktop Only */}
          <div ref={altActionRef} className="hidden lg:block mt-6 opacity-0">
            <a
              href="tel:+13465700019"
              className="inline-flex items-center gap-2 text-[#F4F6FA]/70 hover:text-[#D4A24F] transition-colors"
            >
              <Phone className="w-4 h-4" />
              Or call (346) 570-0019
            </a>
          </div>
        </div>

        {/* Large Image Frame - Right */}
        <div
          ref={imageRef}
          className="relative lg:absolute lg:left-[46vw] lg:top-[14vh] w-full lg:w-[48vw] h-[40vh] lg:h-[72vh] opacity-0 order-2 lg:order-2"
        >
          <div className="relative w-full h-full">
            <img
              src="/images/closing_plumber.jpg"
              alt="Professional plumber"
              className="w-full h-full object-cover lg:object-center"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
