import React from "react";
import { TESTIMONIALS } from "../data";
import { useAccessibility } from "../context/AccessibilityContext";
import { Star, Check } from "lucide-react";

export default function TestimonialsGrid() {
  const { highContrast, textSize } = useAccessibility();

  const getHeadingSize = () => {
    if (textSize === "extra-large") return "text-3xl sm:text-4xl font-extrabold pb-1";
    if (textSize === "large") return "text-2.5xl sm:text-3xl font-extrabold pb-1";
    return "text-xl sm:text-2.5xl font-extrabold pb-1";
  };

  return (
    <section 
      id="testimonials" 
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
            Ocular Success Stories
          </span>
          <h2 className={`${getHeadingSize()} ${highContrast ? "text-white" : "text-blue-950 font-display"}`}>
            Feedback From Our Recovered Patients
          </h2>
          <div className={`h-1 w-20 mx-auto rounded-full ${highContrast ? "bg-white" : "bg-blue-600"}`} />
          <p className={`leading-relaxed ${
            textSize === "extra-large" ? "text-lg text-slate-300" : "text-sm sm:text-base text-slate-600"
          }`}>
            We take pride in our patient satisfaction rates. Review authentic testimonials from individuals who restored their eyesight.
          </p>
        </div>

        {/* Testimonials Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-colors shadow-sm ${
                highContrast 
                  ? "bg-black border-white text-white" 
                  : "bg-white border-slate-100 text-slate-800 hover:shadow-md"
              }`}
            >
              <div className="space-y-4">
                {/* Visual Stars */}
                <div className="flex gap-1.5 focus:outline-none">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4.5 h-4.5 fill-current ${
                        highContrast ? "text-yellow-400" : "text-amber-400"
                      }`} 
                    />
                  ))}
                </div>

                <p className={`italic leading-relaxed ${
                  textSize === "extra-large" ? "text-base tracking-wide" : "text-sm text-slate-600 font-light"
                }`}>
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Author Segment */}
              <div className="mt-6 pt-5 border-t border-slate-100/50 flex justify-between items-center text-xs">
                <div>
                  <h4 className={`font-bold ${
                    textSize === "extra-large" ? "text-base" : "text-sm"
                  } ${highContrast ? "text-white" : "text-blue-950"}`}>
                    {t.name}
                  </h4>
                  <p className="text-slate-400 mt-0.5">
                    Age {t.age} &bull; {t.location}
                  </p>
                </div>

                {t.verified && (
                  <div className={`py-1 px-2 rounded font-semibold uppercase tracking-widest text-[9px] flex items-center gap-1 leading-none ${
                    highContrast ? "bg-slate-900 border border-white" : "bg-emerald-50 text-emerald-700 font-bold"
                  }`}>
                    <Check className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Verified Patient</span>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
