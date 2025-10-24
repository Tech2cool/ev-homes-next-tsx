"use client";
import fetchAdapter from "@/adapter/fetchAdapter";
import { Params } from "next/dist/server/request/params";
import React, { useState } from "react";

type DataProviderProps = {
  children: React.ReactNode;
};

interface PaginationProps {
  message?: string;
  code?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  totalItems?: number;
  pendingCount?: number;
  contactedCount?: number;
  followUpCount?: number;
  assignedCount?: number;
  registrationDone?: number;
  registrationPending?: number;
  eoiRecieved?: number;
  cancelled?: number;
  revenue?: number;
  approvedCount?: number;
  rejectedCount?: number;
  visitCount?: number;
  visit2Count?: number;
  revisitCount?: number;
  bookingCount?: number;
  booking1Count?: number;
  booking2Count?: number;
  lineUpCount?: number;
  notAssignedCount?: number;
  notFollowUpCount?: number;
  bulkCount?: number;
  internalLeadCount?: number;
  totalSiteVisits?: number;
  totalVisits?: number;
  walkInVisit?: number;
  cpvisit?: number;
  internalLeadsVisit?: number;
  cpRevisit?: number;
  walkInRevisit?: number;
  internalLeadsRevisit?: number;
  virtualMeeting?: number;
  data?: any;
}

type FetchLeadsParams = {
  id?: string | null | undefined;
  query?: string;
  page?: number;
  limit?: number;
  status?: string | null;
  callData?: string | null;
  cycle?: string | null;
  order?: string | null;
  clientstatus?: string | null;
  leadstatus?: string | null;
  member?: string | null;
  startDateDeadline?: string | null;
  endDateDeadline?: string | null;
  date?: string | null;

  status2?: string | null;
  channelPartner?: string | null;
  taskType?: string | null;
  bulkLead?: string | null;
  project?: string | null;
};

//site visit
type SiteVisitParams = {
  query?: string;
  page?: number;
  limit?: number;
  status?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  date?: string | null;
};

//total count
type SearchLeadParms = {
  query: string;
  page?: number;
  limit?: number;
  status?: string | null;
  callData?: string | null;
  cycle?: string | null;
  order?: string | null;
  interval?: string | null;
  clientstatus?: string | null;
  leadstatus?: string | null;
  startDateDeadline?: string | null;
  endDateDeadline?: string | null;
  date?: string | null;
  status2?: string | null;
  //  approvalStatus?:string|null;
  //  stage?:string|null;
  channelPartner?: string | null;
  teamLeader?: string | null;
  taskType?: string | null;
};

// types.ts or wherever you define your types

type LeadsReportingToParams = {
  id?: string | null;
  query?: string | null;
  page?: number | null;
  limit?: number | null;
  status?: string | null;
  callData?: string | null;
  cycle?: number | null;
  order?: string | null;
  clientstatus?: string | null;
  leadstatus?: string | null;
  startDateDeadline?: string | null;
  endDateDeadline?: string | null;
  date?: string | null;
  member?: string | null;
  status2?: string | null;
  channelPartner?: string | null;
  taskType?: string | null;
  bulkLead?: string | null;
  project?: string | null;
};

type DashboardCount = {
  _id: string | null;
  name: string | null;
  designation: string | null;
  date: Date | null;
  lead: LeadCount | null;
  task: TaskCount | null;
};

type LeadCount = {
  total: number | null;
  visit1: number | null;
  visit2: number | null;
  revisit: number | null;
  booking: number | null;
  bookingCp: number | null;
  bookingWalkIn: number | null;
  pending: number | null;
  assigned: number | null;
  notAssigned: number | null;
  lineup: number | null;
  cpNotePendingCount: number | null;
  bulkCount: number | null;
  interestedCount: number | null;
  internalLeadCount: number | null;
};

type TaskCount = {
  total: number | null;
  pending: number | null;
  completed: number | null;
};

type TeamInsight = {
   _id: string | null
  teamName?: string | null
  reportingTo?: string | null
  crew?: Array<{ teamMember: string; _id: string }>
  totalTasks: number | null
};


type AssignParms = {
  query?: string;
  page?: number;
  limit?: number;
  status?: string | null;
};

//assign and followup count
type TeamLeaderAssignFolloupUp = {
  message?: string;
  code?: number;
  query?: string;
  page?: number;
  limit?: number;
  status?: string | null;
  teamLeader?: Employee;
  totalItems?: number;
  assignedCount?: number;
  notAssignedCount?: number;
  notFollowUpCount?: number;
};

//model
type DataProviderState = {
  projects: OurProject[];
  testimonials: Testimonial[];
  loadingTestimonial: boolean;
  loadingLeads: boolean;
  fetchingMoreLeads: boolean;
  employees: Employee[];
  TeamReportingTo: TeamInsight | null;
  requirements: string[];
  leadInfo: PaginationProps | null;
  assignInfo: TeamLeaderAssignFolloupUp | null;
  closingManager: PaginationProps[];
  leads: Lead[] | null;
  dashCount: DashboardCount | null;
  siteInfo: PaginationProps | null;
  visits: SiteVisit[] | null;
  channelPartners: ChannelPartner[];
  searchLeadInfo: PaginationProps | null;
  leadsTeamLeaderGraphForDT: ChartModel[];
  asssignFeedbackInfo: TeamLeaderAssignFolloupUp | null;

  getTestimonals: () => Promise<{ success: boolean; message?: string }>;
  getProjects: () => Promise<{ success: boolean; message?: string }>;
  getRequirements: () => Promise<{ success: boolean; message?: string }>;
  getChannelPartners: () => Promise<{ success: boolean; message?: string }>;
  fetchReportingToEmployees: (
    id: string,
    dept: string
  ) => Promise<{ success: boolean; message?: string }>;
  fetchSaleExecutiveLeads: (
    params: FetchLeadsParams
  ) => Promise<{ success: boolean; message?: string }>;

  fetchTeamLeaderReportingToLeads: (
    params: LeadsReportingToParams
  ) => Promise<{ success: boolean; message?: string }>;

  fetchSearchLeads: (
    params: SearchLeadParms
  ) => Promise<{ success: boolean; message?: string }>;

  fetchDataAnalyzerVisits: (
    params: SiteVisitParams
  ) => Promise<{ success: boolean; message?: string }>;

  getSalesManagerDashBoardCount: (params: {
    id: string | null;
  }) => Promise<{ success: boolean; message?: string }>;

  getClosingManagerDashBoardCount: (params: {
    id: string | null;
  }) => Promise<{ success: boolean; message?: string }>;

  // fetchAssignFeedbackLeads: (
  //   params: AssignParms
  // ) => Promise<{ success: boolean; message?: string }>;

  fetchAssignFeedbackLeadsCount: (
    params: TeamLeaderAssignFolloupUp
  ) => Promise<{ success: boolean; message?: string }>;

  addNewLead: (data: Lead) => Promise<{ success: boolean; message?: string }>;
  fetchTeamLeaderGraphForDA: (params: {
    interval?: string | null;
    year?: number | null;
    startDate?: string | null;
    endDate?: string | null;
    month?: number | null;
  }) => Promise<{ success: boolean; message?: string }>;

  //   setTheme: (theme: Theme) => void;
  //   toggleTheme: () => void;
};

//initial values should define here
const initialState: DataProviderState = {
  projects: [],
  testimonials: [],
  loadingTestimonial: false,
  fetchingMoreLeads: false,
  TeamReportingTo: null,
  employees: [],
  searchLeadInfo: null,
  leadInfo: null,
  requirements: [],
  leads: null,
  loadingLeads: false,
  siteInfo: null,
  visits: null,
  dashCount: null,
  assignInfo: null,
  asssignFeedbackInfo: null,
  channelPartners: [],
  leadsTeamLeaderGraphForDT: [],
  closingManager: [],
  getProjects: async () => ({ success: false, message: "Not initialized" }),
  getRequirements: async () => ({ success: false, message: "Not initialized" }),
  getTestimonals: async () => ({ success: false, message: "Not initialized" }),
  getChannelPartners: async () => ({
    success: false,
    message: "Not initialized",
  }),
  fetchReportingToEmployees: async () => ({ success: false }),
  fetchSaleExecutiveLeads: async () => ({ success: false }),
  fetchTeamLeaderReportingToLeads: async () => ({ success: false }),
  fetchSearchLeads: async () => ({ success: false }),
  fetchDataAnalyzerVisits: async () => ({ success: false }),
  getSalesManagerDashBoardCount: async () => ({ success: false }),

  getClosingManagerDashBoardCount: async () => ({ success: false }),

  // fetchAssignFeedbackLeads: async () => ({ success: false }),
  fetchAssignFeedbackLeadsCount: async () => ({ success: false }),
  addNewLead: async () => ({ success: false, message: "Not initialized" }),
  fetchTeamLeaderGraphForDA: async () => ({
    success: false,
    message: "Not initialized",
  }),
  // setLoadingTestimonial: () => {},

  //   setTheme: () => null,
  //   toggleTheme: () => null,
};

const dataProviderContext =
  React.createContext<DataProviderState>(initialState);

export function DataProvider({ children, ...props }: DataProviderProps) {
  const [projects, setProjects] = useState<OurProject[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonial, setLoadingTestimonial] = useState<boolean>(false);
  const [loadingProject, setLoadingProject] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [TeamReportingTo, setTeamReprotingTo] = useState<TeamInsight | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [loadingLeads, setLoadingLeads] = useState<boolean>(false);
  const [fetchingMoreLeads, setFetchingMoreLeads] = useState<boolean>(false);

  const [leadInfo, setleadInfo] = useState<PaginationProps | null>(null);

  const [searchLeadInfo, setSearchLeadInfo] = useState<PaginationProps | null>(
    null
  );

  const [assignInfo, setAssignInfo] = useState<PaginationProps | null>(null);
  const [asssignFeedbackInfo, setAssignFeedbackInfo] =
    useState<TeamLeaderAssignFolloupUp | null>(null);

  const [closingManager, setTeamLeaders] = useState<PaginationProps[] | []>([]);

  const [dashCount, setDashboardCount] = useState<DashboardCount | null>(null);

  const [leads, setleads] = useState<Lead[]>([]);

  const [loadingVisits, setLoadingVisits] = useState<boolean>(false);
  const [fetchingMoreVisits, setFetchingMoreVisits] = useState<boolean>(false);
  const [siteInfo, setVisitInfo] = useState<PaginationProps | null>(null);
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [loadingChannelPartners, setLoadingChannelPartners] =
    useState<boolean>(false);
  const [channelPartners, setChannelPartners] = useState<ChannelPartner[]>([]);
  const [leadsTeamLeaderGraphForDT, setChartData] = useState<ChartModel[]>([]);

  const getProjects = async () => {
    setLoadingProject(true);
    setError("");

    try {
      let url = `/api/ourProjects`;
      const res = await fetchAdapter(url, {
        method: "get",
      });

      console.log(res?.data);
      setProjects(res?.data ?? []);
      setLoadingProject(false);

      return { success: true };
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setLoadingProject(false);

      return { success: false, message: err.message };
    } finally {
      setLoadingProject(false);
    }
  };
  //requirement
  const getRequirements = async () => {
    setLoadingProject(true);
    setError("");

    try {
      let url = `/api/requirements`;
      const res = await fetchAdapter(url, {
        method: "get",
      });
      let reqs = res?.data?.map((ele: any) => ele?.requirement);
      setRequirements(reqs ?? []);
      setLoadingProject(false);

      return { success: true };
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setLoadingProject(false);

      return { success: false, message: err.message };
    } finally {
      setLoadingProject(false);
    }
  };

const getTeamReportingTo = async (id: string, dept: string) => {
  setLoading(true);
  setError("");
  try {
    let url = `/api/team-insight-reporting-to/${id}`;
    if (dept) url += `?dept=${dept}`;
    const res = await fetchAdapter(url, { method: "GET" });

    console.log("Team Reporting API Response:", res?.data);

    // if response is an array
    setTeamReprotingTo(Array.isArray(res?.data) ? res.data[0] : res.data);

    return { success: true };
  } catch (err: any) {
    console.log(err);
    setError(err.message);
    return { success: false, message: err.message };
  } finally {
    setLoading(false);
  }
};



  //get all testimonials
  const getTestimonals = async () => {
    setLoadingTestimonial(true);
    setError("");

    try {
      let url = `/api/testimonial`;
      const res = await fetchAdapter(url, {
        method: "get",
      });

      setTestimonials(res?.data);
      setLoadingTestimonial(false);
      console.log(res?.data);
      return { success: true };
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setLoadingTestimonial(false);

      return { success: false, message: err.message };
    } finally {
      setLoadingTestimonial(false);
    }
  };

  //get channel Partners
  const getChannelPartners = async () => {
    setLoadingChannelPartners(true);
    setError("");

    try {
      let url = `/api/channel-partner`;
      const res = await fetchAdapter(url, {
        method: "get",
      });

      setChannelPartners(res?.data ?? []);
      setLoadingChannelPartners(false);

      return { success: true };
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setLoadingChannelPartners(false);

      return { success: false, message: err.message };
    } finally {
      setLoadingChannelPartners(false);
    }
  };

  //tagging form
  const addNewLead = async (data: Lead) => {
    setLoading(true);
    setError("");

    try {
      let url = `/api/leads-add`;

      // console.log(url);
      const res = await fetchAdapter(url, {
        method: "POST",
        body: JSON.stringify(data),
      });

      setLoading(false);

      return { success: true, message: res?.message };
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setLoading(false);

      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // fetch leads for salesM/ salesEx
  const fetchReportingToEmployees = async (id: string, dept: string) => {
    setLoading(true);
    setError("");

    try {
      let url = `/api/employee-reporting/${id}`;
      if (dept) {
        url += `?dept=${dept}`;
      }
      const res = await fetchAdapter(url, {
        method: "GET",
      });
      // console.log(url);
      // console.log(res);
      setEmployees(res?.data);
      setLoading(false);

      return { success: true };
    } catch (err: any) {
      setError(err.message);
      setLoading(false);

      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // fetch leads for salesM/ salesEx
  const fetchSaleExecutiveLeads = async ({
    id = null,
    query = "",
    page = 1,
    limit = 10,
    status = null,
    callData = null,
    cycle = null,
    order = null,
    clientstatus = null,
    leadstatus = null,
    startDateDeadline = null,
    endDateDeadline = null,
    date = null,
    member = null,
    status2 = null,
    channelPartner = null,
    taskType = null,
    bulkLead = null,
    project = null,
  }: FetchLeadsParams): Promise<{ success: boolean; message?: string }> => {
    if (page === 1) {
      setLoadingLeads(true);
    } else {
      setFetchingMoreLeads(true);
    }
    setError("");

    try {
      let url = `/api/leads-team-leader-reporting/${id}?query=${query}&page=${page}&limit=${limit}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (callData) {
        url += `&callData=${callData}`;
      }
      if (cycle) {
        url += `&cycle=${cycle}`;
      }
      if (order) {
        url += `&order=${order}`;
      }
      if (clientstatus) {
        url += `&clientstatus=${clientstatus}`;
      }
      if (leadstatus) {
        url += `&leadstatus=${leadstatus}`;
      }
      if (startDateDeadline) {
        url += `&startDateDeadline=${startDateDeadline}`;
      }
      if (endDateDeadline) {
        url += `&endDateDeadline=${endDateDeadline}`;
      }
      if (date) {
        url += `&date=${date}`;
      }
      if (member) {
        url += `&member=${member}`;
      }

      if (status2) {
        url += `&status2=${status2}`;
      }
      if (channelPartner) {
        url += `&channelPartner=${channelPartner}`;
      }
      if (taskType) {
        url += `&taskType=${taskType}`;
      }
      if (bulkLead != null) {
        url += "&bulkLead=$bulkLead";
      }

      if (project != null) {
        url += "&project=$project";
      }
      console.log(url);
      const res = await fetchAdapter(url, {
        method: "GET",
      });
      const { data, ...withoutData } = res as PaginationProps;

      setleadInfo(withoutData);
      if (page > 1) {
        // setleads((prev) => [...prev, ...res?.data]);
      } else {
        setleads(res?.data ?? []);
      }
      setFetchingMoreLeads(false);
      setLoadingLeads(false);

      return { success: true };
    } catch (err: any) {
      setError(err.message);
      setFetchingMoreLeads(false);
      setLoadingLeads(false);

      return { success: false, message: err.message };
    } finally {
      setFetchingMoreLeads(false);
      setLoadingLeads(false);
    }
  };

  // Function to get dashboard count for a Sales Manager
  const getSalesManagerDashBoardCount = async ({
    id = null,
  }: {
    id: string | null;
  }): Promise<{ success: boolean; message?: string }> => {
    setError("");

    if (!id) {
      setError("ID is required");
      return { success: false, message: "ID is required" };
    }

    try {
      const url = `/api/v2/sales-dashboard-count/${id}`;
      console.log("Fetching dashboard count from:", url);

      const res = await fetchAdapter(url, {
        method: "GET",
      });

      // Assuming your fetchAdapter returns { data, status, message }
      const dashboardData = res.data as DashboardCount;

      // console.log("Lead info:", dashboardData.lead);
      setDashboardCount(dashboardData);

      return { success: true };
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      return { success: false, message: err.message };
    }
  };

  // Function to get dashboard count for a Closing Manager
  const getClosingManagerDashBoardCount = async ({
    id = null,
  }: {
    id: string | null;
  }): Promise<{ success: boolean; message?: string }> => {
    setError("");

    if (!id) {
      setError("ID is required");
      return { success: false, message: "ID is required" };
    }

    try {
      const url = `/api/v2/closing-manager-dashboard-count//${id}`;
      console.log("Fetching dashboard count from:", url);

      const res = await fetchAdapter(url, {
        method: "GET",
      });

      // Assuming your fetchAdapter returns { data, status, message }
      const dashboardData = res.data as DashboardCount;

      // console.log("Lead info:", dashboardData.lead);
      setDashboardCount(dashboardData);

      return { success: true };
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      return { success: false, message: err.message };
    }
  };

  //fetch data analyzer visits data
  const fetchDataAnalyzerVisits = async ({
    query = "",
    page = 1,
    limit = 10,
    status = null,
    startDate = null,
    endDate = null,
    date = null,
  }: SiteVisitParams): Promise<{ success: boolean; message?: string }> => {
    if (page === 1) {
      setLoadingVisits(true);
    } else {
      setFetchingMoreVisits(true);
    }
    setError("");

    try {
      let url = `/api/site-visit-search-dta?query=${query}&page=${page}&limit=${limit}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (date) {
        url += `&date=${date}`;
      }
      if (startDate) {
        url += `&startDate=${startDate}`;
      }
      if (endDate) {
        url += `&endDate=${endDate}`;
      }

      console.log(url);
      const res = await fetchAdapter(url, {
        method: "GET",
      });
      const { data, ...withoutData } = res;

      setVisitInfo(withoutData);
      if (page > 1) {
        setVisits((prev) => [...prev, ...res?.data]);
      } else {
        setVisits(res?.data ?? []);
      }
      setFetchingMoreVisits(false);
      setLoadingVisits(false);

      return { success: true };
    } catch (err: any) {
      setError(err.message);
      setFetchingMoreVisits(false);
      setLoadingVisits(false);

      return { success: false, message: err.message };
    } finally {
      setFetchingMoreVisits(false);
      setLoadingVisits(false);
    }
  };

  //fetch team leader reporting to leads
  const fetchTeamLeaderReportingToLeads = async ({
    id = null,
    query = "",
    page = 1,
    limit = 10,
    status = null,
    callData = null,
    cycle = null,
    order = null,
    clientstatus = null,
    leadstatus = null,
    startDateDeadline = null,
    endDateDeadline = null,
    date = null,
    member = null,
    status2 = null,
    channelPartner = null,
    taskType = null,
    bulkLead = null,
    project = null,
  }: LeadsReportingToParams): Promise<{
    success: boolean;
    message?: string;
  }> => {
    if (page === 1) {
      setLoadingLeads(true);
    } else {
      setFetchingMoreLeads(true);
    }
    setError("");

    try {
      let url = `/api/leads-team-leader-reporting/${id}?query=${query}&page=${page}&limit=${limit}`;
      if (status != null) {
        url += `&status=${status}`;
      }
      if (status2 != null) {
        url += `&status2=${status2}`;
      }
      if (callData != null) {
        url += `&callData=${callData}`;
      }
      if (cycle != null) {
        url += `&cycle=${cycle}`;
      }
      if (order != null) {
        url += `&order=${order}`;
      }
      if (clientstatus != null) {
        url += `&clientstatus=${clientstatus}`;
      }
      if (leadstatus != null) {
        url += `&leadstatus=${leadstatus}`;
      }
      if (startDateDeadline != null) {
        url += `&startDateDeadline=${startDateDeadline}`;
      }
      if (endDateDeadline != null) {
        url += `&endDateDeadline=${endDateDeadline}`;
      }
      if (date != null) {
        url += `&date=${date}`;
      }
      if (member != null) {
        url += `&member=${member}`;
      }
      if (channelPartner != null) {
        url += `&channelPartner=${channelPartner}`;
      }
      if (bulkLead != null) {
        url += `&bulkLead=${bulkLead}`;
      }

      if (taskType != null) {
        url += `&taskType=${taskType}`;
      }
      if (project != null) {
        url += `&project=${project}`;
      }

      console.log(url);
      const res = await fetchAdapter(url, {
        method: "GET",
      });
      const { data, ...withoutData } = res;

      setleadInfo(withoutData);
      if (page! > 1) {
        setleads((prev) => [...prev, ...res?.data]);
      } else {
        setleads(res?.data ?? []);
      }
      setFetchingMoreLeads(false);
      setLoadingLeads(false);

      return { success: true };
    } catch (err: any) {
      setError(err.message);
      setFetchingMoreLeads(false);
      setLoadingLeads(false);

      return { success: false, message: err.message };
    } finally {
      setFetchingMoreLeads(false);
      setLoadingLeads(false);
    }
  };

  //assign / feedback pending...hold
  // const fetchAssignFeedbackLeads = async ({
  //   query = "",
  //   page = 1,
  //   limit = 10,
  //   status = null,
  // }: AssignParms): Promise<{ success: boolean; message?: string }> => {
  //   if (page === 1) {
  //     setLoadingLeads(true);
  //   } else {
  //     setFetchingMoreLeads(true);
  //   }
  //   setError("");

  //   try {
  //     let url = `/api/leads-assign-feedback?query=${query}&page=${page}&limit=${limit}`;
  //     if (status) {
  //       url += `&status=${status}`;
  //     }

  //     console.log(url);
  //     const res = await fetchAdapter(url, {
  //       method: "GET",
  //     });
  //     const { data, ...withoutData } = res;

  //     setAssignInfo(data);
  //     if (page > 1) {
  //       setleads((prev) => [...prev, ...res?.data]);
  //     } else {
  //       setleads(res?.data ?? []);
  //     }
  //     console.log(res);
  //     setFetchingMoreLeads(false);
  //     setLoadingLeads(false);

  //     return { success: true };
  //   } catch (err: any) {
  //     setError(err.message);
  //     setFetchingMoreLeads(false);
  //     setLoadingLeads(false);

  //     return { success: false, message: err.message };
  //   } finally {
  //     setFetchingMoreLeads(false);
  //     setLoadingLeads(false);
  //   }
  // };

  //TODO: asign/feedback lead list count
  const fetchAssignFeedbackLeadsCount = async ({
    query = "",
    page = 1,
    limit = 10,
    teamLeader,
  }: TeamLeaderAssignFolloupUp): Promise<{
    success: boolean;
    message?: string;
  }> => {
    // if (page === 1) {
    //   setLoadingLeads(true);
    // } else {
    //   setFetchingMoreLeads(true);
    // }

    setError("");

    try {
      let url = `/api/leads-assign-count?query=${query}&page=${page}&limit=${limit}`;
      if (teamLeader) {
        url += `&teamLeader=${teamLeader}`;
      }

      console.log("Fetching assign count from hjbhbhjb:", url);

      const res = await fetchAdapter(url, {
        method: "GET",
      });

if (res?.data) {
      setAssignFeedbackInfo(res.data);
    } else {
      setAssignFeedbackInfo(res);
    }

      // if (page > 1) {
      //   setleads((prev) => [...prev, ...(res?.data ?? [])]);
      // } else {
      //   setleads(res?.data ?? []);
      // }

      // console.log("Assign feedback count response:", res);

      // setFetchingMoreLeads(false);
      // setLoadingLeads(false);

      return { success: true };
    } catch (err: any) {
      console.error(
        "Error fetching assign feedback count:",
        err.message || err
      );

      setError(err.message || "Something went wrong");
      // setFetchingMoreLeads(false);
      // setLoadingLeads(false);

      return { success: false, message: err.message };
    } finally {
      // setFetchingMoreLeads(false);
      // setLoadingLeads(false);
    }
  };

  const fetchSearchLeads = async ({
    query = "",
    page = 1,
    limit = 20,
    status = null,
    callData = null,
    cycle = null,
    order = null,
    interval = null,
    clientstatus = null,
    leadstatus = null,
    startDateDeadline = null,
    endDateDeadline = null,
    date = null,
    status2 = null,
    //  approvalStatus = null,
    //  stage = null,
    channelPartner = null,
    teamLeader = null,
    taskType = null,
  }: SearchLeadParms): Promise<{ success: boolean; message?: string }> => {
    if (page === 1) {
      setLoadingLeads(true);
    } else {
      setFetchingMoreLeads(true);
    }
    setError("");

    try {
      let url = `/api/search-lead?query=${query}&page=${page}&limit=${limit}`;
      if (status != null) {
        url += `&status=${status}`;
      }
      if (status2 != null) {
        url += `&status2=${status2}`;
      }
      if (callData != null) {
        url += `&callData=${callData}`;
      }
      if (cycle != null) {
        url += `&cycle=${cycle}`;
      }
      if (order != null) {
        url += `&order=${order}`;
      }
      if (interval != null) {
        url += `&interval=${interval}`;
      }
      if (clientstatus != null) {
        url += `&clientstatus=${clientstatus}`;
      }
      if (leadstatus != null) {
        url += `&leadstatus=${leadstatus}`;
      }
      if (startDateDeadline != null) {
        url += `&startDateDeadline=${startDateDeadline}`;
      }
      if (endDateDeadline != null) {
        url += `&endDateDeadline=${endDateDeadline}`;
      }
      if (date != null) {
        url += `&date=${date}`;
      }

      // if (approvalStatus != null) {
      //   url += `&approvalStatus=${approvalStatus}`;
      // }
      // if (stage != null) {
      //   url += `&stage=${stage}`;
      // }
      if (channelPartner != null) {
        url += `&channelPartner=${channelPartner}`;
      }
      if (teamLeader != null) {
        url += `&teamLeader=${teamLeader}`;
      }
      if (taskType != null) {
        url += `&taskType=${taskType}`;
      }
      console.log(url);
      const res = await fetchAdapter(url, {
        method: "GET",
      });
      const { data, ...withoutData } = res as PaginationProps;

      setSearchLeadInfo(withoutData);
      if (page > 1) {
        // setleads((prev) => [...prev, ...res?.data]);
      } else {
        setleads(res?.data ?? []);
      }
      setFetchingMoreLeads(false);
      setLoadingLeads(false);

      return { success: true };
    } catch (err: any) {
      setError(err.message);
      setFetchingMoreLeads(false);
      setLoadingLeads(false);

      return { success: false, message: err.message };
    } finally {
      setFetchingMoreLeads(false);
      setLoadingLeads(false);
    }
  };

  //data analyzer graph
  const fetchTeamLeaderGraphForDA = async ({
    interval = "monthly",
    year = null,
    startDate = null,
    endDate = null,
    month = null,
  }: {
    interval?: string | null;
    year?: number | null;
    startDate?: string | null;
    endDate?: string | null;
    month?: number | null;
  }): Promise<{ success: boolean; message?: string }> => {
    setError("");

    try {
      let url = `/api/lead-count-pre-sale-team-leader-for-data-analyser?interval=${interval}`;
      if (year != null) url += `&year=${year}`;
      if (month != null) url += `&month=${month}`;
      if (startDate != null) url += `&startDate=${startDate}`;
      if (endDate != null) url += `&endDate=${endDate}`;

      console.log("Fetching dashboard count from:", url);

      const res = await fetchAdapter(url, { method: "GET" });
      console.log(res);
      setChartData(res?.data ?? []);

      return { success: true };
    } catch (err: any) {
      const message = String(err);
      setError(message);
      return { success: false, message };
    }
  };

  const value = {
    projects: projects,
    testimonials: testimonials,
    loadingTestimonial: loadingTestimonial,
    loadingLeads: loadingLeads,
    employees: employees,
    leadInfo: leadInfo,
    dashCount: dashCount,
    siteInfo: siteInfo,
    visits: visits,
    leads: leads,
    TeamReportingTo: TeamReportingTo,
    fetchingMoreLeads: fetchingMoreLeads,
    assignInfo: assignInfo,
    searchLeadInfo: searchLeadInfo,
    requirements: requirements,
    channelPartners: channelPartners,
    leadsTeamLeaderGraphForDT: leadsTeamLeaderGraphForDT,
    closingManager: closingManager,
    asssignFeedbackInfo: asssignFeedbackInfo,

    getProjects: getProjects,
    getRequirements: getRequirements,
    getTestimonals: getTestimonals,
    setLoadingTestimonial: setLoadingTestimonial,
    fetchReportingToEmployees: fetchReportingToEmployees,
    fetchSaleExecutiveLeads: fetchSaleExecutiveLeads,
    fetchDataAnalyzerVisits: fetchDataAnalyzerVisits,
    fetchTeamLeaderReportingToLeads: fetchTeamLeaderReportingToLeads,
    getSalesManagerDashBoardCount: getSalesManagerDashBoardCount,
    // fetchAssignFeedbackLeads: fetchAssignFeedbackLeads,
    fetchSearchLeads: fetchSearchLeads,
    fetchAssignFeedbackLeadsCount: fetchAssignFeedbackLeadsCount,
    getChannelPartners: getChannelPartners,
    getTeamReportingTo: getTeamReportingTo,
    addNewLead: addNewLead,
    fetchTeamLeaderGraphForDA: fetchTeamLeaderGraphForDA,
    getClosingManagerDashBoardCount: getClosingManagerDashBoardCount,
  };

  return (
    <dataProviderContext.Provider {...props} value={value}>
      {children}
    </dataProviderContext.Provider>
  );
}

export const useData = () => {
  const context = React.useContext(dataProviderContext);

  if (context === undefined)
    throw new Error("useData must be used within a DataProvider");

  return context;
};
