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
    "mutation AddExistingSalesPersonToProject($input: AddExistingSalesPersonInput!) {\n  addExistingSalesPersonToProject(input: $input) {\n    id\n    name\n    email\n    phone\n    isActive\n    projectId\n    cities {\n      id\n      city\n      state\n    }\n  }\n}": typeof types.AddExistingSalesPersonToProjectDocument,
    "mutation AssignLead($input: AssignLeadInput!) {\n  assignLead(input: $input) {\n    id\n    assignedToId\n    assignedTo {\n      id\n      name\n      email\n      phone\n    }\n    updatedAt\n  }\n}": typeof types.AssignLeadDocument,
    "mutation BulkCreateLeads($projectId: String!, $leads: [BulkLeadInput!]!) {\n  bulkCreateLeads(projectId: $projectId, leads: $leads) {\n    created\n    failed\n    errors\n  }\n}": typeof types.BulkCreateLeadsDocument,
    "mutation createExhibitor($input: CreateExhibitorInput!) {\n  createExhibitor(input: $input) {\n    id\n  }\n}": typeof types.CreateExhibitorDocument,
    "mutation CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    id\n    slug\n    name\n    description\n  }\n}": typeof types.CreateProjectDocument,
    "mutation CreateSalesPerson($input: CreateSalesPersonInput!) {\n  createSalesPerson(input: $input) {\n    id\n    name\n    email\n    phone\n    isActive\n    cities {\n      id\n      city\n      state\n    }\n  }\n}": typeof types.CreateSalesPersonDocument,
    "mutation CreateSpeaker($input: CreateSpeakerInput!) {\n  createSpeaker(input: $input) {\n    id\n    name\n  }\n}": typeof types.CreateSpeakerDocument,
    "mutation CreateSponsor($input: CreateSponsorInput!) {\n  createSponsor(input: $input) {\n    id\n    name\n  }\n}": typeof types.CreateSponsorDocument,
    "mutation CreatePartner($input: CreatePartnerInput!) {\n  createPartner(input: $input) {\n    name\n  }\n}": typeof types.CreatePartnerDocument,
    "mutation CreateUtm($input: CreateUtmInput!) {\n  createUtm(input: $input) {\n    url\n  }\n}": typeof types.CreateUtmDocument,
    "mutation DeleteExhibitor($id: String!) {\n  deleteExhibitor(id: $id) {\n    id\n    companyName\n  }\n}": typeof types.DeleteExhibitorDocument,
    "mutation DeletePartner($id: String!) {\n  deletePartner(id: $id) {\n    id\n    name\n  }\n}": typeof types.DeletePartnerDocument,
    "mutation DeleteSalesPerson($id: String!) {\n  deleteSalesPerson(id: $id) {\n    id\n  }\n}": typeof types.DeleteSalesPersonDocument,
    "mutation DeleteSpeaker($id: String!) {\n  deleteSpeaker(id: $id) {\n    id\n    name\n  }\n}": typeof types.DeleteSpeakerDocument,
    "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    token\n    role\n    name\n    email\n    salesPersonId\n    projectId\n    projectName\n    requiresProjectSelection\n    projectOptions {\n      projectId\n      projectName\n      salesPersonId\n    }\n  }\n}": typeof types.LoginDocument,
    "mutation UpdateExhibitorOrder($inputs: [UpdateExhibitorSeqInput!]!) {\n  updateExhibitorOrder(inputs: $inputs) {\n    id\n    companyName\n    seqNo\n  }\n}": typeof types.UpdateExhibitorOrderDocument,
    "mutation UpdateLeadContact($input: UpdateLeadContactInput!) {\n  updateLeadContact(input: $input) {\n    id\n    contactPersonName\n    contactPersonPhone\n    contactPersonDesignation\n    contactPersonEmail\n    updatedAt\n  }\n}": typeof types.UpdateLeadContactDocument,
    "mutation UpdateLeadStatus($input: UpdateLeadStatusInput!) {\n  updateLeadStatus(input: $input) {\n    id\n    status\n    leadType\n    notes\n    callbackDate\n    followUpDate\n    updatedAt\n  }\n}": typeof types.UpdateLeadStatusDocument,
    "mutation UpdateSponsorOrder($inputs: [UpdateSponsorSeqInput!]!) {\n  updateSponsorOrder(inputs: $inputs) {\n    id\n    seqNo\n  }\n}": typeof types.UpdateSponsorOrderDocument,
    "query GetAllProjects {\n  getAllProjects {\n    bannerUrl\n    createdAt\n    currency\n    description\n    endDate\n    id\n    location\n    logoUrl\n    name\n    slug\n    startDate\n    status\n    website\n    year\n  }\n}": typeof types.GetAllProjectsDocument,
    "query GetExhibitorsByProject($projectId: String!) {\n  getExhibitorsByProject(projectId: $projectId) {\n    address\n    boothNumber\n    badge\n    companyName\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    hideFromParticipant\n    id\n    linkedinUrl\n    logoUrl\n    projectId\n    seqNo\n    status\n    updatedAt\n    website\n  }\n}": typeof types.GetExhibitorsByProjectDocument,
    "query GetFilteredLeads($input: LeadFilterInput!) {\n  getFilteredLeads(input: $input) {\n    total\n    page\n    limit\n    totalPages\n    leads {\n      id\n      name\n      email\n      phone\n      companyName\n      jobTitle\n      city\n      state\n      country\n      status\n      source\n      leadType\n      industry\n      message\n      notes\n      assignedToId\n      callbackDate\n      followUpDate\n      createdAt\n      updatedAt\n      assignedTo {\n        id\n        name\n        email\n        phone\n      }\n      utm {\n        id\n        source\n        medium\n        campaign\n      }\n    }\n  }\n}": typeof types.GetFilteredLeadsDocument,
    "query GetLeadActivities($leadId: String!) {\n  getLeadActivities(leadId: $leadId) {\n    id\n    leadId\n    status\n    previousStatus\n    notes\n    changedById\n    changedByName\n    createdAt\n  }\n}": typeof types.GetLeadActivitiesDocument,
    "query GetLeadById($id: String!) {\n  getLeadById(id: $id) {\n    id\n    projectId\n    assignedToId\n    name\n    email\n    phone\n    companyName\n    jobTitle\n    contactPersonName\n    contactPersonPhone\n    contactPersonDesignation\n    contactPersonEmail\n    city\n    state\n    country\n    industry\n    status\n    source\n    leadType\n    message\n    notes\n    quantity\n    price\n    assignedToId\n    callbackDate\n    followUpDate\n    createdAt\n    updatedAt\n    assignedTo {\n      id\n      name\n      email\n      phone\n      cities {\n        city\n        state\n      }\n    }\n    utm {\n      id\n      source\n      medium\n      campaign\n      term\n      content\n      url\n    }\n  }\n}": typeof types.GetLeadByIdDocument,
    "query GetLeadCities($projectId: String!, $state: String) {\n  getLeadCities(projectId: $projectId, state: $state)\n}": typeof types.GetLeadCitiesDocument,
    "query GetLeadStates($projectId: String!) {\n  getLeadStates(projectId: $projectId)\n}": typeof types.GetLeadStatesDocument,
    "query GetLeadsByProjectId($projectId: String!) {\n  getLeadsByProjectId(projectId: $projectId) {\n    id\n    awardCategory\n    companyName\n    createdAt\n    email\n    industry\n    jobTitle\n    leadType\n    message\n    name\n    phone\n    price\n    projectId\n    quantity\n    status\n    source\n    city\n    state\n    country\n    notes\n    assignedToId\n    utmId\n    assignedTo {\n      id\n      name\n      email\n    }\n    utm {\n      source\n      medium\n      campaign\n    }\n  }\n}": typeof types.GetLeadsByProjectIdDocument,
    "query GetLeadsGroupedByField($input: GroupLeadsInput!) {\n  getLeadsGroupedByField(input: $input) {\n    field\n    groups {\n      avgPrice\n      count\n      group\n      totalPrice\n    }\n  }\n}": typeof types.GetLeadsGroupedByFieldDocument,
    "query GetPartnersByProject($input: GetPartnersByProjectInput!) {\n  getPartnersByProject(input: $input) {\n    address\n    boothNumber\n    badge\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    facebookUrl\n    featured\n    hideFromParticipant\n    id\n    instagramUrl\n    linkedinUrl\n    logoUrl\n    name\n    partnerType\n    phone\n    projectId\n    seqNo\n    status\n    website\n    xUrl\n    youtubeUrl\n  }\n}": typeof types.GetPartnersByProjectDocument,
    "query GetProjectAnalyticsById($input: ProjectAnalyticsInput!) {\n  getProjectAnalyticsById(input: $input) {\n    exhibitors\n    id\n    leads\n    speakers\n    sponsors\n    utms\n    monthlyData {\n      exhibitors\n      leads\n      partners\n      speakers\n      sponsors\n      utms\n    }\n  }\n}": typeof types.GetProjectAnalyticsByIdDocument,
    "query GetSalesAssignedLeads($input: SalesAssignedLeadsInput!) {\n  getSalesAssignedLeads(input: $input) {\n    total\n    page\n    limit\n    totalPages\n    leads {\n      id\n      name\n      email\n      phone\n      companyName\n      jobTitle\n      city\n      state\n      country\n      status\n      source\n      leadType\n      industry\n      message\n      notes\n      assignedToId\n      projectId\n      callbackDate\n      followUpDate\n      createdAt\n      updatedAt\n      assignedTo {\n        id\n        name\n        email\n        phone\n      }\n    }\n  }\n}": typeof types.GetSalesAssignedLeadsDocument,
    "query GetSalesPeople {\n  getSalesPeople {\n    id\n    name\n    email\n    phone\n    isActive\n    projectId\n    cities {\n      id\n      city\n      state\n    }\n  }\n}": typeof types.GetSalesPeopleDocument,
    "query GetSalesPeopleByProject($projectId: String!) {\n  getSalesPeopleByProject(projectId: $projectId) {\n    id\n    name\n    email\n    phone\n    isActive\n    projectId\n    cities {\n      id\n      city\n      state\n    }\n    createdAt\n  }\n}": typeof types.GetSalesPeopleByProjectDocument,
    "query GetSalesPersonById($id: String!) {\n  getSalesPersonById(id: $id) {\n    id\n    name\n    email\n    projectId\n    project {\n      id\n      name\n    }\n  }\n}": typeof types.GetSalesPersonByIdDocument,
    "query GetSalesPersonPerformance($salesPersonId: String!) {\n  getSalesPersonPerformance(salesPersonId: $salesPersonId) {\n    salesPersonId\n    name\n    email\n    totalLeads\n    newLeads\n    inProgress\n    interested\n    converted\n    notInterested\n    conversionRate\n    statusBreakdown {\n      status\n      count\n    }\n  }\n}": typeof types.GetSalesPersonPerformanceDocument,
    "query GetSalesProjectMemberships($salesPersonId: String!) {\n  getSalesProjectMemberships(salesPersonId: $salesPersonId) {\n    id\n    name\n    email\n    projectId\n    project {\n      id\n      name\n    }\n  }\n}": typeof types.GetSalesProjectMembershipsDocument,
    "query GetSalesTeamPerformance($projectId: String!) {\n  getSalesTeamPerformance(projectId: $projectId) {\n    salesPersonId\n    name\n    email\n    totalLeads\n    newLeads\n    inProgress\n    interested\n    converted\n    notInterested\n    conversionRate\n    statusBreakdown {\n      status\n      count\n    }\n  }\n}": typeof types.GetSalesTeamPerformanceDocument,
    "query getSpeakersByProject($projectId: String!) {\n  getSpeakersByProject(projectId: $projectId) {\n    companyLogo\n    companyName\n    createdAt\n    designation\n    facebookUrl\n    hideFromParticipant\n    id\n    image\n    instagramUrl\n    linkedinUrl\n    name\n    projectId\n    seqNo\n    status\n    updatedAt\n    website\n    xUrl\n    youtubeUrl\n    description\n  }\n}": typeof types.GetSpeakersByProjectDocument,
    "query GetSponsorByProject($projectId: String!) {\n  getSponsorsByProject(projectId: $projectId) {\n    address\n    boothNumber\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    featured\n    hideFromParticipant\n    id\n    logoUrl\n    name\n    projectId\n    seqNo\n    website\n    linkedinUrl\n    status\n    type\n  }\n}": typeof types.GetSponsorByProjectDocument,
    "query GetUtmByProjectId($id: String!, $input: GroupLeadsInput!) {\n  getUtmByProject(id: $id) {\n    campaign\n    content\n    createdAt\n    id\n    medium\n    projectId\n    source\n    term\n    url\n  }\n  getLeadsGroupedByField(input: $input) {\n    field\n    groups {\n      avgPrice\n      count\n      group\n      totalPrice\n      leads {\n        email\n      }\n    }\n  }\n}": typeof types.GetUtmByProjectIdDocument,
    "query getProjectById($id: String!) {\n  getProjectById(id: $id) {\n    createdAt\n    currency\n    description\n    endDate\n    id\n    location\n    logoUrl\n    bannerUrl\n    name\n    slug\n    startDate\n    status\n    website\n    year\n  }\n}": typeof types.GetProjectByIdDocument,
};
const documents: Documents = {
    "mutation AddExistingSalesPersonToProject($input: AddExistingSalesPersonInput!) {\n  addExistingSalesPersonToProject(input: $input) {\n    id\n    name\n    email\n    phone\n    isActive\n    projectId\n    cities {\n      id\n      city\n      state\n    }\n  }\n}": types.AddExistingSalesPersonToProjectDocument,
    "mutation AssignLead($input: AssignLeadInput!) {\n  assignLead(input: $input) {\n    id\n    assignedToId\n    assignedTo {\n      id\n      name\n      email\n      phone\n    }\n    updatedAt\n  }\n}": types.AssignLeadDocument,
    "mutation BulkCreateLeads($projectId: String!, $leads: [BulkLeadInput!]!) {\n  bulkCreateLeads(projectId: $projectId, leads: $leads) {\n    created\n    failed\n    errors\n  }\n}": types.BulkCreateLeadsDocument,
    "mutation createExhibitor($input: CreateExhibitorInput!) {\n  createExhibitor(input: $input) {\n    id\n  }\n}": types.CreateExhibitorDocument,
    "mutation CreateProject($input: CreateProjectInput!) {\n  createProject(input: $input) {\n    id\n    slug\n    name\n    description\n  }\n}": types.CreateProjectDocument,
    "mutation CreateSalesPerson($input: CreateSalesPersonInput!) {\n  createSalesPerson(input: $input) {\n    id\n    name\n    email\n    phone\n    isActive\n    cities {\n      id\n      city\n      state\n    }\n  }\n}": types.CreateSalesPersonDocument,
    "mutation CreateSpeaker($input: CreateSpeakerInput!) {\n  createSpeaker(input: $input) {\n    id\n    name\n  }\n}": types.CreateSpeakerDocument,
    "mutation CreateSponsor($input: CreateSponsorInput!) {\n  createSponsor(input: $input) {\n    id\n    name\n  }\n}": types.CreateSponsorDocument,
    "mutation CreatePartner($input: CreatePartnerInput!) {\n  createPartner(input: $input) {\n    name\n  }\n}": types.CreatePartnerDocument,
    "mutation CreateUtm($input: CreateUtmInput!) {\n  createUtm(input: $input) {\n    url\n  }\n}": types.CreateUtmDocument,
    "mutation DeleteExhibitor($id: String!) {\n  deleteExhibitor(id: $id) {\n    id\n    companyName\n  }\n}": types.DeleteExhibitorDocument,
    "mutation DeletePartner($id: String!) {\n  deletePartner(id: $id) {\n    id\n    name\n  }\n}": types.DeletePartnerDocument,
    "mutation DeleteSalesPerson($id: String!) {\n  deleteSalesPerson(id: $id) {\n    id\n  }\n}": types.DeleteSalesPersonDocument,
    "mutation DeleteSpeaker($id: String!) {\n  deleteSpeaker(id: $id) {\n    id\n    name\n  }\n}": types.DeleteSpeakerDocument,
    "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    token\n    role\n    name\n    email\n    salesPersonId\n    projectId\n    projectName\n    requiresProjectSelection\n    projectOptions {\n      projectId\n      projectName\n      salesPersonId\n    }\n  }\n}": types.LoginDocument,
    "mutation UpdateExhibitorOrder($inputs: [UpdateExhibitorSeqInput!]!) {\n  updateExhibitorOrder(inputs: $inputs) {\n    id\n    companyName\n    seqNo\n  }\n}": types.UpdateExhibitorOrderDocument,
    "mutation UpdateLeadContact($input: UpdateLeadContactInput!) {\n  updateLeadContact(input: $input) {\n    id\n    contactPersonName\n    contactPersonPhone\n    contactPersonDesignation\n    contactPersonEmail\n    updatedAt\n  }\n}": types.UpdateLeadContactDocument,
    "mutation UpdateLeadStatus($input: UpdateLeadStatusInput!) {\n  updateLeadStatus(input: $input) {\n    id\n    status\n    leadType\n    notes\n    callbackDate\n    followUpDate\n    updatedAt\n  }\n}": types.UpdateLeadStatusDocument,
    "mutation UpdateSponsorOrder($inputs: [UpdateSponsorSeqInput!]!) {\n  updateSponsorOrder(inputs: $inputs) {\n    id\n    seqNo\n  }\n}": types.UpdateSponsorOrderDocument,
    "query GetAllProjects {\n  getAllProjects {\n    bannerUrl\n    createdAt\n    currency\n    description\n    endDate\n    id\n    location\n    logoUrl\n    name\n    slug\n    startDate\n    status\n    website\n    year\n  }\n}": types.GetAllProjectsDocument,
    "query GetExhibitorsByProject($projectId: String!) {\n  getExhibitorsByProject(projectId: $projectId) {\n    address\n    boothNumber\n    badge\n    companyName\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    hideFromParticipant\n    id\n    linkedinUrl\n    logoUrl\n    projectId\n    seqNo\n    status\n    updatedAt\n    website\n  }\n}": types.GetExhibitorsByProjectDocument,
    "query GetFilteredLeads($input: LeadFilterInput!) {\n  getFilteredLeads(input: $input) {\n    total\n    page\n    limit\n    totalPages\n    leads {\n      id\n      name\n      email\n      phone\n      companyName\n      jobTitle\n      city\n      state\n      country\n      status\n      source\n      leadType\n      industry\n      message\n      notes\n      assignedToId\n      callbackDate\n      followUpDate\n      createdAt\n      updatedAt\n      assignedTo {\n        id\n        name\n        email\n        phone\n      }\n      utm {\n        id\n        source\n        medium\n        campaign\n      }\n    }\n  }\n}": types.GetFilteredLeadsDocument,
    "query GetLeadActivities($leadId: String!) {\n  getLeadActivities(leadId: $leadId) {\n    id\n    leadId\n    status\n    previousStatus\n    notes\n    changedById\n    changedByName\n    createdAt\n  }\n}": types.GetLeadActivitiesDocument,
    "query GetLeadById($id: String!) {\n  getLeadById(id: $id) {\n    id\n    projectId\n    assignedToId\n    name\n    email\n    phone\n    companyName\n    jobTitle\n    contactPersonName\n    contactPersonPhone\n    contactPersonDesignation\n    contactPersonEmail\n    city\n    state\n    country\n    industry\n    status\n    source\n    leadType\n    message\n    notes\n    quantity\n    price\n    assignedToId\n    callbackDate\n    followUpDate\n    createdAt\n    updatedAt\n    assignedTo {\n      id\n      name\n      email\n      phone\n      cities {\n        city\n        state\n      }\n    }\n    utm {\n      id\n      source\n      medium\n      campaign\n      term\n      content\n      url\n    }\n  }\n}": types.GetLeadByIdDocument,
    "query GetLeadCities($projectId: String!, $state: String) {\n  getLeadCities(projectId: $projectId, state: $state)\n}": types.GetLeadCitiesDocument,
    "query GetLeadStates($projectId: String!) {\n  getLeadStates(projectId: $projectId)\n}": types.GetLeadStatesDocument,
    "query GetLeadsByProjectId($projectId: String!) {\n  getLeadsByProjectId(projectId: $projectId) {\n    id\n    awardCategory\n    companyName\n    createdAt\n    email\n    industry\n    jobTitle\n    leadType\n    message\n    name\n    phone\n    price\n    projectId\n    quantity\n    status\n    source\n    city\n    state\n    country\n    notes\n    assignedToId\n    utmId\n    assignedTo {\n      id\n      name\n      email\n    }\n    utm {\n      source\n      medium\n      campaign\n    }\n  }\n}": types.GetLeadsByProjectIdDocument,
    "query GetLeadsGroupedByField($input: GroupLeadsInput!) {\n  getLeadsGroupedByField(input: $input) {\n    field\n    groups {\n      avgPrice\n      count\n      group\n      totalPrice\n    }\n  }\n}": types.GetLeadsGroupedByFieldDocument,
    "query GetPartnersByProject($input: GetPartnersByProjectInput!) {\n  getPartnersByProject(input: $input) {\n    address\n    boothNumber\n    badge\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    facebookUrl\n    featured\n    hideFromParticipant\n    id\n    instagramUrl\n    linkedinUrl\n    logoUrl\n    name\n    partnerType\n    phone\n    projectId\n    seqNo\n    status\n    website\n    xUrl\n    youtubeUrl\n  }\n}": types.GetPartnersByProjectDocument,
    "query GetProjectAnalyticsById($input: ProjectAnalyticsInput!) {\n  getProjectAnalyticsById(input: $input) {\n    exhibitors\n    id\n    leads\n    speakers\n    sponsors\n    utms\n    monthlyData {\n      exhibitors\n      leads\n      partners\n      speakers\n      sponsors\n      utms\n    }\n  }\n}": types.GetProjectAnalyticsByIdDocument,
    "query GetSalesAssignedLeads($input: SalesAssignedLeadsInput!) {\n  getSalesAssignedLeads(input: $input) {\n    total\n    page\n    limit\n    totalPages\n    leads {\n      id\n      name\n      email\n      phone\n      companyName\n      jobTitle\n      city\n      state\n      country\n      status\n      source\n      leadType\n      industry\n      message\n      notes\n      assignedToId\n      projectId\n      callbackDate\n      followUpDate\n      createdAt\n      updatedAt\n      assignedTo {\n        id\n        name\n        email\n        phone\n      }\n    }\n  }\n}": types.GetSalesAssignedLeadsDocument,
    "query GetSalesPeople {\n  getSalesPeople {\n    id\n    name\n    email\n    phone\n    isActive\n    projectId\n    cities {\n      id\n      city\n      state\n    }\n  }\n}": types.GetSalesPeopleDocument,
    "query GetSalesPeopleByProject($projectId: String!) {\n  getSalesPeopleByProject(projectId: $projectId) {\n    id\n    name\n    email\n    phone\n    isActive\n    projectId\n    cities {\n      id\n      city\n      state\n    }\n    createdAt\n  }\n}": types.GetSalesPeopleByProjectDocument,
    "query GetSalesPersonById($id: String!) {\n  getSalesPersonById(id: $id) {\n    id\n    name\n    email\n    projectId\n    project {\n      id\n      name\n    }\n  }\n}": types.GetSalesPersonByIdDocument,
    "query GetSalesPersonPerformance($salesPersonId: String!) {\n  getSalesPersonPerformance(salesPersonId: $salesPersonId) {\n    salesPersonId\n    name\n    email\n    totalLeads\n    newLeads\n    inProgress\n    interested\n    converted\n    notInterested\n    conversionRate\n    statusBreakdown {\n      status\n      count\n    }\n  }\n}": types.GetSalesPersonPerformanceDocument,
    "query GetSalesProjectMemberships($salesPersonId: String!) {\n  getSalesProjectMemberships(salesPersonId: $salesPersonId) {\n    id\n    name\n    email\n    projectId\n    project {\n      id\n      name\n    }\n  }\n}": types.GetSalesProjectMembershipsDocument,
    "query GetSalesTeamPerformance($projectId: String!) {\n  getSalesTeamPerformance(projectId: $projectId) {\n    salesPersonId\n    name\n    email\n    totalLeads\n    newLeads\n    inProgress\n    interested\n    converted\n    notInterested\n    conversionRate\n    statusBreakdown {\n      status\n      count\n    }\n  }\n}": types.GetSalesTeamPerformanceDocument,
    "query getSpeakersByProject($projectId: String!) {\n  getSpeakersByProject(projectId: $projectId) {\n    companyLogo\n    companyName\n    createdAt\n    designation\n    facebookUrl\n    hideFromParticipant\n    id\n    image\n    instagramUrl\n    linkedinUrl\n    name\n    projectId\n    seqNo\n    status\n    updatedAt\n    website\n    xUrl\n    youtubeUrl\n    description\n  }\n}": types.GetSpeakersByProjectDocument,
    "query GetSponsorByProject($projectId: String!) {\n  getSponsorsByProject(projectId: $projectId) {\n    address\n    boothNumber\n    contactEmail\n    contactName\n    contactTitle\n    createdAt\n    description\n    featured\n    hideFromParticipant\n    id\n    logoUrl\n    name\n    projectId\n    seqNo\n    website\n    linkedinUrl\n    status\n    type\n  }\n}": types.GetSponsorByProjectDocument,
    "query GetUtmByProjectId($id: String!, $input: GroupLeadsInput!) {\n  getUtmByProject(id: $id) {\n    campaign\n    content\n    createdAt\n    id\n    medium\n    projectId\n    source\n    term\n    url\n  }\n  getLeadsGroupedByField(input: $input) {\n    field\n    groups {\n      avgPrice\n      count\n      group\n      totalPrice\n      leads {\n        email\n      }\n    }\n  }\n}": types.GetUtmByProjectIdDocument,
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
export function gql(source: "mutation AddExistingSalesPersonToProject($input: AddExistingSalesPersonInput!) {\n  addExistingSalesPersonToProject(input: $input) {\n    id\n    name\n    email\n    phone\n    isActive\n    projectId\n    cities {\n      id\n      city\n      state\n    }\n  }\n}"): (typeof documents)["mutation AddExistingSalesPersonToProject($input: AddExistingSalesPersonInput!) {\n  addExistingSalesPersonToProject(input: $input) {\n    id\n    name\n    email\n    phone\n    isActive\n    projectId\n    cities {\n      id\n      city\n      state\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AssignLead($input: AssignLeadInput!) {\n  assignLead(input: $input) {\n    id\n    assignedToId\n    assignedTo {\n      id\n      name\n      email\n      phone\n    }\n    updatedAt\n  }\n}"): (typeof documents)["mutation AssignLead($input: AssignLeadInput!) {\n  assignLead(input: $input) {\n    id\n    assignedToId\n    assignedTo {\n      id\n      name\n      email\n      phone\n    }\n    updatedAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation BulkCreateLeads($projectId: String!, $leads: [BulkLeadInput!]!) {\n  bulkCreateLeads(projectId: $projectId, leads: $leads) {\n    created\n    failed\n    errors\n  }\n}"): (typeof documents)["mutation BulkCreateLeads($projectId: String!, $leads: [BulkLeadInput!]!) {\n  bulkCreateLeads(projectId: $projectId, leads: $leads) {\n    created\n    failed\n    errors\n  }\n}"];
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
export function gql(source: "mutation CreateSalesPerson($input: CreateSalesPersonInput!) {\n  createSalesPerson(input: $input) {\n    id\n    name\n    email\n    phone\n    isActive\n    cities {\n      id\n      city\n      state\n    }\n  }\n}"): (typeof documents)["mutation CreateSalesPerson($input: CreateSalesPersonInput!) {\n  createSalesPerson(input: $input) {\n    id\n    name\n    email\n    phone\n    isActive\n    cities {\n      id\n      city\n      state\n    }\n  }\n}"];
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
export function gql(source: "mutation DeleteSalesPerson($id: String!) {\n  deleteSalesPerson(id: $id) {\n    id\n  }\n}"): (typeof documents)["mutation DeleteSalesPerson($id: String!) {\n  deleteSalesPerson(id: $id) {\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteSpeaker($id: String!) {\n  deleteSpeaker(id: $id) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation DeleteSpeaker($id: String!) {\n  deleteSpeaker(id: $id) {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    token\n    role\n    name\n    email\n    salesPersonId\n    projectId\n    projectName\n    requiresProjectSelection\n    projectOptions {\n      projectId\n      projectName\n      salesPersonId\n    }\n  }\n}"): (typeof documents)["mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    token\n    role\n    name\n    email\n    salesPersonId\n    projectId\n    projectName\n    requiresProjectSelection\n    projectOptions {\n      projectId\n      projectName\n      salesPersonId\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateExhibitorOrder($inputs: [UpdateExhibitorSeqInput!]!) {\n  updateExhibitorOrder(inputs: $inputs) {\n    id\n    companyName\n    seqNo\n  }\n}"): (typeof documents)["mutation UpdateExhibitorOrder($inputs: [UpdateExhibitorSeqInput!]!) {\n  updateExhibitorOrder(inputs: $inputs) {\n    id\n    companyName\n    seqNo\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateLeadContact($input: UpdateLeadContactInput!) {\n  updateLeadContact(input: $input) {\n    id\n    contactPersonName\n    contactPersonPhone\n    contactPersonDesignation\n    contactPersonEmail\n    updatedAt\n  }\n}"): (typeof documents)["mutation UpdateLeadContact($input: UpdateLeadContactInput!) {\n  updateLeadContact(input: $input) {\n    id\n    contactPersonName\n    contactPersonPhone\n    contactPersonDesignation\n    contactPersonEmail\n    updatedAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateLeadStatus($input: UpdateLeadStatusInput!) {\n  updateLeadStatus(input: $input) {\n    id\n    status\n    leadType\n    notes\n    callbackDate\n    followUpDate\n    updatedAt\n  }\n}"): (typeof documents)["mutation UpdateLeadStatus($input: UpdateLeadStatusInput!) {\n  updateLeadStatus(input: $input) {\n    id\n    status\n    leadType\n    notes\n    callbackDate\n    followUpDate\n    updatedAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateSponsorOrder($inputs: [UpdateSponsorSeqInput!]!) {\n  updateSponsorOrder(inputs: $inputs) {\n    id\n    seqNo\n  }\n}"): (typeof documents)["mutation UpdateSponsorOrder($inputs: [UpdateSponsorSeqInput!]!) {\n  updateSponsorOrder(inputs: $inputs) {\n    id\n    seqNo\n  }\n}"];
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
export function gql(source: "query GetFilteredLeads($input: LeadFilterInput!) {\n  getFilteredLeads(input: $input) {\n    total\n    page\n    limit\n    totalPages\n    leads {\n      id\n      name\n      email\n      phone\n      companyName\n      jobTitle\n      city\n      state\n      country\n      status\n      source\n      leadType\n      industry\n      message\n      notes\n      assignedToId\n      callbackDate\n      followUpDate\n      createdAt\n      updatedAt\n      assignedTo {\n        id\n        name\n        email\n        phone\n      }\n      utm {\n        id\n        source\n        medium\n        campaign\n      }\n    }\n  }\n}"): (typeof documents)["query GetFilteredLeads($input: LeadFilterInput!) {\n  getFilteredLeads(input: $input) {\n    total\n    page\n    limit\n    totalPages\n    leads {\n      id\n      name\n      email\n      phone\n      companyName\n      jobTitle\n      city\n      state\n      country\n      status\n      source\n      leadType\n      industry\n      message\n      notes\n      assignedToId\n      callbackDate\n      followUpDate\n      createdAt\n      updatedAt\n      assignedTo {\n        id\n        name\n        email\n        phone\n      }\n      utm {\n        id\n        source\n        medium\n        campaign\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetLeadActivities($leadId: String!) {\n  getLeadActivities(leadId: $leadId) {\n    id\n    leadId\n    status\n    previousStatus\n    notes\n    changedById\n    changedByName\n    createdAt\n  }\n}"): (typeof documents)["query GetLeadActivities($leadId: String!) {\n  getLeadActivities(leadId: $leadId) {\n    id\n    leadId\n    status\n    previousStatus\n    notes\n    changedById\n    changedByName\n    createdAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetLeadById($id: String!) {\n  getLeadById(id: $id) {\n    id\n    projectId\n    assignedToId\n    name\n    email\n    phone\n    companyName\n    jobTitle\n    contactPersonName\n    contactPersonPhone\n    contactPersonDesignation\n    contactPersonEmail\n    city\n    state\n    country\n    industry\n    status\n    source\n    leadType\n    message\n    notes\n    quantity\n    price\n    assignedToId\n    callbackDate\n    followUpDate\n    createdAt\n    updatedAt\n    assignedTo {\n      id\n      name\n      email\n      phone\n      cities {\n        city\n        state\n      }\n    }\n    utm {\n      id\n      source\n      medium\n      campaign\n      term\n      content\n      url\n    }\n  }\n}"): (typeof documents)["query GetLeadById($id: String!) {\n  getLeadById(id: $id) {\n    id\n    projectId\n    assignedToId\n    name\n    email\n    phone\n    companyName\n    jobTitle\n    contactPersonName\n    contactPersonPhone\n    contactPersonDesignation\n    contactPersonEmail\n    city\n    state\n    country\n    industry\n    status\n    source\n    leadType\n    message\n    notes\n    quantity\n    price\n    assignedToId\n    callbackDate\n    followUpDate\n    createdAt\n    updatedAt\n    assignedTo {\n      id\n      name\n      email\n      phone\n      cities {\n        city\n        state\n      }\n    }\n    utm {\n      id\n      source\n      medium\n      campaign\n      term\n      content\n      url\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetLeadCities($projectId: String!, $state: String) {\n  getLeadCities(projectId: $projectId, state: $state)\n}"): (typeof documents)["query GetLeadCities($projectId: String!, $state: String) {\n  getLeadCities(projectId: $projectId, state: $state)\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetLeadStates($projectId: String!) {\n  getLeadStates(projectId: $projectId)\n}"): (typeof documents)["query GetLeadStates($projectId: String!) {\n  getLeadStates(projectId: $projectId)\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetLeadsByProjectId($projectId: String!) {\n  getLeadsByProjectId(projectId: $projectId) {\n    id\n    awardCategory\n    companyName\n    createdAt\n    email\n    industry\n    jobTitle\n    leadType\n    message\n    name\n    phone\n    price\n    projectId\n    quantity\n    status\n    source\n    city\n    state\n    country\n    notes\n    assignedToId\n    utmId\n    assignedTo {\n      id\n      name\n      email\n    }\n    utm {\n      source\n      medium\n      campaign\n    }\n  }\n}"): (typeof documents)["query GetLeadsByProjectId($projectId: String!) {\n  getLeadsByProjectId(projectId: $projectId) {\n    id\n    awardCategory\n    companyName\n    createdAt\n    email\n    industry\n    jobTitle\n    leadType\n    message\n    name\n    phone\n    price\n    projectId\n    quantity\n    status\n    source\n    city\n    state\n    country\n    notes\n    assignedToId\n    utmId\n    assignedTo {\n      id\n      name\n      email\n    }\n    utm {\n      source\n      medium\n      campaign\n    }\n  }\n}"];
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
export function gql(source: "query GetSalesAssignedLeads($input: SalesAssignedLeadsInput!) {\n  getSalesAssignedLeads(input: $input) {\n    total\n    page\n    limit\n    totalPages\n    leads {\n      id\n      name\n      email\n      phone\n      companyName\n      jobTitle\n      city\n      state\n      country\n      status\n      source\n      leadType\n      industry\n      message\n      notes\n      assignedToId\n      projectId\n      callbackDate\n      followUpDate\n      createdAt\n      updatedAt\n      assignedTo {\n        id\n        name\n        email\n        phone\n      }\n    }\n  }\n}"): (typeof documents)["query GetSalesAssignedLeads($input: SalesAssignedLeadsInput!) {\n  getSalesAssignedLeads(input: $input) {\n    total\n    page\n    limit\n    totalPages\n    leads {\n      id\n      name\n      email\n      phone\n      companyName\n      jobTitle\n      city\n      state\n      country\n      status\n      source\n      leadType\n      industry\n      message\n      notes\n      assignedToId\n      projectId\n      callbackDate\n      followUpDate\n      createdAt\n      updatedAt\n      assignedTo {\n        id\n        name\n        email\n        phone\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetSalesPeople {\n  getSalesPeople {\n    id\n    name\n    email\n    phone\n    isActive\n    projectId\n    cities {\n      id\n      city\n      state\n    }\n  }\n}"): (typeof documents)["query GetSalesPeople {\n  getSalesPeople {\n    id\n    name\n    email\n    phone\n    isActive\n    projectId\n    cities {\n      id\n      city\n      state\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetSalesPeopleByProject($projectId: String!) {\n  getSalesPeopleByProject(projectId: $projectId) {\n    id\n    name\n    email\n    phone\n    isActive\n    projectId\n    cities {\n      id\n      city\n      state\n    }\n    createdAt\n  }\n}"): (typeof documents)["query GetSalesPeopleByProject($projectId: String!) {\n  getSalesPeopleByProject(projectId: $projectId) {\n    id\n    name\n    email\n    phone\n    isActive\n    projectId\n    cities {\n      id\n      city\n      state\n    }\n    createdAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetSalesPersonById($id: String!) {\n  getSalesPersonById(id: $id) {\n    id\n    name\n    email\n    projectId\n    project {\n      id\n      name\n    }\n  }\n}"): (typeof documents)["query GetSalesPersonById($id: String!) {\n  getSalesPersonById(id: $id) {\n    id\n    name\n    email\n    projectId\n    project {\n      id\n      name\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetSalesPersonPerformance($salesPersonId: String!) {\n  getSalesPersonPerformance(salesPersonId: $salesPersonId) {\n    salesPersonId\n    name\n    email\n    totalLeads\n    newLeads\n    inProgress\n    interested\n    converted\n    notInterested\n    conversionRate\n    statusBreakdown {\n      status\n      count\n    }\n  }\n}"): (typeof documents)["query GetSalesPersonPerformance($salesPersonId: String!) {\n  getSalesPersonPerformance(salesPersonId: $salesPersonId) {\n    salesPersonId\n    name\n    email\n    totalLeads\n    newLeads\n    inProgress\n    interested\n    converted\n    notInterested\n    conversionRate\n    statusBreakdown {\n      status\n      count\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetSalesProjectMemberships($salesPersonId: String!) {\n  getSalesProjectMemberships(salesPersonId: $salesPersonId) {\n    id\n    name\n    email\n    projectId\n    project {\n      id\n      name\n    }\n  }\n}"): (typeof documents)["query GetSalesProjectMemberships($salesPersonId: String!) {\n  getSalesProjectMemberships(salesPersonId: $salesPersonId) {\n    id\n    name\n    email\n    projectId\n    project {\n      id\n      name\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetSalesTeamPerformance($projectId: String!) {\n  getSalesTeamPerformance(projectId: $projectId) {\n    salesPersonId\n    name\n    email\n    totalLeads\n    newLeads\n    inProgress\n    interested\n    converted\n    notInterested\n    conversionRate\n    statusBreakdown {\n      status\n      count\n    }\n  }\n}"): (typeof documents)["query GetSalesTeamPerformance($projectId: String!) {\n  getSalesTeamPerformance(projectId: $projectId) {\n    salesPersonId\n    name\n    email\n    totalLeads\n    newLeads\n    inProgress\n    interested\n    converted\n    notInterested\n    conversionRate\n    statusBreakdown {\n      status\n      count\n    }\n  }\n}"];
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
export function gql(source: "query GetUtmByProjectId($id: String!, $input: GroupLeadsInput!) {\n  getUtmByProject(id: $id) {\n    campaign\n    content\n    createdAt\n    id\n    medium\n    projectId\n    source\n    term\n    url\n  }\n  getLeadsGroupedByField(input: $input) {\n    field\n    groups {\n      avgPrice\n      count\n      group\n      totalPrice\n      leads {\n        email\n      }\n    }\n  }\n}"): (typeof documents)["query GetUtmByProjectId($id: String!, $input: GroupLeadsInput!) {\n  getUtmByProject(id: $id) {\n    campaign\n    content\n    createdAt\n    id\n    medium\n    projectId\n    source\n    term\n    url\n  }\n  getLeadsGroupedByField(input: $input) {\n    field\n    groups {\n      avgPrice\n      count\n      group\n      totalPrice\n      leads {\n        email\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getProjectById($id: String!) {\n  getProjectById(id: $id) {\n    createdAt\n    currency\n    description\n    endDate\n    id\n    location\n    logoUrl\n    bannerUrl\n    name\n    slug\n    startDate\n    status\n    website\n    year\n  }\n}"): (typeof documents)["query getProjectById($id: String!) {\n  getProjectById(id: $id) {\n    createdAt\n    currency\n    description\n    endDate\n    id\n    location\n    logoUrl\n    bannerUrl\n    name\n    slug\n    startDate\n    status\n    website\n    year\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;