"use client";
import React, { useEffect } from "react";
import { Download } from "lucide-react";
import Button from "@/components/ui/button/Button";
import { DocumentNode } from "graphql";
import { useLazyQuery } from "@apollo/client";

// CSV export util
const exportToCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) =>
    Object.values(row)
      .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
      .join(",")
  );
  const csvString = [headers, ...rows].join("\n");

  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

interface ExportButtonProps {
  query: DocumentNode;
  dataKey: string;
  fileName: string;
  label?: string;
  projectId: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  query,
  dataKey,
  fileName,
  label,
  projectId,
}) => {
  const [getQueryData, { loading, data }] = useLazyQuery(query, {
    variables: { projectId },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.[dataKey] && data[dataKey].length > 0) {
      exportToCSV(data[dataKey], fileName);
    }else if(data?.[dataKey] && data[dataKey].length === 0){
      alert("No data to export")
    }
  }, [data, dataKey, fileName]);

  return (
    <Button
      size="sm"
      variant="outline"
      disabled={loading}
      onClick={() => getQueryData()}
      startIcon={<Download className="w-4 h-4" />}
    >
      {loading ? "Exporting..." : label || "Export CSV"}
    </Button>
  );
};

export default ExportButton;
