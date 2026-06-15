import { useState } from "react";
import { 
  Sparkles, 
  Activity, 
  Apple, 
  GraduationCap, 
  Users, 
  Leaf, 
  Target, 
  Award, 
  ChevronRight,
  Info
} from "lucide-react";
import { SERVICES, Service } from "../types";

const iconMap: Record<string, any> = {
  Activity,
  Apple,
  GraduationCap,
  Sparkles,
  Users,
  Leaf,
  Target,
  Award
};

interface ServicesProps {
  onOpenBooking: () => void;
}

export default function Services({ onOpenBooking }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-24 bg-forest-900/40 relative border-t border-gold-300/10">
      {/* Decorative Glow elements */}
      <div className="absolute top-[20%] left-[-15%] w-[50%] h-[50%] bg-[#134927]/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[50%] h-[50%] bg-[#b07c2a]/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
            <Activity className="w-3.5 h-3.5 text-gold-400" />
            Empowering Health Pathways
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Our Key Wellness Pillars
          </h2>
          <div className="h-0.5 w-16 bg-gold-400 mx-auto rounded-full mt-4" />
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Our customized personal guidance aims to build physiological immunity, establish robust daily habits, and restore physical ease. We do not claim to treat diseases—we empower life itself.
          </p>
        </div>

        {/* Disclaimer Board */}
        <div className="bg-gold-500/5 border border-gold-300/15 rounded-xl p-4 sm:p-5 max-w-4xl mx-auto mb-16 flex items-start gap-4">
          <div className="h-8 w-8 rounded-full bg-gold-400/10 flex items-center justify-center text-gold-300 flex-shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-gold-200 uppercase tracking-widest">Our Absolute Commitment to Ethical Practices</h4>
            <p className="text-stone-300 text-xs leading-relaxed">
              Aradhya Ayur Wellness does not sell commercial medicines, pack proprietary pills, promise mathematical cure rates, or treat clinical pathologies. Instead, our role is purely educational, holistic, and preventive, centered on ancient kitchen-herb guidance and healthy habit development.
            </p>
          </div>
        </div>

        {/* Service Cards Grid - 4x2 Responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((serv) => {
            const Icon = iconMap[serv.iconName] || Sparkles;
            const isSelected = selectedService?.id === serv.id;

            return (
              <div 
                key={serv.id}
                className={`relative p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:bg-forest-800 bento-card-hover ${
                  isSelected 
                    ? "bg-forest-800 border-gold-300 shadow-lg shadow-gold-500/5 -translate-y-1" 
                    : "bg-forest-950 border-gold-300/10 hover:border-gold-300/20"
                }`}
                onClick={() => setSelectedService(isSelected ? null : serv)}
              >
                <div className="space-y-4">
                  {/* Icon Block */}
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center transition-colors ${
                    serv.theme === "Gold" 
                      ? "bg-gold-400/10 text-gold-300 group-hover:bg-gold-300 group-hover:text-forest-950" 
                      : "bg-emerald-500/10 text-emerald-300 group-hover:bg-emerald-400 group-hover:text-forest-950"
                  }`}>
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>

                  <h3 className="font-serif text-xl text-gold-100 group-hover:text-gold-200 transition-colors">
                    {serv.title}
                  </h3>

                  <p className="text-stone-300 text-xs leading-relaxed">
                    {serv.description}
                  </p>
                </div>

                <div className="pt-6 flex justify-between items-center group-hover:text-white">
                  <span className="text-[10px] font-bold text-stone-400 group-hover:text-gold-300 tracking-wider uppercase">
                    {isSelected ? "Collapse Details" : "Read Full Scope"}
                  </span>
                  <ChevronRight className={`w-4 h-4 text-gold-300 transition-transform ${
                    isSelected ? "rotate-90" : "group-hover:translate-x-1"
                  }`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded detail box in page to maintain single-view elegance */}
        {selectedService && (
          <div className="mt-8 p-6 sm:p-8 rounded-xl bg-forest-900 border border-gold-300/30 animate-in slide-in-from-top-4 duration-300 relative overflow-hidden">
            <div className="absolute right-[-5%] top-[-5%] text-gold-400/5 font-serif text-[120px] pointer-events-none select-none font-bold uppercase leading-none">
              Pure
            </div>
            
            <div className="relative z-10 space-y-4 max-w-4xl">
              <span className="text-xs text-gold-300 font-bold uppercase tracking-widest bg-gold-400/10 border border-gold-300/20 px-3 py-1 rounded-full">
                Interactive Detail View
              </span>
              <h4 className="font-serif text-2xl text-white mt-1">{selectedService.title}</h4>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {selectedService.longDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-2">
                <button
                  onClick={onOpenBooking}
                  id="expanded-service-cta"
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 text-forest-950 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-transform active:scale-95 cursor-pointer"
                >
                  Request Customized Plan
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-stone-400 hover:text-stone-200 text-xs underline underline-offset-4 cursor-pointer"
                >
                  Close Detail Panel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
