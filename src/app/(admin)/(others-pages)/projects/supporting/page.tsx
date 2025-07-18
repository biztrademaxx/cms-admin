import SpeakersComponent from "@/components/speakers/speakersComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Supporting Partners | Maxpo CMS ",
  description: "",
};

export default function SpeakerPage() {
  return <SpeakersComponent />;
}
