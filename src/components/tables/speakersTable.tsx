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
import { useMutation, useQuery } from "@apollo/client";

import { useRouter } from "next/navigation";
import { convertISOtoNormal } from "@/utils/dateUtils";
import WarningModal from "../modals/warningModal";
import { useSelector } from "react-redux";
import SpeakersModal from "../modals/speakersModal";
import { DeleteSpeakerDocument, GetSpeakersByProjectDocument } from "@/gql_generated/graphql";

export default function SpeakersTable({
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
  const [deletespeaker] = useMutation(DeleteSpeakerDocument, {
    onCompleted: (data) => {
      console.log("speaker deleted:", data);
      setDeleteModalOpen(false);
    },
    refetchQueries: [
      {
        query: GetSpeakersByProjectDocument,
        variables: { projectId },
      },
    ],
  });

  const { data, error, loading } = useQuery(GetSpeakersByProjectDocument, {
    variables: { projectId },
    skip: !projectId,
  });

  const tableData = data?.getSpeakersByProject || [];

  const handleEdit = (speaker: any) => {
    setEditingItem(speaker);
    openModal();
    formik.setValues(speaker);
  };

  const handleDelete = async (speaker: any) => {
    await deletespeaker({ variables: { id: speaker.id } });
  };

  if (loading)
    return (
      <p className="p-4 text-sm text-gray-500 text-center  dark:text-white">
        Loading...
      </p>
    );

  if (error)
    return (
      <p className="p-4 text-sm text-red-500">Error loading Speakers.</p>
    );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {!tableData?.length ? (
        <p className="p-4 text-sm text-gray-500 text-center  dark:text-white">
          No Speakers found.
        </p>
      ) : (
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {[
                    "Details",
                    "Organization",
                    "Status",
                    "Created At",
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
                {tableData.map((speaker: any) => (
                  <TableRow key={speaker.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300 overflow-hidden">
                          {speaker?.image ? (
                            <div className="relative w-10 h-10 ">
                              <Image
                                src={speaker.image}
                                alt={speaker.name}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                          ) : (
                            speaker?.name.slice(0, 2).toUpperCase()
                          )}
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {speaker?.name || "N/A"}
                          </span>

                          <span
                            className="block text-gray-500 text-theme-xs dark:text-gray-400 cursor-pointer "
                          >
                            {speaker?.designation || "N/A"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 max-w-md truncate">
                      {speaker?.companyName || "—"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <Badge
                        size="sm"
                        color={
                          speaker.status === "Active"
                            ? "success"
                            : speaker.status === "Pending"
                            ? "warning"
                            : "error"
                        }
                      >
                        {speaker.status ?? "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400 uppercase">
                      {speaker.createdAt
                        ? convertISOtoNormal(speaker.createdAt)
                        : "—"}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(speaker)}
                          className="px-2 py-1 rounded-full border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 rounded-full border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                          onClick={() => {
                            setEditingItem(speaker);
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
      )}
      <SpeakersModal
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
