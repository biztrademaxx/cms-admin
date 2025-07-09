"use client";

import React from "react";
import { Eye, Link2, ClipboardCopy, BarChart3 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";
import UtmModal from "./utmModal";
import { useModal } from "@/hooks/useModal";
import { useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import { GetUtmBySlugDocument } from "@/gql_generated/graphql";

const utmMetrics = [
  {
    title: "Total Visits",
    value: "3,289",
    icon: BarChart3,
    selected: true,
  },
  {
    title: "Unique Clicks",
    value: "2,115",
    icon: Link2,
  },
  {
    title: "Total Campaigns",
    value: "6",
    icon: Eye,
  },
];

interface UTMEntry {
  id: number;
  campaign: string;
  source: string;
  medium: string;
  visits: number;
  uniqueClicks: number;
  status: string;
  fullURL: string;
}

// const utmData: UTMEntry[] = [
//   {
//     id: 1,
//     campaign: "Summer_Sale",
//     source: "Google",
//     medium: "CPC",
//     visits: 1200,
//     uniqueClicks: 900,
//     status: "Active",
//     fullURL:
//       "https://yourdomain.com/?utm_source=google&utm_medium=cpc&utm_campaign=Summer_Sale",
//   },
//   {
//     id: 2,
//     campaign: "B2B_Launch",
//     source: "LinkedIn",
//     medium: "Social",
//     visits: 540,
//     uniqueClicks: 490,
//     status: "Paused",
//     fullURL:
//       "https://yourdomain.com/?utm_source=linkedin&utm_medium=social&utm_campaign=B2B_Launch",
//   },
// ];

export default function UTMDashboard() {
  const { isOpen, openModal, closeModal } = useModal();
  const pathname = usePathname();
  const projectSlug = pathname.split("/")[2] || ""; // Assuming the slug is the second segment in the path
  const {data:utmData, loading, error} = useQuery(GetUtmBySlugDocument,{
    skip: !projectSlug,
    variables: {
      slug: projectSlug
    }
  });
  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  };
  const handleAdd = () => {
    openModal();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Button size="sm" onClick={handleAdd}>
          + Add UTM
        </Button>
      </div>
      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {utmMetrics.map((metric, index) => (
          <div
            key={index}
            className={`rounded-2xl border bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 ${
              metric.selected
                ? "border-brand-500 dark:text-brand-400"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <metric.icon className="text-gray-800 size-6 dark:text-white/90" />
            </div>

            <div className="mt-5">
              <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">
                {metric.value}
              </h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {metric.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* UTM Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1100px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Campaign
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Source / Medium
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Visits
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Unique Clicks
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {utmData?.getUtmByProject?.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="px-5 py-4 text-start">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {entry.campaign}
                        </span>
                        <span className="block text-theme-xs text-gray-500 dark:text-gray-400 truncate max-w-[240px]">
                          {entry.url}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-4 text-gray-600 text-theme-sm dark:text-gray-400">
                      <span className="block">{entry.source}</span>
                      <span className="block text-theme-xs text-gray-400 dark:text-gray-500">
                        {entry.medium}
                      </span>
                    </TableCell>

                    <TableCell className="px-4 py-4 text-gray-600 text-theme-sm dark:text-gray-400">
                      {entry.visits ?? "-"}
                    </TableCell>

                    <TableCell className="px-4 py-4 text-gray-600 text-theme-sm dark:text-gray-400">
                      {entry.uniqueClicks ?? "-"}
                    </TableCell>

                    <TableCell className="px-4 py-4 text-theme-sm text-gray-600 dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          entry?.status === "Active"
                            ? "success"
                            : entry?.status === "Paused"
                            ? "warning"
                            : "error"
                        }
                      >
                        {entry.status ?? "Active"} 
                      </Badge>
                    </TableCell>

                    <TableCell className="px-4 py-4 gap-2 flex">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-theme-xs"
                        onClick={() => handleCopy(entry.url)}
                      >
                        <ClipboardCopy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-theme-xs"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <UtmModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}
