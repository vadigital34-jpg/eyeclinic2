import React, { useState, useEffect } from "react";
import { useAccessibility } from "../context/AccessibilityContext";
import { SERVICES, DOCTORS } from "../data";
import { Calendar, Clock, CheckCircle, ShieldAlert, AlertCircle, Loader2 } from "lucide-react";

export default function AppointmentForm() {
  const { highContrast, textSize } = useAccessibility();

  // Form Fields State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: DOCTORS[0].name,
    service: SERVICES[0].title,
    date: "",
    time: "",
    notes: ""
  });

  // Slot states fetched from API
  const [slotData, setSlotData] = useState<{
    days: Array<{ date: string; dayName: string; status: string }>;
    hours: string[];
  } | null>(null);

  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);
  const [successResponse, setSuccessResponse] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch mock slot availability on component load
  useEffect(() => {
    async function fetchSlots() {
      setLoadingSlots(true);
      try {
        const response = await fetch("/api/slots");
        if (response.ok) {
          const data = await response.json();
          setSlotData(data);
          // Set defaults if data returned
          if (data.days && data.days.length > 0) {
            setFormData(prev => ({ 
              ...prev, 
              date: data.days[0].date,
              time: data.hours[0] || ""
            }));
          }
        }
      } catch (err) {
        console.error("Failed to load clinical availability slots", err);
      } finally {
        setLoadingSlots(false);
      }
    }
    fetchSlots();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date: string) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessResponse(null);

    // Simple validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage("Please complete all required fields (Name, Email, and Phone number).");
      return;
    }

    setBooking(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const data = await response.json();
        setSuccessResponse(data);
        // Reset non-crucial parts
        setFormData({
          name: "",
          email: "",
          phone: "",
          doctor: DOCTORS[0].name,
          service: SERVICES[0].title,
          date: slotData?.days[0]?.date || "",
          time: slotData?.hours[0] || "",
          notes: ""
        });
      } else {
        const err = await response.json();
        setErrorMessage(err.error || "A booking error occurred. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Network connection timed out. Please check your system connection.");
    } finally {
      setBooking(false);
    }
  };

  const getHeadingSize = () => {
    if (textSize === "extra-large") return "text-3xl sm:text-4xl font-extrabold";
    if (textSize === "large") return "text-2.5xl sm:text-3xl font-extrabold";
    return "text-xl sm:text-2.5xl font-extrabold";
  };

  return (
    <section 
      id="appointments" 
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${
        highContrast ? "bg-black border-white" : "bg-white"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className={`text-xs font-bold uppercase tracking-widest font-mono ${
            highContrast ? "text-slate-200" : "text-blue-600"
          }`}>
            Patient Board
          </span>
          <h2 className={`${getHeadingSize()} ${highContrast ? "text-white" : "text-blue-950 font-display"}`}>
            Secure Clinic Appointment Booking
          </h2>
          <div className={`h-1 w-20 mx-auto rounded-full ${highContrast ? "bg-white" : "bg-blue-600"}`} />
          <p className={`leading-relaxed ${
            textSize === "extra-large" ? "text-lg text-slate-300" : "text-sm text-slate-500"
          }`}>
            Fill out this quick form. Our receptionist reviews submissions instantly to verify insurance credentials.
          </p>
        </div>

        {/* Success Alert Banner */}
        {successResponse && (
          <div className={`mb-8 p-6 rounded-2xl border flex flex-col md:flex-row gap-4 items-start md:items-center ${
            highContrast ? "bg-black border-white text-white" : "bg-emerald-50 border-emerald-200 text-slate-800"
          }`}>
            <div className="p-3 bg-emerald-500 rounded-xl text-white">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-wide text-emerald-700">
                Ocular Appointment Reserved successfully!
              </h3>
              <p className="text-sm pt-1 leading-relaxed">
                Your scheduling code is <strong className="font-mono text-emerald-800">{successResponse.appointmentId}</strong>. A confirmation code has been dispatched to {successResponse.details.email}.
              </p>
              <div className="mt-2 text-xs text-slate-500 font-mono">
                Doctor: {successResponse.details.doctor} | Time: {successResponse.details.date} at {successResponse.details.time}
              </div>
            </div>
          </div>
        )}

        {/* Error message card */}
        {errorMessage && (
          <div className="mb-8 p-4 rounded-xl border border-red-300 bg-red-50 text-red-700 flex gap-2 items-center text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-semibold">{errorMessage}</p>
          </div>
        )}

        {/* Form panel container */}
        <div className={`rounded-3xl border p-6 sm:p-10 transition-colors duration-200 shadow-lg ${
          highContrast ? "bg-black border-2 border-white text-white" : "bg-slate-50 border-slate-100 shadow-slate-200/45"
        }`}>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name field */}
              <div>
                <label className={`block mb-1.5 font-bold ${textSize === "extra-large" ? "text-lg" : "text-sm"}`} htmlFor="name">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className={`w-full py-3 px-4 rounded-xl border transition-all focus:outline-none ${
                    highContrast 
                      ? "bg-black border-white text-white focus:ring-2 focus:ring-slate-300"
                      : "bg-white border-slate-300 focus:border-blue-500 text-slate-900"
                  }`}
                  required
                />
              </div>

              {/* Phone contact */}
              <div>
                <label className={`block mb-1.5 font-bold ${textSize === "extra-large" ? "text-lg" : "text-sm"}`} htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +1 (555) 019-2834"
                  className={`w-full py-3 px-4 rounded-xl border transition-all focus:outline-none ${
                    highContrast 
                      ? "bg-black border-white text-white focus:ring-2 focus:ring-slate-300"
                      : "bg-white border-slate-300 focus:border-blue-500 text-slate-900"
                  }`}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email profile */}
              <div>
                <label className={`block mb-1.5 font-bold ${textSize === "extra-large" ? "text-lg" : "text-sm"}`} htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. name@address.com"
                  className={`w-full py-3 px-4 rounded-xl border transition-all focus:outline-none ${
                    highContrast 
                      ? "bg-black border-white text-white focus:ring-2 focus:ring-slate-300"
                      : "bg-white border-slate-300 focus:border-blue-500 text-slate-900"
                  }`}
                  required
                />
              </div>

              {/* Doctor Dropdown */}
              <div>
                <label className={`block mb-1.5 font-bold ${textSize === "extra-large" ? "text-lg" : "text-sm"}`} htmlFor="doctor">
                  Choose Medical Specialist
                </label>
                <select
                  id="doctor"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className={`w-full py-3 px-4 rounded-xl border transition-all focus:outline-none ${
                    highContrast 
                      ? "bg-black border-white text-white focus:ring-2 focus:ring-slate-300"
                      : "bg-white border-slate-300 focus:border-blue-500 text-slate-900"
                  }`}
                >
                  {DOCTORS.map(dr => (
                    <option key={dr.id} value={dr.name}>
                      {dr.name} - {dr.title.split(" & ")[0]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className={`block mb-1.5 font-bold ${textSize === "extra-large" ? "text-lg" : "text-sm"}`} htmlFor="service">
                Requested Clinical Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`w-full py-3 px-4 rounded-xl border transition-all focus:outline-none ${
                  highContrast 
                    ? "bg-black border-white text-white focus:ring-2 focus:ring-slate-300"
                    : "bg-white border-slate-300 focus:border-blue-500 text-slate-900"
                }`}
              >
                {SERVICES.map(srv => (
                  <option key={srv.id} value={srv.title}>{srv.title}</option>
                ))}
              </select>
            </div>

            {/* Availability Slots selectors */}
            <div className="space-y-4">
              <label className={`block font-bold leading-none ${textSize === "extra-large" ? "text-lg" : "text-sm"}`}>
                Select Consult Date
              </label>
              {loadingSlots ? (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Loading clinic slots...</span>
                </div>
              ) : slotData ? (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {slotData.days.map((day) => {
                    const isSelected = formData.date === day.date;
                    return (
                      <button
                        key={day.date}
                        type="button"
                        onClick={() => handleDateSelect(day.date)}
                        className={`p-3 rounded-xl border transition-all text-left focus:outline-none ${
                          isSelected
                            ? highContrast 
                              ? "bg-white text-black border-white font-bold"
                              : "bg-blue-600 border-blue-600 text-white"
                            : highContrast
                              ? "border-white hover:bg-slate-900 text-white"
                              : "border-slate-200 bg-white hover:border-slate-300 text-slate-800"
                        }`}
                      >
                        <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold leading-none">
                          {day.dayName}
                        </span>
                        <span className="block font-bold text-sm pt-1 whitespace-nowrap">
                          {day.date.split("-")[1]}/{day.date.split("-")[2]}
                        </span>
                        <span className={`block text-[9px] mt-1 uppercase font-semibold leading-none ${
                          day.status === "Available" ? "text-emerald-500" : "text-amber-500"
                        }`}>
                          {day.status}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {/* Time slot selector */}
            <div className="space-y-4">
              <label className={`block font-bold leading-none ${textSize === "extra-large" ? "text-lg" : "text-sm"}`}>
                Choose Available Time Indicator
              </label>
              {slotData && (
                <div className="flex flex-wrap gap-2">
                  {slotData.hours.map((hour) => {
                    const isSelected = formData.time === hour;
                    return (
                      <button
                        key={hour}
                        type="button"
                        onClick={() => handleTimeSelect(hour)}
                        className={`py-2 px-3.5 rounded-lg border text-xs font-semibold focus:outline-none transition-all ${
                          isSelected
                            ? highContrast
                              ? "bg-white text-black border-white"
                              : "bg-blue-600 text-white border-blue-600 shadow"
                            : highContrast
                              ? "border-white bg-black hover:bg-slate-900 text-white"
                              : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        {hour}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Extra Comments */}
            <div>
              <label className={`block mb-1.5 font-bold ${textSize === "extra-large" ? "text-lg" : "text-sm"}`} htmlFor="notes">
                Notes or Ocular Sensation (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Mention glasses prescriptions, underlying dry-eye issues, or pediatric age comments..."
                rows={3}
                className={`w-full py-3 px-4 rounded-xl border transition-all focus:outline-none ${
                  highContrast 
                    ? "bg-black border-white text-white focus:ring-2 focus:ring-slate-300"
                    : "bg-white border-slate-300 focus:border-blue-500 text-slate-900"
                }`}
              />
            </div>

            {/* Submit Reservation button */}
            <button
              type="submit"
              disabled={booking}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:-translate-y-0.5 active:translate-y-0 ${
                highContrast 
                  ? "bg-white text-black hover:bg-slate-200" 
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/10"
              }`}
            >
              {booking ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing Appointment Registry...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  <span>Confirm Clinic Booking Slots</span>
                </>
              )}
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}
