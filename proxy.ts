import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host === "cancionera.maritzaida.com") {
    const url = request.nextUrl.clone();
    if (url.pathname === "/" || url.pathname === "") {
      url.pathname = "/test-book";
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // Redirect /test-book on main domain to the subdomain
  const { pathname } = request.nextUrl;
  if (pathname === "/test-book" && !host.startsWith("cancionera.")) {
    return NextResponse.redirect("https://cancionera.maritzaida.com", { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
