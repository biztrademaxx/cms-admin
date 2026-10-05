"use client";

import { Suspense } from "react";
import LeadDetail from "@/components/marketing/leads/leadDetail";

export default function LeadDetailPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-500">Loading lead details...</div>}>
      <LeadDetail />
    </Suspense>
  );
}
