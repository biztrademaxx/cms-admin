import UtmComponent from "@/components/marketing/utm/utmComponent";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "UTM | Maxpo CMS ",
  description: "",
};

export default function UtmLandingPage() {
  return <UtmComponent />;
}
