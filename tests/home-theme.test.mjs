import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import { readFileSync } from "node:fs";
import ts from "typescript";

// Use the project's compiler so the test also works on Node builds without type stripping.
const source = readFileSync(new URL("../src/lib/home-theme.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { defaultHomePreference, homeModes, homeThemes, homeThemeBootstrap, homeThemeStorageKey, parseHomePreference } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

test("absent, malformed and unknown preferences recover to Studio Blue", () => {
    for (const raw of [null, "", "broken", "null", "42", "[]", '{}', '{"theme":"warm-paper","mode":"sepia"}']) {
        assert.deepEqual(parseHomePreference(raw), defaultHomePreference);
    }
});

test("theme and color mode are independent and individually validated", () => {
    assert.deepEqual(parseHomePreference('{"theme":"graphite-teal","mode":"unknown"}'), { theme: "graphite-teal", mode: "system" });
    assert.deepEqual(parseHomePreference('{"theme":"unknown","mode":"dark"}'), { theme: "studio-blue", mode: "dark" });
});

test("first-paint bootstrap and hydrated parser agree for every combination", () => {
    for (const theme of homeThemes) {
        for (const mode of homeModes) {
            const raw = JSON.stringify({ theme: theme.id, mode });
            const root = { dataset: {} };
            vm.runInNewContext(homeThemeBootstrap, {
                document: { getElementById: id => id === "home-appearance" ? root : null },
                localStorage: { getItem: key => { assert.equal(key, homeThemeStorageKey); return raw; } },
            });
            assert.deepEqual(root.dataset, { homeTheme: theme.id, homeMode: mode });
            assert.deepEqual(parseHomePreference(raw), { theme: theme.id, mode });
        }
    }
});

test("bootstrap tolerates disabled storage and invalid saved values", () => {
    for (const raw of [null, "{bad", "null", "false", '"text"', '{"theme":"<script>","mode":"invalid"}']) {
        const root = { dataset: {} };
        vm.runInNewContext(homeThemeBootstrap, {
            document: { getElementById: () => root },
            localStorage: { getItem: () => raw },
        });
        assert.deepEqual(root.dataset, { homeTheme: "studio-blue", homeMode: "system" });
    }
    const root = { dataset: {} };
    vm.runInNewContext(homeThemeBootstrap, {
        document: { getElementById: () => root },
        localStorage: { getItem: () => { throw new Error("Storage blocked"); } },
    });
    assert.deepEqual(root.dataset, { homeTheme: "studio-blue", homeMode: "system" });
});

test("bootstrap has no effect outside the Home boundary", () => {
    vm.runInNewContext(homeThemeBootstrap, {
        document: { getElementById: () => null },
        localStorage: { getItem: () => { assert.fail("Legacy pages must not read Home preferences"); } },
    });
});
