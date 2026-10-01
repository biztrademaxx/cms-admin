import { Suspense } from "react";
import LeadsOverview from "@/components/marketing/leads/leadsOverview";

export default function LeadsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-500">Loading leads...</div>}>
      <LeadsOverview />
    </Suspense>
  );
}
