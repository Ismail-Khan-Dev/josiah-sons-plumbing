import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialCardProps {
  quote: string;
  author: string;
  rating: number;
}

function TestimonialCard({ quote, author, rating }: TestimonialCardProps) {
  return (
    <div className="relative bg-white border border-[#D4A24F] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D4A24F]/80">
      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-[#D4A24F]/30 mb-4" />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-[#D4A24F] fill-[#D4A24F]' : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Quote Text */}
      <p className="font-display text-lg text-[#0B0F1C]/90 italic leading-relaxed mb-6">
        "{quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#D4A24F] flex items-center justify-center">
          <span className="text-[#0B0F1C] font-semibold text-sm">
            {author.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-[#0B0F1C] font-medium">{author}</p>
          <p className="text-xs text-[#0B0F1C]/50">Verified Customer</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      quote:
        'Josiah and his team were incredible. They came out the same day I called, fixed our leaking pipe quickly, and the price was exactly what they quoted. No hidden fees. Highly recommend!',
      author: 'Marcus J.',
      rating: 5,
    },
    {
      quote:
        'We had a major drain issue and they handled everything professionally. Clean work, explained the whole process, and even followed up the next day. Best plumber in Houston!',
      author: 'Sarah M.',
      rating: 5,
    },
    {
      quote:
        'I called at 2 AM for an emergency and they were at my door within the hour. Fair price, excellent work, and they treated my home with respect. These guys are the real deal.',
      author: 'David R.',
      rating: 5,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );

      // Cards animation
      const cards = gridRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: '10vh', opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative w-full bg-[#F4F6FA] py-[8vh] z-[70]"
    >
      <div className="px-[6vw]">
        {/* Headline */}
        <div ref={headlineRef} className="max-w-[46vw] mb-[6vh] opacity-0">
          <h2 className="font-display text-[clamp(34px,3.6vw,52px)] leading-[1.05] text-[#0B0F1C]">
            What Houston homeowners{' '}
            <span className="italic text-[#D4A24F]">say</span>
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3vw]"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card opacity-0">
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>

        {/* Google Rating Badge */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-4">
            <span className="font-display text-6xl text-[#D4A24F]">4.6★</span>
            <div>
              <p className="text-[#0B0F1C] font-medium">Based on 97 Reviews</p>
              <p className="text-sm text-[#0B0F1C]/60">Google Reviews</p>
            </div>
          </div>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#D4A24F] font-medium hover:underline"
          >
            See All Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
