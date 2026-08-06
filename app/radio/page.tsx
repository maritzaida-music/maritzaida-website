import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maritzaida Radio",
  description: "Stream Música Bohemia & Bolero — live from the Maritzaida catalog.",
  alternates: { canonical: "/radio" },
  openGraph: {
    title: "Maritzaida Radio",
    description: "Stream Música Bohemia & Bolero — live from the Maritzaida catalog.",
    url: "/radio",
  },
};

export default function RadioPage() {
  return (
    <div
      style={{
        position: "fixed",
        top: "64px",
        left: 0,
        right: 0,
        bottom: 0,
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
