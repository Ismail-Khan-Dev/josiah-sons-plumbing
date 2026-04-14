import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const ctx = gsap.context(() => {
      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=120%',
            pin: true,
            scrub: 0.6,
          },
        });

        // Cross motif lines
        const crossLines = crossRef.current?.querySelectorAll('.cross-line');

        // ENTRANCE (0-30%)
        if (crossLines) {
          tl.fromTo(crossLines, { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, stagger: 0.05, ease: 'none' }, 0);
        }

        // Statement words animation
        const words = statementRef.current?.querySelectorAll('.word');
        if (words) {
          tl.fromTo(words, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 0.05);
        }

        tl.fromTo(supportRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1)
          .fromTo(ctaRef.current, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0.15);

        // EXIT (70-100%)
        if (words) {
          tl.to(words, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7);
        }

        tl.to(supportRef.current, { opacity: 0, ease: 'power2.in' }, 0.7)
          .to(ctaRef.current, { y: '8vh', opacity: 0, ease: 'power2.in' }, 0.7);

        if (crossLines) {
          tl.to(crossLines, { scaleX: 0, scaleY: 0, opacity: 0, ease: 'power2.in' }, 0.7);
        }
      } else {
        // Mobile entrance animations
        const words = statementRef.current?.querySelectorAll('.word');
        if (words) {
          gsap.fromTo(words, { y: 20, opacity: 0 }, {
            y: 0, opacity: 1, stagger: 0.05, duration: 0.8, scrollTrigger: { trigger: statementRef.current, start: 'top 85%' }
          });
        }
        gsap.fromTo(supportRef.current, { y: 15, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, scrollTrigger: { trigger: supportRef.current, start: 'top 90%' }
        });
        gsap.fromTo(ctaRef.current, { y: 10, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: ctaRef.current, start: 'top 90%' }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statementWords = ['Upfront', 'pricing.', 'No', 'hidden', 'fees.'];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative w-full min-h-screen lg:h-screen bg-[#0B0F1C] overflow-hidden z-[60] flex flex-col items-center justify-center py-20 lg:py-0"
    >
      {/* Cross Motif Background - Hidden on Mobile */}
      <div
        ref={crossRef}
        className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none"
      >
        <div className="relative w-[40vw] h-[40vw]">
          <div className="cross-line absolute top-1/2 left-0 right-0 h-[1px] bg-[#D4A24F]/10 origin-center" />
          <div className="cross-line absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#D4A24F]/10 origin-center" />
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full px-6 flex flex-col items-center justify-center text-center">
        {/* Main Statement */}
        <div
          ref={statementRef}
          className="max-w-[90vw] lg:max-w-[78vw]"
        >
          <h2 className="font-display text-[clamp(34px,5vw,68px)] leading-[1.1] text-[#F4F6FA] text-balance">
            {statementWords.map((word, index) => (
              <span key={index} className="word inline-block mr-[0.3em] opacity-0 lg:opacity-0">
                {word === 'pricing.' || word === 'fees.' ? (
                  <span className="italic text-[#D4A24F]">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h2>
        </div>

        {/* Supporting Line */}
        <div
          ref={supportRef}
          className="mt-8 max-w-[85vw] lg:max-w-[64vw] opacity-0"
        >
          <p className="text-base lg:text-lg text-[#F4F6FA]/70">
            You'll know the cost before we start—so you can decide with confidence.
          </p>
        </div>

        {/* CTA Button */}
        <div ref={ctaRef} className="mt-12 opacity-0">
          <a href="#contact" className="btn-primary inline-block w-full sm:w-auto">
            Request an Estimate
          </a>
        </div>
      </div>
    </section>
  );
}
