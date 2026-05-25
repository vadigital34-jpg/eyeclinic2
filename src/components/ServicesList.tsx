import React, { useState } from "react";
import { SERVICES } from "../data";
import { useAccessibility } from "../context/AccessibilityContext";
import { Service } from "../types";
import { Eye, Glasses, Zap, Activity, ShieldAlert, Users, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

// Helper component to map icon names dynamically
function ServiceIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "Eye": return <Eye className={className} />;
    case "Glasses": return <Glasses className={className} />;
    case "Zap": return <Zap className={className} />;
    case "Activity": return <Activity className={className} />;
    case "ShieldAlert": return <ShieldAlert className={className} />;
    case "Users": return <Users className={className} />;
    default: return <Eye className={className} />;
  }
}

export default function ServicesList() {
  const { highContrast, textSize } = useAccessibility();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    setActiveCardId(prev => (prev === id ? null : id));
  };

  const getHeadingSize = () => {
    if (textSize === "extra-large") return "text-3xl sm:text-4xl font-extrabold";
    if (textSize === "large") return "text-2.5xl sm:text-3xl font-extrabold";
    return "text-xl sm:text-2.5xl font-extrabold";
  };

  return (
    <section 
      id="services" 
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
            Ophthalmology Excellence
          </span>
          <h2 className={`${getHeadingSize()} ${highContrast ? "text-white" : "text-blue-950 font-display"}`}>
            Our Core Eye Care Services
          </h2>
          <div className={`h-1 w-20 mx-auto rounded-full ${highContrast ? "bg-white" : "bg-blue-600"}`} />
          <p className={`leading-relaxed ${
            textSize === "extra-large" ? "text-lg text-slate-300" : "text-sm sm:text-base text-slate-600"
          }`}>
            We provide targeted, customized treatments using the latest international medical equipment. Click on any service below to view specific treatments included.
          </p>
        </div>

        {/* Services Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv: Service) => {
            const isExpanded = activeCardId === srv.id;
            return (
              <div 
                key={srv.id}
                className={`flex flex-col rounded-2xl border p-6 transition-all duration-300 relative shadow-sm hover:translate-y-[-4px] ${
                  highContrast 
                    ? "bg-black border-white text-white hover:bg-slate-900" 
                    : "bg-white border-slate-100 text-slate-800 hover:shadow-lg hover:border-blue-100"
                }`}
              >
                {/* Icon Circle */}
                <div className={`p-4 rounded-xl w-fit mb-5 transition-colors ${
                  highContrast ? "bg-white text-black" : "bg-blue-50 text-blue-600"
                }`}>
                  <ServiceIcon name={srv.iconName} className="w-6 h-6" />
                </div>

                <h3 className={`font-bold mb-3 ${
                  textSize === "extra-large" ? "text-2D-sm" : "text-lg sm:text-xl"
                } ${highContrast ? "text-white" : "text-blue-950"}`}>
                  {srv.title}
                </h3>

                <p className={`leading-relaxed flex-grow mb-5 ${
                  textSize === "extra-large" ? "text-base text-slate-300" : "text-sm text-slate-600"
                }`}>
                  {srv.shortDesc}
                </p>

                {/* Expanded treatment specifications */}
                {isExpanded && (
                  <div className={`mt-2 mb-5 p-4 rounded-xl text-xs sm:text-sm border transition-all ${
                    highContrast 
                      ? "bg-slate-950 border-white text-slate-200"
                      : "bg-blue-50/30 border-blue-50/50 text-slate-700"
                  }`}>
                    <p className="font-semibold mb-3 tracking-wide">Included Treatments:</p>
                    <ul className="space-y-2">
                      {srv.treatments.map((tr) => (
                        <li key={tr} className="flex items-center gap-2">
                          <CheckCircle className={`w-4.5 h-4.5 ${highContrast ? "text-white" : "text-blue-500"}`} />
                          <span>{tr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Learn more interactive toggle */}
                <button
                  onClick={() => toggleDetails(srv.id)}
                  className={`mt-auto w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all focus:outline-none border ${
                    highContrast 
                      ? "border-white hover:bg-white hover:text-black" 
                      : "border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-blue-900"
                  }`}
                  aria-expanded={isExpanded}
                >
                  <span>{isExpanded ? "Hide Specifics" : "View Specifics"}</span>
                  {isExpanded ? <ChevronUp className="w-4.5 h-4.5" /> : <ChevronDown className="w-4.5 h-4.5" />}
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
