interface OurProject {
  _id?: string | null;
  showCaseImage?: string | null;
  name?: string | null;
  locationName?: string | null;
  logo?: string | null;
  brochure?: string | null;
  amenities?: Amenity[] | [];
  logo?: string | null;
  description?: string | null;
  carouselImages?: string[] | [];
  contactNumber?: Number | null;
  countryCode?: string | null;
  locationLink?: string | null;
  countryCode?: string | null;
  configurations?: Configuration[] | [];
  shareLink?: string | null;
  address?: string | null;
  shortCode?: string | null;
  showCaseImageLandscape?: string | null;
}

interface Amenity {
  _id?: string | null;
  image?: string | null;
  name?: string | null;
}

interface Configuration {
  carpetArea?: string | null;
  configuration?: string | null;
  image?: string | null;
  price?: string | null;
  reraId?: string | null;
}

interface Testimonial {
  _id?: string | null;
  title?: string | null;
  description?: string | null;
  like?: Number | null;
  dislike?: Number | null;
  videoUrl?: string | null;
  thumbnail?: string | null;
  shareLink?: string | null;
  project?: OurProject;
  date?: string | null;
  views?: Number | null;
}

//employee
interface Employee {
  _id?: string | null;
  prefix?: string | null;
  email?: string | null;
  profilePic?: string | null;
  employeeId?: string | null;
  password?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  gender?: string | null;
  joiningDate?: Date | null;
  dateOfBirth?: Date | null;
  leavedDate?: Date | null;
  address?: string | null;
  bloodGroup?: string | null;
  maritalStatus?: string | null;
  department?: string | Department;
  designation?: Designation;
  division?: Division;
  reportingTo?: Employee;
  phoneNumber?: Number | null;
  status?: string | null;
  remark?: string | null;
  refreshToken: string | null;
}

interface Department {
  _id?: string | null;
  department: string | null;
}

interface Designation {
  _id?: string | null;
  designation?: string | null;
}

interface Division {
  _id?: string | null;
  division: string | null;
  location: string | null;
  name: string | null;
  latitude: Number | null;
  longitude: Number | null;
  radius: Number | null;
}

//lead model
interface CallNote {
  _id?: string;
  note: string | null;
  date: string; // ISO date string
  channelPartner: string | null;
}

interface CallHistory {
  _id?: string;
  caller: string | null;
  callDate: string;
  document: string | null;
  recording: string | null;
  remark: string | null;
  feedback: string | null;
  stage: string | null;
  interestedStatus: string | null;
  tag: string | null;
  interestedVisit: boolean | null;
  reminderType: string | null;
  notes: CallNote[];
  edited: boolean | null;
}

interface Cycle {
  _id?: string;
  stage: string | null;
  currentOrder: number;
  currentDays: number;
  teamLeader: string | null;
  startDate: Date | null;
  validTill: Date | null;
  internalDeadline: string | null;
  internalDate: string | null;
  internalCallDone: boolean | null;
  nextTeamLeader: string | null;
}

interface Approval {
  _id?: string;
  employee: string;
  approvedAt: string;
  remark: string | null;
}

interface Update {
  _id?: string;
  employee: string;
  updatedAt: string;
  changes: string;
  remark: string | null;
}

interface Lost {
  _id?: string;
  employee: string;
  date: string;
  remark: string | null;
}

interface ChannelPartnerHistory {
  _id?: string;
  channelPartner: string;
  status: string | null;
  stage: string | null;
  date: string | null;
  startDate: string | null;
  validTill: string | null;
  approval: Approval;
}

interface Lead {
  _id: string | null;
  email?: string | null;
  project: OurProject[];
  requirement: string[];
  prefix?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  address?: string | null;
  leadType?: string;
  reference?: string | null;
  channelPartner?: ChannelPartner;
  dataAnalyzer?: string | null;
  teamLeader?: Employee;
  countryCode?: string;
  phoneNumber?: number | null;
  altPhoneNumber?: number | null;
  remark?: string | null;
  stage?: string;
  startDate?: string;
  validTill?: string;
  approvalStatus?: string;
  approvalRemark?: string;
  approvalDate?: string | null;
  visitStatus?: string;
  disabled?: boolean;
  firstVisit?: boolean;
  visitDate?: string | null;
  revisitDate?: string | null;
  visitRef?: string | null;
  taskRef?: Task | null;
  revisitStatus?: string;
  revisitRef?: string | null;
  bookingStatus?: string;
  bookingRef?: string | null;
  followupStatus?: string;
  contactedStatus?: string;
  interestedStatus?: string;
  clientInterestedStatus?: string | null;
  clientStatus?: string;
  clientRef?: string | null;
  status?: string;
  siteVisitInterested?: boolean;
  siteVisitInterestedDate?: string | null;
  cycle?: Cycle;
  approvalHistory?: Approval[];
  updateHistory?: Update[];
  cycleHistory?: Cycle[];
  cycleHistoryNew?: Cycle[];
  callHistory?: CallHistory[];
  followupHistory?: CallHistory[];
  channelPartnerHistory?: ChannelPartnerHistory[];
  lostHistory?: Lost[];
  virtualMeetingDoc?: string | null;
  leadAssignedEmailSent?: boolean;
  feedbackPendingEmailSent?: boolean;
  createdThrough?: string | null;
}

interface SiteVisit {
  _id?: string | null;
  date?: Date | null;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: numbe | null;
  altPhoneNumber?: number | null;
  countryCode?: string | null;
  email?: string | null;
  residence?: string | null;
  visitType?: string | null;
  projects: OurProject[] | null;
  location?: OurProject | null;
  choiceApt: string[] | null;
  closingManager?: Employee | null;
  callBy?: Employee | null;
  entryBy?: Employee | null;
  // channelPartner?: ChannelPartner | null;
  closingTeam: Employee[] | null;
  attendedBy?: Employee | null;
  dataEntryBy?: Employee | null;
  gender?: string | null;
  feedback?: string | null;
  cpfeedback?: string | null;
  namePrefix?: string | null;
  source?: string | null;
  verified: boolean | null;
  virtualMeetingDoc?: string | null;
  approvalStatus?: string | null;
  createdThrough?: string | null;
  approvalRemark?: string | null;
  approveBy?: Employee | null;
  approvalDate?: Date | null;
  dataAnalyzer?: Employee | null;
  lead?: Lead | null;
}

interface ChannelPartner {
  _id?: string | null;
  firstName?: string | null;
  profilePic?: string | null;
  lastName?: string | null;
  email?: string | null;
  gender?: string | null;
  dateOfBirth?: Date | null; // ISO string format recommended
  firmName?: string | null;
  homeAddress?: string | null;
  firmAddress?: string | null;
  phoneNumber?: number;
  haveReraRegistration?: boolean;
  reraNumber?: string | null;
  reraCertificate?: string | null;
  isVerified?: boolean | null;
  sameAdress?: boolean | null;
  isVerifiedPhone?: boolean | null;
  isVerifiedEmail?: boolean | null;
  role?: string | null;
  onBoarding?: string | null;
  maritalStatus?: string | null;
  orgType?: string | null;
  onBoardingApprovalRemark?: string | null;
  onBoardingDate?: Date | null; // string instead of Date for JSON compatibility
}

interface Task {
  id?: string | null;
  assignTo?: Employee | null;
  assignBy?: Employee | null;
  lead?: Lead | null;
  visit?: SiteVisit;
  booking?: PostSaleLead;
  name?: string | null;
  details?: string | null;
  type?: string | null;
  remark?: string | null;
  assignDate?: string | null; // ISO 8601 format (Date as string| null)
  completed?: boolean | null;
  completedDate?: string | null;
  deadline?: string | null;
  remindMe?: boolean | null;
  reminderDate?: string | null;
  reminderDescription?: string | null;
  transferTaskFrom?: Employee | null;
  transferReason?: string | null;
  reminderType?: string | null;
  reminderDueDate?: string | null;
  reminderCompleted?: boolean | null;
}

interface TeamLeaderAssignFolloupUp {
  teamLeader?: Employee;
  totalItems: number | null;
  assignedCount: number | null;
  notAssignedCount: number | null;
  notFollowUpCount: number | null;
}

interface ChartModel {
  category: string | null;
  value: number | null;
  value2: number | null;
}
