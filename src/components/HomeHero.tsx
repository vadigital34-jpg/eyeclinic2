import React from "react";
import { useAccessibility } from "../context/AccessibilityContext";
import { motion } from "motion/react";
import { Calendar, Phone, ShieldAlert, Award, Sparkles, CheckCircle2 } from "lucide-react";

export default function HomeHero() {
  const { highContrast, textSize } = useAccessibility();

  // Scale typography based on magnifier
  const getHeadingSizeClass = () => {
    if (textSize === "extra-large") return "text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight";
    if (textSize === "large") return "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight";
    return "text-2xl sm:text-3.5xl lg:text-5xl font-extrabold tracking-tight";
  };

  const getSubheadingSizeClass = () => {
    if (textSize === "extra-large") return "text-xl sm:text-2xl font-medium leading-relaxed";
    if (textSize === "large") return "text-lg sm:text-xl font-normal leading-relaxed";
    return "text-base sm:text-lg text-slate-600 leading-relaxed font-light";
  };

  return (
    <section 
      id="home" 
      className={`relative overflow-hidden py-12 lg:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        highContrast ? "bg-black border-b border-white" : "bg-white border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Copy Panel Area */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6"
        >
          {/* Quality tag indicator */}
          <div className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-4 uppercase tracking-wider ${
            highContrast ? "bg-white text-black" : "bg-blue-50 text-blue-700"
          }`}>
            Boston&apos;s Preferred Vision Center
          </div>

          <h1 className={`${getHeadingSizeClass()} ${highContrast ? "text-white" : "text-blue-950 font-display"}`}>
            Advanced Eye Care <br />
            <span className={highContrast ? "text-slate-200 underline" : "text-blue-600"}>
              For Better Vision
            </span>
          </h1>

          <p className={`${getSubheadingSizeClass()} ${highContrast ? "text-slate-300" : "text-slate-600"}`}>
            Professional diagnosis, modern technology, and expert eye specialists dedicated to preserving and restoring your visual clarity.
          </p>

          {/* Core Benefit Statements for Trust */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {[
              "Board-certified ophthalmologists", 
              "Next-generation digital imaging",
              "Sutureless micro-incision surgery",
              "Welcoming senior-focused care"
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2.5">
                <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${highContrast ? "text-white" : "text-blue-500"}`} />
                <span className={`text-sm font-medium ${highContrast ? "text-slate-200" : "text-slate-700"}`}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* Call to Actions buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#appointments"
              className={`py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2 text-center shadow-md transition-all focus:outline-none hover:-translate-y-0.5 active:translate-y-0 ${
                highContrast 
                  ? "bg-white text-black hover:bg-slate-200 border-2 border-white" 
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg shadow-blue-500/10"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </a>

            <a
              href="tel:+18005559911"
              className={`py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2 text-center transition-all focus:outline-none hover:-translate-y-0.5 active:translate-y-0 ${
                highContrast 
                  ? "border-2 border-red-500 bg-red-950/20 text-red-500 hover:bg-red-900 hover:text-white" 
                  : "border border-red-200 bg-red-50/70 text-red-700 hover:bg-red-100/80"
              }`}
            >
              <Phone className="w-5 h-5 text-red-600" />
              <span>Emergency Contact</span>
            </a>
          </div>

          {/* Quick clinical indicators */}
          <div className="flex items-center gap-6 pt-4 text-xs tracking-wide text-slate-500 font-mono">
            <div>
              <span className={`block font-extrabold text-lg sm:text-xl ${highContrast ? "text-white" : "text-blue-900"}`}>
                8k+
              </span>
              <span>Eyes Restored</span>
            </div>
            <div className="w-px h-8 bg-slate-300/40" />
            <div>
              <span className={`block font-extrabold text-lg sm:text-xl ${highContrast ? "text-white" : "text-blue-900"}`}>
                15+
              </span>
              <span>Years of Expertise</span>
            </div>
            <div className="w-px h-8 bg-slate-300/40" />
            <div>
              <span className={`block font-extrabold text-lg sm:text-xl ${highContrast ? "text-white" : "text-blue-900"}`}>
                99%
              </span>
              <span>Satisfaction Score</span>
            </div>
          </div>

        </motion.div>

        {/* Right Graphical Visual Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 relative flex justify-center"
        >
          {/* Layout background frames */}
          <div className={`absolute inset-0 rounded-2xl transform rotate-3 scale-102 filter blur-sm transition-colors duration-300 ${
            highContrast ? "bg-slate-800" : "bg-gradient-to-tr from-sky-200 to-blue-200"
          }`} />

          <div className={`relative rounded-2xl overflow-hidden shadow-xl border-4 transition-colors duration-300 ${
            highContrast ? "border-white bg-slate-900" : "border-white bg-white shadow-slate-900/10"
          }`}>
            <img 
              src="/src/assets/images/hero_doctor_patient_1779729460845.png" 
              alt="Experienced professional doctor examining patient's eyesight" 
              className="object-cover w-full h-[300px] sm:h-[420px] max-w-lg lg:max-w-none transition-transform hover:scale-102 duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Overlay badge with medical badge */}
            <div className={`absolute bottom-4 left-4 p-4 rounded-xl shadow-lg flex items-center gap-3 border text-left ${
              highContrast 
                ? "bg-black text-white border-white" 
                : "bg-white/95 backdrop-blur text-slate-800 border-slate-100 shadow-xl"
            }`}>
              <div className="p-2 sm:p-2.5 rounded-lg bg-green-500/10 text-green-600">
                <ShieldAlert className="w-5 h-5 animate-pulse-gentle" />
              </div>
              <div>
                <span className="block text-xs font-extrabold text-green-600 uppercase tracking-widest leading-none">
                  Surgical Quality
                </span>
                <span className="font-mono text-[10px] text-slate-400">FDA Approved Systems Only</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
