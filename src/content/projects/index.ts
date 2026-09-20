import type { Project } from "@/content/types";
import project1 from "./data/project1.json";
import project2 from "./data/project2.json";
import project3 from "./data/project3.json";
import project4 from "./data/project4.json";

export type { Project };

export const projects: Project[] = [project2, project1, project3, project4];

export function getFeaturedProjects(): Project[] {
    return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}