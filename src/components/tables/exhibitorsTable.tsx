"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import {
  DeleteExhibitorDocument,
  GetExhibitorsByProjectDocument,
} from "@/gql_generated/graphql";
import { useRouter } from "next/navigation";
import { convertISOtoNormal } from "@/utils/dateUtils";
import ExhibitorsModal from "../modals/exhibitorsModal";
import WarningModal from "../modals/warningModal";
import { useSelector } from "react-redux";

export default function ExhibitorsTable({
  formik,
  modal,
}: {
  formik: any;
  modal: any;
}) {
  const { openModal } = modal;
  const router = useRouter();
  const projectId = useSelector((state: any) => state.project.projectId);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [deleteExhibitor] = useMutation(DeleteExhibitorDocument, {
    onCompleted: (data) => {
      console.log("Exhibitor deleted:", data);
      setDeleteModalOpen(false);
    },
    refetchQueries: [
      {
        query: GetExhibitorsByProjectDocument,
        variables: { projectId },
      },
    ],
  });

  const { data, error, loading } = useQuery(GetExhibitorsByProjectDocument, {
    variables: { projectId },
    skip: !projectId,
  });

  const tableData = data?.getExhibitorsByProject || [];

  const handleEdit = (Exhibitor: any) => {
    setEditingItem(Exhibitor);
    openModal();
    formik.setValues(Exhibitor);
  };

  const handleDelete = async (Exhibitor: any) => {
    await deleteExhibitor({ variables: { id: Exhibitor.id } });
  };

  if (loading)
    return (
      <p className="p-4 text-sm text-gray-500 text-center  dark:text-white">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="p-4 text-sm text-red-500">Error loading exhibitors.</p>
    );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {[
                  "Details",
                  "Description",
                  "Linkedin",
                  "Status",
                  "created at",
                  "Actions",
                ].map((title) => (
                  <TableCell
                    isHeader
                    key={title}
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((Exhibitor: any) => (
                <TableRow key={Exhibitor.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300 overflow-hidden">
                        {Exhibitor?.logoUrl ? (
                          <div className="relative w-10 h-10 ">
                            <Image
                              src={Exhibitor.logoUrl}
                              alt={Exhibitor.companyName}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                        ) : (
                          Exhibitor?.companyName.slice(0, 2).toUpperCase()
                        )}
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {Exhibitor?.companyName || "N/A"}
                        </span>

                        <span
                          className="block text-gray-500 text-theme-xs dark:text-gray-400 cursor-pointer "
                          onClick={() => router.push(Exhibitor?.website)}
                        >
                          {Exhibitor?.website || "N/A"}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 max-w-md truncate">
                    {Exhibitor?.description || "—"}
                  </TableCell>
                  <TableCell
                    onClick={() => router.push(Exhibitor?.linkedin)}
                    target="_blank"
                    className="px-4 py-3 text-blue-500 text-start text-theme-sm dark:text-blue-400 max-w-1 truncate cursor-pointer"
                  >
                    {Exhibitor?.linkedin || "—"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge
                      size="sm"
                      color={
                        Exhibitor.status === "Active"
                          ? "success"
                          : Exhibitor.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {Exhibitor.status ?? "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400 uppercase">
                    {Exhibitor.createdAt
                      ? convertISOtoNormal(Exhibitor.createdAt)
                      : "—"}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(Exhibitor)}
                        className="px-2 py-1 rounded-full border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 rounded-full border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                        onClick={() => {
                          setEditingItem(Exhibitor);
                          setDeleteModalOpen(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <ExhibitorsModal
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
