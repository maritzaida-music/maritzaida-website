import type { Metadata } from "next";
import ContactContent from "@/components/pages/ContactContent";

export const metadata: Metadata = {
  title: "Contact | Booking & Inquiries",
  description:
    "Book Maritzaida for concerts, events, and performances. Press and media inquiries welcome. Puerto Rican música bohemia and bolero vocalist.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Maritzaida",
    description: "Book Maritzaida for concerts and performances. Press and media inquiries welcome.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
