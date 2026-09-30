import type { Project } from "@/content/types";
import logistics from "./data/international-logistics-platform.json";
import taskhive from "./data/taskhive.json";
import aetheris from "./data/aetheris.json";
import rideflow from "./data/rideflow.json";
import xv6 from "./data/xv6.json";
import tweeter from "./data/tweeter.json";

export type { Project };

// Claims and source provenance are documented in docs/project-evidence.md.
export const projects: Project[] = [logistics, taskhive, aetheris, rideflow, xv6, tweeter];
export function getFeaturedProjects(): Project[] { return projects.filter(project => project.featured); }
export function getProjectBySlug(slug: string): Project | undefined { return projects.find(project => project.slug === slug); }
