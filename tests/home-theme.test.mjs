import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import { readFileSync } from "node:fs";
import ts from "typescript";

// Use the project's compiler so the test also works on Node builds without type stripping.
const source = readFileSync(new URL("../src/lib/appearance.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { defaultAppearance, colorModes, palettes, appearanceBootstrap, appearanceStorageKey, parseAppearance } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

test("absent, malformed and unknown preferences recover to Studio Blue", () => {
    for (const raw of [null, "", "broken", "null", "42", "[]", '{}', '{"theme":"warm-paper","mode":"sepia"}']) {
        assert.deepEqual(parseAppearance(raw), defaultAppearance);
    }
});

test("theme and color mode are independent and individually validated", () => {
    assert.deepEqual(parseAppearance('{"theme":"graphite-teal","mode":"unknown"}'), { theme: "graphite-teal", mode: "system" });
    assert.deepEqual(parseAppearance('{"theme":"unknown","mode":"dark"}'), { theme: "studio-blue", mode: "dark" });
});

test("first-paint bootstrap and hydrated parser agree for every combination", () => {
    for (const theme of palettes) {
        for (const mode of colorModes) {
            const raw = JSON.stringify({ theme: theme.id, mode });
            const root = { dataset: {} };
            vm.runInNewContext(appearanceBootstrap, {
                document: { getElementById: id => id === "portfolio-appearance" ? root : null },
                localStorage: { getItem: key => { assert.equal(key, appearanceStorageKey); return raw; } },
            });
            assert.deepEqual(root.dataset, { palette: theme.id, colorMode: mode });
            assert.deepEqual(parseAppearance(raw), { theme: theme.id, mode });
        }
    }
});

test("bootstrap tolerates disabled storage and invalid saved values", () => {
    for (const raw of [null, "{bad", "null", "false", '"text"', '{"theme":"<script>","mode":"invalid"}']) {
        const root = { dataset: {} };
        vm.runInNewContext(appearanceBootstrap, {
            document: { getElementById: () => root },
            localStorage: { getItem: () => raw },
        });
        assert.deepEqual(root.dataset, { palette: "studio-blue", colorMode: "system" });
    }
    const root = { dataset: {} };
    vm.runInNewContext(appearanceBootstrap, {
        document: { getElementById: () => root },
        localStorage: { getItem: () => { throw new Error("Storage blocked"); } },
    });
    assert.deepEqual(root.dataset, { palette: "studio-blue", colorMode: "system" });
});

test("bootstrap has no effect outside the migrated appearance boundary", () => {
    vm.runInNewContext(appearanceBootstrap, {
        document: { getElementById: () => null },
        localStorage: { getItem: () => { assert.fail("Legacy pages must not read migrated appearance preferences"); } },
    });
});
