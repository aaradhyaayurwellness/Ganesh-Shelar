import { useState, useEffect } from "react";
import { Menu, X, MessageSquare, PhoneCall, Sparkles } from "lucide-react";

interface HeaderProps {
  onOpenBooking: () => void;
}

export default function Header({ onOpenBooking }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Basic scroll spy
      const sections = ["hero", "about", "founders", "services", "mission2030", "why-choose-us", "testimonials", "blog", "contact"];
      const current = sections.find((sect) => {
        const el = document.getElementById(sect);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "Our Story" },
    { href: "#founders", label: "The Experts" },
    { href: "#services", label: "Wellness Services" },
    { href: "#mission2030", label: "Mission 2030" },
    { href: "#why-choose-us", label: "Why Us" },
    { href: "#testimonials", label: "Stories" },
    { href: "#blog", label: "Resource Blog" },
    { href: "#contact", label: "Contact" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header 
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-forest-950/85 backdrop-blur-md border-b border-gold-300/10 py-3 shadow-lg" 
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo block */}
        <a href="#hero" className="flex items-center gap-3 group" id="header-logo-container">
          <div className="relative h-11 w-11 rounded-full overflow-hidden border border-gold-300/20 bg-forest-900 flex items-center justify-center p-0.5 group-hover:border-gold-300/40 transition-colors">
            <img
              src="/assets/input_file_0.png"
              alt="Aradhya Ayur Wellness Logo"
              className="h-full w-full object-contain scale-[1.10]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // If the file path doesn't load immediately or has format issues, render custom SVG inside or hide
                e.currentTarget.style.opacity = "0";
              }}
            />
            {/* Absolute overlay indicator with sparkles to look very luxurious */}
            <div className="absolute inset-0 flex items-center justify-center text-gold-300/10 pointer-events-none">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="font-serif text-lg leading-tight tracking-[0.08em] text-gold-200 uppercase font-bold group-hover:text-white transition-colors">
              Aradhya
            </span>
            <span className="text-[9px] tracking-[0.25em] text-gold-300/80 uppercase leading-none font-bold">
              Ayur Wellness
            </span>
          </div>
        </a>

        {/* Desktop Navbar */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-stone-300" id="desktop-navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={`hover:text-gold-200 transition-colors py-1 border-b-2 ${
                  isActive 
                    ? "text-gold-200 border-gold-300" 
                    : "border-transparent text-stone-300 hover:border-gold-300/40"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenBooking}
            id="header-booking-btn"
            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-transparent border border-gold-300/30 hover:border-gold-300 text-gold-200 hover:text-white hover:bg-gold-500/5 cursor-pointer transition-all active:scale-95 duration-150"
          >
            Book Consultation
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-stone-300 hover:text-gold-200 transition-colors"
          id="mobile-nav-toggle-btn"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div id="mobile-drawer" className="lg:hidden absolute top-full left-0 right-0 bg-forest-950/95 border-b border-gold-300/15 backdrop-blur-lg animate-in slide-in-from-top duration-200">
          <div className="px-6 py-8 flex flex-col gap-5 text-sm uppercase font-semibold tracking-widest text-stone-300">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`py-2 hover:text-gold-200 border-b border-[#134927]/30 flex items-center justify-between ${
                    isActive ? "text-gold-200 pl-2 border-l-2 border-gold-300 border-b-transparent" : "text-stone-300"
                  }`}
                >
                  {link.label}
                  <span className="text-[10px] text-gold-300/50">▶</span>
                </a>
              );
            })}
            
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              id="mobile-header-booking-btn"
              className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-forest-950 font-bold text-center tracking-widest cursor-pointer shadow-lg active:scale-95 transition-transform"
            >
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
