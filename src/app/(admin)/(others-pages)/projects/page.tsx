import ProjectsPage from "@/components/landingPage/projectsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business CMS ",
  description: "Projects",
};

export default function ProjectPage() {
  return <ProjectsPage />;
}
