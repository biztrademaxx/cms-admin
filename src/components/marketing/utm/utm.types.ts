import type { GetUtmByProjectIdQuery } from "@/gql_generated/graphql";

export type UTMEntry = GetUtmByProjectIdQuery["getUtmByProject"][number];

export interface GenerateUTMProps {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term?: string | null;
  content?: string | null;
}

export interface UTMFormValues extends GenerateUTMProps {
  term: string;
  content: string;
}
