import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div
      className={`border border-[#D4A24F] bg-white transition-all duration-300 ${
        isOpen ? 'border-l-4 border-l-[#D4A24F]' : ''
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-display text-lg text-[#0B0F1C] pr-4">
          {question}
        </span>
        <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[#D4A24F] flex items-center justify-center transition-all duration-300">
          {isOpen ? (
            <Minus className="w-4 h-4 text-[#D4A24F]" />
          ) : (
            <Plus className="w-4 h-4 text-[#D4A24F]" />
          )}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-48' : 'max-h-0'
        }`}
      >
        <p className="px-6 pb-6 text-[#0B0F1C]/70 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Do you offer same-day service?',
      answer:
        'Yes, we offer same-day service for most plumbing needs when you call before 2 PM. For emergency situations like burst pipes or major leaks, we prioritize rapid response and aim to be at your location within 1-2 hours.',
    },
    {
      question: 'Are you licensed and insured?',
      answer:
        'Absolutely. Josiah & Sons is fully licensed by the state of Texas and carries comprehensive liability insurance. Every technician on our team is background-checked and undergoes regular training to stay current with the latest plumbing standards.',
    },
    {
      question: 'Will I get a quote before work begins?',
      answer:
        'Yes, transparency is our policy. After diagnosing the issue, we provide a detailed, upfront quote before any work begins. There are no hidden fees or surprise charges—ever.',
    },
    {
      question: 'Do you warranty your repairs?',
      answer:
        'All our repairs come with a 1-year warranty on parts and labor. For new installations like water heaters, we honor manufacturer warranties plus our own installation guarantee.',
    },
    {
      question: 'What payment options do you accept?',
      answer:
        'We accept all major credit cards, debit cards, checks, and cash. For larger projects, we also offer financing options through our trusted partners.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { x: '-6vw', opacity: 0 },
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

      // Accordion items animation
      const items = accordionRef.current?.querySelectorAll('.faq-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: '6vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: accordionRef.current,
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
      id="faq"
      className="relative w-full bg-[#F4F6FA] py-[8vh] z-[90]"
    >
      <div className="px-[6vw]">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Headline - Left */}
          <div ref={headlineRef} className="lg:w-[40%] opacity-0">
            <h2 className="font-display text-[clamp(34px,3.6vw,52px)] leading-[1.05] text-[#0B0F1C]">
              Common{' '}
              <span className="italic text-[#D4A24F]">questions</span>
            </h2>
            <p className="mt-4 text-[#0B0F1C]/70">
              Can't find what you're looking for? Give us a call and we'll be happy to help.
            </p>
            <a
              href="tel:+13465700019"
              className="inline-flex items-center gap-2 mt-6 text-[#D4A24F] font-medium"
            >
              Call (346) 570-0019
            </a>
          </div>

          {/* Accordion - Right */}
          <div ref={accordionRef} className="lg:w-[60%] space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item opacity-0">
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
