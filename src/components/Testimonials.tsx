import { Quote, Star, MessageSquare } from "lucide-react";
import { TESTIMONIALS } from "../types";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-forest-950 relative overflow-hidden border-t border-gold-300/10">
      
      {/* Decorative Blur points */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-[#134927]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-gold-400/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
            <MessageSquare className="w-3.5 h-3.5 text-gold-400" />
            Empathetic Transformations
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Our Clients' Success Stories
          </h2>
          <div className="h-0.5 w-16 bg-gold-400 mx-auto rounded-full mt-4" />
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Real stories of people and families across Maharashtra and India who restored their bodies, rebuilt active lifestyle pacing, and elevated self-confidence.
          </p>
        </div>

        {/* Testimonials Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {TESTIMONIALS.map((test) => {
            return (
              <div 
                key={test.id}
                className="p-8 rounded-2xl glass-panel border border-gold-300/10 hover:border-gold-300/25 transition-all duration-300 flex flex-col justify-between relative group bento-card-hover"
              >
                {/* Upper quote icon decorative back */}
                <div className="absolute right-6 top-6 text-gold-400/5 group-hover:text-gold-400/10 transition-colors pointer-events-none">
                  <Quote className="w-20 h-20 rotate-180" />
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Stars counter */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {/* Testimonial Core text */}
                  <p className="text-stone-300 text-sm leading-relaxed font-normal italic">
                    "{test.quote}"
                  </p>
                  
                  {/* Focus Outcomes */}
                  <div className="p-3.5 rounded-lg bg-forest-900/40 border border-[#134927]/30">
                    <span className="text-[10px] text-gold-300 font-bold uppercase tracking-widest block mb-1">
                      Wellness Milestones Reached:
                    </span>
                    <p className="text-xs text-stone-200">
                      {test.improvementContext}
                    </p>
                  </div>
                </div>

                {/* Profile Avatar Card Footer */}
                <div className="flex items-center gap-4 pt-6 border-t border-stone-800/40 mt-8 relative z-10">
                  {/* Elegant silhouette placeholder based on gender */}
                  <div className="h-12 w-12 rounded-full border border-gold-300/20 bg-forest-900/60 flex items-center justify-center text-xs font-bold font-serif text-gold-200 uppercase flex-shrink-0">
                    {test.gender === 'male' ? "M" : "F"}
                  </div>

                  <div className="flex-grow">
                    <h4 className="font-serif text-lg text-white font-medium leading-none mb-1">
                      {test.name}
                    </h4>
                    <div className="flex justify-between items-center text-[10px] tracking-wider uppercase">
                      <span className="text-gold-400 font-bold">{test.location}</span>
                      <span className="text-stone-400 font-medium">{test.timeframe}</span>
                    </div>
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
