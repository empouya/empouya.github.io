/** Public About copy grounded in master_professional_profile.json (2026-09-19).
 * Principles describe documented responsibilities, not unsupported personality claims.
 */
export const aboutProfile = {
    title: "Behind the backend.",
    introduction: "I’m Eid Mohammad, a backend engineer who enjoys turning complicated workflows into software people can rely on.",
    journey: [
        "I started paid client work in 2022 while studying computer engineering. Since then, I’ve worked on data-processing tools, commercial logistics software, university systems, and a speech-integration API. Python is the common thread; understanding the people and processes behind the requirements is where the work starts.",
        "My experience includes leading technical delivery in a small freelance team and contributing as a university backend intern. I’ve worked across implementation, code review, deployment, and maintenance. Alongside client work, I build independent projects to explore backend architecture in more depth.",
    ],
    principles: [
        { title: "Understand the workflow", description: "I clarify who can do what before designing the API. In the logistics platform, transport updates required confirmation from the originating branch—a business rule that shaped the backend, not just the interface." },
        { title: "Make change manageable", description: "Tests and operations are part of delivery. My work has included unit and integration testing, Docker deployment, HTTPS configuration, and scheduled backups, as well as fixes and improvements after release." },
        { title: "Take responsibility together", description: "Leading a seven-developer freelance team meant discussing requirements with the client, coordinating with backend teammates and the frontend lead, and reviewing code. For a separate speech API, delivery included documentation and integration materials for the client’s team." },
    ],
    capabilities: [
        { title: "Backend & data", context: "Primary expertise", tools: "Python · Django · Django REST Framework · FastAPI · PostgreSQL", description: "API design, data modelling, role-based permissions, authentication integration, and recurring data imports." },
        { title: "Delivery & quality", context: "Client and institutional work", tools: "Pytest · Docker · Linux · Nginx · HTTPS", description: "Unit and integration tests, production configuration, backups, code review, and ongoing maintenance." },
        { title: "Architecture exploration", context: "Independent projects", tools: "Redis · Celery · Qdrant · OpenTelemetry", description: "Background jobs, tenant isolation, semantic search, and observability in locally operational projects." },
        { title: "Supporting skills", context: "Alongside backend work", tools: "React · TypeScript · Speech API integration", description: "Frontend integration and backend services that connect speech capabilities to client workflows." },
    ],
    education: { degree: "B.Sc. in Computer Engineering", institution: "Amirkabir University of Technology", graduated: "June 2025" },
    languages: ["Persian — Native", "English — B2", "Spanish — B1"],
} as const;
