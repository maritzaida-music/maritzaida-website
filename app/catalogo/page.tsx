import type { Metadata } from "next";
import CatalogoContent from "@/components/pages/CatalogoContent";

export const metadata: Metadata = {
  title: "Bohemia Catalog | Sylvia Rexach & Tutti Umpierre",
  description:
    "The recorded catalog of Sylvia Rexach and Tutti Umpierre as preserved by Maritzaida — songs from Radio Bohemia Volumen I, Alma Adentro, El Otro Camino, Sentimientos En Vivo, and more.",
  alternates: { canonical: "/catalogo" },
  openGraph: {
    title: "Sylvia Rexach & Tutti Umpierre — Recorded Catalog",
    description: "Songs from the Sylvia Rexach and Tutti Umpierre catalog as recorded by Maritzaida.",
    url: "/catalogo",
  },
};

export default function CatalogoPage() {
  return <CatalogoContent />;
}
