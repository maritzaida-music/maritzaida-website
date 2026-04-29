"use client";

import Image from "next/image";
import { useLang } from "@/components/LanguageContext";

const EMAIL = "amador.weibe@gmail.com";

export default function ContactContent() {
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
            {t("contact.label")}
          </p>
          <h1
            className="text-5xl md:text-7xl"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontWeight: 300 }}
          >
            {t("contact.heading")}
          </h1>
          <span className="divider-gold" />
          <p className="text-base max-w-xl" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
            {t("contact.sub")}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Inquiry types */}
          <div>
            <h2 className="text-3xl mb-6" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
              {t("contact.bookings")}
            </h2>
            <span className="divider-gold" />
            <div className="space-y-8 mt-2">
              {[
                { heading: t("contact.concerts.heading"), body: t("contact.concerts.body") },
                { heading: t("contact.press.heading"), body: t("contact.press.body") },
              ].map(({ heading, body }) => (
                <div key={heading}>
                  <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
                    {heading}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Email CTA + socials */}
          <div className="flex flex-col gap-10">
            {/* Email block */}
            <div className="p-8 border" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
              <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
                {t("contact.email.label")}
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
                {t("contact.email.prompt")}
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="block text-center py-4 text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-90"
                style={{ background: "var(--gold)", color: "var(--bg)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
              >
                {EMAIL}
              </a>
            </div>

            {/* Socials */}
            <div>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
                {t("contact.follow")}
              </p>
              <div className="flex flex-col">
                {[
                  { label: "Instagram", handle: "@maritzaidamusic", href: "https://www.instagram.com/maritzaidamusic" },
                  { label: "Facebook", handle: "@maritzaidamusic", href: "https://www.facebook.com/maritzaidamusic" },
                  { label: "Spotify", handle: "Maritzaida", href: "https://open.spotify.com/artist/4KjyjfCyhO5cxqbSI76WMb" },
                  { label: "YouTube", handle: "Maritzaida", href: "https://www.youtube.com/channel/UC_6FCmXCV-uzcypmvcaD8MA" },
                ].map(({ label, handle, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-4 border-b group"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div>
                      <p className="text-xs tracking-widest uppercase" style={{ color: "var(--text-dim)" }}>{label}</p>
                      <p className="text-sm" style={{ color: "var(--text-primary)" }}>{handle}</p>
                    </div>
                    <span className="text-sm group-hover:translate-x-1 transition-transform" style={{ color: "var(--gold)" }}>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
