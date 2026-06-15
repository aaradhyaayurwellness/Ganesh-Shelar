import { Sparkles, ArrowUp, Star, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="app-footer" className="bg-forest-950/95 border-t border-gold-300/15 py-16 text-stone-300 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand block */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border border-gold-300/20 bg-forest-900 flex items-center justify-center p-0.5">
              <img
                src="/assets/input_file_0.png"
                alt="Aradhya Ayur Wellness Logo"
                className="h-full w-full object-contain scale-[1.08]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            
            <div className="flex flex-col">
              <span className="font-serif text-base leading-tight tracking-wider text-gold-200 uppercase font-bold">
                Aradhya
              </span>
              <span className="text-[9px] tracking-[0.25em] text-gold-300/80 uppercase leading-none font-bold">
                Ayur Wellness
              </span>
            </div>
          </div>
          
          <p className="text-xs text-stone-400 leading-relaxed">
            Nature's Wisdom, Your Wellbeing. Positioned as premium mentors of circadian routines, kitchen nutrition, and preventive immunities.
          </p>

          <p className="text-[11px] text-stone-400">
            📍 Tembhurni, Solapur, Maharashtra, India.
          </p>
        </div>

        {/* Quick links */}
        <div className="space-y-4">
          <h4 className="font-serif text-gold-300 text-sm font-semibold uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs text-stone-400 hover:text-stone-300">
            <li><a href="#about" className="hover:text-gold-200">Our Story & Philosophy</a></li>
            <li><a href="#founders" className="hover:text-gold-200">Meet the Experts</a></li>
            <li><a href="#services" className="hover:text-gold-200">Wellness Services</a></li>
            <li><a href="#mission2030" className="hover:text-gold-200 font-medium">Mission 2030 formula</a></li>
            <li><a href="#testimonials" className="hover:text-gold-200">Success Stories</a></li>
            <li><a href="#blog" className="hover:text-gold-200">Resource Blog</a></li>
          </ul>
        </div>

        {/* Contact info quick recall */}
        <div className="space-y-4">
          <h4 className="font-serif text-gold-300 text-sm font-semibold uppercase tracking-wider">
            Contact Support
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold-300" />
              <span>+91 93075 68748</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold-300" />
              <span>+91 85529 89238</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gold-300" />
              <a href="mailto:aaradhyaayurwellness@gmail.com" className="hover:text-gold-200">aaradhyaayurwellness@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* Socials / Disclaimer summary */}
        <div className="space-y-4">
          <h4 className="font-serif text-gold-300 text-sm font-semibold uppercase tracking-wider">
            Core Philosophy
          </h4>
          <p className="text-[11px] text-stone-500 leading-relaxed italic">
            "Planning + Execution + Action = Success." We strive to guide our community into complete self-reliance through natural habits and wellness wisdom.
          </p>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded border border-gold-300/10 hover:border-gold-300/30 text-[10px] uppercase font-bold tracking-widest text-gold-300 hover:text-white transition-all cursor-pointer"
          >
            Back to Top
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Lower Bottom with Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-stone-800/80 text-[11px] text-stone-500 space-y-4">
        
        {/* Absolute Ethical Disclaimer */}
        <div className="p-4 rounded-lg bg-[#0a1b0e]/30 border border-stone-800/50 leading-relaxed text-[11px]">
          ⚠️ <strong className="text-stone-400 uppercase tracking-wider">Authoritative Health Disclaimer:</strong> Aradhya Ayur Wellness, Ganesh Shelar, and Surekha Shelar operate exclusively as Wellness Coaches and Lifestyle Mentors. All materials, coaching programs, phone calls, or consultations are strictly for health education and routine harmonization. We do not claim to treat, cure, diagnose, or mitigate any modern clinical diseases or chronic pathologies. Consult your designated physician on clinical pathologies. Under no circumstances is this an MLM, clinical treatment, or high-volume drug marketplace.
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-wider uppercase pt-2 text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} Aradhya Ayur Wellness • <a href="#admin" className="hover:text-gold-300 transition-colors">Staff Portal</a>
          </div>
          <div>
            Nature's Wisdom, Your Wellbeing • Created for Ganesh &amp; Surekha Shelar
          </div>
        </div>

      </div>
    </footer>
  );
}
