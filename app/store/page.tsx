import type { Metadata } from "next";
import StoreContent from "@/components/pages/StoreContent";

export const metadata: Metadata = {
  title: "Store | Maritzaida",
  description: "Purchase Maritzaida CDs. Ships to the US and Puerto Rico.",
  alternates: { canonical: "/store" },
};

export default function StorePage() {
  return <StoreContent />;
}
