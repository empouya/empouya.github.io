import Link from "next/link";
import type { Project } from "@/content/types";
import { ArrowRightIcon } from "@/components/ui/icons";
import styles from "@/components/appearance/portfolio.module.css";
import projectStyles from "./projects.module.css";

type ProjectCardProps = { project: Project; headingLevel?: 2 | 3 };

export default function ProjectCard({ project, headingLevel = 2 }: ProjectCardProps) {
    const Heading = headingLevel === 3 ? "h3" : "h2";
    return (
        <article className={styles.project} aria-labelledby={`${project.slug}-title`}>
            <p className={styles.projectTop}>{project.kind}</p>
            <Heading id={`${project.slug}-title`} className={headingLevel === 2 ? projectStyles.cardTitle : undefined}>{project.title}</Heading>
            <p className={styles.body}>{project.description}</p>
            <p className={styles.stack}>{project.tech.slice(0, 4).join(" · ")}</p>
            <div className={styles.evidence}><p>{project.proof}</p><p>{project.status}</p></div>
            <Link href={`/projects/${project.slug}/`} className={styles.textLink} aria-label={`Read case study: ${project.title}`}>
                Read case study <ArrowRightIcon className="h-4 w-4" />
            </Link>
        </article>
    );
}
