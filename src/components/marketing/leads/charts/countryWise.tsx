"use client";
import { GetLeadsGroupedByFieldDocument } from "@/gql_generated/graphql";
import { useQuery } from "@apollo/client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function CountryWisePieChart({ data }: any) {
  const countryWiseData = data ?? [];
  const countries = countryWiseData.map((item: any) => item.group) ?? [];
  const counts = countryWiseData.map((item: any) => item.count) ?? [];

  const options: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "Outfit, sans-serif",
    },
    labels: countries,
    colors: [
      "#465fff", // blue
      "#10b981", // green
      "#f59e0b", // amber
      "#ef4444", // red
      "#8b5cf6", // violet
      "#6b7280", // gray
      "#14b8a6", // teal
      "#e11d48", // rose
    ],
    legend: {
      position: "bottom",
      fontSize: "14px",
      labels: { colors: "var(--tw-prose-body)" },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
      style: {
        fontSize: "13px",
        fontWeight: "500",
        colors: ["#111827"], // sharp text
      },
      dropShadow: { enabled: false }, // remove blur
    },
    stroke: { width: 2 },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Countries",
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

  const series = counts;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        Country-wise Leads
      </h3>
      {countryWiseData.length === 0 ? (
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
