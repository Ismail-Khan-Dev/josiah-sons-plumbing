import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? 'bg-[#0B0F1C]/85 backdrop-blur-[24px]'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex flex-col">
              <span className="font-display text-xl text-[#D4A24F] tracking-wide">
                Josiah & Sons
              </span>
              <span className="label-uppercase text-[10px] text-[#F4F6FA]/60">
                Plumbing Excellence
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative text-sm text-[#F4F6FA]/80 hover:text-[#D4A24F] transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4A24F] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+13465700019"
                className="flex items-center gap-2 px-5 py-2.5 border border-[#D4A24F] text-[#D4A24F] text-sm font-medium hover:bg-[#D4A24F] hover:text-[#0B0F1C] transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                346-570-0019
              </a>
              <a
                href="#contact"
                className="px-6 py-2.5 bg-[#D4A24F] text-[#0B0F1C] text-sm font-semibold hover:bg-[#E8C87A] transition-all duration-300"
              >
                Book Online
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#F4F6FA]"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0B0F1C]/98 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-3xl text-[#F4F6FA] hover:text-[#D4A24F] transition-colors duration-300"
              style={{
                animationDelay: `${index * 80}ms`,
                animation: isMobileMenuOpen
                  ? 'fadeInUp 0.5s ease forwards'
                  : 'none',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${index * 80}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-4 mt-8">
            <a
              href="tel:+13465700019"
              className="flex items-center justify-center gap-2 px-8 py-3 border border-[#D4A24F] text-[#D4A24F]"
            >
              <Phone className="w-5 h-5" />
              346-570-0019
            </a>
            <a
              href="#contact"
              className="px-8 py-3 bg-[#D4A24F] text-[#0B0F1C] font-semibold text-center"
            >
              Book Online
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
