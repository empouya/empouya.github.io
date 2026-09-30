export type ContactInfo = {
    email: string;
    github: string;
    githubSecondary: string;
    linkedin: string;
    location: string;
};

export type Availability = {
    status: string;
    type: string;
};

export type SkillGroup = {
    frontend: string[];
    backend: string[];
    tools: string[];
    ai: string[];
};

export type CvContactEntry =
    | { type: "text"; value: string }
    | { type: "link"; label: string; href: string };

export type DetailedSkill = {
    label: string;
    value: string;
};

export type ExperienceProject = {
    name: string;
    description: string;
};

export type Experience = {
    role: string;
    company: string;
    date: string;
    bullets: string[];
    projects: ExperienceProject[];
};

export type Education = {
    degree: string;
    date: string;
    school: string;
    details: string;
};

export type Profile = {
    name: string;
    role: string;
    headline: string;
    tagline: string;
    shortIntro: string;
    traits: string[];
    achievements: string[];
    stats: {
        yearsExperience: string;
        projectsCompleted: string;
        technologiesUsed: string;
    };
    availability: Availability;
};

export type Project = {
    id: string;
    slug: string;
    title: string;
    description: string;
    kind: string;
    status: string;
    role: string;
    proof: string;
    tech: string[];
    featured: boolean;
    context: string;
    contribution: string;
    architecture: { summary: string; components: { name: string; detail: string }[] };
    decisions: { title: string; description: string }[];
    results: string[];
    limitations: string;
    resourceNote: string;
    github?: string;
    live?: string;
    references: { label: string; href: string }[];
};
