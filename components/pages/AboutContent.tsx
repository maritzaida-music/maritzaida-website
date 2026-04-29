"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/components/LanguageContext";

const personJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Maritzaida",
    jobTitle: "Vocalist",
    description:
      "Puerto Rican vocalist dedicated to música bohemia and bolero, preserving the legacy of composer Sylvia Rexach and guitarist Tutti Umpierre.",
    nationality: { "@type": "Country", name: "Puerto Rico" },
    url: "https://www.maritzaida.com",
    sameAs: [
      "https://www.instagram.com/maritzaidamusic",
      "https://www.facebook.com/maritzaidamusic",
      "https://open.spotify.com/artist/4KjyjfCyhO5cxqbSI76WMb",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "AJ Weibe",
    jobTitle: "Guitarist and Producer",
    description:
      "Guitarist, producer, and musical partner of Maritzaida. Specializes in interpreting the guitar style of Tutti Umpierre.",
  },
];

export default function AboutContent() {
  const { t } = useLang();

  const milestones = [
    {
      year: "2023",
      event: "Boleros Clásicos Volumen I & II",
      desc: t("about.milestone.boleros.desc"),
    },
    {
      year: "2024",
      event: "Alma Adentro",
      desc: t("about.milestone.alma.desc"),
      highlight: true,
    },
    {
      year: "2025",
      event: "Sentimientos En Vivo",
      desc: t("about.milestone.sentimientos.desc"),
    },
    {
      year: "2025",
      event: "El Otro Camino EP",
      desc: t("about.milestone.otrocamino.desc"),
    },
    {
      year: "2025",
      event: "Radio Bohemia Volumen I",
      desc: t("about.milestone.radiobohemia.desc"),
      highlight: true,
    },
    {
      year: "2026",
      event: "Una Noche (En Vivo)",
      desc: t("about.milestone.unanoche.desc"),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

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
            {t("about.label")}
          </p>
          <h1
            className="text-5xl md:text-7xl"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontWeight: 300 }}
          >
            {t("about.heading")}
          </h1>
          <span className="divider-gold" />
        </div>
      </div>

      {/* Main bio */}
      <section className="max-w-7xl mx-auto px-6 py-16" aria-labelledby="bio-heading">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-16 items-start">
          <div>
            <h2 id="bio-heading" className="text-4xl md:text-5xl mb-6 leading-tight" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
              {t("about.bio.heading")}
            </h2>
            <span className="divider-gold" />
            <div className="space-y-5 text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
              <p>{t("about.bio.p1")}</p>
              <p>{t("about.bio.p2")}</p>
              <p>{t("about.bio.p3")}</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="img-zoom relative aspect-[3/4] rounded-sm overflow-hidden">
              <Image
                src="/photos/20250828-SSP04749.jpg"
                alt="Maritzaida and AJ Weibe"
                fill
                className="object-cover object-top"
                sizes="500px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sharon Riley section */}
      <section
        className="py-16"
        style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
        aria-labelledby="sharon-heading"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
                {t("about.sharon.label")}
              </p>
              <h2 id="sharon-heading" className="text-4xl mb-4 leading-tight" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
                {t("about.sharon.heading")}
              </h2>
              <span className="divider-gold" />
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
                <p>{t("about.sharon.p")}</p>
              </div>
            </div>
            <div className="img-zoom relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src="/photos/IMG_20250525_210857.jpg"
                alt="Maritzaida performing with Sharon Riley Rexach"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sylvia Rexach section */}
      <section className="py-16 max-w-7xl mx-auto px-6" aria-labelledby="rexach-heading">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
            {t("about.rexach.label")}
          </p>
          <h2 id="rexach-heading" className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
            {t("about.rexach.heading")}
          </h2>
          <span className="divider-gold" />
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
            {t("about.rexach.p1")}
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
            {t("about.rexach.p2")}
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section
        className="py-16"
        style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}
        aria-labelledby="milestones-heading"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 id="milestones-heading" className="text-3xl mb-10" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
            {t("about.milestones")}
          </h2>
          <div className="relative border-l pl-8 space-y-10" style={{ borderColor: "var(--border)" }}>
            {milestones.map(({ year, event, desc, highlight }) => (
              <div key={year + event} className="relative">
                <span
                  className="absolute -left-10 top-1 w-4 h-4 rounded-full border-2"
                  style={{
                    borderColor: highlight ? "var(--gold)" : "var(--border)",
                    background: highlight ? "var(--gold)" : "var(--bg)",
                  }}
                  aria-hidden="true"
                />
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>{year}</p>
                <h3 className="text-xl mb-1" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
                  {event}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA row */}
      <div className="py-12" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-4 justify-center">
          <Link href="/music" className="px-8 py-3 text-xs tracking-widest uppercase font-medium" style={{ background: "var(--gold)", color: "var(--bg)", letterSpacing: "0.15em" }}>
            {t("about.cta.discography")}
          </Link>
          <Link href="/epk" className="px-8 py-3 text-xs tracking-widest uppercase font-medium" style={{ border: "1px solid var(--gold)", color: "var(--gold)", letterSpacing: "0.15em" }}>
            {t("about.cta.epk")}
          </Link>
          <Link href="/contact" className="px-8 py-3 text-xs tracking-widest uppercase font-medium" style={{ border: "1px solid var(--border)", color: "var(--text-muted)", letterSpacing: "0.15em" }}>
            {t("about.cta.contact")}
          </Link>
        </div>
      </div>
    </>
  );
}
