"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, Mail, MessageCircle } from "lucide-react";
import { CONTACT_EMAIL, whatsappHref } from "@/app/lib/site";
import { Button } from "./ui/button";

// Set this to a deployed Google Apps Script URL to also log enquiries to a sheet.
const GOOGLE_SCRIPT_URL = "";

type FormStatus = "idle" | "submitting" | "success";

const fields = [
  { id: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
  { id: "business", label: "Business name", type: "text", required: false, autoComplete: "organization" },
  { id: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { id: "website", label: "Current website, if you have one", type: "text", required: false, autoComplete: "url" },
] as const;

const emptyForm = { name: "", business: "", email: "", website: "", goal: "" };

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [form, setForm] = useState(emptyForm);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    if (GOOGLE_SCRIPT_URL) {
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          body: new FormData(e.currentTarget),
          mode: "no-cors",
        });
      } catch {
        // no-cors requests are opaque; the WhatsApp hand-off below still carries the enquiry
      }
    }

    const message = [
      "*New enquiry from sitesphere.me*",
      `*Name:* ${form.name}`,
      `*Business:* ${form.business || "—"}`,
      `*Email:* ${form.email}`,
      `*Website:* ${form.website || "—"}`,
      `*Goal:* ${form.goal || "—"}`,
    ].join("\n");

    window.open(whatsappHref(message), "_blank");
    setForm(emptyForm);
    setStatus("success");
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ink py-16 text-paper sm:py-32">
      <div className="mx-auto grid grid-cols-1 max-w-[76rem] gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:px-8">
        <div>
          <h2
            id="contact-title"
            className="text-balance text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] font-extrabold tracking-[-0.045em]"
          >
            Book a free strategy call.
          </h2>
          <p className="mt-6 max-w-[30rem] text-pretty text-lg leading-relaxed text-paper/70">
            Tell us about your business. We will review your site, map listing and
            competitors before the call, and come with specific recommendations.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <a
              href={whatsappHref("Hello SiteSphere! I'd like to book a strategy call.")}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-night-line p-4 transition-colors hover:border-paper/40 hover:bg-paper/5"
            >
              <span className="grid size-11 place-items-center rounded-full bg-marigold text-ink">
                <MessageCircle className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-semibold">Message us on WhatsApp</span>
                <span className="block text-sm text-paper/60">Usually answered the same day</span>
              </span>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group flex items-center gap-4 rounded-2xl border border-night-line p-4 transition-colors hover:border-paper/40 hover:bg-paper/5"
            >
              <span className="grid size-11 place-items-center rounded-full bg-paper/10 text-paper">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-semibold">{CONTACT_EMAIL}</span>
                <span className="block text-sm text-paper/60">For proposals and documents</span>
              </span>
            </a>
          </div>
        </div>

        <div className="rounded-[var(--radius-panel)] bg-paper p-6 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:p-10">
          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex min-h-[26rem] flex-col items-start justify-center"
                role="status"
              >
                <span className="grid size-14 place-items-center rounded-full bg-cobalt text-paper">
                  <Check className="size-7" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-3xl font-extrabold tracking-[-0.035em]">Enquiry sent</h3>
                <p className="mt-3 max-w-[26rem] text-ink-soft">
                  WhatsApp opened with your details filled in. Press send there and we
                  will reply with a few times for your call.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 font-semibold text-cobalt underline decoration-cobalt/30 underline-offset-4 hover:decoration-cobalt"
                >
                  Send another enquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {fields.map((f) => (
                    <label key={f.id} className="flex flex-col gap-2 text-sm font-semibold">
                      <span>
                        {f.label}
                        {!f.required && <span className="font-normal text-ink-faint"> (optional)</span>}
                      </span>
                      <input
                        name={f.id}
                        type={f.type}
                        required={f.required}
                        autoComplete={f.autoComplete}
                        value={form[f.id]}
                        onChange={update}
                        className="h-12 rounded-xl border border-line bg-card px-4 text-base font-normal text-ink transition-[border-color,box-shadow] outline-none placeholder:text-ink-faint focus:border-cobalt focus:shadow-[0_0_0_4px_var(--color-cobalt-wash)]"
                      />
                    </label>
                  ))}
                </div>
                <label className="flex flex-col gap-2 text-sm font-semibold">
                  What would you like more of?
                  <textarea
                    name="goal"
                    rows={4}
                    value={form.goal}
                    onChange={update}
                    placeholder="For example: more appointment bookings from people in DHA and Gulberg"
                    className="resize-none rounded-xl border border-line bg-card px-4 py-3 text-base font-normal text-ink transition-[border-color,box-shadow] outline-none placeholder:text-ink-faint focus:border-cobalt focus:shadow-[0_0_0_4px_var(--color-cobalt-wash)]"
                  />
                </label>
                <Button type="submit" size="lg" disabled={status === "submitting"} className="mt-2 w-full sm:w-auto sm:self-start">
                  {status === "submitting" && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                  {status === "submitting" ? "Sending…" : "Send enquiry"}
                </Button>
                <p className="text-sm text-ink-faint">
                  Sending opens WhatsApp with your details filled in.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
