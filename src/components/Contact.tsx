import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Check, 
  ArrowRight, 
  Send,
  CalendarCheck
} from "lucide-react";
import { submitInquiry } from "../firebase";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "lifestyle",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const getSatmyaLabel = (val: string) => {
    switch(val) {
      case "lifestyle": return "Lifestyle Habits Coaching";
      case "nutrition": return "Personalized Nutrition Guide";
      case "immunity": return "Seasonal Immunity Coaching";
      case "vitality": return "Family Vitality Program";
      default: return "General Health Advisory";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    
    try {
      await submitInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        goal: getSatmyaLabel(formData.goal),
        message: formData.message,
        source: "contact"
      });
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Inquiry submission failed:", err);
      setErrorMsg("Unable to save inquiry details. Please verify your internet connection or register directly on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSend = () => {
    const primaryNumber = "9307568748";
    const text = `Hello Aradhya Ayur Wellness! I just filled out your contact form.\n\n*Name:* ${formData.name}\n*Email:* ${formData.email || "Not shared"}\n*Phone:* ${formData.phone}\n*Topic:* ${getSatmyaLabel(formData.goal)}\n*Question:* ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/91${primaryNumber}?text=${encodedText}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-24 bg-forest-950 relative overflow-hidden border-t border-gold-300/10">
      
      {/* Glow bubble background */}
      <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] bg-gold-400/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[55%] h-[55%] bg-forest-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
            <CalendarCheck className="w-3.5 h-3.5 text-gold-400" />
            Connect & Initiate
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Consultation Desk & Location
          </h2>
          <div className="h-0.5 w-16 bg-gold-400 mx-auto rounded-full mt-4" />
          <p className="text-stone-300 text-sm sm:text-base">
            Reach out through our inquiry portal, ping directly on WhatsApp, or dial our advisors to schedule a supportive consultation.
          </p>
        </div>

        {/* Outer Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Details & Map (Column left 5/12) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-gold-200">
                Contact Information
              </h3>
              
              <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
                Our main headquarters and counseling facility are based in Solapur, Maharashtra. We welcome digital inquiries and support families across India.
              </p>

              {/* Informative nodes */}
              <div className="space-y-4 text-sm text-stone-300">
                
                {/* Brand name */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gold-400/10 flex items-center justify-center text-gold-300 flex-shrink-0 mt-0.5 border border-gold-300/10">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-white font-medium">Aradhya Ayur Wellness</h4>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      House No. 4, Ganesh Shelar Building,<br />
                      Near Srushti Bangla, Tembhurni,<br />
                      Solapur – 413211, Maharashtra, India.
                    </p>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gold-400/10 flex items-center justify-center text-gold-300 flex-shrink-0 mt-0.5 border border-gold-300/10">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-white font-medium">Direct Telephone Lines</h4>
                    <div className="flex flex-col gap-1.5 mt-2">
                      <a 
                        href="tel:+919307568748" 
                        className="text-xs text-stone-300 hover:text-gold-200 flex items-center gap-2"
                        id="call-btn-1"
                      >
                        📞 +91 93075 68748 (Ganesh Ji)
                      </a>
                      <a 
                        href="tel:+918552989238" 
                        className="text-xs text-stone-300 hover:text-gold-200 flex items-center gap-2"
                        id="call-btn-2"
                      >
                        📞 +91 85529 89238 (Surekha Ji)
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gold-400/10 flex items-center justify-center text-gold-300 flex-shrink-0 mt-0.5 border border-gold-300/10">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-white font-medium">Email Communication</h4>
                    <a 
                      href="mailto:aaradhyaayurwellness@gmail.com" 
                      className="text-xs text-stone-400 hover:text-gold-200 mt-1 block h-5 border-b border-transparent hover:border-gold-300 w-fit transition-colors"
                      id="email-contact-link"
                    >
                      aaradhyaayurwellness@gmail.com
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Google Map Iframe block */}
            <div className="rounded-xl overflow-hidden border border-gold-300/15 aspect-[16/10] bg-stone-900 shadow-lg relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15194.021074815469!2d75.1481845!3d17.922119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc42df082ff9725%3A0xe54d6af8ced7dbdb!2sTembhurni%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1718465000000!5m2!1sen!2sin" 
                className="w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer"
                title="Aradhya Ayur Tembhurni Map Location"
              />
              <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-forest-950/90 border border-gold-300/20 text-[9px] font-bold text-gold-300 uppercase tracking-widest pointer-events-none">
                📍 Solapur Facility Location Map
              </div>
            </div>

          </div>

          {/* Interactive Form Block (Column right 7/12) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl glass-panel border border-gold-300/15 bento-card-hover" id="contact-form-widget">
              
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                  
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl text-gold-100">Send an Inquiry</h3>
                    <p className="text-xs text-stone-300">Submit this form to schedule a voice consultation.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gold-300 uppercase tracking-widest mb-1.5" htmlFor="field-name">
                        Your Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="field-name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Ganesh Patil"
                        className="w-full px-4 py-2.5 rounded-lg bg-stone-900/60 border border-gold-300/15 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-gold-300/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gold-300 uppercase tracking-widest mb-1.5" htmlFor="field-phone">
                        WhatsApp Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="field-phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 9307568748"
                        className="w-full px-4 py-2.5 rounded-lg bg-stone-900/60 border border-gold-300/15 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-gold-300/60 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gold-300 uppercase tracking-widest mb-1.5" htmlFor="field-email">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="field-email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. ganesh@gmail.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-stone-900/60 border border-gold-300/15 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-gold-300/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gold-300 uppercase tracking-widest mb-1.5" htmlFor="field-goal">
                      Focus Wellness Discipline <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="goal"
                      id="field-goal"
                      value={formData.goal}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-stone-900/60 border border-gold-300/15 text-stone-100 focus:outline-none focus:border-gold-300/60 transition-colors cursor-pointer"
                    >
                      <option value="lifestyle">Lifestyle & Sleep Circadian Routines</option>
                      <option value="nutrition">Kitchen Herb & Digestion Assessment</option>
                      <option value="immunity">Seasonal Protective Immunity</option>
                      <option value="vitality">Collective Home Health Program</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gold-300 uppercase tracking-widest mb-1.5" htmlFor="field-message">
                      Tell us about your habits or wellness challenges <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      id="field-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="e.g. I experience fatigue in the evening hours... I feel bloated after raw salads..."
                      className="w-full px-4 py-2.5 rounded-lg bg-stone-900/60 border border-gold-300/15 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-gold-300/60 transition-colors resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-950/40 border border-red-900/30 text-red-200 text-xs rounded-lg text-center font-medium">
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    id="contact-form-submit-btn"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 text-forest-950 font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-transform duration-100 cursor-pointer shadow-lg shadow-gold-900/10"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-5 h-5 border-2 border-forest-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Submit Inquiry details
                        <Send className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>

                </form>
              ) : (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-serif text-2xl text-gold-200">Inquiry Sent Successfully</h4>
                    <p className="text-xs sm:text-sm text-stone-300 max-w-sm mx-auto leading-relaxed">
                      Thank you for trusting Aradhya Ayur Wellness, <strong className="text-white">{formData.name}</strong>. Ganesh Shelar or Surekha Shelar will reach out to you within 24 hours.
                    </p>
                  </div>

                  <div className="p-5 border border-gold-300/15 rounded-xl bg-gold-400/5 max-w-sm mx-auto space-y-3">
                    <p className="text-xs text-gold-200 font-bold uppercase tracking-widest">⚡ Expedite Consultation</p>
                    <p className="text-stone-300 text-xs">
                      If you'd like to accelerate your consultation, click below to instantly send your submitted details to our WhatsApp line.
                    </p>
                    <button
                      onClick={handleWhatsAppSend}
                      id="contact-whatsapp-expedite-btn"
                      className="w-full py-2.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#1fae53] text-white font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      Send Form via WhatsApp
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ name: "", email: "", phone: "", goal: "lifestyle", message: "" });
                    }}
                    className="text-stone-400 hover:text-stone-200 text-xs underline underline-offset-4 cursor-pointer"
                  >
                    Send Another Question
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
