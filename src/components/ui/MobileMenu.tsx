"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MenuIcon, XIcon } from "@/components/ui/icons";

type MobileMenuProps = {
    links: ReadonlyArray<{
        readonly href: string;
        readonly label: string;
    }>;
};

export default function MobileMenu({ links }: MobileMenuProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");

        function handleDesktopChange(event: MediaQueryListEvent) {
            if (event.matches) {
                setOpen(false);
            }
        }

        mediaQuery.addEventListener("change", handleDesktopChange);

        return () => {
            mediaQuery.removeEventListener("change", handleDesktopChange);
        };
    }, []);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = open ? "hidden" : "";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    const canUsePortal = typeof document !== "undefined";

    const menuOverlay =
        canUsePortal && open
            ? createPortal(
                <div className="fixed inset-0 z-[100] md:hidden">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpen(false)}
                        aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 top-16 bottom-0 bg-white shadow-2xl dark:bg-neutral-950">
                        <nav className="flex h-full flex-col px-6 py-6">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="border-b border-border py-4 text-lg font-medium text-foreground transition-colors hover:text-accent"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>,
                document.body
            )
            : null;

    return (
        <>
            <div className="md:hidden">
                <button
                    type="button"
                    onClick={() => setOpen((current) => !current)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-accent"
                    aria-expanded={open}
                    aria-label="Toggle navigation menu"
                >
                    {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
                </button>
            </div>

            {menuOverlay}
        </>
    );
}
