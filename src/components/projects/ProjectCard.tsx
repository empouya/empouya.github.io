import Link from "next/link";
import type { Project } from "@/content/types";
import { ArrowRightIcon } from "@/components/ui/icons";
import styles from "@/components/appearance/portfolio.module.css";
import projectStyles from "./projects.module.css";

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <article className={styles.project} aria-labelledby={`${project.slug}-title`}>
            <p className={styles.projectTop}>{project.kind}</p>
            <h2 id={`${project.slug}-title`} className={projectStyles.cardTitle}>{project.title}</h2>
            <p className={styles.body}>{project.description}</p>
            <p className={styles.stack}>{project.tech.slice(0, 4).join(" · ")}</p>
            <div className={styles.evidence}><p>{project.proof}</p><p>{project.status}</p></div>
            <Link href={`/projects/${project.slug}/`} className={styles.textLink} aria-label={`Read case study: ${project.title}`}>
                Read case study <ArrowRightIcon className="h-4 w-4" />
            </Link>
        </article>
    );
}
