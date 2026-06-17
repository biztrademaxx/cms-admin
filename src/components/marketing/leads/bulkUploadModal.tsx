"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import {
  BulkCreateLeadsDocument,
  GetFilteredLeadsDocument,
  LeadType,
} from "@/gql_generated/graphql";
import * as XLSX from "xlsx";
import { Upload, Download, AlertCircle, CheckCircle } from "lucide-react";

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

const TEMPLATE_HEADERS = [
  "name",
  "email",
  "phone",
  "companyName",
  "jobTitle",
  "city",
  "state",
  "country",
  "industry",
  "message",
];

const BulkUploadModal: React.FC<BulkUploadModalProps> = ({
  isOpen,
  onClose,
  projectId,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<Record<string, string>[]>([]);
  const [result, setResult] = useState<{
    created: number;
    failed: number;
    errors: string[];
  } | null>(null);
  const [uploading, setUploading] = useState(false);

  const [bulkCreate] = useMutation(BulkCreateLeadsDocument, {
    refetchQueries: [{ query: GetFilteredLeadsDocument, variables: { input: { projectId } } }],
  });

  const handleDownloadTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      TEMPLATE_HEADERS,
      [
        "John Doe",
        "john@example.com",
        "9876543210",
        "Acme Corp",
        "Manager",
        "Mumbai",
        "Maharashtra",
        "India",
        "Technology",
        "Interested in booth",
      ],
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "leads_upload_template.xlsx");
  };

  const parseFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    const buffer = await selectedFile.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, {
      defval: "",
    });
    setPreview(rows.slice(0, 5));
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, {
        defval: "",
      });

      const leads = rows
        .filter((row) => row.name?.trim() || row.email?.trim())
        .map((row) => ({
          name: String(row.name || row.Name || "").trim(),
          email: String(row.email || row.Email || "").trim(),
          phone: String(row.phone || row.Phone || "").trim() || undefined,
          companyName:
            String(row.companyName || row.Company || row.company || "").trim() ||
            undefined,
          jobTitle:
            String(row.jobTitle || row.Title || "").trim() || undefined,
          city: String(row.city || row.City || "").trim() || undefined,
          state: String(row.state || row.State || "").trim() || undefined,
          country:
            String(row.country || row.Country || "").trim() || undefined,
          industry:
            String(row.industry || row.Industry || "").trim() || undefined,
          message:
            String(row.message || row.Message || "").trim() || undefined,
          leadType: LeadType.Enquiry,
        }));

      const { data } = await bulkCreate({
        variables: { projectId, leads },
      });
      setResult(data?.bulkCreateLeads ?? null);
    } catch (err: any) {
      setResult({ created: 0, failed: 1, errors: [err.message] });
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setPreview([]);
    setResult(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-2xl m-4">
      <div className="p-6 lg:p-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Import Leads from Excel
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Upload an Excel file with lead data. Leads will be auto-assigned to
          sales people based on city and state.
        </p>

        <div className="flex gap-2 mb-6">
          <Button
            size="sm"
            variant="outline"
            onClick={handleDownloadTemplate}
            startIcon={<Download className="w-4 h-4" />}
          >
            Download Template
          </Button>
        </div>

        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-brand-500 transition-colors"
          onClick={() => document.getElementById("excel-input")?.click()}
        >
          <Upload className="w-10 h-10 mx-auto text-gray-400 mb-3" />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {file ? file.name : "Click to select Excel file (.xlsx, .xls, .csv)"}
          </p>
          <input
            id="excel-input"
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) parseFile(f);
            }}
          />
        </div>

        {preview.length > 0 && !result && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preview (first {preview.length} rows)
            </p>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {Object.keys(preview[0]).map((key) => (
                      <th key={key} className="px-3 py-2 text-left font-medium">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, i) => (
                    <tr key={i} className="border-t border-gray-100 dark:border-gray-800">
                      {Object.values(row).map((val, j) => (
                        <td key={j} className="px-3 py-2 text-gray-600 dark:text-gray-400">
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-medium text-green-700 dark:text-green-400">
                {result.created} leads imported successfully
              </span>
            </div>
            {result.failed > 0 && (
              <div className="mt-2">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-1">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {result.failed} rows failed
                  </span>
                </div>
                <ul className="text-xs text-red-500 max-h-32 overflow-y-auto">
                  {result.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={handleClose}>
            {result ? "Close" : "Cancel"}
          </Button>
          {!result && (
            <Button
              size="sm"
              onClick={handleUpload}
              disabled={!file || uploading}
            >
              {uploading ? "Uploading..." : "Import Leads"}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BulkUploadModal;
