import ExhibitorsComponent from "@/components/participants/exhibitors/exhibitorsComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Exhibitors | Business CMS ",
  description: "",
};

export default function Exhibitors() {
  return <ExhibitorsComponent />;
}
