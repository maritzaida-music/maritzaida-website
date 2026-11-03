"use client";

import { useEffect, useRef, useCallback, useState } from "react";

type Lang = "en" | "es";
type Chords = "standard" | "fixeddo";
type Layout = "spread" | "single";

type Song = {
  id: number;
  title: { es: string; en: string };
  startPage: number;
  musicPage: number;
  youtubeId: string;
};

const UI = {
  en: {
    standard: "Standard",
    fixedDo: "Fixed-Do",
    spread: "Two Pages",
    single: "Single Page",
    page: "Page",
    of: "of",
    loading: "Loading…",
    toc: "Songs",
    play: "Play",
    close: "Close",
    listen: "Listen",
  },
  es: {
    standard: "Estándar",
    fixedDo: "Do fijo",
    spread: "Dos páginas",
    single: "Página única",
    page: "Página",
    of: "de",
    loading: "Cargando…",
    toc: "Canciones",
    play: "Reproducir",
    close: "Cerrar",
    listen: "Escuchar",
  },
};

const HEADER =
  "Este recurso se ofrece gratuitamente con fines educativos, de preservación histórica y sin fines de lucro. Alma Adentro II se ofrece gratuitamente por Maritzaida y Aaron J. Weibe, con el permiso de PeerMusic y con el apoyo y la autorización de Sharon Riley Rexach.";

function pageUrl(lang: Lang, chords: Chords, page: number) {
  return `/api/test-book/page?lang=${lang}&chords=${chords}&p=${page}`;
}

async function drawPage(canvas: HTMLCanvasElement, url: string): Promise<void> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Page load failed: ${res.status}`);
  const blob = await res.blob();
  const bitmap = await createImageBitmap(blob);
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
}

export default function CancioneraReader({
  totalPages,
  songs,
}: {
  totalPages: number;
  songs: Song[];
}) {
  const lang: Lang = "es";
  const chords: Chords = "fixeddo";
  const [layout, setLayout] = useState<Layout>("spread");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jumpInput, setJumpInput] = useState("");
  const [tocOpen, setTocOpen] = useState(true);
  const [ytSong, setYtSong] = useState<Song | null>(null);

  const leftRef = useRef<HTMLCanvasElement>(null);
  const rightRef = useRef<HTMLCanvasElement>(null);

  const ui = UI[lang];
  const maxPage = layout === "spread" ? Math.ceil(totalPages / 2) : totalPages;

  // Detect mobile: single page default
  useEffect(() => {
    if (window.innerWidth < 768) {
      setLayout("single");
    }
  }, []);

  const load = useCallback(async () => {
    if (totalPages === 0) return;
    setLoading(true);
    try {
      if (layout === "spread") {
        const lp = page * 2 - 1;
        const rp = page * 2;
        const tasks: Promise<void>[] = [];
        if (leftRef.current) tasks.push(drawPage(leftRef.current, pageUrl(lang, chords, lp)));
        if (rightRef.current && rp <= totalPages) {
          tasks.push(drawPage(rightRef.current, pageUrl(lang, chords, rp)));
        } else if (rightRef.current) {
          const ctx = rightRef.current.getContext("2d");
          if (ctx) {
            rightRef.current.width = leftRef.current?.width ?? 800;
            rightRef.current.height = leftRef.current?.height ?? 1100;
            ctx.clearRect(0, 0, rightRef.current.width, rightRef.current.height);
          }
        }
        await Promise.all(tasks);
      } else {
        if (leftRef.current) await drawPage(leftRef.current, pageUrl(lang, chords, page));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [lang, chords, layout, page, totalPages]);

  useEffect(() => { load(); }, [load]);

  // Block print
  useEffect(() => {
    const block = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") { e.preventDefault(); e.stopPropagation(); }
    };
    window.addEventListener("keydown", block, true);
    return () => window.removeEventListener("keydown", block, true);
  }, []);

  // Block keyboard navigation when YouTube modal is open
  useEffect(() => {
    if (ytSong) {
      const block = (e: KeyboardEvent) => {
        if (e.key === "Escape") setYtSong(null);
      };
      window.addEventListener("keydown", block);
      return () => window.removeEventListener("keydown", block);
    }
  }, [ytSong]);

  const noContext = (e: React.MouseEvent) => e.preventDefault();

  function go(delta: number) {
    setPage((p) => Math.max(1, Math.min(maxPage, p + delta)));
  }

  function jumpToSong(song: Song) {
    // Convert song's startPage to the spread/single page index
    const target = layout === "spread" ? Math.ceil(song.startPage / 2) : song.startPage;
    setPage(Math.max(1, Math.min(maxPage, target)));
    setTocOpen(false);
  }

  function handleJump(e: React.FormEvent) {
    e.preventDefault();
    const n = parseInt(jumpInput, 10);
    if (!isNaN(n)) setPage(Math.max(1, Math.min(maxPage, n)));
    setJumpInput("");
  }

  function changeLayout(l: Layout) {
    setLayout(l);
    setPage(1);
  }

  const btn = (active: boolean, label: string, onClick: () => void, gold = false) => (
    <button
      onClick={onClick}
      style={{
        padding: "5px 11px",
        fontSize: 11,
        letterSpacing: ".1em",
        textTransform: "uppercase" as const,
        fontFamily: "inherit",
        background: active ? (gold ? "#c9a04a" : "#2a2218") : "transparent",
        color: active ? (gold ? "#0d0b09" : "#c9a04a") : "#7a7060",
        border: `1px solid ${active ? (gold ? "#c9a04a" : "#3a3020") : "#252018"}`,
        cursor: "pointer",
        whiteSpace: "nowrap" as const,
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0b09",
        color: "#e8dcc8",
        fontFamily: "var(--font-inter, Arial, sans-serif)",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #1e1a14",
          padding: "24px 24px 20px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant, Georgia, serif)",
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 300,
            letterSpacing: ".04em",
            color: "#c9a04a",
            margin: "0 0 4px",
          }}
        >
          Alma Adentro II
        </p>
        <p
          style={{
            fontSize: 12,
            color: "#7a7060",
            letterSpacing: ".08em",
            margin: "0 0 16px",
            textTransform: "uppercase",
          }}
        >
          Cancionera de la Música Bohemia de Sylvia Rexach y Tutti Umpierre
        </p>
        <p
          style={{
            fontSize: 11,
            color: "#5a5448",
            lineHeight: 1.6,
            maxWidth: 680,
            margin: "0 auto",
            fontStyle: "italic",
            userSelect: "text",
            WebkitUserSelect: "text",
          }}
        >
          {HEADER}
        </p>
      </div>

      {/* Controls */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#0d0b09",
          borderBottom: "1px solid #1e1a14",
          padding: "10px 16px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          {/* TOC toggle */}
          {btn(tocOpen, ui.toc, () => setTocOpen((o) => !o))}

          {/* Layout (hidden on mobile) */}
          <span className="hidden md:flex" style={{ display: "flex", gap: 6 }}>
            {btn(layout === "spread", ui.spread, () => changeLayout("spread"))}
            {btn(layout === "single", ui.single, () => changeLayout("single"))}
          </span>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button
            onClick={() => go(-1)}
            disabled={page <= 1}
            style={{
              width: 30, height: 30, background: "transparent",
              border: "1px solid #252018", color: "#c9a04a",
              cursor: page <= 1 ? "default" : "pointer",
              opacity: page <= 1 ? .3 : 1, fontSize: 15,
            }}
          >←</button>
          <form onSubmit={handleJump} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 11, color: "#5a5448" }}>{ui.page}</span>
            <input
              type="text"
              inputMode="numeric"
              value={jumpInput || String(page)}
              onChange={(e) => setJumpInput(e.target.value)}
              onFocus={() => setJumpInput("")}
              style={{
                width: 40, padding: "3px 5px", textAlign: "center",
                background: "#0d0b09", border: "1px solid #252018",
                color: "#e8dcc8", fontSize: 11, fontFamily: "inherit",
              }}
            />
            <span style={{ fontSize: 11, color: "#5a5448" }}>{ui.of} {maxPage}</span>
          </form>
          <button
            onClick={() => go(1)}
            disabled={page >= maxPage}
            style={{
              width: 30, height: 30, background: "transparent",
              border: "1px solid #252018", color: "#c9a04a",
              cursor: page >= maxPage ? "default" : "pointer",
              opacity: page >= maxPage ? .3 : 1, fontSize: 15,
            }}
          >→</button>
        </div>
      </div>

      {/* Main area: TOC sidebar + reader */}
      <div style={{ display: "flex", position: "relative" }}>
        {/* TOC Sidebar */}
        {tocOpen && (
          <div
            style={{
              width: "min(280px, 85vw)",
              minHeight: "calc(100vh - 120px)",
              background: "#0a0906",
              borderRight: "1px solid #1e1a14",
              overflowY: "auto",
              flexShrink: 0,
              position: "sticky",
              top: 48,
              maxHeight: "calc(100vh - 48px)",
            }}
          >
            <div style={{ padding: "16px 0 32px" }}>
              {songs.map((song) => (
                <div
                  key={song.id}
                  style={{
                    padding: "10px 16px",
                    borderBottom: "1px solid #141210",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    onClick={() => jumpToSong(song)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#c9a04a",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: 0,
                      fontSize: 12,
                      lineHeight: 1.3,
                      fontFamily: "inherit",
                      flex: 1,
                    }}
                  >
                    <span style={{ color: "#4a4438", fontSize: 10, display: "block", marginBottom: 2 }}>
                      {song.id}.
                    </span>
                    {song.title[lang]}
                  </button>
                  <button
                    onClick={() => setYtSong(song)}
                    title={ui.listen}
                    style={{
                      background: "none",
                      border: "1px solid #2a2218",
                      color: "#c9a04a",
                      cursor: "pointer",
                      padding: "3px 7px",
                      fontSize: 11,
                      fontFamily: "inherit",
                      flexShrink: 0,
                    }}
                  >
                    ▶
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reader */}
        {totalPages === 0 ? (
          <div style={{ flex: 1, textAlign: "center", padding: "80px 24px", color: "#5a5448", fontSize: 14 }}>
            Book not yet available.
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: layout === "spread" ? 8 : 0,
              padding: "24px 12px 64px",
              position: "relative",
            }}
          >
            {loading && (
              <div
                style={{
                  position: "absolute", inset: 0, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  background: "rgba(13,11,9,0.75)", zIndex: 10, fontSize: 12,
                  color: "#c9a04a", letterSpacing: ".15em", textTransform: "uppercase",
                }}
              >
                {ui.loading}
              </div>
            )}
            <canvas
              ref={leftRef}
              onContextMenu={noContext}
              style={{
                maxWidth: layout === "spread" ? "calc(50% - 4px)" : "min(820px, 100%)",
                maxHeight: "88vh",
                objectFit: "contain",
                display: "block",
                background: "#f5f0e8",
              }}
            />
            {layout === "spread" && (
              <canvas
                ref={rightRef}
                onContextMenu={noContext}
                style={{
                  maxWidth: "calc(50% - 4px)",
                  maxHeight: "88vh",
                  objectFit: "contain",
                  display: "block",
                  background: "#f5f0e8",
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* YouTube Modal */}
      {ytSong && (
        <div
          onClick={() => setYtSong(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(5,4,3,0.92)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "min(640px, 100%)", position: "relative" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontFamily: "var(--font-cormorant, Georgia)", fontSize: 20, color: "#c9a04a", fontWeight: 300 }}>
                {ytSong.title[lang]}
              </span>
              <button
                onClick={() => setYtSong(null)}
                style={{
                  background: "none", border: "1px solid #2a2218",
                  color: "#7a7060", cursor: "pointer", padding: "4px 10px",
                  fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase",
                  fontFamily: "inherit",
                }}
              >
                {ui.close}
              </button>
            </div>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src={`https://www.youtube.com/embed/${ytSong.youtubeId}?autoplay=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{
                  position: "absolute", top: 0, left: 0,
                  width: "100%", height: "100%", border: "none",
                }}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media print { * { display: none !important; } }
        @media (max-width: 767px) {
          .hidden.md\\:flex { display: none !important; }
        }
      `}</style>
    </div>
  );
}
