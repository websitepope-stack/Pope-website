// Fetches content from the Pope Memorial CMS backend.
// Every getter returns `null` on any failure so callers can fall back to
// the static content that ships with the site.

const API_URL = process.env.NEXT_PUBLIC_CMS_API_URL || "https://api.popememorialhss.org";

async function fetchData(endpoint) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export const getNotices = () => fetchData("/notices");
export const getStaff = () => fetchData("/staff");
export const getActivities = () => fetchData("/activities");
export const getAchievements = () => fetchData("/achievements");
export const getDioceses = () => fetchData("/dioceses");
export const getStreams = () => fetchData("/streams");
export const getVisionMission = () => fetchData("/vision_mission");
export const getRules = () => fetchData("/rules");
export const getContact = () => fetchData("/contact");
export const getAboutStats = () => fetchData("/about_stats");
export const getGallery = () => fetchData("/gallery");
export const getHeroImages = () => fetchData("/hero");
export const getHighlights = () => fetchData("/highlights");




// Images served from the local CMS backend (e.g. localhost:8000/uploads/...)
// can't go through Next.js's image optimizer, which refuses private/localhost
// IPs. Production CMS uploads (api.popememorialhss.org/uploads/...) are fine
// and should be optimized like any other remote image.
export function isLocalUpload(url) {
  return typeof url === "string" && /^https?:\/\/localhost(:\d+)?\//.test(url);
}

// Production CMS uploads are raw, multi-megabyte camera originals served
// slowly enough that Next.js's image optimizer (hardcoded 7s upstream fetch
// timeout) can't fetch them in time and returns 500s. Route those images
// through our own caching proxy (/api/img), which downloads with a longer
// timeout, downsizes with sharp, and caches the result. The proxy output is
// already optimized, so callers should set `unoptimized` based on the
// returned flag.
export function resolveImage(url, width = 1280) {
  if (typeof url !== "string") return { src: url, unoptimized: false };
  if (isLocalUpload(url)) return { src: url, unoptimized: true };
  if (/^https?:\/\/api\.popememorialhss\.org\//.test(url)) {
    return { src: `/api/img?src=${encodeURIComponent(url)}&w=${width}`, unoptimized: true };
  }
  return { src: url, unoptimized: false };
}

export async function submitContactForm(data) {
  const res = await fetch(`${API_URL}/contact_submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to send message");
  }
  return res.json();
}
