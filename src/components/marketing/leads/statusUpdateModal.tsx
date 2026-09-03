"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import {
  GetLeadByIdDocument,
  GetFilteredLeadsDocument,
  LeadStatus,
  LeadType,
  UpdateLeadStatusDocument,
} from "@/gql_generated/graphql";
import { LEAD_STATUS_CONFIG, LEAD_TYPE_OPTIONS } from "./leadStatusConfig";
import DatePicker from "@/components/form/date-picker";

interface StatusUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  leadName: string;
  currentStatus: LeadStatus;
  currentLeadType?: LeadType;
  projectId: string;
  changedById?: string;
  changedByName?: string;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  isOpen,
  onClose,
  leadId,
  leadName,
  currentStatus,
  currentLeadType = LeadType.Enquiry,
  projectId,
  changedById,
  changedByName,
}) => {
  const [status, setStatus] = useState(currentStatus);
  const [leadType, setLeadType] = useState(currentLeadType);
  const [notes, setNotes] = useState("");
  const [callbackDate, setCallbackDate] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStatus(currentStatus);
      setLeadType(currentLeadType);
      setNotes("");
      setCallbackDate("");
      setFollowUpDate("");
    }
  }, [isOpen, currentStatus, currentLeadType]);

  const [updateStatus, { loading }] = useMutation(UpdateLeadStatusDocument, {
    refetchQueries: [
      { query: GetFilteredLeadsDocument, variables: { input: { projectId } } },
      { query: GetLeadByIdDocument, variables: { id: leadId } },
    ],
    onCompleted: () => onClose(),
  });

  const handleSubmit = () => {
    updateStatus({
      variables: {
        input: {
          id: leadId,
          status,
          leadType,
          notes: notes || undefined,
          callbackDate: callbackDate || undefined,
          followUpDate: followUpDate || undefined,
          changedById: changedById || undefined,
          changedByName: changedByName || "Admin",
        },
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg m-4">
      <div className="p-6 lg:p-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
          Update Lead Status
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {leadName}
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Lead Type
            </label>
            <select
              value={leadType}
              onChange={(e) => setLeadType(e.target.value as LeadType)}
              className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              {LEAD_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as LeadStatus)}
              className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              {LEAD_STATUS_CONFIG.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {(status === LeadStatus.Callback || status === LeadStatus.FollowUp) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {status === LeadStatus.Callback ? "Callback Date" : "Follow Up Date"}
              </label>
              <DatePicker
                id="follow-date"
                placeholder="Select date"
                onChange={(dates) => {
                  const val = dates[0]?.toISOString();
                  if (status === LeadStatus.Callback) setCallbackDate(val);
                  else setFollowUpDate(val);
                }}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add call notes..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Update Status"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default StatusUpdateModal;
