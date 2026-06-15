import { Award, Briefcase, GraduationCap, CheckCircle2, ChevronRight, User } from "lucide-react";
import { FOUNDERS } from "../types";

export default function Experts() {
  return (
    <section id="founders" className="py-24 bg-forest-950 relative border-t border-gold-300/10">
      {/* Decorative gradient glow background */}
      <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[45%] bg-gold-400/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
            <User className="w-3.5 h-3.5 text-gold-400" />
            Authority & Guidance
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Meet the Founders & Experts
          </h2>
          <div className="h-0.5 w-16 bg-gold-400 mx-auto rounded-full mt-4" />
          <p className="text-stone-300 text-sm sm:text-base">
            Get coached directly by highly educated and dedicated health advisors who marry biochemical accuracy with Classical Ayurvedic practices.
          </p>
        </div>

        {/* Profile GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {FOUNDERS.map((expert, i) => {
            return (
              <div 
                key={expert.name}
                className="glass-panel rounded-2xl overflow-hidden hover:border-gold-300/25 transition-all duration-300 flex flex-col md:flex-row group bento-card-hover"
              >
                {/* Photo container */}
                <div className="md:w-5/12 relative aspect-[3/4] md:aspect-auto overflow-hidden bg-forest-950 border-b md:border-b-0 md:border-r border-gold-300/10 flex items-center justify-center">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-500 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none contrast-[1.01]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback elegant portrait if local assets are blank
                      e.currentTarget.src = expert.fallbackImage;
                    }}
                  />
                  {/* Backdrop golden frame for high-end look */}
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <span className="text-[10px] text-gold-300 font-bold uppercase tracking-widest bg-forest-950/80 px-2 py-0.5 rounded border border-gold-300/15">
                      Expert Mentor
                    </span>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="md:w-7/12 p-6 md:p-8 flex flex-col justify-between space-y-6">
                  
                  {/* Name and Credentials */}
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl sm:text-3xl text-gold-100 font-medium tracking-tight">
                      {expert.name}
                    </h3>
                    
                    {/* Badge titles */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {expert.titles.map((title, idx) => (
                        <span 
                          key={idx}
                          className="text-[10px] sm:text-xs text-stone-200 bg-forest-900 border border-gold-300/15 rounded-md px-2.5 py-1 tracking-wide font-medium"
                        >
                          {title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Summary / Mission */}
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic border-l-2 border-gold-400 pl-4 py-1">
                    "{expert.aboutMini}"
                  </p>

                  {/* Detailed Biography Paragraph */}
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {expert.bio}
                  </p>

                  {/* Accomplishments Checkmarks */}
                  <div className="space-y-2.5 pt-2 border-t border-stone-800">
                    <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold-300 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      Key Engagements & Focus
                    </h4>
                    
                    <ul className="space-y-1.5 text-xs text-stone-300">
                      {expert.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
