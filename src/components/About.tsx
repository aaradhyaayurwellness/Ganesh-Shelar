import { Compass, Eye, ShieldCheck, Star } from "lucide-react";

export default function About() {
  const values = [
    {
      title: "Our Mission",
      desc: "To empower individuals and multi-generation families across India to regain self-reliance in their health through natural lifestyle habits, science-backed nutrition, and daily routine awareness.",
      icon: Compass,
      color: "text-amber-400"
    },
    {
      title: "Our Vision",
      desc: "An India free from lifestyle-induced physical suffering, where natural preventative knowledge is deeply embedded into every home-kitchen, and active wellness is a joyful domestic ritual.",
      icon: Eye,
      color: "text-emerald-400"
    },
    {
      title: "Our Core Values",
      desc: "Rooted in absolute transparency, ethical mentorship, genuine human empathy, and clinical humility. We strictly never sell proprietary drugs, make false treatment promises, or lock patients into MLM layers.",
      icon: ShieldCheck,
      color: "text-blue-400"
    }
  ];

  return (
    <section id="about" className="py-24 bg-forest-900/30 relative border-t border-gold-300/10">
      {/* Decorative Blur Bubble */}
      <div className="absolute top-[40%] left-[-10%] w-[45%] h-[45%] rounded-full bg-forest-700/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
            <Star className="w-3.5 h-3.5 fill-gold-400/20" />
            Ecosystem and Purpose
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Our Story & Wellness Philosophy
          </h2>
          <div className="h-0.5 w-16 bg-gold-400 mx-auto rounded-full mt-4" />
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Aradhya Ayur Wellness was born from a simple yet profound realization: that modern health suffers not from a lack of medicine, but from a departure from natural rhythms.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Main Story Text */}
          <div className="lg:col-span-7 space-y-6 text-stone-300 text-sm sm:text-base leading-relaxed">
            <h3 className="font-serif text-2xl text-gold-200 leading-tight">
              Bridging Modern Science with Classical Wisdom
            </h3>
            
            <p>
              The founders, <strong className="text-white font-medium">Ganesh Shelar</strong> and <strong className="text-white font-medium">Surekha Shelar</strong>, recognized that the fast pace of urban living, unnatural sleep hours, and highly processed diets have created widespread metabolic instability in Indian families. 
            </p>
            
            <p>
              Through their educational backgrounds in food bio-technology, operational dynamics, and deep personal experiments with classical Ayurvedic text models, they co-founded Aradhya Ayur Wellness. Their objective was not to establish a clinic or a medicine store, but to build an authoritative coaching sanctuary.
            </p>

            <div className="p-5 rounded-xl border border-gold-300/10 bg-forest-900/40 italic">
              "We believe the body is inherently self-healing and self-regulating. True healing does not come from a pill, but from establishing proper nutrition, aligning ourselves with natural rhythms, and maintaining personal confidence in your own body."
            </div>

            <p>
              By translating ancient tenets of <em className="text-gold-200">Ahar</em> (balanced nutrition), <em className="text-gold-200">Vihar</em> (correct lifestyle habits), and <em className="text-gold-200">Vasana</em> (peaceful state of mind) into simple, scientific checklists, they guide children, adults, and seniors into enduring wellness and renewed youthfulness.
            </p>
          </div>

          {/* Graphical Philosophy Billboard */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl glass-panel relative border border-gold-300/10 hover:border-gold-300/30 transition-all duration-300 bento-card-hover" id="philosophy-billboard">
              <div className="absolute top-4 left-4 text-xs font-semibold text-gold-400 uppercase tracking-widest">
                Our Creed
              </div>
              
              <div className="space-y-6 pt-6">
                <div className="border-l-4 border-gold-400 pl-4 space-y-1">
                  <h4 className="font-serif text-lg text-white font-normal">Ahar (Diet)</h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Eating seasonal, unprocessed ingredients suited to your personal metabolic digestive heat (Agni).
                  </p>
                </div>

                <div className="border-l-4 border-gold-400 pl-4 space-y-1">
                  <h4 className="font-serif text-lg text-white font-normal">Vihar (Lifestyle)</h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Structuring sleep patterns, clean morning cleansing cycles, and active muscle alignment with circadian cycles.
                  </p>
                </div>

                <div className="border-l-4 border-gold-400 pl-4 space-y-1">
                  <h4 className="font-serif text-lg text-white font-normal">Satsang (Community)</h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Consistently interacting with positive, mindful groups, and learning holistic health skills to support your household.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Mission, Vision, Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((col, i) => {
            const Icon = col.icon;
            return (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-forest-900 border border-gold-300/10 hover:border-gold-300/25 transition-all duration-300 flex flex-col justify-between group bento-card-hover"
              >
                <div className="space-y-4">
                  <div className={`h-12 w-12 rounded-lg bg-white/5 flex items-center justify-center ${col.color}`}>
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h4 className="font-serif text-xl text-gold-200">
                    {col.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {col.desc}
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
