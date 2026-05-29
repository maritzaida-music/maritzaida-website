import type { Metadata } from "next";
import RadioBohemiaNewsContent from "@/components/pages/RadioBohemiaNewsContent";

export const metadata: Metadata = {
  title: "Radio Bohemia: A Revival of Sylvia Rexach's Golden Age",
  description:
    "Radio Bohemia is a multi-volume recording series led by Puerto Rican vocalist Maritzaida, created in tribute to the timeless artistry of Sylvia Rexach and Tutti Umpierre.",
  alternates: { canonical: "/news/radio-bohemia-volume-one" },
  robots: { index: false, follow: false },
};

export default function RadioBohemiaNewsPage() {
  return <RadioBohemiaNewsContent />;
}
