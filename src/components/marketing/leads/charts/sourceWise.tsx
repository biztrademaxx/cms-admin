"use client";
import React from "react";

export default function CampaignWiseChart({ data, name }: any) {
  const campaignWiseData = Array.isArray(data)
    ? [...data].sort((a: any, b: any) => b.count - a.count)?.slice(0, 10)
    : [];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        {name} Wise Leads
      </h3>

      {campaignWiseData.length === 0 ? (
        <div className="col-span-full p-6 text-center text-gray-500 dark:text-white/70">
          No data available
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/[0.05] text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                <th className="px-4 py-2">Industry</th>
                <th className="px-4 py-2 text-right">Leads</th>
                <th className="px-4 py-2 text-right">Revenue</th>
                <th className="px-4 py-2 text-right">Average</th>
              </tr>
            </thead>
            <tbody>
              {campaignWiseData?.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 dark:border-gray-700 text-sm"
                >
                  <td className="px-4 py-2 text-gray-800 dark:text-white/90">
                    {item.group || "Unknown"}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold text-gray-900 dark:text-white">
                    {item.count ?? 0}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold text-gray-900 dark:text-white">
                    {item.totalPrice ?? 0}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold text-gray-900 dark:text-white">
                    {item.averagePrice ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
