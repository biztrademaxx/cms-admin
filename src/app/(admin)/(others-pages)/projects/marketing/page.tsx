import type { Metadata } from "next";
import React from "react";
import MonthlyUtmChart from "../../../../../components/landingPage/monthlyUtmChart";
import { MarketingMetrics } from "@/components/landingPage/marketingMetrics";
import RevenueMetrics from "@/components/landingPage/RevenueMetrics";
import IndustryWisePieChart from "@/components/marketing/leads/charts/industryWise";
import CountryWisePieChart from "@/components/marketing/leads/charts/countryWise";
import { useQuery } from "@apollo/client";
import {
  GetLeadsGroupedByFieldDocument,
  LeadScalarFieldEnum,
} from "@/gql_generated/graphql";
import { useSelector } from "react-redux";
import LeadMetrics from "@/components/landingPage/leadMetrics";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 ">
        <LeadMetrics />
        <MonthlyUtmChart />
      </div>

      {/* <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div> */}

      {/* <div className="col-span-12">
        <StatisticsChart />
      </div> */}
    </div>
  );
}
