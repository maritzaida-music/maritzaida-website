import type { Metadata } from "next";
import PressReleaseRBVIIContent from "@/components/pages/PressReleaseRBVIIContent";

export const metadata: Metadata = {
  title: "Radio Bohemia Volumen II – Press Release | Maritzaida",
  description:
    "Press release for Radio Bohemia Volumen II — releasing October 20, 2026 on SideHustle Records. A historical preservation project featuring four generations of Sylvia Rexach's family.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Radio Bohemia Volumen II – Press Release",
    description:
      "One Family. Four Generations. One Mission to Preserve Puerto Rican Música Bohemia. Releasing October 20, 2026.",
    images: [{ url: "/albums/radio-bohemia-vol-2.png", width: 1200, height: 1200, alt: "Radio Bohemia Volumen II album cover" }],
  },
};

export default function PressReleaseRBVIIPage() {
  return <PressReleaseRBVIIContent />;
}
