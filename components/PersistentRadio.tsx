"use client";

import { usePathname } from "next/navigation";

export default function PersistentRadio() {
  const pathname = usePathname();
  const isActive = pathname === "/radio";

  return (
    <div
      aria-hidden={!isActive}
      style={{
        position: "fixed",
        // When active: fill the viewport below the nav.
        // When inactive: park off-screen left. position:fixed elements don't
        // create scrollbar overflow, and the iframe stays mounted + playing.
        top: isActive ? "64px" : 0,
        left: isActive ? 0 : "-100vw",
        width: "100vw",
        height: isActive ? "calc(100vh - 64px)" : "100vh",
        zIndex: isActive ? 10 : 0,
        pointerEvents: isActive ? "auto" : "none",
        background: "#0a0906",
      }}
    >
      <iframe
        src="/radio/index.html"
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
        title="Maritzaida Radio"
        allow="autoplay; encrypted-media"
      />
    </div>
  );
}
