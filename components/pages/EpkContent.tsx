"use client";

import Image from "next/image";
import Link from "next/link";
import PressPhotoGallery from "@/components/PressPhotoGallery";
import { useLang } from "@/components/LanguageContext";

const pressItems = [
  {
    title: "Obra de Sylvia Rexach viva en Maritzaida",
    pub: "Fundación Nacional para la Cultura Popular",
    year: "2025",
    href: "https://prpop.org/2025/03/obra-de-sylvia-rexach-viva-en-maritzaida/",
  },
  {
    title: "Severna Park's Aaron Weibe Returns to Maryland for a Night of Latin Music at Le Mondo",
    pub: "Severna Park Voice",
    year: "2025",
    href: "https://severnaparkvoice.com/stories/severna-parks-aaron-weibe-returns-to-maryland-for-a-night-of-latin-music-at-le-mondo,67630",
  },
  {
    title: "Charlie Hunter Produces Fourth Bolero Record for Puerto Rican Vocalist Maritzaida",
    pub: "All About Jazz",
    year: "2024",
    href: "https://www.allaboutjazz.com/news/charlie-hunter-produces-fourth-bolero-record-for-puerto-rican-vocalist-maritzaida/",
  },
  {
    title: "Jazz Beyond Intel — June 2023",
    pub: "Dan Ouellette",
    year: "2023",
    href: "https://danouellette.net/f/jazz-beyond-intel-june-2023-robin-verheyen-not-liking-the-box",
  },
  {
    title: "Greensboro Record Company Will Release Boleros Album by Local Duo",
    pub: "88.5 WFDD",
    year: "2023",
    href: "https://www.wfdd.org/2023-04-13/greensboro-record-company-will-release-boleros-album-by-local-duo",
  },
  {
    title: "Compañía discográfica lanza álbum de boleros clásicos en Greensboro",
    pub: "La Noticia",
    year: "2023",
    href: "https://lanoticia.com/noticias/usa/nc/gbo/compania-discografica-lanza-album-de-boleros-clasicos-en-greensboro-y-esto-debes-saber/",
  },
  {
    title: "Hola Noticias — Feature",
    pub: "Hola Noticias / Issuu",
    year: "2023",
    href: "https://issuu.com/holanoticias/docs/carovir_7e589275be605b",
  },
];

const discography = [
  { year: "2026", title: "Una Noche (En Vivo)", type: "Live Album", note: "Live Boleros Clásicos repertoire" },
  { year: "2025", title: "Radio Bohemia Volumen I", type: "LP", note: "Feat. Sharon Riley Rexach" },
  { year: "2025", title: "El Otro Camino", type: "EP", note: "Restores 1959 film score compositions" },
  { year: "2025", title: "Sentimientos En Vivo", type: "Live Album", note: "Live Rexach/Umpierre repertoire" },
  { year: "2024", title: "Alma Adentro", type: "LP", note: "#16 Top 20 Most Outstanding Albums — La Fundación Para La Cultura Popular de Puerto Rico" },
  { year: "2024", title: "Lamento de Navidad", type: "Single", note: "" },
  { year: "2023", title: "Boleros Clásicos Volumen II", type: "LP", note: "Prod. Charlie Hunter · SideHustle Records" },
  { year: "2023", title: "Boleros Clásicos Volumen I", type: "LP", note: "Debut · Prod. Charlie Hunter · SideHustle Records" },
  { year: "2023", title: "Triste Navidad", type: "Single", note: "" },
];

export default function EpkContent() {
  const { t } = useLang();

  const overview = [
    { label: t("epk.overview.genre"), value: "Música Bohemia, Bolero" },
    { label: t("epk.overview.origin"), value: "Puerto Rico" },
    { label: t("epk.overview.since"), value: "2023" },
    { label: t("epk.overview.specialty"), value: "Sylvia Rexach & Tutti Umpierre Repertoire" },
    { label: t("epk.overview.instagram"), value: "@maritzaidamusic" },
    { label: t("epk.overview.releases"), value: "7 albums / EPs (2023–2026)" },
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
            style={{ background: "linear-gradient(to right, rgba(13,11,9,0.92) 40%, rgba(13,11,9,0.5) 100%)" }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
              {t("epk.label")}
            </p>
            <h1
              className="text-5xl md:text-7xl"
              style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontWeight: 300 }}
            >
              {t("epk.heading")}
            </h1>
            <span className="divider-gold" />
            <p className="text-base max-w-xl" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
              {t("epk.sub")}
            </p>
          </div>
          <a
            href="/contact"
            className="inline-block px-8 py-3 text-xs tracking-widest uppercase font-medium shrink-0"
            style={{ background: "var(--gold)", color: "var(--bg)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
          >
            {t("epk.booking.cta")}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">

        {/* Artist overview */}
        <section aria-labelledby="overview-heading">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
                {t("epk.artist.label")}
              </p>
              <h2 id="overview-heading" className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
                Maritzaida
              </h2>
              <p className="text-sm tracking-widest uppercase mb-6" style={{ color: "var(--text-muted)" }}>
                Música Bohemia &amp; Bolero — Puerto Rico
              </p>

              <dl className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8 text-sm">
                {overview.map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--text-dim)" }}>{label}</dt>
                    <dd style={{ color: "var(--text-primary)" }}>{value}</dd>
                  </div>
                ))}
              </dl>

              <h3 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
                {t("epk.bio.heading")}
              </h3>
              <div
                className="p-6 border-l-2 text-sm leading-relaxed"
                style={{ borderColor: "var(--gold)", background: "var(--bg-elevated)", color: "var(--text-muted)" }}
              >
                <p>{t("epk.bio.text")}</p>
              </div>
            </div>

            {/* Press photo */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
                {t("epk.photo.label")}
              </p>
              <div className="img-zoom relative aspect-[3/4] rounded-sm overflow-hidden mb-3">
                <Image
                  src="/photos/20250828-SSP04706.jpg"
                  alt="Maritzaida – press photo"
                  fill
                  className="object-cover object-top"
                  sizes="360px"
                  priority
                />
              </div>
              <p className="text-xs" style={{ color: "var(--text-dim)" }}>
                {t("epk.photo.caption")}
              </p>
            </div>
          </div>
        </section>

        {/* Film placement */}
        <section aria-labelledby="film-heading">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
            {t("epk.film.label")}
          </p>
          <h2 id="film-heading" className="text-4xl mb-6" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
            A Little Family Drama
          </h2>
          <span className="divider-gold" />
          <div
            className="p-6 border-l-2 text-sm leading-relaxed"
            style={{ borderColor: "var(--gold)", background: "var(--bg-elevated)", color: "var(--text-muted)" }}
          >
            <p>{t("epk.film.text")}</p>
            <a
              href="https://youtu.be/GBBEd5gBrrk?si=DHKp8pMp4LsdbGWw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-xs tracking-widest uppercase hover-gold"
              style={{ color: "var(--gold)", letterSpacing: "0.15em" }}
            >
              {t("epk.film.cta")}
            </a>
          </div>
        </section>

        {/* Press coverage */}
        <section aria-labelledby="press-heading">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
            {t("epk.press.label")}
          </p>
          <h2 id="press-heading" className="text-4xl mb-6" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
            {t("epk.press.heading")}
          </h2>
          <span className="divider-gold" />
          <div className="space-y-0">
            {pressItems.map(({ title, pub, year, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-between py-5 border-b gap-6 group"
                style={{ borderColor: "var(--border)" }}
              >
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>{year} · {pub}</p>
                  <p className="text-base leading-snug group-hover:opacity-80 transition-opacity" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontSize: "1.1rem" }}>
                    {title}
                  </p>
                </div>
                <span className="text-sm shrink-0 mt-1 group-hover:translate-x-1 transition-transform" style={{ color: "var(--gold)" }}>↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* Discography snapshot */}
        <section aria-labelledby="epk-discog-heading">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
            {t("epk.discog.label")}
          </p>
          <h2 id="epk-discog-heading" className="text-4xl mb-6" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
            {t("epk.discog.heading")}
          </h2>
          <span className="divider-gold" />
          <div className="space-y-3">
            {discography.map(({ year, title, type, note }) => (
              <div
                key={title}
                className="grid grid-cols-[60px_1fr_80px] md:grid-cols-[60px_1fr_120px_1fr] gap-4 items-center py-4 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="text-xs font-medium" style={{ color: "var(--gold)" }}>{year}</span>
                <span className="font-medium" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontSize: "1.1rem" }}>{title}</span>
                <span
                  className="text-xs tracking-widest uppercase px-2 py-1 text-center"
                  style={{ border: "1px solid var(--border)", color: "var(--text-dim)", fontSize: "0.65rem" }}
                >
                  {type}
                </span>
                <span className="hidden md:block text-xs italic" style={{ color: "var(--text-muted)" }}>{note}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/music" className="text-xs tracking-widest uppercase hover-gold" style={{ color: "var(--gold)", letterSpacing: "0.15em" }}>
              {t("epk.discog.cta")}
            </Link>
          </div>
        </section>

        {/* Press photo gallery */}
        <section aria-labelledby="photos-heading">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
            {t("epk.photos.label")}
          </p>
          <h2 id="photos-heading" className="text-4xl mb-6" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
            {t("epk.photos.heading")}
          </h2>
          <span className="divider-gold" />
          <PressPhotoGallery />
          <p className="mt-4 text-xs" style={{ color: "var(--text-dim)" }}>
            {t("epk.photos.caption")}
          </p>
        </section>

        {/* Booking / contact */}
        <section
          className="p-10 border"
          style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
          aria-labelledby="booking-heading"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
            {t("epk.contact.label")}
          </p>
          <h2 id="booking-heading" className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
            {t("epk.contact.heading")}
          </h2>
          <p className="text-sm leading-relaxed mb-6 max-w-xl" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
            {t("epk.contact.body")}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:amador.weibe@gmail.com"
              className="px-8 py-3 text-xs tracking-widest uppercase font-medium"
              style={{ background: "var(--gold)", color: "var(--bg)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
            >
              {t("epk.email.cta")}
            </a>
            <a
              href="https://www.instagram.com/maritzaidamusic"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-xs tracking-widest uppercase font-medium"
              style={{ border: "1px solid var(--border)", color: "var(--text-muted)", letterSpacing: "0.15em" }}
            >
              @maritzaidamusic
            </a>
          </div>
        </section>

      </div>
    </>
  );
}
