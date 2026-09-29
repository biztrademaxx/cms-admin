"use client";

import React, { useState } from "react";
import Link from "next/link";
import SalesBrandLogo from "./SalesBrandLogo";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import {
  LayoutDashboard,
  UserCircle,
  LogOut,
  Menu,
  X,
  FolderKanban,
  ChevronRight,
} from "lucide-react";

export interface SalesProjectMembership {
  salesPersonId: string;
  projectId: string;
  projectName: string;
}

interface SalesLayoutShellProps {
  userName: string;
  projectName?: string;
  projectId?: string;
  projectMemberships?: SalesProjectMembership[];
  onSwitchProject?: (projectId: string) => void | Promise<void>;
  onOpenProjectPicker?: () => void;
  children: React.ReactNode;
  onLogout: () => void;
}

const navItems = [
  {
    href: "/sales",
    label: "Dashboard",
    description: "Leads & pipeline",
    icon: LayoutDashboard,
  },
  {
    href: "/sales/profile",
    label: "Performance",
    description: "Your stats",
    icon: UserCircle,
  },
];

function pageTitleFromPath(pathname: string): string {
  if (pathname.startsWith("/sales/leads/")) return "Lead details";
  if (pathname === "/sales/profile") return "My performance";
  return "Dashboard";
}

const SalesLayoutShell: React.FC<SalesLayoutShellProps> = ({
  userName,
  projectName,
  projectId,
  projectMemberships = [],
  onSwitchProject,
  onOpenProjectPicker,
  children,
  onLogout,
}) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pageTitle = pageTitleFromPath(pathname);

  const isActive = (href: string) => {
    if (href === "/sales") {
      return pathname === "/sales" || pathname.startsWith("/sales/leads");
    }
    return pathname === href;
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-gray-200/80 px-5 py-6 dark:border-gray-800">
        <SalesBrandLogo className="h-16 w-auto max-w-[240px] shrink-0 object-contain object-left" priority />
        <button
          type="button"
          className="ml-auto rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden dark:hover:bg-gray-800"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
          Menu
        </p>
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all ${
                active
                  ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  active
                    ? "bg-white/20"
                    : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:group-hover:bg-gray-700"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">{item.label}</span>
                <span
                  className={`block truncate text-xs ${
                    active ? "text-white/80" : "text-gray-400"
                  }`}
                >
                  {item.description}
                </span>
              </span>
              {active ? <ChevronRight className="h-4 w-4 shrink-0 opacity-80" /> : null}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3 border-t border-gray-200/80 p-4 dark:border-gray-800">
        <div className="rounded-xl border border-gray-200/80 bg-gray-50/80 p-3 dark:border-gray-800 dark:bg-gray-900/50">
          <div className="flex items-start gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <FolderKanban className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                Active project
              </p>
              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                {projectName || "—"}
              </p>
            </div>
          </div>
          {onOpenProjectPicker ? (
            <button
              type="button"
              onClick={onOpenProjectPicker}
              className="mt-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-brand-300 hover:text-brand-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-brand-600"
            >
              Switch project
            </button>
          ) : projectMemberships.length > 1 && onSwitchProject && projectId ? (
            <select
              value={projectId}
              onChange={(e) => onSwitchProject(e.target.value)}
              className="mt-3 h-9 w-full rounded-lg border border-gray-200 bg-white px-2 text-xs dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              aria-label="Switch project"
            >
              {projectMemberships.map((m) => (
                <option key={m.projectId} value={m.projectId}>
                  {m.projectName}
                </option>
              ))}
            </select>
          ) : null}
        </div>

        <div className="flex items-center gap-3 rounded-xl px-1 py-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">
            {userName?.charAt(0)?.toUpperCase() || "S"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
              {userName}
            </p>
            <p className="text-xs text-gray-500">Sales account</p>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="w-full justify-center"
          onClick={onLogout}
          startIcon={<LogOut className="h-4 w-4" />}
        >
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0C0C0C]">
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close sidebar overlay"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[17.5rem] flex-col border-r border-gray-200/80 bg-white transition-transform duration-200 dark:border-gray-800 dark:bg-gray-950 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </aside>

      <div className="flex min-h-screen flex-col lg:pl-[17.5rem]">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-gray-200/80 bg-white/90 px-4 py-3 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/90 lg:px-8">
          <button
            type="button"
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-bold text-gray-900 dark:text-white">
              {pageTitle}
            </h1>
            {projectName ? (
              <p className="truncate text-xs text-gray-500">{projectName}</p>
            ) : null}
          </div>
          <ThemeToggleButton />
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default SalesLayoutShell;
