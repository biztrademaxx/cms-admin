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

  const [bookmarks, setBookmarks] = React.useState<string[]>([]);

  React.useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("bookmarkedProjects") || "[]"
    );
    setBookmarks(saved);
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id];
      localStorage.setItem("bookmarkedProjects", JSON.stringify(updated));
      return updated;
    });
  };

  const handleToggleBookmark = (projectId: string) => {
    setBookmarks((prev) => {
      const updated = prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId];

      localStorage.setItem("bookmarkedProjects", JSON.stringify(updated));
      return updated;
    });
  };

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
    localStorage.setItem("projectName", projectName);
  };

  if (loading) {
    return (
      <div className="p-4 text-sm text-center text-gray-500 dark:text-white">
        Loading...
      </div>
    );
  }

  const rawProjects = data?.getAllProjects || [];

  // Group by slug
  const uniqueProjectsMap = new Map<
    string,
    {
      project: typeof rawProjects[number];
      years: number[];
      idMap: Record<number, string>;
    }
  >();

  rawProjects.forEach((proj) => {
    const existing = uniqueProjectsMap.get(proj.slug);
    const year = proj.year ?? new Date(proj.startDate || "").getFullYear();
    if (!existing) {
      uniqueProjectsMap.set(proj.slug, {
        project: proj,
        years: [year],
        idMap: { [year]: proj.id  },
      });
    } else {
      if (!existing.years.includes(year)) {
        existing.years.push(year);
        existing.idMap[year] = proj.id;
      }
      if (year > (existing.project.year ?? 0)) {
        existing.project = proj;
      }
    }
  });

  const uniqueProjects = Array.from(uniqueProjectsMap.values());

  // Split bookmarked vs normal
  const bookmarkedProjects = uniqueProjects.filter(({ project }) =>
    bookmarks.includes(project.id)
  );
  const otherProjects = uniqueProjects.filter(
    ({ project }) => !bookmarks.includes(project.id)
  );

  return (
    <div className="space-y-8">
      {/* Bookmarked Section */}
      {bookmarkedProjects.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white">
            ⭐ Bookmarked Projects
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {bookmarkedProjects.map(({ project, years, idMap }, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                years={years}
                Icon={index % 2 === 0 ? GroupIcon : BoxIconLine}
                idMap={idMap}
                onClick={(year, name) => handleProjectClick(year, name, idMap)}
                onToggleBookmark={toggleBookmark} // ✅ use correct prop
                isBookmarked={bookmarks.includes(project.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Projects Section */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white">
          All Projects
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          {otherProjects.map(({ project, years, idMap }, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              years={years}
              Icon={index % 2 === 0 ? GroupIcon : BoxIconLine}
              idMap={idMap}
              onClick={(year, name) => handleProjectClick(year, name, idMap)}
              onToggleBookmark={toggleBookmark} // ✅ use correct prop
              isBookmarked={bookmarks.includes(project.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
