"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { primaryNavigation } from "@/lib/routes";
import { homeModes, homeThemes, type HomeMode, type HomeTheme } from "@/lib/home-theme";
import { useHomeTheme } from "./HomeThemeProvider";
import styles from "./home.module.css";

export default function HomeNavigation() {
    const { preference, setPreference } = useHomeTheme();
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
                <Link href="/" className={styles.brand} aria-label="Eid Mohammad Ahmadi — Home">EM<span aria-hidden="true">.</span></Link>
                <nav aria-label="Main navigation" className={styles.navigation}>
                    {primaryNavigation.map(link => <Link key={link.href} href={link.href} aria-current={link.href === "/" ? "page" : undefined}>{link.label}</Link>)}
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
                        <select id="home-theme" value={preference.theme} onChange={event => setPreference({ ...preference, theme: event.target.value as HomeTheme })}>
                            {homeThemes.map(theme => <option key={theme.id} value={theme.id}>{theme.label}</option>)}
                        </select>
                        <label htmlFor="home-mode">Color mode</label>
                        <select id="home-mode" value={preference.mode} onChange={event => setPreference({ ...preference, mode: event.target.value as HomeMode })}>
                            {homeModes.map(mode => <option key={mode} value={mode}>{mode === "system" ? "Match device" : mode === "light" ? "Light" : "Dark"}</option>)}
                        </select>
                        <p>Your appearance preference for Home.</p>
                    </div>
                </details>
            </div>
        </header>
    );
}
