"use client";

import { NetworkStatus, useQuery } from "@apollo/client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Loader2, RefreshCw, Search, Ticket, X } from "lucide-react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { GetPassRegistrationsDocument, type GetPassRegistrationsQuery } from "@/gql_generated/graphql";
import { useActiveProject } from "@/hooks/useActiveProject";
import VisitorPassSection from "./visitorPassSection";

type Registration = GetPassRegistrationsQuery["getFilteredLeads"]["leads"][number];

const PAGE_SIZE = 25;
const controlClass = "rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200";
const buttonClass = "inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800";

function date(value?: string | null) {
  if (!value) return "Not recorded";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "Not recorded" : new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata",
  }).format(parsed);
}

function PassStatus({ status }: { status: string }) {
  const label = status === "checked_in" ? "Checked in" : status === "cancelled" ? "Cancelled" : "Issued";
  const colors = status === "checked_in" ? "bg-green-50 text-green-700" : status === "cancelled" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700";
  return <span className={"inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold " + colors}>{label}</span>;
}

function RegistrationDetails({ lead, onClose }: { lead: Registration; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  const rows = [
    ["Name", lead.name], ["Company", lead.companyName], ["Designation", lead.jobTitle],
    ["Phone", lead.phone], ["Email", lead.email], ["City", lead.city],
    ["State", lead.state], ["Country", lead.country], ["Lead created", date(lead.createdAt)],
  ];

  return (
    <dialog ref={dialog} onCancel={onClose}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      aria-labelledby="pass-registration-title"
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100vw-2rem)] max-w-4xl overflow-y-auto rounded-2xl bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-gray-950/50 dark:bg-gray-900 dark:text-gray-100">
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <div>
          <h2 id="pass-registration-title" className="text-xl font-semibold">{lead.name}</h2>
          <p className="mt-1 text-sm text-gray-500">{lead.visitorPass?.registrationNumber}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close registration details" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"><X className="h-5 w-5" /></button>
      </div>
      <div className="grid gap-6 p-5 md:grid-cols-2">
        <div>
          <h3 className="mb-5 font-semibold">Visitor details</h3>
          <dl className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            {rows.map(([label, value]) => <div key={label}>
              <dt className="text-xs text-gray-500">{label}</dt>
              <dd className="mt-1 break-words text-sm font-medium">{value || "Not provided"}</dd>
            </div>)}
          </dl>
          <Link href={"/projects/marketing/leads/" + encodeURIComponent(lead.id)} className={buttonClass + " mt-6"}><ExternalLink className="h-4 w-4" />Open lead</Link>
        </div>
        <VisitorPassSection key={lead.visitorPass?.id} pass={lead.visitorPass} />
      </div>
    </dialog>
  );
}

function RegistrationList({ projectId, projectName }: { projectId: string; projectName: string }) {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const closeDetails = useCallback(() => setSelectedId(null), []);
  const { data, loading, error, refetch, networkStatus, startPolling, stopPolling } = useQuery(GetPassRegistrationsDocument, {
    variables: {
      input: {
        projectId, visitorPassOnly: true, page, limit: PAGE_SIZE,
        ...(search && { search }), ...(status && { visitorPassStatus: status }),
      },
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    onCompleted: result => setPage(current => Math.min(current, result.getFilteredLeads.totalPages)),
  });

  useEffect(() => {
    const updatePolling = () => {
      if (document.visibilityState === "visible") startPolling(30000);
      else stopPolling();
    };
    updatePolling();
    document.addEventListener("visibilitychange", updatePolling);
    return () => { document.removeEventListener("visibilitychange", updatePolling); stopPolling(); };
  }, [startPolling, stopPolling]);

  const result = data?.getFilteredLeads;
  const registrations = result?.leads ?? [];
  const busy = loading && networkStatus !== NetworkStatus.poll;
  const selected = registrations.find(lead => lead.id === selectedId);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
    setSelectedId(null);
  }

  return (
    <div className="space-y-5">
      <PageBreadcrumb pageTitle="Pass Registrations" projectName={projectName} />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white"><Ticket className="h-6 w-6 text-brand-500" />Visitor passes</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">View visitor passes synced to {projectName || "this project"}, download badges, and check registration and check-in details.</p>
        </div>
        <button type="button" className={buttonClass} disabled={busy} onClick={() => { void refetch().catch(() => undefined); }}>
          <RefreshCw className={"h-4 w-4 " + (busy ? "animate-spin" : "")} />Refresh
        </button>
      </div>
      {error ? <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">Could not load pass registrations. {error.message} Use Refresh to try again.</p> : null}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-wrap gap-3 border-b border-gray-200 p-4 dark:border-gray-800">
          <form onSubmit={submitSearch} className="flex min-w-0 flex-1 gap-2">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search pass registrations</span>
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input value={searchInput} onChange={event => setSearchInput(event.target.value)} maxLength={120}
                placeholder="Name, company, phone, email, or registration number" className={controlClass + " w-full pl-9"} />
            </label>
            <button type="submit" className={buttonClass}>Search</button>
          </form>
          <label>
            <span className="sr-only">Filter by pass status</span>
            <select value={status} onChange={event => { setStatus(event.target.value); setPage(1); setSelectedId(null); }} className={controlClass}>
              <option value="">All pass statuses</option>
              <option value="issued">Issued</option>
              <option value="checked_in">Checked in</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm" aria-busy={busy}>
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
              <tr>{["Registration", "Visitor", "Company", "Phone", "Pass status", "Last synced", "Details"].map(label =>
                <th key={label} scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">{label}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {busy ? <tr><td colSpan={7} className="px-4 py-16 text-center text-gray-500"><span role="status"><Loader2 className="mr-2 inline h-5 w-5 animate-spin" />Loading registrations...</span></td></tr> :
                !registrations.length ? <tr><td colSpan={7} className="px-4 py-16 text-center text-gray-500">
                  {error ? "Registrations could not be loaded." : search || status ? "No registrations match these filters." : "No visitor passes have synced to this project yet."}
                </td></tr> :
                  registrations.map(lead => {
                    const pass = lead.visitorPass;
                    if (!pass) return null;
                    return <tr key={lead.id} className="text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800/50">
                      <td className="whitespace-nowrap px-4 py-4"><p className="font-semibold text-brand-500">{pass.registrationNumber}</p><p className="mt-1 text-xs text-gray-500">{pass.eventName}</p><p className="mt-1 text-xs text-gray-500">{date(pass.issuedAt)}</p></td>
                      <td className="px-4 py-4"><p className="font-medium text-gray-900 dark:text-white">{lead.name}</p><p className="mt-1 text-xs text-gray-500">{lead.email || "Email not provided"}</p></td>
                      <td className="px-4 py-4">{lead.companyName || "Not provided"}</td>
                      <td className="whitespace-nowrap px-4 py-4">{lead.phone || "Not provided"}</td>
                      <td className="px-4 py-4"><PassStatus status={pass.status} /></td>
                      <td className="whitespace-nowrap px-4 py-4 text-xs text-gray-500">{date(pass.syncedAt)}</td>
                      <td className="px-4 py-4"><button type="button" className="whitespace-nowrap font-semibold text-brand-500 hover:underline" onClick={() => setSelectedId(lead.id)} aria-label={"View registration for " + lead.name}>View details</button></td>
                    </tr>;
                  })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 dark:border-gray-800">
          <p className="text-sm text-gray-500">{result?.total ?? 0} registrations</p>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Previous page" className={buttonClass} disabled={busy || page <= 1} onClick={() => setPage(value => value - 1)}><ChevronLeft className="h-4 w-4" /></button>
            <span className="text-sm text-gray-500">Page {page} of {result?.totalPages ?? 1}</span>
            <button type="button" aria-label="Next page" className={buttonClass} disabled={busy || !result || page >= result.totalPages} onClick={() => setPage(value => value + 1)}><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section>
      <p className="text-xs text-gray-500">Only synced visitor passes appear here. Registration and check-in updates refresh every 30 seconds.</p>
      {selected ? <RegistrationDetails key={selected.id} lead={selected} onClose={closeDetails} /> : null}
    </div>
  );
}

export default function PassRegistrations() {
  const { projectId, projectName } = useActiveProject();
  if (!projectId) return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Pass Registrations</h1>
      <p className="mt-3 text-sm text-gray-500">Select a project to view its visitor passes.</p>
      <Link href="/" className={buttonClass + " mt-5"}>Choose a project</Link>
    </div>
  );
  return <RegistrationList key={projectId} projectId={projectId} projectName={projectName || ""} />;
}
