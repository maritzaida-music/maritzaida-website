"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Concert Booking",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--bg-elevated)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-inter)",
    fontSize: "0.875rem",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--text-dim)",
    marginBottom: "0.5rem",
    fontFamily: "var(--font-inter)",
  };

  if (status === "success") {
    return (
      <div
        className="p-10 border text-center"
        style={{ borderColor: "var(--gold)", background: "var(--bg-card)" }}
      >
        <p className="text-3xl mb-3" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
          Message Received
        </p>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Thank you for reaching out. We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-8"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      noValidate
    >
      <h2 className="text-2xl" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
        Send a Message
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" style={labelStyle}>Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" style={labelStyle}>Subject</label>
        <select
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          style={{ ...inputStyle, cursor: "pointer" }}
        >
          <option>Concert Booking</option>
          <option>Private Event</option>
          <option>Press / Media Inquiry</option>
          <option>General Inquiry</option>
          <option>Fan Message</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          style={{ ...inputStyle, resize: "vertical" }}
          placeholder="Tell us about your event, inquiry, or just say hello..."
        />
      </div>

      {status === "error" && (
        <p className="text-xs" style={{ color: "#e05555" }}>
          Something went wrong. Please try again or reach out via Instagram.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 text-xs tracking-widest uppercase font-medium transition-all duration-300 disabled:opacity-50"
        style={{
          background: "var(--gold)",
          color: "var(--bg)",
          letterSpacing: "0.2em",
          fontFamily: "var(--font-inter)",
          cursor: status === "loading" ? "not-allowed" : "pointer",
        }}
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
