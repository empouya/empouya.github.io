import { getFeaturedProjects } from "@/content/projects";
import { professionalProfile } from "@/content/profile";

/**
 * Corrected public profile for the migrated Home only.
 * Reviewed against master_professional_profile.json on 2026-09-19.
 * src/content/site remains the legacy dataset until each route is migrated.
 * Never present independent/local project tests as production benchmarks.
 */
type SelectedWork = {
    id: string;
    title: string;
    kind: string;
    summary: string;
    stack: readonly string[];
    evidence: string;
    context: string;
    action: { label: string; href: string };
};
type HomeProfile = {
    name: string; givenName: string; familyName: string; role: string;
    headline: string; summary: string; primaryStack: readonly string[]; location: string; workAuthorization: string;
    availability: string; email: string; github: string; linkedin: string;
    cv: { label: string; href: string };
    selectedWork: readonly SelectedWork[];
    experience: readonly { role: string; organization: string; dates: string; summary: string }[];
    capabilities: readonly { label: string; value: string }[];
};

export const homeProfile = {
    ...professionalProfile,
    headline: "Secure APIs. Thoughtful data models. Reliable delivery.",
    summary: "I build Python backends for real workflows, from client requirements and API design to testing, deployment, and maintenance.",
    primaryStack: ["Python", "Django", "FastAPI", "PostgreSQL"],
    selectedWork: getFeaturedProjects().map(project => ({
        id: project.id,
        title: project.title,
        kind: project.kind,
        summary: project.description,
        stack: project.tech.slice(0, 4),
        evidence: project.proof,
        context: project.status,
        action: { label: "Read case study", href: `/projects/${project.slug}/` },
    })),
    experience: [
        {
            role: "Independent Software Engineer",
            organization: "Freelance & independent work",
            dates: "2022–present",
            summary: "Paid client delivery alongside advanced independent projects, partly during university studies.",
        },
        {
            role: "Technical Lead / Backend Engineer",
            organization: "Confidential logistics client · Freelance",
            dates: "Jun 2023–May 2025",
            summary: "Led technical delivery for a seven-developer team, from requirements and code review to deployment and maintenance.",
        },
        {
            role: "Backend Developer Intern",
            organization: "Amirkabir University of Technology",
            dates: "Sep 2023–Nov 2024",
            summary: "Built APIs and recurring data imports, integrated university authentication, and contributed tests and Docker deployment.",
        },
    ],
    capabilities: [
        { label: "Core backend", value: "Python · Django · FastAPI · PostgreSQL" },
        { label: "Production delivery", value: "Docker · Linux · Nginx · HTTPS · backups" },
        { label: "Quality & security", value: "Pytest · integration testing · JWT · RBAC" },
        { label: "Project depth", value: "Redis · Celery · multi-tenancy · observability" },
    ],
} as const satisfies HomeProfile;
