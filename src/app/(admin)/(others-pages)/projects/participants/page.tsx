import ParticipantsComponent from "@/components/participants/participantsComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Participants | Business CMS ",
  description: "",
};

export default function ParticipantsPage() {
  return <ParticipantsComponent />;
}
