"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import {
  AssignLeadDocument,
  GetLeadByIdDocument,
  GetFilteredLeadsDocument,
  GetSalesPeopleByProjectDocument,
} from "@/gql_generated/graphql";

interface AssignLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  leadName: string;
  projectId: string;
  currentAssignedToId?: string | null;
}

const AssignLeadModal: React.FC<AssignLeadModalProps> = ({
  isOpen,
  onClose,
  leadId,
  leadName,
  projectId,
  currentAssignedToId,
}) => {
  const [salesPersonId, setSalesPersonId] = useState(currentAssignedToId || "");

  useEffect(() => {
    if (isOpen) {
      setSalesPersonId(currentAssignedToId || "");
    }
  }, [isOpen, currentAssignedToId]);

  const { data: salesData, loading: loadingSales } = useQuery(
    GetSalesPeopleByProjectDocument,
    {
      variables: { projectId },
      skip: !isOpen || !projectId,
    }
  );

  const [assignLead, { loading }] = useMutation(AssignLeadDocument, {
    refetchQueries: [
      { query: GetLeadByIdDocument, variables: { id: leadId } },
      { query: GetFilteredLeadsDocument, variables: { input: { projectId } } },
    ],
    onCompleted: () => onClose(),
  });

  const salesPeople =
    salesData?.getSalesPeopleByProject?.filter((sp) => sp.isActive) ?? [];

  const handleSubmit = () => {
    if (!salesPersonId) return;
    assignLead({
      variables: {
        input: {
          id: leadId,
          assignedToId: salesPersonId,
          changedByName: "Admin",
        },
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg m-4">
      <div className="p-6 lg:p-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
          Assign Lead
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {leadName}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 -mt-4">
          Any active sales person can be assigned — location or country does not matter.
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Sales Person
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

        <div className="flex justify-end gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={loading || !salesPersonId || salesPeople.length === 0}
          >
            {loading ? "Assigning..." : "Assign Lead"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignLeadModal;
