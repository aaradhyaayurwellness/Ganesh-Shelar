import { HeartHandshake, Fingerprint, CalendarDays, ShieldAlert, Users2, Sparkles } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      title: "Personalized Guidance",
      desc: "No general worksheets. We evaluate your unique bio-profile, digestive capability, and structural habits before formulating custom, easily sustainable kitchen-herb strategies.",
      icon: Fingerprint,
      glow: "group-hover:text-amber-300"
    },
    {
      title: "Holistic Wellness Approach",
      desc: "We look at you as an indivisible structure. Sleep quality, physical postures, emotional cues, and daily diets are audited together to establish deep biological stability (Samatvam).",
      icon: HeartHandshake,
      glow: "group-hover:text-emerald-300"
    },
    {
      title: "Ongoing Support",
      desc: "Habit shift takes empathy. Our consultants check in with you regularly via phone and messaging, helping you adjust your routines to match unexpected schedule changes.",
      icon: CalendarDays,
      glow: "group-hover:text-blue-300"
    },
    {
      title: "Ethical Professional Guidance",
      desc: "No proprietary cures or high-margin supplements. We are dedicated advisors focus purely on health education, daily routine anchoring, and simple, wholesome kitchen biology.",
      icon: ShieldAlert,
      glow: "group-hover:text-gold-300"
    },
    {
      title: "Community Wellness Impact",
      desc: "Join an expanding ecosystem of like-minded individuals in Maharashtra. Learn nutrition, participate in wellness circles, and celebrate lifestyle transformations together.",
      icon: Users2,
      glow: "group-hover:text-purple-300"
    }
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-forest-900/30 relative border-t border-gold-300/10">
      
      {/* Absolute glow points */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-forest-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
            <HeartHandshake className="w-3.5 h-3.5 text-gold-400" />
            Integrity of Practices
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Why Partner With Us?
          </h2>
          <div className="h-0.5 w-16 bg-gold-400 mx-auto rounded-full mt-4" />
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            We are not merchants of health. We are specialized mentors of lifecycle wisdom who view your healing journey with absolute respect.
          </p>
        </div>

        {/* Dynamic Grid Layout (2 larger points vs 3 secondary boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div 
                key={i}
                className="p-8 rounded-2xl bg-forest-900/35 border border-gold-300/10 hover:border-gold-300/25 hover:bg-[#0c2314]/80 transition-all duration-300 flex flex-col justify-between group bento-card-hover"
              >
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-gold-300 transition-colors">
                    <Icon className={`w-5 h-5 stroke-[1.5] ${pt.glow}`} />
                  </div>
                  
                  <h3 className="font-serif text-xl text-gold-100 group-hover:text-gold-200 transition-colors">
                    {pt.title}
                  </h3>
                  
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                    {pt.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-800/40 mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-[9px] text-[#C29D4F]/80 uppercase tracking-widest font-black">
                     Gold Protocol
                  </span>
                  <Sparkles className="w-3 h-3 text-gold-400" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
