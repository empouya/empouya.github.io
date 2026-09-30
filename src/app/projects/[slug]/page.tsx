import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/content/projects";
import { professionalProfile as profile } from "@/content/profile";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/projects/ProjectDetail";

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return { title: "Project Not Found", robots: { index: false } };
    const title = `${project.title} | ${profile.name}`;
    const url = `/projects/${project.slug}/`;
    return {
        title: { absolute: title }, description: project.description,
        keywords: [profile.name, project.title, project.kind, ...project.tech],
        alternates: { canonical: url },
        openGraph: { title, description: project.description, url, type: "article", images: [] },
        twitter: { card: "summary", title, description: project.description, images: [] },
    };
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) notFound();
    return <ProjectDetail project={project} />;
}
