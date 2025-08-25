/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AgendaDay = {
  __typename?: 'AgendaDay';
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  items?: Maybe<Array<AgendaItem>>;
  projectId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AgendaItem = {
  __typename?: 'AgendaItem';
  createdAt: Scalars['DateTime']['output'];
  dayId: Scalars['String']['output'];
  endTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  startTime: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateAgendaDayInput = {
  date: Scalars['String']['input'];
  id: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateAgendaItemInput = {
  dayId: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateExhibitorInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  boothNumber?: InputMaybe<Scalars['String']['input']>;
  companyName: Scalars['String']['input'];
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactName?: InputMaybe<Scalars['String']['input']>;
  contactTitle?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  linkedinUrl?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['String']['input'];
  status?: InputMaybe<Status>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateLeadInput = {
  awardCategory?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  leadType: LeadType;
  message?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  projectId: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<LeadStatus>;
  utmCampaign?: InputMaybe<Scalars['String']['input']>;
  utmContent?: InputMaybe<Scalars['String']['input']>;
  utmId?: InputMaybe<Scalars['String']['input']>;
  utmMedium?: InputMaybe<Scalars['String']['input']>;
  utmSource?: InputMaybe<Scalars['String']['input']>;
  utmTerm?: InputMaybe<Scalars['String']['input']>;
  utmUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePartnerInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  boothNumber?: InputMaybe<Scalars['String']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactName?: InputMaybe<Scalars['String']['input']>;
  contactTitle?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  facebookUrl?: InputMaybe<Scalars['String']['input']>;
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  hideFromParticipant?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  instagramUrl?: InputMaybe<Scalars['String']['input']>;
  linkedinUrl?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  partnerType: PartnerType;
  phone?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['String']['input'];
  status?: InputMaybe<Status>;
  website: Scalars['String']['input'];
  xUrl?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProjectInput = {
  bannerUrl?: InputMaybe<Scalars['String']['input']>;
  currency: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<ProjectStatus>;
  website?: InputMaybe<Scalars['String']['input']>;
  year: Scalars['Int']['input'];
};

export type CreateSpeakerInput = {
  companyLogo?: InputMaybe<Scalars['String']['input']>;
  companyName: Scalars['String']['input'];
  designation: Scalars['String']['input'];
  facebookUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image: Scalars['String']['input'];
  instagramUrl?: InputMaybe<Scalars['String']['input']>;
  linkedinUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
  status?: InputMaybe<Status>;
  website?: InputMaybe<Scalars['String']['input']>;
  xUrl?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateSponsorInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  boothNumber?: InputMaybe<Scalars['String']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactName?: InputMaybe<Scalars['String']['input']>;
  contactTitle?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  hideFromParticipant: Scalars['Boolean']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  linkedinUrl?: InputMaybe<Scalars['String']['input']>;
  logoUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
  status?: InputMaybe<Status>;
  type: SponsorType;
  website: Scalars['String']['input'];
};

export type CreateUtmInput = {
  campaign: Scalars['String']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  medium: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
  source: Scalars['String']['input'];
  term?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type Exhibitor = {
  __typename?: 'Exhibitor';
  address?: Maybe<Scalars['String']['output']>;
  boothNumber?: Maybe<Scalars['String']['output']>;
  companyName: Scalars['String']['output'];
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactName?: Maybe<Scalars['String']['output']>;
  contactTitle?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  hideFromParticipant: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  linkedinUrl?: Maybe<Scalars['String']['output']>;
  logoUrl?: Maybe<Scalars['String']['output']>;
  projectId: Scalars['String']['output'];
  seqNo: Scalars['Int']['output'];
  status: Status;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type GetPartnersByProjectInput = {
  partnerType: PartnerType;
  projectId: Scalars['String']['input'];
};

export type GroupLeadsInput = {
  groupBy: Array<LeadScalarFieldEnum>;
  projectId: Scalars['String']['input'];
};

export type Lead = {
  __typename?: 'Lead';
  awardCategory?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  industry?: Maybe<Scalars['String']['output']>;
  jobTitle?: Maybe<Scalars['String']['output']>;
  leadType: LeadType;
  message?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  projectId: Scalars['String']['output'];
  quantity?: Maybe<Scalars['Int']['output']>;
  status: LeadStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  utmId?: Maybe<Scalars['String']['output']>;
};

export type LeadGroupOutput = {
  __typename?: 'LeadGroupOutput';
  avgPrice?: Maybe<Scalars['Float']['output']>;
  count: Scalars['Int']['output'];
  group: Scalars['String']['output'];
  leads: Array<Lead>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
};

export enum LeadScalarFieldEnum {
  AwardCategory = 'awardCategory',
  CompanyName = 'companyName',
  Country = 'country',
  Email = 'email',
  Industry = 'industry',
  JobTitle = 'jobTitle',
  LeadStatus = 'leadStatus',
  LeadType = 'leadType',
  Message = 'message',
  Name = 'name',
  Phone = 'phone',
  Price = 'price',
  ProjectId = 'projectId',
  Quantity = 'quantity',
  UtmCampaign = 'utmCampaign',
  UtmContent = 'utmContent',
  UtmId = 'utmId',
  UtmMedium = 'utmMedium',
  UtmSource = 'utmSource',
  UtmTerm = 'utmTerm',
  UtmUrl = 'utmUrl'
}

export enum LeadStatus {
  Cold = 'COLD',
  Contacted = 'CONTACTED',
  Hot = 'HOT',
  New = 'NEW',
  Sold = 'SOLD'
}

export enum LeadType {
  Awards = 'AWARDS',
  Brochure = 'BROCHURE',
  Delegate = 'DELEGATE',
  Enquiry = 'ENQUIRY',
  Exhibitor = 'EXHIBITOR',
  Other = 'OTHER',
  Participant = 'PARTICIPANT',
  Partner = 'PARTNER',
  Speaker = 'SPEAKER',
  Sponsor = 'SPONSOR',
  Visitor = 'VISITOR'
}

export type MonthlyData = {
  __typename?: 'MonthlyData';
  exhibitors: Array<Scalars['Int']['output']>;
  leads: Array<Scalars['Int']['output']>;
  partners: Array<Scalars['Int']['output']>;
  speakers: Array<Scalars['Int']['output']>;
  sponsors: Array<Scalars['Int']['output']>;
  utms: Array<Scalars['Int']['output']>;
};

export type MultiGroupOutput = {
  __typename?: 'MultiGroupOutput';
  field: LeadScalarFieldEnum;
  groups: Array<LeadGroupOutput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAgendaDay: AgendaDay;
  createAgendaItem: AgendaItem;
  createExhibitor: Exhibitor;
  createLead: Lead;
  createPartner: Partner;
  createProject: Project;
  createSpeaker: Speaker;
  createSponsor: Sponsor;
  createUtm: Utm;
  deleteExhibitor: Exhibitor;
  deletePartner: Partner;
  deleteProject: Project;
  deleteSpeaker: Speaker;
  deleteSponsor: Sponsor;
  updatePartnerPriority: Array<Partner>;
};


export type MutationCreateAgendaDayArgs = {
  input: CreateAgendaDayInput;
};


export type MutationCreateAgendaItemArgs = {
  input: CreateAgendaItemInput;
};


export type MutationCreateExhibitorArgs = {
  input: CreateExhibitorInput;
};


export type MutationCreateLeadArgs = {
  input: CreateLeadInput;
};


export type MutationCreatePartnerArgs = {
  input: CreatePartnerInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateSpeakerArgs = {
  input: CreateSpeakerInput;
};


export type MutationCreateSponsorArgs = {
  input: CreateSponsorInput;
};


export type MutationCreateUtmArgs = {
  input: CreateUtmInput;
};


export type MutationDeleteExhibitorArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePartnerArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSpeakerArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSponsorArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdatePartnerPriorityArgs = {
  input: UpdatePartnerPriorityInput;
};

export type Partner = {
  __typename?: 'Partner';
  address?: Maybe<Scalars['String']['output']>;
  boothNumber?: Maybe<Scalars['String']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactName?: Maybe<Scalars['String']['output']>;
  contactTitle?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  facebookUrl?: Maybe<Scalars['String']['output']>;
  featured: Scalars['Boolean']['output'];
  hideFromParticipant: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  instagramUrl?: Maybe<Scalars['String']['output']>;
  linkedinUrl?: Maybe<Scalars['String']['output']>;
  logoUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  partnerType: PartnerType;
  phone?: Maybe<Scalars['String']['output']>;
  projectId: Scalars['String']['output'];
  seqNo: Scalars['Int']['output'];
  status: Status;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  website: Scalars['String']['output'];
  xUrl?: Maybe<Scalars['String']['output']>;
  youtubeUrl?: Maybe<Scalars['String']['output']>;
};

export enum PartnerType {
  Community = 'COMMUNITY',
  Media = 'MEDIA',
  Strategic = 'STRATEGIC',
  Supporting = 'SUPPORTING'
}

export type Project = {
  __typename?: 'Project';
  bannerUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  logoUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status: ProjectStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  website?: Maybe<Scalars['String']['output']>;
  year: Scalars['Float']['output'];
};

export type ProjectAnalyticsInput = {
  month?: InputMaybe<Scalars['Boolean']['input']>;
  projectId: Scalars['String']['input'];
};

export type ProjectAnalyticsOutput = {
  __typename?: 'ProjectAnalyticsOutput';
  exhibitors?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  leads?: Maybe<Scalars['Int']['output']>;
  monthlyData?: Maybe<MonthlyData>;
  name: Scalars['String']['output'];
  partners?: Maybe<Scalars['Int']['output']>;
  speakers?: Maybe<Scalars['Int']['output']>;
  sponsors?: Maybe<Scalars['Int']['output']>;
  utms?: Maybe<Scalars['Int']['output']>;
};

export enum ProjectStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Ongoing = 'ONGOING',
  Upcoming = 'UPCOMING'
}

export type Query = {
  __typename?: 'Query';
  getAgendaDay?: Maybe<AgendaDay>;
  getAllAgendaDays: Array<AgendaDay>;
  getAllProjects: Array<Project>;
  getExhibitors: Array<Exhibitor>;
  getExhibitorsByProject: Array<Exhibitor>;
  getLeads: Array<Lead>;
  getLeadsByProjectId: Array<Lead>;
  getLeadsGroupedByField: Array<MultiGroupOutput>;
  getParticipantLogos: Array<Scalars['String']['output']>;
  getPartners: Array<Partner>;
  getPartnersByProject: Array<Partner>;
  getProjectAnalyticsById: ProjectAnalyticsOutput;
  getProjectById: Project;
  getSpeakers: Array<Speaker>;
  getSpeakersByProject: Array<Speaker>;
  getSponsorsByProject: Array<Sponsor>;
  getSponsorsByType: Array<Sponsor>;
  getUtm: Array<Utm>;
  getUtmByProject: Array<Utm>;
};


export type QueryGetAgendaDayArgs = {
  date: Scalars['DateTime']['input'];
};


export type QueryGetExhibitorsByProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetLeadsByProjectIdArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetLeadsGroupedByFieldArgs = {
  input: GroupLeadsInput;
};


export type QueryGetParticipantLogosArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetPartnersByProjectArgs = {
  input: GetPartnersByProjectInput;
};


export type QueryGetProjectAnalyticsByIdArgs = {
  input: ProjectAnalyticsInput;
};


export type QueryGetProjectByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSpeakersByProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetSponsorsByProjectArgs = {
  projectId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetSponsorsByTypeArgs = {
  projectId: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type QueryGetUtmByProjectArgs = {
  id: Scalars['String']['input'];
};

export type Speaker = {
  __typename?: 'Speaker';
  companyLogo?: Maybe<Scalars['String']['output']>;
  companyName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  designation: Scalars['String']['output'];
  facebookUrl?: Maybe<Scalars['String']['output']>;
  hideFromParticipant: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  instagramUrl?: Maybe<Scalars['String']['output']>;
  linkedinUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  projectId: Scalars['String']['output'];
  seqNo: Scalars['Int']['output'];
  status: Status;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  website?: Maybe<Scalars['String']['output']>;
  xUrl?: Maybe<Scalars['String']['output']>;
  youtubeUrl?: Maybe<Scalars['String']['output']>;
};

export type Sponsor = {
  __typename?: 'Sponsor';
  address?: Maybe<Scalars['String']['output']>;
  boothNumber?: Maybe<Scalars['String']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactName?: Maybe<Scalars['String']['output']>;
  contactTitle?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  featured: Scalars['Boolean']['output'];
  hideFromParticipant: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  linkedinUrl?: Maybe<Scalars['String']['output']>;
  logoUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  projectId: Scalars['String']['output'];
  seqNo: Scalars['Int']['output'];
  status: Status;
  type: SponsorType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export enum SponsorType {
  Bronze = 'BRONZE',
  Gold = 'GOLD',
  Networking = 'NETWORKING',
  Platinum = 'PLATINUM',
  Silver = 'SILVER',
  Supporting = 'SUPPORTING',
  Title = 'TITLE'
}

export enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING'
}

export type UpdatePartnerPriorityInput = {
  data: Array<UpdatePartnerPriorityItem>;
};

export type UpdatePartnerPriorityItem = {
  id: Scalars['String']['input'];
  seqNo: Scalars['Int']['input'];
};

export type Utm = {
  __typename?: 'Utm';
  campaign: Scalars['String']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  medium: Scalars['String']['output'];
  projectId: Scalars['String']['output'];
  source: Scalars['String']['output'];
  term?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
};

export type CreateExhibitorMutationVariables = Exact<{
  input: CreateExhibitorInput;
}>;


export type CreateExhibitorMutation = { __typename?: 'Mutation', createExhibitor: { __typename?: 'Exhibitor', id: string } };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, slug: string, name: string, description?: string | null } };

export type CreateSpeakerMutationVariables = Exact<{
  input: CreateSpeakerInput;
}>;


export type CreateSpeakerMutation = { __typename?: 'Mutation', createSpeaker: { __typename?: 'Speaker', id: string, name: string } };

export type CreateSponsorMutationVariables = Exact<{
  input: CreateSponsorInput;
}>;


export type CreateSponsorMutation = { __typename?: 'Mutation', createSponsor: { __typename?: 'Sponsor', id: string, name: string } };

export type CreatePartnerMutationVariables = Exact<{
  input: CreatePartnerInput;
}>;


export type CreatePartnerMutation = { __typename?: 'Mutation', createPartner: { __typename?: 'Partner', name: string } };

export type CreateUtmMutationVariables = Exact<{
  input: CreateUtmInput;
}>;


export type CreateUtmMutation = { __typename?: 'Mutation', createUtm: { __typename?: 'Utm', url: string } };

export type DeleteExhibitorMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteExhibitorMutation = { __typename?: 'Mutation', deleteExhibitor: { __typename?: 'Exhibitor', id: string, companyName: string } };

export type DeletePartnerMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeletePartnerMutation = { __typename?: 'Mutation', deletePartner: { __typename?: 'Partner', id: string, name: string } };

export type DeleteSpeakerMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteSpeakerMutation = { __typename?: 'Mutation', deleteSpeaker: { __typename?: 'Speaker', id: string, name: string } };

export type GetAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProjectsQuery = { __typename?: 'Query', getAllProjects: Array<{ __typename?: 'Project', bannerUrl?: string | null, createdAt: any, currency?: string | null, description?: string | null, endDate?: any | null, id: string, location?: string | null, logoUrl?: string | null, name: string, slug: string, startDate?: any | null, status: ProjectStatus, website?: string | null, year: number }> };

export type GetExhibitorsByProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetExhibitorsByProjectQuery = { __typename?: 'Query', getExhibitorsByProject: Array<{ __typename?: 'Exhibitor', address?: string | null, boothNumber?: string | null, companyName: string, contactEmail?: string | null, contactName?: string | null, contactTitle?: string | null, createdAt: any, description?: string | null, hideFromParticipant: boolean, id: string, linkedinUrl?: string | null, logoUrl?: string | null, projectId: string, seqNo: number, status: Status, updatedAt?: any | null, website?: string | null }> };

export type GetLeadsByProjectIdQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetLeadsByProjectIdQuery = { __typename?: 'Query', getLeadsByProjectId: Array<{ __typename?: 'Lead', id: string, awardCategory?: string | null, companyName?: string | null, createdAt: any, email: string, industry?: string | null, jobTitle?: string | null, leadType: LeadType, message?: string | null, name: string, phone?: string | null, price?: number | null, projectId: string, quantity?: number | null, status: LeadStatus, utmId?: string | null }> };

export type GetLeadsGroupedByFieldQueryVariables = Exact<{
  input: GroupLeadsInput;
}>;


export type GetLeadsGroupedByFieldQuery = { __typename?: 'Query', getLeadsGroupedByField: Array<{ __typename?: 'MultiGroupOutput', field: LeadScalarFieldEnum, groups: Array<{ __typename?: 'LeadGroupOutput', avgPrice?: number | null, count: number, group: string, totalPrice?: number | null, leads: Array<{ __typename?: 'Lead', awardCategory?: string | null, companyName?: string | null, country?: string | null, createdAt: any, email: string, id: string, industry?: string | null, jobTitle?: string | null, leadType: LeadType, message?: string | null, name: string, phone?: string | null, price?: number | null, projectId: string, quantity?: number | null, status: LeadStatus, updatedAt?: any | null, utmId?: string | null }> }> }> };

export type GetPartnersByProjectQueryVariables = Exact<{
  input: GetPartnersByProjectInput;
}>;


export type GetPartnersByProjectQuery = { __typename?: 'Query', getPartnersByProject: Array<{ __typename?: 'Partner', address?: string | null, boothNumber?: string | null, contactEmail?: string | null, contactName?: string | null, contactTitle?: string | null, createdAt: any, description?: string | null, facebookUrl?: string | null, featured: boolean, hideFromParticipant: boolean, id: string, instagramUrl?: string | null, linkedinUrl?: string | null, logoUrl?: string | null, name: string, partnerType: PartnerType, phone?: string | null, projectId: string, seqNo: number, status: Status, website: string, xUrl?: string | null, youtubeUrl?: string | null }> };

export type GetProjectAnalyticsByIdQueryVariables = Exact<{
  input: ProjectAnalyticsInput;
}>;


export type GetProjectAnalyticsByIdQuery = { __typename?: 'Query', getProjectAnalyticsById: { __typename?: 'ProjectAnalyticsOutput', exhibitors?: number | null, id: string, leads?: number | null, speakers?: number | null, sponsors?: number | null, utms?: number | null, monthlyData?: { __typename?: 'MonthlyData', exhibitors: Array<number>, leads: Array<number>, partners: Array<number>, speakers: Array<number>, sponsors: Array<number>, utms: Array<number> } | null } };

export type GetProjectByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', getProjectById: { __typename?: 'Project', createdAt: any, currency?: string | null, description?: string | null, endDate?: any | null, id: string, location?: string | null, logoUrl?: string | null, bannerUrl?: string | null, name: string, slug: string, startDate?: any | null, status: ProjectStatus, website?: string | null, year: number } };

export type GetSpeakersByProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetSpeakersByProjectQuery = { __typename?: 'Query', getSpeakersByProject: Array<{ __typename?: 'Speaker', companyLogo?: string | null, companyName: string, createdAt: any, designation: string, facebookUrl?: string | null, hideFromParticipant: boolean, id: string, image: string, instagramUrl?: string | null, linkedinUrl?: string | null, name: string, projectId: string, seqNo: number, status: Status, updatedAt?: any | null, website?: string | null, xUrl?: string | null, youtubeUrl?: string | null }> };

export type GetSponsorByProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetSponsorByProjectQuery = { __typename?: 'Query', getSponsorsByProject: Array<{ __typename?: 'Sponsor', address?: string | null, boothNumber?: string | null, contactEmail?: string | null, contactName?: string | null, contactTitle?: string | null, createdAt: any, description?: string | null, featured: boolean, hideFromParticipant: boolean, id: string, logoUrl: string, name: string, projectId: string, seqNo: number, status: Status, type: SponsorType }> };

export type GetUtmByProjectIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
  input: GroupLeadsInput;
}>;


export type GetUtmByProjectIdQuery = { __typename?: 'Query', getUtmByProject: Array<{ __typename?: 'Utm', campaign: string, content?: string | null, createdAt: any, id: string, medium: string, projectId: string, source: string, term?: string | null, url: string }>, getLeadsGroupedByField: Array<{ __typename?: 'MultiGroupOutput', field: LeadScalarFieldEnum, groups: Array<{ __typename?: 'LeadGroupOutput', avgPrice?: number | null, count: number, group: string, totalPrice?: number | null }> }> };

export type GetProjectByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', getProjectById: { __typename?: 'Project', createdAt: any, currency?: string | null, description?: string | null, endDate?: any | null, id: string, location?: string | null, logoUrl?: string | null, bannerUrl?: string | null, name: string, slug: string, startDate?: any | null, status: ProjectStatus, website?: string | null, year: number } };


export const CreateExhibitorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createExhibitor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExhibitorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExhibitor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateExhibitorMutation, CreateExhibitorMutationVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateSpeakerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSpeaker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSpeakerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSpeaker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateSpeakerMutation, CreateSpeakerMutationVariables>;
export const CreateSponsorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSponsor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSponsorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSponsor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateSponsorMutation, CreateSponsorMutationVariables>;
export const CreatePartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePartnerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreatePartnerMutation, CreatePartnerMutationVariables>;
export const CreateUtmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUtm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUtmInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUtm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<CreateUtmMutation, CreateUtmMutationVariables>;
export const DeleteExhibitorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteExhibitor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteExhibitor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}}]}}]}}]} as unknown as DocumentNode<DeleteExhibitorMutation, DeleteExhibitorMutationVariables>;
export const DeletePartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeletePartnerMutation, DeletePartnerMutationVariables>;
export const DeleteSpeakerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSpeaker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSpeaker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeleteSpeakerMutation, DeleteSpeakerMutationVariables>;
export const GetAllProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<GetAllProjectsQuery, GetAllProjectsQueryVariables>;
export const GetExhibitorsByProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExhibitorsByProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getExhibitorsByProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"boothNumber"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"contactName"}},{"kind":"Field","name":{"kind":"Name","value":"contactTitle"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"hideFromParticipant"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinUrl"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"seqNo"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"website"}}]}}]}}]} as unknown as DocumentNode<GetExhibitorsByProjectQuery, GetExhibitorsByProjectQueryVariables>;
export const GetLeadsByProjectIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLeadsByProjectId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLeadsByProjectId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"awardCategory"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"industry"}},{"kind":"Field","name":{"kind":"Name","value":"jobTitle"}},{"kind":"Field","name":{"kind":"Name","value":"leadType"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"utmId"}}]}}]}}]} as unknown as DocumentNode<GetLeadsByProjectIdQuery, GetLeadsByProjectIdQueryVariables>;
export const GetLeadsGroupedByFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLeadsGroupedByField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GroupLeadsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLeadsGroupedByField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgPrice"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"leads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"awardCategory"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"industry"}},{"kind":"Field","name":{"kind":"Name","value":"jobTitle"}},{"kind":"Field","name":{"kind":"Name","value":"leadType"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"utmId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetLeadsGroupedByFieldQuery, GetLeadsGroupedByFieldQueryVariables>;
export const GetPartnersByProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPartnersByProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetPartnersByProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPartnersByProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"boothNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"contactName"}},{"kind":"Field","name":{"kind":"Name","value":"contactTitle"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"facebookUrl"}},{"kind":"Field","name":{"kind":"Name","value":"featured"}},{"kind":"Field","name":{"kind":"Name","value":"hideFromParticipant"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"instagramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinUrl"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"partnerType"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"seqNo"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"xUrl"}},{"kind":"Field","name":{"kind":"Name","value":"youtubeUrl"}}]}}]}}]} as unknown as DocumentNode<GetPartnersByProjectQuery, GetPartnersByProjectQueryVariables>;
export const GetProjectAnalyticsByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjectAnalyticsById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectAnalyticsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProjectAnalyticsById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exhibitors"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leads"}},{"kind":"Field","name":{"kind":"Name","value":"speakers"}},{"kind":"Field","name":{"kind":"Name","value":"sponsors"}},{"kind":"Field","name":{"kind":"Name","value":"utms"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exhibitors"}},{"kind":"Field","name":{"kind":"Name","value":"leads"}},{"kind":"Field","name":{"kind":"Name","value":"partners"}},{"kind":"Field","name":{"kind":"Name","value":"speakers"}},{"kind":"Field","name":{"kind":"Name","value":"sponsors"}},{"kind":"Field","name":{"kind":"Name","value":"utms"}}]}}]}}]}}]} as unknown as DocumentNode<GetProjectAnalyticsByIdQuery, GetProjectAnalyticsByIdQueryVariables>;
export const GetSpeakersByProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSpeakersByProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSpeakersByProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyLogo"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"facebookUrl"}},{"kind":"Field","name":{"kind":"Name","value":"hideFromParticipant"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"instagramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"seqNo"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"xUrl"}},{"kind":"Field","name":{"kind":"Name","value":"youtubeUrl"}}]}}]}}]} as unknown as DocumentNode<GetSpeakersByProjectQuery, GetSpeakersByProjectQueryVariables>;
export const GetSponsorByProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSponsorByProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSponsorsByProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"boothNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"contactName"}},{"kind":"Field","name":{"kind":"Name","value":"contactTitle"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"featured"}},{"kind":"Field","name":{"kind":"Name","value":"hideFromParticipant"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"seqNo"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetSponsorByProjectQuery, GetSponsorByProjectQueryVariables>;
export const GetUtmByProjectIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUtmByProjectId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUtmByProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"term"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"getLeadsGroupedByField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"groupBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupBy"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"group"}}]}}]}}]} as unknown as DocumentNode<GetUtmByProjectIdQuery, GetUtmByProjectIdQueryVariables>;
export const GetProjectByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProjectById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProjectById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<GetProjectByIdQuery, GetProjectByIdQueryVariables>;