"use client";

import React from "react";
import MarketingCard from "../marketing/utm/marketingCard";

export const MarketingMetrics = ({ data }: any) => {
  const MarketingData = Array.isArray(data)
    ? [...data].sort((a: any, b: any) => b.count - a.count)?.slice(0, 10)
    : [];

  const marketingDataArray = MarketingData.map((item: any) => {
    return {
      name: item.group,
      count: item.count,
    };
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5  dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Leads Overview
        </h3>
        {/* optional: add a "view all" button */}
        {/* <button
          onClick={() => router.push("/leads")}
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          View all
        </button> */}
      </div>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {MarketingData.length === 0 ? (
          <div className="col-span-full p-6 text-center text-gray-500 dark:text-white/70">
            No data available
          </div>
        ) : (
          marketingDataArray.map((item: any, index: number) => (
            <MarketingCard
              key={index}
              count={item.count}
              name={item.name?.toLowerCase() || ""}
            />
          ))
        )}
      </div>
    </div>
  );
};
