import React, { useState } from "react";
import { useAccessibility } from "../context/AccessibilityContext";
import { Eye, Phone, HelpCircle, Menu, X, Landmark, Activity, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { highContrast, toggleHighContrast, textSize, increaseTextSize } = useAccessibility();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Doctors", href: "#doctors" },
    { name: "Technology", href: "#technology" },
    { name: "Appointments", href: "#appointments" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" }
  ];

  const getNavTextSizeClass = () => {
    if (textSize === "extra-large") return "text-lg font-bold";
    if (textSize === "large") return "text-base font-semibold";
    return "text-sm font-medium";
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-shadow duration-200">
      {/* Top emergency announcement bar */}
      <div className={`py-2 px-4 text-center transition-colors duration-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 ${
        highContrast 
          ? "bg-red-600 text-white border-b border-white"
          : "bg-red-50 text-red-700 border-b border-red-100"
      }`}>
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
        <span className="font-bold">Ocular Emergency Check?</span> 
        <span>Call our 24/7 Surgeon Line directly:</span>
        <a 
          href="tel:+18005559911" 
          className="underline hover:text-red-900 focus:ring-2 focus:ring-red-500 font-extrabold px-1"
        >
          +1 (800) 555-9911
        </a>
      </div>

      {/* Main sticky navigation banner */}
      <nav className={`py-4 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${
        highContrast 
          ? "bg-black text-white border-white" 
          : "bg-white/95 backdrop-blur-md text-slate-900 border-slate-100 shadow-sm"
      }`} id="nav-navbar-main">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand/Logo block */}
          <a href="#home" className="flex items-center gap-3 group focus:outline-none" aria-label="ClearVision Brand Link">
            <div className={`p-2 rounded-xl transition-colors ${
              highContrast ? "bg-white text-black" : "bg-blue-600 text-white"
            }`}>
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <span className={`block font-display font-extrabold tracking-tight leading-none text-lg sm:text-xl ${
                highContrast ? "text-white" : "text-blue-900"
              }`}>
                ClearVision
              </span>
              <span className="block text-[10px] tracking-widest font-mono uppercase text-sky-500 font-bold">
                Eye Clinic
              </span>
            </div>
          </a>

          {/* Desktop Links Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`transition-colors py-1.5 px-1 hover:text-cyan-500 focus:outline-none ${getNavTextSizeClass()} ${
                    highContrast ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-blue-700"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Accessibility Buttons Box */}
            <div className="h-6 w-px bg-slate-300/40" />

            <div className="flex items-center gap-3">
              {/* Toggle text scale */}
              <button
                onClick={increaseTextSize}
                className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all focus:outline-none ${
                  highContrast 
                    ? "border-white bg-slate-900 text-white hover:bg-white hover:text-black" 
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-blue-700"
                }`}
                title={`Change Text Size. Current: ${textSize}`}
                aria-label="Toggle Font Magnification"
              >
                <span className="font-mono text-sm leading-none">A</span>
                <span className="text-[10px] uppercase tracking-wider font-bold">
                  {textSize === "normal" && "Normal"}
                  {textSize === "large" && "Large"}
                  {textSize === "extra-large" && "Max Size"}
                </span>
              </button>

              {/* Toggle high contrast */}
              <button
                onClick={toggleHighContrast}
                className={`p-2 rounded-lg border transition-all focus:outline-none ${
                  highContrast 
                    ? "border-yellow-400 bg-slate-900 text-yellow-400 hover:bg-yellow-400 hover:text-black" 
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-blue-700"
                }`}
                title="Toggle High Contrast for Readability"
                aria-label="Toggle Contrast Senses"
              >
                {highContrast ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Quick Call Button */}
              <a
                href="#appointments"
                className={`py-2 px-4 rounded-lg font-bold text-xs tracking-wider uppercase transition-colors focus:outline-none ${
                  highContrast 
                    ? "bg-white text-black hover:bg-slate-200" 
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Book
              </a>
            </div>
          </div>

          {/* Mobile accessibility & menu handlers */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={increaseTextSize}
              className={`p-1.5 rounded-lg border text-xs font-semibold focus:outline-none ${
                highContrast ? "border-white bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              A+
            </button>
            <button
              onClick={toggleHighContrast}
              className={`p-1.5 rounded-lg border focus:outline-none ${
                highContrast ? "border-yellow-400 text-yellow-400" : "border-slate-200 text-slate-700"
              }`}
            >
              {highContrast ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-lg border focus:outline-none ${
                highContrast ? "border-white text-white" : "border-slate-200 text-slate-800"
              }`}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile menu expanded container */}
        {mobileMenuOpen && (
          <div className={`mt-4 pt-4 border-t lg:hidden flex flex-col gap-3 transition-colors duration-200 ${
            highContrast ? "border-white bg-black" : "border-slate-100 bg-white"
          }`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg block font-medium hover:pl-5 transition-all focus:outline-none ${
                  highContrast 
                    ? "text-slate-300 hover:text-white hover:bg-slate-900" 
                    : "text-slate-700 hover:text-blue-700 hover:bg-blue-50"
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="h-px bg-slate-200 my-1" />
            <a
              href="tel:+18005559911"
              className="py-2.5 px-3 rounded-lg font-bold text-center bg-red-600 text-white flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> Emergency Contact
            </a>
            <a
              href="#appointments"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2.5 px-3 rounded-lg font-bold text-center text-white ${
                highContrast ? "bg-slate-700 hover:bg-slate-600" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Book Appointment
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
