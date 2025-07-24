"use client";
import React from "react";
import { useSelector } from "react-redux";
import StatisticsChart from "./statisticsChart";
import MarketingCard from "../marketing/utm/marketingCard";

const ProjectsPage = () => {
  const projectName = useSelector((state: any) => state.project.projectName);

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6">
        <h1 className="text-3xl font-bold leading-relaxed tracking-tight text-gray-900 md:text-4xl dark:text-white">
          {projectName}
        </h1>
      </div>
      <div className="col-span-12  grid grid-cols-1 sm:grid-cols-4 md:gap-6">
        <MarketingCard count={2} name="Participants" />
        <MarketingCard count={32} name="Exhibitors" />
        <MarketingCard count={23} name="Delegates" />
        <MarketingCard count={21} name="Sponsors" />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>
    </div>
  );
};

export default ProjectsPage;
