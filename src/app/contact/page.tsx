import type { Metadata } from "next";
import { professionalProfile as profile } from "@/content/profile";
import { ArrowRightIcon, GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import styles from "@/components/appearance/portfolio.module.css";
import contactStyles from "./contact.module.css";

const title = `Contact | ${profile.name}`;
const description = `Contact ${profile.name}, a backend engineer in ${profile.location}, about full-time roles or freelance backend projects.`;
export const metadata: Metadata = {
    title: { absolute: title }, description,
    keywords: [profile.name, profile.role, "Backend engineering", "Barcelona"],
    alternates: { canonical: "/contact/" },
    openGraph: { title, description, url: "/contact/", type: "website", images: [] },
    twitter: { card: "summary", title, description, images: [] },
};

export default function ContactPage() {
    return (
        <main id="main-content" className={`${styles.container} ${contactStyles.contact}`} tabIndex={-1}>
            <div>
                <p className={styles.eyebrow}>Contact</p>
                <h1 className={styles.pageTitle}>Let&apos;s talk.</h1>
                <p className={styles.lead}>Have a backend role, a freelance project, or a system you&apos;d like to discuss? Send me an email.</p>
                <a href={`mailto:${profile.email}`} className={contactStyles.email}>{profile.email}<ArrowRightIcon className="h-6 w-6" /></a>
                <div className={contactStyles.socials}>
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" className={styles.textLink}><LinkedinIcon className="h-4 w-4" />LinkedIn</a>
                    <a href={profile.github} target="_blank" rel="noreferrer" className={styles.textLink}><GithubIcon className="h-4 w-4" />GitHub</a>
                </div>
                <dl className={contactStyles.details}>
                    <div><dt>Based in {profile.location}</dt><dd>{profile.workAuthorization}</dd></div>
                    <div><dt>Availability</dt><dd>{profile.availability}</dd></div>
                </dl>
            </div>
        </main>
    );
}
