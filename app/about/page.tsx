import type { Metadata } from "next";
import AboutContent from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "About | Maritzaida",
  description:
    "The story of Maritzaida — Puerto Rican vocalist and her husband/guitarist AJ Weibe, dedicated to preserving música bohemia and bolero through the timeless works of Sylvia Rexach and Tutti Umpierre.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Maritzaida",
    description: "The story of Puerto Rico's foremost voice in música bohemia and bolero.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
