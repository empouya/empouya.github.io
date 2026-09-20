import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { professionalProfile as profile } from "@/content/profile";
import ProjectCard from "@/components/projects/ProjectCard";
import styles from "@/components/appearance/portfolio.module.css";
import projectStyles from "@/components/projects/projects.module.css";

const title = `Projects | ${profile.name}`;
const description = "Backend applications and systems experiments, with context, implementation details, and supporting evidence.";
export const metadata: Metadata = {
    title: { absolute: title }, description,
    keywords: [profile.name, profile.role, "Python", "Django", "Backend projects"],
    alternates: { canonical: "/projects/" },
    openGraph: { title, description, url: "/projects/", type: "website", images: [] },
    twitter: { card: "summary", title, description, images: [] },
};

export default function ProjectsPage() {
    return (
        <main id="main-content" className={`${styles.container} ${projectStyles.library}`} tabIndex={-1}>
            <header className={styles.pageIntro}>
                <p className={styles.eyebrow}>Projects</p>
                <h1 className={styles.pageTitle}>Work, with the context.</h1>
                <p className={styles.lead}>{description}</p>
            </header>
            <div className={styles.projectGrid}>
                {projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
        </main>
    );
}
