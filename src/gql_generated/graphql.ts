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

export type AddExistingSalesPersonInput = {
  cities?: InputMaybe<Array<CityAssignmentInput>>;
  projectId: Scalars['String']['input'];
  sourceSalesPersonId: Scalars['String']['input'];
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

export type AssignLeadInput = {
  assignedToId: Scalars['String']['input'];
  changedByName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type BulkLeadInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  industry?: InputMaybe<Scalars['String']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  leadType?: InputMaybe<LeadType>;
  message?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type BulkLeadResult = {
  __typename?: 'BulkLeadResult';
  created: Scalars['Int']['output'];
  errors: Array<Scalars['String']['output']>;
  failed: Scalars['Int']['output'];
  skipped: Scalars['Int']['output'];
};

export type CityAssignmentInput = {
  city: Scalars['String']['input'];
  state: Scalars['String']['input'];
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
  badge?: InputMaybe<Scalars['String']['input']>;
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
  assignedToId?: InputMaybe<Scalars['String']['input']>;
  awardCategory?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  leadType: LeadType;
  message?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  projectId: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
  source?: InputMaybe<LeadSource>;
  state?: InputMaybe<Scalars['String']['input']>;
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
  badge?: InputMaybe<Scalars['String']['input']>;
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

export type CreateResendInput = {
  body: Scalars['String']['input'];
  from: Scalars['String']['input'];
  projectId: Scalars['ID']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
  to: Array<Scalars['String']['input']>;
};

export type CreateSalesPersonInput = {
  cities?: InputMaybe<Array<CityAssignmentInput>>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['String']['input'];
};

export type CreateSpeakerInput = {
  companyLogo?: InputMaybe<Scalars['String']['input']>;
  companyName: Scalars['String']['input'];
  description: Scalars['String']['input'];
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
  badge?: Maybe<Scalars['String']['output']>;
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
  assignedTo?: Maybe<SalesPerson>;
  assignedToId?: Maybe<Scalars['String']['output']>;
  awardCategory?: Maybe<Scalars['String']['output']>;
  callbackDate?: Maybe<Scalars['DateTime']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  contactPersonDesignation?: Maybe<Scalars['String']['output']>;
  contactPersonEmail?: Maybe<Scalars['String']['output']>;
  contactPersonName?: Maybe<Scalars['String']['output']>;
  contactPersonPhone?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  followUpDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  industry?: Maybe<Scalars['String']['output']>;
  jobTitle?: Maybe<Scalars['String']['output']>;
  leadType: LeadType;
  message?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  projectId: Scalars['String']['output'];
  quantity?: Maybe<Scalars['Int']['output']>;
  source: LeadSource;
  state?: Maybe<Scalars['String']['output']>;
  status: LeadStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  utm?: Maybe<Utm>;
  utmId?: Maybe<Scalars['String']['output']>;
};

export type LeadActivity = {
  __typename?: 'LeadActivity';
  changedById?: Maybe<Scalars['String']['output']>;
  changedByName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  leadId: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  previousStatus?: Maybe<LeadStatus>;
  status: LeadStatus;
};

export type LeadFilterInput = {
  assignedToId?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  createdFrom?: InputMaybe<Scalars['DateTime']['input']>;
  createdTo?: InputMaybe<Scalars['DateTime']['input']>;
  leadType?: InputMaybe<LeadType>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  projectId: Scalars['String']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<LeadSource>;
  state?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<LeadStatus>;
};

export type LeadGroupOutput = {
  __typename?: 'LeadGroupOutput';
  avgPrice?: Maybe<Scalars['Float']['output']>;
  count: Scalars['Int']['output'];
  group: Scalars['String']['output'];
  leads: Array<LeadWithUtm>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
};

export enum LeadScalarFieldEnum {
  AwardCategory = 'awardCategory',
  City = 'city',
  CompanyName = 'companyName',
  Country = 'country',
  CreatedAt = 'createdAt',
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
  Source = 'source',
  State = 'state',
  UtmCampaign = 'utmCampaign',
  UtmContent = 'utmContent',
  UtmId = 'utmId',
  UtmMedium = 'utmMedium',
  UtmSource = 'utmSource',
  UtmTerm = 'utmTerm',
  UtmUrl = 'utmUrl'
}

export enum LeadSource {
  ExcelBulk = 'EXCEL_BULK',
  Manual = 'MANUAL',
  WebsiteUtm = 'WEBSITE_UTM'
}

export enum LeadStatus {
  Busy = 'BUSY',
  Callback = 'CALLBACK',
  Cold = 'COLD',
  Contacted = 'CONTACTED',
  Converted = 'CONVERTED',
  FollowUp = 'FOLLOW_UP',
  Hot = 'HOT',
  Interested = 'INTERESTED',
  New = 'NEW',
  NotInterested = 'NOT_INTERESTED',
  NoResponse = 'NO_RESPONSE',
  SendDetails = 'SEND_DETAILS',
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

export type LeadWithUtm = {
  __typename?: 'LeadWithUtm';
  assignedTo?: Maybe<SalesPerson>;
  assignedToId?: Maybe<Scalars['String']['output']>;
  awardCategory?: Maybe<Scalars['String']['output']>;
  callbackDate?: Maybe<Scalars['DateTime']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  contactPersonDesignation?: Maybe<Scalars['String']['output']>;
  contactPersonEmail?: Maybe<Scalars['String']['output']>;
  contactPersonName?: Maybe<Scalars['String']['output']>;
  contactPersonPhone?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  followUpDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  industry?: Maybe<Scalars['String']['output']>;
  jobTitle?: Maybe<Scalars['String']['output']>;
  leadType: LeadType;
  message?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  projectId: Scalars['String']['output'];
  quantity?: Maybe<Scalars['Int']['output']>;
  source: LeadSource;
  state?: Maybe<Scalars['String']['output']>;
  status: LeadStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  utm?: Maybe<Utm>;
  utmId?: Maybe<Scalars['String']['output']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['String']['input']>;
};

export type LoginProjectOption = {
  __typename?: 'LoginProjectOption';
  projectId: Scalars['String']['output'];
  projectName: Scalars['String']['output'];
  salesPersonId: Scalars['String']['output'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  email?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  projectId?: Maybe<Scalars['String']['output']>;
  projectName?: Maybe<Scalars['String']['output']>;
  projectOptions?: Maybe<Array<LoginProjectOption>>;
  requiresProjectSelection?: Maybe<Scalars['Boolean']['output']>;
  role: UserRole;
  salesPersonId?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
};

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
  addExistingSalesPersonToProject: SalesPerson;
  assignLead: Lead;
  bulkCreateLeads: BulkLeadResult;
  createAgendaDay: AgendaDay;
  createAgendaItem: AgendaItem;
  createExhibitor: Exhibitor;
  createLead: Lead;
  createPartner: Partner;
  createProject: Project;
  createResend: Resend;
  createSalesPerson: SalesPerson;
  createSpeaker: Speaker;
  createSponsor: Sponsor;
  createUtm: Utm;
  deleteExhibitor: Exhibitor;
  deletePartner: Partner;
  deleteProject: Project;
  deleteResend: Scalars['Boolean']['output'];
  deleteSalesPerson: SalesPerson;
  deleteSpeaker: Speaker;
  deleteSponsor: Sponsor;
  login: LoginResponse;
  updateExhibitor: Exhibitor;
  updateExhibitorOrder: Array<Exhibitor>;
  updateLeadContact: Lead;
  updateLeadStatus: Lead;
  updatePartnerPriority: Array<Partner>;
  updateResend: Resend;
  updateSpeaker: Speaker;
  updateSpeakerOrder: Array<Speaker>;
  updateSponsor: Sponsor;
  updateSponsorOrder: Array<Sponsor>;
};


export type MutationAddExistingSalesPersonToProjectArgs = {
  input: AddExistingSalesPersonInput;
};


export type MutationAssignLeadArgs = {
  input: AssignLeadInput;
};


export type MutationBulkCreateLeadsArgs = {
  leads: Array<BulkLeadInput>;
  projectId: Scalars['String']['input'];
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


export type MutationCreateResendArgs = {
  input: CreateResendInput;
};


export type MutationCreateSalesPersonArgs = {
  input: CreateSalesPersonInput;
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


export type MutationDeleteResendArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSalesPersonArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSpeakerArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSponsorArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationUpdateExhibitorArgs = {
  input: UpdateExhibitorInput;
};


export type MutationUpdateExhibitorOrderArgs = {
  inputs: Array<UpdateExhibitorSeqInput>;
};


export type MutationUpdateLeadContactArgs = {
  input: UpdateLeadContactInput;
};


export type MutationUpdateLeadStatusArgs = {
  input: UpdateLeadStatusInput;
};


export type MutationUpdatePartnerPriorityArgs = {
  input: UpdatePartnerPriorityInput;
};


export type MutationUpdateResendArgs = {
  input: UpdateResendInput;
};


export type MutationUpdateSpeakerArgs = {
  input: UpdateSpeakerInput;
};


export type MutationUpdateSpeakerOrderArgs = {
  inputs: Array<UpdateSpeakerSeqInput>;
};


export type MutationUpdateSponsorArgs = {
  input: UpdateSponsorInput;
};


export type MutationUpdateSponsorOrderArgs = {
  inputs: Array<UpdateSponsorSeqInput>;
};

export type PaginatedLeads = {
  __typename?: 'PaginatedLeads';
  leads: Array<Lead>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Partner = {
  __typename?: 'Partner';
  address?: Maybe<Scalars['String']['output']>;
  badge?: Maybe<Scalars['String']['output']>;
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
  Other = 'OTHER',
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
  getFilteredLeads: PaginatedLeads;
  getLeadActivities: Array<LeadActivity>;
  getLeadById: Lead;
  getLeadCities: Array<Scalars['String']['output']>;
  getLeadStates: Array<Scalars['String']['output']>;
  getLeads: Array<Lead>;
  getLeadsByProjectId: Array<Lead>;
  getLeadsGroupedByField: Array<MultiGroupOutput>;
  getParticipantLogos: Array<Scalars['String']['output']>;
  getPartners: Array<Partner>;
  getPartnersByProject: Array<Partner>;
  getProjectAnalyticsById: ProjectAnalyticsOutput;
  getProjectById: Project;
  getResend?: Maybe<Resend>;
  getResends: Array<Resend>;
  getSalesAssignedLeads: PaginatedLeads;
  getSalesPeople: Array<SalesPerson>;
  getSalesPeopleByProject: Array<SalesPerson>;
  getSalesPersonById: SalesPerson;
  getSalesPersonPerformance: SalesPersonPerformance;
  getSalesProjectMemberships: Array<SalesPerson>;
  getSalesTeamPerformance: Array<SalesPersonPerformance>;
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


export type QueryGetFilteredLeadsArgs = {
  input: LeadFilterInput;
};


export type QueryGetLeadActivitiesArgs = {
  leadId: Scalars['String']['input'];
};


export type QueryGetLeadByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetLeadCitiesArgs = {
  projectId: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetLeadStatesArgs = {
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


export type QueryGetResendArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSalesAssignedLeadsArgs = {
  input: SalesAssignedLeadsInput;
};


export type QueryGetSalesPeopleByProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetSalesPersonByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSalesPersonPerformanceArgs = {
  salesPersonId: Scalars['String']['input'];
};


export type QueryGetSalesProjectMembershipsArgs = {
  salesPersonId: Scalars['String']['input'];
};


export type QueryGetSalesTeamPerformanceArgs = {
  projectId: Scalars['String']['input'];
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

export type Resend = {
  __typename?: 'Resend';
  body?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  project: Project;
  status: Scalars['String']['output'];
  subject?: Maybe<Scalars['String']['output']>;
  to: Array<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SalesAssignedLeadsInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  salesPersonId: Scalars['String']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<LeadStatus>;
};

export type SalesPerson = {
  __typename?: 'SalesPerson';
  cities?: Maybe<Array<SalesPersonCity>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  projectId: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SalesPersonCity = {
  __typename?: 'SalesPersonCity';
  city: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  salesPersonId: Scalars['String']['output'];
  state: Scalars['String']['output'];
};

export type SalesPersonPerformance = {
  __typename?: 'SalesPersonPerformance';
  conversionRate: Scalars['Float']['output'];
  converted: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  inProgress: Scalars['Int']['output'];
  interested: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  newLeads: Scalars['Int']['output'];
  notInterested: Scalars['Int']['output'];
  salesPersonId: Scalars['ID']['output'];
  statusBreakdown: Array<StatusCount>;
  totalLeads: Scalars['Int']['output'];
};

export type Speaker = {
  __typename?: 'Speaker';
  companyLogo?: Maybe<Scalars['String']['output']>;
  companyName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
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

export type StatusCount = {
  __typename?: 'StatusCount';
  count: Scalars['Int']['output'];
  status: LeadStatus;
};

export type UpdateExhibitorInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  badge?: InputMaybe<Scalars['String']['input']>;
  boothNumber?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactName?: InputMaybe<Scalars['String']['input']>;
  contactTitle?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  linkedinUrl?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExhibitorSeqInput = {
  id: Scalars['ID']['input'];
  seqNo: Scalars['Int']['input'];
};

export type UpdateLeadContactInput = {
  contactPersonDesignation?: InputMaybe<Scalars['String']['input']>;
  contactPersonEmail?: InputMaybe<Scalars['String']['input']>;
  contactPersonName?: InputMaybe<Scalars['String']['input']>;
  contactPersonPhone?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type UpdateLeadStatusInput = {
  callbackDate?: InputMaybe<Scalars['DateTime']['input']>;
  changedById?: InputMaybe<Scalars['String']['input']>;
  changedByName?: InputMaybe<Scalars['String']['input']>;
  followUpDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  leadType?: InputMaybe<LeadType>;
  notes?: InputMaybe<Scalars['String']['input']>;
  status: LeadStatus;
};

export type UpdatePartnerPriorityInput = {
  data: Array<UpdatePartnerPriorityItem>;
};

export type UpdatePartnerPriorityItem = {
  id: Scalars['String']['input'];
  seqNo: Scalars['Int']['input'];
};

export type UpdateResendInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateSpeakerInput = {
  companyLogo?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  designation?: InputMaybe<Scalars['String']['input']>;
  facebookUrl?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  instagramUrl?: InputMaybe<Scalars['String']['input']>;
  linkedinUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
  website?: InputMaybe<Scalars['String']['input']>;
  xUrl?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSpeakerSeqInput = {
  id: Scalars['ID']['input'];
  seqNo: Scalars['Int']['input'];
};

export type UpdateSponsorInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  boothNumber?: InputMaybe<Scalars['String']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactName?: InputMaybe<Scalars['String']['input']>;
  contactTitle?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  hideFromParticipant?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  linkedinUrl?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
  type?: InputMaybe<SponsorType>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSponsorSeqInput = {
  id: Scalars['ID']['input'];
  seqNo: Scalars['Int']['input'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Sales = 'SALES'
}

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

export type AddExistingSalesPersonToProjectMutationVariables = Exact<{
  input: AddExistingSalesPersonInput;
}>;


export type AddExistingSalesPersonToProjectMutation = { __typename?: 'Mutation', addExistingSalesPersonToProject: { __typename?: 'SalesPerson', id: string, name: string, email: string, phone?: string | null, isActive: boolean, projectId: string, cities?: Array<{ __typename?: 'SalesPersonCity', id: string, city: string, state: string }> | null } };

export type AssignLeadMutationVariables = Exact<{
  input: AssignLeadInput;
}>;


export type AssignLeadMutation = { __typename?: 'Mutation', assignLead: { __typename?: 'Lead', id: string, assignedToId?: string | null, updatedAt?: any | null, assignedTo?: { __typename?: 'SalesPerson', id: string, name: string, email: string, phone?: string | null } | null } };

export type BulkCreateLeadsMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
  leads: Array<BulkLeadInput> | BulkLeadInput;
}>;


export type BulkCreateLeadsMutation = { __typename?: 'Mutation', bulkCreateLeads: { __typename?: 'BulkLeadResult', created: number, skipped: number, failed: number, errors: Array<string> } };

export type CreateExhibitorMutationVariables = Exact<{
  input: CreateExhibitorInput;
}>;


export type CreateExhibitorMutation = { __typename?: 'Mutation', createExhibitor: { __typename?: 'Exhibitor', id: string } };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, slug: string, name: string, description?: string | null } };

export type CreateSalesPersonMutationVariables = Exact<{
  input: CreateSalesPersonInput;
}>;


export type CreateSalesPersonMutation = { __typename?: 'Mutation', createSalesPerson: { __typename?: 'SalesPerson', id: string, name: string, email: string, phone?: string | null, isActive: boolean, cities?: Array<{ __typename?: 'SalesPersonCity', id: string, city: string, state: string }> | null } };

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

export type DeleteSalesPersonMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteSalesPersonMutation = { __typename?: 'Mutation', deleteSalesPerson: { __typename?: 'SalesPerson', id: string } };

export type DeleteSpeakerMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteSpeakerMutation = { __typename?: 'Mutation', deleteSpeaker: { __typename?: 'Speaker', id: string, name: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', token: string, role: UserRole, name: string, email?: string | null, salesPersonId?: string | null, projectId?: string | null, projectName?: string | null, requiresProjectSelection?: boolean | null, projectOptions?: Array<{ __typename?: 'LoginProjectOption', projectId: string, projectName: string, salesPersonId: string }> | null } };

export type UpdateExhibitorOrderMutationVariables = Exact<{
  inputs: Array<UpdateExhibitorSeqInput> | UpdateExhibitorSeqInput;
}>;


export type UpdateExhibitorOrderMutation = { __typename?: 'Mutation', updateExhibitorOrder: Array<{ __typename?: 'Exhibitor', id: string, companyName: string, seqNo: number }> };

export type UpdateLeadContactMutationVariables = Exact<{
  input: UpdateLeadContactInput;
}>;


export type UpdateLeadContactMutation = { __typename?: 'Mutation', updateLeadContact: { __typename?: 'Lead', id: string, contactPersonName?: string | null, contactPersonPhone?: string | null, contactPersonDesignation?: string | null, contactPersonEmail?: string | null, updatedAt?: any | null } };

export type UpdateLeadStatusMutationVariables = Exact<{
  input: UpdateLeadStatusInput;
}>;


export type UpdateLeadStatusMutation = { __typename?: 'Mutation', updateLeadStatus: { __typename?: 'Lead', id: string, status: LeadStatus, leadType: LeadType, notes?: string | null, callbackDate?: any | null, followUpDate?: any | null, updatedAt?: any | null } };

export type UpdateSponsorOrderMutationVariables = Exact<{
  inputs: Array<UpdateSponsorSeqInput> | UpdateSponsorSeqInput;
}>;


export type UpdateSponsorOrderMutation = { __typename?: 'Mutation', updateSponsorOrder: Array<{ __typename?: 'Sponsor', id: string, seqNo: number }> };

export type GetAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProjectsQuery = { __typename?: 'Query', getAllProjects: Array<{ __typename?: 'Project', bannerUrl?: string | null, createdAt: any, currency?: string | null, description?: string | null, endDate?: any | null, id: string, location?: string | null, logoUrl?: string | null, name: string, slug: string, startDate?: any | null, status: ProjectStatus, website?: string | null, year: number }> };

export type GetExhibitorsByProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetExhibitorsByProjectQuery = { __typename?: 'Query', getExhibitorsByProject: Array<{ __typename?: 'Exhibitor', address?: string | null, boothNumber?: string | null, badge?: string | null, companyName: string, contactEmail?: string | null, contactName?: string | null, contactTitle?: string | null, createdAt: any, description?: string | null, hideFromParticipant: boolean, id: string, linkedinUrl?: string | null, logoUrl?: string | null, projectId: string, seqNo: number, status: Status, updatedAt?: any | null, website?: string | null }> };

export type GetFilteredLeadsQueryVariables = Exact<{
  input: LeadFilterInput;
}>;


export type GetFilteredLeadsQuery = { __typename?: 'Query', getFilteredLeads: { __typename?: 'PaginatedLeads', total: number, page: number, limit: number, totalPages: number, leads: Array<{ __typename?: 'Lead', id: string, name: string, email: string, phone?: string | null, companyName?: string | null, jobTitle?: string | null, city?: string | null, state?: string | null, country?: string | null, status: LeadStatus, source: LeadSource, leadType: LeadType, industry?: string | null, message?: string | null, notes?: string | null, assignedToId?: string | null, callbackDate?: any | null, followUpDate?: any | null, createdAt: any, updatedAt?: any | null, assignedTo?: { __typename?: 'SalesPerson', id: string, name: string, email: string, phone?: string | null } | null, utm?: { __typename?: 'Utm', id: string, source: string, medium: string, campaign: string } | null }> } };

export type GetLeadActivitiesQueryVariables = Exact<{
  leadId: Scalars['String']['input'];
}>;


export type GetLeadActivitiesQuery = { __typename?: 'Query', getLeadActivities: Array<{ __typename?: 'LeadActivity', id: string, leadId: string, status: LeadStatus, previousStatus?: LeadStatus | null, notes?: string | null, changedById?: string | null, changedByName?: string | null, createdAt: any }> };

export type GetLeadByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetLeadByIdQuery = { __typename?: 'Query', getLeadById: { __typename?: 'Lead', id: string, projectId: string, assignedToId?: string | null, name: string, email: string, phone?: string | null, companyName?: string | null, jobTitle?: string | null, contactPersonName?: string | null, contactPersonPhone?: string | null, contactPersonDesignation?: string | null, contactPersonEmail?: string | null, city?: string | null, state?: string | null, country?: string | null, industry?: string | null, status: LeadStatus, source: LeadSource, leadType: LeadType, message?: string | null, notes?: string | null, quantity?: number | null, price?: number | null, callbackDate?: any | null, followUpDate?: any | null, createdAt: any, updatedAt?: any | null, assignedTo?: { __typename?: 'SalesPerson', id: string, name: string, email: string, phone?: string | null, cities?: Array<{ __typename?: 'SalesPersonCity', city: string, state: string }> | null } | null, utm?: { __typename?: 'Utm', id: string, source: string, medium: string, campaign: string, term?: string | null, content?: string | null, url: string } | null } };

export type GetLeadCitiesQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetLeadCitiesQuery = { __typename?: 'Query', getLeadCities: Array<string> };

export type GetLeadStatesQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetLeadStatesQuery = { __typename?: 'Query', getLeadStates: Array<string> };

export type GetLeadsByProjectIdQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetLeadsByProjectIdQuery = { __typename?: 'Query', getLeadsByProjectId: Array<{ __typename?: 'Lead', id: string, awardCategory?: string | null, companyName?: string | null, createdAt: any, email: string, industry?: string | null, jobTitle?: string | null, leadType: LeadType, message?: string | null, name: string, phone?: string | null, price?: number | null, projectId: string, quantity?: number | null, status: LeadStatus, source: LeadSource, city?: string | null, state?: string | null, country?: string | null, notes?: string | null, assignedToId?: string | null, utmId?: string | null, assignedTo?: { __typename?: 'SalesPerson', id: string, name: string, email: string } | null, utm?: { __typename?: 'Utm', source: string, medium: string, campaign: string } | null }> };

export type GetLeadsGroupedByFieldQueryVariables = Exact<{
  input: GroupLeadsInput;
}>;


export type GetLeadsGroupedByFieldQuery = { __typename?: 'Query', getLeadsGroupedByField: Array<{ __typename?: 'MultiGroupOutput', field: LeadScalarFieldEnum, groups: Array<{ __typename?: 'LeadGroupOutput', avgPrice?: number | null, count: number, group: string, totalPrice?: number | null }> }> };

export type GetPartnersByProjectQueryVariables = Exact<{
  input: GetPartnersByProjectInput;
}>;


export type GetPartnersByProjectQuery = { __typename?: 'Query', getPartnersByProject: Array<{ __typename?: 'Partner', address?: string | null, boothNumber?: string | null, badge?: string | null, contactEmail?: string | null, contactName?: string | null, contactTitle?: string | null, createdAt: any, description?: string | null, facebookUrl?: string | null, featured: boolean, hideFromParticipant: boolean, id: string, instagramUrl?: string | null, linkedinUrl?: string | null, logoUrl?: string | null, name: string, partnerType: PartnerType, phone?: string | null, projectId: string, seqNo: number, status: Status, website: string, xUrl?: string | null, youtubeUrl?: string | null }> };

export type GetProjectAnalyticsByIdQueryVariables = Exact<{
  input: ProjectAnalyticsInput;
}>;


export type GetProjectAnalyticsByIdQuery = { __typename?: 'Query', getProjectAnalyticsById: { __typename?: 'ProjectAnalyticsOutput', exhibitors?: number | null, id: string, leads?: number | null, speakers?: number | null, sponsors?: number | null, utms?: number | null, monthlyData?: { __typename?: 'MonthlyData', exhibitors: Array<number>, leads: Array<number>, partners: Array<number>, speakers: Array<number>, sponsors: Array<number>, utms: Array<number> } | null } };

export type GetSalesAssignedLeadsQueryVariables = Exact<{
  input: SalesAssignedLeadsInput;
}>;


export type GetSalesAssignedLeadsQuery = { __typename?: 'Query', getSalesAssignedLeads: { __typename?: 'PaginatedLeads', total: number, page: number, limit: number, totalPages: number, leads: Array<{ __typename?: 'Lead', id: string, name: string, email: string, phone?: string | null, companyName?: string | null, jobTitle?: string | null, city?: string | null, state?: string | null, country?: string | null, status: LeadStatus, source: LeadSource, leadType: LeadType, industry?: string | null, message?: string | null, notes?: string | null, assignedToId?: string | null, projectId: string, callbackDate?: any | null, followUpDate?: any | null, createdAt: any, updatedAt?: any | null, assignedTo?: { __typename?: 'SalesPerson', id: string, name: string, email: string, phone?: string | null } | null }> } };

export type GetSalesPeopleQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSalesPeopleQuery = { __typename?: 'Query', getSalesPeople: Array<{ __typename?: 'SalesPerson', id: string, name: string, email: string, phone?: string | null, isActive: boolean, projectId: string, cities?: Array<{ __typename?: 'SalesPersonCity', id: string, city: string, state: string }> | null }> };

export type GetSalesPeopleByProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetSalesPeopleByProjectQuery = { __typename?: 'Query', getSalesPeopleByProject: Array<{ __typename?: 'SalesPerson', id: string, name: string, email: string, phone?: string | null, isActive: boolean, projectId: string, createdAt: any, cities?: Array<{ __typename?: 'SalesPersonCity', id: string, city: string, state: string }> | null }> };

export type GetSalesPersonByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetSalesPersonByIdQuery = { __typename?: 'Query', getSalesPersonById: { __typename?: 'SalesPerson', id: string, name: string, email: string, projectId: string, project?: { __typename?: 'Project', id: string, name: string } | null } };

export type GetSalesPersonPerformanceQueryVariables = Exact<{
  salesPersonId: Scalars['String']['input'];
}>;


export type GetSalesPersonPerformanceQuery = { __typename?: 'Query', getSalesPersonPerformance: { __typename?: 'SalesPersonPerformance', salesPersonId: string, name: string, email: string, totalLeads: number, newLeads: number, inProgress: number, interested: number, converted: number, notInterested: number, conversionRate: number, statusBreakdown: Array<{ __typename?: 'StatusCount', status: LeadStatus, count: number }> } };

export type GetSalesProjectMembershipsQueryVariables = Exact<{
  salesPersonId: Scalars['String']['input'];
}>;


export type GetSalesProjectMembershipsQuery = { __typename?: 'Query', getSalesProjectMemberships: Array<{ __typename?: 'SalesPerson', id: string, name: string, email: string, projectId: string, project?: { __typename?: 'Project', id: string, name: string } | null }> };

export type GetSalesTeamPerformanceQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetSalesTeamPerformanceQuery = { __typename?: 'Query', getSalesTeamPerformance: Array<{ __typename?: 'SalesPersonPerformance', salesPersonId: string, name: string, email: string, totalLeads: number, newLeads: number, inProgress: number, interested: number, converted: number, notInterested: number, conversionRate: number, statusBreakdown: Array<{ __typename?: 'StatusCount', status: LeadStatus, count: number }> }> };

export type GetSpeakersByProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetSpeakersByProjectQuery = { __typename?: 'Query', getSpeakersByProject: Array<{ __typename?: 'Speaker', companyLogo?: string | null, companyName: string, createdAt: any, designation: string, facebookUrl?: string | null, hideFromParticipant: boolean, id: string, image: string, instagramUrl?: string | null, linkedinUrl?: string | null, name: string, projectId: string, seqNo: number, status: Status, updatedAt?: any | null, website?: string | null, xUrl?: string | null, youtubeUrl?: string | null, description?: string | null }> };

export type GetSponsorByProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetSponsorByProjectQuery = { __typename?: 'Query', getSponsorsByProject: Array<{ __typename?: 'Sponsor', address?: string | null, boothNumber?: string | null, contactEmail?: string | null, contactName?: string | null, contactTitle?: string | null, createdAt: any, description?: string | null, featured: boolean, hideFromParticipant: boolean, id: string, logoUrl: string, name: string, projectId: string, seqNo: number, website?: string | null, linkedinUrl?: string | null, status: Status, type: SponsorType }> };

export type GetUtmByProjectIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
  input: GroupLeadsInput;
}>;


export type GetUtmByProjectIdQuery = { __typename?: 'Query', getUtmByProject: Array<{ __typename?: 'Utm', campaign: string, content?: string | null, createdAt: any, id: string, medium: string, projectId: string, source: string, term?: string | null, url: string }>, getLeadsGroupedByField: Array<{ __typename?: 'MultiGroupOutput', field: LeadScalarFieldEnum, groups: Array<{ __typename?: 'LeadGroupOutput', avgPrice?: number | null, count: number, group: string, totalPrice?: number | null, leads: Array<{ __typename?: 'LeadWithUtm', email: string }> }> }> };

export type GetProjectByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', getProjectById: { __typename?: 'Project', createdAt: any, currency?: string | null, description?: string | null, endDate?: any | null, id: string, location?: string | null, logoUrl?: string | null, bannerUrl?: string | null, name: string, slug: string, startDate?: any | null, status: ProjectStatus, website?: string | null, year: number } };


export const AddExistingSalesPersonToProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddExistingSalesPersonToProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddExistingSalesPersonInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addExistingSalesPersonToProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]}}]} as unknown as DocumentNode<AddExistingSalesPersonToProjectMutation, AddExistingSalesPersonToProjectMutationVariables>;
export const AssignLeadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignLead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssignLeadInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignLead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AssignLeadMutation, AssignLeadMutationVariables>;
export const BulkCreateLeadsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkCreateLeads"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leads"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BulkLeadInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulkCreateLeads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"Argument","name":{"kind":"Name","value":"leads"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leads"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"skipped"}},{"kind":"Field","name":{"kind":"Name","value":"failed"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<BulkCreateLeadsMutation, BulkCreateLeadsMutationVariables>;
export const CreateExhibitorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createExhibitor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExhibitorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExhibitor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateExhibitorMutation, CreateExhibitorMutationVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateSalesPersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSalesPerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSalesPersonInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSalesPerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]}}]} as unknown as DocumentNode<CreateSalesPersonMutation, CreateSalesPersonMutationVariables>;
export const CreateSpeakerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSpeaker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSpeakerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSpeaker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateSpeakerMutation, CreateSpeakerMutationVariables>;
export const CreateSponsorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSponsor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSponsorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSponsor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateSponsorMutation, CreateSponsorMutationVariables>;
export const CreatePartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePartnerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreatePartnerMutation, CreatePartnerMutationVariables>;
export const CreateUtmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUtm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUtmInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUtm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<CreateUtmMutation, CreateUtmMutationVariables>;
export const DeleteExhibitorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteExhibitor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteExhibitor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}}]}}]}}]} as unknown as DocumentNode<DeleteExhibitorMutation, DeleteExhibitorMutationVariables>;
export const DeletePartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeletePartnerMutation, DeletePartnerMutationVariables>;
export const DeleteSalesPersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSalesPerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSalesPerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteSalesPersonMutation, DeleteSalesPersonMutationVariables>;
export const DeleteSpeakerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSpeaker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSpeaker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeleteSpeakerMutation, DeleteSpeakerMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"salesPersonId"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"projectName"}},{"kind":"Field","name":{"kind":"Name","value":"requiresProjectSelection"}},{"kind":"Field","name":{"kind":"Name","value":"projectOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"projectName"}},{"kind":"Field","name":{"kind":"Name","value":"salesPersonId"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const UpdateExhibitorOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateExhibitorOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateExhibitorSeqInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExhibitorOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inputs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"seqNo"}}]}}]}}]} as unknown as DocumentNode<UpdateExhibitorOrderMutation, UpdateExhibitorOrderMutationVariables>;
export const UpdateLeadContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLeadContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateLeadContactInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLeadContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonPhone"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonDesignation"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonEmail"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateLeadContactMutation, UpdateLeadContactMutationVariables>;
export const UpdateLeadStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLeadStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateLeadStatusInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLeadStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"leadType"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"callbackDate"}},{"kind":"Field","name":{"kind":"Name","value":"followUpDate"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateLeadStatusMutation, UpdateLeadStatusMutationVariables>;
export const UpdateSponsorOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSponsorOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSponsorSeqInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSponsorOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inputs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seqNo"}}]}}]}}]} as unknown as DocumentNode<UpdateSponsorOrderMutation, UpdateSponsorOrderMutationVariables>;
export const GetAllProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<GetAllProjectsQuery, GetAllProjectsQueryVariables>;
export const GetExhibitorsByProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExhibitorsByProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getExhibitorsByProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"boothNumber"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"contactName"}},{"kind":"Field","name":{"kind":"Name","value":"contactTitle"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"hideFromParticipant"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinUrl"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"seqNo"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"website"}}]}}]}}]} as unknown as DocumentNode<GetExhibitorsByProjectQuery, GetExhibitorsByProjectQueryVariables>;
export const GetFilteredLeadsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFilteredLeads"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LeadFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFilteredLeads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"leads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"jobTitle"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"leadType"}},{"kind":"Field","name":{"kind":"Name","value":"industry"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"callbackDate"}},{"kind":"Field","name":{"kind":"Name","value":"followUpDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"utm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFilteredLeadsQuery, GetFilteredLeadsQueryVariables>;
export const GetLeadActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLeadActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLeadActivities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"leadId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leadId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"previousStatus"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"changedById"}},{"kind":"Field","name":{"kind":"Name","value":"changedByName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetLeadActivitiesQuery, GetLeadActivitiesQueryVariables>;
export const GetLeadByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLeadById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLeadById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"jobTitle"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonPhone"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonDesignation"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonEmail"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"industry"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"leadType"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"callbackDate"}},{"kind":"Field","name":{"kind":"Name","value":"followUpDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"utm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"}},{"kind":"Field","name":{"kind":"Name","value":"term"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetLeadByIdQuery, GetLeadByIdQueryVariables>;
export const GetLeadCitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLeadCities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"state"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLeadCities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"Argument","name":{"kind":"Name","value":"state"},"value":{"kind":"Variable","name":{"kind":"Name","value":"state"}}}]}]}}]} as unknown as DocumentNode<GetLeadCitiesQuery, GetLeadCitiesQueryVariables>;
export const GetLeadStatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLeadStates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLeadStates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}]}}]} as unknown as DocumentNode<GetLeadStatesQuery, GetLeadStatesQueryVariables>;
export const GetLeadsByProjectIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLeadsByProjectId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLeadsByProjectId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"awardCategory"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"industry"}},{"kind":"Field","name":{"kind":"Name","value":"jobTitle"}},{"kind":"Field","name":{"kind":"Name","value":"leadType"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"utmId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"utm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"}}]}}]}}]}}]} as unknown as DocumentNode<GetLeadsByProjectIdQuery, GetLeadsByProjectIdQueryVariables>;
export const GetLeadsGroupedByFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLeadsGroupedByField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GroupLeadsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLeadsGroupedByField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgPrice"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}}]}}]}}]}}]} as unknown as DocumentNode<GetLeadsGroupedByFieldQuery, GetLeadsGroupedByFieldQueryVariables>;
export const GetPartnersByProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPartnersByProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetPartnersByProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPartnersByProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"boothNumber"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"contactName"}},{"kind":"Field","name":{"kind":"Name","value":"contactTitle"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"facebookUrl"}},{"kind":"Field","name":{"kind":"Name","value":"featured"}},{"kind":"Field","name":{"kind":"Name","value":"hideFromParticipant"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"instagramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinUrl"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"partnerType"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"seqNo"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"xUrl"}},{"kind":"Field","name":{"kind":"Name","value":"youtubeUrl"}}]}}]}}]} as unknown as DocumentNode<GetPartnersByProjectQuery, GetPartnersByProjectQueryVariables>;
export const GetProjectAnalyticsByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjectAnalyticsById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectAnalyticsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProjectAnalyticsById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exhibitors"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leads"}},{"kind":"Field","name":{"kind":"Name","value":"speakers"}},{"kind":"Field","name":{"kind":"Name","value":"sponsors"}},{"kind":"Field","name":{"kind":"Name","value":"utms"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exhibitors"}},{"kind":"Field","name":{"kind":"Name","value":"leads"}},{"kind":"Field","name":{"kind":"Name","value":"partners"}},{"kind":"Field","name":{"kind":"Name","value":"speakers"}},{"kind":"Field","name":{"kind":"Name","value":"sponsors"}},{"kind":"Field","name":{"kind":"Name","value":"utms"}}]}}]}}]}}]} as unknown as DocumentNode<GetProjectAnalyticsByIdQuery, GetProjectAnalyticsByIdQueryVariables>;
export const GetSalesAssignedLeadsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSalesAssignedLeads"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SalesAssignedLeadsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSalesAssignedLeads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"leads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"jobTitle"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"leadType"}},{"kind":"Field","name":{"kind":"Name","value":"industry"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"callbackDate"}},{"kind":"Field","name":{"kind":"Name","value":"followUpDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSalesAssignedLeadsQuery, GetSalesAssignedLeadsQueryVariables>;
export const GetSalesPeopleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSalesPeople"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSalesPeople"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]}}]} as unknown as DocumentNode<GetSalesPeopleQuery, GetSalesPeopleQueryVariables>;
export const GetSalesPeopleByProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSalesPeopleByProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSalesPeopleByProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetSalesPeopleByProjectQuery, GetSalesPeopleByProjectQueryVariables>;
export const GetSalesPersonByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSalesPersonById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSalesPersonById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetSalesPersonByIdQuery, GetSalesPersonByIdQueryVariables>;
export const GetSalesPersonPerformanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSalesPersonPerformance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"salesPersonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSalesPersonPerformance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"salesPersonId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"salesPersonId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"salesPersonId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeads"}},{"kind":"Field","name":{"kind":"Name","value":"newLeads"}},{"kind":"Field","name":{"kind":"Name","value":"inProgress"}},{"kind":"Field","name":{"kind":"Name","value":"interested"}},{"kind":"Field","name":{"kind":"Name","value":"converted"}},{"kind":"Field","name":{"kind":"Name","value":"notInterested"}},{"kind":"Field","name":{"kind":"Name","value":"conversionRate"}},{"kind":"Field","name":{"kind":"Name","value":"statusBreakdown"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<GetSalesPersonPerformanceQuery, GetSalesPersonPerformanceQueryVariables>;
export const GetSalesProjectMembershipsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSalesProjectMemberships"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"salesPersonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSalesProjectMemberships"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"salesPersonId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"salesPersonId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetSalesProjectMembershipsQuery, GetSalesProjectMembershipsQueryVariables>;
export const GetSalesTeamPerformanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSalesTeamPerformance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSalesTeamPerformance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"salesPersonId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeads"}},{"kind":"Field","name":{"kind":"Name","value":"newLeads"}},{"kind":"Field","name":{"kind":"Name","value":"inProgress"}},{"kind":"Field","name":{"kind":"Name","value":"interested"}},{"kind":"Field","name":{"kind":"Name","value":"converted"}},{"kind":"Field","name":{"kind":"Name","value":"notInterested"}},{"kind":"Field","name":{"kind":"Name","value":"conversionRate"}},{"kind":"Field","name":{"kind":"Name","value":"statusBreakdown"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<GetSalesTeamPerformanceQuery, GetSalesTeamPerformanceQueryVariables>;
export const GetSpeakersByProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSpeakersByProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSpeakersByProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyLogo"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"facebookUrl"}},{"kind":"Field","name":{"kind":"Name","value":"hideFromParticipant"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"instagramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"seqNo"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"xUrl"}},{"kind":"Field","name":{"kind":"Name","value":"youtubeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetSpeakersByProjectQuery, GetSpeakersByProjectQueryVariables>;
export const GetSponsorByProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSponsorByProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSponsorsByProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"boothNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"contactName"}},{"kind":"Field","name":{"kind":"Name","value":"contactTitle"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"featured"}},{"kind":"Field","name":{"kind":"Name","value":"hideFromParticipant"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"seqNo"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinUrl"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetSponsorByProjectQuery, GetSponsorByProjectQueryVariables>;
export const GetUtmByProjectIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUtmByProjectId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GroupLeadsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUtmByProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"term"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"getLeadsGroupedByField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgPrice"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"leads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUtmByProjectIdQuery, GetUtmByProjectIdQueryVariables>;
export const GetProjectByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProjectById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProjectById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<GetProjectByIdQuery, GetProjectByIdQueryVariables>;