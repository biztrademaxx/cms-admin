// components/tables/AgendaTable.tsx
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
import Button from "../ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import AgendaModal from "../agenda/agendaModal";

interface AgendaItem {
  id: number;
  title: string;
  speaker: string;
  start: string;
  end: string;
  tag: "KEYNOTE" | "PRESENTATION" | "QA";
  date: string;
}

const agendaData: AgendaItem[] = [
  {
    id: 1,
    title: "Welcome",
    speaker: "Host",
    start: "10:00",
    end: "10:15",
    tag: "KEYNOTE",
    date: "2025-10-23",
  },
  {
    id: 2,
    title: "Tech Talk",
    speaker: "Engineer",
    start: "11:00",
    end: "11:45",
    tag: "PRESENTATION",
    date: "2025-10-26",
  },
];

export default function AgendaTable({ selectedDate }: { selectedDate: string }) {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>(agendaData);
  const [editingItem, setEditingItem] = useState<AgendaItem | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const filteredItems = agendaItems.filter((item) => item.date === selectedDate);

  const handleEdit = (item: AgendaItem) => {
    setEditingItem(item);
    openModal();
    formik.setValues(item);
  };

  const handleAdd = () => {
    const empty: AgendaItem = {
      id: -1,
      title: "",
      speaker: "",
      start: "",
      end: "",
      tag: "KEYNOTE",
      date: selectedDate,
    };
    setEditingItem(null);
    formik.resetForm({ values: empty });
    openModal();
  };

  const formik = useFormik<AgendaItem>({
    initialValues: {
      id: -1,
      title: "",
      speaker: "",
      start: "",
      end: "",
      tag: "KEYNOTE",
      date: selectedDate,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      speaker: Yup.string().required("Speaker is required"),
      start: Yup.string().required("Start time is required"),
      end: Yup.string().required("End time is required"),
      tag: Yup.string().oneOf(["KEYNOTE", "PRESENTATION", "QA"]).required("Tag is required"),
      date: Yup.string().required("Date is required"),
    }),
    onSubmit: (values) => {
      if (values.id === -1) {
        const newItem = { ...values, id: Date.now() };
        setAgendaItems((prev) => [...prev, newItem]);
      } else {
        setAgendaItems((prev) => prev.map((item) => item.id === values.id ? values : item));
      }
      closeModal();
    },
  });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex justify-end p-4">
        <Button size="sm" onClick={handleAdd}>+ Add Agenda</Button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Title & Speaker</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Time</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Tag</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 text-start">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{item.title}</span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">{item.speaker}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.start} – {item.end}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge size="sm" color={item.tag === "KEYNOTE" ? "info" : item.tag === "PRESENTATION" ? "warning" : "primary"}>{item.tag}</Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 gap-2">
                    <button onClick={() => handleEdit(item)} className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">Edit</button>
                    <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">Delete</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
     <AgendaModal closeModal={closeModal} isOpen={isOpen} editingItem={editingItem} formik={formik} />
    </div>
  );
}