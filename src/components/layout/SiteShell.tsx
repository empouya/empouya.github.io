"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "@/components/animations/PageTransition";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import AppearanceProvider from "@/components/appearance/AppearanceProvider";
import PortfolioNavigation from "./PortfolioNavigation";
import PortfolioFooter from "./PortfolioFooter";

// Keep the migrated shell mounted between Home and About to preserve appearance.
export default function SiteShell({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const route = pathname.replace(/\/$/, "") || "/";
    if (route === "/" || route === "/about") return (
        <AppearanceProvider>
            <PortfolioNavigation />
            {children}
            <PortfolioFooter />
        </AppearanceProvider>
    );
    return (
        <ThemeProvider>
            <Navbar />
            <PageTransition><div id="main-content">{children}</div></PageTransition>
            <Footer />
        </ThemeProvider>
    );
}
