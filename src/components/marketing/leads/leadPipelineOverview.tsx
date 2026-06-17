"use client";

import React from "react";
import { LeadStatus } from "@/gql_generated/graphql";
import { countByPhase } from "./leadPipeline";

interface LeadPipelineOverviewProps {
  leads: { status: LeadStatus }[];
}

const LeadPipelineOverview: React.FC<LeadPipelineOverviewProps> = ({ leads }) => {
  const phases = countByPhase(leads);
  const total = leads.length || 1;

  return (
    <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">
        Lead Pipeline Overview
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        {phases.map((phase) => (
          <div
            key={phase.id}
            className="rounded-lg border border-gray-100 dark:border-gray-800 p-3 text-center"
          >
            <div className={`w-3 h-3 rounded-full ${phase.color} mx-auto mb-2`} />
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{phase.count}</p>
            <p className="text-xs text-gray-500 mt-1">{phase.label}</p>
          </div>
        ))}
      </div>
      <div className="flex h-3 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {phases.map(
          (phase) =>
            phase.count > 0 && (
              <div
                key={phase.id}
                className={`${phase.color} transition-all`}
                style={{ width: `${(phase.count / total) * 100}%` }}
                title={`${phase.label}: ${phase.count}`}
              />
            )
        )}
      </div>
    </div>
  );
};

export default LeadPipelineOverview;
