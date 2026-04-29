"use client";

import { useLang } from "@/components/LanguageContext";

const videos = [
  { id: "GV_Xr8QiBNE", title: "Maritzaida – Música Bohemia & Bolero", description: "Official music video" },
  { id: "ZwICYu2IXYM", title: "Maritzaida – Live Performance", description: "Live bolero performance" },
  { id: "_z_iK_6Ep9M", title: "Maritzaida – Sentimientos", description: "Official video" },
  { id: "zVF0G8Vl7bI", title: "Maritzaida – Alma Adentro", description: "From the acclaimed 2024 album" },
  { id: "NLC5Frwrc4Y", title: "Maritzaida – Sylvia Rexach Tribute", description: "Honoring Sylvia Rexach" },
  { id: "fORe8jzTZAc", title: "Maritzaida – Radio Bohemia", description: "From Radio Bohemia Volumen I" },
  { id: "VlPOay_YW1k", title: "Maritzaida – Bolero Clásico", description: "Live performance" },
  { id: "-rWniJboWuE", title: "Maritzaida – El Otro Camino", description: "From the 2025 EP" },
  { id: "zsS7JXYYeBQ", title: "Maritzaida – Live in Concert", description: "Full performance" },
];

export default function VideosContent() {
  const { t } = useLang();

  return (
    <>
      {/* Page header */}
      <div className="pt-32 pb-16" style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
            {t("videos.label")}
          </p>
          <h1 className="text-5xl md:text-7xl" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontWeight: 300 }}>
            {t("videos.heading")}
          </h1>
          <span className="divider-gold" />
          <p className="text-base max-w-xl" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
            {t("videos.sub")}
          </p>
        </div>
      </div>

      {/* Featured video */}
      <section className="max-w-7xl mx-auto px-6 py-16" aria-labelledby="featured-video-heading">
        <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
          {t("videos.featured")}
        </p>
        <h2 id="featured-video-heading" className="text-3xl mb-6" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
          {videos[0].title}
        </h2>
        <div className="relative w-full rounded-sm overflow-hidden" style={{ aspectRatio: "16/9", background: "var(--bg-card)" }}>
          <iframe
            src={`https://www.youtube.com/embed/${videos[0].id}?rel=0&modestbranding=1`}
            title={videos[0].title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            loading="lazy"
          />
        </div>
      </section>

      {/* Video grid */}
      <section className="pb-16" aria-labelledby="all-videos-heading">
        <div className="max-w-7xl mx-auto px-6">
          <h2 id="all-videos-heading" className="text-2xl mb-8" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
            {t("videos.all")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.slice(1).map((video) => (
              <article key={video.id} className="group">
                <div className="relative rounded-sm overflow-hidden mb-3" style={{ aspectRatio: "16/9", background: "var(--bg-card)" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg leading-snug mb-1" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
                  {video.title}
                </h3>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{video.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube channel CTA */}
      <div className="py-12 text-center" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
        <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
          {t("videos.channel.sub")}
        </p>
        <a
          href="https://www.youtube.com/channel/UC_6FCmXCV-uzcypmvcaD8MA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 text-xs tracking-widest uppercase font-medium"
          style={{ border: "1px solid var(--gold)", color: "var(--gold)", letterSpacing: "0.15em" }}
        >
          {t("videos.channel")}
        </a>
      </div>
    </>
  );
}
