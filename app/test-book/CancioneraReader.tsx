"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

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
    back: "← Maritzaida.com",
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
    back: "← Maritzaida.com",
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

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
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
  const [zoom, setZoom] = useState(1.0);
  const [layout, setLayout] = useState<Layout>("spread");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jumpInput, setJumpInput] = useState("");
  const [tocOpen, setTocOpen] = useState(false);

  // Mini audio player
  const [ytSong, setYtSong] = useState<Song | null>(null);
  const [ytPlaying, setYtPlaying] = useState(false);
  const [ytProgress, setYtProgress] = useState({ current: 0, duration: 0 });
  const [scrubbing, setScrubbing] = useState(false);
  const [scrubValue, setScrubValue] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ytPlayerRef = useRef<any>(null);
  const ytContainerRef = useRef<HTMLDivElement>(null);
  const ytApiReady = useRef(false);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const leftRef = useRef<HTMLCanvasElement>(null);
  const rightRef = useRef<HTMLCanvasElement>(null);

  const ui = UI[lang];
  const maxPage = layout === "spread" ? Math.ceil(totalPages / 2) : totalPages;

  // Detect mobile: single page default
  useEffect(() => {
    if (window.innerWidth < 768) setLayout("single");
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

  // Load YouTube IFrame API once
  useEffect(() => {
    if (window.YT) { ytApiReady.current = true; return; }
    window.onYouTubeIframeAPIReady = () => { ytApiReady.current = true; };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
  }, []);

  // Create / swap the YT player when ytSong changes
  useEffect(() => {
    if (!ytSong) {
      if (progressInterval.current) clearInterval(progressInterval.current);
      return;
    }
    const startPolling = () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      progressInterval.current = setInterval(() => {
        if (!ytPlayerRef.current) return;
        try {
          const current = ytPlayerRef.current.getCurrentTime?.() ?? 0;
          const duration = ytPlayerRef.current.getDuration?.() ?? 0;
          setYtProgress({ current, duration });
        } catch { /* player not ready */ }
      }, 500);
    };
    const init = () => {
      if (ytPlayerRef.current) {
        ytPlayerRef.current.loadVideoById(ytSong.youtubeId);
        setYtPlaying(true);
        startPolling();
      } else if (ytContainerRef.current) {
        ytPlayerRef.current = new window.YT.Player(ytContainerRef.current, {
          videoId: ytSong.youtubeId,
          playerVars: { autoplay: 1, controls: 0, rel: 0, playsinline: 1 },
          events: {
            onReady: (e: { target: { playVideo: () => void } }) => {
              e.target.playVideo();
              startPolling();
            },
            onStateChange: (e: { data: number }) => {
              setYtPlaying(e.data === 1);
              if (e.data === 0) setYtProgress(p => ({ ...p, current: p.duration }));
            },
          },
        });
      }
    };
    if (ytApiReady.current) { init(); }
    else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); ytApiReady.current = true; init(); };
    }
    return () => { if (progressInterval.current) clearInterval(progressInterval.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ytSong]);

  function ytTogglePlay() {
    if (!ytPlayerRef.current) return;
    if (ytPlaying) ytPlayerRef.current.pauseVideo();
    else ytPlayerRef.current.playVideo();
  }

  function ytClose() {
    if (ytPlayerRef.current) { try { ytPlayerRef.current.stopVideo(); } catch { /* ok */ } }
    setYtSong(null);
    setYtPlaying(false);
    setYtProgress({ current: 0, duration: 0 });
  }

  // Escape closes player
  useEffect(() => {
    if (!ytSong) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") ytClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ytSong]);

  const noContext = (e: React.MouseEvent) => e.preventDefault();

  function go(delta: number) {
    setPage((p) => Math.max(1, Math.min(maxPage, p + delta)));
  }

  function jumpToSong(song: Song) {
    // Always switch to single-page so only the music sheet is visible,
    // not a spread where the adjacent page shows the next song's story.
    setLayout("single");
    setPage(Math.max(1, Math.min(totalPages, song.musicPage)));
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

  const btn = (active: boolean, label: string, onClick: () => void) => (
    <button
      onClick={onClick}
      style={{
        padding: "6px 14px",
        fontSize: 13,
        letterSpacing: ".06em",
        textTransform: "uppercase" as const,
        fontFamily: "inherit",
        background: active ? "#2a2218" : "transparent",
        color: active ? "#e8dcc8" : "#9a8e7a",
        border: `1px solid ${active ? "#4a3e28" : "#2a241c"}`,
        cursor: "pointer",
        whiteSpace: "nowrap" as const,
      }}
    >
      {label}
    </button>
  );

  const displayCurrent = scrubbing ? scrubValue : ytProgress.current;

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
      {/* Hidden YouTube player container */}
      <div style={{ position: "absolute", left: -9999, top: -9999, width: 320, height: 180, overflow: "hidden", pointerEvents: "none" }}>
        <div ref={ytContainerRef} />
      </div>

      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #2a2218",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-cormorant, Georgia, serif)",
              fontSize: "clamp(18px, 2.5vw, 24px)",
              fontWeight: 300,
              letterSpacing: ".04em",
              color: "#c9a04a",
            }}
          >
            Alma Adentro II
          </span>
          <span
            style={{
              fontSize: 12,
              color: "#6a6050",
              letterSpacing: ".06em",
              marginLeft: 14,
              textTransform: "uppercase",
              display: "inline" as const,
            }}
            className="hidden md:inline"
          >
            Cancionera de Sylvia Rexach &amp; Tutti Umpierre
          </span>
        </div>
        <Link
          href="https://www.maritzaida.com"
          style={{
            fontSize: 13,
            color: "#9a8e7a",
            textDecoration: "none",
            letterSpacing: ".03em",
            border: "1px solid #2a241c",
            padding: "6px 14px",
            whiteSpace: "nowrap" as const,
            userSelect: "text",
            WebkitUserSelect: "text",
          }}
        >
          Continue to Maritzaida.com →
        </Link>
      </div>

      {/* Controls */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#0d0b09",
          borderBottom: "1px solid #2a2218",
          padding: "10px 16px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          {btn(tocOpen, ui.toc, () => setTocOpen((o) => !o))}
          <span className="hidden md:flex" style={{ display: "flex", gap: 6 }}>
            {btn(layout === "spread", ui.spread, () => changeLayout("spread"))}
            {btn(layout === "single", ui.single, () => changeLayout("single"))}
          </span>
          <div style={{ display: "flex", gap: 2, alignItems: "center", marginLeft: 4 }}>
            <button
              onClick={() => setZoom(z => Math.max(0.5, +(z - 0.25).toFixed(2)))}
              disabled={zoom <= 0.5}
              title="Zoom out"
              style={{
                width: 30, height: 30, background: "transparent",
                border: "1px solid #2a241c", color: zoom <= 0.5 ? "#3a3028" : "#c9a04a",
                cursor: zoom <= 0.5 ? "default" : "pointer",
                fontSize: 16, lineHeight: 1,
              }}
            >−</button>
            <span style={{ fontSize: 11, color: "#6a6050", minWidth: 32, textAlign: "center" }}>
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(z => Math.min(2.0, +(z + 0.25).toFixed(2)))}
              disabled={zoom >= 2.0}
              title="Zoom in"
              style={{
                width: 30, height: 30, background: "transparent",
                border: "1px solid #2a241c", color: zoom >= 2.0 ? "#3a3028" : "#c9a04a",
                cursor: zoom >= 2.0 ? "default" : "pointer",
                fontSize: 16, lineHeight: 1,
              }}
            >+</button>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button
            onClick={() => go(-1)}
            disabled={page <= 1}
            style={{
              width: 34, height: 34, background: "transparent",
              border: "1px solid #2a241c", color: "#c9a04a",
              cursor: page <= 1 ? "default" : "pointer",
              opacity: page <= 1 ? .3 : 1, fontSize: 16,
            }}
          >←</button>
          <form onSubmit={handleJump} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 13, color: "#7a7060" }}>{ui.page}</span>
            <input
              type="text"
              inputMode="numeric"
              value={jumpInput || String(page)}
              onChange={(e) => setJumpInput(e.target.value)}
              onFocus={() => setJumpInput("")}
              style={{
                width: 44, padding: "4px 6px", textAlign: "center",
                background: "#0d0b09", border: "1px solid #2a241c",
                color: "#e8dcc8", fontSize: 13, fontFamily: "inherit",
              }}
            />
            <span style={{ fontSize: 13, color: "#7a7060" }}>{ui.of} {maxPage}</span>
          </form>
          <button
            onClick={() => go(1)}
            disabled={page >= maxPage}
            style={{
              width: 34, height: 34, background: "transparent",
              border: "1px solid #2a241c", color: "#c9a04a",
              cursor: page >= maxPage ? "default" : "pointer",
              opacity: page >= maxPage ? .3 : 1, fontSize: 16,
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
              width: "min(300px, 88vw)",
              minHeight: "calc(100vh - 130px)",
              background: "#0a0906",
              borderRight: "1px solid #2a2218",
              overflowY: "auto",
              flexShrink: 0,
              position: "sticky",
              top: 48,
              maxHeight: "calc(100vh - 48px)",
            }}
          >
            <div style={{ padding: "12px 0 48px" }}>
              {songs.map((song) => (
                <div
                  key={song.id}
                  style={{
                    padding: "11px 16px",
                    borderBottom: "1px solid #1a1610",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    onClick={() => jumpToSong(song)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#e8dcc8",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: 0,
                      fontSize: 14,
                      lineHeight: 1.4,
                      fontFamily: "inherit",
                      flex: 1,
                    }}
                  >
                    <span style={{ color: "#6a6050", fontSize: 11, display: "block", marginBottom: 2 }}>
                      {song.id}.
                    </span>
                    {song.title[lang]}
                  </button>
                  <button
                    onClick={() => setYtSong(song)}
                    title={ui.listen}
                    style={{
                      background: "none",
                      border: "1px solid #3a3020",
                      color: "#c9a04a",
                      cursor: "pointer",
                      padding: "4px 10px",
                      fontSize: 13,
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
          <div style={{ flex: 1, textAlign: "center", padding: "80px 24px", color: "#7a7060", fontSize: 15 }}>
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
              padding: "16px 0 96px",
              position: "relative",
            }}
          >
            {loading && (
              <div
                style={{
                  position: "absolute", inset: 0, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  background: "rgba(13,11,9,0.75)", zIndex: 10, fontSize: 13,
                  color: "#c9a04a", letterSpacing: ".15em", textTransform: "uppercase",
                }}
              >
                {ui.loading}
              </div>
            )}

            {/* Left page-turn handle */}
            <button
              onClick={() => go(-1)}
              disabled={page <= 1}
              aria-label="Previous page"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "clamp(44px, 10%, 80px)",
                background: "transparent",
                border: "none",
                cursor: page <= 1 ? "default" : "pointer",
                opacity: page <= 1 ? 0 : 1,
                zIndex: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingLeft: 12,
                transition: "opacity .15s",
              }}
              className="page-handle"
            >
              <span style={{
                fontSize: 32,
                color: "#c9a04a",
                opacity: 0.6,
                lineHeight: 1,
                pointerEvents: "none",
              }}>‹</span>
            </button>

            <canvas
              ref={leftRef}
              onContextMenu={noContext}
              style={{
                maxWidth: layout === "spread"
                  ? `calc(${50 * zoom}% - 4px)`
                  : `min(${820 * zoom}px, ${100 * zoom}%)`,
                maxHeight: zoom > 1 ? "none" : "88vh",
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
                  maxWidth: `calc(${50 * zoom}% - 4px)`,
                  maxHeight: zoom > 1 ? "none" : "88vh",
                  objectFit: "contain",
                  display: "block",
                  background: "#f5f0e8",
                }}
              />
            )}

            {/* Right page-turn handle */}
            <button
              onClick={() => go(1)}
              disabled={page >= maxPage}
              aria-label="Next page"
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "clamp(44px, 10%, 80px)",
                background: "transparent",
                border: "none",
                cursor: page >= maxPage ? "default" : "pointer",
                opacity: page >= maxPage ? 0 : 1,
                zIndex: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 12,
                transition: "opacity .15s",
              }}
              className="page-handle"
            >
              <span style={{
                fontSize: 32,
                color: "#c9a04a",
                opacity: 0.6,
                lineHeight: 1,
                pointerEvents: "none",
              }}>›</span>
            </button>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div
        style={{
          borderTop: "1px solid #1e1a14",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: "#6a6050",
            lineHeight: 1.8,
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

      {/* Mini audio player bar */}
      {ytSong && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 200,
            background: "#111008",
            borderTop: "1px solid #3a3020",
            padding: "12px 20px 14px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          {/* Song title */}
          <div style={{ flex: "0 0 auto", maxWidth: "30%", minWidth: 0 }}>
            <div style={{
              fontSize: 11,
              color: "#6a6050",
              letterSpacing: ".08em",
              textTransform: "uppercase",
              marginBottom: 2,
            }}>
              {ui.listen}
            </div>
            <div style={{
              fontSize: 14,
              color: "#c9a04a",
              fontFamily: "var(--font-cormorant, Georgia, serif)",
              fontWeight: 300,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              {ytSong.title[lang]}
            </div>
          </div>

          {/* Play / Pause */}
          <button
            onClick={ytTogglePlay}
            style={{
              width: 40,
              height: 40,
              border: "1px solid #4a3e28",
              background: "transparent",
              color: "#c9a04a",
              cursor: "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {ytPlaying ? "⏸" : "▶"}
          </button>

          {/* Progress */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
            <span style={{ fontSize: 12, color: "#9a8e7a", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>
              {formatTime(displayCurrent)}
            </span>
            <div style={{ flex: 1, position: "relative" }}>
              <input
                type="range"
                min={0}
                max={ytProgress.duration || 1}
                step={0.5}
                value={displayCurrent}
                onChange={(e) => {
                  setScrubbing(true);
                  setScrubValue(Number(e.target.value));
                  setYtProgress(p => ({ ...p, current: Number(e.target.value) }));
                }}
                onMouseUp={(e) => {
                  ytPlayerRef.current?.seekTo(Number(e.currentTarget.value), true);
                  setScrubbing(false);
                }}
                onTouchEnd={(e) => {
                  ytPlayerRef.current?.seekTo(Number(e.currentTarget.value), true);
                  setScrubbing(false);
                }}
                style={{ width: "100%", accentColor: "#c9a04a", cursor: "pointer" }}
              />
            </div>
            <span style={{ fontSize: 12, color: "#6a6050", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>
              {formatTime(ytProgress.duration)}
            </span>
          </div>

          {/* Close */}
          <button
            onClick={ytClose}
            style={{
              background: "none",
              border: "1px solid #2a241c",
              color: "#7a7060",
              cursor: "pointer",
              padding: "5px 12px",
              fontSize: 12,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              fontFamily: "inherit",
              flexShrink: 0,
            }}
          >
            {ui.close}
          </button>
        </div>
      )}

      <style>{`
        @media print { * { display: none !important; } }
        @media (max-width: 767px) {
          .hidden.md\\:flex { display: none !important; }
          .hidden.md\\:inline { display: none !important; }
        }
        .page-handle:hover span { opacity: 1 !important; }
        .page-handle:first-of-type:hover { background: linear-gradient(to right, rgba(201,160,74,0.08), transparent) !important; }
        .page-handle:last-of-type:hover { background: linear-gradient(to left, rgba(201,160,74,0.08), transparent) !important; }
        input[type=range] {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: #2a241c;
          border-radius: 2px;
          outline: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #c9a04a;
          cursor: pointer;
        }
        input[type=range]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #c9a04a;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
