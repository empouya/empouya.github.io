export const palettes = [
    { id: "studio-blue", label: "Studio Blue" },
    { id: "graphite-teal", label: "Graphite Teal" },
] as const;
export const colorModes = ["system", "light", "dark"] as const;
export type Palette = typeof palettes[number]["id"];
export type ColorMode = typeof colorModes[number];
export type AppearancePreference = { theme: Palette; mode: ColorMode };
// Preserve the original key so existing Home preferences survive the migration.
export const appearanceStorageKey = "portfolio.home-appearance.v1";
export const defaultAppearance: AppearancePreference = { theme: "studio-blue", mode: "system" };

export function parseAppearance(raw: string | null): AppearancePreference {
    try {
        const value: unknown = JSON.parse(raw ?? "null");
        if (!value || typeof value !== "object") return defaultAppearance;
        const candidate = value as Record<string, unknown>;
        return {
            theme: palettes.some(theme => theme.id === candidate.theme) ? candidate.theme as Palette : "studio-blue",
            mode: colorModes.some(mode => mode === candidate.mode) ? candidate.mode as ColorMode : "system",
        };
    } catch {
        return defaultAppearance;
    }
}

// Set allowlisted preferences on the shared appearance wrapper before its content is painted.
// CSS resolves system mode without waiting for React. All routes use this boundary.
export const appearanceBootstrap = `
(() => {
    const root = document.getElementById('portfolio-appearance');
    if (!root) return;
    let value = {};
    try { value = JSON.parse(localStorage.getItem('${appearanceStorageKey}') || '{}') || {}; } catch {}
    const themes = ${JSON.stringify(palettes.map(theme => theme.id))};
    const modes = ${JSON.stringify(colorModes)};
    root.dataset.palette = themes.includes(value.theme) ? value.theme : 'studio-blue';
    root.dataset.colorMode = modes.includes(value.mode) ? value.mode : 'system';
})();`;
