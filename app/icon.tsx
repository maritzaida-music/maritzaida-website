import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0d0b09",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#C9A84C",
            fontSize: 22,
            fontWeight: 300,
            lineHeight: 1,
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.02em",
            marginTop: 1,
          }}
        >
          M
        </span>
      </div>
    ),
    { ...size }
  );
}
