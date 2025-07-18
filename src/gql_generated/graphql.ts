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
  items: Array<AgendaItem>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AgendaItem = {
  __typename?: 'AgendaItem';
  createdAt: Scalars['DateTime']['output'];
  dayId: Scalars['String']['output'];
  endTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  startTime: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateAgendaDayInput = {
  date: Scalars['String']['input'];
  id: Scalars['String']['input'];
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
  companyName: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  linkedin?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['String']['input'];
  website: Scalars['String']['input'];
};

export type CreateMediaPartnerInput = {
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
  website: Scalars['String']['input'];
};

export type CreateProjectInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['String']['input']>;
  venue?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
  year: Scalars['Float']['input'];
};

export type CreateSpeakerInput = {
  companyLogo: Scalars['String']['input'];
  companyName: Scalars['String']['input'];
  designation: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  image: Scalars['String']['input'];
  linkedinUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
};

export type CreateSupportingPartnerInput = {
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
  website: Scalars['String']['input'];
};

export type CreateUtmInput = {
  campaign: Scalars['String']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  medium: Scalars['String']['input'];
  projectSlug: Scalars['String']['input'];
  source: Scalars['String']['input'];
  term?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type Exhibitor = {
  __typename?: 'Exhibitor';
  companyName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  linkedin?: Maybe<Scalars['String']['output']>;
  logoUrl?: Maybe<Scalars['String']['output']>;
  projectId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  website: Scalars['String']['output'];
};

export type MediaPartner = {
  __typename?: 'MediaPartner';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  logoUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  website: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAgendaDay: AgendaDay;
  createAgendaItem: AgendaItem;
  createExhibitor: Exhibitor;
  createMediaPartner: MediaPartner;
  createProject: Project;
  createSpeaker: Speaker;
  createSupportingPartner: SupportingPartner;
  createUtm: Utm;
  deleteExhibitor: Exhibitor;
  deleteMediaPartner: MediaPartner;
  deleteProject: Project;
  deleteSpeaker: Speaker;
  deleteSupportingPartner: SupportingPartner;
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


export type MutationCreateMediaPartnerArgs = {
  input: CreateMediaPartnerInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateSpeakerArgs = {
  input: CreateSpeakerInput;
};


export type MutationCreateSupportingPartnerArgs = {
  input: CreateSupportingPartnerInput;
};


export type MutationCreateUtmArgs = {
  input: CreateUtmInput;
};


export type MutationDeleteExhibitorArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteMediaPartnerArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSpeakerArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSupportingPartnerArgs = {
  id: Scalars['String']['input'];
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['DateTime']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  venue?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
  year: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAgendaDay?: Maybe<AgendaDay>;
  getAllAgendaDays: Array<AgendaDay>;
  getAllProjects: Array<Project>;
  getExhibitors: Array<Exhibitor>;
  getExhibitorsByProject: Array<Exhibitor>;
  getMediaPartners: Array<MediaPartner>;
  getMediaPartnersByProject: Array<MediaPartner>;
  getParticipantLogos: Array<Scalars['String']['output']>;
  getProjectBySlug: Project;
  getSpeakers: Array<Speaker>;
  getSpeakersByProject: Array<Speaker>;
  getSupportingPartners: Array<SupportingPartner>;
  getSupportingPartnersByProject: Array<SupportingPartner>;
  getUtm: Array<Utm>;
  getUtmByProject: Array<Utm>;
};


export type QueryGetAgendaDayArgs = {
  date: Scalars['DateTime']['input'];
};


export type QueryGetExhibitorsByProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetMediaPartnersByProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetParticipantLogosArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetProjectBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryGetSpeakersByProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetSupportingPartnersByProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryGetUtmByProjectArgs = {
  slug: Scalars['String']['input'];
};

export type Speaker = {
  __typename?: 'Speaker';
  companyLogo: Scalars['String']['output'];
  companyName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  designation: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  linkedinUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  projectId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SupportingPartner = {
  __typename?: 'SupportingPartner';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logoUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  projectId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  website: Scalars['String']['output'];
};

export type Utm = {
  __typename?: 'UTM';
  campaign: Scalars['String']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  medium: Scalars['String']['output'];
  project: Project;
  projectId: Scalars['String']['output'];
  source: Scalars['String']['output'];
  term?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type CreateExhibitorMutationVariables = Exact<{
  input: CreateExhibitorInput;
}>;


export type CreateExhibitorMutation = { __typename?: 'Mutation', createExhibitor: { __typename?: 'Exhibitor', id: string, companyName: string } };

export type CreateMediaPartnerMutationVariables = Exact<{
  input: CreateMediaPartnerInput;
}>;


export type CreateMediaPartnerMutation = { __typename?: 'Mutation', createMediaPartner: { __typename?: 'MediaPartner', id: string, name: string } };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, slug: string, name: string, description?: string | null } };

export type CreateSpeakerMutationVariables = Exact<{
  input: CreateSpeakerInput;
}>;


export type CreateSpeakerMutation = { __typename?: 'Mutation', createSpeaker: { __typename?: 'Speaker', id: string, name: string } };

export type CreateUtmMutationVariables = Exact<{
  input: CreateUtmInput;
}>;


export type CreateUtmMutation = { __typename?: 'Mutation', createUtm: { __typename?: 'UTM', id: string, source: string, medium: string, campaign: string, term?: string | null, content?: string | null } };

export type DeleteExhibitorMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteExhibitorMutation = { __typename?: 'Mutation', deleteExhibitor: { __typename?: 'Exhibitor', id: string, companyName: string } };

export type DeleteMediaPartnerMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteMediaPartnerMutation = { __typename?: 'Mutation', deleteMediaPartner: { __typename?: 'MediaPartner', id: string, name: string } };

export type DeleteSpeakerMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteSpeakerMutation = { __typename?: 'Mutation', deleteSpeaker: { __typename?: 'Speaker', id: string, name: string } };

export type GetAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProjectsQuery = { __typename?: 'Query', getAllProjects: Array<{ __typename?: 'Project', id: string, name: string, slug: string, description?: string | null, startDate: any, endDate: any }> };

export type GetExhibitorsByProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetExhibitorsByProjectQuery = { __typename?: 'Query', getExhibitorsByProject: Array<{ __typename?: 'Exhibitor', companyName: string, createdAt: any, description: string, id: string, linkedin?: string | null, logoUrl?: string | null, projectId: string, updatedAt: any, website: string }> };

export type GetMediaPartnersByProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetMediaPartnersByProjectQuery = { __typename?: 'Query', getMediaPartnersByProject: Array<{ __typename?: 'MediaPartner', id: string, logoUrl?: string | null, name: string, description: string, createdAt: any, website: string }> };

export type GetSpeakersByProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type GetSpeakersByProjectQuery = { __typename?: 'Query', getSpeakersByProject: Array<{ __typename?: 'Speaker', companyLogo: string, companyName: string, createdAt: any, designation: string, id: string, image: string, linkedinUrl?: string | null, name: string, projectId: string }> };

export type GetUtmBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetUtmBySlugQuery = { __typename?: 'Query', getUtmByProject: Array<{ __typename?: 'UTM', id: string, source: string, medium: string, campaign: string, term?: string | null, content?: string | null, url: string }> };

export type GetProjectBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetProjectBySlugQuery = { __typename?: 'Query', getProjectBySlug: { __typename?: 'Project', id: string, name: string, description?: string | null } };


export const CreateExhibitorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExhibitor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExhibitorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExhibitor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}}]}}]}}]} as unknown as DocumentNode<CreateExhibitorMutation, CreateExhibitorMutationVariables>;
export const CreateMediaPartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMediaPartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMediaPartnerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMediaPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateMediaPartnerMutation, CreateMediaPartnerMutationVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateSpeakerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSpeaker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSpeakerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSpeaker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateSpeakerMutation, CreateSpeakerMutationVariables>;
export const CreateUtmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUtm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUTMInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUtm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"}},{"kind":"Field","name":{"kind":"Name","value":"term"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<CreateUtmMutation, CreateUtmMutationVariables>;
export const DeleteExhibitorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteExhibitor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteExhibitor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}}]}}]}}]} as unknown as DocumentNode<DeleteExhibitorMutation, DeleteExhibitorMutationVariables>;
export const DeleteMediaPartnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMediaPartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMediaPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeleteMediaPartnerMutation, DeleteMediaPartnerMutationVariables>;
export const DeleteSpeakerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSpeaker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSpeaker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeleteSpeakerMutation, DeleteSpeakerMutationVariables>;
export const GetAllProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<GetAllProjectsQuery, GetAllProjectsQueryVariables>;
export const GetExhibitorsByProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExhibitorsByProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getExhibitorsByProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"linkedin"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"website"}}]}}]}}]} as unknown as DocumentNode<GetExhibitorsByProjectQuery, GetExhibitorsByProjectQueryVariables>;
export const GetMediaPartnersByProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMediaPartnersByProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMediaPartnersByProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"website"}}]}}]}}]} as unknown as DocumentNode<GetMediaPartnersByProjectQuery, GetMediaPartnersByProjectQueryVariables>;
export const GetSpeakersByProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSpeakersByProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSpeakersByProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyLogo"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}}]}}]}}]} as unknown as DocumentNode<GetSpeakersByProjectQuery, GetSpeakersByProjectQueryVariables>;
export const GetUtmBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUtmBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUtmByProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"}},{"kind":"Field","name":{"kind":"Name","value":"term"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<GetUtmBySlugQuery, GetUtmBySlugQueryVariables>;
export const GetProjectBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjectBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProjectBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetProjectBySlugQuery, GetProjectBySlugQueryVariables>;