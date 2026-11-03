import CancioneraReader from "./CancioneraReader";
import manifest from "@/data/cancionera/manifest.json";

export const metadata = {
  title: "Alma Adentro II — Cancionera",
  robots: { index: false, follow: false },
};

export default function CancioneraPage() {
  return (
    <CancioneraReader
      totalPages={manifest.totalPages}
      songs={manifest.songs}
    />
  );
}
