import React from "react";
import { useAccessibility } from "../context/AccessibilityContext";
import { motion } from "motion/react";
import { Check, ClipboardList, Zap, Eye, EyeOff, ShieldCheck, HeartPulse, Sparkles } from "lucide-react";

export default function AboutClinic() {
  const { highContrast, textSize } = useAccessibility();

  const getHeadingSize = () => {
    if (textSize === "extra-large") return "text-3xl sm:text-4xl font-extrabold";
    if (textSize === "large") return "text-2xl sm:text-3xl font-extrabold";
    return "text-xl sm:text-2.5xl font-extrabold";
  };

  const getSubClass = () => {
    if (textSize === "extra-large") return "text-lg sm:text-xl font-medium leading-relaxed";
    if (textSize === "large") return "text-base sm:text-lg font-normal leading-relaxed";
    return "text-sm sm:text-base text-slate-600 leading-relaxed";
  };

  const highlights = [
    { title: "Modern Eye Testing", desc: "Digital diagnostic systems for pixel-perfect vision analysis.", icon: ClipboardList },
    { title: "LASIK Consultation", desc: "No-obligation candidacy screening with high Wavefront scanning.", icon: Zap },
    { title: "Retina Care", desc: "Biological layer monitoring utilizing optical coherence scans.", icon: ShieldCheck },
    { title: "Cataract Surgery", desc: "Advanced sutureless outpatient lens replacements.", icon: Eye },
    { title: "Complete Eye Exams", desc: "Systematic health mapping for pressure, field focus, and visual acuity.", icon: HeartPulse },
    { title: "Child Eye Care", desc: "Friendly targeted testing to diagnose alignment challenges.", icon: Sparkles }
  ];

  return (
    <section 
      id="about" 
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${
        highContrast ? "bg-black border-white" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Info Columns */}
          <div className="lg:col-span-5 space-y-6">
            <span className={`text-xs uppercase tracking-widest font-mono font-bold block ${
              highContrast ? "text-slate-200" : "text-blue-600"
            }`}>
              Clinic Introduction
            </span>
            <h2 className={`${getHeadingSize()} ${highContrast ? "text-white" : "text-blue-950 font-display"}`}>
              Restoring Optical Clarity with World-Class Healthcare
            </h2>
            <p className={`${getSubClass()} ${highContrast ? "text-slate-300" : "text-slate-600"}`}>
              ClearVision Eye Clinic brings together a specialized clinical core of board-certified ophthalmologists, cutting-edge Swiss-engineered lasers, and a comforting medical methodology designed for patients of all generations.
            </p>
            <p className={`${getSubClass()} ${highContrast ? "text-slate-400" : "text-slate-500"}`}>
              Whether looking to treat blurry contours, transition to spectacle-free living with customized Femto-LASIK, or screen your child’s dynamic ocular growth, our Boston practitioners combine custom expertise with absolute clinical responsibility.
            </p>
            
            {/* Mission Badge box */}
            <div className={`p-4 rounded-xl border flex items-center gap-3.5 ${
              highContrast 
                ? "bg-slate-950 border-white text-white" 
                : "bg-blue-50/50 border-blue-100 text-slate-800"
            }`}>
              <div className="text-xl">🎖️</div>
              <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                Accepted by major medical insurance providers with available financing programs for premium optical solutions.
              </p>
            </div>
          </div>

          {/* Core Highlights Showcase Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.title}
                  className={`p-6 rounded-xl border transition-all duration-200 shadow-sm ${
                    highContrast 
                      ? "bg-black border-white text-white hover:bg-slate-900" 
                      : "bg-slate-50 border-slate-100 text-slate-900 hover:bg-white hover:shadow-md hover:border-blue-200"
                  }`}
                >
                  <div className={`p-3 rounded-lg w-fit mb-4 ${
                    highContrast ? "bg-white text-black" : "bg-blue-100 text-blue-800"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold mb-2 ${
                    textSize === "extra-large" ? "text-xl" : "text-base"
                  } ${highContrast ? "text-white" : "text-blue-900"}`}>
                    {item.title}
                  </h3>
                  <p className={`leading-relaxed ${
                    textSize === "extra-large" ? "text-base" : "text-sm"
                  } ${highContrast ? "text-slate-300" : "text-slate-500"}`}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
