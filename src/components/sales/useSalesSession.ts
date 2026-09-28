"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface SalesSession {
  name: string;
  salesPersonId: string;
  projectId: string;
  projectName?: string;
}

export function useSalesSession() {
  const router = useRouter();
  const [session, setSession] = useState<SalesSession | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const loadSession = useCallback(() => {
    setLoadingSession(true);
    return fetch("/api/session")
      .then((r) => r.json())
      .then((data) => {
        if (data.role !== "SALES" || !data.salesPersonId) {
          router.push("/signin");
          return null;
        }
        if (!data.projectId) {
          router.push("/sales/select-project");
          return null;
        }
        const next: SalesSession = {
          name: data.name,
          salesPersonId: data.salesPersonId,
          projectId: data.projectId,
          projectName: data.projectName,
        };
        setSession(next);
        return next;
      })
      .finally(() => setLoadingSession(false));
  }, [router]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const [projectMemberships, setProjectMemberships] = useState<
    { salesPersonId: string; projectId: string; projectName: string }[]
  >([]);

  useEffect(() => {
    if (!session?.salesPersonId) return;
    fetch("/api/sales/projects")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.projects?.length) {
          setProjectMemberships(data.projects);
        }
      })
      .catch(() => {});
  }, [session?.salesPersonId, session?.projectId]);

  const switchProject = async (projectId: string) => {
    const res = await fetch("/api/sales/switch-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId }),
    });
    if (!res.ok) return;
    window.location.href = "/sales";
  };

  const openProjectPicker = () => {
    router.push("/sales/select-project");
  };

  const handleLogout = async () => {
    await fetch("/api/signout", { method: "POST" });
    router.push("/signin");
  };

  return {
    session,
    loadingSession,
    projectMemberships,
    switchProject,
    openProjectPicker,
    handleLogout,
  };
}
