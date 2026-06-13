"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/api";

const initialForm = { name: "", phone: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContactForm(form);
      setForm(initialForm);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-white p-8">
      <div className="mb-4.5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-[#1c1f2b]">Your Name</label>
          <input
            type="text"
            required
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange("name")}
            className="rounded-lg border border-border bg-cream px-3.5 py-2.5 text-sm text-[#1c1f2b] outline-none transition-colors focus:border-navy focus:bg-white"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-[#1c1f2b]">Phone Number</label>
          <input
            type="tel"
            placeholder="Your phone number"
            value={form.phone}
            onChange={handleChange("phone")}
            className="rounded-lg border border-border bg-cream px-3.5 py-2.5 text-sm text-[#1c1f2b] outline-none transition-colors focus:border-navy focus:bg-white"
          />
        </div>
      </div>
      <div className="mb-4.5 flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#1c1f2b]">Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange("email")}
          className="rounded-lg border border-border bg-cream px-3.5 py-2.5 text-sm text-[#1c1f2b] outline-none transition-colors focus:border-navy focus:bg-white"
        />
      </div>
      <div className="mb-4.5 flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#1c1f2b]">Subject</label>
        <input
          type="text"
          placeholder="e.g. Admission Enquiry"
          value={form.subject}
          onChange={handleChange("subject")}
          className="rounded-lg border border-border bg-cream px-3.5 py-2.5 text-sm text-[#1c1f2b] outline-none transition-colors focus:border-navy focus:bg-white"
        />
      </div>
      <div className="mb-4.5 flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#1c1f2b]">Message</label>
        <textarea
          placeholder="Write your message here…"
          required
          value={form.message}
          onChange={handleChange("message")}
          className="min-h-[100px] resize-y rounded-lg border border-border bg-cream px-3.5 py-2.5 text-sm text-[#1c1f2b] outline-none transition-colors focus:border-navy focus:bg-white"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-navy py-3.5 text-[14.5px] font-medium text-white transition-colors hover:bg-navy-dk disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {status === "sent" && (
        <p className="mt-3 text-center text-[13.5px] text-green-700">Thank you! Your message has been sent.</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-center text-[13.5px] text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
