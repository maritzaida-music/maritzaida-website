"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

type Photo = { src: string; alt: string };

const photos: Photo[] = [
  { src: "/photos/LynnDonovanPhotography-7163.jpg", alt: "Maritzaida singing joyfully at the microphone" },
  { src: "/photos/20250828-SSP05075.jpg", alt: "Maritzaida singing with arm raised, AJ Weibe on guitar behind her" },
  { src: "/photos/20250828-SSP05092.jpg", alt: "Maritzaida performing on stage with Puerto Rico flag" },
  { src: "/photos/LynnDonovanPhotography-7171.jpg", alt: "Maritzaida at the microphone, arms wide open" },
  { src: "/photos/20250828-SSP04749.jpg", alt: "Maritzaida and AJ Weibe — black and white portrait" },
  { src: "/photos/LynnDonovanPhotography-7147.jpg", alt: "Maritzaida singing with arm raised, AJ Weibe in background" },
  { src: "/photos/20250828-SSP05157.jpg", alt: "AJ Weibe playing guitar on stage" },
  { src: "/photos/20250828-SSP05607.jpg", alt: "Maritzaida singing at the Martha Bassett Show" },
  { src: "/photos/LynnDonovanPhotography-7144.jpg", alt: "Maritzaida singing with eyes closed, hands on her chest" },
  { src: "/photos/20250828-SSP04706.jpg", alt: "Maritzaida — black and white portrait" },
  { src: "/photos/20250828-SSP05150.jpg", alt: "Maritzaida and AJ Weibe at the Martha Bassett Show" },
  { src: "/photos/tmbs16-1456.jpg", alt: "Maritzaida and AJ Weibe performing live" },
  { src: "/photos/LynnDonovanPhotography-7152.jpg", alt: "Maritzaida and band performing at The Crown, Greensboro" },
  { src: "/photos/LynnDonovanPhotography-7156.jpg", alt: "Maritzaida singing at the microphone with Puerto Rico flag" },
  { src: "/photos/LynnDonovanPhotography-7161.jpg", alt: "Maritzaida in profile, singing at the microphone" },
  { src: "/photos/LynnDonovanPhotography-7142.jpg", alt: "Maritzaida at the microphone holding a Puerto Rico flag" },
  { src: "/photos/LynnDonovanPhotography-3882.jpg", alt: "Maritzaida and full band at the Carolina Theatre, Greensboro" },
  { src: "/photos/LynnDonovanPhotography-0139.jpg", alt: "Wide view of Maritzaida and band performing at The Crown, Greensboro" },
  { src: "/photos/20250828-SSP05048.jpg", alt: "AJ Weibe playing guitar" },
  { src: "/photos/20250828-SSP05632.jpg", alt: "Maritzaida and AJ Weibe performing on stage" },
  { src: "/photos/A.J & Mara_023 1.jpg", alt: "Maritzaida with vintage microphone, AJ Weibe seated with guitar in background" },
  { src: "/photos/A.J & Mara_057 1.jpg", alt: "Maritzaida and AJ Weibe — studio press photo" },
  { src: "/photos/A.J & Mara_061 1.jpg", alt: "Maritzaida and AJ Weibe — studio portrait" },
  { src: "/photos/A.J & Mara_074 1 (1).jpg", alt: "Maritzaida and AJ Weibe laughing — studio photo" },
  { src: "/photos/A.J & Mara_084 1.jpg", alt: "Maritzaida and AJ Weibe — studio portrait" },
  { src: "/photos/A.J & Mara_108 1.jpg", alt: "Maritzaida and AJ Weibe — studio press photo" },
  { src: "/photos/A.J & Mara_127 1 (1).jpg", alt: "Maritzaida and AJ Weibe — portrait against dark background" },
  { src: "/photos/DSC09265.jpg", alt: "Maritzaida — portrait" },
  { src: "/photos/DSC09267.jpg", alt: "Maritzaida — smiling portrait" },
  { src: "/photos/DSC09270.jpg", alt: "Maritzaida — laughing portrait" },
  { src: "/photos/DSC09291.jpg", alt: "Maritzaida and AJ Weibe — portrait" },
  { src: "/photos/DSC09638 (1).jpg", alt: "Maritzaida singing live with AJ Weibe on guitar and upright bass in background" },
  { src: "/photos/DSC09669.jpg", alt: "Maritzaida laughing as AJ Weibe plays guitar, upright bass player in background" },
  { src: "/photos/FB_IMG_1694429759645.jpg", alt: "Maritzaida and AJ Weibe on an outdoor stage with Puerto Rico flag" },
  { src: "/photos/FB_IMG_1742593584542.jpg", alt: "Maritzaida and AJ Weibe performing before an audience" },
  { src: "/photos/IMG_20230908_173307.jpg", alt: "Maritzaida singing with her band, Puerto Rico flag at the mic" },
  { src: "/photos/IMG_20230911_124321.jpg", alt: "Maritzaida and full band performing before a packed house" },
  { src: "/photos/IMG_20230911_124326.jpg", alt: "Maritzaida performing with full band, Puerto Rico flag at mic" },
  { src: "/photos/IMG_20250525_210857.jpg", alt: "Maritzaida and Sharon Riley Rexach singing together in the studio" },
  { src: "/photos/IMG_20250525_210902.jpg", alt: "Maritzaida singing at a vintage microphone in the studio" },
  { src: "/photos/Maritzaida flatiron 2.25_01.jpg", alt: "Maritzaida and AJ Weibe performing in an intimate venue" },
  { src: "/photos/tmbs16-1749 (1).jpg", alt: "Maritzaida and AJ Weibe performing live" },
  { src: "/photos/tmbs16-297.jpg", alt: "Maritzaida singing, AJ Weibe on guitar" },
  { src: "/photos/tmbs16-360.jpg", alt: "AJ Weibe playing guitar, Maritzaida smiling in the background" },
  { src: "/photos/tmbs16-370 (1).jpg", alt: "Maritzaida singing, AJ Weibe on guitar" },
];

export default function PressPhotoGallery() {
  const [active, setActive] = useState<Photo | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {photos.map((photo) => (
          <button
            key={photo.src}
            onClick={() => setActive(photo)}
            className="group relative aspect-square rounded-sm overflow-hidden focus:outline-none focus-visible:ring-2"
            style={{ ["--tw-ring-color" as string]: "var(--gold)" }}
            aria-label={`View full photo: ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 17vw"
            />
            {/* hover overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "rgba(13,11,9,0.5)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(13,11,9,0.96)" }}
          onClick={close}
          role="dialog"
          aria-modal
          aria-label="Photo viewer"
        >
          {/* Card */}
          <div
            className="relative max-w-4xl w-full max-h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs tracking-widest uppercase" style={{ color: "var(--text-dim)", fontFamily: "var(--font-inter)" }}>
                {active.alt}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={active.src}
                  download
                  className="flex items-center gap-1.5 text-xs tracking-widest uppercase px-4 py-2 transition-opacity hover:opacity-80"
                  style={{ background: "var(--gold)", color: "var(--bg)", fontFamily: "var(--font-inter)", letterSpacing: "0.12em" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download
                </a>
                <button
                  onClick={close}
                  className="p-2 transition-opacity hover:opacity-60"
                  style={{ color: "var(--text-muted)" }}
                  aria-label="Close"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative w-full rounded-sm overflow-hidden" style={{ maxHeight: "80vh" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.src}
                alt={active.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
                style={{ display: "block" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
