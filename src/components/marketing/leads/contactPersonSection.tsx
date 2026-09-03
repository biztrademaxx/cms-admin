"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Button from "@/components/ui/button/Button";
import {
  GetLeadByIdDocument,
  UpdateLeadContactDocument,
} from "@/gql_generated/graphql";
import { Phone, Mail, User, Briefcase, Pencil, X, Check } from "lucide-react";

interface ContactPersonSectionProps {
  leadId: string;
  contactPersonName?: string | null;
  contactPersonPhone?: string | null;
  contactPersonDesignation?: string | null;
  contactPersonEmail?: string | null;
}

const ContactPersonSection: React.FC<ContactPersonSectionProps> = ({
  leadId,
  contactPersonName,
  contactPersonPhone,
  contactPersonDesignation,
  contactPersonEmail,
}) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    contactPersonName: contactPersonName || "",
    contactPersonPhone: contactPersonPhone || "",
    contactPersonDesignation: contactPersonDesignation || "",
    contactPersonEmail: contactPersonEmail || "",
  });

  useEffect(() => {
    setForm({
      contactPersonName: contactPersonName || "",
      contactPersonPhone: contactPersonPhone || "",
      contactPersonDesignation: contactPersonDesignation || "",
      contactPersonEmail: contactPersonEmail || "",
    });
  }, [contactPersonName, contactPersonPhone, contactPersonDesignation, contactPersonEmail]);

  const [updateContact, { loading }] = useMutation(UpdateLeadContactDocument, {
    refetchQueries: [{ query: GetLeadByIdDocument, variables: { id: leadId } }],
    onCompleted: () => setEditing(false),
  });

  const hasContactInfo =
    contactPersonName ||
    contactPersonPhone ||
    contactPersonDesignation ||
    contactPersonEmail;

  const handleSave = () => {
    updateContact({
      variables: {
        input: {
          id: leadId,
          contactPersonName: form.contactPersonName.trim() || undefined,
          contactPersonPhone: form.contactPersonPhone.trim() || undefined,
          contactPersonDesignation: form.contactPersonDesignation.trim() || undefined,
          contactPersonEmail: form.contactPersonEmail.trim() || undefined,
        },
      },
    });
  };

  const handleCancel = () => {
    setForm({
      contactPersonName: contactPersonName || "",
      contactPersonPhone: contactPersonPhone || "",
      contactPersonDesignation: contactPersonDesignation || "",
      contactPersonEmail: contactPersonEmail || "",
    });
    setEditing(false);
  };

  return (
    <div className="mt-6 rounded-xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/10 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            Concerned Person
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Right person to contact at the company
          </p>
        </div>
        {!editing ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setEditing(true)}
            startIcon={<Pencil className="w-4 h-4" />}
          >
            {hasContactInfo ? "Edit" : "Add"}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleCancel} startIcon={<X className="w-4 h-4" />}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={loading} startIcon={<Check className="w-4 h-4" />}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </div>

      {editing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Name
            </label>
            <input
              value={form.contactPersonName}
              onChange={(e) => setForm((p) => ({ ...p, contactPersonName: e.target.value }))}
              placeholder="Contact person name"
              className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Mobile Number
            </label>
            <input
              value={form.contactPersonPhone}
              onChange={(e) => setForm((p) => ({ ...p, contactPersonPhone: e.target.value }))}
              placeholder="Mobile number"
              className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Designation
            </label>
            <input
              value={form.contactPersonDesignation}
              onChange={(e) => setForm((p) => ({ ...p, contactPersonDesignation: e.target.value }))}
              placeholder="Job title / designation"
              className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.contactPersonEmail}
              onChange={(e) => setForm((p) => ({ ...p, contactPersonEmail: e.target.value }))}
              placeholder="Work email"
              className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>
      ) : hasContactInfo ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactPersonName && (
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">{contactPersonName}</p>
              </div>
            </div>
          )}
          {contactPersonDesignation && (
            <div className="flex items-start gap-2">
              <Briefcase className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Designation</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">{contactPersonDesignation}</p>
              </div>
            </div>
          )}
          {contactPersonPhone && (
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Mobile</p>
                <a href={`tel:${contactPersonPhone}`} className="text-sm font-medium text-blue-600 hover:underline">
                  {contactPersonPhone}
                </a>
              </div>
            </div>
          )}
          {contactPersonEmail && (
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <a href={`mailto:${contactPersonEmail}`} className="text-sm font-medium text-blue-600 hover:underline">
                  {contactPersonEmail}
                </a>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No concerned person added yet. Click Add to record the right contact for this lead.
        </p>
      )}
    </div>
  );
};

export default ContactPersonSection;
