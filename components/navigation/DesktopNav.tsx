"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/lib/navigation";

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav className="desktop-navigation" aria-label="Primary navigation">
      <ul>
        {navigationItems.map(({ label, href }) => (
          <li key={label}>
            {href ? (
              <Link href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
            ) : (
              <span className="navigation-pending" aria-disabled="true" title="Available soon">
                {label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
