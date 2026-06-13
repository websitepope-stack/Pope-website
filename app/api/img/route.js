import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";

// The CMS at api.popememorialhss.org serves raw, uncompressed uploads
// (often 5-13MB). Next.js's built-in image optimizer aborts upstream
// fetches after a hardcoded 7s, so those originals time out. This route
// fetches the original with a more generous timeout, downsizes it with
// sharp, and caches the result on disk so future requests are instant.
const ALLOWED_HOSTS = ["api.popememorialhss.org"];
const ALLOWED_WIDTHS = [200, 320, 480, 640, 768, 1024, 1280, 1600, 1920, 2560];
const CACHE_DIR = path.join(process.cwd(), ".next", "cache", "cms-images");

function clampWidth(input) {
  const n = Number(input);
  if (!Number.isFinite(n) || n <= 0) return 1280;
  return ALLOWED_WIDTHS.find((w) => w >= n) ?? ALLOWED_WIDTHS[ALLOWED_WIDTHS.length - 1];
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const src = searchParams.get("src");
  const width = clampWidth(searchParams.get("w"));

  if (!src) {
    return NextResponse.json({ error: "Missing src" }, { status: 400 });
  }

  let parsed;
  try {
    parsed = new URL(src);
  } catch {
    return NextResponse.json({ error: "Invalid src" }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
    return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
  }

  const cacheKey = crypto.createHash("sha1").update(`${src}|${width}`).digest("hex");
  const cachePath = path.join(CACHE_DIR, `${cacheKey}.webp`);

  const cached = await fs.readFile(cachePath).catch(() => null);
  if (cached) {
    return new Response(cached, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  let buffer;
  try {
    const res = await fetch(src, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) {
      return NextResponse.json({ error: "Upstream fetch failed" }, { status: 502 });
    }
    buffer = Buffer.from(await res.arrayBuffer());
  } catch {
    return NextResponse.json({ error: "Upstream fetch timed out" }, { status: 504 });
  }

  let output;
  try {
    output = await sharp(buffer)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();
  } catch {
    return NextResponse.json({ error: "Image processing failed" }, { status: 500 });
  }

  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(cachePath, output).catch(() => {});

  return new Response(output, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
