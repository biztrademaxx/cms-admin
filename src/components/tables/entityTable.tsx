"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHeader } from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { useMutation, useQuery, DocumentNode } from "@apollo/client";
import { useRouter } from "next/navigation";
import { convertISOtoNormal } from "@/utils/dateUtils";
import WarningModal from "../modals/warningModal";
import { useSelector } from "react-redux";
import { Status } from "@/gql_generated/graphql";
import DatePicker from "../form/date-picker";
import Button from "../ui/button/Button";
import Select from "../form/Select";
import { ChevronDownIcon } from "lucide-react";
import Pagination from "./Pagination";

/* ---------------------------------- Types --------------------------------- */
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
  updateOrderMutation?: DocumentNode;
  formik: any;
  modal: any;
  ModalComponent: React.ComponentType<any>;
  dataKey: string;
  columns: ColumnConfig[];
  actionSection?: boolean;
  queryVariables?: Record<string, any>;
  statusConfig?: { label: string; value: any }[];
}

type BadgeColor = "error" | "success" | "warning" | "info";

/* ---------------------------- Config -------------------------------------- */
const defaultStatusConfig = [
  { label: "Active", value: Status.Active },
  { label: "Pending", value: Status.Pending },
  { label: "Inactive", value: Status.Inactive },
];

const badgeColor: Record<string, BadgeColor> = {
  ACTIVE: "success",
  PENDING: "warning",
  SPONSOR: "success",
  EXHIBITOR: "info",
  DELEGATE: "error",
  INACTIVE: "error",
};

/* --------------------------- Utility Functions ---------------------------- */
const isURL = (str: string) =>
  /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/i.test(
    str
  );

/* --------------------------- Hooks ---------------------------------------- */
function useEntityData(
  query: DocumentNode,
  deleteMutation: DocumentNode,
  updateOrderMutation: DocumentNode | undefined,
  dataKey: string,
  queryVariables: Record<string, any> | undefined,
  projectId: string
) {
  const { data, loading, error } = useQuery(query, {
    variables: queryVariables ?? { projectId },
    skip: !projectId,
  });

  const [deleteEntity] = useMutation(deleteMutation, {
    refetchQueries: [{ query, variables: { projectId } }],
  });

  const [updateEntityOrder] = updateOrderMutation
    ? useMutation(updateOrderMutation, {
        refetchQueries: [
          { query, variables: queryVariables ?? { projectId } },
        ],
      })
    : [() => Promise.resolve()];

  return {
    data: data?.[dataKey] || [],
    loading,
    error,
    deleteEntity,
    updateEntityOrder,
  };
}

/* --------------------------- Cell Renderer ------------------------------- */
function renderCell(
  item: any,
  col: ColumnConfig,
  router: ReturnType<typeof useRouter>
) {
  const value = item[col.key];

  switch (col.type) {
    case "avatar":
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300 overflow-hidden">
            {item?.logoUrl || item?.image ? (
              <div className="relative w-10 h-10">
                <Image
                  src={item.logoUrl ?? item.image ?? ""}
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
                    : undefined
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
          onClick={() =>
            router.push(`${col.subTextKey}/${item.id}` || String(value))
          }
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
    default:
      return (
        <span className="text-start text-theme-sm dark:text-white/90 max-w-3xs truncate">
          {value || "—"}
        </span>
      );
  }
}

/* ----------------------------- Main Component ----------------------------- */
export default function EntityTable({
  title,
  query,
  deleteMutation,
  updateOrderMutation,
  formik,
  modal,
  ModalComponent,
  dataKey,
  columns,
  actionSection = true,
  statusConfig = defaultStatusConfig,
  queryVariables,
}: EntityTableProps) {
  const { openModal } = modal;
  const router = useRouter();
  const projectId = useSelector((state: any) => state.project.projectId);

  const { data, loading, error, deleteEntity, updateEntityOrder } =
    useEntityData(
      query,
      deleteMutation,
      updateOrderMutation,
      dataKey,
      queryVariables,
      projectId
    );

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    dateRange: [] as Date[],
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [reOrder, setReOrder] = useState(false);
  const [sortedData, setSortedData] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10; // you can make this configurable

  React.useEffect(() => {
    if (data?.length) {
      setSortedData([...data].sort((a, b) => (a.seqNo || 0) - (b.seqNo || 0)));
    }
  }, [data]);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    openModal();
    formik.setValues(item);
  };

  const handleDelete = async (item: any) => {
    await deleteEntity({ variables: { id: item.id } });
    setDeleteModalOpen(false);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null) return;
    const updated = [...sortedData];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, moved);

    setSortedData(
      updated.map((item, i) => ({
        ...item,
        seqNo: i + 1,
      }))
    );
    setDraggedIndex(null);
  };

  const handleSaveOrder = () => {
    const payload = sortedData.map(({ id, seqNo }) => ({ id, seqNo }));
    updateEntityOrder({ variables: { inputs: payload } });
    setReOrder(false);
  };

  const resetFilters = () =>
    setFilters({ search: "", status: "", dateRange: [] });

const filteredData = sortedData.filter((item: any) => {
  const matchesSearch = filters.search
    ? Object.values(item).some((val) =>
        String(val).toLowerCase().includes(filters.search.toLowerCase())
      )
    : true;

  const matchesStatus = filters.status
    ? String(item.status).toUpperCase() === filters.status.toUpperCase()
    : true;

  const itemDate = item.createdAt ? new Date(item.createdAt) : null;
  const [start, end] = filters.dateRange;

  const matchesDate =
    !start || !end || (itemDate && itemDate >= start && itemDate <= end);

  return matchesSearch && matchesStatus && matchesDate;
});

const totalPages = Math.ceil(filteredData.length / itemsPerPage);
const paginatedData = filteredData.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

  /* ------------------------------- Render -------------------------------- */
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

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* ---------------------- Header Filters Section ---------------------- */}
      <div className="flex flex-wrap items-center justify-between border-b border-gray-200 p-4 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="h-11 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <div className="relative max-w-sm">
            <Select
              options={statusConfig}
              onChange={(e) => setFilters((prev) => ({ ...prev, status: e }))}
              defaultValue={filters.status}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>

          <div className="relative w-3xs">
            <DatePicker
              id="commonDateRange"
              mode="range"
              placeholder="Select date range"
              onChange={(selectedDates: Date[]) =>
                setFilters((prev) => ({ ...prev, dateRange: selectedDates }))
              }
            />
          </div>

          <Button onClick={resetFilters} variant="outline" size="sm">
            Reset
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Showing {filteredData.length} of {data.length} {title}
          </span>

          {updateOrderMutation && (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setReOrder((prev) => !prev)}
                variant="outline"
                size="sm"
              >
                {reOrder ? "Cancel" : "ReOrder"}
              </Button>
              {reOrder && (
                <Button size="sm" onClick={handleSaveOrder}>
                  Save
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* -------------------------- Table Section --------------------------- */}
      {!filteredData.length ? (
        <p className="p-4 text-sm text-gray-500 text-center dark:text-white">
          No {title.toLowerCase()} found.
        </p>
      ) : (
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <tr>
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
                </tr>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {paginatedData.map((item, index) => (
                  <tr
                    key={item.id}
                    draggable={reOrder}
                    onDragStart={() => setDraggedIndex(index)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.add(
                        "bg-gray-100",
                        "dark:bg-gray-800"
                      );
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
                        {renderCell(item, col, router)}
                      </TableCell>
                    ))}

                    {actionSection && (
                      <TableCell className="px-4 py-3">
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
                  </tr>
                ))}
              </TableBody>
            </Table>
        
          </div>
           
        </div>
        
      )}
         {totalPages > 1 && (
  <div className="flex justify-end p-4 border-t border-gray-200 dark:border-white/[0.05]">
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => setCurrentPage(page)}
    />
  </div>
)}

      {/* ----------------------------- Modals ------------------------------- */}
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
