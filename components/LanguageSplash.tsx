"use client";

import { useState, useEffect } from "react";
import { useLang, type Lang } from "./LanguageContext";

export default function LanguageSplash() {
  const { setLang } = useLang();
  const [visible, setVisible] = useState(false);
  const [chosen, setChosen] = useState<Lang | null>(null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("maritzaida-lang");
    if (!stored) {
      // Small delay so the page behind it has a moment to paint
      const t = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(t);
    }
  }, []);

  const choose = (l: Lang) => {
    setChosen(l);
    setLang(l);
    setLeaving(true);
    setTimeout(() => setVisible(false), 500);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: "rgba(13, 11, 9, 0.97)",
        backdropFilter: "blur(8px)",
        opacity: leaving ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Language selection"
    >
      {/* Wordmark */}
      <p
        className="text-4xl tracking-widest uppercase mb-2"
        style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
      >
        Maritzaida
      </p>
      <p
        className="text-xs tracking-[0.3em] uppercase mb-16"
        style={{ color: "var(--text-dim)", letterSpacing: "0.25em" }}
      >
        Música Bohemia &amp; Bolero
      </p>

      <p
        className="text-sm tracking-widest uppercase mb-8"
        style={{ color: "var(--text-muted)", letterSpacing: "0.2em" }}
      >
        Choose your language / Elige tu idioma
      </p>

      <div className="flex gap-6">
        {(["en", "es"] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => choose(l)}
            className="px-10 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300"
            style={{
              border: `1px solid ${chosen === l ? "var(--gold)" : "var(--border)"}`,
              color: chosen === l ? "var(--bg)" : "var(--text-muted)",
              background: chosen === l ? "var(--gold)" : "transparent",
              letterSpacing: "0.15em",
              fontFamily: "var(--font-inter)",
              minWidth: "140px",
            }}
          >
            {l === "en" ? "English" : "Español"}
          </button>
        ))}
      </div>

      {/* Gold line accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, var(--gold-muted), transparent)" }}
        aria-hidden="true"
      />
    </div>
  );
}
