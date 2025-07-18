"use client";

import React from "react";
import { BoxIconLine, GroupIcon } from "@/icons";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GetAllProjectsDocument } from "@/gql_generated/graphql";
import { useDispatch } from "react-redux";
import { setProject } from "@/store/projectSlice";
import ProjectCard from "./projectCard";

export const ProjectsMetrics = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, data } = useQuery(GetAllProjectsDocument, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  const handleProjectClick = (projectId: string, projectName: string) => {
    router.push(`/projects`);
    dispatch(setProject({ projectId, projectName }));
    localStorage.setItem("projectId", projectId);
  };

  if (loading) {
    return (
      <div className="p-4 text-sm text-center text-gray-500 dark:text-white">
        Loading...
      </div>
    );
  }

  const projects = data?.getAllProjects || [];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          Icon={index % 2 === 0 ? GroupIcon : BoxIconLine}
          onClick={handleProjectClick}
        />
      ))}
    </div>
  );
};
