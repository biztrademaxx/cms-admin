import { Suspense } from "react";
import SalesDashboard from "@/components/sales/salesDashboard";

export default function SalesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500 dark:bg-[#0C0C0C]">
          Loading dashboard…
        </div>
      }
    >
      <SalesDashboard />
    </Suspense>
  );
}
