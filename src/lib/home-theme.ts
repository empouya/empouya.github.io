export const homeThemes = [
    { id: "studio-blue", label: "Studio Blue" },
    { id: "graphite-teal", label: "Graphite Teal" },
] as const;
export const homeModes = ["system", "light", "dark"] as const;
export type HomeTheme = typeof homeThemes[number]["id"];
export type HomeMode = typeof homeModes[number];
export type HomePreference = { theme: HomeTheme; mode: HomeMode };
export const homeThemeStorageKey = "portfolio.home-appearance.v1";
export const defaultHomePreference: HomePreference = { theme: "studio-blue", mode: "system" };

export function parseHomePreference(raw: string | null): HomePreference {
    try {
        const value: unknown = JSON.parse(raw ?? "null");
        if (!value || typeof value !== "object") return defaultHomePreference;
        const candidate = value as Record<string, unknown>;
        return {
            theme: homeThemes.some(theme => theme.id === candidate.theme) ? candidate.theme as HomeTheme : "studio-blue",
            mode: homeModes.some(mode => mode === candidate.mode) ? candidate.mode as HomeMode : "system",
        };
    } catch {
        return defaultHomePreference;
    }
}

// Set allowlisted preferences on the Home wrapper before its content is painted.
// CSS resolves system mode without waiting for React. The legacy theme is untouched.
export const homeThemeBootstrap = `
(() => {
    const root = document.getElementById('home-appearance');
    if (!root) return;
    let value = {};
    try { value = JSON.parse(localStorage.getItem('${homeThemeStorageKey}') || '{}') || {}; } catch {}
    const themes = ${JSON.stringify(homeThemes.map(theme => theme.id))};
    const modes = ${JSON.stringify(homeModes)};
    root.dataset.homeTheme = themes.includes(value.theme) ? value.theme : 'studio-blue';
    root.dataset.homeMode = modes.includes(value.mode) ? value.mode : 'system';
})();`;
