import type { Metadata } from "next";
import { aboutProfile as about } from "@/content/about/profile";
import { professionalProfile as profile } from "@/content/profile";
import { DownloadIcon } from "@/components/ui/icons";
import styles from "@/components/appearance/portfolio.module.css";
import aboutStyles from "./about.module.css";

const title = `About | ${profile.name}`;
const description = `The background, working principles, and technical focus of ${profile.name}, a ${profile.role.toLowerCase()} in ${profile.location}.`;

export const metadata: Metadata = {
    title: { absolute: title },
    description,
    keywords: [profile.name, profile.role, "Python", "Django", "FastAPI", "PostgreSQL", "Barcelona"],
    alternates: { canonical: "/about/" },
    openGraph: { title, description, url: "/about/", type: "website", images: [] },
    twitter: { card: "summary", title, description, images: [] },
};

export default function AboutPage() {
    return (
        <main id="main-content" className={styles.container} tabIndex={-1}>
            <section className={aboutStyles.intro} aria-labelledby="about-title">
                <p className={styles.eyebrow}>About · {profile.role}</p>
                <h1 id="about-title">{about.title}</h1>
                <p className={aboutStyles.lead}>{about.introduction}</p>
                <div className={aboutStyles.journey}>
                    {about.journey.map(paragraph => <p key={paragraph} className={styles.body}>{paragraph}</p>)}
                </div>
                <a href={profile.cv.href} download className={styles.textLink}>{profile.cv.label}<DownloadIcon className="h-4 w-4" /></a>
            </section>

            <section className={`${styles.section} ${aboutStyles.editorial}`} aria-labelledby="principles-title">
                <div><p className={styles.eyebrow}>How I work</p><h2 id="principles-title">From understanding<br />to ownership.</h2></div>
                <div className={aboutStyles.principles}>
                    {about.principles.map(principle => <div key={principle.title}><h3>{principle.title}</h3><p className={styles.body}>{principle.description}</p></div>)}
                </div>
            </section>

            <section className={styles.section} aria-labelledby="toolkit-title">
                <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Technical focus</p><h2 id="toolkit-title">A backend foundation.<br />Room to keep learning.</h2></div></div>
                <div className={aboutStyles.toolkit}>
                    {about.capabilities.map(group => <div key={group.title}><p className={aboutStyles.context}>{group.context}</p><h3>{group.title}</h3><p className={aboutStyles.tools}>{group.tools}</p><p className={styles.body}>{group.description}</p></div>)}
                </div>
            </section>

            <section className={styles.section} aria-labelledby="background-title">
                <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>The essentials</p><h2 id="background-title">Background & availability.</h2></div></div>
                <dl className={aboutStyles.background}>
                    <div><dt>Education</dt><dd><p>{about.education.degree}</p><p>{about.education.institution}</p><p>{about.education.graduated}</p></dd></div>
                    <div><dt>Languages</dt><dd>{about.languages.map(language => <p key={language}>{language}</p>)}</dd></div>
                    <div><dt>{profile.location}</dt><dd><p>{profile.availability}</p><p>{profile.workAuthorization}</p></dd></div>
                </dl>
            </section>
        </main>
    );
}
