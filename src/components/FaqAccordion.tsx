import React, { useState } from "react";
import { FAQS } from "../data";
import { useAccessibility } from "../context/AccessibilityContext";
import { ChevronDown, HelpCircle, Heart } from "lucide-react";

export default function FaqAccordion() {
  const { highContrast, textSize } = useAccessibility();
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const getHeadingSize = () => {
    if (textSize === "extra-large") return "text-3xl sm:text-4xl font-extrabold pb-1";
    if (textSize === "large") return "text-2.5xl sm:text-3xl font-extrabold pb-1";
    return "text-xl sm:text-2.5xl font-extrabold pb-1";
  };

  return (
    <section 
      id="faq" 
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${
        highContrast ? "bg-black border-white" : "bg-white"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className={`text-xs font-bold uppercase tracking-widest font-mono ${
            highContrast ? "text-slate-200" : "text-blue-600"
          }`}>
            Patient Support
          </span>
          <h2 className={`${getHeadingSize()} ${highContrast ? "text-white" : "text-blue-950 font-display"}`}>
            Frequently Asked Questions
          </h2>
          <div className={`h-1 w-20 mx-auto rounded-full ${highContrast ? "bg-white" : "bg-blue-600"}`} />
          <p className={`leading-relaxed ${
            textSize === "extra-large" ? "text-lg text-slate-300" : "text-sm sm:text-base text-slate-500"
          }`}>
            Read detailed explanations directly from our clinical core to answer typical checkup, laser, and surgical concerns.
          </p>
        </div>

        {/* Accordions Group */}
        <div className="space-y-4">
          {FAQS.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div 
                key={item.id}
                className={`rounded-2xl border transition-colors ${
                  highContrast 
                    ? "bg-black border-white text-white" 
                    : "bg-slate-50 border-slate-150 text-slate-800"
                }`}
              >
                {/* Trigger Banner */}
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      highContrast ? "text-white" : "text-blue-600"
                    }`} />
                    <span className={`font-bold transition-all ${
                      textSize === "extra-large" ? "text-lg tracking-wide" : "text-sm sm:text-base"
                    } ${highContrast ? "text-white" : "text-blue-950"}`}>
                      {item.question}
                    </span>
                  </div>

                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  } ${highContrast ? "text-white" : "text-slate-400"}`} />
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className={`px-6 pb-6 border-t pt-4 transition-all ${
                    highContrast ? "border-slate-800" : "border-slate-100"
                  }`}>
                    <p className={`leading-relaxed ${
                      textSize === "extra-large" ? "text-lg" : "text-sm sm:text-base text-slate-600 font-light"
                    }`}>
                      {item.answer}
                    </p>
                    
                    <div className="mt-3 flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-slate-400">
                      <span>Related:</span>
                      <span className={`px-2 py-0.5 rounded ${
                        highContrast ? "bg-slate-900 text-white" : "bg-blue-50 text-blue-700"
                      }`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Extra Clinical Note */}
        <div className="mt-12 text-center text-xs text-slate-400 flex items-center justify-center gap-1">
          <Heart className="w-3.5 h-3.5 text-red-400" />
          <span>Need individualized diagnostic counseling? Tap our floating AI Eye care Helper below.</span>
        </div>

      </div>
    </section>
  );
}
