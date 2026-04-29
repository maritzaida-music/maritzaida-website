"use client";

import Image from "next/image";
import { useLang } from "@/components/LanguageContext";

export default function ShowsContent() {
  const { t } = useLang();

  return (
    <>
      {/* Page header */}
      <div className="relative pt-32 pb-24 overflow-hidden" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="absolute inset-0">
          <Image
            src="/photos/20250828-SSP05607.jpg"
            alt="Maritzaida performing live"
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(13,11,9,0.92) 40%, rgba(13,11,9,0.5) 100%)" }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
            {t("shows.label")}
          </p>
          <h1
            className="text-5xl md:text-7xl"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontWeight: 300 }}
          >
            {t("shows.heading")}
          </h1>
          <span className="divider-gold" />
          <p className="text-base max-w-xl" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
            {t("shows.sub")}
          </p>
        </div>
      </div>

      {/* No upcoming shows */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center" aria-label="Upcoming shows">
        <p className="text-base tracking-widest uppercase" style={{ color: "var(--text-dim)", fontFamily: "var(--font-inter)", letterSpacing: "0.2em" }}>
          No Upcoming Concerts
        </p>
      </section>

      {/* Booking CTA */}
      <div className="py-16" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
              {t("shows.booking.label")}
            </p>
            <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
              {t("shows.booking.heading")}
            </h2>
            <span className="divider-gold" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
              {t("shows.booking.body")}
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 text-xs tracking-widest uppercase font-medium"
              style={{ background: "var(--gold)", color: "var(--bg)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
            >
              {t("shows.booking.cta")}
            </a>
          </div>
          <div className="text-sm space-y-4" style={{ color: "var(--text-muted)" }}>
            {[
              t("shows.type.concert"),
              t("shows.type.festival"),
              t("shows.type.education"),
            ].map((label) => (
              <div key={label} className="flex gap-4 items-center">
                <span className="text-xs" style={{ color: "var(--gold)" }}>◆</span>
                <p className="font-medium" style={{ color: "var(--text-primary)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
