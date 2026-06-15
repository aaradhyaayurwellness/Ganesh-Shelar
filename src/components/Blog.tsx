import { useState } from "react";
import { BookOpen, Calendar, Clock, ArrowRight, X, ChevronRight } from "lucide-react";
import { BLOGS, BlogPost } from "../types";

export default function Blog() {
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 bg-forest-900/30 relative border-t border-gold-300/10">
      
      {/* Decorative Blur elements */}
      <div className="absolute top-[30%] right-[-10%] w-[45%] h-[45%] bg-forest-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
            <BookOpen className="w-3.5 h-3.5 text-gold-400" />
            Empowering Literacy Studies
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            The Wellness Resource Blog
          </h2>
          <div className="h-0.5 w-16 bg-gold-400 mx-auto rounded-full mt-4" />
          <p className="text-stone-300 text-sm sm:text-base">
            Read classical, non-commercial education pieces written by our health advisors covering kitchen nutrition, daily self-care systems, and body awareness.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOGS.map((blog) => {
            return (
              <div 
                key={blog.id}
                className="bg-forest-900 rounded-2xl border border-gold-300/10 hover:border-gold-300/25 transition-all duration-300 overflow-hidden flex flex-col justify-between group bento-card-hover"
              >
                <div className="p-6 sm:p-8 space-y-5">
                  {/* Category and Read time */}
                  <div className="flex justify-between items-center text-[10px] sm:text-xs">
                    <span className="text-[10px] text-gold-300 font-bold uppercase tracking-widest bg-gold-400/5 border border-gold-300/15 rounded-md px-2.5 py-1">
                      {blog.category}
                    </span>
                    <span className="text-stone-400/80 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-white group-hover:text-gold-200 transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                    {blog.summary}
                  </p>
                </div>

                {/* Footer card link */}
                <div 
                  className="px-6 sm:px-8 py-5 border-t border-stone-800/40 flex justify-between items-center bg-forest-950 cursor-pointer"
                  onClick={() => setActiveBlog(blog)}
                  id={`read-article-link-${blog.id}`}
                >
                  <span className="text-xs font-bold text-stone-300 group-hover:text-white uppercase tracking-wider">
                    Read Article
                  </span>
                  <div className="h-8 w-8 rounded-full bg-forest-900 flex items-center justify-center text-gold-300 group-hover:bg-gold-400 group-hover:text-forest-950 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Read Modal Drawer */}
        {activeBlog && (
          <div id="blog-panel-underlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Overlay */}
            <div 
              className="absolute inset-0 bg-forest-950/90 backdrop-blur-md" 
              onClick={() => setActiveBlog(null)}
            />
            
            {/* Modal Body */}
            <div className="relative w-full max-w-3xl glass-panel text-white rounded-2xl overflow-hidden shadow-2xl border border-gold-300/20 max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
              
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-gold-300/10">
                <div className="space-y-1">
                  <span className="text-[10px] text-gold-300 font-bold uppercase tracking-widest bg-gold-400/5 border border-gold-300/15 rounded-md px-2 py-0.5">
                    {activeBlog.category}
                  </span>
                  <div className="flex items-center gap-4 text-xs text-stone-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {activeBlog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {activeBlog.readTime}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setActiveBlog(null)}
                  className="p-1 rounded-full text-stone-400 hover:text-gold-200 hover:bg-white/5 transition-colors"
                  id="close-blog-panel-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 overflow-y-auto max-h-[60vh] text-stone-300 text-sm sm:text-base leading-relaxed space-y-6">
                <h3 className="font-serif text-2xl sm:text-3xl text-gold-100 font-medium">
                  {activeBlog.title}
                </h3>
                
                {/* Simulated Article Body */}
                <div className="h-0.5 w-16 bg-gold-400 rounded-full" />
                
                <div className="whitespace-pre-line space-y-4">
                  {activeBlog.content}
                </div>

                {/* Closing Advisory stamp */}
                <div className="mt-8 p-4 bg-forest-900/40 rounded-xl border border-gold-300/15 text-xs text-stone-300 italic">
                  📝 <strong className="text-gold-200">Educational Note:</strong> This resource blog article is created for holistic daily wellness habits. It should never substitute professional diagnostic counseling. Always consult qualified coaches on custom spice compatibility.
                </div>
              </div>

              {/* Footer */}
              <div className="bg-forest-950 px-6 py-4 flex justify-between items-center border-t border-gold-300/10">
                <span className="text-xs text-stone-400">Written by Ganesh & Surekha Shelar</span>
                <button
                  onClick={() => setActiveBlog(null)}
                  className="text-gold-300 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Close Article
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
