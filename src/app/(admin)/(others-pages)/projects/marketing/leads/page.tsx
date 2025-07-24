import LeadsComponent from "@/components/marketing/leads/leadsComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Leads | Maxpo CMS ",
  description: "",
};

export default function Exhibitors() {
  return <LeadsComponent />;
}
