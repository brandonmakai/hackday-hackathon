"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Analyze Page" },
    { href: "/history", label: "Consultation History" },
  ]

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col fixed h-screen left-0 top-0">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground tracking-tight">AI Beta Tester</h1>
        <p className="text-sm text-sidebar-foreground/60 mt-1">Dashboard</p>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-4 py-3 rounded-lg font-medium transition-colors duration-200",
              pathname === link.href
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-border",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground/50">
        <p>Beta v1.0</p>
      </div>
    </aside>
  )
}

