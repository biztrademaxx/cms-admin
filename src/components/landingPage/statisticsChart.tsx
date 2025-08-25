"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";

import { GetProjectAnalyticsByIdDocument } from "@/gql_generated/graphql";
import MarketingCard from "../marketing/utm/marketingCard";

// Dynamically import ApexChart
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

/** Categories shown in analytics */
const CATEGORY_KEYS = [
  "exhibitors",
  "speakers",
  "sponsors",
  "partners",
] as const;

const MARKET_KEYS = [
  "leads",
  "exhibitors",
  "partners",
  "speakers",
  "sponsors",
  "utms",
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  exhibitors: "Exhibitors",
  speakers: "Speakers",
  sponsors: "Sponsors",
  partners: "Partners",
  leads: "Leads",
  utms: "UTMs",
};

/** Shared Apex chart options */
const chartOptions: ApexOptions = {
  legend: { show: false, position: "top", horizontalAlign: "left" },
  colors: ["#465FFF", "#9CB9FF", "#34D399", "#F59E0B", "#EF4444"],
  chart: {
    fontFamily: "Outfit, sans-serif",
    height: 310,
    type: "line",
    toolbar: { show: false },
  },
  stroke: { curve: "straight", width: 2 },
  fill: {
    type: "gradient",
    gradient: { opacityFrom: 0.55, opacityTo: 0 },
  },
  markers: {
    size: 0,
    strokeColors: "#fff",
    strokeWidth: 2,
    hover: { size: 6 },
  },
  grid: {
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
  },
  dataLabels: { enabled: false },
  tooltip: {
    enabled: true,
    x: { format: "MMM yyyy" },
  },
  xaxis: {
    type: "category",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisBorder: { show: false },
    axisTicks: { show: false },
    tooltip: { enabled: false },
  },
  yaxis: {
    labels: { style: { fontSize: "12px", colors: ["#6B7280"] } },
  },
};

export default function StatisticsChart() {
  const projectId = useSelector((state: any) => state.project.projectId);

  const { data, loading } = useQuery(GetProjectAnalyticsByIdDocument, {
    variables: { input: { projectId, month: true } },
    skip: !projectId,
  });

  const analytics = data?.getProjectAnalyticsById || null;

  /** Build monthly chart series */
  const series = useMemo(() => {
    if (!analytics?.monthlyData) return [];
    return CATEGORY_KEYS.map((key) => ({
      name: CATEGORY_LABELS[key],
      data: analytics?.monthlyData?.[key] ? analytics?.monthlyData[key] : [],
    }));
  }, [analytics]);

  /** Build marketing summary cards */
  const marketSeries = useMemo(() => {
    if (!analytics) return [];
    return MARKET_KEYS.map((key) => ({
      name: CATEGORY_LABELS[key],
      count: (analytics as any)[key] ?? 0,
    }));
  }, [analytics]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Loading statistics...
      </div>
    );
  }
  return (
    <div>
      {/* Marketing Summary */}
      <div className="col-span-12 grid grid-cols-1 sm:grid-cols-4 md:gap-4 space-y-1 mb-4">
        {marketSeries.map((item, index) => (
          <MarketingCard key={index} count={item.count} name={item.name} />
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Statistics
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Exhibitors, Speakers, Sponsors, Partners(Media & Supporting)
            </p>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <div className="min-w-[1000px] xl:min-w-full">
            {!analytics || !analytics.monthlyData ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                No statistics found.
              </div>
            ) : (
              <ReactApexChart
                options={chartOptions}
                series={series}
                type="area"
                height={310}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
