"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function IndustryWisePieChart({ data }: any) {
  const industryData = Array.isArray(data)
    ? [...data].sort((a: any, b: any) => b.count - a.count)?.slice(0, 10)
    : [];

  const industries =
    industryData.map((item: any) => (item.group ? item.group : "UNKNOWN")) ??
    [];
  const counts = industryData.map((item: any) => item.count) ?? [];

  const options: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "Outfit, sans-serif",
    },
    labels: industries,
    colors: [
      "#FF6B2C",
      "#10b981", // green
      "#f59e0b", // amber
      "#ef4444", // red
      "#8b5cf6", // violet
      "#6b7280", // gray
    ],
    legend: {
      position: "bottom",
      fontSize: "14px",
      labels: {
        colors: "var(--tw-prose-body)",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
      dropShadow: {
        enabled: false, // 👈 disable blur/shadow
      },
    },

    stroke: {
      width: 2,
    },

    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Industries",
              fontSize: "16px",
              fontWeight: 600,
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} Leads`,
      },
    },
  };

  const series = counts; // Replace with API data

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        Industry-wise Leads
      </h3>
      {industryData.length === 0 ? (
        <div className="col-span-full p-6 text-center text-gray-500 dark:text-white/70">
          No data available
        </div>
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={320}
        />
      )}
    </div>
  );
}
