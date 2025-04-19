export default async function handler(req, res) {
  if (req.url === "/robots.txt") {
    const isProd = process.env.VERCEL_ENV === "production";
    res.setHeader("Content-Type", "text/plain");
    res.end("User-agent: *\nDisallow: /");
    return;
  }

  const { app } = await import("../dist/popfragg/server/server.mjs");
  return app()(req, res); // repassa a requisição pro app Angular SSR
}
