import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import styles from "@/components/appearance/portfolio.module.css";

export default function NotFound() {
    return (
        <main id="main-content" className={`${styles.container} ${styles.pageIntro}`} tabIndex={-1}>
            <p className={styles.eyebrow}>404</p>
            <h1 className={styles.pageTitle}>Page not found.</h1>
            <p className={styles.lead}>This page does not exist or has moved. You can return home or explore the project library.</p>
            <div className={styles.actions}>
                <Link href="/" className={styles.primaryButton}>Back to Home <ArrowRightIcon className="h-4 w-4" /></Link>
                <Link href="/projects/" className={styles.secondaryButton}>View projects</Link>
            </div>
        </main>
    );
}
