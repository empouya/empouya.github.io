import type { ReactNode } from "react";
import AppearanceProvider from "@/components/appearance/AppearanceProvider";
import PortfolioNavigation from "./PortfolioNavigation";
import PortfolioFooter from "./PortfolioFooter";

// All routes share one appearance boundary, including static error pages.
export default function SiteShell({ children }: { children: ReactNode }) {
    return (
        <AppearanceProvider>
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <PortfolioNavigation />
            {children}
            <PortfolioFooter />
        </AppearanceProvider>
    );
}
