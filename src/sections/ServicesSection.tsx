import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  badge?: string;
}

function ServiceCard({ title, description, image, badge }: ServiceCardProps) {
  return (
    <div className="relative h-full bg-[rgba(11,15,28,0.85)] border-t-[3px] border-[#D4A24F] overflow-hidden group">
      {/* Image */}
      <div className="relative h-[60%] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1C] to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="relative h-[40%] p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-display text-2xl text-[#F4F6FA]">{title}</h3>
            {badge && (
              <span className="px-3 py-1 border border-[#D4A24F] text-[#D4A24F] text-xs font-semibold">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-[#F4F6FA]/70 leading-relaxed">{description}</p>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-[#D4A24F] text-sm font-medium group/link"
        >
          Learn More
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const label1Ref = useRef<HTMLDivElement>(null);
  const label2Ref = useRef<HTMLDivElement>(null);
  const leftCard1Ref = useRef<HTMLDivElement>(null);
  const rightCard1Ref = useRef<HTMLDivElement>(null);
  const leftCard2Ref = useRef<HTMLDivElement>(null);
  const rightCard2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const ctx = gsap.context(() => {
      // Desktop-only pinning and entrance animations
      if (!isMobile) {
        // Section 1 - Installations & Repairs
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: section1Ref.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          },
        });

        tl1
          .fromTo(label1Ref.current, { y: '-6vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0)
          .fromTo(leftCard1Ref.current, { x: '-20vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
          .fromTo(rightCard1Ref.current, { x: '20vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.05)
          .to(label1Ref.current, { y: '-4vh', opacity: 0, ease: 'power2.in' }, 0.7)
          .to(leftCard1Ref.current, { x: '-10vw', opacity: 0, ease: 'power2.in' }, 0.7)
          .to(rightCard1Ref.current, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.7);

        // Section 2 - Drain & Emergency
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          },
        });

        tl2
          .fromTo(label2Ref.current, { y: '-6vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0)
          .fromTo(leftCard2Ref.current, { x: '-20vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
          .fromTo(rightCard2Ref.current, { x: '20vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.05)
          .to(label2Ref.current, { y: '-4vh', opacity: 0, ease: 'power2.in' }, 0.7)
          .to(leftCard2Ref.current, { x: '-10vw', opacity: 0, ease: 'power2.in' }, 0.7)
          .to(rightCard2Ref.current, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.7);
      } else {
        // Mobile-only simple animations
        gsap.utils.toArray('.service-card-mobile').forEach((card: any) => {
          gsap.fromTo(card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              }
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="services">
      {/* Section 2: Installations & Repairs */}
      <section
        ref={section1Ref}
        className="relative w-full min-h-screen lg:h-screen bg-[#0B0F1C] overflow-hidden z-20 flex flex-col items-center justify-center py-20 lg:py-0"
      >
        {/* Label */}
        <div
          ref={label1Ref}
          className="lg:absolute lg:top-[10vh] lg:left-1/2 lg:-translate-x-1/2 mb-12 lg:mb-0"
        >
          <span className="label-uppercase text-[#D4A24F]">Our Services</span>
        </div>

        {/* Cards Container */}
        <div className="w-full px-6 lg:px-[7vw] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[4vw] lg:absolute lg:top-[22vh]">
          {/* Left Card - Installations */}
          <div
            ref={leftCard1Ref}
            className="h-[50vh] lg:h-[56vh] service-card-mobile"
          >
            <ServiceCard
              title="Installations"
              description="Water heaters, fixtures, shut-off valves, and whole-home repipes."
              image="/images/service_installations.jpg"
            />
          </div>

          {/* Right Card - Repairs */}
          <div
            ref={rightCard1Ref}
            className="h-[50vh] lg:h-[56vh] service-card-mobile"
          >
            <ServiceCard
              title="Repairs"
              description="Leaks, running toilets, low pressure, and valve replacements."
              image="/images/service_repairs.jpg"
            />
          </div>
        </div>
      </section>

      {/* Section 3: Drain & Emergency */}
      <section
        ref={section2Ref}
        className="relative w-full min-h-screen lg:h-screen bg-[#0B0F1C] overflow-hidden z-30 flex flex-col items-center justify-center py-20 lg:py-0"
      >
        {/* Label */}
        <div
          ref={label2Ref}
          className="lg:absolute lg:top-[10vh] lg:left-1/2 lg:-translate-x-1/2 mb-12 lg:mb-0"
        >
          <span className="label-uppercase text-[#D4A24F]">Emergency & Maintenance</span>
        </div>

        {/* Cards Container */}
        <div className="w-full px-6 lg:px-[7vw] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[4vw] lg:absolute lg:top-[22vh]">
          {/* Left Card - Drain Cleaning */}
          <div
            ref={leftCard2Ref}
            className="h-[50vh] lg:h-[56vh] service-card-mobile"
          >
            <ServiceCard
              title="Drain Cleaning"
              description="Clear clogs, hydro jetting, and preventive maintenance."
              image="/images/service_drain.jpg"
            />
          </div>

          {/* Right Card - Emergency Response */}
          <div
            ref={rightCard2Ref}
            className="h-[50vh] lg:h-[56vh] service-card-mobile"
          >
            <ServiceCard
              title="Emergency Response"
              description="Burst pipes, backups, and no-heat calls—fast dispatch."
              image="/images/service_emergency.jpg"
              badge="24/7"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
