import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maritzaida Radio",
  description: "Stream Música Bohemia & Bolero — live from the Maritzaida catalog.",
  alternates: { canonical: "/radio" },
  openGraph: {
    title: "Maritzaida Radio",
    description: "Stream Música Bohemia & Bolero — live from the Maritzaida catalog.",
    url: "/radio",
  },
};

// The radio iframe lives persistently in the root layout (PersistentRadio component)
// so it keeps playing when you navigate away. This page only provides metadata.
export default function RadioPage() {
  return null;
}
