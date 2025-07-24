import { GenerateUTMProps } from "./utm.types";

export const generateUTM = (values:GenerateUTMProps) => {
  const { url, source, medium, campaign, term, content } = values;
  const params = new URLSearchParams();
  if (source) params.set("utm_source", source);
  if (medium) params.set("utm_medium", medium);
  if (campaign) params.set("utm_campaign", campaign);
  if (term) params.set("utm_term", term);
  if (content) params.set("utm_content", content);
  return url ? `${url}?${params.toString()}` : "";
};


