"use client";

import React from "react";
import { Eye, Link2, ClipboardCopy, BarChart3, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import Button from "../../ui/button/Button";
import Badge from "../../ui/badge/Badge";
import { useMutation, useQuery } from "@apollo/client";
import type { UTMEntry } from "./utm.types";
import { generateUTM } from "./common";
import { useSelector } from "react-redux";
import UtmMetrics from "./utmMetrics";
import {
  DeleteUtmDocument,
  GetUtmByProjectIdDocument,
  LeadScalarFieldEnum,
} from "@/gql_generated/graphql";

export default function UTMDashboard({ onEdit }: { onEdit: (entry: UTMEntry) => void }) {
  const [actionError, setActionError] = React.useState<string | null>(null);
  const projectId = useSelector((state: { project: { projectId: string } }) => state.project.projectId);
  const variables = {
    id: projectId,
    input: { groupBy: [LeadScalarFieldEnum.UtmSource], projectId },
  };
  const { data: utmData, loading, error } = useQuery(GetUtmByProjectIdDocument, {
    skip: !projectId,
    variables,
    fetchPolicy: "cache-and-network",
  });
  const [deleteUTM, { loading: deleting }] = useMutation(DeleteUtmDocument, {
    refetchQueries: [{ query: GetUtmByProjectIdDocument, variables }],
    awaitRefetchQueries: true,
  });

  const handleCopy = async (entry: UTMEntry) => {
    setActionError(null);
    try {
      const url = generateUTM(entry);
      if (!url) throw new Error("This UTM has an invalid website URL. Edit it before copying.");
      await navigator.clipboard.writeText(url);
      alert("Copied to clipboard");
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Unable to copy the UTM link.");
    }
  };

  const handleDelete = async (entry: UTMEntry) => {
    if (entry.leadCount > 0 || !projectId || deleting) return;
    if (!window.confirm(`Delete UTM campaign "${entry.campaign}"?`)) return;
    setActionError(null);
    try {
      await deleteUTM({ variables: { id: entry.id, projectId } });
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Unable to delete UTM.");
    }
  };

  let uniqueClicks = 0;
  let visits = 0;

  if (utmData?.getLeadsGroupedByField) {
    const utmSourceData = utmData.getLeadsGroupedByField.find(
      (f) => f.field === "utmSource"
    );

    if (utmSourceData) {
      const groups = utmSourceData.groups.filter(
        (g) => g.group !== "Unknown"
      );

      // Total visits = sum of counts
      visits = groups.reduce((acc, group) => acc + group.count, 0);

      // Collect all emails across groups for global unique clicks
      const allEmails = groups.flatMap(
        (g) => g.leads?.map((lead) => lead.email?.toLowerCase()) || []
      );
      const uniqueEmails = new Set(allEmails.filter(Boolean));
      uniqueClicks = uniqueEmails.size;
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

      {(actionError || error) && (
        <p role="alert" className="text-sm text-red-500">{actionError || error?.message}</p>
      )}
      {loading && <p className="text-sm text-gray-500">Loading campaigns...</p>}
      {!loading && !error && !utmData?.getUtmByProject.length && (
        <p className="text-sm text-gray-500">No UTM campaigns yet. Add a UTM to get started.</p>
      )}
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
                  const stats = {
                    visits: entry.leadCount,
                    uniqueClicks: entry.uniqueLeadCount,
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
                          onClick={() => onEdit(entry)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <span title={entry.leadCount > 0 ? "Campaigns with registration data cannot be deleted." : "Delete this empty campaign"}>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="text-theme-xs"
                            onClick={() => handleDelete(entry)}
                            disabled={entry.leadCount > 0 || deleting}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
