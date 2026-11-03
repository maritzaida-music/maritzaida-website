import { NextResponse } from "next/server";
import manifest from "@/data/cancionera/manifest.json";

export async function GET() {
  return NextResponse.json({
    totalPages: manifest.totalPages,
    title: manifest.title,
    subtitle: manifest.subtitle,
  });
}
