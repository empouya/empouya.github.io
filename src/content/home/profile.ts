import { resumeHref } from "@/lib/routes";

/**
 * Corrected public profile for the migrated Home only.
 * Reviewed against master_professional_profile.json on 2026-09-19.
 * src/content/site remains the legacy dataset until each route is migrated.
 * Never present independent/local project tests as production benchmarks.
 */
type SelectedWork = {
    id: string;
    title: string;
    kind: "Commercial production" | "Independent project";
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
const email = "empouya03@gmail.com";

export const homeProfile = {
    name: "Eid Mohammad Ahmadi",
    givenName: "Eid Mohammad",
    familyName: "Ahmadi",
    role: "Backend Engineer",
    headline: "Secure APIs. Thoughtful data models. Reliable delivery.",
    summary: "I build Python backends for real workflows, from client requirements and API design to testing, deployment, and maintenance.",
    primaryStack: ["Python", "Django", "FastAPI", "PostgreSQL"],
    location: "Barcelona, Spain",
    workAuthorization: "Authorized to work in Spain. No sponsorship required.",
    availability: "Open to full-time & freelance opportunities",
    email,
    github: "https://github.com/empouya",
    linkedin: "https://www.linkedin.com/in/empouya/",
    cv: { label: "Download CV", href: resumeHref },
    selectedWork: [
        {
            id: "logistics",
            title: "International logistics platform",
            kind: "Commercial production",
            summary: "Replaced fragmented spreadsheets with a Django backend for shipment tracking, branch operations, and multi-currency financial records.",
            stack: ["Python", "Django", "PostgreSQL", "Docker"],
            evidence: "Supported operations across 6 countries and 5 languages.",
            context: "Confidential freelance client · Deployed on Alibaba Cloud ECS",
            action: { label: "Discuss this work", href: `mailto:${email}?subject=Logistics%20platform%20discussion` },
        },
        {
            id: "taskhive",
            title: "TaskHive",
            kind: "Independent project",
            summary: "A team-based project and task-management platform with a Django REST API, team-scoped permissions, and a React frontend.",
            stack: ["Django REST Framework", "PostgreSQL", "Redis", "Celery"],
            evidence: "100+ backend tests · 90%+ backend test coverage.",
            context: "Runs locally · Performance checks are local Locust smoke tests",
            action: { label: "Explore the source", href: "https://github.com/empouya/task-hive" },
        },
    ],
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
