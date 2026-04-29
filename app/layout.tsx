import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageContext";
import LanguageSplash from "@/components/LanguageSplash";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.maritzaida.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Maritzaida | Música Bohemia & Bolero",
    template: "%s | Maritzaida",
  },
  description:
    "Maritzaida is a Puerto Rican vocalist dedicated to música bohemia and bolero, preserving the timeless legacy of composer Sylvia Rexach and guitarist Tutti Umpierre.",
  keywords: [
    "Maritzaida",
    "música bohemia",
    "bolero",
    "Puerto Rico",
    "Sylvia Rexach",
    "Tutti Umpierre",
    "bolero clásico",
    "Puerto Rican singer",
    "Latin music",
    "Sentimientos En Vivo",
    "Alma Adentro",
    "Radio Bohemia",
  ],
  authors: [{ name: "Maritzaida" }],
  creator: "Maritzaida",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Maritzaida",
    title: "Maritzaida | Música Bohemia & Bolero",
    description:
      "Puerto Rican vocalist dedicated to música bohemia and bolero, preserving the timeless legacy of Sylvia Rexach and Tutti Umpierre.",
    images: [
      {
        url: "/photos/20250828-SSP04706.jpg",
        width: 1200,
        height: 630,
        alt: "Maritzaida – Puerto Rican música bohemia and bolero vocalist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maritzaida | Música Bohemia & Bolero",
    description:
      "Puerto Rican vocalist dedicated to música bohemia and bolero, preserving the timeless legacy of Sylvia Rexach and Tutti Umpierre.",
    images: ["/photos/20250828-SSP04706.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const artistJsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Maritzaida",
  url: BASE_URL,
  image: `${BASE_URL}/photos/20250828-SSP04706.jpg`,
  description:
    "Maritzaida is a Puerto Rican vocalist dedicated to música bohemia and bolero, preserving the legacy of composer Sylvia Rexach and guitarist Tutti Umpierre.",
  genre: ["Música Bohemia", "Bolero", "Latin", "Classical Bolero"],
  foundingLocation: {
    "@type": "Place",
    name: "Puerto Rico",
  },
  sameAs: [
    "https://www.instagram.com/maritzaidamusic",
    "https://www.facebook.com/maritzaidamusic",
    "https://open.spotify.com/artist/4KjyjfCyhO5cxqbSI76WMb",
    "https://www.youtube.com/channel/UC_6FCmXCV-uzcypmvcaD8MA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(artistJsonLd) }}
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-6DXT4C3G66" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6DXT4C3G66');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <LanguageSplash />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
