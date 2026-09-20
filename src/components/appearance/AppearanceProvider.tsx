"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { defaultAppearance, appearanceBootstrap, appearanceStorageKey, parseAppearance, type AppearancePreference } from "@/lib/appearance";
import styles from "@/components/appearance/portfolio.module.css";

const preferenceEvent = "portfolio-home-appearance";
const serverSnapshot = JSON.stringify(defaultAppearance);
let sessionPreference: string | null = null;

function getSnapshot() {
    if (sessionPreference !== null) return sessionPreference;
    try {
        return JSON.stringify(parseAppearance(localStorage.getItem(appearanceStorageKey)));
    } catch {
        return serverSnapshot;
    }
}

function subscribe(notify: () => void) {
    const onStorage = (event: StorageEvent) => {
        if (event.key === appearanceStorageKey || event.key === null) notify();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(preferenceEvent, notify);
    return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(preferenceEvent, notify);
    };
}

function setPreference(value: AppearancePreference) {
    const serialized = JSON.stringify(parseAppearance(JSON.stringify(value)));
    try {
        localStorage.setItem(appearanceStorageKey, serialized);
        sessionPreference = null;
    } catch {
        sessionPreference = serialized;
    }
    window.dispatchEvent(new Event(preferenceEvent));
}

const AppearanceContext = createContext({ preference: defaultAppearance, setPreference });
export function useAppearance() { return useContext(AppearanceContext); }

export default function AppearanceProvider({ children }: { children: ReactNode }) {
    const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
    const preference = parseAppearance(snapshot);
    return (
        <AppearanceContext.Provider value={{ preference, setPreference }}>
            <div id="portfolio-appearance" className={styles.portfolio} data-palette={preference.theme} data-color-mode={preference.mode} suppressHydrationWarning>
                <script dangerouslySetInnerHTML={{ __html: appearanceBootstrap }} />
                {children}
            </div>
        </AppearanceContext.Provider>
    );
}
