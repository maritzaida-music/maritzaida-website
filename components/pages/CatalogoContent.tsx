"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/components/LanguageContext";

const catalog: { album: string; year: string; youtube: string; songs: string[] }[] = [
  {
    album: "Radio Bohemia Volumen I",
    year: "2025",
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_ld2cggMIv854TZcjDki39ZH9NJ2hhIwSc",
    songs: [
      "Pedazo de Luna", "Bodas de Oro", "Planetarium", "Mi Versión",
      "La Vida Dirá", "Quisiera Ser", "Dios de Oro (feat. Sharon Riley Rexach)",
    ],
  },
  {
    album: "El Otro Camino",
    year: "2025",
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_mFINFHCFYD9CYgI01xuQD9z3y-3xdTLD4",
    songs: ["Por Siempre", "Negra", "Mi Asuntito", "El Otro Camino"],
  },
  {
    album: "Sentimientos En Vivo",
    year: "2025",
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_lYZsA1qGueNXL34d68JWhRyO2QRhAOZvw",
    songs: ["Senda de Flores", "Yo Era Una Flor", "Y Entonces"],
  },
  {
    album: "Alma Adentro: La Música de Sylvia Rexach y Tuti Umpierre",
    year: "2024",
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_lF34Spj_Mvq46TOf3NxhHej3em5AmudBI",
    songs: [
      "En Mis Sueños", "Es Tarde Ya", "Por Siempre", "Alma Adentro",
      "Anochecer", "Nuestra Luna", "Matiz de Amor", "Di Corazón",
      "Mi Subconsciente Amor", "Tus Pasos", "Luna Sobre el Condado",
      "Había Una Vez", "Nave Sin Rumbo", "Olas y Arenas",
    ],
  },
  {
    album: "Lamento de Navidad",
    year: "2024",
    youtube: "https://www.youtube.com/playlist?list=OLAK5uy_mTomZZxNV6IrSmzuVwFg4WDxIc7F1gXA0",
    songs: ["Lamento de Navidad"],
  },
];

export default function CatalogoContent() {
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
            {t("catalogo.label")}
          </p>
          <h1 className="text-5xl md:text-7xl" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontWeight: 300 }}>
            {t("catalogo.heading")}
          </h1>
          <span className="divider-gold" />
          <p className="text-base max-w-2xl" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
            {t("catalogo.sub")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Context */}
        <div className="max-w-3xl mb-16">
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
            {t("catalogo.context.p1")}
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
            {t("catalogo.context.p2")}
          </p>
        </div>

        {/* Sharon Riley callout */}
        <div
          className="p-8 border-l-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16"
          style={{ borderColor: "var(--gold)", background: "var(--bg-elevated)" }}
        >
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
              {t("catalogo.sharon.label")}
            </p>
            <h2 className="text-3xl mb-2 leading-tight" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
              Sylvia Rexach en la Voz de Sharon Riley
            </h2>
            <p className="text-sm" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
              {t("catalogo.sharon.sub")}
            </p>
          </div>
          <Link
            href="/sharon-riley-rexach"
            className="px-8 py-3 text-xs tracking-widest uppercase font-medium shrink-0"
            style={{ background: "var(--gold)", color: "var(--bg)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
          >
            {t("catalogo.sharon.cta")}
          </Link>
        </div>

        {/* Catalog by album */}
        <div className="space-y-16">
          {catalog.map(({ album, year, youtube, songs }) => (
            <section key={album} aria-labelledby={`album-${year}-${album.replace(/\s/g, "-")}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs tracking-widest uppercase mr-4" style={{ color: "var(--gold)" }}>{year}</span>
                  <h2
                    id={`album-${year}-${album.replace(/\s/g, "-")}`}
                    className="inline text-3xl"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
                  >
                    {album}
                  </h2>
                </div>
                <a
                  href={youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest uppercase hover-gold shrink-0"
                  style={{ color: "var(--gold)", letterSpacing: "0.15em" }}
                >
                  {t("catalogo.listen")}
                </a>
              </div>
              <div className="border-t" style={{ borderColor: "var(--border)" }}>
                {songs.map((song, i) => (
                  <div
                    key={song}
                    className="flex items-center gap-6 py-3 border-b"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <span className="text-xs w-6 text-right shrink-0" style={{ color: "var(--text-dim)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontSize: "1.05rem" }}>
                      {song}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 pt-8 border-t flex flex-wrap gap-4" style={{ borderColor: "var(--border)" }}>
          <Link href="/music" className="px-8 py-3 text-xs tracking-widest uppercase font-medium" style={{ background: "var(--gold)", color: "var(--bg)", letterSpacing: "0.15em" }}>
            {t("catalogo.cta.discography")}
          </Link>
          <Link href="/sharon-riley-rexach" className="px-8 py-3 text-xs tracking-widest uppercase font-medium" style={{ border: "1px solid var(--gold)", color: "var(--gold)", letterSpacing: "0.15em" }}>
            Sharon Riley Rexach
          </Link>
          <Link href="/about" className="px-8 py-3 text-xs tracking-widest uppercase font-medium" style={{ border: "1px solid var(--border)", color: "var(--text-muted)", letterSpacing: "0.15em" }}>
            {t("catalogo.cta.about")}
          </Link>
        </div>

      </div>
    </>
  );
}
