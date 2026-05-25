import React from "react";
import { DOCTORS } from "../data";
import { useAccessibility } from "../context/AccessibilityContext";
import { Calendar, GraduationCap, Clock, Award, Languages } from "lucide-react";

export default function DoctorsList() {
  const { highContrast, textSize } = useAccessibility();

  const getHeadingSize = () => {
    if (textSize === "extra-large") return "text-3xl sm:text-4xl font-extrabold";
    if (textSize === "large") return "text-2.5xl sm:text-3xl font-extrabold";
    return "text-xl sm:text-2.5xl font-extrabold";
  };

  return (
    <section 
      id="doctors" 
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${
        highContrast ? "bg-black border-white" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className={`text-xs font-bold uppercase tracking-widest font-mono ${
            highContrast ? "text-slate-200" : "text-blue-600"
          }`}>
            Medical Leadership
          </span>
          <h2 className={`${getHeadingSize()} ${highContrast ? "text-white" : "text-blue-950 font-display"}`}>
            Our Board Certified Specialists
          </h2>
          <div className={`h-1 w-20 mx-auto rounded-full ${highContrast ? "bg-white" : "bg-blue-600"}`} />
          <p className={`leading-relaxed ${
            textSize === "extra-large" ? "text-lg text-slate-300" : "text-sm sm:text-base text-slate-600"
          }`}>
            Meet our specialized team of internationally acclaimed surgeons, pediatric opticians, and dry eye pioneers.
          </p>
        </div>

        {/* Doctors Profiles Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DOCTORS.map((dr) => (
            <div 
              key={dr.id}
              className={`flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 relative shadow-sm hover:shadow-md ${
                highContrast 
                  ? "bg-slate-950 border-white text-white" 
                  : "bg-white border-slate-100 text-slate-800"
              }`}
            >
              
              {/* Doctor Visual Frame */}
              <div className="relative h-72 w-full overflow-hidden bg-slate-100">
                <img 
                  src={dr.imgUrl} 
                  alt={dr.name} 
                  className="object-cover object-top w-full h-full transition-transform duration-500 hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm border ${
                  highContrast 
                    ? "bg-black text-white border-white" 
                    : "bg-blue-50/90 backdrop-blur text-blue-800 border-blue-100"
                }`}>
                  {dr.experience}
                </div>
              </div>

              {/* Doctor Details Body */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div>
                  <h3 className={`font-bold ${
                    textSize === "extra-large" ? "text-xl" : "text-base sm:text-lg"
                  } ${highContrast ? "text-white" : "text-blue-950"}`}>
                    {dr.name}
                  </h3>
                  <p className={`text-xs font-semibold ${
                    highContrast ? "text-slate-200" : "text-blue-600"
                  }`}>
                    {dr.title}
                  </p>
                </div>

                <div className="h-px bg-slate-100/50" />

                {/* Specific tags demanded: Qualification, Experience, Specialization */}
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5">
                    <GraduationCap className="w-4.5 h-4.5 text-slate-400 mt-0.5" />
                    <div>
                      <span className="block font-semibold">Qualification:</span>
                      <span className="text-slate-500">{dr.qualification}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Award className="w-4.5 h-4.5 text-slate-400 mt-0.5" />
                    <div>
                      <span className="block font-semibold">Specialization:</span>
                      <span className="text-slate-500">{dr.specialization}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Languages className="w-4.5 h-4.5 text-slate-400 mt-0.5" />
                    <div>
                      <span className="block font-semibold">Languages:</span>
                      <span className="text-slate-500">{dr.languages.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <p className={`grow font-light leading-relaxed pt-2 border-t border-slate-100/30 ${
                  textSize === "extra-large" ? "text-base" : "text-sm text-slate-500"
                }`}>
                  {dr.bio}
                </p>

                {/* Instant Action Book */}
                <a
                  href="#appointments"
                  className={`mt-4 w-full py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 transition-all focus:outline-none ${
                    highContrast 
                      ? "bg-white text-black hover:bg-slate-200" 
                      : "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Consult {dr.name.split(",")[0]}</span>
                </a>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
