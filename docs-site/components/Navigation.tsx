"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Overview", href: "/" },
  { name: "Architecture", href: "/architecture" },
  { name: "API Contract", href: "/api" },
  { name: "Data Model", href: "/data-model" },
  { name: "Implementation", href: "/implementation" },
  { name: "Rollout", href: "/rollout" },
  { name: "AI Usage", href: "/ai" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-2 bg-white border border-mist rounded"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-white border-r border-mist p-8 overflow-y-auto">
        <Link href="/" className="block mb-12">
          <h1 className="font-headline text-2xl tracking-[0.04em] uppercase">
            Storyteller
          </h1>
          <p className="font-body text-xs text-silver mt-1">
            Personalized Feeds
          </p>
        </Link>

        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-3 py-2 font-body text-sm uppercase tracking-wide transition-colors ${
                  pathname === item.href
                    ? "bg-cloud text-ink border-l-2 border-ink"
                    : "text-silver hover:text-ink hover:bg-cloud"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 pt-8 border-t border-mist">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block font-body text-xs text-silver hover:text-ink uppercase tracking-wide"
          >
            View Prototype →
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white">
          <nav className="p-8 pt-20">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 font-body text-lg uppercase tracking-wide ${
                      pathname === item.href
                        ? "bg-cloud text-ink border-l-2 border-ink"
                        : "text-silver"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
