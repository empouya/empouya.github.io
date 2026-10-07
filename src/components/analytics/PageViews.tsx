"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { analyticsEndpoint, canonicalPage, sendPageView } from "@/lib/analytics";

const endpoint = analyticsEndpoint(process.env.NEXT_PUBLIC_ANALYTICS_URL);

export default function PageViews({ paths }: { paths: string[] }) {
    const pathname = usePathname();
    const lastPath = useRef<string | null>(null);

    useEffect(() => {
        if (!endpoint || !pathname || navigator.doNotTrack === "1") return;
        const path = canonicalPage(pathname);
        if (!paths.includes(path)) return;
        const record = () => {
            if (document.visibilityState !== "visible" || lastPath.current === path) return;
            lastPath.current = path;
            sendPageView(endpoint, path);
        };
        // Cleanup prevents duplicate sends during React's development effect replay.
        const timer = window.setTimeout(record, 0);
        document.addEventListener("visibilitychange", record);
        return () => {
            window.clearTimeout(timer);
            document.removeEventListener("visibilitychange", record);
        };
    }, [pathname, paths]);

    return null;
}
