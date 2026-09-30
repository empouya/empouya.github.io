import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import { homeProfile as profile } from "@/content/home/profile";
import { siteRoutes } from "@/lib/routes";
import { ArrowRightIcon, GithubIcon, LinkedinIcon, DownloadIcon } from "@/components/ui/icons";
import styles from "@/components/appearance/portfolio.module.css";

export default function HomePage() {
    return (
        <main id="main-content" className={styles.container} tabIndex={-1}>
            <section className={styles.hero} aria-labelledby="home-title">
                <div className={styles.heroTopline}>
                    <p className={styles.role}>{profile.role}</p>
                    <p className={styles.availability}><span aria-hidden="true" />{profile.availability}</p>
                </div>
                <h1 id="home-title">{profile.givenName}<br /><span>{profile.familyName}.</span></h1>
                <div className={styles.heroBottom}>
                    <div className={styles.introduction}>
                        <p className={styles.headline}>{profile.headline}</p>
                        <p className={styles.body}>{profile.summary}</p>
                        <p className={styles.heroStack}>{profile.primaryStack.join(" / ")}</p>
                        <div className={styles.actions}>
                            <a href="#selected-work" className={styles.primaryButton}>View selected work <ArrowRightIcon className="h-4 w-4" /></a>
                            <a href={profile.cv.href} download className={styles.secondaryButton}>{profile.cv.label} <DownloadIcon className="h-4 w-4" /></a>
                        </div>
                    </div>
                    <div className={styles.location}>
                        <p className={styles.eyebrow}>Based in</p>
                        <p className={styles.locationName}>{profile.location}</p>
                        <p>{profile.workAuthorization}</p>
                        <div className={styles.socials}>
                            <a href={profile.github} target="_blank" rel="noreferrer"><GithubIcon className="h-4 w-4" />GitHub</a>
                            <a href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon className="h-4 w-4" />LinkedIn</a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="selected-work" className={styles.section} aria-labelledby="work-title">
                <div className={styles.sectionHeading}>
                    <div><p className={styles.eyebrow}>Selected work</p><h2 id="work-title">Built with a purpose.</h2></div>
                    <Link href={siteRoutes.projects.href} className={styles.textLink}>Project library <ArrowRightIcon className="h-4 w-4" /></Link>
                </div>
                <div className={styles.projectGrid}>
                    {profile.selectedWork.map(project => <ProjectCard key={project.id} project={project} headingLevel={3} />)}
                </div>
            </section>

            <section id="experience" className={styles.section} aria-labelledby="experience-title">
                <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Experience & capabilities</p><h2 id="experience-title">From requirements to running systems.</h2></div></div>
                <div className={styles.experienceGrid}>
                    <ol className={styles.timeline}>
                        {profile.experience.map(job => <li key={job.role}><p className={styles.dates}>{job.dates}</p><h3>{job.role}</h3><p className={styles.organization}>{job.organization}</p><p className={styles.body}>{job.summary}</p></li>)}
                    </ol>
                    <aside className={styles.capabilities} aria-labelledby="capabilities-title">
                        <h3 id="capabilities-title">A focused toolkit.</h3>
                        <dl>{profile.capabilities.map(group => <div key={group.label}><dt>{group.label}</dt><dd>{group.value}</dd></div>)}</dl>
                        <p className={styles.supporting}>React and TypeScript support the backend work.</p>
                        <Link href={siteRoutes.about.href} className={styles.textLink}>More about me <ArrowRightIcon className="h-4 w-4" /></Link>
                    </aside>
                </div>
            </section>

            <section id="get-in-touch" className={`${styles.section} ${styles.contact}`} aria-labelledby="contact-title">
                <div><p className={styles.eyebrow}>Start a conversation</p><h2 id="contact-title">Have something in mind?</h2><p className={styles.body}>A backend role, a client project, or a system that needs a thoughtful next step.</p></div>
                <a href={`mailto:${profile.email}`} className={styles.primaryButton}>Let&apos;s talk <ArrowRightIcon className="h-4 w-4" /></a>
            </section>
        </main>
    );
}
