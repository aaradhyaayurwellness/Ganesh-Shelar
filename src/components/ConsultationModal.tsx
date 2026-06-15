import React, { useState } from "react";
import { X, Check, ArrowRight, MessageSquare, PhoneCall } from "lucide-react";
import { submitInquiry } from "../firebase";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    goal: "lifestyle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    
    try {
      await submitInquiry({
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        goal: getGoalLabel(formData.goal),
        message: formData.message || "Consultation Request (Modal)",
        source: "booking"
      });
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Consultation booking failed:", err);
      setErrorMsg("Unable to save consultation details. Please try again or check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getGoalLabel = (val: string) => {
    switch(val) {
      case "lifestyle": return "Lifestyle Coaching & Routine Balance";
      case "nutrition": return "Nutrition & Digestive Fire (Agni)";
      case "immunity": return "Immunity & Vitality Support";
      case "weight": return "Weight management guidance";
      case "family": return "Whole Family Wellness Program";
      default: return "Holistic Consultation";
    }
  };

  const handleWhatsAppRedirect = () => {
    const primaryNumber = "9307568748";
    const text = `Hello Aradhya Ayur Wellness! I would like to book a consultation.\n\n*Name:* ${formData.name}\n*City:* ${formData.city}\n*Phone:* ${formData.phone}\n*Primary Focus:* ${getGoalLabel(formData.goal)}\n*Additional Info:* ${formData.message || "None"}\n\nThank you, looking forward to starting my wellness journey with you!`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/91${primaryNumber}?text=${encodedText}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div id="booking-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#040c06]/85 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Scrollable Container */}
      <div className="relative w-full max-w-lg glass-panel text-white rounded-2xl overflow-hidden shadow-2xl border border-gold-300/20 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gold-300/10">
          <div>
            <h3 className="font-serif text-2xl text-gold-200 leading-tight">Request Wellness Consultation</h3>
            <p className="text-xs text-stone-300 mt-1">Transform your personal wellbeing journey naturally.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-gold-200 hover:bg-white/5 transition-colors"
            id="close-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase tracking-widest mb-1.5" htmlFor="form-name">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="form-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Anand Deshpande"
                  className="w-full px-4 py-2.5 rounded-lg bg-stone-900/60 border border-gold-300/15 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-gold-300/60 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gold-300 uppercase tracking-widest mb-1.5" htmlFor="form-phone">
                    WhatsApp/Call Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="form-phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 9876543210"
                    className="w-full px-4 py-2.5 rounded-lg bg-stone-900/60 border border-gold-300/15 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-gold-300/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gold-300 uppercase tracking-widest mb-1.5" htmlFor="form-city">
                    Your City & State <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="form-city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Pune, Maharashtra"
                    className="w-full px-4 py-2.5 rounded-lg bg-stone-900/60 border border-gold-300/15 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-gold-300/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase tracking-widest mb-1.5" htmlFor="form-goal">
                  Primary Wellness Focus <span className="text-red-400">*</span>
                </label>
                <select
                  id="form-goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-stone-900/60 border border-gold-300/15 text-stone-100 focus:outline-none focus:border-gold-300/60 transition-colors cursor-pointer"
                >
                  <option value="lifestyle">Lifestyle Coaching & Daily Routine</option>
                  <option value="nutrition">Diet, Recipe & Digestion Guidance</option>
                  <option value="immunity">Seasonal Immunity & Stamina</option>
                  <option value="weight">Healthy Weight Management</option>
                  <option value="family">Collective Family Wellness Program</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase tracking-widest mb-1.5" htmlFor="form-message">
                  Briefly Describe Your Current Health Goals (Optional)
                </label>
                <textarea
                  id="form-message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share any habits you wish to improve or details you would like our consultants to understand..."
                  className="w-full px-4 py-2.5 rounded-lg bg-stone-900/60 border border-gold-300/15 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-gold-300/60 transition-colors resize-none"
                />
              </div>

              <div className="bg-emerald-950/40 border border-emerald-900/30 rounded-lg p-3 text-stone-300 text-xs text-center">
                🛡️ <strong className="text-emerald-300">Privacy Assurance:</strong> We respect your integrity. We never sell your data, promote medicines, or recommend complex treatments. This is for wellness guidance only.
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-950/40 border border-red-900/30 text-red-200 text-xs rounded-lg text-center font-medium">
                  ⚠️ {errorMsg}
                </div>
              )}

              <button
                type="submit"
                id="submit-form-btn"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-4 rounded-lg bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-forest-950 font-bold tracking-wider hover:opacity-90 active:scale-[0.98] transition-transform duration-100 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold-900/20"
              >
                {isSubmitting ? (
                  <span className="inline-block w-5 h-5 border-2 border-forest-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Confirm Consultation Request
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-400/50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-serif text-2xl text-gold-200">Consultation Request Received</h4>
                <p className="text-stone-300 max-w-sm mx-auto text-sm leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Ganesh Shelar & Surekha Shelar will reach out to you within 24 hours.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gold-300/10 bg-gold-500/5 max-w-sm mx-auto space-y-3">
                <p className="text-xs text-gold-300 font-semibold tracking-wider uppercase">⚡ Instant Response Protocol</p>
                <p className="text-stone-300 text-xs leading-relaxed">
                  Want to skip the wait? Directly ping our consultants on WhatsApp on your current concern. We will receive your details instantly.
                </p>
                <button
                  onClick={handleWhatsAppRedirect}
                  id="modal-whatsapp-instant-btn"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  Pring Instant on WhatsApp
                </button>
              </div>

              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({ name: "", phone: "", city: "", goal: "lifestyle", message: "" });
                  onClose();
                }}
                className="text-stone-400 hover:text-stone-200 text-xs underline underline-offset-4 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
