"use client";

import { TrendingUp } from "lucide-react";

const RevenueMetrics = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6  dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Website Revenue
        </h3>
        <span className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
          <TrendingUp className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          ₹1,00,000
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Revenue from website only, excluding direct payments
        </p>
      </div>
    </div>
  );
};

export default RevenueMetrics;
