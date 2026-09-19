"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "@/components/animations/PageTransition";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

// The new Home owns its shell and scoped theme. Unmigrated routes retain theirs.
export default function SiteShell({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    if (pathname === "/") return children;
    return (
        <ThemeProvider>
            <Navbar />
            <PageTransition><div id="main-content">{children}</div></PageTransition>
            <Footer />
        </ThemeProvider>
    );
}
