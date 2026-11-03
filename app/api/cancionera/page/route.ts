import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import manifest from "@/data/cancionera/manifest.json";

type PageMeta = { type: "commentary" | "music" };

// Which source folder to use for each (lang, chords) × page-type combination
function sourceFolder(
  lang: "en" | "es",
  chords: "standard" | "fixeddo",
  pageType: "commentary" | "music"
): "en" | "es" {
  if (pageType === "commentary") return lang;
  // music pages: standard chords live in en/, fixed-do in es/
  return chords === "standard" ? "en" : "es";
}

function padded(n: number): string {
  return String(n).padStart(3, "0");
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const lang = searchParams.get("lang");
  const chords = searchParams.get("chords");
  const pageParam = searchParams.get("p");

  if (
    (lang !== "en" && lang !== "es") ||
    (chords !== "standard" && chords !== "fixeddo") ||
    !pageParam
  ) {
    return new NextResponse("Bad request", { status: 400 });
  }

  const pageNum = parseInt(pageParam, 10);
  const pages = manifest.pages as PageMeta[];

  if (
    isNaN(pageNum) ||
    pageNum < 1 ||
    pageNum > pages.length
  ) {
    return new NextResponse("Page not found", { status: 404 });
  }

  const pageType = pages[pageNum - 1].type;
  const folder = sourceFolder(lang, chords, pageType);
  const filename = `page-${padded(pageNum)}.webp`;

  // Resolve strictly within data/cancionera/pages to prevent path traversal
  const pagesRoot = path.resolve(process.cwd(), "data/cancionera/pages");
  const filePath = path.join(pagesRoot, folder, filename);

  if (!filePath.startsWith(pagesRoot)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  let bytes: Buffer;
  try {
    bytes = await readFile(filePath);
  } catch {
    return new NextResponse("Page not found", { status: 404 });
  }

  return new NextResponse(bytes.buffer as ArrayBuffer, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
