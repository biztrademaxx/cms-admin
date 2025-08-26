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
import Button from "../../ui/button/Button";
import Badge from "../../ui/badge/Badge";
import UtmModal from "./utmModal";
import { useQuery } from "@apollo/client";
import { UTMEntry } from "./utm.types";
import { generateUTM } from "./common";
import { useSelector } from "react-redux";
import UtmMetrics from "./utmMetrics";
import {
  GetUtmByProjectIdDocument,
  LeadScalarFieldEnum,
} from "@/gql_generated/graphql";

export default function UTMDashboard({
  modal,
  formik,
}: {
  modal: any;
  formik: any;
}) {
  const [selectedEntry, setSelectedEntry] = React.useState<UTMEntry | null>(
    null
  );
  const projectId = useSelector((state: any) => state.project.projectId);
  const { openModal } = modal;
  const { data: utmData } = useQuery(GetUtmByProjectIdDocument, {
    skip: !projectId,
    variables: {
      id: projectId,
      input: {
        groupBy: [LeadScalarFieldEnum.UtmSource],
        projectId,
      },
    },
  });

  const handleCopy = async (entry: UTMEntry | any) => {
    const { source, medium, campaign, term, content, url } = entry;
    const text = generateUTM({
      url,
      source,
      medium,
      campaign,
      term,
      content,
    });
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  };

  const handleEdit = (entry: UTMEntry | any) => {
    openModal();
    setSelectedEntry(entry);
  };

  let uniqueClicks = 0;
  let visits = 0;

  // 🔹 Lookup map for quick table access
  let utmStats: Record<string, { visits: number; uniqueClicks: number }> = {};

  if (utmData?.getLeadsGroupedByField) {
    const utmSourceData = utmData.getLeadsGroupedByField.find(
      (f: any) => f.field === "utmSource"
    );

    if (utmSourceData) {
      const groups = utmSourceData.groups.filter(
        (g: any) => g.group !== "Unknown"
      );

      // Total visits = sum of counts
      visits = groups.reduce((acc: number, group: any) => acc + group.count, 0);

      // Collect all emails across groups for global unique clicks
      const allEmails = groups.flatMap(
        (g: any) => g.leads?.map((lead: any) => lead.email?.toLowerCase()) || []
      );
      const uniqueEmails = new Set(allEmails.filter(Boolean));
      uniqueClicks = uniqueEmails.size;

      // Build stats per group for table rows
      groups.forEach((g: any) => {
        const emails =
          g.leads?.map((lead: any) => lead.email?.toLowerCase()) || [];
        const uniqueEmailsInGroup = new Set(emails.filter(Boolean));

        utmStats[g.group] = {
          visits: g.count,
          uniqueClicks: uniqueEmailsInGroup.size, // ✅ correct per-campaign unique emails
        };
      });
    }
  }

  const utmMetrics = [
    {
      title: "Total Visits",
      value: visits || 0,
      icon: BarChart3,
    },
    {
      title: "Unique Clicks",
      value: uniqueClicks || 0,
      icon: Link2,
    },
    {
      title: "Total Campaigns",
      value: utmData?.getUtmByProject.length || 0,
      icon: Eye,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        <UtmMetrics data={utmMetrics} />
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
                {utmData?.getUtmByProject?.map((entry) => {
                  const stats = utmStats[entry.source] || {
                    visits: 0,
                    uniqueClicks: 0,
                  };

                  return (
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

                      {/* ✅ Visits */}
                      <TableCell className="px-4 py-4 text-gray-600 text-theme-sm dark:text-gray-400">
                        {stats.visits}
                      </TableCell>

                      {/* ✅ Unique Clicks */}
                      <TableCell className="px-4 py-4 text-gray-600 text-theme-sm dark:text-gray-400">
                        {stats.uniqueClicks}
                      </TableCell>

                      <TableCell className="px-4 py-4 text-theme-sm text-gray-600 dark:text-gray-400">
                        <Badge size="sm" color="success">
                          Active
                        </Badge>
                      </TableCell>

                      <TableCell className="px-4 py-4 gap-2 flex">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-theme-xs"
                          onClick={() => handleCopy(entry)}
                        >
                          <ClipboardCopy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-theme-xs"
                          onClick={() => handleEdit(entry)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <UtmModal
        modal={modal}
        editingItem={selectedEntry}
        setEditingItem={setSelectedEntry}
        formik={formik}
      />
    </div>
  );
}
