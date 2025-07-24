export interface UTMEntry {
  id: number;
  campaign: string;
  source: string;
  medium: string;
  visits: number;
  uniqueClicks: number;
  status: string;
  url: string;
  term: string;
  content: string;
}

export interface GenerateUTMProps {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}