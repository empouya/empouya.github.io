import { professionalProfile as profile } from "@/content/profile";
import { ArrowRightIcon } from "@/components/ui/icons";
import styles from "@/components/appearance/portfolio.module.css";

export default function PortfolioFooter() {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.container} ${styles.footerInner}`}>
                <div className={styles.footerIdentity}>
                    <p>{profile.name}</p>
                    <p>{profile.role} · {profile.location}</p>
                </div>
                <nav aria-label="Social and contact links" className={styles.footerLinks}>
                    <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowRightIcon className="h-3 w-3 -rotate-45" /></a>
                    <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowRightIcon className="h-3 w-3 -rotate-45" /></a>
                    <a href={`mailto:${profile.email}`}>Email <ArrowRightIcon className="h-3 w-3 -rotate-45" /></a>
                </nav>
                <p className={styles.copyright}>© {new Date().getFullYear()} {profile.name}</p>
            </div>
        </footer>
    );
}
