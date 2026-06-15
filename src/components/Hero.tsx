import { MessageSquare, PhoneCall, Sparkles, Navigation, Globe, Library, Heart } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const handleWhatsAppNow = () => {
    const primaryNumber = "9307568748";
    const text = "Hello Aradhya Ayur Wellness! I visited your website and would love to learn more about your Ayurveda-inspired lifestyle programs.";
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/91${primaryNumber}?text=${encodedText}`, "_blank", "noopener,noreferrer");
  };

  const stats = [
    { value: "1000+", label: "People Guided", desc: "Through lifestyle shifts", icon: Heart },
    { value: "500+", label: "Consultations", desc: "Private evaluations conducted", icon: Sparkles },
    { value: "Pan-India", label: "Support Network", desc: "Serving families nationwide", icon: Globe },
    { value: "Educator", label: "Programs Delivered", desc: "Raising food health literacy", icon: Library },
  ];

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-forest-950"
    >
      {/* Premium ambient glows (gold and deep forest green gradient background overlays) */}
      <div className="absolute top-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full bg-gold-400/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-forest-600/10 blur-[130px] pointer-events-none" />

      {/* Grid Pattern asset representation */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Texts block */}
        <div className="lg:col-span-7 space-y-8 text-left max-w-2xl transform transition-transform duration-500">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-400/10 border border-gold-300/25 text-gold-200 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">
            <Sparkles className="w-3.5 h-3.5 fill-gold-400/20" />
            Nature's Wisdom, Your Wellbeing
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-light tracking-wide leading-[1.1]">
            Transform Your <br />
            <span className="text-gold-400 italic">Health Naturally</span>
          </h1>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-normal">
            Trusted Ayurveda Health Experts and Wellness Coaches helping individuals and families across India build healthier, happier, and more balanced lives through seasonal food science and restorative lifestyle mentorship.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              id="hero-book-consult-btn"
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-gold-400 text-forest-950 hover:bg-gold-300 transition-all hover:scale-105 duration-200 active:scale-95 cursor-pointer shadow-lg shadow-gold-500/10"
            >
              Book Consultation
            </button>
            
            <button
              onClick={handleWhatsAppNow}
              id="hero-whatsapp-now-btn"
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-transparent border border-white/20 hover:border-gold-400/40 text-stone-100 flex items-center justify-center gap-3 transition-all hover:scale-105 duration-200 active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
              WhatsApp Now
            </button>
          </div>

          {/* Location trust tagline */}
          <p className="text-xs text-stone-400 flex items-center gap-2 pl-1">
            <Navigation className="w-3.5 h-3.5 text-gold-300" />
            Main Facility: Tembhurni, Solapur, Maharashtra • Guiding families nationwide.
          </p>
        </div>

        {/* Brand Representation Block */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-full max-w-[420px] aspect-square rounded-3xl p-1 overflow-hidden" id="hero-brand-card">
            
            {/* Border frame luxury gold effect */}
            <div className="absolute inset-0 gold-gradient-bg opacity-30 blur-sm" />
            
            {/* Actual Card body inside */}
            <div className="relative w-full h-full bg-forest-900 rounded-[22px] border border-gold-300/20 p-6 flex flex-col justify-between overflow-hidden group bento-card-hover">
              <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
              
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold-300/30" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold-300/30" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold-300/30" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold-300/30" />

              <div className="flex justify-between items-start mt-6">
                <div>
                  <span className="text-[10px] tracking-[0.3em] text-gold-400 font-bold uppercase block mb-1">Establishment</span>
                  <p className="font-serif text-lg text-white">Aradhya Ayur</p>
                </div>
                <div className="h-10 w-10 rounded-full border border-gold-300/10 flex items-center justify-center text-gold-300">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              {/* Central Premium Graphic - Large High Resolution Logo */}
              <div className="my-auto py-6 flex flex-col items-center justify-center relative">
                <div className="absolute w-[180px] h-[180px] rounded-full bg-gold-400/5 border border-gold-400/10 animate-spin [animation-duration:40s]" />
                <img
                  src="/assets/input_file_0.png"
                  alt="Aradhya Ayur Wellness Mandala Logo"
                  className="h-40 w-40 object-contain relative z-10 cursor-pointer hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_0_15px_rgba(212,181,116,0.15)]"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="text-center font-serif text-sm text-gold-200 tracking-wider">
                "Honoring Nature's Science. Preserving Human Joy."
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Lower full-width statistics grid with high contrast gold bento card */}
      <div className="absolute bottom-0 left-0 right-0 py-6 bg-gradient-to-t from-forest-950 to-transparent border-t border-gold-400/10 backdrop-blur-[2px]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gold-400 rounded-2xl p-5 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-forest-950 shadow-xl border border-gold-300/20">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={i} 
                  className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left justify-center py-2 px-3 group"
                >
                  <div className="h-9 w-9 rounded-lg bg-forest-950/10 flex items-center justify-center text-forest-950 flex-shrink-0 border border-forest-950/10">
                    <Icon className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <div className="font-serif text-xl sm:text-2xl text-forest-950 font-bold tracking-tight leading-none mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[9px] uppercase font-bold tracking-wider leading-tight text-forest-950/80">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
