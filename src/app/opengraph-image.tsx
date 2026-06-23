import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Node runtime (not edge) because we read TTFs from disk. These files live
// under src/app/_fonts/ and are copied into the build via Next's tracing.
// Satori (the engine powering ImageResponse) only accepts TTF/OTF/WOFF,
// NOT WOFF2, which is why we commit TTFs instead of pulling via CSS.
export const runtime = "nodejs";
export const alt = "RareStar — Creative agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFontFile(name: string): Promise<Buffer> {
  // process.cwd() is the rarestar-site package root in dev and prod.
  const p = path.join(process.cwd(), "src", "app", "_fonts", name);
  return readFile(p);
}

export default async function OpenGraphImage() {
  const [fraunces, mono] = await Promise.all([
    loadFontFile("Fraunces-Regular.ttf"),
    loadFontFile("JetBrainsMono-Medium.ttf")
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background:
            "radial-gradient(70% 90% at 15% 115%, rgba(255,74,28,0.35) 0%, rgba(255,74,28,0) 55%), #0a0a0a",
          color: "#f2efe8",
          // Satori default sans handles the paragraph; display + labels have
          // their own TTFs loaded below.
          fontFamily: "Fraunces"
        }}
      >
        {/* top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "JetBrains Mono",
              fontSize: 18,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#e8e3d6"
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#ff4a1c"
              }}
            />
            <div>RareStar</div>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "JetBrains Mono",
              fontSize: 16,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(242,239,232,0.55)"
            }}
          >
            rarestar.studio
          </div>
        </div>

        {/* main title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Fraunces"
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 150,
              lineHeight: 0.92,
              letterSpacing: "-0.025em",
              color: "#f2efe8"
            }}
          >
            We design
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 136,
              lineHeight: 0.92,
              letterSpacing: "-0.028em",
              color: "#ff4a1c"
            }}
          >
            websites and commerce.
          </div>
        </div>

        {/* bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <div
            style={{
              display: "flex",
              maxWidth: 640,
              fontFamily: "JetBrains Mono",
              fontSize: 16,
              lineHeight: 1.55,
              letterSpacing: "0.02em",
              color: "rgba(242,239,232,0.78)"
            }}
          >
            RareStar is a creative agency for brand identity, marketing websites,
            and headless Shopify stores.
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 8,
              fontFamily: "JetBrains Mono",
              fontSize: 14,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(242,239,232,0.6)"
            }}
          >
            <div style={{ display: "flex" }}>Brand · Web · Commerce</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 400 },
        { name: "JetBrains Mono", data: mono, style: "normal", weight: 500 }
      ]
    }
  );
}
