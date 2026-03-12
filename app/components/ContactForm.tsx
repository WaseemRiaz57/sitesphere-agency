"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";
const WHATSAPP_NUMBER = "923155741347";

type FormStatus = "idle" | "submitting" | "success";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    email: "",
    brief: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Step 1: Silently send data to Google Sheets
    const body = new FormData(e.currentTarget as HTMLFormElement);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body,
        mode: "no-cors",
      });
    } catch {
      // no-cors requests are opaque; treat any outcome as sent
    }

    // Step 2: Redirect to WhatsApp with pre-filled message
    const message = [
      "*New Project Inquiry (SiteSphere)*",
      `*Name:* ${formData.name}`,
      `*Org:* ${formData.org || "—"}`,
      `*Email:* ${formData.email}`,
      `*Brief:* ${formData.brief || "—"}`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    // Reset form
    setFormData({ name: "", org: "", email: "", brief: "" });
    setStatus("success");
  };

  return (
    <section className="py-32 bg-sphere-black" id="contact">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-4">
            Architect Your Future
          </h2>
          <p className="text-zinc-500 font-light">
            Initialize the consultation for your digital blueprint.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 mx-auto mb-8 rounded-full border border-sphere-accent flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-sphere-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-3xl mb-4">Inquiry Received</h3>
              <p className="text-zinc-500 font-light max-w-md mx-auto">
                Thank you for reaching out. Our architecture team will review
                your brief and respond within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              onSubmit={handleSubmit}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Name */}
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full bg-transparent border-b border-sphere-border py-4 focus:outline-none focus:border-sphere-accent transition-colors peer placeholder-transparent"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 top-4 text-xs uppercase tracking-[0.2em] text-zinc-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-sphere-accent"
                  >
                    Name
                  </label>
                </div>

                {/* Organization */}
                <div className="relative">
                  <input
                    id="org"
                    name="org"
                    type="text"
                    value={formData.org}
                    onChange={handleChange}
                    placeholder="Organization"
                    className="w-full bg-transparent border-b border-sphere-border py-4 focus:outline-none focus:border-sphere-accent transition-colors peer placeholder-transparent"
                  />
                  <label
                    htmlFor="org"
                    className="absolute left-0 top-4 text-xs uppercase tracking-[0.2em] text-zinc-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-sphere-accent"
                  >
                    Organization
                  </label>
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-sphere-border py-4 focus:outline-none focus:border-sphere-accent transition-colors peer placeholder-transparent"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-4 text-xs uppercase tracking-[0.2em] text-zinc-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-sphere-accent"
                >
                  Email
                </label>
              </div>

              {/* Project Brief */}
              <div className="relative">
                <textarea
                  id="brief"
                  name="brief"
                  value={formData.brief}
                  onChange={handleChange}
                  placeholder="Project Brief"
                  className="w-full bg-transparent border-b border-sphere-border py-4 focus:outline-none focus:border-sphere-accent transition-colors peer placeholder-transparent min-h-[100px] resize-none"
                />
                <label
                  htmlFor="brief"
                  className="absolute left-0 top-4 text-xs uppercase tracking-[0.2em] text-zinc-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-sphere-accent"
                >
                  Project Brief
                </label>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-16 py-4 bg-sphere-accent text-sphere-black font-medium text-sm tracking-widest uppercase hover:opacity-90 transition-all duration-300 ease-out disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-3">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Processing…
                    </span>
                  ) : (
                    "Send Inquiry"
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
