import type { Metadata } from "next";
import SharonRileyContent from "@/components/pages/SharonRileyContent";

export const metadata: Metadata = {
  title: "Sylvia Rexach en la Voz de Sharon Riley | Maritzaida",
  description:
    "The story of the 1971 album Sylvia Rexach en la Voz de Sharon Riley — recorded by Sharon Riley Rexach and guitarist Tutti Umpierre, restored and released digitally with AJ Weibe as remastering engineer.",
  alternates: { canonical: "/sharon-riley-rexach" },
  openGraph: {
    title: "Sylvia Rexach en la Voz de Sharon Riley",
    description: "The lost 1971 album by Sharon Riley Rexach and Tutti Umpierre, restored to digital.",
    url: "/sharon-riley-rexach",
  },
};

export default function SharonRileyRexachPage() {
  return <SharonRileyContent />;
}
