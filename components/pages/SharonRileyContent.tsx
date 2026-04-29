"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/components/LanguageContext";

export default function SharonRileyContent() {
  const { t } = useLang();

  const artists = [
    {
      name: "Sylvia Rexach",
      years: t("sharon.sylvia.years"),
      desc: t("sharon.sylvia.desc"),
    },
    {
      name: "Sharon Riley Rexach",
      years: t("sharon.sharon.years"),
      desc: t("sharon.sharon.desc"),
    },
    {
      name: "Tutti Umpierre",
      years: t("sharon.tutti.years"),
      desc: t("sharon.tutti.desc"),
    },
  ];

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
            style={{ background: "linear-gradient(to right, rgba(13,11,9,0.95) 45%, rgba(13,11,9,0.6) 100%)" }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
            {t("sharon.label")}
          </p>
          <h1
            className="text-4xl md:text-6xl leading-tight mb-2"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontWeight: 300 }}
          >
            Sylvia Rexach en la Voz de Sharon Riley
          </h1>
          <p className="text-lg mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-inter)", fontWeight: 300 }}>
            Sharon Riley Rexach &amp; Tutti Umpierre · 1971
          </p>
          <span className="divider-gold" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Main story */}
        <section className="mb-20" aria-labelledby="story-heading">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 items-start">
            <div>
              <h2 id="story-heading" className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
                {t("sharon.album.heading")}
              </h2>
              <span className="divider-gold" />
              <div className="space-y-5 text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
                <p>{t("sharon.story.p1")}</p>
                <p>{t("sharon.story.p2")}</p>
                <p>{t("sharon.story.p3")}</p>
                <p>{t("sharon.story.p4")}</p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="https://www.youtube.com/playlist?list=OLAK5uy_nDneOEDwMjLnXBKiyl9l9yM2ZqUY2Cb8Y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-90"
                  style={{ background: "var(--gold)", color: "var(--bg)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
                >
                  {t("sharon.listen")}
                </a>
                <Link
                  href="/about"
                  className="inline-block px-8 py-3 text-xs tracking-widest uppercase font-medium"
                  style={{ border: "1px solid var(--border)", color: "var(--text-muted)", letterSpacing: "0.15em" }}
                >
                  {t("sharon.about")}
                </Link>
              </div>
            </div>

            {/* Album cover + photo */}
            <div className="flex flex-col gap-6">
              <div className="relative aspect-square rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/albums/sharon-riley.jpg"
                  alt="Sylvia Rexach en la Voz de Sharon Riley – album cover"
                  fill
                  className="object-cover"
                  sizes="340px"
                />
              </div>
              <div className="img-zoom relative aspect-[4/3] rounded-sm overflow-hidden">
                <Image
                  src="/photos/IMG_20250525_210857.jpg"
                  alt="Maritzaida with Sharon Riley Rexach"
                  fill
                  className="object-cover object-top"
                  sizes="340px"
                />
              </div>
              <p className="text-xs" style={{ color: "var(--text-dim)" }}>
                {t("sharon.caption")}
              </p>
            </div>
          </div>
        </section>

        {/* The Artists */}
        <section className="pt-16 border-t mb-16" style={{ borderColor: "var(--border)" }} aria-labelledby="people-heading">
          <h2 id="people-heading" className="text-4xl mb-6" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
            {t("sharon.artists.heading")}
          </h2>
          <span className="divider-gold" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artists.map(({ name, years, desc }) => (
              <div key={name} className="p-6 border" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
                <h3 className="text-xl mb-1" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
                  {name}
                </h3>
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>{years}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA row */}
        <div className="pt-8 border-t flex flex-wrap gap-4" style={{ borderColor: "var(--border)" }}>
          <Link href="/music" className="px-8 py-3 text-xs tracking-widest uppercase font-medium" style={{ background: "var(--gold)", color: "var(--bg)", letterSpacing: "0.15em" }}>
            {t("sharon.cta.discography")}
          </Link>
          <Link href="/catalogo" className="px-8 py-3 text-xs tracking-widest uppercase font-medium" style={{ border: "1px solid var(--gold)", color: "var(--gold)", letterSpacing: "0.15em" }}>
            {t("sharon.cta.catalog")}
          </Link>
          <Link href="/epk" className="px-8 py-3 text-xs tracking-widest uppercase font-medium" style={{ border: "1px solid var(--border)", color: "var(--text-muted)", letterSpacing: "0.15em" }}>
            {t("sharon.cta.epk")}
          </Link>
        </div>

      </div>
    </>
  );
}
