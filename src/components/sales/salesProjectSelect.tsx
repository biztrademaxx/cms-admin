"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { FolderKanban, LogOut } from "lucide-react";

type ProjectCard = {
  salesPersonId: string;
  projectId: string;
  projectName: string;
};

const SalesProjectSelect = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState("");
  const [hint, setHint] = useState("");

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading your projects...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <header className="border-b bg-white dark:bg-gray-900 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold text-gray-800 dark:text-white">MAXX Sales</h1>
          {userName ? (
            <p className="text-sm text-gray-500">Welcome, {userName}</p>
          ) : null}
        </div>
        <Button size="sm" variant="outline" onClick={handleLogout} startIcon={<LogOut className="w-4 h-4" />}>
          Logout
        </Button>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 text-center">
            Select a project
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Choose a project to view leads assigned to you in that project.
          </p>

          {projects.length === 0 ? (
            <div className="text-center text-gray-500 space-y-2">
              <p>You are not added to any project yet. Contact your admin.</p>
              {hint ? <p className="text-sm text-amber-600">{hint}</p> : null}
              <p className="text-xs">
                Admin: add this user under <strong>Marketing → Sales Team</strong> for each
                project, or use <strong>Add Existing</strong> to copy them to another project.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((p) => {
                const isCurrent = p.projectId === currentProjectId;
                return (
                  <button
                    key={p.projectId}
                    type="button"
                    disabled={!!selecting}
                    onClick={() => selectProject(p)}
                    className={`text-left rounded-2xl border p-6 transition hover:border-brand-500 hover:shadow-md dark:bg-gray-900 ${
                      isCurrent
                        ? "border-brand-500 ring-2 ring-brand-500/20"
                        : "border-gray-200 dark:border-gray-800 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-950/30 text-brand-600">
                        <FolderKanban className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 dark:text-white truncate">
                          {p.projectName}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {selecting === p.projectId
                            ? "Opening..."
                            : isCurrent
                              ? "Current project · Open dashboard"
                              : "View assigned leads"}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SalesProjectSelect;
