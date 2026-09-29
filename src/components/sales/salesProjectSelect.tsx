"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SalesBrandLogo from "./SalesBrandLogo";
import Button from "@/components/ui/button/Button";
import {
  SALES_ANALYTICS_PERIODS,
  type AnalyticsPeriodId,
} from "@/lib/salesAnalyticsPeriods";
import {
  ArrowRight,
  CalendarRange,
  CheckCircle2,
  FolderKanban,
  Loader2,
  LogOut,
  Target,
  TrendingUp,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";

type ProjectCard = {
  salesPersonId: string;
  projectId: string;
  projectName: string;
  total?: number;
  newLeads?: number;
  inProgress?: number;
  converted?: number;
  conversionRate?: number;
};

function StatSkeleton() {
  return (
    <span className="inline-block h-7 w-10 animate-pulse rounded-md bg-gray-200/80 dark:bg-gray-700/80" />
  );
}

function SummaryKpi({
  label,
  value,
  sub,
  icon: Icon,
  accent,
  loading,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  icon: React.ElementType;
  accent: "brand" | "emerald" | "amber" | "violet";
  loading?: boolean;
}) {
  const accents = {
    brand: "from-brand-500/15 to-brand-500/5 text-brand-600 dark:text-brand-400 ring-brand-500/20",
    emerald:
      "from-emerald-500/15 to-emerald-500/5 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20",
    amber:
      "from-amber-500/15 to-amber-500/5 text-amber-600 dark:text-amber-400 ring-amber-500/20",
    violet:
      "from-brand-700/15 to-brand-700/5 text-brand-700 dark:text-brand-400 ring-brand-700/20",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-gray-800/80 dark:bg-gray-900/80 ${loading ? "opacity-90" : ""}`}
    >
      <div
        className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${accents[accent]} opacity-60 blur-2xl`}
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-gray-900 dark:text-white">
            {loading ? <StatSkeleton /> : value}
          </p>
          {sub ? (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{sub}</p>
          ) : null}
        </div>
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ring-1 ${accents[accent]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

const SalesProjectSelect = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [selecting, setSelecting] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState("");
  const [hint, setHint] = useState("");
  const [periodId, setPeriodId] = useState<AnalyticsPeriodId>("30d");
  const [periodLabel, setPeriodLabel] = useState("Monthly (last 30 days)");

  useEffect(() => {
    try {
      const cached = sessionStorage.getItem("sales_project_options");
      if (cached) {
        const parsed = JSON.parse(cached) as ProjectCard[];
        if (parsed?.length) {
          setProjects(
            parsed.map((p) => ({
              salesPersonId: p.salesPersonId,
              projectId: p.projectId,
              projectName: p.projectName,
            }))
          );
        }
      }
    } catch {
      // ignore
    }

    fetch("/api/sales/projects")
      .then((r) => {
        if (r.status === 401) {
          router.push("/signin");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        setUserName(data.name ?? "");
        if (data.projects?.length) {
          setProjects(data.projects);
          sessionStorage.setItem(
            "sales_project_options",
            JSON.stringify(data.projects)
          );
        }
        setCurrentProjectId(data.currentProjectId ?? "");
        setHint(data.hint ?? "");
        if (data.projects?.length === 1 && !data.currentProjectId) {
          fetch("/api/sales/switch-project", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              projectId: data.projects[0].projectId,
              salesPersonId: data.projects[0].salesPersonId,
            }),
          }).then((r) => {
            if (r.ok) window.location.href = "/sales";
          });
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    if (loading || projects.length === 0) return;
    setAnalyticsLoading(true);
    fetch(`/api/sales/project-analytics?period=${periodId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.projects) return;
        setPeriodLabel(data.periodLabel ?? periodLabel);
        setProjects((prev) =>
          prev.map((p) => {
            const stats = data.projects.find(
              (a: ProjectCard) => a.projectId === p.projectId
            );
            return stats ? { ...p, ...stats } : p;
          })
        );
      })
      .finally(() => setAnalyticsLoading(false));
  }, [loading, periodId, projects.length]);

  const selectProject = async (project: ProjectCard) => {
    setSelecting(project.projectId);
    try {
      const res = await fetch("/api/sales/switch-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.projectId,
          salesPersonId: project.salesPersonId,
        }),
      });
      if (res.ok) {
        window.location.href = "/sales";
      }
    } finally {
      setSelecting(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/signout", { method: "POST" });
    router.push("/signin");
  };

  const totals = useMemo(() => {
    const totalAssigned = projects.reduce((s, p) => s + (p.total ?? 0), 0);
    const totalConverted = projects.reduce((s, p) => s + (p.converted ?? 0), 0);
    const totalNew = projects.reduce((s, p) => s + (p.newLeads ?? 0), 0);
    const totalInProgress = projects.reduce((s, p) => s + (p.inProgress ?? 0), 0);
    const overallRate = totalAssigned
      ? Math.round((totalConverted / totalAssigned) * 100)
      : 0;
    return { totalAssigned, totalConverted, totalNew, totalInProgress, overallRate };
  }, [projects]);

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-950">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,107,44,0.18),transparent)]"
          aria-hidden
        />
        <div className="relative flex flex-col items-center gap-4 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-brand-500" />
          <div>
            <p className="font-medium text-gray-800 dark:text-white">Loading your workspace</p>
            <p className="mt-1 text-sm text-gray-500">Fetching projects and analytics…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,107,44,0.2),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,107,44,0.1),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-40 h-96 w-96 rounded-full bg-brand-400/15 blur-3xl dark:bg-brand-600/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-20 h-80 w-80 rounded-full bg-brand-400/10 blur-3xl"
        aria-hidden
      />

      <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/80 backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-900/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-4">
            <SalesBrandLogo className="h-16 w-auto max-w-[260px] shrink-0 object-contain object-left" priority />
            {userName ? (
              <p className="text-sm text-gray-500">
                Hi, <span className="font-medium text-gray-700 dark:text-gray-300">{userName}</span>
              </p>
            ) : null}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleLogout}
            startIcon={<LogOut className="h-4 w-4" />}
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-6 py-8 pb-16">
        <section className="mb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <Target className="h-3.5 w-3.5" />
                Project hub
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Choose where you sell
              </h2>
              <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                Each card shows your assigned-lead performance for{" "}
                <span className="font-medium text-gray-800 dark:text-gray-200">{periodLabel}</span>.
                Open a project to manage your pipeline.
              </p>
            </div>

            <div className="w-full shrink-0 lg:w-72">
              <label
                htmlFor="analytics-period"
                className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500"
              >
                <CalendarRange className="h-3.5 w-3.5" />
                Analytics period
              </label>
              <div className="relative">
                <select
                  id="analytics-period"
                  value={periodId}
                  onChange={(e) => setPeriodId(e.target.value as AnalyticsPeriodId)}
                  className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-4 pr-10 text-sm font-medium text-gray-800 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  {SALES_ANALYTICS_PERIODS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  {analyticsLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {projects.length > 0 && (
          <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryKpi
              label="Assigned leads"
              value={totals.totalAssigned}
              sub="Across all projects"
              icon={Users}
              accent="brand"
              loading={analyticsLoading}
            />
            <SummaryKpi
              label="Converted"
              value={totals.totalConverted}
              sub="Sold or converted"
              icon={CheckCircle2}
              accent="emerald"
              loading={analyticsLoading}
            />
            <SummaryKpi
              label="In pipeline"
              value={totals.totalNew + totals.totalInProgress}
              sub={`${totals.totalNew} new · ${totals.totalInProgress} active`}
              icon={Zap}
              accent="amber"
              loading={analyticsLoading}
            />
            <SummaryKpi
              label="Conversion rate"
              value={`${totals.overallRate}%`}
              sub="For selected period"
              icon={TrendingUp}
              accent="violet"
              loading={analyticsLoading}
            />
          </section>
        )}

        {projects.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-gray-300 bg-white/70 p-10 text-center backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/70">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
              <FolderKanban className="h-7 w-7 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No projects yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              You are not added to any project. Contact your admin to get access.
            </p>
            {hint ? <p className="mt-4 text-sm font-medium text-amber-600 dark:text-amber-400">{hint}</p> : null}
          </div>
        ) : (
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Your projects ({projects.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {projects.map((p) => {
                const isCurrent = p.projectId === currentProjectId;
                const isOpening = selecting === p.projectId;
                const rate = p.conversionRate ?? 0;
                const total = p.total ?? 0;

                return (
                  <button
                    key={p.projectId}
                    type="button"
                    disabled={!!selecting}
                    onClick={() => selectProject(p)}
                    className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 ${
                      isCurrent
                        ? "border-brand-400 bg-gradient-to-br from-white to-brand-50/80 shadow-lg shadow-brand-500/10 dark:border-brand-500/50 dark:from-gray-900 dark:to-brand-950/30"
                        : "border-gray-200/90 bg-white/90 shadow-sm hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10 dark:border-gray-800 dark:bg-gray-900/90 dark:hover:border-brand-600/50"
                    } ${selecting && !isOpening ? "opacity-60" : ""}`}
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-700 to-brand-500 opacity-0 transition group-hover:opacity-100"
                      aria-hidden
                    />

                    <div className="p-6 sm:p-7">
                      <div className="mb-6 flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-500/30">
                          <FolderKanban className="h-6 w-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate text-lg font-bold text-gray-900 dark:text-white">
                              {p.projectName}
                            </h3>
                            {isCurrent ? (
                              <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                                Active
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {isOpening ? (
                              <span className="inline-flex items-center gap-1.5 text-brand-600">
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                Opening dashboard…
                              </span>
                            ) : (
                              "Tap to open leads & pipeline"
                            )}
                          </p>
                        </div>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition group-hover:bg-brand-500 group-hover:text-white dark:bg-gray-800">
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </div>
                      </div>

                      <div className="mb-5">
                        <div className="mb-2 flex items-center justify-between text-xs">
                          <span className="font-medium text-gray-500">Conversion progress</span>
                          <span className="font-bold tabular-nums text-brand-600 dark:text-brand-400">
                            {analyticsLoading ? "—" : `${rate}%`}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-500 transition-all duration-500"
                            style={{ width: analyticsLoading ? "0%" : `${Math.min(rate, 100)}%` }}
                          />
                        </div>
                        <p className="mt-1.5 text-xs text-gray-400">
                          {analyticsLoading ? (
                            "Updating stats…"
                          ) : (
                            <>
                              {p.converted ?? 0} converted of {total} assigned
                            </>
                          )}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {[
                          { label: "Assigned", value: p.total, icon: Users },
                          { label: "New", value: p.newLeads, icon: UserPlus },
                          { label: "Active", value: p.inProgress, icon: Zap },
                          { label: "Won", value: p.converted, icon: TrendingUp, highlight: true },
                        ].map((stat) => {
                          const StatIcon = stat.icon;
                          return (
                            <div
                              key={stat.label}
                              className="rounded-xl border border-gray-100 bg-gray-50/80 px-3 py-2.5 dark:border-gray-800 dark:bg-gray-800/40"
                            >
                              <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                <StatIcon className="h-3 w-3" />
                                {stat.label}
                              </div>
                              <p
                                className={`mt-1 text-lg font-bold tabular-nums ${
                                  stat.highlight
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "text-gray-900 dark:text-white"
                                }`}
                              >
                                {analyticsLoading ? "—" : stat.value ?? 0}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default SalesProjectSelect;
