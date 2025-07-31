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

  interface ProjectWithYears {
    proj: typeof rawProjects[number];
    years?: number[];
  }

  const handleProjectClick = (
    year: number,
    name: string,
    yearMap: Record<number, string>
  ) => {
    router.push(`/projects`);
    if (!yearMap[year]) return;
    const projectId = yearMap[year];
    const projectName = name + " " + year;
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

  const rawProjects = data?.getAllProjects || [];

  // Group by slug and pick latest year
  const uniqueProjectsMap = new Map<
    string,
    {
      project: typeof rawProjects[number];
      years: number[];
      idMap: Record<number, string>; // maps year -> projectId
    }
  >();

  rawProjects.forEach((proj) => {
    const existing = uniqueProjectsMap.get(proj.slug);

    if (!existing) {
      uniqueProjectsMap.set(proj.slug, {
        project: proj,
        years: [proj.year],
        idMap: { [proj.year]: proj.id },
      });
    } else {
      if (!existing.years.includes(proj.year)) {
        existing.years.push(proj.year);
        existing.idMap[proj.year] = proj.id;
      }

      // Replace with latest project if current year is newer
      if (proj.year > existing.project.year) {
        existing.project = proj;
      }
    }
  });

  const uniqueProjects = Array.from(uniqueProjectsMap.values());

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {uniqueProjects.map(({ project, years, idMap }, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          years={years}
          Icon={index % 2 === 0 ? GroupIcon : BoxIconLine}
          idMap={idMap}
          onClick={(year, name) => handleProjectClick(year, name, idMap)}
        />
      ))}
    </div>
  );
};
