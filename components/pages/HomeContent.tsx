"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/components/LanguageContext";

const featuredAlbums = [
  {
    title: "Una Noche (En Vivo)",
    subtitle: "",
    year: "2026",
    image: "/albums/una-noche-en-vivo.png",
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_ljxyKRqeN5RZjfwJsuDdoX3VCoL71jd-k",
    description: {
      en: "A live celebration of the Boleros Clásicos repertoire — Maritzaida's voice and AJ Weibe's guitar, captured before a live audience.",
      es: "Una celebración en vivo del repertorio de Boleros Clásicos — la voz de Maritzaida y la guitarra de AJ Weibe, captados ante el público.",
    },
  },
  {
    title: "Radio Bohemia Volumen I",
    subtitle: "La Música de Sylvia Rexach y Tutti Umpierre",
    year: "2025",
    image: "/albums/radio-bohemia-vol-1.png",
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_ld2cggMIv854TZcjDki39ZH9NJ2hhIwSc",
    description: {
      en: "Modeled after the 1953 radio broadcasts — featuring a guest appearance by Sharon Riley Rexach, daughter of Sylvia Rexach.",
      es: "Inspirado en las transmisiones radiales de 1953 — con la participación especial de Sharon Riley Rexach, hija de Sylvia Rexach.",
    },
  },
  {
    title: "Alma Adentro",
    subtitle: "La Música de Sylvia Rexach y Tuti Umpierre",
    year: "2024",
    image: "/albums/alma-adentro-front.jpg",
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_lF34Spj_Mvq46TOf3NxhHej3em5AmudBI",
    description: {
      en: "Ranked #16 on the Top 20 Most Outstanding Albums of 2024. A recreation of the legendary 1958 album.",
      es: "Clasificado #16 entre los 20 Álbumes Más Destacados de 2024. Una recreación del legendario álbum de 1958.",
    },
  },
];

export default function HomeContent() {
  const { lang, t } = useLang();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end" aria-label="Hero">
        <div className="absolute inset-0">
          <Image
            src="/photos/20250828-SSP05632.jpg"
            alt="Maritzaida – Puerto Rican música bohemia vocalist"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(13,11,9,1) 0%, rgba(13,11,9,0.6) 40%, rgba(13,11,9,0.2) 80%, rgba(13,11,9,0.3) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-40 w-full">
          <div className="max-w-2xl">
            <p
              className="text-sm tracking-[0.3em] uppercase mb-4"
              style={{ color: "var(--gold)", fontFamily: "var(--font-inter)", fontWeight: 500 }}
            >
              {t("home.genre")}
            </p>
            <h1
              className="text-6xl md:text-8xl mb-6 leading-none"
              style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontWeight: 300 }}
            >
              Maritzaida
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              {t("home.hero.sub")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/music"
                className="px-8 py-3 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-90"
                style={{
                  background: "var(--gold)",
                  color: "var(--bg)",
                  letterSpacing: "0.15em",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {t("home.hero.cta.music")}
              </Link>
              <Link
                href="/shows"
                className="px-8 py-3 text-sm tracking-widest uppercase font-medium transition-all duration-300"
                style={{
                  border: "1px solid var(--gold)",
                  color: "var(--gold)",
                  letterSpacing: "0.15em",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {t("home.hero.cta.shows")}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2" aria-hidden="true">
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-dim)", letterSpacing: "0.2em" }}>
            {t("home.hero.scroll")}
          </span>
          <div className="w-px h-10 animate-pulse" style={{ background: "linear-gradient(to bottom, var(--gold), transparent)" }} />
        </div>
      </section>

      {/* ── FEATURED ALBUMS ──────────────────────────────────── */}
      <section className="section max-w-7xl mx-auto px-6" aria-labelledby="music-heading">
        <header className="mb-12">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
            {t("home.featured.label")}
          </p>
          <h2 id="music-heading" className="text-4xl md:text-5xl" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
            {t("home.featured.heading")}
          </h2>
          <span className="divider-gold" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredAlbums.map((album) => (
            <article key={album.title} className="img-zoom group relative overflow-hidden rounded-sm" style={{ background: "var(--bg-card)" }}>
              <div className="relative aspect-square">
                <Image
                  src={album.image}
                  alt={`${album.title} album cover`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                  style={{ background: "linear-gradient(to top, rgba(13,11,9,0.9), transparent)" }}
                >
                  <div className="p-5 w-full">
                    <p className="text-sm leading-snug mb-3" style={{ color: "var(--text-muted)" }}>
                      {album.description[lang]}
                    </p>
                    <a
                      href={album.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs tracking-widest uppercase font-medium"
                      style={{ color: "var(--gold)", letterSpacing: "0.15em" }}
                    >
                      {t("home.listen")}
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>{album.year}</p>
                <h3 className="text-xl leading-tight" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
                  {album.title}
                </h3>
                {album.subtitle && (
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{album.subtitle}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/music"
            className="inline-block px-8 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-80"
            style={{ border: "1px solid var(--border)", color: "var(--text-muted)", letterSpacing: "0.15em" }}
          >
            {t("home.featured.cta")}
          </Link>
        </div>
      </section>

      {/* ── ABOUT TEASER ─────────────────────────────────────── */}
      <section
        className="section"
        style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
        aria-labelledby="about-heading"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="img-zoom relative aspect-[3/4] rounded-sm overflow-hidden">
              <Image
                src="/photos/20250828-SSP04706.jpg"
                alt="Maritzaida performing música bohemia and bolero"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
                {t("home.about.label")}
              </p>
              <h2 id="about-heading" className="text-4xl md:text-5xl mb-4 leading-tight" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
                {t("home.about.heading")}
              </h2>
              <span className="divider-gold" />
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
                {t("home.about.p1")}
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
                {t("home.about.p2")}
              </p>
              <Link
                href="/about"
                className="inline-block text-sm tracking-widest uppercase font-medium hover-gold"
                style={{ color: "var(--gold)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
              >
                {t("home.about.cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILM ─────────────────────────────────────────────── */}
      <section className="section max-w-7xl mx-auto px-6" aria-labelledby="film-heading">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
              {t("home.film.label")}
            </p>
            <h2 id="film-heading" className="text-4xl md:text-5xl mb-4 leading-tight" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
              {t("home.film.heading")}
            </h2>
            <span className="divider-gold" />
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
              {t("home.film.p1")}
            </p>
            <p className="text-sm mb-6" style={{ color: "var(--text-dim)" }}>
              {t("home.film.platforms")}
            </p>
            <a
              href="https://youtu.be/GBBEd5gBrrk?si=DHKp8pMp4LsdbGWw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm tracking-widest uppercase font-medium hover-gold"
              style={{ color: "var(--gold)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
            >
              {t("home.film.cta")}
            </a>
          </div>
          <div className="relative aspect-video rounded-sm overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/GBBEd5gBrrk"
              title="A Little Family Drama – Official Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: "none" }}
            />
          </div>
        </div>
      </section>

      {/* ── PRESS QUOTE ──────────────────────────────────────── */}
      <section
        className="section"
        style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border)" }}
        aria-label="Press accolade"
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-5xl mb-6" style={{ color: "var(--gold-muted)", fontFamily: "var(--font-cormorant)" }} aria-hidden="true">&ldquo;</p>
          <blockquote>
            <p
              className="text-2xl md:text-3xl leading-relaxed mb-6 italic"
              style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontWeight: 300 }}
            >
              {t("home.quote")}
            </p>
            <footer>
              <p className="text-xs tracking-widest uppercase" style={{ color: "var(--text-dim)", letterSpacing: "0.2em" }}>
                {t("home.quote.source")}
              </p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── STORE ────────────────────────────────────────────── */}
      <section
        className="py-12"
        style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
        aria-label="Merchandise store"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
              {t("home.store.label")}
            </p>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
              {t("home.store.heading")}
            </h2>
          </div>
          <a
            href="https://www.charliehunter.com/merchandise/maritzaida"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 text-sm tracking-widest uppercase font-medium shrink-0 transition-all duration-300 hover:opacity-90"
            style={{ background: "var(--gold)", color: "var(--bg)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
          >
            {t("home.store.cta")}
          </a>
        </div>
      </section>

      {/* ── BOOKING CTA ──────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
        aria-label="Booking call to action"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
              {t("home.booking.heading")}
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              {t("home.booking.sub")}
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-90"
              style={{ background: "var(--gold)", color: "var(--bg)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
            >
              {t("home.booking.contact")}
            </Link>
            <Link
              href="/epk"
              className="px-8 py-3 text-sm tracking-widest uppercase font-medium"
              style={{ border: "1px solid var(--gold)", color: "var(--gold)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
            >
              {t("home.booking.epk")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
