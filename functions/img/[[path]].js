// Pages Functions：把 /img/* 反代到原图床（CF 边缘内部访问，不受国内线路影响）
// 顺带：转发 Range（视频拖动）、修正 content-type（图床对 mp4 回 octet-stream，浏览器拒播）
const EXT_TYPES = {
  mp4: "video/mp4", webm: "video/webm", mov: "video/quicktime", m4v: "video/mp4",
  mp3: "audio/mpeg", m4a: "audio/mp4", ogg: "audio/ogg", wav: "audio/wav",
  jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp",
  gif: "image/gif", avif: "image/avif", svg: "image/svg+xml", bmp: "image/bmp", ico: "image/x-icon",
};

export async function onRequest(context) {
  const req = context.request;
  const url = new URL(req.url);
  const bare = url.pathname.replace(/^\/img/, "");
  const target = new URL(bare + url.search, "https://img.akakahome.cc.cd");

  const fwd = new Headers();
  for (const name of ["accept", "range", "if-none-match", "if-modified-since"]) {
    const v = req.headers.get(name);
    if (v) fwd.set(name, v);
  }

  const upstream = await fetch(target.toString(), {
    method: req.method,
    headers: fwd,
    redirect: "follow",
  });

  const headers = new Headers(upstream.headers);
  headers.delete("set-cookie");
  const ct = headers.get("content-type") || "";
  if (!ct || ct.includes("octet-stream")) {
    const ext = (bare.split(".").pop() || "").toLowerCase();
    if (EXT_TYPES[ext]) headers.set("content-type", EXT_TYPES[ext]);
  }
  headers.set("cache-control", "public, max-age=31536000, immutable");
  headers.set("access-control-allow-origin", "*");

  return new Response(upstream.body, { status: upstream.status, headers });
}
