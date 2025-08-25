"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { useMutation, useQuery, DocumentNode } from "@apollo/client";
import { useRouter } from "next/navigation";
import { convertISOtoNormal } from "@/utils/dateUtils";
import WarningModal from "../modals/warningModal";
import { useSelector } from "react-redux";

type ColumnType =
  | "avatar"
  | "text"
  | "link"
  | "badge"
  | "date"
  | "email"
  | "id";

interface ColumnConfig {
  key: string;
  label: string;
  type: ColumnType;
  subTextKey?: string;
}

interface EntityTableProps {
  title: string;
  query: DocumentNode;
  deleteMutation: DocumentNode;
  formik: any;
  modal: any;
  ModalComponent: React.ComponentType<any>;
  dataKey: string;
  columns: ColumnConfig[];
  actionSection?: Boolean;
  queryVariables?: Record<string, any>;
}

export default function EntityTable({
  title,
  query,
  deleteMutation,
  formik,
  modal,
  ModalComponent,
  dataKey,
  actionSection = true,
  columns,
  queryVariables
}: EntityTableProps) {
  const { openModal } = modal;
  const router = useRouter();
  const projectId = useSelector((state: any) => state.project.projectId);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const [deleteEntity] = useMutation(deleteMutation, {
    onCompleted: () => setDeleteModalOpen(false),
    refetchQueries: [{ query, variables: { projectId } }],
  });

  const { data, loading, error } = useQuery(query, {
    variables: queryVariables ? queryVariables : { projectId },
    skip: !projectId,
  });

  const tableData = data?.[dataKey] || [];

  function isURL(str: string) {
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
    return pattern.test(str);
  }

  const handleEdit = (item: any) => {
    setEditingItem(item);
    openModal();
    formik.setValues(item);
  };

  const handleDelete = async (item: any) => {
    await deleteEntity({ variables: { id: item.id } });
  };

  type BadgeColor=
    | "error"
    | "success"
    | "warning"
    | "info"
    
const badgeColor: Record<
  "ACTIVE" | "PENDING" | "SPONSOR" | "EXHIBITOR" | "DELEGATE" | "INACTIVE",
  BadgeColor
> = {
  ACTIVE: "success",
  PENDING: "warning",
  SPONSOR: "success",
  EXHIBITOR: "info",
  DELEGATE: "error",
  INACTIVE: "error",
};

  const renderCell = (item: any, col: ColumnConfig) => {
    const value = item[col.key];
    switch (col.type) {
      case "avatar":
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300 overflow-hidden">
              {item?.logoUrl || item?.image ? (
                <div className="relative w-10 h-10">
                  <Image
                    src={item.logoUrl ?? item.image}
                    alt={value}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              ) : (
                (value || "").slice(0, 2).toUpperCase()
              )}
            </div>
            <div>
              <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {value || "N/A"}
              </span>
              {col.subTextKey && (
                <span
                  className="block text-gray-500 text-theme-xs dark:text-gray-400 cursor-pointer truncate max-w-3xs"
                  onClick={() =>
                    isURL(item[col.subTextKey || ""])
                      ? router.push(item[col.subTextKey || ""])
                      : ""
                  }
                >
                  {item[col.subTextKey] || "N/A"}
                </span>
              )}
            </div>
          </div>
        );
      case "link":
        return (
          <span
            onClick={() => router.push(value)}
            className="text-blue-500 text-start text-theme-sm dark:text-blue-400 max-w-sm truncate cursor-pointer"
          >
            {col.label || "—"}
          </span>
        );
      case "id":
        return (
          <span
            onClick={() => router.push(`${col.subTextKey}/${item.id}` || value)}
            className="text-blue-500 text-start text-theme-sm dark:text-blue-400 max-w-xs truncate cursor-pointer"
          >
            {value || "—"}
          </span>
        );
      case "email":
        return (
          <a href={`mailto:${value}`} target="_blank">
            <span className="text-blue-500 text-start text-theme-sm dark:text-blue-400 max-w-sm truncate cursor-pointer">
              {col.label || "—"}
            </span>
          </a>
        );
      case "badge":
        return (
          <Badge
            size="sm"
            color={badgeColor[value?.toUpperCase() as keyof typeof badgeColor]}
          >
            {value ?? "_"}
          </Badge>
        );
      case "date":
        return convertISOtoNormal(value)?.toUpperCase() || "—";
      case "text":
        return (
          <span className="text-start text-theme-sm dark:text-white/90 max-w-3xs truncate">
            {value ?? "—"}
          </span>
        );
      default:
        return value || "—";
    }
  };

  if (loading)
    return (
      <p className="p-4 text-sm text-gray-500 text-center dark:text-white">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="p-4 text-sm text-red-500 text-center">
        Error loading {title.toLowerCase()}.
      </p>
    );

  const filteredData = tableData.filter((item: any) => {
    const matchesSearch = filters.search
      ? Object.values(item).some((val) =>
          String(val).toLowerCase().includes(filters.search.toLowerCase())
        )
      : true;

    const matchesStatus = filters.status
      ? String(item.status).toUpperCase() === filters.status.toUpperCase()
      : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-center gap-3 p-4 border-b border-gray-200 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.02]">
        {/* Search box */}
        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        {/* Status dropdown */}
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, status: e.target.value }))
          }
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="l">Active</option>
          <option value="PENDING">Pending</option>
          <option value="INACTIVE">Inactive</option>
        </select>

        {/* Clear button */}
        <button
          onClick={() => setFilters({ search: "", status: "" })}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.05]"
        >
          Reset
        </button>
      </div>

      {!filteredData?.length ? (
        <p className="p-4 text-sm text-gray-500 text-center dark:text-white">
          No {title.toLowerCase()} found.
        </p>
      ) : (
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      {col.label}
                    </TableCell>
                  ))}
                  {actionSection && (
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Actions
                    </TableCell>
                  )}
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {filteredData.map((item: any, index: number) => (
                  <TableRow key={index}>
                    {columns.map((col) => (
                      <TableCell
                        key={col.key}
                        className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400 text-start max-w-md truncate"
                      >
                        {renderCell(item, col)}
                      </TableCell>
                    ))}
                    {actionSection && (
                      <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="px-2 py-1 rounded-full border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setEditingItem(item);
                              setDeleteModalOpen(true);
                            }}
                            className="px-2 py-1 rounded-full border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* <Pagination
            currentPage={1}
            totalPages={2}
            onPageChange={() => {}}
          /> */}
        </div>
      )}
      <ModalComponent
        modal={modal}
        formik={formik}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />
      <WarningModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => handleDelete(editingItem)}
      />
    </div>
  );
}
