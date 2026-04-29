import type { Metadata } from "next";
import HomeContent from "@/components/pages/HomeContent";

export const metadata: Metadata = {
  title: "Maritzaida | Música Bohemia & Bolero",
  description:
    "Official website of Maritzaida — Puerto Rican vocalist dedicated to música bohemia and bolero, honoring the legacy of Sylvia Rexach and Tutti Umpierre.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomeContent />;
}
