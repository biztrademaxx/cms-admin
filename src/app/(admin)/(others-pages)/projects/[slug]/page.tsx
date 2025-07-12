import StatisticsChart from "@/components/landingPage/statisticsChart";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Maxpo CMS ",
  description: "",
};


export default function ProjectPage() {
  
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6">
        
      </div>
        <div className="col-span-12">
        <StatisticsChart />
      </div>
    </div>
  );
}
