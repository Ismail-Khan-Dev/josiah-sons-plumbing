import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const columns = columnsRef.current?.querySelectorAll('.footer-column');
      if (columns) {
        gsap.fromTo(
          columns,
          { y: '4vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    'Installations',
    'Repairs',
    'Drain Cleaning',
    'Emergency Response',
  ];

  const company = ['About', 'Careers', 'Coverage', 'Reviews'];

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#0B0F1C] z-[120]"
    >
      {/* Gold Rule at Top */}
      <div className="w-full h-[1px] bg-[#D4A24F]" />

      <div className="px-[6vw] py-[8vh]">
        <div
          ref={columnsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Column 1 - Brand */}
          <div className="footer-column opacity-0">
            <a href="#" className="inline-block">
              <span className="font-display text-2xl text-[#D4A24F]">
                Josiah & Sons
              </span>
            </a>
            <p className="mt-4 text-sm text-[#F4F6FA]/60 leading-relaxed">
              Premium plumbing for Houston homes. Licensed, insured, and ready 24/7.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#D4A24F]/50 flex items-center justify-center hover:bg-[#D4A24F]/10 transition-colors"
              >
                <svg className="w-5 h-5 text-[#D4A24F]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#D4A24F]/50 flex items-center justify-center hover:bg-[#D4A24F]/10 transition-colors"
              >
                <svg className="w-5 h-5 text-[#D4A24F]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Services */}
          <div className="footer-column opacity-0">
            <h4 className="label-uppercase text-[#D4A24F] mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className="text-[#F4F6FA]/70 hover:text-[#D4A24F] transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div className="footer-column opacity-0">
            <h4 className="label-uppercase text-[#D4A24F] mb-6">Company</h4>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-[#F4F6FA]/70 hover:text-[#D4A24F] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="footer-column opacity-0">
            <h4 className="label-uppercase text-[#D4A24F] mb-6">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+13465700019"
                  className="text-[#F4F6FA]/70 hover:text-[#D4A24F] transition-colors"
                >
                  (346) 570-0019
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@josiahandsons.com"
                  className="text-[#F4F6FA]/70 hover:text-[#D4A24F] transition-colors"
                >
                  hello@josiahandsons.com
                </a>
              </li>
              <li>
                <span className="text-[#F4F6FA]/70">
                  5074 Griggs Rd #4200
                  <br />
                  Houston, TX 77021
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#D4A24F]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#F4F6FA]/50">
              © 2025 Josiah & Sons Plumbers · Houston, TX · All Rights Reserved
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-[#F4F6FA]/50 hover:text-[#D4A24F] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-[#F4F6FA]/50 hover:text-[#D4A24F] transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
