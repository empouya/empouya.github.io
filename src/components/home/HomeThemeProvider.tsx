"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { defaultHomePreference, homeThemeBootstrap, homeThemeStorageKey, parseHomePreference, type HomePreference } from "@/lib/home-theme";
import styles from "./home.module.css";

const preferenceEvent = "portfolio-home-appearance";
const serverSnapshot = JSON.stringify(defaultHomePreference);
let sessionPreference: string | null = null;

function getSnapshot() {
    if (sessionPreference !== null) return sessionPreference;
    try {
        return JSON.stringify(parseHomePreference(localStorage.getItem(homeThemeStorageKey)));
    } catch {
        return serverSnapshot;
    }
}

function subscribe(notify: () => void) {
    const onStorage = (event: StorageEvent) => {
        if (event.key === homeThemeStorageKey || event.key === null) notify();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(preferenceEvent, notify);
    return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(preferenceEvent, notify);
    };
}

function setPreference(value: HomePreference) {
    const serialized = JSON.stringify(parseHomePreference(JSON.stringify(value)));
    try {
        localStorage.setItem(homeThemeStorageKey, serialized);
        sessionPreference = null;
    } catch {
        sessionPreference = serialized;
    }
    window.dispatchEvent(new Event(preferenceEvent));
}

const HomeThemeContext = createContext({ preference: defaultHomePreference, setPreference });
export function useHomeTheme() { return useContext(HomeThemeContext); }

export default function HomeThemeProvider({ children }: { children: ReactNode }) {
    const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
    const preference = parseHomePreference(snapshot);
    return (
        <HomeThemeContext.Provider value={{ preference, setPreference }}>
            <div id="home-appearance" className={styles.home} data-home-theme={preference.theme} data-home-mode={preference.mode} suppressHydrationWarning>
                <script dangerouslySetInnerHTML={{ __html: homeThemeBootstrap }} />
                {children}
            </div>
        </HomeThemeContext.Provider>
    );
}
