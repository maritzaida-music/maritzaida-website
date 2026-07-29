import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed | Maritzaida",
  robots: { index: false, follow: false },
};

export default function StoreSuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: "var(--bg)" }}>
      <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)", fontFamily: "var(--font-inter)" }}>
        Order Confirmed
      </p>
      <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)", fontWeight: 300 }}>
        Thank You
      </h1>
      <p className="text-base max-w-md mb-10" style={{ color: "var(--text-muted)", fontWeight: 300 }}>
        Your CD is on its way. You'll receive a confirmation email shortly. Ships within 5–10 business days.
      </p>
      <Link
        href="/"
        className="px-8 py-3 text-xs tracking-widest uppercase font-medium"
        style={{ background: "var(--gold)", color: "var(--bg)", letterSpacing: "0.15em", fontFamily: "var(--font-inter)" }}
      >
        Back to Home
      </Link>
    </main>
  );
}
