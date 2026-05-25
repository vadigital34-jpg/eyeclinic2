/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import AboutClinic from "./components/AboutClinic";
import ServicesList from "./components/ServicesList";
import DoctorsList from "./components/DoctorsList";
import TechnologyShowcase from "./components/TechnologyShowcase";
import AppointmentForm from "./components/AppointmentForm";
import VisionWellness from "./components/VisionWellness";
import TestimonialsGrid from "./components/TestimonialsGrid";
import EmergencyAlert from "./components/EmergencyAlert";
import FaqAccordion from "./components/FaqAccordion";
import ContactInfo from "./components/ContactInfo";
import FloatingChatbot from "./components/FloatingChatbot";
import Footer from "./components/Footer";

export default function App() {
  return (
    <AccessibilityProvider>
      {/* Sticky Top Header elements & accessibility ribbon */}
      <Navbar />

      <main className="relative">
        {/* Module 1: Welcoming Home Hero */}
        <HomeHero />

        {/* Module 2: Corporate About section mapping six points */}
        <AboutClinic />

        {/* Module 3: Dynamic Grid Cards of 6 services */}
        <ServicesList />

        {/* Module 4: Professional specialized profiles of clinical crew */}
        <DoctorsList />

        {/* Module 5: Diagnostic high-precision hardware presentation */}
        <TechnologyShowcase />

        {/* Module 6: Slots-reactive booking registration form */}
        <AppointmentForm />

        {/* Module 7: Core Vision Wellness (Tips & blogs preview) */}
        <VisionWellness />

        {/* Module 8: Five Star Patient testimonials cards */}
        <TestimonialsGrid />

        {/* Module 9: Critical Emergency warnings + callback hotline */}
        <EmergencyAlert />

        {/* Module 10: Structural Clinical FAQ Accordion */}
        <FaqAccordion />

        {/* Module 11: Real Maps pointers & WhatsApp chat portals */}
        <ContactInfo />
      </main>

      {/* Floating AI Consultation Support Helper Widget */}
      <FloatingChatbot />

      {/* Corporate compliant Medical Footer details */}
      <Footer />
    </AccessibilityProvider>
  );
}
