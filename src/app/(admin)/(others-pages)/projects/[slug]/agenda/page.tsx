import AgendaComponent from "@/components/agenda/agendaComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda | Maxpo CMS",
  description: "",
};

export default function AgendaPage() {
  return (
    <div>
    <AgendaComponent/>
    </div>
  );
}
