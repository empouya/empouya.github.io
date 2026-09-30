import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/config";
import SiteShell from "@/components/layout/SiteShell";
import { professionalProfile as profile } from "@/content/profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const description = "Backend engineer in Barcelona specializing in Python, Django, FastAPI, and PostgreSQL. Commercial delivery and independent backend projects.";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} | ${profile.role}`, template: `%s | ${profile.name}` },
  description,
  keywords: [profile.name, profile.role, "Python", "Django", "FastAPI", "PostgreSQL", "Barcelona"],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: { title: `${profile.name} | ${profile.role}`, description, url: siteUrl, siteName: `${profile.name} Portfolio`, locale: "en_US", type: "website", images: [] },
  twitter: { card: "summary", title: `${profile.name} | ${profile.role}`, description, images: [] },
  other: { referrer: "strict-origin-when-cross-origin" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      </head>
      <body className="font-sans antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
