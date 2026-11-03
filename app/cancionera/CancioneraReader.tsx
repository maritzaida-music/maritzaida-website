"use client";

import { useEffect, useRef, useCallback, useState } from "react";

type Lang = "en" | "es";
type Chords = "standard" | "fixeddo";
type Layout = "spread" | "single";

const UI = {
  en: {
    lang: "English",
    langToggle: "Español",
    chordsLabel: "Chords",
    standard: "Standard",
    fixedDo: "Fixed-Do",
    spread: "Two Pages",
    single: "Single Page",
    page: "Page",
    of: "of",
    loading: "Loading…",
    prev: "←",
    next: "→",
  },
  es: {
    lang: "Español",
    langToggle: "English",
    chordsLabel: "Acordes",
    standard: "Estándar",
    fixedDo: "Do fijo",
    spread: "Dos páginas",
    single: "Página única",
    page: "Página",
    of: "de",
    loading: "Cargando…",
    prev: "←",
    next: "→",
  },
};

function pageUrl(lang: Lang, chords: Chords, page: number) {
  return `/api/cancionera/page?lang=${lang}&chords=${chords}&p=${page}`;
}

async function drawPage(
  canvas: HTMLCanvasElement,
  url: string
): Promise<void> {
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
  intro,
}: {
  totalPages: number;
  intro: React.ReactNode;
}) {
  const [lang, setLang] = useState<Lang>("en");
  const [chords, setChords] = useState<Chords>("standard");
  const [layout, setLayout] = useState<Layout>("spread");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jumpInput, setJumpInput] = useState("");

  const leftRef = useRef<HTMLCanvasElement>(null);
  const rightRef = useRef<HTMLCanvasElement>(null);

  const ui = UI[lang];

  // Clamp page to valid range for current layout
  const maxPage = layout === "spread" ? Math.ceil(totalPages / 2) : totalPages;

  const load = useCallback(async () => {
    if (totalPages === 0) return;
    setLoading(true);
    try {
      if (layout === "spread") {
        const leftPage = page * 2 - 1;
        const rightPage = page * 2;
        const tasks: Promise<void>[] = [];
        if (leftRef.current) {
          tasks.push(drawPage(leftRef.current, pageUrl(lang, chords, leftPage)));
        }
        if (rightRef.current && rightPage <= totalPages) {
          tasks.push(drawPage(rightRef.current, pageUrl(lang, chords, rightPage)));
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
        if (leftRef.current) {
          await drawPage(leftRef.current, pageUrl(lang, chords, page));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [lang, chords, layout, page, totalPages]);

  useEffect(() => {
    load();
  }, [load]);

  // Block print
  useEffect(() => {
    const blockPrint = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("keydown", blockPrint, true);
    return () => window.removeEventListener("keydown", blockPrint, true);
  }, []);

  // Block context menu on canvases
  const noContextMenu = (e: React.MouseEvent) => e.preventDefault();

  function go(delta: number) {
    setPage((p) => Math.max(1, Math.min(maxPage, p + delta)));
  }

  function handleJump(e: React.FormEvent) {
    e.preventDefault();
    const n = parseInt(jumpInput, 10);
    if (!isNaN(n)) setPage(Math.max(1, Math.min(maxPage, n)));
    setJumpInput("");
  }

  function changeLang(l: Lang) {
    setLang(l);
  }

  function changeChords(c: Chords) {
    setChords(c);
  }

  function changeLayout(l: Layout) {
    setLayout(l);
    setPage(1);
  }

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
      {/* Intro */}
      {intro && (
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-8">
          {intro}
        </div>
      )}

      {/* Controls */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#0d0b09",
          borderBottom: "1px solid #2a2520",
          padding: "12px 24px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "12px",
          justifyContent: "space-between",
        }}
      >
        {/* Left: lang + chords */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {/* Language */}
          <div style={{ display: "flex", gap: 4 }}>
            {(["en", "es"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => changeLang(l)}
                style={{
                  padding: "5px 12px",
                  fontSize: 11,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  fontFamily: "inherit",
                  background: lang === l ? "#c9a04a" : "transparent",
                  color: lang === l ? "#0d0b09" : "#a09080",
                  border: `1px solid ${lang === l ? "#c9a04a" : "#2a2520"}`,
                  cursor: "pointer",
                }}
              >
                {l === "en" ? "English" : "Español"}
              </button>
            ))}
          </div>

          {/* Chords */}
          <div style={{ display: "flex", gap: 4 }}>
            {(["standard", "fixeddo"] as Chords[]).map((c) => (
              <button
                key={c}
                onClick={() => changeChords(c)}
                style={{
                  padding: "5px 12px",
                  fontSize: 11,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  fontFamily: "inherit",
                  background: chords === c ? "#c9a04a" : "transparent",
                  color: chords === c ? "#0d0b09" : "#a09080",
                  border: `1px solid ${chords === c ? "#c9a04a" : "#2a2520"}`,
                  cursor: "pointer",
                }}
              >
                {c === "standard" ? ui.standard : ui.fixedDo}
              </button>
            ))}
          </div>

          {/* Layout */}
          <div style={{ display: "flex", gap: 4 }}>
            {(["spread", "single"] as Layout[]).map((l) => (
              <button
                key={l}
                onClick={() => changeLayout(l)}
                style={{
                  padding: "5px 12px",
                  fontSize: 11,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  fontFamily: "inherit",
                  background: layout === l ? "#3a3020" : "transparent",
                  color: layout === l ? "#c9a04a" : "#a09080",
                  border: `1px solid ${layout === l ? "#3a3020" : "#2a2520"}`,
                  cursor: "pointer",
                }}
              >
                {l === "spread" ? ui.spread : ui.single}
              </button>
            ))}
          </div>
        </div>

        {/* Right: navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => go(-1)}
            disabled={page <= 1}
            style={{
              width: 32, height: 32, background: "transparent",
              border: "1px solid #2a2520", color: "#c9a04a",
              cursor: page <= 1 ? "default" : "pointer",
              opacity: page <= 1 ? .3 : 1, fontSize: 16,
            }}
          >
            {ui.prev}
          </button>
          <form onSubmit={handleJump} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 12, color: "#6a6058" }}>{ui.page}</span>
            <input
              type="text"
              inputMode="numeric"
              value={jumpInput || String(page)}
              onChange={(e) => setJumpInput(e.target.value)}
              onFocus={() => setJumpInput("")}
              style={{
                width: 44, padding: "4px 6px", textAlign: "center",
                background: "#0d0b09", border: "1px solid #2a2520",
                color: "#e8dcc8", fontSize: 12, fontFamily: "inherit",
              }}
            />
            <span style={{ fontSize: 12, color: "#6a6058" }}>{ui.of} {maxPage}</span>
          </form>
          <button
            onClick={() => go(1)}
            disabled={page >= maxPage}
            style={{
              width: 32, height: 32, background: "transparent",
              border: "1px solid #2a2520", color: "#c9a04a",
              cursor: page >= maxPage ? "default" : "pointer",
              opacity: page >= maxPage ? .3 : 1, fontSize: 16,
            }}
          >
            {ui.next}
          </button>
        </div>
      </div>

      {/* Reader area */}
      {totalPages === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 24px", color: "#6a6058", fontSize: 14 }}>
          Book not yet available.
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: layout === "spread" ? 8 : 0,
            padding: "32px 16px 64px",
            position: "relative",
          }}
        >
          {loading && (
            <div
              style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center",
                background: "rgba(13,11,9,0.7)", zIndex: 10, fontSize: 13,
                color: "#c9a04a", letterSpacing: ".15em", textTransform: "uppercase",
              }}
            >
              {ui.loading}
            </div>
          )}
          <canvas
            ref={leftRef}
            onContextMenu={noContextMenu}
            style={{
              maxWidth: layout === "spread" ? "calc(50vw - 32px)" : "min(800px, calc(100vw - 32px))",
              maxHeight: "85vh",
              objectFit: "contain",
              display: "block",
              background: "#f5f0e8",
            }}
          />
          {layout === "spread" && (
            <canvas
              ref={rightRef}
              onContextMenu={noContextMenu}
              style={{
                maxWidth: "calc(50vw - 32px)",
                maxHeight: "85vh",
                objectFit: "contain",
                display: "block",
                background: "#f5f0e8",
              }}
            />
          )}
        </div>
      )}

      {/* Print blocker */}
      <style>{`
        @media print { * { display: none !important; } }
      `}</style>
    </div>
  );
}
