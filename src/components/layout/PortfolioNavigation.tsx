"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { professionalProfile as profile } from "@/content/profile";
import { useEffect, useRef } from "react";
import { primaryNavigation, resumeHref } from "@/lib/routes";
import { colorModes, palettes, type ColorMode, type Palette } from "@/lib/appearance";
import { useAppearance } from "@/components/appearance/AppearanceProvider";
import styles from "@/components/appearance/portfolio.module.css";

export default function PortfolioNavigation() {
    const pathname = usePathname().replace(/\/$/, "") || "/";
    const { preference, setPreference } = useAppearance();
    const appearanceRef = useRef<HTMLDetailsElement>(null);
    useEffect(() => {
        function onPointerDown(event: PointerEvent) {
            const panel = appearanceRef.current;
            if (panel && !panel.contains(event.target as Node)) panel.open = false;
        }
        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.navInner}>
                <Link href="/" className={styles.brand} aria-label={`${profile.name} — Home`}>{profile.givenName}<span>{profile.familyName}</span></Link>
                <nav aria-label="Main navigation" className={styles.navigation}>
                    {primaryNavigation.map(link => <Link key={link.href} href={link.href} aria-current={(link.href === pathname || (link.href !== "/" && pathname.startsWith(`${link.href}/`))) ? "page" : undefined}>{link.label}</Link>)}
                    <a href={resumeHref} download aria-label="Download CV">CV</a>
                </nav>
                <details ref={appearanceRef} className={styles.appearance} onKeyDown={event => {
                    if (event.key === "Escape") {
                        event.currentTarget.open = false;
                        event.currentTarget.querySelector("summary")?.focus();
                    }
                }} onBlur={event => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) event.currentTarget.open = false;
                }}>
                    <summary><span className={styles.themeDot} aria-hidden="true" />Appearance</summary>
                    <div className={styles.appearancePanel}>
                        <label htmlFor="home-theme">Theme</label>
                        <select id="home-theme" value={preference.theme} onChange={event => setPreference({ ...preference, theme: event.target.value as Palette })}>
                            {palettes.map(theme => <option key={theme.id} value={theme.id}>{theme.label}</option>)}
                        </select>
                        <label htmlFor="home-mode">Color mode</label>
                        <select id="home-mode" value={preference.mode} onChange={event => setPreference({ ...preference, mode: event.target.value as ColorMode })}>
                            {colorModes.map(mode => <option key={mode} value={mode}>{mode === "system" ? "Match device" : mode === "light" ? "Light" : "Dark"}</option>)}
                        </select>
                        <p>Saved for your next visit.</p>
                    </div>
                </details>
            </div>
        </header>
    );
}
