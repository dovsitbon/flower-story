import type { MetadataRoute } from "next";
import site from "@/data/site.json";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/he/checkout", "/en/checkout", "/fr/checkout", "/es/checkout"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
