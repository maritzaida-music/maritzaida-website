import type { Metadata } from "next";
import VideosContent from "@/components/pages/VideosContent";

export const metadata: Metadata = {
  title: "Videos | Music Videos & Performances",
  description:
    "Watch Maritzaida's music videos and live performance recordings — música bohemia and bolero from Puerto Rico's premier voice of the genre.",
  alternates: { canonical: "/videos" },
  openGraph: {
    title: "Maritzaida | Videos",
    description: "Music videos and live performances by bolero and música bohemia vocalist Maritzaida.",
    url: "/videos",
  },
};

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

const videoJsonLd = videos.map((v) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: v.title,
  description: v.description,
  thumbnailUrl: `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`,
  embedUrl: `https://www.youtube.com/embed/${v.id}`,
  uploadDate: "2024-01-01",
  publisher: { "@type": "Organization", name: "Maritzaida" },
}));

export default function VideosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <VideosContent />
    </>
  );
}
