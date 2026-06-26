import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "Rarestar Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFontFile(name: string): Promise<Buffer> {
  const p = path.join(process.cwd(), "src", "app", "_fonts", name);
  return readFile(p);
}

async function loadAssetDataUrl(name: string): Promise<string> {
  const p = path.join(process.cwd(), "public", "brand", name);
  const data = await readFile(p);
  return `data:image/png;base64,${data.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const [fraunces, mono, studioLockup] = await Promise.all([
    loadFontFile("Fraunces-Regular.ttf"),
    loadFontFile("JetBrainsMono-Medium.ttf"),
    loadAssetDataUrl("studio-lockup-paper.png")
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
          padding: "62px 76px",
          background: "#050505",
          color: "#f7f7f4",
          fontFamily: "Fraunces",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -70,
            bottom: -80,
            width: 440,
            height: 440,
            border: "1px solid rgba(207,0,0,0.38)",
            borderRadius: 999
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 118,
            bottom: 116,
            width: 18,
            height: 18,
            background: "#cf0000"
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <img src={studioLockup} alt="" width={338} height={85} style={{ objectFit: "contain" }} />
          <div
            style={{
              display: "flex",
              fontFamily: "JetBrains Mono",
              fontSize: 15,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(247,247,244,0.52)"
            }}
          >
            rarestar.studio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 910 }}>
          <div
            style={{
              display: "flex",
              fontSize: 116,
              lineHeight: 0.94,
              letterSpacing: 0,
              color: "#f7f7f4"
            }}
          >
            Products with a
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 116,
              lineHeight: 0.94,
              letterSpacing: 0,
              color: "#cf0000"
            }}
          >
            point of view.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            width: "100%",
            fontFamily: "JetBrains Mono"
          }}
        >
          <div
            style={{
              display: "flex",
              maxWidth: 610,
              fontSize: 16,
              lineHeight: 1.55,
              color: "rgba(247,247,244,0.72)"
            }}
          >
            A focused product studio building software, AI systems, and new ventures.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 14,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(247,247,244,0.48)"
            }}
          >
            Software / AI / Ventures
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
