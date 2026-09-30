import assert from "node:assert/strict";
import test from "node:test";
import { readdirSync, readFileSync } from "node:fs";

const directory = new URL("../src/content/projects/data/", import.meta.url);
const projects = readdirSync(directory).filter(file => file.endsWith(".json")).map(file => JSON.parse(readFileSync(new URL(file, directory), "utf8")));

test("case study data preserves published routes and unique identifiers", () => {
    const slugs = projects.map(project => project.slug);
    assert.equal(new Set(slugs).size, projects.length);
    assert.equal(new Set(projects.map(project => project.id)).size, projects.length);
    for (const slug of ["taskhive-backend", "rideflow-distributed-system", "xv6-riscv-kernel", "tweeter-realtime-app"]) assert.ok(slugs.includes(slug));
    assert.equal(projects.filter(project => project.featured).length, 2);
});

test("each case study supplies its evidence, limits, and real resource links", () => {
    for (const project of projects) {
        for (const field of ["title", "description", "kind", "status", "role", "proof", "context", "contribution", "limitations", "resourceNote"]) assert.ok(project[field]?.trim(), `${project.slug}: ${field}`);
        assert.ok(project.tech.length && project.decisions.length && project.results.length && project.architecture.components.length);
        for (const href of [project.github, project.live, ...project.references.map(reference => reference.href)].filter(Boolean)) {
            const url = new URL(href);
            assert.equal(url.protocol, "https:");
            assert.ok(!["localhost", "example.com"].includes(url.hostname));
        }
    }
});

test("master-profile corrections remain explicit in project evidence", () => {
    const taskhive = projects.find(project => project.slug === "taskhive-backend");
    assert.match(taskhive.status, /locally/);
    assert.match(taskhive.limitations, /not presented as production benchmarks/);
    const tweeter = projects.find(project => project.slug === "tweeter-realtime-app");
    assert.ok(tweeter.tech.includes("TCP sockets"));
    assert.ok(!tweeter.tech.includes("WebSockets"));
    const logistics = projects.find(project => project.slug === "international-logistics-platform");
    assert.equal(logistics.github, undefined);
    assert.match(logistics.limitations, /confidential/);
});
