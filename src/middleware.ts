import { NextRequest, NextResponse } from "next/server";
import { getSiteFromHostname } from "@/lib/subdomain";

/**
 * Middleware — routes requests to the site matching the hostname.
 *
 * ┌──────────────────────────────┬─────────────────────┐
 * │  Hostname                           │  Route group           │
 * ├─────────────────────────────────────┼────────────────────────┤
 * │  stringtheoryads.in                 │  /stringtheoryads/*    │
 * │  all other hosts                    │  /studio/*             │
 * └──────────────────────────────┴─────────────────────┘
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = (request.headers.get("host") ?? "localhost").toLowerCase().split(":")[0];

  // Preview the product without changing the production hostname routing.
  if (process.env.VERCEL_ENV === "preview" && pathname === "/stringtheoryads") {
    return NextResponse.next();
  }

  if (host === "www.stringtheoryads.in" || host === "stringtheoryads.rarestar.studio") {
    const canonical = request.nextUrl.clone();
    canonical.protocol = "https:";
    canonical.host = "stringtheoryads.in";
    canonical.port = "";
    return NextResponse.redirect(canonical, 308);
  }

  // Skip internal Next.js paths, API routes, and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/brand") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.png" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/opengraph-image" ||
    pathname === "/twitter-image" ||
    pathname.startsWith("/hero") ||
    pathname.startsWith("/projects") ||
    pathname.endsWith(".html") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|mp4|webm|woff2?|ttf|css|js)$/)
  ) {
    return NextResponse.next();
  }

  const site = getSiteFromHostname(host);

  // Rewrite /path → /{site}/path
  const url = request.nextUrl.clone();
  url.pathname = `/${site}${pathname}`;

  const response = NextResponse.rewrite(url);
  // Set x-site header so downstream server components can read the site key
  response.headers.set("x-site", site);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except _next internals and files with extensions
     * that are clearly static assets. The middleware body has its own
     * early-return checks for anything that slips through.
     */
    "/((?!_next/static|_next/image).*)"
  ]
};
