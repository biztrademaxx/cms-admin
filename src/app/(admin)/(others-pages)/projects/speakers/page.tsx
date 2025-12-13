import SpeakersComponent from "@/components/speakers/speakersComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Speakers | Business CMS ",
  description: "",
};

export default function SpeakerPage() {
  return <SpeakersComponent />;
}
