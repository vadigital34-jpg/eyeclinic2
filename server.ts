import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client on the server side
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API Route for AI Chat Support
  app.post("/api/ai-chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request. 'messages' array is required." });
      }

      if (!ai) {
        return res.json({
          text: "Hi there! I am operating in Education Demo-Mode as the ClearVision AI Assistant. How can I help you today? Please note that for absolute AI accuracy and customized symptoms checking, you can configure the GEMINI_API_KEY in the Secrets panel. How can I help you manage your vision?"
        });
      }

      const systemInstruction = `You are "ClearVision AI Assistant", an advanced, friendly, helpful AI virtual helper for "ClearVision Eye Clinic".
Your goal is to answer patient inquiries about our clinic, doctors, services, standard eye care questions, and vision health.
You are extremely polite, clear, and easy to understand, especially of use for older people or someone with mild visual impairment.

Key Clinic Inquiries info you must represent:
- Services we offer: Complete Eye Exams, Cataract Surgery, LASIK surgery & consultations, Retina Diagnosis, Glaucoma diagnosis and care, and Pediatric Eye Care.
- Doctors:
  1. Dr. Elizabeth Carter, MD, Ophthalmologist (15+ yrs exp, LASIK & Retina specialist, Harvard grad)
  2. Dr. Marcus Vance, MD, Ophthalmologist (12+ yrs exp, Cataract and Glaucoma care, Johns Hopkins grad)
  3. Dr. Sarah Lin, OD, Pediatric Optometrist (8+ yrs exp, Pediatric Eye Care, UC Berkeley grad)
- Contact and Working Hours:
  * Phone: +1 (800) 555-EYES, WhatsApp: +1 (800) 555-EYES, Email: contact@clearvision.com
  * Working Hours: Mon-Fri: 8:00 AM - 7:00 PM, Sat: 9:00 AM - 4:00 PM, Sun: Closed.
  * Location: 100 Health Science Parkway, Suite 300, Boston, MA.
- EMERGENCY: We have a 24/7 emergency care line. Quick emergency number is +1 (800) 555-9911.
If the patient reports sudden vision loss, severe eye pain, physical trauma, or chemical exposure, tell them immediately to call our emergency line or go to the nearest emergency clinic! Do not attempt complex diagnosis.
- Remember to state occasionally that you provide general guidelines, and for precise treatment they should book an appointment with our main experts.
Keep your answers brief, pleasant (max 3-4 sentences/bullets), and use professional formatting with simple markdown if helpful.`;

      const contents = messages.map(msg => {
        return {
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }]
        };
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text || "I apologize, I didn't get that. How can I assist you with your eyes today?" });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: error.message || "An error occurred during AI processing." });
    }
  });

  // Mock slot availability for booking
  app.get("/api/slots", (req, res) => {
    res.json({
      days: [
        { date: "2026-05-26", dayName: "Tuesday", status: "Available" },
        { date: "2026-05-27", dayName: "Wednesday", status: "Available" },
        { date: "2026-05-28", dayName: "Thursday", status: "Available" },
        { date: "2026-05-29", dayName: "Friday", status: "Available" },
        { date: "2026-05-30", dayName: "Saturday", status: "Limited" },
      ],
      hours: ["09:00 AM", "10:30 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:30 PM", "05:30 PM"]
    });
  });

  // Appointment save handler
  app.post("/api/appointments", (req, res) => {
    const { name, email, phone, doctor, service, date, time, notes } = req.body;
    if (!name || !email || !phone || !doctor || !service || !date || !time) {
      return res.status(400).json({ error: "Missing required appointment fields." });
    }
    const appointmentId = "APT-" + Math.floor(100000 + Math.random() * 900000);
    res.json({
      success: true,
      appointmentId,
      message: `Appointment booked successfully with ${doctor} for ${service} on ${date} at ${time}.`,
      details: { name, email, phone, doctor, service, date, time, appointmentId }
    });
  });

  // Emergency request logger
  app.post("/api/emergency-alert", (req, res) => {
    const { name, phone, issue } = req.body;
    const responseId = "EMR-" + Math.floor(1000 + Math.random() * 9000);
    res.json({
      success: true,
      id: responseId,
      message: `Emergency Alert received! Our on-call opthalmic surgeon is notified. We will call you immediately at ${phone}.`
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
