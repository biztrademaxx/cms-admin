"use client";
import {
  GetLeadsGroupedByFieldDocument,
  LeadScalarFieldEnum,
  LeadType,
} from "@/gql_generated/graphql";
import { useQuery } from "@apollo/client";
import React from "react";
import { useSelector } from "react-redux";
import IndustryWisePieChart from "../marketing/leads/charts/industryWise";
import CountryWisePieChart from "../marketing/leads/charts/countryWise";
import { MarketingMetrics } from "./marketingMetrics";
import RevenueMetrics from "./RevenueMetrics";
import CampaignWiseChart from "../marketing/leads/charts/sourceWise";

const LeadMetrics = () => {
  const projectId = useSelector((state: any) => state.project.projectId);
  const { data, loading } = useQuery(GetLeadsGroupedByFieldDocument, {
    variables: {
      input: {
        groupBy: [
          LeadScalarFieldEnum.LeadType,
          LeadScalarFieldEnum.Country,
          LeadScalarFieldEnum.Industry,
          LeadScalarFieldEnum.UtmSource,
          LeadScalarFieldEnum.UtmMedium,
          LeadScalarFieldEnum.UtmCampaign,
        ],
        projectId,
      },
    },
  });

  console.log("leads data", data);
  const leadTypeData =
    data?.getLeadsGroupedByField?.find(
      (item: any) => item.field === LeadScalarFieldEnum.LeadType
    )?.groups ?? [];

  const industryData =
    data?.getLeadsGroupedByField?.find(
      (item: any) => item.field === LeadScalarFieldEnum.Industry
    )?.groups ?? [];

  const countryData =
    data?.getLeadsGroupedByField?.find(
      (item: any) => item.field === LeadScalarFieldEnum.Country
    )?.groups ?? [];

  const sourceData =
    data?.getLeadsGroupedByField?.find(
      (item: any) => item.field === LeadScalarFieldEnum.UtmSource
    )?.groups ?? [];

  const mediumData =
    data?.getLeadsGroupedByField?.find(
      (item: any) => item.field === LeadScalarFieldEnum.UtmMedium
    )?.groups ?? [];

  const campaignData =
    data?.getLeadsGroupedByField?.find(
      (item: any) => item.field === LeadScalarFieldEnum.UtmCampaign
    )?.groups ?? [];

  const RevenueData =
    data?.getLeadsGroupedByField?.find(
      (item: any) => item.field === LeadScalarFieldEnum.LeadType
    )?.groups ?? [];

  console.log("revenue", RevenueData);
  if (loading) {
    <div className="col-span-full p-6 text-center text-gray-500 dark:text-white/70">
      Loading metrics...
    </div>;
  }

  return (
    <div className="col-span-12 xl:col-span-5 space-y-6">
      <RevenueMetrics data={RevenueData} />
      <MarketingMetrics data={leadTypeData} />
      <IndustryWisePieChart data={industryData} />
      <CountryWisePieChart data={countryData} />

      <CampaignWiseChart data={sourceData} name="Source" />
      <CampaignWiseChart data={mediumData} name="Medium" />
      <CampaignWiseChart data={campaignData} name="Campaign" />
    </div>
  );
};

export default LeadMetrics;
