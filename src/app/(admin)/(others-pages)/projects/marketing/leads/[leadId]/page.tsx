"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = ({ params: { leadId } }: { params: { leadId: string } }) => {
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {leadId}
      </div>
    </div>
  );
};

export default page;
