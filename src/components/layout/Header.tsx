"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { buttonClasses } from "@/components/ui/Button";
import { SolutionIcon } from "@/components/ui/Icon";
import { mainNav } from "@/lib/site";
import { solutions } from "@/lib/solutions";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  const dropdownRef = useRef<HTMLLIElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownId = useId();
  const mobileMenuId = useId();

  // Close menus whenever the route changes (including back/forward).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setSolutionsOpen(false);
  }

  const closeAll = () => {
    setMobileOpen(false);
    setSolutionsOpen(false);
  };

  // Desktop dropdown: close on outside click or Escape.
  useEffect(() => {
    if (!solutionsOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setSolutionsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSolutionsOpen(false);
        dropdownButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [solutionsOpen]);

  // Mobile menu: lock page scroll, close on Escape or when resized to desktop.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => mq.matches && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [mobileOpen]);

  const linkBase =
    "relative inline-flex min-h-11 items-center px-3 text-sm font-medium transition-colors duration-200";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <Logo onNavigate={closeAll} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              if (item.href === "/solutions") {
                return (
                  <li key={item.href} ref={dropdownRef} className="relative">
                    <button
                      ref={dropdownButtonRef}
                      type="button"
                      aria-expanded={solutionsOpen}
                      aria-controls={dropdownId}
                      onClick={() => setSolutionsOpen((o) => !o)}
                      className={`${linkBase} gap-1 ${active ? "text-forest" : "text-ink/80 hover:text-forest"}`}
                    >
                      Solutions
                      <ChevronDown
                        aria-hidden
                        className={`size-4 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`}
                      />
                      {active && <ActiveBar />}
                    </button>
                    {solutionsOpen && (
                      <div
                        id={dropdownId}
                        className="absolute top-full left-1/2 mt-2 w-[34rem] -translate-x-1/2 rounded-md border border-line bg-surface p-3 shadow-raised"
                      >
                        <ul className="grid grid-cols-2 gap-1">
                          {solutions.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/solutions/${s.slug}`}
                                onNavigate={closeAll}
                                aria-current={pathname === `/solutions/${s.slug}` ? "page" : undefined}
                                className="flex gap-3 rounded-sm p-3 transition-colors hover:bg-paper aria-[current=page]:bg-sage"
                              >
                                <SolutionIcon name={s.icon} className="mt-0.5 size-5 shrink-0 text-forest-700" />
                                <span>
                                  <span className="block text-sm font-semibold text-forest">{s.name}</span>
                                  <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-muted-text">
                                    {s.summary}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-2 border-t border-line px-3 pt-3 pb-1">
                          <Link
                            href="/solutions"
                            onNavigate={closeAll}
                            className="text-sm font-semibold text-forest underline-offset-4 hover:underline"
                          >
                            View all solutions →
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`${linkBase} ${active ? "text-forest" : "text-ink/80 hover:text-forest"}`}
                  >
                    {item.label}
                    {active && <ActiveBar />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/request-a-quote"
            className={buttonClasses("primary", "md", "max-sm:hidden")}
            onNavigate={closeAll}
          >
            Get a Solar Quote
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-sm text-forest hover:bg-forest/5 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={mobileMenuId}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id={mobileMenuId}
          className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-line bg-paper lg:hidden"
        >
          <nav aria-label="Mobile" className="container-site py-6">
            <ul className="divide-y divide-line">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onNavigate={closeAll}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex min-h-13 items-center font-display text-lg font-semibold text-forest aria-[current=page]:underline aria-[current=page]:decoration-lime aria-[current=page]:decoration-[3px] aria-[current=page]:underline-offset-8"
                  >
                    {item.label === "Solutions" ? "All Solutions" : item.label}
                  </Link>
                  {item.href === "/solutions" && (
                    <ul className="mb-4 grid gap-1 xs:grid-cols-2">
                      {solutions.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/solutions/${s.slug}`}
                            onNavigate={closeAll}
                            aria-current={pathname === `/solutions/${s.slug}` ? "page" : undefined}
                            className="flex min-h-11 items-center gap-2.5 rounded-sm px-2 text-sm text-ink hover:bg-surface aria-[current=page]:bg-sage"
                          >
                            <SolutionIcon name={s.icon} className="size-4 text-forest-700" />
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Link
              href="/request-a-quote"
              onNavigate={closeAll}
              className={buttonClasses("primary", "lg", "mt-6 w-full")}
            >
              Get a Solar Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function ActiveBar() {
  return <span aria-hidden className="absolute inset-x-3 -bottom-[0.9rem] h-0.5 bg-forest" />;
}
