import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
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

      gsap.fromTo(
        rightRef.current,
        { x: '6vw', opacity: 0 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '(346) 570-0019', href: 'tel:+13465700019' },
    { icon: Mail, label: 'Email', value: 'hello@josiahandsons.com', href: 'mailto:hello@josiahandsons.com' },
    { icon: MapPin, label: 'Address', value: '5074 Griggs Rd #4200, Houston, TX 77021', href: '#' },
    { icon: Clock, label: 'Hours', value: 'Open 24/7', href: '#' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-[#F4F6FA] py-[10vh] z-[110]"
    >
      <div className="px-[6vw]">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column - Info */}
          <div ref={leftRef} className="lg:w-[40%] opacity-0">
            <h2 className="font-display text-[clamp(34px,3.6vw,52px)] leading-[1.05] text-[#0B0F1C]">
              Send a{' '}
              <span className="italic text-[#D4A24F]">message</span>
            </h2>
            <p className="mt-4 text-[#0B0F1C]/70 leading-relaxed">
              Prefer to start online? Tell us what's going on and we'll reply within one business hour.
            </p>

            {/* Contact Info */}
            <div className="mt-10 space-y-6">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#D4A24F]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#D4A24F]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#0B0F1C]/50">{item.label}</p>
                    <p className="text-[#0B0F1C] group-hover:text-[#D4A24F] transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={rightRef} className="lg:w-[60%] opacity-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-[#0B0F1C]/70 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-[#D4A24F]/50 text-[#0B0F1C] focus:border-[#D4A24F] focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#0B0F1C]/70 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-[#D4A24F]/50 text-[#0B0F1C] focus:border-[#D4A24F] focus:outline-none transition-colors"
                    placeholder="(346) 570-0019"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-[#0B0F1C]/70 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-[#D4A24F]/50 text-[#0B0F1C] focus:border-[#D4A24F] focus:outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#0B0F1C]/70 mb-2">
                    Service Needed
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-[#D4A24F]/50 text-[#0B0F1C] focus:border-[#D4A24F] focus:outline-none transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="installation">Installation</option>
                    <option value="repair">Repair</option>
                    <option value="drain">Drain Cleaning</option>
                    <option value="emergency">Emergency</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#0B0F1C]/70 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-[#D4A24F]/50 text-[#0B0F1C] focus:border-[#D4A24F] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-[#0B0F1C]/70 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-[#D4A24F]/50 text-[#0B0F1C] focus:border-[#D4A24F] focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your plumbing issue..."
                />
              </div>

              <button
                type="submit"
                className="btn-primary inline-flex items-center gap-2"
              >
                {isSubmitted ? (
                  <>Message Sent!</>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
