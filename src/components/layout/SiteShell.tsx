import type { ReactNode } from "react";
import AppearanceProvider from "@/components/appearance/AppearanceProvider";
import PortfolioNavigation from "./PortfolioNavigation";
import PortfolioFooter from "./PortfolioFooter";
import PageViews from "@/components/analytics/PageViews";
import { staticSitemapRoutes } from "@/lib/routes";
import { projects } from "@/content/projects";
import { canonicalPage } from "@/lib/analytics";

const trackedPaths = [...staticSitemapRoutes.map(route => canonicalPage(route.href)), ...projects.map(project => `/projects/${project.slug}/`)];

// All routes share one appearance boundary, including static error pages.
export default function SiteShell({ children }: { children: ReactNode }) {
    return (
        <AppearanceProvider>
            <PageViews paths={trackedPaths} />
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <PortfolioNavigation />
            {children}
            <PortfolioFooter />
        </AppearanceProvider>
    );
}
