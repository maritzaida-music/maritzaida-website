import type { Metadata } from "next";
import EpkContent from "@/components/pages/EpkContent";

export const metadata: Metadata = {
  title: "EPK | Electronic Press Kit",
  description:
    "Electronic Press Kit for Maritzaida — Puerto Rican música bohemia and bolero vocalist. Bio, press photos, discography, accolades, and booking information.",
  alternates: { canonical: "/epk" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Maritzaida | Electronic Press Kit",
    description: "EPK for Puerto Rican música bohemia and bolero vocalist Maritzaida.",
    url: "/epk",
  },
};

export default function EpkPage() {
  return <EpkContent />;
}
