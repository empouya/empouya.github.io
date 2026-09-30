import Link from "next/link";
import type { Project } from "@/content/projects";
import { professionalProfile as profile } from "@/content/profile";
import { ArrowRightIcon, GithubIcon } from "@/components/ui/icons";
import styles from "@/components/appearance/portfolio.module.css";
import detailStyles from "./projects.module.css";

export default function ProjectDetail({ project }: { project: Project }) {
    return (
        <main id="main-content" className={styles.container} tabIndex={-1}>
            <header className={styles.pageIntro}>
                <Link href="/projects/" className={styles.textLink}><ArrowRightIcon className="h-4 w-4 rotate-180" />All projects</Link>
                <p className={`${styles.eyebrow} ${detailStyles.kind}`}>{project.kind}</p>
                <h1 className={styles.pageTitle}>{project.title}</h1>
                <p className={styles.lead}>{project.description}</p>
                <dl className={detailStyles.facts}>
                    <div><dt>My role</dt><dd>{project.role}</dd></div>
                    <div><dt>Status</dt><dd>{project.status}</dd></div>
                    <div><dt>Main stack</dt><dd>{project.tech.slice(0, 4).join(" · ")}</dd></div>
                </dl>
                <nav aria-label="Case study sections" className={detailStyles.sectionLinks}>
                    <a href="#context">Context</a><a href="#architecture">Architecture</a><a href="#decisions">Decisions</a><a href="#evidence">Evidence</a><a href="#resources">{project.github ? "Source" : "Discuss"}</a>
                </nav>
            </header>

            <section id="context" className={`${styles.section} ${detailStyles.editorial}`} aria-labelledby="context-title">
                <div><p className={styles.eyebrow}>Context & contribution</p><h2 id="context-title">The work behind it.</h2></div>
                <div className={detailStyles.prose}><p>{project.context}</p><h3>My contribution</h3><p>{project.contribution}</p></div>
            </section>

            <section id="architecture" className={styles.section} aria-labelledby="architecture-title">
                <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Architecture</p><h2 id="architecture-title">How it fits together.</h2></div></div>
                <p className={`${styles.body} ${detailStyles.architectureSummary}`}>{project.architecture.summary}</p>
                <dl className={detailStyles.system} aria-label="System components">
                    {project.architecture.components.map(component => <div key={component.name}><dt>{component.name}</dt><dd>{component.detail}</dd></div>)}
                </dl>
                <p className={detailStyles.fullStack}><span>Technologies used</span>{project.tech.join(" · ")}</p>
            </section>

            <section id="decisions" className={`${styles.section} ${detailStyles.editorial}`} aria-labelledby="decisions-title">
                <div><p className={styles.eyebrow}>Engineering decisions</p><h2 id="decisions-title">Choices & trade-offs.</h2></div>
                <div className={detailStyles.decisions}>{project.decisions.map(decision => <div key={decision.title}><h3>{decision.title}</h3><p className={styles.body}>{decision.description}</p></div>)}</div>
            </section>

            <section id="evidence" className={`${styles.section} ${detailStyles.editorial}`} aria-labelledby="evidence-title">
                <div><p className={styles.eyebrow}>Evidence & scope</p><h2 id="evidence-title">What the work shows.</h2></div>
                <div><p className={detailStyles.proof}>{project.proof}</p><ul className={detailStyles.results}>{project.results.map(result => <li key={result}>{result}</li>)}</ul><p className={styles.body}>{project.limitations}</p></div>
            </section>

            <section id="resources" className={`${styles.section} ${detailStyles.editorial}`} aria-labelledby="resources-title">
                <div><p className={styles.eyebrow}>{project.github ? "Explore further" : "Confidential work"}</p><h2 id="resources-title">{project.github ? "Inspect the source." : "Discuss the project."}</h2></div>
                <div><p className={styles.body}>{project.resourceNote}</p><div className={styles.actions}>
                    {project.github ? <a href={project.github} target="_blank" rel="noreferrer" className={styles.primaryButton}><GithubIcon className="h-4 w-4" />View repository</a> : <a href={`mailto:${profile.email}?subject=${encodeURIComponent(project.title)}`} className={styles.primaryButton}>Discuss this work <ArrowRightIcon className="h-4 w-4" /></a>}
                    {project.live && <a href={project.live} target="_blank" rel="noreferrer" className={styles.secondaryButton}>Open demo <ArrowRightIcon className="h-4 w-4" /></a>}
                </div><ul className={detailStyles.references}>{project.references.map(reference => <li key={reference.href}><a href={reference.href} target="_blank" rel="noreferrer" className={styles.textLink}>{reference.label}<ArrowRightIcon className="h-4 w-4 -rotate-45" /></a></li>)}</ul></div>
            </section>
        </main>
    );
}
