"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/components/LanguageContext";
import { albums } from "@/lib/albums";

export default function MusicContent() {
  const { lang, t } = useLang();

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
            {t("music.label")}
          </p>
          <h1 className="text-5xl md:text-7xl" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontWeight: 300 }}>
            {t("music.heading")}
          </h1>
          <span className="divider-gold" />
          <p className="text-base max-w-xl" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
            {t("music.sub")}
          </p>
        </div>
      </div>

      {/* Streaming bar */}
      <div className="py-4 border-b" style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center gap-6">
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-dim)" }}>
            {t("music.stream")}
          </span>
          {[
            { label: "YouTube", href: "https://www.youtube.com/channel/UC_6FCmXCV-uzcypmvcaD8MA" },
            { label: "YouTube Music", href: "https://music.youtube.com/channel/UC_6FCmXCV-uzcypmvcaD8MA" },
            { label: "Spotify", href: "https://open.spotify.com/artist/4KjyjfCyhO5cxqbSI76WMb" },
            { label: "Apple Music", href: "https://music.apple.com/search?term=maritzaida" },
            { label: "Amazon Music", href: "https://music.amazon.com/search/maritzaida" },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase font-medium hover-gold transition-colors"
              style={{ color: "var(--text-muted)", letterSpacing: "0.12em" }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Albums list */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-0">
          {albums.map((album, i) => (
            <article key={album.title} className="group grid grid-cols-1 md:grid-cols-[280px_1fr] gap-0 border-b" style={{ borderColor: "var(--border)" }}>
              {/* Album art */}
              <div className="relative aspect-square" style={{ background: "var(--bg)" }}>
                <Image
                  src={album.image}
                  alt={`${album.title} – album cover`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 280px"
                  priority={i === 0}
                />
              </div>

              {/* Album info */}
              <div className="p-8 md:p-12 flex flex-col justify-center" style={{ background: i % 2 === 0 ? "var(--bg-card)" : "var(--bg)" }}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className="text-xs tracking-widest uppercase px-3 py-1 border"
                    style={{ color: "var(--gold)", borderColor: "var(--gold-muted)", letterSpacing: "0.15em" }}
                  >
                    {album.type}
                  </span>
                  <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-dim)" }}>
                    {album.year}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl mb-1 leading-tight" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
                  {album.title}
                </h2>
                {album.subtitle && (
                  <p className="text-sm mb-4 italic" style={{ color: "var(--text-muted)" }}>{album.subtitle}</p>
                )}

                {album.accolade && (
                  <div className="mb-4 px-4 py-2 border-l-2" style={{ borderColor: "var(--gold)", background: "rgba(201,160,74,0.06)" }}>
                    <p className="text-xs tracking-wide" style={{ color: "var(--gold)" }}>{album.accolade}</p>
                  </div>
                )}

                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
                  {album.description[lang]}
                </p>

                {album.credits && (
                  <p className="text-xs mb-4 italic" style={{ color: "var(--text-dim)" }}>{album.credits}</p>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {album.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1" style={{ background: "var(--bg-elevated)", color: "var(--text-dim)" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={album.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm tracking-widest uppercase font-medium hover-gold"
                  style={{ color: "var(--gold)", letterSpacing: "0.12em", fontFamily: "var(--font-inter)", width: "fit-content" }}
                >
                  {lang === "en" ? "Listen on YouTube ↗" : "Escuchar en YouTube ↗"}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 text-center" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>
          {t("music.cta.shows.label")}
        </p>
        <h2 className="text-3xl mb-6" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
          {t("music.cta.shows.heading")}
        </h2>
        <Link href="/shows" className="inline-block px-8 py-3 text-xs tracking-widest uppercase font-medium"
          style={{ border: "1px solid var(--gold)", color: "var(--gold)", letterSpacing: "0.15em" }}>
          {t("music.cta.shows")}
        </Link>
      </div>
    </>
  );
}
