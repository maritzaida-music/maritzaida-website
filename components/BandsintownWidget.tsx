"use client";

import { useEffect } from "react";

interface Props {
  artistName: string;
}

export default function BandsintownWidget({ artistName }: Props) {
  useEffect(() => {
    // Load Bandsintown widget script if not already loaded
    if (!document.querySelector('script[src*="bandsintown"]')) {
      const script = document.createElement("script");
      script.src = "https://widget.bandsintown.com/main.min.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full">
      {/* Bandsintown embedded widget */}
      <a
        className="bit-widget-initializer"
        data-artist-name={artistName}
        data-display-local-dates="false"
        data-display-past-dates="false"
        data-auto-style="false"
        data-widget-width="100%"
        data-notify-me-btn-bg-color="#c9a04a"
        data-notify-me-btn-text-color="#0d0b09"
        data-display-limit="10"
        data-link-color="#c9a04a"
        data-background-color="transparent"
        data-separator-color="rgba(201, 160, 74, 0.15)"
        data-text-color="#f5ede0"
        data-display-lineup="false"
        data-language="en"
        data-country-filter=""
        data-tracking-name="none"
        href={`https://www.bandsintown.com/a/${encodeURIComponent(artistName)}?came_from=67&app_id=maritzaida-website`}
      />
    </div>
  );
}
