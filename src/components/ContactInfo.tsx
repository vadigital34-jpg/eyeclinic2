import React from "react";
import { useAccessibility } from "../context/AccessibilityContext";
import { Phone, MessageSquare, Mail, MapPin, Clock, ExternalLink } from "lucide-react";

export default function ContactInfo() {
  const { highContrast, textSize } = useAccessibility();

  const getHeadingSize = () => {
    if (textSize === "extra-large") return "text-3xl sm:text-4xl font-extrabold pb-1";
    if (textSize === "large") return "text-2.5xl sm:text-3xl font-extrabold pb-1";
    return "text-xl sm:text-2.5xl font-extrabold pb-1";
  };

  const contactOptions = [
    {
      title: "Phone Clinic Support",
      value: "+1 (800) 555-EYES",
      detail: "Toll-free, Mon-Sat response",
      href: "tel:+18005553937",
      icon: Phone,
      colorClass: "bg-blue-50 text-blue-600",
      btnText: "Call Hotline"
    },
    {
      title: "WhatsApp Chat Support",
      value: "Reach our Optical Assistant",
      detail: "Live chat with clinical assistants",
      href: "https://wa.me/18005553937",
      icon: MessageSquare,
      colorClass: "bg-emerald-50 text-emerald-600",
      btnText: "Open WhatsApp"
    },
    {
      title: "Clinic Bureau Email",
      value: "contact@clearvision.com",
      detail: "Expected response within 24 hours",
      href: "mailto:contact@clearvision.com",
      icon: Mail,
      colorClass: "bg-purple-50 text-purple-600",
      btnText: "Email Support"
    }
  ];

  return (
    <section 
      id="contact" 
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${
        highContrast ? "bg-black border-white" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className={`text-xs font-bold uppercase tracking-widest font-mono ${
            highContrast ? "text-slate-200" : "text-blue-600"
          }`}>
            Connect With ClearVision
          </span>
          <h2 className={`${getHeadingSize()} ${highContrast ? "text-white" : "text-blue-950 font-display"}`}>
            Contact Our Boston Team Today
          </h2>
          <div className={`h-1 w-20 mx-auto rounded-full ${highContrast ? "bg-white" : "bg-blue-600"}`} />
          <p className={`leading-relaxed ${
            textSize === "extra-large" ? "text-lg text-slate-300" : "text-sm sm:text-base text-slate-500"
          }`}>
            We are here to answer billing inquiries, medical queries, or emergency assistance. Find our channels below.
          </p>
        </div>

        {/* Channels & Map Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Channels Left Block */}
          <div className="lg:col-span-6 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              
              {contactOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <div 
                    key={opt.title}
                    className={`p-5 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                      highContrast 
                        ? "bg-slate-950 border-white text-white" 
                        : "bg-slate-50 border-slate-100 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3.5 rounded-xl h-fit flex-shrink-0 ${
                        highContrast ? "bg-white text-black" : opt.colorClass
                      }`}>
                        <Icon className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <h3 className={`font-bold text-xs uppercase tracking-wider font-mono text-slate-400 mb-0.5`}>
                          {opt.title}
                        </h3>
                        <p className={`font-bold truncate leading-tight ${
                          textSize === "extra-large" ? "text-lg" : "text-sm sm:text-base"
                        } ${highContrast ? "text-white" : "text-blue-950"}`}>
                          {opt.value}
                        </p>
                        <p className="text-xs text-slate-400 font-light mt-0.5">
                          {opt.detail}
                        </p>
                      </div>
                    </div>

                    <a
                      href={opt.href}
                      target="_blank"
                      rel="referrer"
                      className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap uppercase tracking-wider transition-colors focus:outline-none ${
                        highContrast 
                          ? "bg-white text-black hover:bg-slate-200" 
                          : "bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white"
                      }`}
                    >
                      {opt.btnText}
                    </a>
                  </div>
                );
              })}

            </div>

            {/* Hours & Location list */}
            <div className={`p-6 rounded-2xl border grid grid-cols-1 sm:grid-cols-2 gap-6 leading-relaxed ${
              highContrast ? "bg-slate-950 border-white text-white" : "bg-blue-50/20 border-blue-50/50 text-slate-700"
            }`}>
              
              <div>
                <div className="flex items-center gap-2 mb-2 font-bold uppercase text-xs tracking-wider text-slate-400">
                  <Clock className="w-4.5 h-4.5 text-blue-500" />
                  <span>Working Hours</span>
                </div>
                <div className="text-xs sm:text-sm space-y-1.5 font-medium">
                  <p className="flex justify-between">
                    <span>Monday–Friday:</span>
                    <strong className={highContrast ? "text-white" : "text-blue-900"}>8:00 AM – 7:00 PM</strong>
                  </p>
                  <p className="flex justify-between">
                    <span>Saturday:</span>
                    <strong className={highContrast ? "text-white" : "text-blue-900"}>9:00 AM – 4:00 PM</strong>
                  </p>
                  <p className="flex justify-between text-slate-400 font-light">
                    <span>Sunday:</span>
                    <strong className="text-red-500">CLOSED</strong>
                  </p>
                  <div className="h-px bg-slate-200/50 my-1" />
                  <p className="text-[11px] text-red-600 font-extrabold flex items-center gap-1">
                    <span>● Emergency Hotline:</span>
                    <span>24/7 Surgeons on call</span>
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2 font-bold uppercase text-xs tracking-wider text-slate-400">
                  <MapPin className="w-4.5 h-4.5 text-blue-500" />
                  <span>Clinic Location</span>
                </div>
                <div className="text-xs sm:text-sm space-y-1 mt-1">
                  <strong className={`block ${highContrast ? "text-white" : "text-blue-950"}`}>
                    ClearVision Eye Clinic
                  </strong>
                  <p className="font-light text-slate-500">
                    100 Health Science Parkway <br />
                    Suite 300, Floor 4 <br />
                    Boston, MA 02115
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Iframe Map Right Block */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border shadow h-74 sm:h-96 w-full max-w-none">
            <iframe 
              src="https://maps.google.com/maps?q=100%20Health%20Science%20Parkway,%20Boston,%20MA&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 absolute"
              title="ClearVision Boston Eye Clinic Location Pointer"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
