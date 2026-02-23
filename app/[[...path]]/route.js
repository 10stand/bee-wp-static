import { readFile, stat } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ROOT_DIR = process.cwd();
const ROOT_DIR_WITH_SEP = ROOT_DIR.endsWith(path.sep) ? ROOT_DIR : `${ROOT_DIR}${path.sep}`;

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf"
};

function guessContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return CONTENT_TYPES[ext] || "application/octet-stream";
}

function normalizeSegments(paramsPath) {
  if (!Array.isArray(paramsPath)) return [];
  return paramsPath.filter(Boolean);
}

async function existsFile(filePath) {
  try {
    const info = await stat(filePath);
    return info.isFile();
  } catch {
    return false;
  }
}

async function resolveTargetFile(segments) {
  const requestPath = segments.join("/");
  const rawTarget = path.resolve(ROOT_DIR, requestPath || ".");

  if (!(rawTarget === ROOT_DIR || rawTarget.startsWith(ROOT_DIR_WITH_SEP))) {
    return null;
  }

  const candidates = [];

  if (segments.length === 0) {
    candidates.push(path.join(ROOT_DIR, "index.html"));
  } else {
    candidates.push(rawTarget);
    candidates.push(`${rawTarget}.html`);
    candidates.push(path.join(rawTarget, "index.html"));
  }

  for (const candidate of candidates) {
    if (!(candidate === ROOT_DIR || candidate.startsWith(ROOT_DIR_WITH_SEP))) continue;
    if (await existsFile(candidate)) return candidate;
  }

  return null;
}

export async function GET(_request, { params }) {
  const segments = normalizeSegments(params?.path);

  const first = segments[0];
  if (first === "_next") {
    return new Response("Not Found", { status: 404 });
  }

  const filePath = await resolveTargetFile(segments);
  if (!filePath) {
    return new Response("Not Found", { status: 404 });
  }

  const body = await readFile(filePath);
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": guessContentType(filePath),
      "cache-control": filePath.endsWith(".html")
        ? "no-cache"
        : "public, max-age=31536000, immutable"
    }
  });
}
