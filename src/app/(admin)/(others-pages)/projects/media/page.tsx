import MediaPartnersComponent from "@/components/participants/partners/media/MediaComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Media Partners | Business CMS ",
  description: "",
};


export default function MediaPage() {
  return <MediaPartnersComponent />;
}
