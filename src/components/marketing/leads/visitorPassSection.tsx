"use client";

import { useState } from "react";
import { Download, ExternalLink, QrCode } from "lucide-react";
import type { GetLeadByIdQuery } from "@/gql_generated/graphql";

type VisitorPass = NonNullable<GetLeadByIdQuery["getLeadById"]["visitorPass"]>;

function safeUrl(value?: string | null) {
  try {
    const url = new URL(value || "");
    return ["http:", "https:"].includes(url.protocol) ? url : null;
  } catch { return null; }
}
function date(value?: string | null) {
  if (!value) return "Not recorded";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "Not recorded" : new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata",
  }).format(parsed);
}
function channel(value?: string | null) {
  return value === "whatsapp" ? "WhatsApp" : value === "sms" ? "SMS" : value === "email" ? "Email" : value || "Not sent";
}

export default function VisitorPassSection({ pass }: { pass?: VisitorPass | null }) {
  const [imageFailed, setImageFailed] = useState(false);
  if (!pass) return null;
  const passUrl = safeUrl(pass.passUrl);
  const badgeUrl = safeUrl(pass.badgeUrl);
  const downloadUrl = badgeUrl ? new URL(badgeUrl.toString()) : null;
  downloadUrl?.searchParams.set("download", "1");
  const statusLabel = pass.status === "checked_in" ? "Checked in" : pass.status === "cancelled" ? "Cancelled" : "Issued";
  const statusClass = pass.status === "checked_in" ? "bg-green-50 text-green-700" : pass.status === "cancelled" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700";
  const rows = [
    ["Registration number", pass.registrationNumber],
    ["Badge design", pass.badgeDesign?.replace(/design[-_]?/i, "Design ") || "Not recorded"],
    ["Issued", date(pass.issuedAt)],
    ["Phone verified", date(pass.verifiedAt)],
    ["Delivery channel", channel(pass.sentVia || pass.channel)],
    ["Delivery status", pass.sentStatus || "Not sent"],
    ["Last sent", date(pass.sentAt)],
    ["Checked in", date(pass.checkedInAt)],
    ["Area", pass.area || "Not provided"],
    ["PIN code", pass.pinCode || "Not provided"],
    ["Heard about us", pass.registrationSource || "Not provided"],
    ["Interests", pass.interests.join(", ") || "Not provided"],
    ["Last synced", date(pass.syncedAt)],
  ];
  return (
    <section className="mt-6 rounded-xl border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/30 sm:p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 text-base font-semibold text-gray-800 dark:text-white">
            <QrCode className="h-5 w-5 text-blue-600" /> Visitor Pass &amp; Badge
          </h3>
          <p className="mt-1 text-xs text-gray-500">{pass.eventName} ? {pass.eventDates}</p>
          <p className="mt-1 text-xs text-gray-500">{pass.eventVenue}</p>
        </div>
        <span className={"rounded-full px-2.5 py-1 text-xs font-semibold " + statusClass}>{statusLabel}</span>
      </div>
      <div className="flex flex-col gap-5">
        {badgeUrl && !imageFailed ? (
          <a href={badgeUrl.toString()} target="_blank" rel="noopener noreferrer" aria-label="Open visitor badge preview" className="mx-auto block w-full max-w-64">
            <img src={badgeUrl.toString()} alt={"Visitor badge " + pass.registrationNumber} loading="lazy" onError={() => setImageFailed(true)} className="h-auto w-full rounded-lg border border-gray-200 bg-white shadow-sm" />
          </a>
        ) : (
          <p className="rounded-lg bg-white p-4 text-sm text-gray-500 dark:bg-gray-900">The badge preview is unavailable. Use the badge or pass link below.</p>
        )}
        <div className="flex flex-wrap gap-2">
          {passUrl && <a href={passUrl.toString()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white"><ExternalLink className="h-4 w-4" />View pass</a>}
          {downloadUrl && <a href={downloadUrl.toString()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"><Download className="h-4 w-4" />Download badge</a>}
        </div>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rows.map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-xs text-gray-500">{label}</dt><dd className="mt-1 break-words text-sm font-medium text-gray-800 dark:text-gray-200">{value}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}
