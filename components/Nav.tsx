"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useLang } from "./LanguageContext";

export default function Nav() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [mobileMediaOpen, setMobileMediaOpen] = useState(false);
  const mediaRef = useRef<HTMLLIElement>(null);

  const mediaLinks = [
    { href: "/music", label: t("nav.music") },
    { href: "/videos", label: t("nav.videos") },
    { href: "/catalogo", label: t("nav.catalogo") },
  ];

  const topLinks = [
    { href: "/shows", label: t("nav.shows") },
    { href: "/epk", label: t("nav.epk") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const mediaActive = mediaLinks.some((l) => pathname === l.href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (mediaRef.current && !mediaRef.current.contains(e.target as Node)) {
        setMediaOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const linkStyle = (active: boolean) => ({
    color: active ? "var(--gold)" : "var(--text-muted)",
    fontFamily: "var(--font-inter)" as const,
    fontWeight: 500,
    letterSpacing: "0.12em",
  });

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(13, 11, 9, 0.95)"
          : "linear-gradient(to bottom, rgba(13,11,9,0.8), transparent)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201, 160, 74, 0.15)" : "none",
      }}
    >
      <nav
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="font-serif text-2xl tracking-widest uppercase"
          style={{ color: "var(--gold)", fontFamily: "var(--font-cormorant)" }}
        >
          Maritzaida
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {/* Language toggle */}
          <li>
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="text-sm tracking-widest uppercase transition-colors duration-200 border px-2 py-0.5"
              style={{
                color: "var(--gold)",
                borderColor: "var(--gold-muted)",
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                letterSpacing: "0.12em",
                fontSize: "0.65rem",
              }}
              aria-label={lang === "en" ? "Switch to Spanish" : "Switch to English"}
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
          </li>

          {/* Home */}
          <li>
            <Link
              href="/"
              className="hover-gold text-sm tracking-widest uppercase transition-colors duration-200"
              style={linkStyle(pathname === "/")}
            >
              {t("nav.home")}
            </Link>
          </li>

          {/* About (next to Home) */}
          <li>
            <Link
              href="/about"
              className="hover-gold text-sm tracking-widest uppercase transition-colors duration-200"
              style={linkStyle(pathname === "/about")}
            >
              {t("nav.about")}
            </Link>
          </li>

          {/* Media dropdown */}
          <li className="relative" ref={mediaRef}>
            <button
              onClick={() => setMediaOpen((o) => !o)}
              onMouseEnter={() => setMediaOpen(true)}
              className="hover-gold text-sm tracking-widest uppercase transition-colors duration-200 flex items-center gap-1"
              style={linkStyle(mediaActive)}
              aria-expanded={mediaOpen}
              aria-haspopup="true"
            >
              {t("nav.media")}
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="currentColor"
                style={{
                  transform: mediaOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                  opacity: 0.7,
                }}
              >
                <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </button>

            {/* Dropdown panel */}
            <div
              onMouseLeave={() => setMediaOpen(false)}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 py-2 min-w-[180px]"
              style={{
                background: "rgba(13, 11, 9, 0.97)",
                border: "1px solid rgba(201, 160, 74, 0.2)",
                backdropFilter: "blur(12px)",
                opacity: mediaOpen ? 1 : 0,
                pointerEvents: mediaOpen ? "auto" : "none",
                transform: `translateX(-50%) translateY(${mediaOpen ? "0" : "-6px"})`,
                transition: "opacity 0.2s, transform 0.2s",
              }}
            >
              {mediaLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMediaOpen(false)}
                  className="block px-5 py-2.5 text-xs tracking-widest uppercase hover-gold transition-colors duration-200"
                  style={linkStyle(pathname === href)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </li>

          {/* Remaining top-level links */}
          {topLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="hover-gold text-sm tracking-widest uppercase transition-colors duration-200"
                style={linkStyle(pathname === href)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              background: "var(--gold)",
              transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              background: "var(--gold)",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              background: "var(--gold)",
              transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "500px" : "0",
          background: "rgba(13, 11, 9, 0.97)",
          borderTop: menuOpen ? "1px solid rgba(201, 160, 74, 0.15)" : "none",
        }}
      >
        <ul className="px-6 py-4 flex flex-col gap-4" role="list">
          {/* Home */}
          <li>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm tracking-widest uppercase"
              style={linkStyle(pathname === "/")}
            >
              {t("nav.home")}
            </Link>
          </li>

          {/* About (next to Home) */}
          <li>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm tracking-widest uppercase"
              style={linkStyle(pathname === "/about")}
            >
              {t("nav.about")}
            </Link>
          </li>

          {/* Media accordion */}
          <li>
            <button
              onClick={() => setMobileMediaOpen((o) => !o)}
              className="flex items-center justify-between w-full py-2 text-sm tracking-widest uppercase"
              style={linkStyle(mediaActive)}
            >
              {t("nav.media")}
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="currentColor"
                style={{
                  transform: mobileMediaOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                  opacity: 0.7,
                }}
              >
                <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: mobileMediaOpen ? "200px" : "0" }}
            >
              {mediaLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => { setMenuOpen(false); setMobileMediaOpen(false); }}
                  className="block pl-4 py-2 text-xs tracking-widest uppercase"
                  style={{ ...linkStyle(pathname === href), borderLeft: "1px solid rgba(201,160,74,0.3)" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </li>

          {/* Remaining links */}
          {topLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-sm tracking-widest uppercase"
                style={linkStyle(pathname === href)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
