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
    kind: string;
    status: string;
    proof: string;
    id: string;
    slug: string;
    title: string;
    description: string;
    tech: string[];
    image: string;
    github: string;
    live: string;
    featured: boolean;
    results: string[];
    ogImage?: string;
};