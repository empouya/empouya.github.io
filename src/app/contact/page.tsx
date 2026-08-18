import Section from "@/components/sections/Section";
import { contact, availability } from "@/content/site";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";
import { GithubIcon, LinkedinIcon, MailIcon, MapPinIcon } from "@/components/ui/icons";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Contact Eid Mohammad Ahmadi for collaboration, freelance opportunities, and full stack engineering roles.",
};

export default function ContactPage() {
    return (
        <main>
            <FadeIn>
                <Section>
                    <div className="max-w-4xl">
                        <SectionHeading
                            eyebrow="Contact"
                            title="Let's talk about your next project"
                            description="If you'd like to discuss a collaboration, freelance work, or a product idea, feel free to reach out."
                        />
                    </div>
                </Section>
            </FadeIn>

            <FadeIn delay={0.1}>
                <Section className="pt-0">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {/* Email */}
                        <a
                            href={`mailto:${contact.email}`}
                            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                                <MailIcon className="h-6 w-6" />
                            </div>
                            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                                Email
                            </p>
                            <p className="mt-2 text-foreground break-all group-hover:text-accent transition-colors">
                                {contact.email}
                            </p>
                        </a>

                        {/* Location */}
                        <div className="rounded-2xl border border-border bg-card p-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                <MapPinIcon className="h-6 w-6" />
                            </div>
                            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                                Location
                            </p>
                            <p className="mt-2 text-foreground">{contact.location}</p>
                        </div>

                        {/* LinkedIn */}
                        <a
                            href={contact.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                                <LinkedinIcon className="h-6 w-6" />
                            </div>
                            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                                LinkedIn
                            </p>
                            <p className="mt-2 text-foreground group-hover:text-accent transition-colors">
                                Connect with me
                            </p>
                        </a>

                        {/* GitHub */}
                        <a
                            href={contact.github}
                            target="_blank"
                            rel="noreferrer"
                            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                                <GithubIcon className="h-6 w-6" />
                            </div>
                            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                                GitHub
                            </p>
                            <p className="mt-2 text-foreground group-hover:text-accent transition-colors">
                                View my code
                            </p>
                        </a>
                    </div>
                </Section>
            </FadeIn>

            {/* CTA Section */}
            <FadeIn delay={0.2}>
                <Section className="border-t border-border">
                    <div className="rounded-3xl border border-border bg-gradient-to-br from-accent/10 via-card to-card p-8 sm:p-12 text-center">
                        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                            Ready to work together?
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                            I&apos;m currently {availability.status.toLowerCase()} and available for {availability.type.toLowerCase()}.
                        </p>
                        <a
                            href={`mailto:${contact.email}`}
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            <MailIcon className="h-5 w-5" />
                            Send me an email
                        </a>
                    </div>
                </Section>
            </FadeIn>
        </main>
    );
}
