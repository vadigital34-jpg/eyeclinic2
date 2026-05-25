import React, { useState } from "react";
import { TECHNOLOGIES } from "../data";
import { useAccessibility } from "../context/AccessibilityContext";
import { Award, Zap, Shield, Sparkles } from "lucide-react";

export default function TechnologyShowcase() {
  const { highContrast, textSize } = useAccessibility();
  const [activeTechId, setActiveTechId] = useState(TECHNOLOGIES[0].id);

  const selectedTech = TECHNOLOGIES.find((t) => t.id === activeTechId) || TECHNOLOGIES[0];

  const getHeadingSize = () => {
    if (textSize === "extra-large") return "text-3xl sm:text-4xl font-extrabold";
    if (textSize === "large") return "text-2.5xl sm:text-3xl font-extrabold";
    return "text-xl sm:text-2.5xl font-extrabold";
  };

  return (
    <section 
      id="technology" 
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${
        highContrast ? "bg-black border-white" : "bg-slate-50/70"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className={`text-xs font-bold uppercase tracking-widest font-mono ${
            highContrast ? "text-slate-200" : "text-blue-600"
          }`}>
            Advanced Diagnostics
          </span>
          <h2 className={`${getHeadingSize()} ${highContrast ? "text-white" : "text-blue-950 font-display"}`}>
            Next-Generation Medical Technology
          </h2>
          <div className={`h-1 w-20 mx-auto rounded-full ${highContrast ? "bg-white" : "bg-blue-600"}`} />
          <p className={`leading-relaxed ${
            textSize === "extra-large" ? "text-lg text-slate-300" : "text-sm sm:text-base text-slate-600"
          }`}>
            We continuously invest in Swiss and German engineered hardware to ensure microscopic diagnostics, blade-free procedures, and predictive retina mappings.
          </p>
        </div>

        {/* Tab Selection Row for Seniors */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {TECHNOLOGIES.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTechId(t.id)}
              className={`py-3.5 px-6 rounded-xl font-bold text-sm transition-all focus:outline-none border ${
                activeTechId === t.id
                  ? highContrast
                    ? "bg-white text-black border-white shadow"
                    : "bg-blue-600 text-white border-blue-600 shadow-md"
                  : highContrast
                    ? "bg-black text-white border-white hover:bg-slate-900"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
              }`}
            >
              {t.name.split(" ")[0]} Machine
            </button>
          ))}
        </div>

        {/* Focus Item Panel */}
        <div className={`rounded-2xl border p-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center transition-colors duration-200 ${
          highContrast ? "bg-black border-white text-white" : "bg-white border-slate-100 shadow-lg shadow-slate-200/50 text-slate-800"
        }`}>
          
          {/* Machine image showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className={`absolute -inset-2 rounded-2xl transform bg-gradient-to-tr filter blur-sm ${
              highContrast ? "from-slate-800 to-slate-900" : "from-blue-200 to-sky-100"
            }`} />
            
            <div className={`relative rounded-xl overflow-hidden shadow border-2 w-full max-w-sm ${
              highContrast ? "border-white bg-black" : "border-white bg-slate-50"
            }`}>
              <img 
                src={selectedTech.imgUrl} 
                alt={selectedTech.name} 
                className="object-cover w-full h-[260px] sm:h-[320px] transition-transform duration-500 hover:scale-101"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Machine detailed description */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                highContrast ? "text-slate-300" : "text-blue-600"
              }`}>
                {selectedTech.tagline}
              </span>
              <h3 className={`font-bold mt-2 font-display ${
                textSize === "extra-large" ? "text-2.5xl" : "text-xl sm:text-2xl"
              } ${highContrast ? "text-white" : "text-blue-950"}`}>
                {selectedTech.name}
              </h3>
            </div>

            <p className={`leading-relaxed ${
              textSize === "extra-large" ? "text-lg text-slate-300" : "text-sm sm:text-base text-slate-600"
            }`}>
              {selectedTech.description}
            </p>

            <div className={`p-4 rounded-xl border flex gap-3 ${
              highContrast ? "bg-slate-950 border-white" : "bg-blue-50/40 border-blue-50"
            }`}>
              <Sparkles className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                highContrast ? "text-white" : "text-blue-600"
              }`} />
              <div>
                <p className="text-xs sm:text-sm font-bold tracking-wide uppercase leading-none mb-1 text-slate-500">
                  Primary Usage Details:
                </p>
                <p className={`leading-relaxed font-semibold ${
                  textSize === "extra-large" ? "text-sm sm:text-base" : "text-xs sm:text-sm text-slate-700"
                }`}>
                  {selectedTech.useCase}
                </p>
              </div>
            </div>

            {/* Support parameters */}
            <div className="grid grid-cols-2 gap-4 text-xs tracking-wider uppercase font-mono text-slate-400">
              <div>
                <span className="block font-bold">Accuracy</span>
                <span className="text-emerald-500 font-extrabold text-sm font-sans">0.02μ Precision</span>
              </div>
              <div>
                <span className="block">Certification</span>
                <span className={`font-extrabold text-sm font-sans ${highContrast ? "text-white" : "text-blue-900"}`}>
                  FDA & CE Cleared
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
