import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Search, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

function StepCard({ number, title, description, icon: Icon }: StepCardProps) {
  return (
    <div className="relative h-full bg-[rgba(11,15,28,0.85)] border border-[#D4A24F] p-8 flex flex-col">
      {/* Step Number */}
      <div className="text-[#D4A24F] font-display text-5xl mb-4">{number}</div>

      {/* Title */}
      <h3 className="font-display text-2xl text-[#F4F6FA] mb-3">{title}</h3>

      {/* Description */}
      <p className="text-[#F4F6FA]/70 text-sm leading-relaxed flex-grow">
        {description}
      </p>

      {/* Icon */}
      <div className="mt-6 pt-6 border-t border-[#D4A24F]/30">
        <Icon className="w-6 h-6 text-[#D4A24F]" />
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: '01',
      title: 'Book',
      description:
        'Choose a time online or call. We confirm same-day when possible.',
      icon: Calendar,
    },
    {
      number: '02',
      title: 'Diagnose',
      description:
        'We inspect, explain the issue, and give upfront pricing.',
      icon: Search,
    },
    {
      number: '03',
      title: 'Fix',
      description:
        'We repair or install, test everything, and leave the space tidy.',
      icon: Wrench,
    },
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
        tl.fromTo(headlineRef.current, { y: '-6vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0)
          .fromTo(subheadlineRef.current, { y: '-4vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);

        const cards = cardsRef.current?.querySelectorAll('.step-card');
        if (cards) {
          tl.fromTo(cards, { y: '70vh', opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, stagger: 0.08, ease: 'none' }, 0.05);
        }

        tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0.1);

        // EXIT (70-100%)
        tl.to([headlineRef.current, subheadlineRef.current], { opacity: 0, ease: 'power2.in' }, 0.7);

        if (cards) {
          tl.to(cards, { y: '-12vh', opacity: 0, ease: 'power2.in' }, 0.7);
        }

        tl.to(lineRef.current, { scaleX: 0, opacity: 0, ease: 'power2.in' }, 0.7);
      } else {
        // Mobile simple animations
        gsap.fromTo(headlineRef.current, { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: headlineRef.current, start: 'top 85%' }
        });
        const cards = cardsRef.current?.querySelectorAll('.step-card');
        if (cards) {
          gsap.fromTo(cards, { y: 30, opacity: 0 }, {
            y: 0, opacity: 1, stagger: 0.1, duration: 0.6, scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' }
          });
        }
        gsap.set(subheadlineRef.current, { opacity: 1 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen bg-[#0B0F1C] overflow-hidden z-50 flex flex-col py-20 lg:py-0"
    >
      <div className="relative w-full h-full flex flex-col items-center px-6 lg:px-[8vw]">
        {/* Headline Container */}
        <div className="text-center mb-12 lg:mb-0 lg:absolute lg:top-[12vh] lg:left-1/2 lg:-translate-x-1/2">
          <div ref={headlineRef} className="opacity-0">
            <h2 className="font-display text-[clamp(32px,3.6vw,52px)] text-[#F4F6FA]">
              How it <span className="italic text-[#D4A24F]">works</span>
            </h2>
          </div>
          <div ref={subheadlineRef} className="mt-4 opacity-0 lg:opacity-0 transition-opacity duration-300">
            <p className="text-[#F4F6FA]/70 max-w-md mx-auto">
              Book in minutes. Get a clear plan. Move on with your day.
            </p>
          </div>
        </div>

        {/* Connecting Line - Desktop Only */}
        <div
          ref={lineRef}
          className="hidden lg:block absolute top-[52vh] left-[8vw] right-[8vw] h-[1px] bg-[#D4A24F]/30 origin-left"
        />

        {/* Step Cards Container */}
        <div
          ref={cardsRef}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[3vw] lg:absolute lg:top-[30vh]"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card h-[40vh] lg:h-[44vh] opacity-0"
            >
              <StepCard {...step} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
