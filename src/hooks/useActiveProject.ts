"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProject } from "@/store/projectSlice";

export function useActiveProject() {
  const dispatch = useDispatch();
  const { projectId, projectName } = useSelector((state: any) => state.project);

  useEffect(() => {
    if (projectId) return;
    const storedId = localStorage.getItem("projectId");
    const storedName = localStorage.getItem("projectName");
    if (storedId && storedName) {
      dispatch(setProject({ projectId: storedId, projectName: storedName }));
    }
  }, [dispatch, projectId]);

  return { projectId, projectName };
}
