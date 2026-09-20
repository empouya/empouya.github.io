import { resumeHref } from "@/lib/routes";

// Public identity verified against the master profile; shared by migrated routes.
const email = "empouya03@gmail.com";
export const professionalProfile = {
    name: "Eid Mohammad Ahmadi",
    givenName: "Eid Mohammad",
    familyName: "Ahmadi",
    role: "Backend Engineer",
    location: "Barcelona, Spain",
    workAuthorization: "Authorized to work in Spain. No sponsorship required.",
    availability: "Open to full-time & freelance opportunities",
    email,
    github: "https://github.com/empouya",
    linkedin: "https://www.linkedin.com/in/empouya/",
    cv: { label: "Download CV", href: resumeHref },
} as const;
