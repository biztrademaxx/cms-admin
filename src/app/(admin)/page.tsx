import { ProjectsMetrics } from "@/components/landingPage/projectsMetrics";
import StatisticsChart from "@/components/landingPage/statisticsChart";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Business CMS ",
  description: "",
};


export default function Projects() {
  
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6">
        <ProjectsMetrics />
      </div>
   
    </div>
  );
}
