// Twitter Card reuses the same Open Graph image. The `runtime` export must be
// redeclared here (re-exports aren't recognised by Next.js's file convention
// compiler), but the handler and metadata are imported from the OG file.
import OgImage, { alt as ogAlt, size as ogSize, contentType as ogType } from "./opengraph-image";

export const runtime = "nodejs";
export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogType;

export default OgImage;
