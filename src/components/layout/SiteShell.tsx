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

// Migrated routes share one mounted provider; Contact keeps its shell until Task 8.
export default function SiteShell({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const route = pathname.replace(/\/$/, "") || "/";
    if (route === "/" || route === "/about" || route === "/projects" || route.startsWith("/projects/")) return (
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
