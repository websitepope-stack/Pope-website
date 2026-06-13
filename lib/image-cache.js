import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";

// The CMS at api.popememorialhss.org serves raw, uncompressed uploads
// (often 5-13MB). Downloading several of these at once (e.g. a 20-photo
// gallery page) saturates its bandwidth and causes individual requests to
// exceed even a generous timeout. To avoid that we:
//  - cap how many CMS downloads run at once
//  - download each source image only once (a "master" resize), then derive
//    every requested width from that local master with sharp
//  - persist both to disk outside `.next` so a rebuild/redeploy doesn't
//    throw the cache away
export const ALLOWED_HOSTS = ["api.popememorialhss.org"];
export const ALLOWED_WIDTHS = [200, 320, 480, 640, 768, 1024, 1280, 1600, 1920, 2560];

const MASTER_WIDTH = 2560;
const CACHE_ROOT = path.join(process.cwd(), ".cms-image-cache");
const MASTER_DIR = path.join(CACHE_ROOT, "master");
const DERIVED_DIR = path.join(CACHE_ROOT, "derived");

const MAX_CONCURRENT_FETCHES = 3;
let activeFetches = 0;
const fetchQueue = [];

function runNext() {
  if (activeFetches >= MAX_CONCURRENT_FETCHES) return;
  const job = fetchQueue.shift();
  if (!job) return;
  activeFetches++;
  job
    .fn()
    .then(job.resolve, job.reject)
    .finally(() => {
      activeFetches--;
      runNext();
    });
}

function withConcurrencyLimit(fn) {
  return new Promise((resolve, reject) => {
    fetchQueue.push({ fn, resolve, reject });
    runNext();
  });
}

export function clampWidth(input) {
  const n = Number(input);
  if (!Number.isFinite(n) || n <= 0) return 1280;
  return ALLOWED_WIDTHS.find((w) => w >= n) ?? ALLOWED_WIDTHS[ALLOWED_WIDTHS.length - 1];
}

function hashOf(input) {
  return crypto.createHash("sha1").update(input).digest("hex");
}

async function fetchOriginal(src) {
  let lastErr;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(src, { signal: AbortSignal.timeout(45000) });
      if (!res.ok) throw new Error(`Upstream responded ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr;
}

async function getMaster(src) {
  const masterPath = path.join(MASTER_DIR, `${hashOf(src)}.webp`);
  const cached = await fs.readFile(masterPath).catch(() => null);
  if (cached) return cached;

  const buffer = await withConcurrencyLimit(() => fetchOriginal(src));
  const master = await sharp(buffer)
    .rotate()
    .resize({ width: MASTER_WIDTH, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  await fs.mkdir(MASTER_DIR, { recursive: true });
  await fs.writeFile(masterPath, master).catch(() => {});
  return master;
}

export async function getOptimizedImage(src, width) {
  const w = clampWidth(width);
  const derivedPath = path.join(DERIVED_DIR, `${hashOf(src)}-${w}.webp`);
  const cached = await fs.readFile(derivedPath).catch(() => null);
  if (cached) return cached;

  const master = await getMaster(src);
  const derived =
    w >= MASTER_WIDTH
      ? master
      : await sharp(master)
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: 75 })
          .toBuffer();

  await fs.mkdir(DERIVED_DIR, { recursive: true });
  await fs.writeFile(derivedPath, derived).catch(() => {});
  return derived;
}
