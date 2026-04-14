import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Shield, Clock, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    
    const ctx = gsap.context(() => {
      // Auto-play entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        imageFrameRef.current,
        { opacity: 0, x: isMobile ? 0 : '-8vw', y: isMobile ? 40 : 0, scale: 0.98 },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.9 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, x: isMobile ? 0 : '6vw', y: isMobile ? 20 : 0 },
          { opacity: 1, x: 0, y: 0, duration: 0.7 },
          0.15
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.45
        )
        .fromTo(
          ruleRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: 'power2.out' },
          0.55
        )
        .fromTo(
          trustRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.65
        );

      // Scroll-driven exit animation - ONLY on desktop
      if (!isMobile) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
            onLeaveBack: () => {
              gsap.set([imageFrameRef.current, headlineRef.current, ctaRef.current, ruleRef.current, trustRef.current], {
                opacity: 1,
                x: 0,
                y: 0,
                scaleX: 1,
              });
            },
          },
        });

        scrollTl
          .fromTo(headlineRef.current, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)
          .fromTo(ctaRef.current, { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.7)
          .fromTo(imageFrameRef.current, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
          .fromTo(ruleRef.current, { scaleX: 1, opacity: 1 }, { scaleX: 0, opacity: 0, ease: 'power2.in' }, 0.7)
          .fromTo(trustRef.current, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const trustBadges = [
    { icon: Star, text: '4.6/5.0 Google Rating' },
    { icon: CheckCircle, text: '97 Verified Reviews' },
    { icon: Clock, text: 'Open 24 Hours' },
    { icon: Shield, text: 'Licensed & Insured' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen bg-[#0B0F1C] overflow-hidden z-10 flex flex-col pt-24 lg:pt-0"
    >
      {/* Background grain overlay */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <div className="relative w-full h-full flex flex-col lg:flex-row items-center px-6 lg:px-[6vw] gap-12 lg:gap-0">
        {/* Image Frame */}
        <div
          ref={imageFrameRef}
          className="relative lg:absolute lg:left-[6vw] lg:top-[18vh] w-full lg:w-[44vw] h-[40vh] lg:h-[64vh] opacity-0 order-2 lg:order-1"
        >
          <div className="relative w-full h-full border border-[#D4A24F]">
            <div className="absolute inset-2 border border-[#D4A24F]/30" />
            <img
              src="/images/hero_plumber.jpg"
              alt="Professional plumber at work"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative lg:absolute lg:left-[56vw] lg:top-[26vh] w-full lg:w-[38vw] order-1 lg:order-2">
          {/* Headline */}
          <div ref={headlineRef} className="opacity-0">
            <h1 className="font-display text-[clamp(40px,5vw,72px)] leading-[0.95] text-[#F4F6FA]">
              Premium
              <br />
              <span className="italic text-[#D4A24F]">plumbing.</span>
            </h1>
            <p className="font-display text-[clamp(40px,5vw,72px)] leading-[0.95] text-[#F4F6FA] mt-2">
              Done right.
            </p>
            <p className="mt-6 text-lg text-[#F4F6FA]/70 max-w-md">
              Houston homes. Clear pricing. No surprises.
            </p>
          </div>

          {/* CTA Button */}
          <div ref={ctaRef} className="mt-10 opacity-0 flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="btn-primary inline-block text-center">
              Book a Visit
            </a>
            <a href="tel:+13465700019" className="btn-ghost inline-block text-center lg:hidden">
              Call Now
            </a>
          </div>

          {/* Gold Rule */}
          <div
            ref={ruleRef}
            className="mt-10 w-full lg:w-[26vw] h-[1px] bg-[#D4A24F] origin-left"
          />

          {/* Trust Line */}
          <div ref={trustRef} className="mt-6 opacity-0">
            <p className="text-sm text-[#F4F6FA]/60">
              Licensed & insured • Same-day availability
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges - Bottom */}
      <div className="relative lg:absolute bottom-10 left-0 right-0 px-6 lg:px-[6vw] mt-12 mb-10 lg:mt-0 lg:mb-0">
        <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 border border-[#D4A24F]/40 rounded-full bg-[#0B0F1C]/50 backdrop-blur-sm"
            >
              <badge.icon className="w-3.5 h-3.5 lg:w-4 h-4 text-[#D4A24F]" />
              <span className="text-[10px] lg:text-xs text-[#F4F6FA]/80">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
