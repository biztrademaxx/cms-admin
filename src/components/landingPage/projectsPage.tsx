"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import Link from "next/link";

import StatisticsChart from "./statisticsChart";
import MarketingCard from "../marketing/utm/marketingCard";
import { GetProjectByIdDocument } from "@/gql_generated/graphql";
import { convertISOtoNormal } from "@/utils/dateUtils";

const textStyle =
  "text-md  leading-relaxed tracking-tight text-gray-900 md:text-xl dark:text-white";

const ProjectsPage = () => {
  const projectName = useSelector((state: any) => state.project.projectName);
  const projectId = useSelector((state: any) => state.project.projectId);

  const { data, loading } = useQuery(GetProjectByIdDocument, {
    variables: { id: projectId },
  });

  const project = data?.getProjectBySlug || null;

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Project Details */}
      <div className="col-span-12 space-y-4">
        <h1 className="text-3xl font-bold leading-relaxed tracking-tight text-gray-900 md:text-4xl dark:text-white">
          {project?.name || projectName}
        </h1>
        {loading && (
          <div className="p-4 text-sm text-center text-gray-500 dark:text-white">
            Loading...
          </div>
        )}
        <div className="space-y-1">
          {project?.venue && <h4 className={textStyle}>{project.venue}</h4>}

          {project?.startDate && (
            <h4 className={textStyle}>
              Start: {convertISOtoNormal(project.startDate)}
            </h4>
          )}

          {project?.endDate && (
            <h4 className={textStyle}>
              End: {convertISOtoNormal(project.endDate)}
            </h4>
          )}

          {project?.year && (
            <h4 className={`${textStyle} font-bold`}>
              {project.year} <span className="ml-2"> {project.currency}</span>
            </h4>
          )}
        </div>
        {project?.website && (
          <Link
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-bold leading-relaxed tracking-tight md:text-xl text-brand-500"
          >
            {project.website}
          </Link>
        )}

        {project?.description && (
          <h4 className={`${textStyle} mb-3`}>{project.description}</h4>
        )}
      </div>

      {/* Marketing Cards */}
      <div className="col-span-12 grid grid-cols-1 sm:grid-cols-4 md:gap-6 space-y-2">
        <MarketingCard count={2} name="Participants" />
        <MarketingCard count={32} name="Exhibitors" />
        <MarketingCard count={23} name="Delegates" />
        <MarketingCard count={21} name="Sponsors" />
      </div>

      {/* Statistics Chart */}
      <div className="col-span-12">
        <StatisticsChart />
      </div>
    </div>
  );
};

export default ProjectsPage;
