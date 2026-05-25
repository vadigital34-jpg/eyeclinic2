import React, { useState } from "react";
import { useAccessibility } from "../context/AccessibilityContext";
import { Phone, AlertTriangle, ShieldCheck, Mail, Loader2, Send } from "lucide-react";

export default function EmergencyAlert() {
  const { highContrast, textSize } = useAccessibility();

  // Callback form simulation states
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackIssue, setCallbackIssue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim() || !callbackName.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/emergency-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: callbackName,
          phone: callbackPhone,
          issue: callbackIssue
        })
      });
      if (response.ok) {
        const data = await response.json();
        setAlertSuccess(data.message);
        setCallbackName("");
        setCallbackPhone("");
        setCallbackIssue("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const getHeadingSize = () => {
    if (textSize === "extra-large") return "text-3xl sm:text-4xl font-extrabold pb-2";
    if (textSize === "large") return "text-2.5xl sm:text-3xl font-extrabold pb-1";
    return "text-2xl sm:text-2.5xl font-extrabold pb-1";
  };

  return (
    <section 
      id="emergency" 
      className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${
        highContrast ? "bg-black border-white" : "bg-slate-50/70 border-slate-100"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Emergency Warning & Phone Segment */}
          <div className="lg:col-span-6 space-y-6">
            <div className={`p-2.5 rounded-xl w-fit flex items-center gap-2 font-mono text-xs uppercase font-extrabold tracking-widest ${
              highContrast ? "bg-white text-black" : "bg-red-100 text-red-700"
            }`}>
              <AlertTriangle className="w-4 h-4" />
              <span>Ophthalmic Trauma Warns</span>
            </div>

            <h2 className={`${getHeadingSize()} ${highContrast ? "text-white" : "text-red-600 font-display"}`}>
              Ocular Emergency? <br />
              Action is Time-Sensitive.
            </h2>

            <p className={`leading-relaxed ${
              textSize === "extra-large" ? "text-lg text-slate-300" : "text-sm sm:text-base text-slate-600"
            }`}>
              If you or a loved one is experiencing <strong>sudden eyesight loss</strong>, severe direct ocular trauma, sharp persistent eye pain, or active visual chemical exposure, do not delay. 
            </p>

            {/* Core Emergency Call Box */}
            <div className={`p-6 rounded-2xl border text-center ${
              highContrast ? "bg-black border-red-500 text-white" : "bg-white border-slate-150 shadow-sm text-slate-800"
            }`}>
              <span className="block text-xs uppercase tracking-wider text-red-500 font-mono font-bold mb-2">
                24/7 Priority Emergency Clinical Line
              </span>
              
              <a 
                href="tel:+18005559911"
                className="inline-flex items-center gap-4 text-2xl sm:text-3.5xl font-black font-mono text-red-700 hover:text-red-950 focus:outline-none focus:ring-4 focus:ring-red-100 p-2.5 rounded-xl transition-all"
                aria-label="Call Emergency Line 1-800-555-9911"
              >
                <Phone className="w-8 h-8 fill-current text-red-600 animate-bounce" />
                <span>+1 (800) 555-9911</span>
              </a>

              <p className="text-xs text-slate-400 font-light mt-3">
                On-call ophthalmic surgeons are dispatched automatically for trauma triage.
              </p>
            </div>

            {/* Quick self-guide checklist */}
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span><strong>Chemical Split:</strong> Flush with neutral clean water for 15+ minutes immediately.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span><strong>Physical Impact:</strong> Do not rub or apply direct local membrane pressure.</span>
              </li>
            </ul>

          </div>

          {/* Callback requested form for minor issues */}
          <div className="lg:col-span-6">
            <div className={`p-6 sm:p-8 rounded-3xl border ${
              highContrast ? "bg-black border-2 border-white text-white" : "bg-white border-slate-100 shadow-md text-slate-800"
            }`}>
              <h3 className={`font-bold mb-4 ${
                textSize === "extra-large" ? "text-xl" : "text-base sm:text-lg"
              } ${highContrast ? "text-white" : "text-blue-950"}`}>
                Request Immediate Call Back
              </h3>

              <p className="text-xs text-slate-500 leading-normal mb-5 font-light">
                Not a chemical trauma but have an urgent visual comfort worry? Drop your contact name and our on-call specialist will phone you back in under 15 minutes.
              </p>

              {alertSuccess ? (
                <div className={`p-4 rounded-xl border text-sm flex gap-2 items-center leading-relaxed ${
                  highContrast ? "bg-slate-900 border-white text-white" : "bg-green-50 border-green-200 text-slate-700 font-semibold"
                }`}>
                  <ShieldCheck className="w-5 h-5 flex-shrink-0 text-green-500" />
                  <p>{alertSuccess}</p>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name (required)"
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      className={`w-full py-2.5 px-3.5 rounded-xl text-xs border focus:outline-none ${
                        highContrast ? "bg-black border-white text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Recall Phone Number (required)"
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      className={`w-full py-2.5 px-3.5 rounded-xl text-xs border focus:outline-none ${
                        highContrast ? "bg-black border-white text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Sensation/Condition (e.g. sharp blur, dry burning, red optics)"
                      value={callbackIssue}
                      onChange={(e) => setCallbackIssue(e.target.value)}
                      className={`w-full py-2.5 px-3.5 rounded-xl text-xs border focus:outline-none ${
                        highContrast ? "bg-black border-white text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      highContrast 
                        ? "bg-white text-black hover:bg-slate-200" 
                        : "bg-red-600 text-white hover:bg-red-700 shadow shadow-red-500/10"
                    }`}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Notifying Specialist Surgeon...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4.5 h-4.5" />
                        <span>Alert Surgeon For Callback</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
