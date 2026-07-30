"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/components/LanguageContext";

const products: {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  price: string;
  preOrder?: boolean;
  preOrderNote?: string;
}[] = [
  {
    id: "radio-bohemia-vol-2",
    title: "Radio Bohemia Volumen II",
    subtitle: "La Música de Sylvia Rexach y Tutti Umpierre",
    year: "2026",
    image: "/albums/radio-bohemia-vol-2.png",
    price: "$25",
    preOrder: true,
    preOrderNote: "Ships Mid-October 2026",
  },
  {
    id: "radio-bohemia-vol-1",
    title: "Radio Bohemia Volumen I",
    subtitle: "La Música de Sylvia Rexach y Tutti Umpierre",
    year: "2025",
    image: "/albums/radio-bohemia-vol-1.png",
    price: "$15",
  },
  {
    id: "sentimientos-en-vivo",
    title: "Sentimientos En Vivo",
    subtitle: "",
    year: "2025",
    image: "/albums/sentimientos-en-vivo-front.jpg",
    price: "$15",
  },
  {
    id: "alma-adentro",
    title: "Alma Adentro",
    subtitle: "La Música de Sylvia Rexach y Tutti Umpierre",
    year: "2024",
    image: "/albums/alma-adentro-front.jpg",
    price: "$15",
  },
  {
    id: "boleros-vol-2",
    title: "Boleros Clásicos Volumen II",
    subtitle: "",
    year: "2023",
    image: "/albums/boleros-clasicos-vol-2.jpg",
    price: "$15",
  },
  {
    id: "boleros-vol-1",
    title: "Boleros Clásicos Volumen I",
    subtitle: "",
    year: "2023",
    image: "/albums/boleros-clasicos-vol-1.jpg",
    price: "$15",
  },
];

const labels = {
  en: {
    label: "Store",
    heading: "Shop",
    sub: "CDs available for purchase. Ships to the US and Puerto Rico.",
    shipping: "+ $5 shipping",
    buy: "Buy CD",
    buying: "Loading…",
    note: "Secure checkout via Stripe. Ships within 5–10 business days.",
  },
  es: {
    label: "Tienda",
    heading: "Tienda",
    sub: "CDs disponibles para compra. Envíos a EE.UU. y Puerto Rico.",
    shipping: "+ $5 envío",
    buy: "Comprar CD",
    buying: "Cargando…",
    note: "Pago seguro vía Stripe. Envío en 5–10 días hábiles.",
  },
};

export default function StoreContent() {
  const { lang } = useLang();
  const l = labels[lang];
  const [loading, setLoading] = useState<string | null>(null);

  async function handleBuy(productId: string) {
    setLoading(productId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const { url, error } = await res.json();
      if (error || !url) throw new Error(error || "No URL");
      window.location.href = url;
    } catch (e) {
      setLoading(null);
      alert("Error: " + (e instanceof Error ? e.message : String(e)));
    }
  }

  return (
    <>
      {/* Page header */}
      <div className="relative pt-32 pb-24 overflow-hidden" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="absolute inset-0">
          <Image
            src="/photos/20250828-SSP05607.jpg"
            alt="Maritzaida performing live"
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(13,11,9,0.92) 40%, rgba(13,11,9,0.5) 100%)" }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
            {l.label}
          </p>
          <h1 className="text-5xl md:text-7xl" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontWeight: 300 }}>
            {l.heading}
          </h1>
          <span className="divider-gold" />
          <p className="text-base max-w-xl" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
            {l.sub}
          </p>
        </div>
      </div>

      {/* Product grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <article key={p.id} className="flex flex-col" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={p.image}
                  alt={`${p.title} – album cover`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {p.preOrder && (
                  <span
                    className="absolute top-3 left-3 px-2 py-1 text-xs tracking-widest uppercase"
                    style={{ background: "var(--gold)", color: "var(--bg)", fontFamily: "var(--font-inter)", letterSpacing: "0.12em" }}
                  >
                    Pre-Order
                  </span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>{p.year}</p>
                <h2 className="text-xl leading-tight mb-1" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}>
                  {p.title}
                </h2>
                {p.subtitle && (
                  <p className="text-xs mb-2 italic" style={{ color: "var(--text-muted)" }}>{p.subtitle}</p>
                )}
                {p.preOrderNote && (
                  <p className="text-xs mb-2" style={{ color: "var(--gold)" }}>{p.preOrderNote}</p>
                )}
                <div className="mt-auto pt-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-medium" style={{ color: "var(--text-primary)", fontFamily: "var(--font-cormorant)" }}>{p.price}</p>
                    <p className="text-xs" style={{ color: "var(--text-dim)" }}>{l.shipping}</p>
                  </div>
                  <button
                    onClick={() => handleBuy(p.id)}
                    disabled={loading === p.id}
                    className="px-6 py-2 text-xs tracking-widest uppercase font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
                    style={{ background: "var(--gold)", color: "var(--bg)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
                  >
                    {loading === p.id ? l.buying : p.preOrder ? "Pre-Order" : l.buy}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center text-xs" style={{ color: "var(--text-dim)" }}>
          {l.note}
        </p>
      </section>
    </>
  );
}
