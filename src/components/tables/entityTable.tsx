"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { useMutation, useQuery, DocumentNode } from "@apollo/client";
import {
  UpdateExhibitorOrderDocument,
  UpdateSponsorOrderDocument,
} from "@/gql_generated/graphql";
import { useRouter } from "next/navigation";
import { convertISOtoNormal } from "@/utils/dateUtils";
import WarningModal from "../modals/warningModal";
import { useSelector } from "react-redux";
import Button from "../ui/button/Button";

// Row wrapper (always <tr>)
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export function TableRow({ children, ...props }: TableRowProps) {
  return <tr {...props}>{children}</tr>;
}

// Column config types
type ColumnType = "avatar" | "text" | "link" | "badge" | "date" | "email" | "id";

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
  actionSection?: boolean;
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
  queryVariables,
}: EntityTableProps) {
  const { openModal } = modal;
  const router = useRouter();
  const projectId = useSelector((state: any) => state.project.projectId);

  const [filters, setFilters] = useState({ search: "", status: "" });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [reOrder, setReOrder] = useState<boolean>(false);

  const [deleteEntity] = useMutation(deleteMutation, {
    onCompleted: () => setDeleteModalOpen(false),
    refetchQueries: [{ query, variables: { projectId } }],
  });

  const [updateExhibitorOrder] = useMutation(UpdateExhibitorOrderDocument, {
    refetchQueries: [
      { query, variables: queryVariables ? queryVariables : { projectId } },
    ],
  });

  const [updateSponsorOrder] = useMutation(UpdateSponsorOrderDocument, {
    refetchQueries: [
      { query, variables: queryVariables ? queryVariables : { projectId } },
    ],
  });

  const { data, loading, error } = useQuery(query, {
    variables: queryVariables ? queryVariables : { projectId },
    skip: !projectId,
  });

  const tableData = data?.[dataKey] || [];

  function isURL(str: string) {
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/i;
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

  type BadgeColor = "error" | "success" | "warning" | "info";

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

  useEffect(() => {
    if (tableData) {
      const sorted = [...tableData].sort(
        (a, b) => (a.seqNo || 0) - (b.seqNo || 0)
      );
      setItems(sorted);
    }
  }, [tableData]);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null) return;
    const updated = [...items];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, moved);

    // resequence by index
    const resequenced = updated.map((item, i) => ({
      ...item,
      seqNo: i + 1,
    }));

    setItems(resequenced);
    setDraggedIndex(null);
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
                String(value || "").slice(0, 2).toUpperCase()
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

  const filteredData = items.filter((item: any) => {
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
          <option value="ACTIVE">Active</option>
          <option value="PENDING">Pending</option>
          <option value="INACTIVE">Inactive</option>
        </select>

        {/* Clear button */}
        <Button
          onClick={() => setFilters({ search: "", status: "" })}
          variant="outline"
          size="sm"
        >
          Reset
        </Button>
        <Button
          onClick={() => setReOrder((prev) => !prev)}
          variant="outline"
          size="sm"
        >
          {reOrder ? "Cancel" : "ReOrder"}
        </Button>
{reOrder && (
        <Button
          size="sm"
          onClick={async () => {
            const payload = items.map(({ id, seqNo }) => ({ id, seqNo }));

            const mutationFn = () =>
              dataKey.toLowerCase().includes("sponsor")
                ? updateSponsorOrder({ variables: { inputs: payload } })
                : updateExhibitorOrder({ variables: { inputs: payload } });

            toast.promise(
              mutationFn() as Promise<any>,
              {
                loading: "Updating order...",
                success: "Order updated successfully ✅",
                error: "Failed to update order ❌",
              },
              { style: { minWidth: "250px" } }
            );

            setReOrder(false);
          }}
          className="px-3 py-2 rounded-lg border border-gray-300 bg-blue-500 text-white text-sm hover:bg-blue-700"
        >
          Save
        </Button>
)}
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
                {items.map((item: any, index: number) => (
                  <TableRow
                    key={item.id}
                    draggable={reOrder}
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.add("bg-gray-100", "dark:bg-gray-800");
                    }}
                    onDragEnd={() => setDraggedIndex(null)}
                    onDragLeave={(e) =>
                      e.currentTarget.classList.remove(
                        "bg-gray-100",
                        "dark:bg-gray-800"
                      )
                    }
                    onDrop={() => handleDrop(index)}
                    className={`${reOrder ? "cursor-move" : ""} transition-colors`}
                  >
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
