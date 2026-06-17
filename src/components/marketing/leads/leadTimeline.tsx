"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GetLeadActivitiesDocument, GetLeadByIdDocument, LeadStatus } from "@/gql_generated/graphql";
import { getStatusLabel, getStatusColor } from "./leadStatusConfig";
import { getPhaseForStatus } from "./leadPipeline";
import Badge from "@/components/ui/badge/Badge";
import { convertISOtoNormal } from "@/utils/dateUtils";

interface LeadTimelineProps {
  leadId: string;
  currentStatus: LeadStatus;
}

const LeadTimeline: React.FC<LeadTimelineProps> = ({ leadId, currentStatus }) => {
  const { data: activityData, loading: activitiesLoading } = useQuery(
    GetLeadActivitiesDocument,
    { variables: { leadId }, skip: !leadId, errorPolicy: "ignore" }
  );

  const { data: leadData } = useQuery(GetLeadByIdDocument, {
    variables: { id: leadId },
    skip: !leadId,
  });

  const lead = leadData?.getLeadById;
  const apiActivities = activityData?.getLeadActivities;

  const activities =
    apiActivities && apiActivities.length > 0
      ? apiActivities
      : lead
        ? [
            {
              id: `created-${leadId}`,
              leadId,
              status: lead.status,
              previousStatus: null,
              notes: "Lead created",
              changedById: lead.assignedToId,
              changedByName: lead.assignedTo?.name ?? null,
              createdAt: lead.createdAt,
            },
          ]
        : [];

  if (activitiesLoading && !lead) {
    return <p className="text-sm text-gray-500 py-4">Loading timeline...</p>;
  }

  return (
    <div className="space-y-0">
      <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
        Lead Journey Timeline
      </h3>
      <div className="relative">
        {activities.map((activity, index) => {
          const phase = getPhaseForStatus(activity.status);
          const isLast = index === activities.length - 1;
          return (
            <div key={activity.id} className="flex gap-4 pb-6 relative">
              {!isLast && (
                <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
              )}
              <div
                className={`w-6 h-6 rounded-full shrink-0 mt-0.5 ${phase.color} ring-4 ring-white dark:ring-gray-900`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge size="sm" color={getStatusColor(activity.status)}>
                    {getStatusLabel(activity.status)}
                  </Badge>
                  {activity.previousStatus && (
                    <span className="text-xs text-gray-400">
                      from {getStatusLabel(activity.previousStatus)}
                    </span>
                  )}
                  {activity.status === currentStatus && isLast && (
                    <span className="text-xs font-medium text-brand-500">Current</span>
                  )}
                </div>
                {activity.notes && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    {activity.notes}
                  </p>
                )}
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  <span>{convertISOtoNormal(activity.createdAt)}</span>
                  {activity.changedByName && <span>by {activity.changedByName}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadTimeline;
