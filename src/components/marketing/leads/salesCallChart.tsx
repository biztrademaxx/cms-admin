"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "@/context/ThemeContext";
import { formatCallDate, type CallGrouping } from "@/lib/salesCallPeriods";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div className="h-80 animate-pulse rounded-lg bg-gray-50 dark:bg-gray-800" />,
});

interface Props {
  buckets: { startDate: string; calls: number; uniqueLeads: number }[];
  grouping: CallGrouping;
}

export default function SalesCallChart({ buckets, grouping }: Props) {
  const { theme } = useTheme();
  const options: ApexOptions = {
    chart: {
      type: "bar", toolbar: { show: true }, fontFamily: "Outfit, sans-serif",
      background: "transparent", foreColor: theme === "dark" ? "#9ca3af" : "#6b7280",
    },
    theme: { mode: theme },
    colors: ["#465fff"],
    plotOptions: { bar: { borderRadius: 4, columnWidth: "55%" } },
    dataLabels: { enabled: buckets.length <= 31 },
    grid: { borderColor: theme === "dark" ? "#374151" : "#e5e7eb" },
    xaxis: {
      categories: buckets.map((bucket) => formatCallDate(bucket.startDate, grouping)),
      labels: { rotate: -45, hideOverlappingLabels: true, trim: true, maxHeight: 90 },
      tickAmount: Math.min(buckets.length, 12),
    },
    yaxis: {
      min: 0, forceNiceScale: true,
      labels: { formatter: (value) => Math.round(value).toString() },
      title: { text: "Calls" },
    },
    tooltip: { y: { formatter: (value) => `${value} call${value === 1 ? "" : "s"}` } },
    noData: { text: "No calls in this period" },
  };
  return (
    <Chart options={options} series={[{ name: "Calls", data: buckets.map((bucket) => bucket.calls) }]}
      type="bar" height={340} />
  );
}
