import type { Metadata } from "next";
import ShowsContent from "@/components/pages/ShowsContent";

export const metadata: Metadata = {
  title: "Shows | Upcoming Performances",
  description:
    "Upcoming live shows and concert dates for Maritzaida — Puerto Rican música bohemia and bolero vocalist. Get tickets and find a performance near you.",
  alternates: { canonical: "/shows" },
  openGraph: {
    title: "Maritzaida | Shows",
    description: "Upcoming live performances by Maritzaida — música bohemia and bolero vocalist.",
    url: "/shows",
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  name: "Maritzaida Live Performances",
  organizer: { "@type": "MusicGroup", name: "Maritzaida" },
  description: "Live música bohemia and bolero performances by Maritzaida across Puerto Rico and beyond.",
};

export default function ShowsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <ShowsContent />
    </>
  );
}
