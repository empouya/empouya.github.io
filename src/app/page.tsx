import type { Metadata } from "next";
import HomePage from "@/components/sections/home/HomePage";
import { homeProfile } from "@/content/home/profile";
import { siteUrl } from "@/lib/config";

const title = `${homeProfile.name} | ${homeProfile.role}`;
const description = `${homeProfile.role} in ${homeProfile.location}. Python, Django, FastAPI and PostgreSQL. Commercial freelance delivery and institutional production experience.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [homeProfile.name, homeProfile.role, "Python", "Django", "FastAPI", "PostgreSQL", "Barcelona"],
  alternates: { canonical: "/" },
  // The legacy share image is empty; Home uses a text-only preview for now.
  openGraph: { title, description, url: siteUrl, type: "website", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Page() {
  return <HomePage />;
}
