import ExhibitorsComponent from "@/components/exhibitors/exhibitorsComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Exhibitors | Maxpo CMS ",
  description: "",
};

export default function Exhibitors() {
  return <ExhibitorsComponent />;
}
