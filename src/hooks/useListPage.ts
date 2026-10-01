"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useListPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const raw = Number(searchParams.get("page"));
  const page = Number.isInteger(raw) && raw > 0 ? raw : 1;
  const letter = normalizeLetter(searchParams.get("letter") ?? "");

  const replaceQuery = useCallback(
    (params: URLSearchParams) => {
      const query = params.toString();
      const href = query ? `${pathname}?${query}` : pathname;
      router.replace(href, { scroll: false });
    },
    [pathname, router]
  );

  const setPage = useCallback(
    (next: number | ((current: number) => number)) => {
      const resolved = typeof next === "function" ? next(page) : next;
      const safe = Number.isFinite(resolved) ? Math.max(1, Math.floor(resolved)) : 1;
      const params = new URLSearchParams(searchParams.toString());
      if (safe <= 1) params.delete("page");
      else params.set("page", String(safe));
      replaceQuery(params);
    },
    [page, replaceQuery, searchParams]
  );

  const setLetter = useCallback(
    (next: string) => {
      const safe = normalizeLetter(next);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      if (safe) params.set("letter", safe);
      else params.delete("letter");
      replaceQuery(params);
    },
    [replaceQuery, searchParams]
  );

  return { page, setPage, letter, setLetter };
}

function normalizeLetter(value: string) {
  const next = value.trim().toUpperCase();
  if (next === "#") return "#";
  return /^[A-Z]$/.test(next) ? next : "";
}
