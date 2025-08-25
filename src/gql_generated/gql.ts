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
    "mutation createExhibitor($input: CreateExhibitorInput!) {\n  createExhibitor(input: $input) {\n    id\n  }\n}": typeof types.CreateExhibitorDocument,
    "mutation CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    id\n    slug\n    name\n    description\n  }\n}": typeof types.CreateProjectDocument,
    "mutation CreateSpeaker($input: CreateSpeakerInput!) {\n  createSpeaker(input: $input) {\n    id\n    name\n  }\n}": typeof types.CreateSpeakerDocument,
    "mutation CreateSponsor($input: CreateSponsorInput!) {\n  createSponsor(input: $input) {\n    id\n    name\n  }\n}": typeof types.CreateSponsorDocument,
    "mutation CreatePartner($input: CreatePartnerInput!) {\n  createPartner(input: $input) {\n    name\n  }\n}": typeof types.CreatePartnerDocument,
    "mutation CreateUtm($input: CreateUtmInput!) {\n  createUtm(input: $input) {\n    url\n  }\n}": typeof types.CreateUtmDocument,
    "mutation DeleteExhibitor($id: String!) {\n  deleteExhibitor(id: $id) {\n    id\n    companyName\n  }\n}": typeof types.DeleteExhibitorDocument,
    "mutation DeletePartner($id: String!) {\n  deletePartner(id: $id) {\n    id\n    name\n  }\n}": typeof types.DeletePartnerDocument,
    "mutation DeleteSpeaker($id: String!) {\n  deleteSpeaker(id: $id) {\n    id\n    name\n  }\n}": typeof types.DeleteSpeakerDocument,
    "query GetAllProjects {\n  getAllProjects {\n    bannerUrl\n    createdAt\n    currency\n    description\n    endDate\n    id\n    location\n    logoUrl\n    name\n    slug\n    startDate\n    status\n    website\n    year\n  }\n}": typeof types.GetAllProjectsDocument,
    "query GetExhibitorsByProject($projectId: String!) {\n  getExhibitorsByProject(projectId: $projectId) {\n    address\n    boothNumber\n    badge\n    companyName\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    hideFromParticipant\n    id\n    linkedinUrl\n    logoUrl\n    projectId\n    seqNo\n    status\n    updatedAt\n    website\n  }\n}": typeof types.GetExhibitorsByProjectDocument,
    "query GetLeadsByProjectId($projectId: String!) {\n  getLeadsByProjectId(projectId: $projectId) {\n    id\n    awardCategory\n    companyName\n    createdAt\n    email\n    industry\n    jobTitle\n    leadType\n    message\n    name\n    phone\n    price\n    projectId\n    quantity\n    status\n    utmId\n  }\n}": typeof types.GetLeadsByProjectIdDocument,
    "query GetLeadsGroupedByField($input: GroupLeadsInput!) {\n  getLeadsGroupedByField(input: $input) {\n    field\n    groups {\n      avgPrice\n      count\n      group\n      totalPrice\n    }\n  }\n}": typeof types.GetLeadsGroupedByFieldDocument,
    "query GetPartnersByProject($input: GetPartnersByProjectInput!) {\n  getPartnersByProject(input: $input) {\n    address\n    boothNumber\n    badge\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    facebookUrl\n    featured\n    hideFromParticipant\n    id\n    instagramUrl\n    linkedinUrl\n    logoUrl\n    name\n    partnerType\n    phone\n    projectId\n    seqNo\n    status\n    website\n    xUrl\n    youtubeUrl\n  }\n}": typeof types.GetPartnersByProjectDocument,
    "query GetProjectAnalyticsById($input: ProjectAnalyticsInput!) {\n  getProjectAnalyticsById(input: $input) {\n    exhibitors\n    id\n    leads\n    speakers\n    sponsors\n    utms\n    monthlyData {\n      exhibitors\n      leads\n      partners\n      speakers\n      sponsors\n      utms\n    }\n  }\n}": typeof types.GetProjectAnalyticsByIdDocument,
    "query getSpeakersByProject($projectId: String!) {\n  getSpeakersByProject(projectId: $projectId) {\n    companyLogo\n    companyName\n    createdAt\n    designation\n    facebookUrl\n    hideFromParticipant\n    id\n    image\n    instagramUrl\n    linkedinUrl\n    name\n    projectId\n    seqNo\n    status\n    updatedAt\n    website\n    xUrl\n    youtubeUrl\n    description\n  }\n}": typeof types.GetSpeakersByProjectDocument,
    "query GetSponsorByProject($projectId: String!) {\n  getSponsorsByProject(projectId: $projectId) {\n    address\n    boothNumber\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    featured\n    hideFromParticipant\n    id\n    logoUrl\n    name\n    projectId\n    seqNo\n    website\n    linkedinUrl\n    status\n    type\n  }\n}": typeof types.GetSponsorByProjectDocument,
    "query GetUtmByProjectId($id: String!, $input: GroupLeadsInput!) {\n  getUtmByProject(id: $id) {\n    campaign\n    content\n    createdAt\n    id\n    medium\n    projectId\n    source\n    term\n    url\n  }\n  getLeadsGroupedByField(input: $input) {\n    field\n    groups {\n      avgPrice\n      count\n      group\n      totalPrice\n    }\n  }\n}": typeof types.GetUtmByProjectIdDocument,
    "query getProjectById($id: String!) {\n  getProjectById(id: $id) {\n    createdAt\n    currency\n    description\n    endDate\n    id\n    location\n    logoUrl\n    bannerUrl\n    name\n    slug\n    startDate\n    status\n    website\n    year\n  }\n}": typeof types.GetProjectByIdDocument,
};
const documents: Documents = {
    "mutation createExhibitor($input: CreateExhibitorInput!) {\n  createExhibitor(input: $input) {\n    id\n  }\n}": types.CreateExhibitorDocument,
    "mutation CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    id\n    slug\n    name\n    description\n  }\n}": types.CreateProjectDocument,
    "mutation CreateSpeaker($input: CreateSpeakerInput!) {\n  createSpeaker(input: $input) {\n    id\n    name\n  }\n}": types.CreateSpeakerDocument,
    "mutation CreateSponsor($input: CreateSponsorInput!) {\n  createSponsor(input: $input) {\n    id\n    name\n  }\n}": types.CreateSponsorDocument,
    "mutation CreatePartner($input: CreatePartnerInput!) {\n  createPartner(input: $input) {\n    name\n  }\n}": types.CreatePartnerDocument,
    "mutation CreateUtm($input: CreateUtmInput!) {\n  createUtm(input: $input) {\n    url\n  }\n}": types.CreateUtmDocument,
    "mutation DeleteExhibitor($id: String!) {\n  deleteExhibitor(id: $id) {\n    id\n    companyName\n  }\n}": types.DeleteExhibitorDocument,
    "mutation DeletePartner($id: String!) {\n  deletePartner(id: $id) {\n    id\n    name\n  }\n}": types.DeletePartnerDocument,
    "mutation DeleteSpeaker($id: String!) {\n  deleteSpeaker(id: $id) {\n    id\n    name\n  }\n}": types.DeleteSpeakerDocument,
    "query GetAllProjects {\n  getAllProjects {\n    bannerUrl\n    createdAt\n    currency\n    description\n    endDate\n    id\n    location\n    logoUrl\n    name\n    slug\n    startDate\n    status\n    website\n    year\n  }\n}": types.GetAllProjectsDocument,
    "query GetExhibitorsByProject($projectId: String!) {\n  getExhibitorsByProject(projectId: $projectId) {\n    address\n    boothNumber\n    badge\n    companyName\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    hideFromParticipant\n    id\n    linkedinUrl\n    logoUrl\n    projectId\n    seqNo\n    status\n    updatedAt\n    website\n  }\n}": types.GetExhibitorsByProjectDocument,
    "query GetLeadsByProjectId($projectId: String!) {\n  getLeadsByProjectId(projectId: $projectId) {\n    id\n    awardCategory\n    companyName\n    createdAt\n    email\n    industry\n    jobTitle\n    leadType\n    message\n    name\n    phone\n    price\n    projectId\n    quantity\n    status\n    utmId\n  }\n}": types.GetLeadsByProjectIdDocument,
    "query GetLeadsGroupedByField($input: GroupLeadsInput!) {\n  getLeadsGroupedByField(input: $input) {\n    field\n    groups {\n      avgPrice\n      count\n      group\n      totalPrice\n    }\n  }\n}": types.GetLeadsGroupedByFieldDocument,
    "query GetPartnersByProject($input: GetPartnersByProjectInput!) {\n  getPartnersByProject(input: $input) {\n    address\n    boothNumber\n    badge\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    facebookUrl\n    featured\n    hideFromParticipant\n    id\n    instagramUrl\n    linkedinUrl\n    logoUrl\n    name\n    partnerType\n    phone\n    projectId\n    seqNo\n    status\n    website\n    xUrl\n    youtubeUrl\n  }\n}": types.GetPartnersByProjectDocument,
    "query GetProjectAnalyticsById($input: ProjectAnalyticsInput!) {\n  getProjectAnalyticsById(input: $input) {\n    exhibitors\n    id\n    leads\n    speakers\n    sponsors\n    utms\n    monthlyData {\n      exhibitors\n      leads\n      partners\n      speakers\n      sponsors\n      utms\n    }\n  }\n}": types.GetProjectAnalyticsByIdDocument,
    "query getSpeakersByProject($projectId: String!) {\n  getSpeakersByProject(projectId: $projectId) {\n    companyLogo\n    companyName\n    createdAt\n    designation\n    facebookUrl\n    hideFromParticipant\n    id\n    image\n    instagramUrl\n    linkedinUrl\n    name\n    projectId\n    seqNo\n    status\n    updatedAt\n    website\n    xUrl\n    youtubeUrl\n    description\n  }\n}": types.GetSpeakersByProjectDocument,
    "query GetSponsorByProject($projectId: String!) {\n  getSponsorsByProject(projectId: $projectId) {\n    address\n    boothNumber\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    featured\n    hideFromParticipant\n    id\n    logoUrl\n    name\n    projectId\n    seqNo\n    website\n    linkedinUrl\n    status\n    type\n  }\n}": types.GetSponsorByProjectDocument,
    "query GetUtmByProjectId($id: String!, $input: GroupLeadsInput!) {\n  getUtmByProject(id: $id) {\n    campaign\n    content\n    createdAt\n    id\n    medium\n    projectId\n    source\n    term\n    url\n  }\n  getLeadsGroupedByField(input: $input) {\n    field\n    groups {\n      avgPrice\n      count\n      group\n      totalPrice\n    }\n  }\n}": types.GetUtmByProjectIdDocument,
    "query getProjectById($id: String!) {\n  getProjectById(id: $id) {\n    createdAt\n    currency\n    description\n    endDate\n    id\n    location\n    logoUrl\n    bannerUrl\n    name\n    slug\n    startDate\n    status\n    website\n    year\n  }\n}": types.GetProjectByIdDocument,
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
export function gql(source: "mutation createExhibitor($input: CreateExhibitorInput!) {\n  createExhibitor(input: $input) {\n    id\n  }\n}"): (typeof documents)["mutation createExhibitor($input: CreateExhibitorInput!) {\n  createExhibitor(input: $input) {\n    id\n  }\n}"];
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
export function gql(source: "mutation CreateSponsor($input: CreateSponsorInput!) {\n  createSponsor(input: $input) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation CreateSponsor($input: CreateSponsorInput!) {\n  createSponsor(input: $input) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreatePartner($input: CreatePartnerInput!) {\n  createPartner(input: $input) {\n    name\n  }\n}"): (typeof documents)["mutation CreatePartner($input: CreatePartnerInput!) {\n  createPartner(input: $input) {\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateUtm($input: CreateUtmInput!) {\n  createUtm(input: $input) {\n    url\n  }\n}"): (typeof documents)["mutation CreateUtm($input: CreateUtmInput!) {\n  createUtm(input: $input) {\n    url\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteExhibitor($id: String!) {\n  deleteExhibitor(id: $id) {\n    id\n    companyName\n  }\n}"): (typeof documents)["mutation DeleteExhibitor($id: String!) {\n  deleteExhibitor(id: $id) {\n    id\n    companyName\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeletePartner($id: String!) {\n  deletePartner(id: $id) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation DeletePartner($id: String!) {\n  deletePartner(id: $id) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteSpeaker($id: String!) {\n  deleteSpeaker(id: $id) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation DeleteSpeaker($id: String!) {\n  deleteSpeaker(id: $id) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetAllProjects {\n  getAllProjects {\n    bannerUrl\n    createdAt\n    currency\n    description\n    endDate\n    id\n    location\n    logoUrl\n    name\n    slug\n    startDate\n    status\n    website\n    year\n  }\n}"): (typeof documents)["query GetAllProjects {\n  getAllProjects {\n    bannerUrl\n    createdAt\n    currency\n    description\n    endDate\n    id\n    location\n    logoUrl\n    name\n    slug\n    startDate\n    status\n    website\n    year\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetExhibitorsByProject($projectId: String!) {\n  getExhibitorsByProject(projectId: $projectId) {\n    address\n    boothNumber\n    badge\n    companyName\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    hideFromParticipant\n    id\n    linkedinUrl\n    logoUrl\n    projectId\n    seqNo\n    status\n    updatedAt\n    website\n  }\n}"): (typeof documents)["query GetExhibitorsByProject($projectId: String!) {\n  getExhibitorsByProject(projectId: $projectId) {\n    address\n    boothNumber\n    badge\n    companyName\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    hideFromParticipant\n    id\n    linkedinUrl\n    logoUrl\n    projectId\n    seqNo\n    status\n    updatedAt\n    website\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetLeadsByProjectId($projectId: String!) {\n  getLeadsByProjectId(projectId: $projectId) {\n    id\n    awardCategory\n    companyName\n    createdAt\n    email\n    industry\n    jobTitle\n    leadType\n    message\n    name\n    phone\n    price\n    projectId\n    quantity\n    status\n    utmId\n  }\n}"): (typeof documents)["query GetLeadsByProjectId($projectId: String!) {\n  getLeadsByProjectId(projectId: $projectId) {\n    id\n    awardCategory\n    companyName\n    createdAt\n    email\n    industry\n    jobTitle\n    leadType\n    message\n    name\n    phone\n    price\n    projectId\n    quantity\n    status\n    utmId\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetLeadsGroupedByField($input: GroupLeadsInput!) {\n  getLeadsGroupedByField(input: $input) {\n    field\n    groups {\n      avgPrice\n      count\n      group\n      totalPrice\n    }\n  }\n}"): (typeof documents)["query GetLeadsGroupedByField($input: GroupLeadsInput!) {\n  getLeadsGroupedByField(input: $input) {\n    field\n    groups {\n      avgPrice\n      count\n      group\n      totalPrice\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetPartnersByProject($input: GetPartnersByProjectInput!) {\n  getPartnersByProject(input: $input) {\n    address\n    boothNumber\n    badge\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    facebookUrl\n    featured\n    hideFromParticipant\n    id\n    instagramUrl\n    linkedinUrl\n    logoUrl\n    name\n    partnerType\n    phone\n    projectId\n    seqNo\n    status\n    website\n    xUrl\n    youtubeUrl\n  }\n}"): (typeof documents)["query GetPartnersByProject($input: GetPartnersByProjectInput!) {\n  getPartnersByProject(input: $input) {\n    address\n    boothNumber\n    badge\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    facebookUrl\n    featured\n    hideFromParticipant\n    id\n    instagramUrl\n    linkedinUrl\n    logoUrl\n    name\n    partnerType\n    phone\n    projectId\n    seqNo\n    status\n    website\n    xUrl\n    youtubeUrl\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProjectAnalyticsById($input: ProjectAnalyticsInput!) {\n  getProjectAnalyticsById(input: $input) {\n    exhibitors\n    id\n    leads\n    speakers\n    sponsors\n    utms\n    monthlyData {\n      exhibitors\n      leads\n      partners\n      speakers\n      sponsors\n      utms\n    }\n  }\n}"): (typeof documents)["query GetProjectAnalyticsById($input: ProjectAnalyticsInput!) {\n  getProjectAnalyticsById(input: $input) {\n    exhibitors\n    id\n    leads\n    speakers\n    sponsors\n    utms\n    monthlyData {\n      exhibitors\n      leads\n      partners\n      speakers\n      sponsors\n      utms\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getSpeakersByProject($projectId: String!) {\n  getSpeakersByProject(projectId: $projectId) {\n    companyLogo\n    companyName\n    createdAt\n    designation\n    facebookUrl\n    hideFromParticipant\n    id\n    image\n    instagramUrl\n    linkedinUrl\n    name\n    projectId\n    seqNo\n    status\n    updatedAt\n    website\n    xUrl\n    youtubeUrl\n    description\n  }\n}"): (typeof documents)["query getSpeakersByProject($projectId: String!) {\n  getSpeakersByProject(projectId: $projectId) {\n    companyLogo\n    companyName\n    createdAt\n    designation\n    facebookUrl\n    hideFromParticipant\n    id\n    image\n    instagramUrl\n    linkedinUrl\n    name\n    projectId\n    seqNo\n    status\n    updatedAt\n    website\n    xUrl\n    youtubeUrl\n    description\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetSponsorByProject($projectId: String!) {\n  getSponsorsByProject(projectId: $projectId) {\n    address\n    boothNumber\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    featured\n    hideFromParticipant\n    id\n    logoUrl\n    name\n    projectId\n    seqNo\n    website\n    linkedinUrl\n    status\n    type\n  }\n}"): (typeof documents)["query GetSponsorByProject($projectId: String!) {\n  getSponsorsByProject(projectId: $projectId) {\n    address\n    boothNumber\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    featured\n    hideFromParticipant\n    id\n    logoUrl\n    name\n    projectId\n    seqNo\n    website\n    linkedinUrl\n    status\n    type\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetUtmByProjectId($id: String!, $input: GroupLeadsInput!) {\n  getUtmByProject(id: $id) {\n    campaign\n    content\n    createdAt\n    id\n    medium\n    projectId\n    source\n    term\n    url\n  }\n  getLeadsGroupedByField(input: $input) {\n    field\n    groups {\n      avgPrice\n      count\n      group\n      totalPrice\n    }\n  }\n}"): (typeof documents)["query GetUtmByProjectId($id: String!, $input: GroupLeadsInput!) {\n  getUtmByProject(id: $id) {\n    campaign\n    content\n    createdAt\n    id\n    medium\n    projectId\n    source\n    term\n    url\n  }\n  getLeadsGroupedByField(input: $input) {\n    field\n    groups {\n      avgPrice\n      count\n      group\n      totalPrice\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getProjectById($id: String!) {\n  getProjectById(id: $id) {\n    createdAt\n    currency\n    description\n    endDate\n    id\n    location\n    logoUrl\n    bannerUrl\n    name\n    slug\n    startDate\n    status\n    website\n    year\n  }\n}"): (typeof documents)["query getProjectById($id: String!) {\n  getProjectById(id: $id) {\n    createdAt\n    currency\n    description\n    endDate\n    id\n    location\n    logoUrl\n    bannerUrl\n    name\n    slug\n    startDate\n    status\n    website\n    year\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;