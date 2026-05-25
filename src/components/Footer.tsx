import React from "react";
import { useAccessibility } from "../context/AccessibilityContext";
import { Eye, ShieldCheck, HeartPulse, Sparkles, Phone, Mail } from "lucide-react";

export default function Footer() {
  const { highContrast, textSize } = useAccessibility();

  return (
    <footer className={`py-12 border-t transition-colors duration-300 ${
      highContrast 
        ? "bg-black text-white border-white" 
        : "bg-slate-950 text-slate-400 border-slate-800"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className={`p-1.5 rounded-lg ${
                highContrast ? "bg-white text-black" : "bg-blue-600 text-white"
              }`}>
                <Eye className="w-5 h-5" />
              </div>
              <span className={`font-display font-extrabold text-base tracking-tight ${
                highContrast ? "text-white" : "text-white"
              }`}>
                ClearVision Eye
              </span>
            </div>
            
            <p className={`text-xs leading-relaxed font-light ${
              highContrast ? "text-slate-300" : "text-slate-400"
            }`}>
              Providing certified diagnostics, blade-free Wavefront laser corrections, and specialized pediatric evaluations since 2011.
            </p>

            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-500">
              <ShieldCheck className="w-4 h-4" />
              <span>HIPAA Compliant Patient Board</span>
            </div>
          </div>

          {/* Links Quick Col */}
          <div className="space-y-3">
            <h4 className={`font-bold font-mono text-xs uppercase tracking-widest text-slate-300 ${
              highContrast ? "text-white underline" : ""
            }`}>
              Navigations
            </h4>
            <ul className="text-xs space-y-2">
              {[
                { name: "Services Portfolio", href: "#services" },
                { name: "Clinic Leadership", href: "#doctors" },
                { name: "Medical Instruments", href: "#technology" },
                { name: "Reserve Slot Bookings", href: "#appointments" },
                { name: "Patient Testimonials", href: "#testimonials" },
                { name: "FAQ Portal", href: "#faq" }
              ].map((lnk) => (
                <li key={lnk.name}>
                  <a 
                    href={lnk.href} 
                    className={`hover:underline block py-0.5 focus:outline-none ${
                      highContrast ? "text-slate-300 hover:text-white" : "text-slate-500 hover:text-white"
                    }`}
                  >
                    {lnk.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Locations Support */}
          <div className="space-y-3">
            <h4 className={`font-bold font-mono text-xs uppercase tracking-widest text-slate-300 ${
              highContrast ? "text-white underline" : ""
            }`}>
              Clinical Core Address
            </h4>
            <p className="text-xs leading-relaxed font-light">
              ClearVision Boston Flagship <br />
              100 Health Science Parkway <br />
              Suite 300, Floor 4 <br />
              Boston, MA 02115
            </p>
            <div className="text-xs space-y-1 pt-1 font-mono text-slate-400">
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>+1 (800) 555-EYES</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>contact@clearvision.com</span>
              </p>
            </div>
          </div>

          {/* License & Accreditations Badge card */}
          <div className="space-y-4">
            <h4 className={`font-bold font-mono text-xs uppercase tracking-widest text-slate-300 ${
              highContrast ? "text-white underline" : ""
            }`}>
              Accreditations
            </h4>
            
            <div className={`p-4 rounded-xl border text-xs text-slate-400 font-light space-y-2 leading-relaxed ${
              highContrast ? "border-slate-800 bg-slate-950" : "border-slate-800 bg-slate-900/40"
            }`}>
              <p>
                Licensed by the Commonwealth of Massachusetts Department of Public Health.
              </p>
              <p className="text-[10px] text-slate-500">
                Ophthalmic LASIK systems cleared by FDA. Phacoemulsification structures satisfy CE compliance rules.
              </p>
            </div>
          </div>

        </div>

        {/* Separator block */}
        <div className="h-px bg-slate-800 my-8" />

        {/* Copyright notice */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] md:text-xs text-slate-500 gap-4">
          <p>
            &copy; 2026 ClearVision Eye Clinic. All rights and trademark records reserved.
          </p>

          <div className="flex gap-4 font-mono font-medium tracking-wide">
            <a href="#about" className="hover:underline">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#about" className="hover:underline">Patient Rights Guideline</a>
            <span>&bull;</span>
            <a href="#about" className="hover:underline">HIPAA Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
