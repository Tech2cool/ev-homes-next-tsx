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
  propertyType?: string | null;
};

type CancelBookingParams = {
  id: string | null;
  remark?: string | null;
};

type FetchTeamLeaderParams = {
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
  interval?: string | null;

  propertyType?: string | null;
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

type ProjectSchema = {
  projectId?: OurProject | null;
  target?: number | null;
  booking?: number | null;
  registration?: number | null;
};

type ProjectTargetData = {
  projectName: string;
  metrics: {
    label: "Target" | "Booking" | "Registration";
    count: number;
  }[];
};

type OverallTarget = {
  staffId?: Employee | null;
  target?: number | null;
  quarter?: number | null;
  year?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
  currentDate?: Date | null;
  booking: PostSaleLead[];
  registration: PostSaleLead[];
  projectWise: ProjectSchema[];
};

type BookingStatus = {
  // Add BookingStatus properties as needed
  id?: string;
  status?: string;
  // ... other properties
};

type Applicant = {
  // Add Applicant properties as needed
  id?: string;
  name?: string;
  // ... other properties
};

type PreRegistrationChecklist = {
  // Add PreRegistrationChecklist properties as needed
  id?: string;
  // ... other properties
};

type DisbursementRecord = {
  // Add DisbursementRecord properties as needed
  id?: string;
  // ... other properties
};

type CallHistory = {
  // Add CallHistory properties as needed
  id?: string;
  // ... other properties
};

type Parking = {
  // Add Parking properties as needed
  id?: string;
  // ... other properties
};

type UploadedDocuments = {
  // Add UploadedDocuments properties as needed
  id?: string;
  // ... other properties
};

type CpOnboarding = {
  id: string;
  name?: string;
  email?: string;
  status?: string;
};

type OnboardTarget = {
  id?: string;
  month?: number;
  year?: number;
  target?: number;
  achieved?: number;
  pending?: number;
  date?: string;
  onboards: CpOnboarding[];
};

type TargetProgressData = {
  label: string;
  value: number;
  color1: string;
  color2: string;
  icon: any; // React component type
  iconColor: string;
};

type FetchPostSaleLeadParams = {
  query?: string;
  page?: number;
  limit?: number;
  project?: string | null;
  status?: string | null;
  closingManager?: string | null;
  date?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};

//total count
type SearchLeadParms = {
  query?: string;
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
  propertyType?: string | null;
};

//total count
type AllLeadParms = {
  query: string;
  page?: number;
  limit?: number;
  status?: string | null;
  interval?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  teamLeader?: string | null;
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
  propertyType?: string | null;
};

type DashboardCount = {
  _id: string | null;
  name: string | null;
  designation: string | null;
  date: Date | null;
  lead: LeadCount | null;
  task: TaskCount | null;
};

type ClosingManagerGraph = {
  leadCount: number | null;
  bookingCount: number | null;
  visitCount: number | null;
  revisitCount: number | null;
  visit2Count: number | null;
  bookingWalkinCount: number | null;
  bookingCpCount: number | null;
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

type Crew = {
  _id: string | null;
  teamMember: Employee;
};

type TeamInsight = {
  _id: string | null;
  teamName?: string | null;
  reportingTo?: string | null;
  crew?: Crew[];
  totalTasks: number | null;
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
  slabsbyproject: SlabInfo  | null;
  testimonials: Testimonial[];
  loadingTestimonial: boolean;
  loadingLeads: boolean;
  loadingTask: boolean;

  loadingPostSaleLeads: boolean;

  fetchingMoreLeads: boolean;
  employees: Employee[];
  teamOverview: TeamInsight[];
  requirements: string[];
  leadInfo: PaginationProps | null;
  assignInfo: TeamLeaderAssignFolloupUp | null;
  closingManager: PaginationProps[];
  leads: Lead[] | null;
  postSaleleads: PostSaleLead[] | null;
  dashCount: DashboardCount | null;
  closingManagerAllGraph: ClosingManagerGraph | null;
  salesDashCount: DashboardCount | null;
  siteInfo: PaginationProps | null;
  visits: SiteVisit[] | null;
  timer: string | null;
  channelPartners: ChannelPartner[];
  searchLeadInfo: PaginationProps | null;
  searchPostSaleLeadInfo: PaginationProps | null;
  leadsTeamLeaderGraphForDT: ChartModel[];
  leadsChannelPartnerGraphForDT: ChartModel[];
  leadsFunnelGraphForDT: ChartModel[];
  leadsLineGraphForDT: ChartModel[];
  onboardTargetData: OnboardTarget | null;
  asssignFeedbackInfo: TeamLeaderAssignFolloupUp | null;
  myOverallTarget: OverallTarget | null;
  projectTargets: ProjectTargetData[];
  loadingProjectTargets: boolean;
  ranking: RankingTurn | null;
  leaveCount: EmployeeShiftInfoModel | null;
  currentLead: Lead | null;
  currentTask: Task | null;
  dataEntryUsers: Employee[];
  closingManagers: Employee[];
  reportingToEmps: Employee[];
  attOverview: AttOverview | null;
  attendanceList: Attendance[];
  estimatebyId: EstimateGenerated[];
  estimateAll: EstimateGenerated[];

  getTestimonals: () => Promise<{ success: boolean; message?: string }>;
  getProjects: () => Promise<{ success: boolean; message?: string }>;
   getSlabByProject: (
    project: string
  ) => Promise<{ success: boolean; message?: string }>;
  getRequirements: () => Promise<{ success: boolean; message?: string }>;
  getRankingTurns: () => Promise<{ success: boolean; message?: string }>;
  getChannelPartners: () => Promise<{ success: boolean; message?: string }>;
  fetchReportingToEmployees: (
    id: string,
    dept: string
  ) => Promise<{ success: boolean; message?: string }>;
  fetchSaleExecutiveLeads: (
    params: FetchLeadsParams
  ) => Promise<{ success: boolean; message?: string }>;
  fetchTeamLeaderLeads: (
    params: FetchTeamLeaderParams
  ) => Promise<{ success: boolean; message?: string }>;

  fetchTeamLeaderReportingToLeads: (
    params: LeadsReportingToParams
  ) => Promise<{ success: boolean; message?: string }>;

  fetchSearchLeads: (
    params: SearchLeadParms
  ) => Promise<{ success: boolean; message?: string }>;
  getAllData: (
    params: AllLeadParms
  ) => Promise<{ success: boolean; message?: string }>;

  fetchPostSaleLeads: (
    params: FetchPostSaleLeadParams
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

  getAllGraph: (params?: {
    interval?: string | null;
    startDate?: string | null;
    endDate?: string | null;
  }) => Promise<{ success: boolean; message?: string }>;

  getSiteVisitHistoryByPhone: (
    phoneNumber: Number,
    altPhoneNumber?: Number
  ) => Promise<{ success: boolean; message?: string }>;

  fetchAssignFeedbackLeads: (
    params: AssignParms
  ) => Promise<{ success: boolean; message?: string }>;

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

  fetchChannelPartnerGraphForDA: (params: {
    // Add this
    interval?: string | null;
    year?: number | null;
    startDate?: string | null;
    endDate?: string | null;
    month?: number | null;
  }) => Promise<{ success: boolean; message?: string }>;

  fetchFunnelGraphForDA: (params: {
    // Add this
    interval?: string | null;
    year?: number | null;
    startDate?: string | null;
    endDate?: string | null;
    month?: number | null;
  }) => Promise<{ success: boolean; message?: string }>;

  fetchLineGraphForDA: (params: {
    // Add this
    interval?: string | null;
    year?: number | null;
    startDate?: string | null;
    endDate?: string | null;
  }) => Promise<{ success: boolean; message?: string }>;

  fetchOnboardTarget: (params: {
    // Add this
    date?: string | null;
  }) => Promise<{ success: boolean; message?: string; data?: OnboardTarget }>;

  getQuarterWiseTarget: (
    id: string,
    quarter?: number | null,
    year?: number | null
  ) => Promise<{ success: boolean; message?: string; data?: OverallTarget }>;

  getProjectTargets: (
    id: string,
    quarter?: number | null,
    year?: number | null
  ) => Promise<{ success: boolean; message?: string }>;

  getTeamOverview: (
    id: string
  ) => Promise<{ success: boolean; message?: string }>;
  //   setTheme: (theme: Theme) => void;
  //   toggleTheme: () => void;

  getShiftInfoByUserId: (
    id: string
  ) => Promise<{ success: boolean; message?: string }>;

  getLeadByBookingId: (
    id: string
  ) => Promise<{ success: boolean; message?: string }>;

  updateLeadDetails: (
    id: string,
    data: Record<string, any>
  ) => Promise<{ success: boolean; message?: string }>;

  getDataEntryEmployees: () => Promise<{ success: boolean; message?: string }>;

  getClosingManagers: () => Promise<{ success: boolean; message?: string }>;
  updateFeedbackWithTimer: (data: Record<string, any>) => Promise<{
    success: boolean;
    message?: string;
  }>;

  getLeadById: (id: string) => Promise<{ success: boolean; message?: string }>;

  getTaskById: (id: string) => Promise<{ success: boolean; message?: string }>;
  getAttendanceOverview: (
    id: string
  ) => Promise<{ success: boolean; message?: string }>;
  getMyMonthlyAttendance: (
    id: string
  ) => Promise<{ success: boolean; message?: string }>;
  getTodayAttendance: ({
    date,
    filter,
    startDate,
    endDate,
  }: {
    date?: string;
    filter?: string;
    startDate?: string;
    endDate?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  assignTask: (
    id: string,
    data: Record<string, any>
  ) => Promise<{ success: boolean; message?: string }>;

  sendOtpSiteVisit: (
    data: Record<string, any>
  ) => Promise<{ success: boolean; message?: string }>;

  addSiteVisitV2: (
    data: Record<string, any>
  ) => Promise<{ success: boolean; message?: string }>;

  uploadFile: (file: File) => Promise<{
    success: boolean;
    message?: string;
    file?: UploadFile | null;
  }>;
  cancelBooking: (params: {
    // Add this
    id: string;
    remark?: string | null;
  }) => Promise<{ success: boolean; message?: string }>;


  addBrokerage: (
    data: Record<string, any>
  ) => Promise<{ success: boolean; message?: string }>;
};

//initial values should define here
const initialState: DataProviderState = {
  projects: [],
  slabsbyproject: null,
  testimonials: [],
  loadingTestimonial: false,
  fetchingMoreLeads: false,
  teamOverview: [],
  employees: [],
  searchLeadInfo: null,
  searchPostSaleLeadInfo: null,
  leadInfo: null,
  requirements: [],
  leads: null,
  postSaleleads: null,

  loadingLeads: false,
  loadingTask: false,

  loadingPostSaleLeads: false,

  siteInfo: null,
  visits: null,
  timer: null,
  dashCount: null,
  closingManagerAllGraph: null,
  salesDashCount: null,
  assignInfo: null,
  asssignFeedbackInfo: null,
  channelPartners: [],
  leadsTeamLeaderGraphForDT: [],
  leadsChannelPartnerGraphForDT: [],
  leadsFunnelGraphForDT: [],
  leadsLineGraphForDT: [],
  onboardTargetData: null,
  closingManager: [],
  myOverallTarget: null,
  projectTargets: [],
  loadingProjectTargets: false,
  ranking: null,
  leaveCount: null,
  currentLead: null,
  currentTask: null,
  dataEntryUsers: [],
  closingManagers: [],
  reportingToEmps: [],
  attOverview: null,
  attendanceList: [],
  estimatebyId: [],
  estimateAll: [],

  getProjects: async () => ({ success: false, message: "Not initialized" }),
  getSlabByProject: async () => ({ success: false, message: "Not initialized" }),
  getRequirements: async () => ({ success: false, message: "Not initialized" }),
  getRankingTurns: async () => ({ success: false, message: "Not initialized" }),

  getTestimonals: async () => ({ success: false, message: "Not initialized" }),
  getChannelPartners: async () => ({
    success: false,
    message: "Not initialized",
  }),
  fetchReportingToEmployees: async () => ({ success: false }),
  fetchSaleExecutiveLeads: async () => ({ success: false }),
  fetchTeamLeaderLeads: async () => ({ success: false }),
  fetchTeamLeaderReportingToLeads: async () => ({ success: false }),
  fetchPostSaleLeads: async () => ({ success: false }),

  fetchSearchLeads: async () => ({ success: false }),
  getAllData: async () => ({ success: false }),
  fetchDataAnalyzerVisits: async () => ({ success: false }),
  getSalesManagerDashBoardCount: async () => ({ success: false }),

  getAllGraph: async () => ({ success: false }),

  getSiteVisitHistoryByPhone: async () => ({
    success: false,
    message: "Not initialized",
  }),

  getClosingManagerDashBoardCount: async () => ({ success: false }),

  fetchAssignFeedbackLeads: async () => ({ success: false }),
  fetchAssignFeedbackLeadsCount: async () => ({ success: false }),
  addNewLead: async () => ({ success: false, message: "Not initialized" }),
  fetchTeamLeaderGraphForDA: async () => ({
    success: false,
    message: "Not initialized",
  }),
  fetchChannelPartnerGraphForDA: async () => ({
    // Add this
    success: false,
    message: "Not initialized",
  }),
  fetchFunnelGraphForDA: async () => ({
    // Add this
    success: false,
    message: "Not initialized",
  }),
  fetchLineGraphForDA: async () => ({
    // Add this
    success: false,
    message: "Not initialized",
  }),
  fetchOnboardTarget: async () => ({
    // Add this
    success: false,
    message: "Not initialized",
  }),
  // setLoadingTestimonial: () => {},

  //   setTheme: () => null,
  //   toggleTheme: () => null,
  getQuarterWiseTarget: async () => ({
    success: false,
    message: "Not initialized",
    data: undefined,
  }),

  getProjectTargets: async () => ({
    success: false,
    message: "Not initialized",
  }),

  getTeamOverview: async () => ({ success: false, message: "Not initialized" }),

  getShiftInfoByUserId: async () => ({
    success: false,
    message: "Not initialized",
  }),
  getLeadByBookingId: async () => ({
    success: false,
    message: "Not initialized",
  }),

  updateLeadDetails: async () => ({
    success: false,
    message: "Not initialized",
  }),

  getClosingManagers: async () => ({
    success: false,
    message: "Not initialized",
  }),

  getDataEntryEmployees: async () => ({
    success: false,
    message: "Not initialized",
  }),

  updateFeedbackWithTimer: async () => ({
    success: false,
    message: "Not initialized",
  }),

  getLeadById: async () => ({
    success: false,
    message: "Not initialized",
  }),

  getTaskById: async () => ({
    success: false,
    message: "Not initialized",
  }),
  getAttendanceOverview: async () => ({
    success: false,
    message: "Not initialized",
  }),
  getMyMonthlyAttendance: async () => ({
    success: false,
    message: "Not initialized",
  }),
  getTodayAttendance: async () => ({
    success: false,
    message: "Not initialized",
  }),
  assignTask: async () => ({
    success: false,
    message: "Not initialized",
  }),

  sendOtpSiteVisit: async () => ({
    success: false,
    message: "Not initialized",
  }),

  addSiteVisitV2: async () => ({
    success: false,
    message: "Not initialized",
  }),

  uploadFile: async () => ({
    success: false,
    message: "Not initialized",
  }),

  cancelBooking: async () => ({ success: false, message: "Not initialized" }),

  addBrokerage: async () => ({
    success: false,
    message: "Not initialized",
  }),
};

const dataProviderContext =
  React.createContext<DataProviderState>(initialState);

export function DataProvider({ children, ...props }: DataProviderProps) {
  const [projects, setProjects] = useState<OurProject[]>([]);
  const [slabsbyproject, setSlabsbyproject] = useState<SlabInfo  | null>(null);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [ranking, setRanking] = useState<RankingTurn | null>(null);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonial, setLoadingTestimonial] = useState<boolean>(false);
  const [loadingProject, setLoadingProject] = useState<boolean>(false);
  const [loadingRanking, setLoadingRanking] = useState<boolean>(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [teamOverview, setTeamReprotingTo] = useState<TeamInsight[]>([]);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [reportingToEmps, setReportingToEmployees] = useState<Employee[]>([]);

  const [loadingLeads, setLoadingLeads] = useState<boolean>(false);
  const [loadingTask, setLoadingTask] = useState<boolean>(false);

  const [estimatebyId, setEstimatebyId] = useState<EstimateGenerated[]>([]);
  const [loadingEstimatebyId, setLoadingEstimatebyId] =
    useState<boolean>(false);

  const [estimateAll, setEstimateAll] = useState<EstimateGenerated[]>([]);
const [loadingEstimateAll, setLoadingEstimateAll] = useState<boolean>(false);


  const [loadingPostSaleLeads, setLoadingPostSaleLeads] =
    useState<boolean>(false);

  const [fetchingMoreLeads, setFetchingMoreLeads] = useState<boolean>(false);
  const [fetchingMorePostSaleLeads, setFetchingPostSaleLeads] =
    useState<boolean>(false);

  const [myOverallTarget, setMyOverallTarget] = useState<OverallTarget | null>(
    null
  );
  const [leadInfo, setleadInfo] = useState<PaginationProps | null>(null);

  const [projectTargets, setProjectTargets] = useState<ProjectTargetData[]>([]);
  const [loadingProjectTargets, setLoadingProjectTargets] =
    useState<boolean>(false);

  const [searchLeadInfo, setSearchLeadInfo] = useState<PaginationProps | null>(
    null
  );

  const [searchPostSaleLeadInfo, setPostSaleLeadInfo] =
    useState<PaginationProps | null>(null);

  const [assignInfo, setAssignInfo] = useState<PaginationProps | null>(null);
  const [asssignFeedbackInfo, setAssignFeedbackInfo] =
    useState<TeamLeaderAssignFolloupUp | null>(null);

  const [closingManager, setTeamLeaders] = useState<PaginationProps[] | []>([]);

  const [closingManagerAllGraph, setAllGraphCount] =
    useState<ClosingManagerGraph | null>(null);

  const [dashCount, setDashboardCount] = useState<DashboardCount | null>(null);

  const [salesDashCount, setSalesDashCount] = useState<DashboardCount | null>(
    null
  );

  const [leads, setleads] = useState<Lead[]>([]);

  const [postSaleleads, setPostSaleLeads] = useState<PostSaleLead[]>([]);

  const [loadingVisits, setLoadingVisits] = useState<boolean>(false);
  const [fetchingMoreVisits, setFetchingMoreVisits] = useState<boolean>(false);
  const [siteInfo, setVisitInfo] = useState<PaginationProps | null>(null);
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [timer, setTimer] = useState<string | null>(null);

  const [loadingChannelPartners, setLoadingChannelPartners] =
    useState<boolean>(false);
  const [channelPartners, setChannelPartners] = useState<ChannelPartner[]>([]);
  const [leadsTeamLeaderGraphForDT, setChartData] = useState<ChartModel[]>([]);
  const [leadsChannelPartnerGraphForDT, setChannelPartnerChartData] = useState<
    ChartModel[]
  >([]);
  const [leadsFunnelGraphForDT, setFunnelChartData] = useState<ChartModel[]>(
    []
  );

  const [leadsLineGraphForDT, setLineChartData] = useState<ChartModel[]>([]);
  const [onboardTargetData, setOnboardTargetData] =
    useState<OnboardTarget | null>(null);

  const [leaveCount, setLeaveCount] = useState<EmployeeShiftInfoModel | null>(
    null
  );

  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  // const [otp, setSiteVisitOtp] = useState<Task | null>(null);
  const [dataEntryUsers, setDataEntryUsers] = useState<Employee[]>([]);
  const [closingManagers, setClosingManagers] = useState<Employee[]>([]);

  //get all estimates
  const getEstimateGenerated = async (
  teamLeader: string 
): Promise<{ success: boolean; message?: string }> => {
  setLoadingEstimateAll(true);
  setError("");

  try {
    let url = `/api/estimates`;
    if (teamLeader) {
      url += `?teamLeader=${teamLeader}`;
    }

    console.log("Fetching estimates:", url);

    const res = await fetchAdapter(url, {
      method: "GET",
    });

    // Expected structure: { data: [...] }
    const items = (res?.data) ?? [];

    setEstimateAll(items);
    setLoadingEstimateAll(false);

    return { success: true };
  } catch (err: any) {
    let errorMessage = "Something went wrong";

    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.message) {
      errorMessage = err.message;
    }

    if (errorMessage.trim().toLowerCase() === "null") {
      errorMessage = "Something went wrong";
    }

    setError(errorMessage);
    setLoadingEstimateAll(false);

    return { success: false, message: errorMessage };
  } finally {
    setLoadingEstimateAll(false);
  }
};



 const getEstimateGeneratedById = async (
  id: string
): Promise<{ success: boolean; data?: any[]; message?: string }> => {
  setLoadingEstimatebyId(true);
  setError("");

  try {
    let url = `/api/estimateGenerated-lead/${id}`;
    console.log("🔍 Fetching estimate by ID:", url);

    const res = await fetchAdapter(url, {
      method: "GET",
    });

    console.log("📦 Full API Response:", res);
    console.log("📦 Response data:", res.data);
    
    // Debug: Check the actual structure
    console.log("🔍 Checking response structure:");
    console.log("res.data:", res.data);
    console.log("res.data.data:", res.data?.data);
    console.log("res.data.data length:", res.data?.data?.length);
    
    // Extract data array from response - FIXED VERSION
    let items: any[] = [];
    
    // Try different possible response structures
    if (Array.isArray(res.data?.data)) {
      items = res.data.data;
      console.log("✅ Using res.data.data structure");
    } else if (Array.isArray(res.data)) {
      items = res.data;
      console.log("✅ Using res.data structure");
    } else if (Array.isArray(res)) {
      items = res;
      console.log("✅ Using res structure");
    } else {
      console.log("❌ No array found in expected locations");
      console.log("Available keys:", Object.keys(res));
      if (res.data) {
        console.log("res.data keys:", Object.keys(res.data));
      }
    }
    
    console.log("📊 Final extracted items:", items);
    
    let estimateGeneratedItems: any[] = [];
    if (items.length > 0) {
      estimateGeneratedItems = items;
      console.log("✅ Setting estimates:", estimateGeneratedItems.length, "items");
      console.log("✅ First estimate:", estimateGeneratedItems[0]);
    } else {
      console.log("❌ No estimates found after extraction");
    }

    setEstimatebyId(estimateGeneratedItems);
    setLoadingEstimatebyId(false);

    return { success: true, data: estimateGeneratedItems };
  } catch (err: any) {
    console.error("🚨 Error fetching estimates:", err);
    let errorMessage = "Something went wrong";

    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.message) {
      errorMessage = err.message;
    }

    setError(errorMessage);
    setLoadingEstimatebyId(false);

    return { success: false, message: errorMessage };
  } finally {
    setLoadingEstimatebyId(false);
  }
};

  const cancelBooking = async ({
    id = null,
    remark = null,
  }: CancelBookingParams): Promise<{ success: boolean; message?: string }> => {
    setLoading(true);
    setError("");

    try {
      let url = `/api/cancel-booking?id=${id}`;
      if (remark != null) {
        url += `&remark=${remark}`;
      }

      console.log(url);
      const res = await fetchAdapter(url, { method: "POST" });

      console.log(res);
      return { success: true };
    } catch (err: any) {
      const errorMsg = err?.message || "Something went wrong";
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const [attOverview, setAttOverview] = useState<AttOverview | null>(null);
  const [loadingAttOverview, setLoadingAttOverview] = useState<Boolean>(false);

  const [attendanceList, setAttendanceList] = useState<Attendance[]>([]);
  const [loadingAttendance, setLoadingAttendance] = useState<Boolean>(false);

  const updateFeedbackWithTimer = async (
    data: Record<string, any> = {}
  ): Promise<{
    success: boolean;
    message?: string;
    data?: Lead | null;
  }> => {
    try {
      console.log(" passed 1");

      const url = `/api/update-feedback-timer-v2`;
      const response = await fetchAdapter(url, {
        method: "POST",
        body: JSON.stringify(data),
      });

      console.log(response);
      console.log(" passed 2");

      const reqs = response?.data;
      setCurrentLead(reqs);

      setTimer(reqs);

      console.log("last end ");

      return { success: true };
    } catch (error: any) {
      console.log(error);
      let errorMessage = "Something went wrong";

      if (error.response) {
        // Backend response error message
        errorMessage = error.response?.data?.message || errorMessage;
      } else {
        errorMessage = error.message || errorMessage;
      }

      // Prevent literal 'null' from showing
      if (errorMessage.trim().toLowerCase() === "null") {
        errorMessage = "Something went wrong";
      }

      // showCustomSnackBar(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const getSiteVisitHistoryByPhone = async (
    phoneNumber: Number,
    altPhoneNumber?: Number
  ): Promise<{ success: boolean; message?: string }> => {
    setError("");

    try {
      const response = await fetchAdapter("/api/site-visits-by-phone", {
        method: "POST",
        body: JSON.stringify({ phoneNumber, altPhoneNumber }),
      });

      if (response?.code !== 200) {
        return { success: false, message: response?.message };
      }

      const reqs = response?.data || [];
      setVisits(reqs); // ✅ update state

      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || "Something went wrong";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const fetchOnboardTarget = async ({
    date = null,
  }: {
    date?: string | null;
  }): Promise<{ success: boolean; message?: string; data?: OnboardTarget }> => {
    setError("");

    try {
      let url = "/api/onboard-target";
      if (date != null) {
        url += `?date=${date}`;
      }

      // console.log("Fetching onboard target data from:", url);
      const res = await fetchAdapter(url, { method: "GET" });
      // console.log("Onboard target API response:", res);

      if (res?.data) {
        const targetData: OnboardTarget = {
          id: res.data._id || res.data.id,
          month: res.data.month ? parseInt(res.data.month) : undefined,
          year: res.data.year ? parseInt(res.data.year) : undefined,
          target: res.data.target ? parseInt(res.data.target) : 0,
          achieved: res.data.achieved ? parseInt(res.data.achieved) : 0,
          pending: res.data.pending ? parseInt(res.data.pending) : 0,
          date: res.data.date,
          onboards: res.data.onboards || [],
        };

        setOnboardTargetData(targetData);
        return { success: true, data: targetData };
      } else {
        return { success: false, message: "No data received" };
      }
    } catch (err: any) {
      const message = String(err);
      setError(message);
      return { success: false, message };
    }
  };

  const getProjectTargets = async (
    id: string,
    quarter?: number | null,
    year?: number | null
  ): Promise<{ success: boolean; message?: string }> => {
    setLoadingProjectTargets(true);
    setError("");

    try {
      // First get the overall target data using your existing function
      const targetResult = await getQuarterWiseTarget(id, quarter, year);

      if (!targetResult.success || !targetResult.data) {
        return {
          success: false,
          message: targetResult.message || "Failed to fetch target data",
        };
      }

      const overallTarget = targetResult.data;

      // Transform the projectWise data into the format needed for ProjectTargetsCarousel
      const transformedProjects: ProjectTargetData[] =
        overallTarget.projectWise?.map((project) => {
          // Adjust the property names based on your actual API response structure
          const projectName =
            (project.projectId as any)?.projectName ||
            (project.projectId as any)?.name ||
            "Unknown Project";

          return {
            projectName: projectName,
            metrics: [
              { label: "Target", count: project.target || 0 },
              { label: "Booking", count: project.booking || 0 },
              { label: "Registration", count: project.registration || 0 },
            ],
          };
        }) || [];

      setProjectTargets(transformedProjects);
      return { success: true };
    } catch (err: any) {
      // console.log("Error fetching project targets:", err);
      let errorMessage = "Something went wrong";

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      if (errorMessage.trim().toLowerCase() === "null") {
        errorMessage = "Something went wrong";
      }

      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoadingProjectTargets(false);
    }
  };

  const getQuarterWiseTarget = async (
    id: string,
    quarter?: number | null,
    year?: number | null
  ): Promise<{ success: boolean; message?: string; data?: OverallTarget }> => {
    setLoading(true);
    setError("");

    try {
      let url = `/api/revised-my-target/${id}`;
      const queryParams = new URLSearchParams();

      if (year) queryParams.append("year", year.toString());
      if (quarter) queryParams.append("quarter", quarter.toString());

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }

      // console.log("Fetching quarter-wise target from:", url);

      const res = await fetchAdapter(url, {
        method: "GET",
      });

      if (res?.code !== 200) {
        return {
          success: false,
          message: res?.message || "Failed to fetch target",
        };
      }

      const parsedTarget = res.data as OverallTarget;
      setMyOverallTarget(parsedTarget);

      // console.log("Quarter-wise target:", parsedTarget);
      return { success: true, data: parsedTarget };
    } catch (err: any) {
      // console.log(err);
      let errorMessage = "Something went wrong";

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      // Prevent literal 'null' from showing
      if (errorMessage.trim().toLowerCase() === "null") {
        errorMessage = "Something went wrong";
      }

      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getProjects = async () => {
    setLoadingProject(true);
    setError("");

    try {
      const url = `/api/ourProjects`;
      const res = await fetchAdapter(url, {
        method: "get",
      });

      // console.log(res?.data);
      setProjects(res?.data ?? []);
      setLoadingProject(false);

      return { success: true };
    } catch (err: any) {
      // console.log(err);
      setError(err.message);
      setLoadingProject(false);

      return { success: false, message: err.message };
    } finally {
      setLoadingProject(false);
    }
  };

   const getSlabByProject = async (project: string) => {
    setLoading(true);
    setError("");

    try {
      console.log("slab 1");
      const url = `/api/get-slab-by-project/${project}`;
      console.log("slab 2");
      const res = await fetchAdapter(url, {
        method: "get",
      });
      console.log("slab 3");


      const data = res?.data;
      console.log("slab 4",data);

      if (!data) {
        return { success: false, message: "No data found" };
      }
      console.log("slab 5");

      const info: SlabInfo  = data;
      setSlabsbyproject(info);

      return { success: true };
    } catch (err: any) {
      const message = err?.response?.data?.message || err.message || "Error";
      console.log("slab 6");


      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  //requirement
  const getRequirements = async () => {
    setLoadingProject(true);
    setError("");

    try {
      const url = `/api/requirements`;
      const res = await fetchAdapter(url, {
        method: "get",
      });
      const reqs = res?.data?.map((ele: any) => ele?.requirement);
      setRequirements(reqs ?? []);
      setLoadingProject(false);

      return { success: true };
    } catch (err: any) {
      // console.log(err);
      setError(err.message);
      setLoadingProject(false);

      return { success: false, message: err.message };
    } finally {
      setLoadingProject(false);
    }
  };

  const getTeamOverview = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const url = `/api/team-insight-reporting-to/${id}`;

      // console.log("📡 Making API request to:", url);
      const res = await fetchAdapter(url, { method: "GET" });

      // console.log("✅ API Response received:", res);
      // console.log("📊 Response data:", res?.data);
      // console.log("🔍 Data type:", typeof res?.data);
      // console.log("🔍 Is array?", Array.isArray(res?.data));

      if (res?.data && Array.isArray(res?.data)) {
        // console.log("🎯 Number of teams:", res.data.length);
        // console.log("👥 First team sample:", res.data[0]);

        const teams = res.data.map((team: any) => ({
          _id: team._id || null,
          teamName: team.teamName || null,
          reportingTo: team.reportingTo || null,
          crew: team.crew || [],
          totalTasks: team.totalTasks || 0,
        }));

        // console.log("🏷️ Processed teams:", teams);
        setTeamReprotingTo(teams);
      } else {
        // console.log("❌ No data or data is not an array");
        setTeamReprotingTo([]);
      }

      setLoadingProject(false);
      return { success: true };
    } catch (err: any) {
      // console.log("❌ API Error:", err);
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
      const url = `/api/testimonial`;
      const res = await fetchAdapter(url, {
        method: "get",
      });

      setTestimonials(res?.data);
      setLoadingTestimonial(false);
      // console.log(res?.data);
      return { success: true };
    } catch (err: any) {
      // console.log(err);
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
      const url = `/api/channel-partner`;
      const res = await fetchAdapter(url, {
        method: "get",
      });

      setChannelPartners(res?.data ?? []);
      setLoadingChannelPartners(false);

      return { success: true };
    } catch (err: any) {
      // console.log(err);
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
      const url = `/api/leads-add`;

      // console.log(url);
      const res = await fetchAdapter(url, {
        method: "POST",
        body: JSON.stringify(data),
      });

      setLoading(false);

      return { success: true, message: res?.message };
    } catch (err: any) {
      // console.log(err);
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
      setReportingToEmployees(res?.data);
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
      // console.log(url);
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

  //team -leader
  const fetchTeamLeaderLeads = async ({
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
    interval = null,

    propertyType = null,
  }: FetchTeamLeaderParams): Promise<{
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
      let url = `/api/leads-team-leader/${id}?query=${query}&page=${page}&limit=${limit}`;
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

      if (interval != null) {
        url += "&interval=$interval";
      }

      if (propertyType != null) {
        url += "&propertyType=$propertyType";
      }
      // console.log(url);
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
      // console.log("Fetching dashboard count from:", url);

      const res = await fetchAdapter(url, {
        method: "GET",
      });

      // Assuming your fetchAdapter returns { data, status, message }
      const dashboardData = res.data as DashboardCount;

      // console.log("Lead info:", dashboardData.lead);
      setSalesDashCount(dashboardData);

      return { success: true };
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      return { success: false, message: err.message };
    }
  };

  const getAllGraph = async ({
    interval = null,
    startDate = null,
    endDate = null,
  }: {
    interval?: string | null;
    startDate?: string | null;
    endDate?: string | null;
  } = {}): Promise<{ success: boolean; message?: string }> => {
    setError("");

    try {
      let url = "/api/leads-graph";
      const queryParams = new URLSearchParams();

      if (interval) {
        queryParams.append("interval", interval);
      }
      if (startDate) {
        queryParams.append("startDate", startDate);
      }
      if (endDate) {
        queryParams.append("endDate", endDate);
      }

      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      console.log("Fetching graph data from:", url);

      const res = await fetchAdapter(url, {
        method: "GET",
      });

      // console.log("Graph API response:", res);

      // Check if the response structure matches your Flutter code
      if (res?.code !== 200) {
        const errorMessage = res?.message || "Failed to fetch graph data";
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }

      // The graph data should be in res.data according to your Flutter code
      // console.log(res.data);
      const graphData = res.data as ClosingManagerGraph;
      setAllGraphCount(graphData);

      return { success: true };
    } catch (err: any) {
      // console.log(err);

      let errorMessage = "Something went wrong";

      if (err.response) {
        // Backend response error message
        errorMessage = err.response?.data?.message || errorMessage;
      } else {
        // Other types of errors (network, etc.)
        errorMessage = err.message || errorMessage;
      }

      // Prevent literal 'null' from showing
      if (errorMessage.trim().toLowerCase() === "null") {
        errorMessage = "Something went wrong";
      }

      setError(errorMessage);
      return { success: false, message: errorMessage };
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
      // console.log("Fetching dashboard count from:", url);

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

      // console.log(url);
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
    propertyType = null,
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
      if (propertyType != null) {
        url += `&propertyType=${propertyType}`;
      }

      // console.log(url);
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

  // assign / feedback pending...hold
  const fetchAssignFeedbackLeads = async ({
    query = "",
    page = 1,
    limit = 10,
    status = null,
  }: AssignParms): Promise<{ success: boolean; message?: string }> => {
    if (page === 1) {
      setLoadingLeads(true);
    } else {
      setFetchingMoreLeads(true);
    }
    setError("");

    try {
      let url = `/api/leads-assign-feedback?query=${query}&page=${page}&limit=${limit}`;
      if (status) {
        url += `&status=${status}`;
      }

      // console.log(url);
      const res = await fetchAdapter(url, {
        method: "GET",
      });
      const { data, ...withoutData } = res;

      setAssignInfo(data);
      if (page > 1) {
        setleads((prev) => [...prev, ...res?.data]);
      } else {
        setleads(res?.data ?? []);
      }
      // console.log(res);
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

      // console.log("Fetching assign count from hjbhbhjb:", url);

      const res = await fetchAdapter(url, {
        method: "GET",
      });

      if (res?.data) {
        setAssignFeedbackInfo(res.data);
      }
      //  else {
      //   setAssignFeedbackInfo(res.data);
      // }

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
      // console.error(
      //   "Error fetching assign feedback count:",
      //   err.message || err
      // );

      setError(err.message || "Something went wrong");
      // setFetchingMoreLeads(false);
      // setLoadingLeads(false);

      return { success: false, message: err.message };
    } finally {
      // setFetchingMoreLeads(false);
      // setLoadingLeads(false);
    }
  };

  const fetchPostSaleLeads = async ({
    query = "",
    page = 1,
    limit = 10,
    project = null,
    status = null,
    closingManager = null,
    date = null,
    startDate = null,
    endDate = null,
  }: FetchPostSaleLeadParams): Promise<{
    success: boolean;
    message?: string;
  }> => {
    if (page === 1) {
      setLoadingPostSaleLeads(true);
    } else {
      setFetchingPostSaleLeads(true);
    }
    setError("");

    try {
      let url = `/api/post-sale-leads?query=${query}&page=${page}&limit=${limit}`;

      if (project) url += `&project=${project}`;
      if (status) url += `&status=${status}`;
      if (closingManager) url += `&closingManager=${closingManager}`;
      if (date) url += `&date=${date}`;
      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;

      console.log("API URL:", url);

      const res = await fetchAdapter(url, { method: "GET" });

      const { data, ...paginationInfo } = res as PaginationProps;

      setPostSaleLeadInfo(paginationInfo);

      if (page > 1) {
        setPostSaleLeads((prev) => [...prev, ...(data ?? [])]);
      } else {
        setPostSaleLeads(data ?? []);
      }

      setFetchingPostSaleLeads(false);
      setLoadingPostSaleLeads(false);

      return { success: true };
    } catch (err: any) {
      // console.error("Fetch Error =>", err.message);
      setError(err?.message);
      return { success: false, message: err.message };
    } finally {
      setFetchingPostSaleLeads(false);

      setLoadingPostSaleLeads(false);
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
    propertyType = null,
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
      if (propertyType != null) {
        url += `&propertyType=${propertyType}`;
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
      // console.log(url);
      const res = await fetchAdapter(url, {
        method: "GET",
      });
      const { data, ...withoutData } = res as PaginationProps;
      // console.log("url", url);

      // console.log(data);
      setSearchLeadInfo(withoutData);
      if (page > 1) {
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

  const getAllData = async ({
    query = "",
    page = 1,
    limit = 20,
    status = null,
    interval = null,
    startDate = null,
    endDate = null,
    teamLeader = null,
  }: AllLeadParms): Promise<{ success: boolean; message?: string }> => {
    if (page === 1) {
      setLoadingLeads(true);
    } else {
      setFetchingMoreLeads(true);
    }
    setError("");

    try {
      let url = `/api/leads-data?query=${query}&page=${page}&limit=${limit}`;
      if (status != null) {
        url += `&status=${status}`;
      }
      if (interval != null) {
        url += `&interval=${interval}`;
      }
      if (startDate != null) {
        url += `&startDate=${startDate}`;
      }
      if (endDate != null) {
        url += `&endDate=${endDate}`;
      }
      if (teamLeader != null) {
        url += `&teamLeader=${teamLeader}`;
      }
      // console.log(url);
      const res = await fetchAdapter(url, {
        method: "GET",
      });
      const { data, ...withoutData } = res as PaginationProps;
      // console.log("url", url);

      // console.log(data);
      setSearchLeadInfo(withoutData);
      setLoadingLeads(false);

      return { success: true };
    } catch (err: any) {
      setError(err.message);
      setLoadingLeads(false);

      return { success: false, message: err.message };
    } finally {
      setFetchingMoreLeads(false);
      setLoadingLeads(false);
    }
  };

  const updateLeadDetails = async (
    id: string,
    data: Record<string, any> = {}
  ): Promise<{
    success: boolean;
    message?: string;
    data?: Lead | null;
  }> => {
    setLoading(true);
    setError("");

    try {
      console.log("test1");
      const url = `/api/lead-update-details/${id}`;
      console.log("test1");

      const res = await fetchAdapter(url, {
        method: "POST",
        body: JSON.stringify(data),
      });

      console.log(res);
      // The API is assumed to return something like:
      // { data: Lead, message, code }
      setCurrentLead(res?.data as Lead);
      setLoading(false);

      return { success: true };
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setLoading(false);

      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const assignTask = async (
    id: string,
    data: Record<string, any> = {}
  ): Promise<{
    success: boolean;
    message?: string;
    data?: Task | null;
  }> => {
    setLoadingTask(true);
    setError("");

    try {
      console.log("test1");
      const url = `/api/assign-task/${id}`;
      console.log("test1");

      const res = await fetchAdapter(url, {
        method: "POST",
        body: JSON.stringify(data),
      });

      console.log(res);
      // The API is assumed to return something like:
      // { data: Lead, message, code }
      setCurrentTask(res?.data as Task);
      setLoadingTask(false);

      return { success: true };
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setLoadingTask(false);

      return { success: false, message: err.message };
    } finally {
      setLoadingTask(false);
    }
  };

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
      if (year != null) {
        url += `&year=${year}`;
      }
      if (month != null) {
        url += `&month=${month}`;
      }
      if (startDate != null) {
        url += `&startDate=${startDate}`;
      }
      if (endDate != null) {
        url += `&endDate=${endDate}`;
      }

      // console.log("Fetching dashboard count from:", url);

      const res = await fetchAdapter(url, { method: "GET" });
      // console.log("res", res);
      setChartData(res?.data ?? []);

      return { success: true };
    } catch (err: any) {
      const message = String(err);
      setError(message);
      return { success: false, message };
    }
  };

  const fetchChannelPartnerGraphForDA = async ({
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
      let url = `/api/lead-count-channel-partners?interval=${interval}`;
      if (year != null) {
        url += `&year=${year}`;
      }
      if (month != null) {
        url += `&month=${month}`;
      }
      if (startDate != null) {
        url += `&startDate=${startDate}`;
      }
      if (endDate != null) {
        url += `&endDate=${endDate}`;
      }

      // console.log("Fetching channel partner data from:", url);
      const res = await fetchAdapter(url, { method: "GET" });
      // console.log("Channel partner API response:", res);

      // Set the channel partner data
      setChannelPartnerChartData(res?.data ?? []);

      return { success: true };
    } catch (err: any) {
      const message = String(err);
      setError(message);
      return { success: false, message };
    }
  };

  const fetchFunnelGraphForDA = async ({
    interval = "yearly",
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
      let url = `/api/lead-count-funnel?interval=${interval}`;
      if (year != null) {
        url += `&year=${year}`;
      }
      if (month != null) {
        url += `&month=${month}`;
      }
      if (startDate != null) {
        url += `&startDate=${startDate}`;
      }
      if (endDate != null) {
        url += `&endDate=${endDate}`;
      }

      // console.log("Fetching funnel data from:", url);
      const res = await fetchAdapter(url, { method: "GET" });
      // console.log("Funnel API response:", res);

      // Set the funnel data
      setFunnelChartData(res?.data ?? []);

      return { success: true };
    } catch (err: any) {
      const message = String(err);
      setError(message);
      return { success: false, message };
    }
  };

  const fetchLineGraphForDA = async ({
    interval = "monthly",
    year = null,
    startDate = null,
    endDate = null,
  }: {
    interval?: string | null;
    year?: number | null;
    startDate?: string | null;
    endDate?: string | null;
  }): Promise<{ success: boolean; message?: string }> => {
    setError("");

    try {
      let url = `/api/lead-count?interval=${interval}`;
      if (year != null) {
        url += `&year=${year}`;
      }
      if (startDate != null) {
        url += `&startDate=${startDate}`;
      }
      if (endDate != null) {
        url += `&endDate=${endDate}`;
      }

      // console.log("Fetching line chart data from:", url);
      const res = await fetchAdapter(url, { method: "GET" });
      // console.log("Line chart API response:", res);

      // Set the line chart data
      setLineChartData(res?.data ?? []);

      return { success: true };
    } catch (err: any) {
      const message = String(err);
      setError(message);
      return { success: false, message };
    }
  };

  //ranking turns
  const getRankingTurns = async () => {
    setLoadingRanking(true);
    setError("");
    console.log("calling this 1");
    try {
      const url = `/api/turn-ranking`;
      const res = await fetchAdapter(url, {
        method: "get",
      });
      console.log(url);

      // console.log(res?.data);

      const data = res?.data;
      setRanking(data);
      setLoadingRanking(false);

      return { success: true };
    } catch (err: any) {
      // console.log(err);
      setError(err.message);
      setLoadingRanking(false);

      return { success: false, message: err.message };
    } finally {
      setLoadingRanking(false);
    }
  };

  const getShiftInfoByUserId = async (
    id: string
  ): Promise<{
    success: boolean;
    message?: string;
    data?: EmployeeShiftInfoModel | null;
  }> => {
    setLoading(true);
    setError("");

    try {
      const response = await fetchAdapter(`/api/shift-info-by-user-id/${id}`, {
        method: "GET",
      });

      // Your API structure: { data: {...} }
      const data = response?.data;

      console.log(data);

      if (response?.code !== 200) {
        return {
          success: false,
          message: response?.message || "Failed to fetch target",
        };
      }

      const parsedTarget = data as EmployeeShiftInfoModel;
      setLeaveCount(parsedTarget);
      return { success: true, data: parsedTarget };
    } catch (err: any) {
      let errorMessage = "Something went wrong";

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      // Prevent literal 'null' from showing
      if (errorMessage.trim().toLowerCase() === "null") {
        errorMessage = "Something went wrong";
      }

      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getLeadByBookingId = async (
    id: string
  ): Promise<{
    success: boolean;
    message?: string;
    data?: Lead | null;
  }> => {
    console.log("lead by");
    setLoading(true);
    setError("");
    console.log(`/api/lead-by-booking/${id}`);
    try {
      const response = await fetchAdapter(`/api/lead-by-booking/${id}`, {
        method: "GET",
      });

      // Your API structure: { data: {...} }
      const data = response?.data;

      console.log(data);

      if (response?.code !== 200) {
        return {
          success: false,
          message: response?.message || "Failed to fetch target",
        };
      }

      const parsedTarget = data as Lead;
      setCurrentLead(parsedTarget);
      return { success: true, data: parsedTarget };
    } catch (err: any) {
      let errorMessage = "Something went wrong";

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      // Prevent literal 'null' from showing
      if (errorMessage.trim().toLowerCase() === "null") {
        errorMessage = "Something went wrong";
      }

      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getDataEntryEmployees = async (): Promise<{
    success: boolean;
    message?: string;
  }> => {
    try {
      const url = `/api/employee-visit-allowed-staff`;

      const res = await fetchAdapter(url, {
        method: "GET",
      });

      if (res?.data) {
        setDataEntryUsers(res.data ?? []);
      }

      return { success: true };
    } catch (err: any) {
      let errorMessage = "Something went wrong";

      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      if (errorMessage.trim().toLowerCase() === "null") {
        errorMessage = "Something went wrong";
      }

      console.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const getClosingManagers = async (): Promise<{
    success: boolean;
    message?: string;
  }> => {
    try {
      const url = `/api/employee-closing-manager`;

      const res = await fetchAdapter(url, {
        method: "GET",
      });

      if (res?.data) {
        setClosingManagers(res.data ?? []);
      }

      return { success: true };
    } catch (err: any) {
      let errorMessage = "Something went wrong";

      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      if (errorMessage.trim().toLowerCase() === "null") {
        errorMessage = "Something went wrong";
      }

      console.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const getLeadById = async (
    id: string
  ): Promise<{ success: boolean; message?: string }> => {
    setLoadingLeads(true);
    setError("");

    try {
      const url = `/api/lead/${id}`;
      const res = await fetchAdapter(url, {
        method: "GET",
      });

      // Assuming res.data is your lead object type
      setCurrentLead(res?.data);

      return { success: true };
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch lead";

      setError(message);

      return { success: false, message };
    } finally {
      setLoadingLeads(false);
    }
  };

  const getTaskById = async (
    id: string
  ): Promise<{ success: boolean; message?: string; data?: Task | null }> => {
    setLoadingTask(true);
    setError("");

    try {
      const url = `/api/task-by-id/${id}`;
      const res = await fetchAdapter(url, {
        method: "GET",
      });

      const task = res?.data as Task;
      setCurrentTask(task);

      return { success: true, data: task };
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch task";

      setError(message);

      return { success: false, message, data: null };
    } finally {
      setLoadingTask(false);
    }
  };


const getAttendanceOverview = async (
    id: string,
    date?: string
  ): Promise<{
    success: boolean;
    message?: string;
    data?: AttOverview | null;
  }> => {
    setLoadingAttOverview(true);
    setError("");

    try {
      let url = `/api/monthly-attendance-overview/${id}`;
      if (date != null) {
        url += `?date=${date}`;
      }
      const res = await fetchAdapter(url, {
        method: "GET",
      });

      const dta = res?.data;
      console.log(dta);
      setAttOverview(dta);

      return { success: true, data: dta };
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch attendance overview";

      setError(message);

      return { success: false, message, data: null };
    } finally {
      setLoadingAttOverview(false);
    }
  };

const getMyMonthlyAttendance = async (
    id: string,
    date?: string
  ): Promise<{
    success: boolean;
    message?: string;
    data?: Attendance[];
  }> => {
    setLoadingAttendance(true);
    setError("");

    try {
      let url = `/api/attendance/${id}`;
      if (date != null) {
        url += `?date=${date}`;
      }
      const res = await fetchAdapter(url, {
        method: "GET",
      });

      const dta = res?.data;
      console.log(dta);
      setAttendanceList(dta);

      return { success: true, data: dta };
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch attendance list";

      setError(message);

      return { success: false, message, data: [] };
    } finally {
      setLoadingAttendance(false);
    }
  };

  const sendOtpSiteVisit = async (
    data: Record<string, any>
  ): Promise<{ success: boolean; message?: string; data?: Otp | null }> => {
    setLoadingTask(true);
    setError("");

    try {
      const url = `/api/site-visit-generate-otp`;
      const res = await fetchAdapter(url, {
        method: "POST",
        body: JSON.stringify(data),
      });

      console.log(res);
      const otp = res?.data;

      console.log("otp", otp);
      // setCurrentTask(task);

      return { success: true, data: otp };
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch task";

      setError(message);

      return { success: false, message, data: null };
    } finally {
      setLoadingTask(false);
    }
  };



  const addSiteVisitV2 = async (
    data: Record<string, any>
  ): Promise<{
    success: boolean;
    message?: string;
    data?: SiteVisit | null;
  }> => {
    setLoadingTask(true);
    setError("");

    try {
      const url = `/api/site-visit-add-v2`;
      const res = await fetchAdapter(url, {
        method: "POST",
        body: JSON.stringify(data),
      });

      console.log(res);
      const otp = res?.data;

      console.log("otp", otp);
      // setCurrentTask(task);

      return { success: true, data: otp };
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch task";

      setError(message);

      return { success: false, message, data: null };
    } finally {
      setLoadingTask(false);
    }
  };



const uploadFile = async (
    file: File
  ): Promise<{
    success: boolean;
    message?: string;
    file?: UploadFile | null;
  }> => {
    try {
      console.log("initial pass 1");
      const formData = new FormData();
      formData.append("file", file, file.name);

      console.log("initial pass 2");

      const response = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
        headers: {
          "x-platform": "web",
        },
      });

      console.log("initial pass 3");

      // Check if the response is OK (status in the range 200-299)
      if (!response.ok) {
        // Try to get the error message from the response
        let errorMessage = "Upload failed";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, use the status text
          errorMessage = response.statusText;
        }
        throw new Error(errorMessage);
      }

      // Parse the response as JSON
      const data = await response.json();
      return {
        success: true,
        file: data,
      };
    } catch (error: any) {
      let errorMessage = "Something went wrong";

      if (error?.message) {
        errorMessage = error.message;
      }

      if (errorMessage.trim().toLowerCase() === "null") {
        errorMessage = "Something went wrong";
      }

      console.error("Upload error:", errorMessage);
      return {
        success: false,
        message: errorMessage,
        file: null,
      };
    }
  };


 const getTodayAttendance = async ({
    date,
    filter,
    startDate,
    endDate,
  }: {
    date?: string;
    filter?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<{
    success: boolean;
    message?: string;
    data?: Attendance[];
  }> => {
    setLoadingAttendance(true);
    setError("");

    try {
      const nwDate = !date ? new Date().toISOString() : date;
      let url = `/api/get-check-in-by-date?date=${nwDate}`;
      if (filter != null) {
        url += `?filter=${filter}`;
      }
      if (startDate != null) {
        url += `?startDate=${startDate}`;
      }

      if (endDate != null) {
        url += `?endDate=${endDate}`;
      }

      const res = await fetchAdapter(url, {
        method: "GET",
      });

      const dta = res?.data;
      console.log(dta);
      setAttendanceList(dta);

      return { success: true, data: dta };
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch attendance list";

      setError(message);

      return { success: false, message, data: [] };
    } finally {
      setLoadingAttendance(false);
    }
  };


const addBrokerage = async (
    data: Record<string, any>
  ): Promise<{
    success: boolean;
    message?: string;
    data?: BrokerageCalculationData | null;
  }> => {
    setLoading(true);
    setError("");

    try {
      const url = `/api/add-brokerage`;
      const res = await fetchAdapter(url, {
        method: "POST",
        body: JSON.stringify(data),
      });

      console.log(res);
      const resp = res?.data;

      console.log("resp", resp);
      // setCurrentTask(task);

      return { success: true, data: resp };
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch task";

      setError(message);

      return { success: false, message, data: null };
    } finally {
      setLoading(false);
    }
  };

const value = {
    projects: projects,
    slabsbyproject: slabsbyproject,
    testimonials: testimonials,
    loadingTestimonial: loadingTestimonial,
    loadingLeads: loadingLeads,
    loadingTask: loadingTask,

    loadingPostSaleLeads: loadingPostSaleLeads,

    employees: employees,
    leadInfo: leadInfo,
    dashCount: dashCount,
    closingManagerAllGraph: closingManagerAllGraph,
    siteInfo: siteInfo,
    visits: visits,
    timer: timer,
    leads: leads,
    postSaleleads: postSaleleads,
    teamOverview: teamOverview,
    fetchingMoreLeads: fetchingMoreLeads,
    assignInfo: assignInfo,
    searchLeadInfo: searchLeadInfo,
    searchPostSaleLeadInfo: searchPostSaleLeadInfo,
    requirements: requirements,
    channelPartners: channelPartners,
    leadsTeamLeaderGraphForDT: leadsTeamLeaderGraphForDT,
    leadsChannelPartnerGraphForDT: leadsChannelPartnerGraphForDT,
    leadsFunnelGraphForDT: leadsFunnelGraphForDT,
    leadsLineGraphForDT: leadsLineGraphForDT,
    onboardTargetData: onboardTargetData,
    closingManager: closingManager,
    asssignFeedbackInfo: asssignFeedbackInfo,
    myOverallTarget: myOverallTarget,
    projectTargets: projectTargets,

    loadingProjectTargets: loadingProjectTargets,
    salesDashCount: salesDashCount,
    ranking: ranking,
    leaveCount: leaveCount,
    currentLead: currentLead,
    dataEntryUsers: dataEntryUsers,
    closingManagers: closingManagers, //list of closing manager
    reportingToEmps: reportingToEmps,
    currentTask: currentTask,
    attOverview: attOverview,
    attendanceList: attendanceList,
    estimatebyId: estimatebyId,
    estimateAll: estimateAll,
    getProjectTargets: getProjectTargets,
    getProjects: getProjects,
    getSlabByProject: getSlabByProject, 
    getEstimateGeneratedById: getEstimateGeneratedById,
    getEstimateGenerated: getEstimateGenerated,
    getRequirements: getRequirements,
    getTestimonals: getTestimonals,
    setLoadingTestimonial: setLoadingTestimonial,
    getClosingManagers: getClosingManagers,
    fetchReportingToEmployees: fetchReportingToEmployees,
    fetchSaleExecutiveLeads: fetchSaleExecutiveLeads,
    fetchTeamLeaderLeads: fetchTeamLeaderLeads,
    fetchDataAnalyzerVisits: fetchDataAnalyzerVisits,
    fetchTeamLeaderReportingToLeads: fetchTeamLeaderReportingToLeads,
    getSalesManagerDashBoardCount: getSalesManagerDashBoardCount,
    fetchAssignFeedbackLeads: fetchAssignFeedbackLeads,
    fetchPostSaleLeads: fetchPostSaleLeads,
    fetchSearchLeads: fetchSearchLeads,
    getAllData: getAllData,
    fetchAssignFeedbackLeadsCount: fetchAssignFeedbackLeadsCount,
    getChannelPartners: getChannelPartners,
    getTeamOverview: getTeamOverview,
    addNewLead: addNewLead,
    fetchTeamLeaderGraphForDA: fetchTeamLeaderGraphForDA,
    fetchChannelPartnerGraphForDA: fetchChannelPartnerGraphForDA,
    fetchFunnelGraphForDA: fetchFunnelGraphForDA,
    fetchLineGraphForDA: fetchLineGraphForDA,
    fetchOnboardTarget: fetchOnboardTarget,
    getAllGraph: getAllGraph,
    getSiteVisitHistoryByPhone: getSiteVisitHistoryByPhone,
    getClosingManagerDashBoardCount: getClosingManagerDashBoardCount,
    getQuarterWiseTarget: getQuarterWiseTarget,
    getRankingTurns: getRankingTurns,
    getShiftInfoByUserId: getShiftInfoByUserId,
    getLeadByBookingId: getLeadByBookingId,
    updateLeadDetails: updateLeadDetails,
    getDataEntryEmployees: getDataEntryEmployees,
    updateFeedbackWithTimer: updateFeedbackWithTimer,
    getLeadById: getLeadById,
    getTaskById: getTaskById,
    assignTask: assignTask,
    sendOtpSiteVisit: sendOtpSiteVisit,
    addSiteVisitV2: addSiteVisitV2,
    uploadFile: uploadFile,
    cancelBooking: cancelBooking,
    getAttendanceOverview: getAttendanceOverview,
    getMyMonthlyAttendance: getMyMonthlyAttendance,
    getTodayAttendance: getTodayAttendance,
addBrokerage:addBrokerage
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
