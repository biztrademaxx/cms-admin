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

export default function IndustryWisePieChart() {
  const projectId = useSelector((state: any) => state.project.projectId);
  const { data, loading } = useQuery(GetLeadsGroupedByFieldDocument, {
    variables: {
      input: {
        projectId: projectId,
        groupBy: "industry",
      },
    },
  });

  const dataArray = data?.getLeadsGroupedByField || [];
  const industries = dataArray.map((item: any) => item.group) ?? [];
  const counts = dataArray.map((item: any) => item.count) ?? [];
  console.log(industries);
  const options: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "Outfit, sans-serif",
    },
    labels: industries,
    colors: [
      "#465fff", // TailAdmin blue
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
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        Industry-wise Leads
      </h3>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={320}
      />
    </div>
  );
}
