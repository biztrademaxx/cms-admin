"use client";

import React, { useState } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import {
  AssignLeadDocument,
  GetFilteredLeadsDocument,
  GetSalesPeopleByProjectDocument,
} from "@/gql_generated/graphql";

interface BulkAssignLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadIds: string[];
  projectId: string;
  onSuccess: () => void;
}

const BulkAssignLeadsModal: React.FC<BulkAssignLeadsModalProps> = ({
  isOpen,
  onClose,
  leadIds,
  projectId,
  onSuccess,
}) => {
  const client = useApolloClient();
  const [salesPersonId, setSalesPersonId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { data: salesData, loading: loadingSales } = useQuery(
    GetSalesPeopleByProjectDocument,
    {
      variables: { projectId },
      skip: !isOpen || !projectId,
    }
  );

  const salesPeople =
    salesData?.getSalesPeopleByProject?.filter((sp) => sp.isActive) ?? [];

  const handleSubmit = async () => {
    if (!salesPersonId || leadIds.length === 0) return;
    setSubmitting(true);
    setError("");
    try {
      const results = await Promise.allSettled(
        leadIds.map((id) =>
          client.mutate({
            mutation: AssignLeadDocument,
            variables: {
              input: {
                id,
                assignedToId: salesPersonId,
                changedByName: "Admin",
              },
            },
          })
        )
      );
      const failed = results.filter((r) => r.status === "rejected").length;
      await client.refetchQueries({
        include: [GetFilteredLeadsDocument],
      });
      if (failed > 0) {
        setError(`${failed} of ${leadIds.length} assignments failed. Others may have succeeded.`);
        setSubmitting(false);
        return;
      }
      setSalesPersonId("");
      onSuccess();
      onClose();
    } catch {
      setError("Could not assign leads. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg m-4">
      <div className="p-6 lg:p-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
          Assign leads
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Assign {leadIds.length} selected lead{leadIds.length === 1 ? "" : "s"} to one sales
          person.
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Sales person
          </label>
          {loadingSales ? (
            <p className="text-sm text-gray-500">Loading sales team...</p>
          ) : salesPeople.length === 0 ? (
            <p className="text-sm text-amber-600">
              No active sales persons found. Add sales team members first.
            </p>
          ) : (
            <select
              value={salesPersonId}
              onChange={(e) => setSalesPersonId(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="">Select sales person</option>
              {salesPeople.map((sp) => (
                <option key={sp.id} value={sp.id}>
                  {sp.name}
                  {sp.email ? ` (${sp.email})` : ""}
                </option>
              ))}
            </select>
          )}
        </div>

        {error ? (
          <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>
        ) : null}

        <div className="flex justify-end gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={
              submitting || !salesPersonId || salesPeople.length === 0 || leadIds.length === 0
            }
          >
            {submitting ? "Assigning..." : `Assign ${leadIds.length} lead(s)`}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BulkAssignLeadsModal;
