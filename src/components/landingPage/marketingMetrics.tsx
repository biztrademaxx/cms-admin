"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MarketingCard from "../marketing/utm/marketingCard";
import { GetLeadsGroupedByFieldDocument } from "@/gql_generated/graphql";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";

export const MarketingMetrics = () => {
  const router = useRouter();
  const projectId = useSelector((state: any) => state.project.projectId);
  const { data, loading } = useQuery(GetLeadsGroupedByFieldDocument, {
    variables: {
      input: {
        groupBy: "leadType",
        projectId,
      },
    },
  });
  const MarketingData = data?.getLeadsGroupedByField || [];


  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
      {loading ? (
        <div className="p-4 text-sm text-center text-gray-500 dark:text-white">
          Loading...
        </div>
      ) : (
        MarketingData.map((item: any, index: number) => (
          <MarketingCard
            key={index}
            count={item.count}
            name={item.group?.toLowerCase() || ""}
          />
        ))
      )}
    </div>
  );
};
