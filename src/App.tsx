import { useState, useEffect } from "react";
import { MessageSquare, PhoneCall, Sparkles } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experts from "./components/Experts";
import Services from "./components/Services";
import Mission2030 from "./components/Mission2030";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ConsultationModal from "./components/ConsultationModal";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFloater, setShowFloater] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(window.location.hash === "#admin");

  useEffect(() => {
    const handleScroll = () => {
      setShowFloater(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminOpen(window.location.hash === "#admin");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleOpenBooking = () => {
    setIsModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsModalOpen(false);
  };

  const handleQuickWhatsApp = () => {
    const primaryNumber = "9307568748";
    const text = "Hello Aradhya Ayur Wellness! I would like to inquire about your personalized lifestyle habit coaching services.";
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/91${primaryNumber}?text=${encodedText}`, "_blank", "noopener,noreferrer");
  };

  const handleQuickCall = () => {
    window.open("tel:+919307568748", "_self");
  };

  return (
    <div className="min-h-screen bg-forest-950 selection:bg-gold-500 selection:text-forest-950 font-sans text-stone-100 flex flex-col justify-between">
      
      {/* Decorative top header glow */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[300px] bg-gold-400/5 blur-[120px] pointer-events-none select-none z-0" />

      {/* Luxury Static Header */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* Main Single-View Layout Blocks */}
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* ABOUT & STORY SECTION */}
        <About />

        {/* FOUNDERS & EXPERTS SECTION */}
        <Experts />

        {/* SERVICES SECTION */}
        <Services onOpenBooking={handleOpenBooking} />

        {/* MISSION 2030 PHILOSOPHY SECTION */}
        <Mission2030 />

        {/* WHY CHOOSE US */}
        <WhyChooseUs />

        {/* SUCCESS STORIES SECTION */}
        <Testimonials />

        {/* EDUCATIONAL RESOURCE BLOG */}
        <Blog />

        {/* CONTACT & IFRAME MAP SECTION */}
        <Contact />

      </main>

      {/* FOOTER */}
      <Footer />

      {/* CONSULTATION REGISTRATION DIALOG MODAL */}
      <ConsultationModal isOpen={isModalOpen} onClose={handleCloseBooking} />

      {/* SECURE STAFF PORTAL FOR GOOGLE SHEETS ALIGNMENT */}
      <AdminPanel isOpen={isAdminOpen} onClose={() => {
        setIsAdminOpen(false);
        window.location.hash = "";
      }} />

      {/* Sticky Support Float Tooling for conversion-centric layout */}
      {showFloater && (
        <div id="sticky-floater-actions" className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Quick Call */}
          <button
            onClick={handleQuickCall}
            id="floating-call-action-btn"
            title="Call Consultant"
            className="h-12 w-12 rounded-full bg-gold-400 hover:bg-gold-500 text-forest-950 flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          >
            <PhoneCall className="w-5 h-5 group-hover:animate-bounce" />
          </button>

          {/* Quick WhatsApp */}
          <button
            onClick={handleQuickWhatsApp}
            id="floating-whatsapp-action-btn"
            title="Chat on WhatsApp"
            className="h-12 w-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer relative"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
            
            {/* Absolute badge calling out wellness help */}
            <span className="absolute right-14 bg-forest-950/90 text-gold-300 border border-gold-300/20 text-[9px] font-bold uppercase tracking-widest py-1 px-2.5 rounded-md whitespace-nowrap opacity-0 md:group-hover:opacity-100 group-hover:opacity-100 transition-opacity pointer-events-none shadow">
              🌿 Consult Now
            </span>
          </button>

        </div>
      )}

    </div>
  );
}
