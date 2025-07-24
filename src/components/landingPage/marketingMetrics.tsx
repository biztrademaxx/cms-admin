"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MarketingCard from "../marketing/utm/marketingCard";

export const MarketingMetrics = () => {
  const router = useRouter();

//   if (loading) {
//     return (
//       <div className="p-4 text-sm text-center text-gray-500 dark:text-white">
//         Loading...
//       </div>
//     );
//   }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
      <MarketingCard count={2} name="Participants" />
      <MarketingCard count={32} name="Exhibitors" />
      <MarketingCard count={23} name="Delegates" />
      <MarketingCard count={21} name="Sponsors" />
    </div>
  );
};
