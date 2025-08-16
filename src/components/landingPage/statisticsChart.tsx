"use client";
import React, { useMemo } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { GetProjectAnalyticsByIdDocument } from "@/gql_generated/graphql";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function StatisticsChart() {
  const projectId = useSelector((state: any) => state.project.projectId);

  const { data, loading } = useQuery(GetProjectAnalyticsByIdDocument, {
    variables: {
      input: {
        projectId,
        month: true,
      },
    },
    skip: !projectId,
  });

  const monthlyData = data?.getProjectAnalyticsById?.monthlyData;

  const series = useMemo(() => {
    if (!monthlyData) return [];
    return [
      { name: "Exhibitors", data: monthlyData.exhibitors ?? [] },
      { name: "Speakers", data: monthlyData.speakers ?? [] },
      { name: "Sponsors", data: monthlyData.sponsors ?? [] },
      { name: "Media Partners", data: monthlyData.mediaPartners ?? [] },
      { name: "Supporting Partners", data: monthlyData.supportingPartners ?? [] },
    ];
  }, [monthlyData]);

  const options: ApexOptions = {
    legend: { show: false, position: "top", horizontalAlign: "left" },
    colors: ["#465FFF", "#9CB9FF", "#34D399", "#F59E0B", "#EF4444"], // more colors for all series
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
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: {
        style: { fontSize: "12px", colors: ["#6B7280"] },
      },
      title: { text: "" },
    },
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Loading statistics...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Exhibitors, Speakers, Sponsors, Media & Supporting Partners
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <ReactApexChart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}
