import { redirect } from "next/navigation";
import CancioneraReader from "./CancioneraReader";
import manifest from "@/data/cancionera/manifest.json";

export const metadata = {
  title: "Alma Adentro II — Cancionera",
  robots: { index: false, follow: false },
};

export default function CancioneraPage() {
  // When accessed directly (not via cancionera subdomain), show the reader.
  // The middleware rewrites cancionera.maritzaida.com/ → here.
  return (
    <CancioneraReader
      totalPages={manifest.totalPages}
      songs={manifest.songs}
    />
  );
}
