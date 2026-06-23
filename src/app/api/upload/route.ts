import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

const SECRET = process.env.CASE_STUDY_DASHBOARD_SECRET;

/**
 * API for uploading project images locally.
 * Saves to public/projects/[filename]
 */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const secret = formData.get("secret") as string;

    if (!SECRET || secret !== SECRET) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create directory if it doesn't exist
    const dir = join(process.cwd(), "public", "projects");
    await mkdir(dir, { recursive: true });

    // Clean filename and save
    const filename = file.name.replace(/\s+/g, "-").toLowerCase();
    const path = join(dir, filename);
    await writeFile(path, buffer);

    return NextResponse.json({ 
      success: true, 
      url: `/projects/${filename}` 
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
