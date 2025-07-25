/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation CreateExhibitor($input: CreateExhibitorInput!) {\n  createExhibitor(input: $input) {\n    id\n    companyName\n  }\n}": typeof types.CreateExhibitorDocument,
    "mutation CreateMediaPartner($input: CreateMediaPartnerInput!) {\n  createMediaPartner(input: $input) {\n    id\n    name\n  }\n}": typeof types.CreateMediaPartnerDocument,
    "mutation CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    id\n    slug\n    name\n    description\n  }\n}": typeof types.CreateProjectDocument,
    "mutation CreateSpeaker($input: CreateSpeakerInput!) {\n  createSpeaker(input: $input) {\n    id\n    name\n  }\n}": typeof types.CreateSpeakerDocument,
    "mutation CreateSupportingPartner($input: CreateSupportingPartnerInput!) {\n  createSupportingPartner(input: $input) {\n    id\n    name\n  }\n}": typeof types.CreateSupportingPartnerDocument,
    "mutation CreateUtm($input: CreateUTMInput!) {\n  createUtm(input: $input) {\n    id\n    source\n    medium\n    campaign\n    term\n    content\n  }\n}": typeof types.CreateUtmDocument,
    "mutation DeleteExhibitor($id: String!) {\n  deleteExhibitor(id: $id) {\n    id\n    companyName\n  }\n}": typeof types.DeleteExhibitorDocument,
    "mutation DeleteMediaPartner($id: String!) {\n  deleteMediaPartner(id: $id) {\n    id\n    name\n  }\n}": typeof types.DeleteMediaPartnerDocument,
    "mutation DeleteSpeaker($id: String!) {\n  deleteSpeaker(id: $id) {\n    id\n    name\n  }\n}": typeof types.DeleteSpeakerDocument,
    "mutation DeleteSupportingPartner($id: String!) {\n  deleteSupportingPartner(id: $id) {\n    id\n    name\n  }\n}": typeof types.DeleteSupportingPartnerDocument,
    "query GetAllProjects {\n  getAllProjects {\n    id\n    name\n    slug\n    description\n    startDate\n    endDate\n  }\n}": typeof types.GetAllProjectsDocument,
    "query GetExhibitorsByProject($projectId: String!) {\n  getExhibitorsByProject(projectId: $projectId) {\n    companyName\n    createdAt\n    description\n    id\n    linkedin\n    logoUrl\n    projectId\n    updatedAt\n    website\n  }\n}": typeof types.GetExhibitorsByProjectDocument,
    "query GetMediaPartnersByProject($projectId: String!) {\n  getMediaPartnersByProject(projectId: $projectId) {\n    id\n    logoUrl\n    name\n    description\n    createdAt\n    logoUrl\n    website\n  }\n}": typeof types.GetMediaPartnersByProjectDocument,
    "query getSpeakersByProject($projectId: String!) {\n  getSpeakersByProject(projectId: $projectId) {\n    companyLogo\n    companyName\n    createdAt\n    designation\n    id\n    image\n    linkedinUrl\n    name\n    projectId\n  }\n}": typeof types.GetSpeakersByProjectDocument,
    "query GetSupportingPartnersByProject($projectId: String!) {\n  getSupportingPartnersByProject(projectId: $projectId) {\n    id\n    logoUrl\n    name\n    description\n    createdAt\n    logoUrl\n    website\n  }\n}": typeof types.GetSupportingPartnersByProjectDocument,
    "query GetUtmByProjectId($id: String!) {\n  getUtmByProject(id: $id) {\n    id\n    source\n    medium\n    campaign\n    term\n    content\n    url\n  }\n}": typeof types.GetUtmByProjectIdDocument,
    "query getProjectBySlug($id: String!) {\n  getProjectBySlug(id: $id) {\n    id\n    name\n    description\n    slug\n    startDate\n    currency\n    endDate\n    venue\n    website\n    year\n  }\n}": typeof types.GetProjectBySlugDocument,
};
const documents: Documents = {
    "mutation CreateExhibitor($input: CreateExhibitorInput!) {\n  createExhibitor(input: $input) {\n    id\n    companyName\n  }\n}": types.CreateExhibitorDocument,
    "mutation CreateMediaPartner($input: CreateMediaPartnerInput!) {\n  createMediaPartner(input: $input) {\n    id\n    name\n  }\n}": types.CreateMediaPartnerDocument,
    "mutation CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    id\n    slug\n    name\n    description\n  }\n}": types.CreateProjectDocument,
    "mutation CreateSpeaker($input: CreateSpeakerInput!) {\n  createSpeaker(input: $input) {\n    id\n    name\n  }\n}": types.CreateSpeakerDocument,
    "mutation CreateSupportingPartner($input: CreateSupportingPartnerInput!) {\n  createSupportingPartner(input: $input) {\n    id\n    name\n  }\n}": types.CreateSupportingPartnerDocument,
    "mutation CreateUtm($input: CreateUTMInput!) {\n  createUtm(input: $input) {\n    id\n    source\n    medium\n    campaign\n    term\n    content\n  }\n}": types.CreateUtmDocument,
    "mutation DeleteExhibitor($id: String!) {\n  deleteExhibitor(id: $id) {\n    id\n    companyName\n  }\n}": types.DeleteExhibitorDocument,
    "mutation DeleteMediaPartner($id: String!) {\n  deleteMediaPartner(id: $id) {\n    id\n    name\n  }\n}": types.DeleteMediaPartnerDocument,
    "mutation DeleteSpeaker($id: String!) {\n  deleteSpeaker(id: $id) {\n    id\n    name\n  }\n}": types.DeleteSpeakerDocument,
    "mutation DeleteSupportingPartner($id: String!) {\n  deleteSupportingPartner(id: $id) {\n    id\n    name\n  }\n}": types.DeleteSupportingPartnerDocument,
    "query GetAllProjects {\n  getAllProjects {\n    id\n    name\n    slug\n    description\n    startDate\n    endDate\n  }\n}": types.GetAllProjectsDocument,
    "query GetExhibitorsByProject($projectId: String!) {\n  getExhibitorsByProject(projectId: $projectId) {\n    companyName\n    createdAt\n    description\n    id\n    linkedin\n    logoUrl\n    projectId\n    updatedAt\n    website\n  }\n}": types.GetExhibitorsByProjectDocument,
    "query GetMediaPartnersByProject($projectId: String!) {\n  getMediaPartnersByProject(projectId: $projectId) {\n    id\n    logoUrl\n    name\n    description\n    createdAt\n    logoUrl\n    website\n  }\n}": types.GetMediaPartnersByProjectDocument,
    "query getSpeakersByProject($projectId: String!) {\n  getSpeakersByProject(projectId: $projectId) {\n    companyLogo\n    companyName\n    createdAt\n    designation\n    id\n    image\n    linkedinUrl\n    name\n    projectId\n  }\n}": types.GetSpeakersByProjectDocument,
    "query GetSupportingPartnersByProject($projectId: String!) {\n  getSupportingPartnersByProject(projectId: $projectId) {\n    id\n    logoUrl\n    name\n    description\n    createdAt\n    logoUrl\n    website\n  }\n}": types.GetSupportingPartnersByProjectDocument,
    "query GetUtmByProjectId($id: String!) {\n  getUtmByProject(id: $id) {\n    id\n    source\n    medium\n    campaign\n    term\n    content\n    url\n  }\n}": types.GetUtmByProjectIdDocument,
    "query getProjectBySlug($id: String!) {\n  getProjectBySlug(id: $id) {\n    id\n    name\n    description\n    slug\n    startDate\n    currency\n    endDate\n    venue\n    website\n    year\n  }\n}": types.GetProjectBySlugDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateExhibitor($input: CreateExhibitorInput!) {\n  createExhibitor(input: $input) {\n    id\n    companyName\n  }\n}"): (typeof documents)["mutation CreateExhibitor($input: CreateExhibitorInput!) {\n  createExhibitor(input: $input) {\n    id\n    companyName\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateMediaPartner($input: CreateMediaPartnerInput!) {\n  createMediaPartner(input: $input) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation CreateMediaPartner($input: CreateMediaPartnerInput!) {\n  createMediaPartner(input: $input) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    id\n    slug\n    name\n    description\n  }\n}"): (typeof documents)["mutation CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    id\n    slug\n    name\n    description\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateSpeaker($input: CreateSpeakerInput!) {\n  createSpeaker(input: $input) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation CreateSpeaker($input: CreateSpeakerInput!) {\n  createSpeaker(input: $input) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateSupportingPartner($input: CreateSupportingPartnerInput!) {\n  createSupportingPartner(input: $input) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation CreateSupportingPartner($input: CreateSupportingPartnerInput!) {\n  createSupportingPartner(input: $input) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateUtm($input: CreateUTMInput!) {\n  createUtm(input: $input) {\n    id\n    source\n    medium\n    campaign\n    term\n    content\n  }\n}"): (typeof documents)["mutation CreateUtm($input: CreateUTMInput!) {\n  createUtm(input: $input) {\n    id\n    source\n    medium\n    campaign\n    term\n    content\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteExhibitor($id: String!) {\n  deleteExhibitor(id: $id) {\n    id\n    companyName\n  }\n}"): (typeof documents)["mutation DeleteExhibitor($id: String!) {\n  deleteExhibitor(id: $id) {\n    id\n    companyName\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteMediaPartner($id: String!) {\n  deleteMediaPartner(id: $id) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation DeleteMediaPartner($id: String!) {\n  deleteMediaPartner(id: $id) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteSpeaker($id: String!) {\n  deleteSpeaker(id: $id) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation DeleteSpeaker($id: String!) {\n  deleteSpeaker(id: $id) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteSupportingPartner($id: String!) {\n  deleteSupportingPartner(id: $id) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation DeleteSupportingPartner($id: String!) {\n  deleteSupportingPartner(id: $id) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetAllProjects {\n  getAllProjects {\n    id\n    name\n    slug\n    description\n    startDate\n    endDate\n  }\n}"): (typeof documents)["query GetAllProjects {\n  getAllProjects {\n    id\n    name\n    slug\n    description\n    startDate\n    endDate\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetExhibitorsByProject($projectId: String!) {\n  getExhibitorsByProject(projectId: $projectId) {\n    companyName\n    createdAt\n    description\n    id\n    linkedin\n    logoUrl\n    projectId\n    updatedAt\n    website\n  }\n}"): (typeof documents)["query GetExhibitorsByProject($projectId: String!) {\n  getExhibitorsByProject(projectId: $projectId) {\n    companyName\n    createdAt\n    description\n    id\n    linkedin\n    logoUrl\n    projectId\n    updatedAt\n    website\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetMediaPartnersByProject($projectId: String!) {\n  getMediaPartnersByProject(projectId: $projectId) {\n    id\n    logoUrl\n    name\n    description\n    createdAt\n    logoUrl\n    website\n  }\n}"): (typeof documents)["query GetMediaPartnersByProject($projectId: String!) {\n  getMediaPartnersByProject(projectId: $projectId) {\n    id\n    logoUrl\n    name\n    description\n    createdAt\n    logoUrl\n    website\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getSpeakersByProject($projectId: String!) {\n  getSpeakersByProject(projectId: $projectId) {\n    companyLogo\n    companyName\n    createdAt\n    designation\n    id\n    image\n    linkedinUrl\n    name\n    projectId\n  }\n}"): (typeof documents)["query getSpeakersByProject($projectId: String!) {\n  getSpeakersByProject(projectId: $projectId) {\n    companyLogo\n    companyName\n    createdAt\n    designation\n    id\n    image\n    linkedinUrl\n    name\n    projectId\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetSupportingPartnersByProject($projectId: String!) {\n  getSupportingPartnersByProject(projectId: $projectId) {\n    id\n    logoUrl\n    name\n    description\n    createdAt\n    logoUrl\n    website\n  }\n}"): (typeof documents)["query GetSupportingPartnersByProject($projectId: String!) {\n  getSupportingPartnersByProject(projectId: $projectId) {\n    id\n    logoUrl\n    name\n    description\n    createdAt\n    logoUrl\n    website\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetUtmByProjectId($id: String!) {\n  getUtmByProject(id: $id) {\n    id\n    source\n    medium\n    campaign\n    term\n    content\n    url\n  }\n}"): (typeof documents)["query GetUtmByProjectId($id: String!) {\n  getUtmByProject(id: $id) {\n    id\n    source\n    medium\n    campaign\n    term\n    content\n    url\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getProjectBySlug($id: String!) {\n  getProjectBySlug(id: $id) {\n    id\n    name\n    description\n    slug\n    startDate\n    currency\n    endDate\n    venue\n    website\n    year\n  }\n}"): (typeof documents)["query getProjectBySlug($id: String!) {\n  getProjectBySlug(id: $id) {\n    id\n    name\n    description\n    slug\n    startDate\n    currency\n    endDate\n    venue\n    website\n    year\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;