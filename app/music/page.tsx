import type { Metadata } from "next";
import MusicContent from "@/components/pages/MusicContent";

export const metadata: Metadata = {
  title: "Music | Discography",
  description:
    "Explore Maritzaida's full discography — música bohemia and bolero albums honoring the legacy of Sylvia Rexach and Tutti Umpierre.",
  alternates: { canonical: "/music" },
  openGraph: {
    title: "Maritzaida | Discography",
    description: "Full discography of Puerto Rican música bohemia and bolero vocalist Maritzaida.",
    url: "/music",
  },
};

export default function MusicPage() {
  return <MusicContent />;
}
