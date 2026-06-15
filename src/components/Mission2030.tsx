import { Target, ListTodo, Flame, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";

export default function Mission2030() {
  const steps = [
    {
      title: "Plan Smart",
      subtitle: "Determine Your Blueprint",
      description: "Any success starts with a deep, objective analysis. Instead of blind diets, we assess your metabolic constitution (Prakriti), digestion rates, and thermal balance. This acts as our foundational strategy map.",
      icon: Target,
      tag: "01",
      color: "from-[#dfba73] to-[#c29747]"
    },
    {
      title: "Execute Consistently",
      subtitle: "Anchor Micro-Habits Daily",
      description: "Massive change is built upon tiny, unbroken daily habits. We guide you in installing small morning rituals and digestion-first spices, keeping them simple so you execute they effortlessly day after day.",
      icon: ListTodo,
      tag: "02",
      color: "from-emerald-400 to-[#134927]"
    },
    {
      title: "Take Massive Action",
      subtitle: "Own Your Domestic Ecosystem",
      description: "Involvement must grow. True longevity means transforming your family kitchen, creating active physical alignment, and participating in wellness programs. It represents fully committing to your body.",
      icon: Flame,
      tag: "03",
      color: "from-amber-400 to-red-500"
    }
  ];

  return (
    <section id="mission2030" className="py-24 bg-forest-950 relative overflow-hidden border-t border-gold-300/10">
      
      {/* Background radial effects */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[60%] h-[40%] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Head Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
            <TrendingUp className="w-3.5 h-3.5 text-gold-400" />
            Empowering Movements
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Our Mission 2030: <br />
            <span className="italic font-normal gold-gradient-text">Massive Wellness Impact</span>
          </h2>
          <div className="h-0.5 w-16 bg-gold-400 mx-auto rounded-full mt-4" />
          <p className="text-stone-300 text-sm sm:text-base">
            We are on a dedicated crusade to educate and inspire 100,000 Indian families to live toxic-free, preventative lives by the year 2030. Here is our central success formula:
          </p>
        </div>

        {/* Visual Success Equation Widget */}
        <div className="mb-20 p-8 rounded-2xl glass-panel relative border border-gold-300/20 max-w-5xl mx-auto text-center bento-card-hover" id="success-formula-card">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-400 text-forest-950 text-[10px] font-bold uppercase tracking-widest">
            The Aradhya Creed
          </div>

          {/* Mathematical Layout */}
          <div className="flex flex-col md:flex-row items-center justify-around gap-6 md:gap-4 py-6">
            
            <div className="space-y-1">
              <span className="text-[10px] uppercase text-stone-400 tracking-wider block">Strategic Focus</span>
              <p className="font-serif text-2xl sm:text-3xl text-gold-200">Planning</p>
            </div>

            <div className="text-3xl text-gold-300/40 font-light">+</div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase text-stone-400 tracking-wider block">Habitual Integrity</span>
              <p className="font-serif text-2xl sm:text-3xl text-gold-200">Execution</p>
            </div>

            <div className="text-3xl text-gold-300/40 font-light">+</div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase text-stone-400 tracking-wider block">Decisive Commitment</span>
              <p className="font-serif text-2xl sm:text-3xl text-gold-200">Massive Action</p>
            </div>

            <div className="text-3xl text-gold-400 font-light">=</div>

            <div className="space-y-1 bg-gradient-to-r from-gold-400/10 to-gold-400/20 border border-gold-300/35 px-6 py-3 rounded-xl">
              <span className="text-[9px] uppercase text-white font-bold tracking-widest block">Human Synergy</span>
              <p className="font-serif text-2xl sm:text-3xl text-gold-100 font-bold">Enduring Success</p>
            </div>

          </div>

          <p className="text-xs text-stone-300 italic pt-2 max-w-2xl mx-auto">
            "Planning sets the direction, Execution establishes the rhythm, and Action creates the momentum that translates dreams into lifelong physical ease."
          </p>
        </div>

        {/* 3 Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((st) => {
            const Icon = st.icon;
            
            return (
              <div 
                key={st.tag}
                className="relative p-6 sm:p-8 rounded-2xl bg-forest-900/40 border border-gold-300/10 hover:border-gold-300/20 hover:bg-forest-900/60 transition-all duration-300 flex flex-col justify-between bento-card-hover"
              >
                {/* Header elements with number float */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gold-400/15 to-transparent flex items-center justify-center text-gold-300">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <span className="font-serif text-4xl text-gold-300/10 font-black">
                      {st.tag}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl text-gold-100">{st.title}</h3>
                    <p className="text-[10px] text-stone-400 font-semibold tracking-wider uppercase">{st.subtitle}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pt-2">
                    {st.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
