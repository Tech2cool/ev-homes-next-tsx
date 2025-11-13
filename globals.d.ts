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
  alternatePhoneNumber(alternatePhoneNumber: any): unknown;
  alternatePhoneNumber: any;
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
  department?: Department;
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
  date: string;
  channelPartner: string | null;
}

interface CallHistory {
  _id?: string;
  caller: Employee;
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

interface Task {
  id?: string;
  assignTo?: Employee;
  assignBy?: Employee;
  lead?: Lead;
  visit?: SiteVisit;
  booking?: PostSaleLead;
  name?: string;
  details?: string;
  type?: string;
  remark?: string;

  assignDate?: string;
  completed?: boolean;
  completedDate?: string;
  deadline?: string;

  remindMe?: boolean;
  reminderDate?: string;
  reminderDescription?: string;

  transferTaskFrom?: Employee;
  transferReason?: string;

  reminderType?: string;
  reminderDueDate?: string;
  reminderCompleted?: boolean;
}

interface Cycle {
  _id?: string;
  stage: string | null;
  currentOrder: number;
  currentDays: number;
  teamLeader: Lead | null;
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
  channelPartner: ChannelPartner;
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
  visitRef?: SiteVisit;
  taskRef?: Task | null;
  revisitStatus?: string;
  revisitRef?: SiteVisit;
  bookingStatus?: string;
  bookingRef?: PostSaleLead;
  followupStatus?: string;
  contactedStatus?: string;
  interestedStatus?: string;
  clientInterestedStatus?: string | null;
  clientStatus?: string;
  clientRef?: string | null;
  taskRef?: Task;
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
  occupation?: string;
  additionLinRemark?: string;
  propertyType?: string;
  uploadedLinkedIn?: string;
  linkedIn?: string;
  nameRemark?: string;
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
  _id?: string | null;
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

interface FunnelStageData {
  stage: string;
  count: number;
  color?: string;
}

interface LineChartData {
  month: string;
  leads: number;
}

interface RankingTurn {
  id?: string;
  period?: Period;
  startDate?: string;
  endDate?: string;
  ranking?: RankTurn[] | null;
  timeline?: RankTurn[] | null;
}

interface Period {
  id?: string;
  period?: string;
  startDate?: string;
  endDate?: string;
}

interface RankTurn {
  id?: string;
  user?: Employee | null;
  rank?: number;
  leadsShouldRecieve?: number;
  leadsGiven?: number;
  score?: number;
  isMyTurn?: boolean;
  leads: string[];
}

interface EmployeeShiftInfoModel {
  id?: string;
  userId?: Employee;
  shift?: Shift;
  faceId?: FaceId;
  currentDate?: Date;
  totalLateDays?: number;
  totalLeaves?: number;
  paidLeave?: number;
  graceDays?: number;
  casualLeave?: number;
  compensatoryoff?: number;
  regularization?: number;
  undertime?: number;
  overtime?: number;
  payable?: boolean;
}

interface Shift {
  id?: string;
  shiftName?: string;
  type?: string;
  timeIn?: string;
  timeOut?: string;
  workingHours?: number;
  graceTime?: number;
  graceDays?: number;
  multiTimeInOut?: boolean;
  status?: string;
  absentHours?: number;
  employees: Employee[];
  regularizationDays?: number;
}

//post sale model
//
interface Applicant {
  prefix?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  countryCode?: string | null;
  phoneNumber?: number | null;
  address?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  pincode?: string | null;
  email?: string | null;
  kyc?: Kyc | null;
}
interface Kyc {
  addhar?: KycDocument | null;
  pan?: KycDocument | null;
  other?: KycDocument | null;
}

interface KycDocument {
  verified?: boolean;
  document?: string | null;
  remark?: string | null;
  type?: string | null;
}
interface PreRegistrationChecklist {
  tenPercentRecieved?: ChecklistItem | null;
  stampDuty?: ChecklistItem | null;
  gst?: ChecklistItem | null;
  noc?: ChecklistItem | null;
  tds?: ChecklistItem | null;
  legalCharges?: ChecklistItem | null;
  kyc?: ChecklistItem | null;
  agreement?: Agreement | null;
}
interface ChecklistItem {
  recieved?: string | null;
  value?: number | null;
  percent?: number | null;
  remark?: string | null;
}
interface Agreement {
  prepared?: boolean;
  handOver?: HandOver | null;
  document?: DocumentMeta | null;
}

interface HandOver {
  status?: string | null;
  document?: string | null;
  remark?: string | null;
}

interface DocumentMeta {
  verified?: boolean;
  document?: string | null;
  remark?: string | null;
}
interface DisbursementRecord {
  value?: number | null;
  percent?: number | null;
  recievedAmount?: number | null;
  gst?: number | null;
  remark?: string | null;
}
interface CallHistoryPostSale {
  caller?: Employee | null;
  callDate?: string | Date | null;
  status?: string | null;
  stage?: string | null;
  remark?: string | null;
  feedback?: string | null;
  document?: string | null;
  recording?: string | null;
}

interface UploadedDocuments {
  typeOfDoc?: string | null;
  docUrl?: string | null;
  uploadedBy?: Employee | null;
  date?: string | Date | null;
}
interface PaymentDetailSchema {
  id?: string | null;
  label?: string | null;
  paymentAmount?: number | null;
  paymentDueDate?: string | Date | null;
  receivedStatus?: boolean | null;
  paymentReceivedDate?: string | Date | null;
  attachment?: Attachment[];
  remark?: string | null;
  receivedAmount?: number | null;
}

interface Attachment {
  document?: string | null;
}
interface PostSaleLead {
  _id?: string;
  unitNo?: string | null;
  floor?: number | null;
  buildingNo?: number | null;
  number?: number | null;
  project?: OurProject | null;

  firstName?: string | null;
  lastName?: string | null;
  requirement?: string | null;
  countryCode?: string | null;
  phoneNumber?: number | null;
  address?: string | null;
  email?: string | null;

  date?: string;
  carpetArea?: number | null;
  sellableCarpetArea?: number | null;
  flatCost?: number | null;

  closingManager?: Employee | null;
  postSaleExecutive?: Employee | null;
  closingManagerTeam?: Employee[];
  postSaleAssignTo?: Employee[];

  bookingStatus?: BookingStatus | null;

  applicants?: Applicant[];
  preRegistrationCheckList?: PreRegistrationChecklist | null;
  disbursementRecord?: DisbursementRecord[];
  allInclusiveAmount?: number | null;
  totalAmount?: number | null;
  cgstAmount?: number | null;
  netAmount?: number | null;
  stampDutyAmount?: number | null;
  tdsAmount?: number | null;

  registrationDone?: boolean;
  status?: string | null;

  bookingCancelRemark?: string | null;
  bookingCancelDate?: string | Date | null;

  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  pincode?: string | null;

  bookingFormFront?: string | null;
  bookingFormBack?: string | null;
  bookingPdf?: string | null;

  registrationDoneDate?: string | Date | null;
  callHistory?: CallHistoryPostSale[];
  parking?: Parking[];

  agreementValue?: number | null;
  stampDutyValue?: number | null;
  gstValue?: number | null;
  roundedAgreementValue?: number | null;
  roundedStampDutyValue?: number | null;
  roundedGstValue?: number | null;
  adjustedStampDutyAmt?: number | null;
  totalValue?: number | null;
  roundedAdjustedStampDuty?: number | null;
  costSheetUrl?: string | null;
  uploadedDocuments?: UploadedDocuments[];
  floorRise?: number | null;
  pricingRemark?: string | null;

  paymentOneAmt?: number | null;
  paymentTwoAmt?: number | null;
  paymentThreeAmt?: number | null;
  paymentOneDueDate?: string | Date | null;
  paymentTwoDueDate?: string | Date | null;
  paymentThreeDueDate?: string | Date | null;
  paymentScheme?: string | null;

  paymentFourAmt?: number | null;
  paymentFourDueDate?: string | Date | null;
  paymentDetailSchema?: PaymentDetailSchema[];
}
//
