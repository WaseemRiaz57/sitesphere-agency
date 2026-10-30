"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, MessageCircle } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { navLinks, whatsappHref } from "@/app/lib/site";
import { LinkButton } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "bg-paper/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[4.5rem] max-w-[76rem] items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a href="#top" className="flex items-center" aria-label="SiteSphere home">
          {/* The logo artwork is white, so it is inverted to ink for the light surface. */}
          <Image
            src="/logo-mark.png"
            alt="SiteSphere"
            width={1040}
            height={225}
            priority
            className="h-7 w-auto invert sm:h-8"
          />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-[0.9375rem] font-medium text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LinkButton href="#contact" className="hidden sm:inline-flex">
            Book a strategy call
          </LinkButton>

          <Sheet>
            <SheetTrigger
              className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Jump to a section of the SiteSphere site
              </SheetDescription>
              <ul className="mt-16 flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <a
                        href={link.href}
                        className="block border-b border-line py-4 text-2xl font-bold tracking-[-0.03em] text-ink transition-colors hover:text-cobalt"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3">
                <SheetClose asChild>
                  <LinkButton href="#contact" size="lg">
                    Book a strategy call
                  </LinkButton>
                </SheetClose>
                <LinkButton
                  href={whatsappHref("Hello SiteSphere! I'd like to talk about my business website.")}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  size="lg"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Message us on WhatsApp
                </LinkButton>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
