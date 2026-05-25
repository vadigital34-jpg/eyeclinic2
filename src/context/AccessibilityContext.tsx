import React, { createContext, useContext, useState, useEffect } from "react";

interface AccessibilityContextType {
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  textSize: "normal" | "large" | "extra-large";
  setTextSize: (sz: "normal" | "large" | "extra-large") => void;
  toggleHighContrast: () => void;
  increaseTextSize: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<"normal" | "large" | "extra-large">("normal");

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev);
  };

  const increaseTextSize = () => {
    setTextSize((prev) => {
      if (prev === "normal") return "large";
      if (prev === "large") return "extra-large";
      return "normal";
    });
  };

  // Sync classes to body element
  useEffect(() => {
    const body = document.body;
    if (highContrast) {
      body.classList.add("high-contrast-mode");
    } else {
      body.classList.remove("high-contrast-mode");
    }

    body.classList.remove("text-sz-normal", "text-sz-large", "text-sz-extra-large");
    body.classList.add(`text-sz-${textSize}`);
  }, [highContrast, textSize]);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        setHighContrast,
        textSize,
        setTextSize,
        toggleHighContrast,
        increaseTextSize,
      }}
    >
      <div 
        className={`min-h-screen transition-colors duration-300 ${
          highContrast ? "bg-black text-white" : "bg-slate-50 text-slate-900"
        }`}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}
