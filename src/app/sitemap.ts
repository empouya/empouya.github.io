import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";
import { projects } from "@/content/projects";
import { staticSitemapRoutes } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    const staticPages = staticSitemapRoutes.map((route) => ({
        url: route.href === "/" ? siteUrl : `${siteUrl}${route.href}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));

    const projectPages = projects.map((project) => ({
        url: `${siteUrl}/projects/${project.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticPages, ...projectPages];
}
