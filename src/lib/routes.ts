export type SiteRoute = {
    href: "/" | "/projects" | "/about" | "/contact";
    label: "Home" | "Projects" | "About" | "Contact";
};

export const siteRoutes = {
    home: { href: "/", label: "Home" },
    projects: { href: "/projects", label: "Projects" },
    about: { href: "/about", label: "About" },
    contact: { href: "/contact", label: "Contact" },
} as const satisfies Record<string, SiteRoute>;

export const primaryNavigation = [
    siteRoutes.home,
    siteRoutes.projects,
    siteRoutes.about,
    siteRoutes.contact,
] as const;

export const resumeHref = "/resume/resume.pdf";

export const staticSitemapRoutes = [
    {
        ...siteRoutes.home,
        changeFrequency: "monthly",
        priority: 1,
    },
    {
        ...siteRoutes.about,
        changeFrequency: "monthly",
        priority: 0.8,
    },
    {
        ...siteRoutes.projects,
        changeFrequency: "weekly",
        priority: 0.9,
    },
    {
        ...siteRoutes.contact,
        changeFrequency: "monthly",
        priority: 0.7,
    },
] as const;
