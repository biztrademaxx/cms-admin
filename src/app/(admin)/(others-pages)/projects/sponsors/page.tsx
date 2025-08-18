import MediaPartnersComponent from "@/components/participants/partners/media/MediaComponent";
import SponsorsComponent from "@/components/participants/sponsors/sponsorsComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sponsors | Maxpo CMS ",
  description: "",
};

export default function MediaPage() {
  return <SponsorsComponent />;
}
