import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0d0b09",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#C9A84C",
            fontSize: 120,
            fontWeight: 300,
            lineHeight: 1,
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.02em",
            marginTop: 6,
          }}
        >
          M
        </span>
      </div>
    ),
    { ...size }
  );
}
