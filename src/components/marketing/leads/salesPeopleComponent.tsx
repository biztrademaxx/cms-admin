"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useActiveProject } from "@/hooks/useActiveProject";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import SalesPersonModal from "./salesPersonModal";
import AddExistingSalesPersonModal from "./addExistingSalesPersonModal";
import {
  CreateSalesPersonDocument,
  DeleteSalesPersonDocument,
  GetSalesPeopleByProjectDocument,
} from "@/gql_generated/graphql";
import { Plus, Pencil, Trash2, UserPlus } from "lucide-react";

const SalesPeopleComponent = () => {
  const { projectId, projectName } = useActiveProject();
  const [modalOpen, setModalOpen] = useState(false);
  const [existingModalOpen, setExistingModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<any>(null);

  const { data, loading } = useQuery(GetSalesPeopleByProjectDocument, {
    variables: { projectId },
    skip: !projectId,
  });

  const [createSalesPerson, { loading: saving }] = useMutation(
    CreateSalesPersonDocument,
    {
      refetchQueries: [
        { query: GetSalesPeopleByProjectDocument, variables: { projectId } },
      ],
      onCompleted: () => {
        setModalOpen(false);
        setEditingPerson(null);
      },
    }
  );

  const [deleteSalesPerson] = useMutation(DeleteSalesPersonDocument, {
    refetchQueries: [
      { query: GetSalesPeopleByProjectDocument, variables: { projectId } },
    ],
  });

  const salesPeople = data?.getSalesPeopleByProject ?? [];

  const handleSubmit = (values: {
    id?: string;
    name: string;
    email: string;
    phone: string;
    password?: string;
    cities: { city: string; state: string }[];
  }) => {
    createSalesPerson({
      variables: {
        input: {
          ...(values.id && { id: values.id }),
          name: values.name,
          email: values.email,
          phone: values.phone || undefined,
          password: values.password,
          projectId,
          cities: values.cities,
        },
      },
    });
  };

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5 lg:p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <PageBreadcrumb pageTitle="Sales Team" projectName={projectName} />
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setExistingModalOpen(true)}
              startIcon={<UserPlus className="w-4 h-4" />}
            >
              Add Existing
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setEditingPerson(null);
                setModalOpen(true);
              }}
              startIcon={<Plus className="w-4 h-4" />}
            >
              Add Sales Person
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-12">Loading...</p>
        ) : salesPeople.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No sales people added yet</p>
            <p className="text-sm text-gray-400">
              Add sales people and assign cities. Leads from those cities will be
              auto-assigned.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Assigned Cities
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesPeople.map((person) => (
                  <tr
                    key={person.id}
                    className="border-b border-gray-100 dark:border-gray-800"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white">
                      {person.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                      {person.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                      {person.phone || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {person.cities?.map((c) => (
                          <Badge key={c.id} size="sm" color="info">
                            {c.city}, {c.state}
                          </Badge>
                        )) ?? (
                          <span className="text-sm text-gray-400">No cities</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        size="sm"
                        color={person.isActive ? "success" : "error"}
                      >
                        {person.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingPerson(person);
                            setModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${person.name}?`)) {
                              deleteSalesPerson({ variables: { id: person.id } });
                            }
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <SalesPersonModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingPerson(null);
        }}
        onSubmit={handleSubmit}
        initialValues={editingPerson}
        loading={saving}
      />

      <AddExistingSalesPersonModal
        isOpen={existingModalOpen}
        onClose={() => setExistingModalOpen(false)}
        projectId={projectId}
      />
    </div>
  );
};

export default SalesPeopleComponent;
