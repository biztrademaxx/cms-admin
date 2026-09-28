"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { LayoutDashboard, Users, UserCircle, LogOut } from "lucide-react";

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
  { href: "/sales", label: "Overview", icon: LayoutDashboard },
  { href: "/sales/profile", label: "My Performance", icon: UserCircle },
];

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-white">MAXX Sales</h1>
            <p className="text-sm text-gray-500">
              Welcome, {userName}
              {projectName ? (
                <span className="text-gray-400"> · {projectName}</span>
              ) : null}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onOpenProjectPicker ? (
              <Button size="sm" variant="outline" type="button" onClick={onOpenProjectPicker}>
                Change project
              </Button>
            ) : projectMemberships.length > 1 && onSwitchProject && projectId ? (
              <select
                value={projectId}
                onChange={(e) => onSwitchProject(e.target.value)}
                className="h-9 rounded-lg border border-gray-300 px-3 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white max-w-[220px]"
                aria-label="Switch project"
              >
                {projectMemberships.map((m) => (
                  <option key={m.projectId} value={m.projectId}>
                    {m.projectName}
                  </option>
                ))}
              </select>
            ) : null}
            <Button size="sm" variant="outline" onClick={onLogout} startIcon={<LogOut className="w-4 h-4" />}>
              Logout
            </Button>
          </div>
        </div>
        <nav className="max-w-7xl mx-auto px-6 flex gap-1 border-t border-gray-100 dark:border-gray-800">
          {navItems.map((item) => {
            const active =
              item.href === "/sales"
                ? pathname === "/sales" || pathname.startsWith("/sales/leads")
                : pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  active
                    ? "border-brand-500 text-brand-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="max-w-7xl mx-auto p-6">{children}</main>
    </div>
  );
};

export default SalesLayoutShell;
