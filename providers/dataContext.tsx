"use client";
import fetchAdapter from "@/adapter/fetchAdapter";
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
  startDate?: string | null;
  endDate?: string | null;
  date?: string | null;
  member?: string | null;
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

type DashboardCount = {
  _id: string | null;
  name: string | null;
  designation: string | null;
  date: Date | null;
  lead: LeadCount | null ;
  // task: TaskCount | null;
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

//model
type DataProviderState = {
  projects: OurProject[];
  getProjects: () => Promise<{ success: boolean; message?: string }>;

  testimonials: Testimonial[];
  getTestimonals: () => Promise<{ success: boolean; message?: string }>;

  loadingTestimonial: boolean;

  employees: Employee[];

  leadInfo: PaginationProps | null;
  fetchReportingToEmployees: (
    id: string,
    dept: string
  ) => Promise<{ success: boolean; message?: string }>;
  fetchSaleExecutiveLeads: (
    params: FetchLeadsParams
  ) => Promise<{ success: boolean; message?: string }>;

  siteInfo: PaginationProps | null;
  visits: SiteVisit[] | null;

  fetchDataAnalyzerVisits: (
    params: SiteVisitParams
  ) => Promise<{ success: boolean; message?: string }>;


dashCount: DashboardCount | null;
 getSalesManagerDashBoardCount: (
  params: { id: string | null }
) => Promise<{ success: boolean; message?: string }>;
  //   setTheme: (theme: Theme) => void;
  //   toggleTheme: () => void;
};

//initial values should define here
const initialState: DataProviderState = {
  projects: [],
  getProjects: async () => ({ success: false, message: "Not initialized" }),

  testimonials: [],
  getTestimonals: async () => ({ success: false, message: "Not initialized" }),
  loadingTestimonial: false,

  employees: [],
  fetchReportingToEmployees: async () => ({ success: false }),
  fetchSaleExecutiveLeads: async () => ({ success: false }),
  leadInfo: null,

  fetchDataAnalyzerVisits: async () => ({ success: false }),
  siteInfo: null,
  visits: null,

dashCount:null,
getSalesManagerDashBoardCount: async () => ({ success: false }),
  // setLoadingTestimonial: () => {},

  //   setTheme: () => null,
  //   toggleTheme: () => null,
};

const dataProviderContext =
  React.createContext<DataProviderState>(initialState);

export function DataProvider({ children, ...props }: DataProviderProps) {
  const [projects, setProjects] = useState<OurProject[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonial, setLoadingTestimonial] = useState<boolean>(false);
  const [loadingProject, setLoadingProject] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loadingLeads, setLoadingLeads] = useState<boolean>(false);
  const [fetchingMoreLeads, setFetchingMoreLeads] = useState<boolean>(false);
  const [leadInfo, setleadInfo] = useState<PaginationProps | null>(null);
const [dashCount, setDashboardCount] = useState<DashboardCount | null>(null);

  const [leads, setleads] = useState<Lead[]>([]);

  const [loadingVisits, setLoadingVisits] = useState<boolean>(false);
  const [fetchingMoreVisits, setFetchingMoreVisits] = useState<boolean>(false);
  const [siteInfo, setVisitInfo] = useState<PaginationProps | null>(null);
  const [visits, setVisits] = useState<SiteVisit[]>([]);

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
      console.log(url);
      console.log(res);
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
    startDate = null,
    endDate = null,
    date = null,
    member = null,
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
      if (startDate) {
        url += `&startDate=${startDate}`;
      }
      if (endDate) {
        url += `&endDate=${endDate}`;
      }
      if (date) {
        url += `&date=${date}`;
      }
      if (member) {
        url += `&member=${member}`;
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

    console.log("Lead info:", dashboardData.lead);
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

  const value = {
    projects: projects,
    testimonials: testimonials,
    loadingTestimonial: loadingTestimonial,
    employees: employees,
    leadInfo: leadInfo,
    dashCount:dashCount,
    siteInfo: siteInfo,
    visits: visits,
    getProjects: getProjects,
    getTestimonals: getTestimonals,
    setLoadingTestimonial: setLoadingTestimonial,
    fetchReportingToEmployees: fetchReportingToEmployees,
    fetchSaleExecutiveLeads: fetchSaleExecutiveLeads,
    fetchDataAnalyzerVisits: fetchDataAnalyzerVisits,
    getSalesManagerDashBoardCount:getSalesManagerDashBoardCount,
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
