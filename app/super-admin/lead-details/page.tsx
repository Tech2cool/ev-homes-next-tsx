"use client";
import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import Image from "next/image";

import { useRouter, useSearchParams } from "next/navigation";
import { MdAddCall, MdCall } from "react-icons/md";
import styles from "./lead-details.module.css";
import {
  FaExchangeAlt,
  FaHistory,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaTasks,
} from "react-icons/fa";
import { IoLogoWhatsapp, IoPersonSharp } from "react-icons/io5";
import QuickAccess from "@/components/lead-details-components/quickaccess";
import TaskOverview from "@/components/lead-details-components/taskoverview";
import FollowUp from "@/components/lead-details-components/followup";
import VisitHistory from "@/components/lead-details-components/visithistory";
import TransferHistory from "@/components/lead-details-components/transferhistory";
import BookingOverview from "@/components/lead-details-components/bookingoverview";
import tagIcon from "@/public/images/transfer.png";
import {
  ArrowLeft,
  Calendar,
  Phone,
  FileText,
  Download,
  Check,
  Edit,
  Building,
  User,
  Mail,
  Menu,
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal,
  PersonStanding,
  X,
} from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import { useUser } from "@/providers/userContext";
import { useData } from "@/providers/dataContext";
import EditDialog from "@/components/lead-details-components/edit-dialog";
import { LeadFilterDialog } from "@/components/lead-details-components/filter-dialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MdEmail } from "react-icons/md";
import { BsFillBuildingFill } from "react-icons/bs";
import { PiBuildingApartmentBold, PiSidebarSimple } from "react-icons/pi";
import {
  FaBolt,
  FaClipboardList,
  FaFileContract,
  FaSourcetree,
  FaUser,
} from "react-icons/fa6";
import { IoIosPerson } from "react-icons/io";
import { BiSolidCalendarEdit } from "react-icons/bi";
import { BsFillClockFill } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { SiGoogletasks } from "react-icons/si";
import { FaAddressBook } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { dateFormatOnly } from "@/hooks/useDateFormat";
import AddFeedBaack from "@/components/lead-details-components/Dailog/addfeedback";
import { FiPhoneCall } from "react-icons/fi";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { formatStatus } from "@/app/helper";

const SuperAdminWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeadDetailsPage />
    </Suspense>
  );
};

export default SuperAdminWrapper;

const LeadDetailsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const visitId = searchParams.get("id");
  const [SelectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [similarVisits, setSimilarVisits] = useState<Lead[]>([]);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showSimilarVisits, setShowSimilarVisits] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const status = searchParams.get("status");

  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  // Dialog states
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState<boolean>(false);
  const [showPdfDialog, setShowPdfDialog] = useState<boolean>(false);
  const [pdfGenerating, setPdfGenerating] = useState<boolean>(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Form states
  const [editFormData, setEditFormData] = useState({});
  const [approvalData, setApprovalData] = useState({
    action: "approve",
    remark: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  // Filter states
  const [filters, setFilters] = useState({
    visitType: "",
    leadFilter: "",
    statusFilter: "",
    feedbackFilter: "",
    clientStatus: "",
    leadStatus: "",
    cycleStatus: 0,
    propertyType: "",
    dateFrom: "",
    dateTo: "",
  });

  const [selectedFilter, setSelectedFilter] = useState({
    status: null,
    callData: null,
    cycle: null,
    order: null,
    interval: null,
    clientstatus: null,
    leadstatus: null,
    startDateDeadline: null,
    endDateDeadline: null,
    date: null,
    status2: null,
    //  approvalStatus : null,
    //  stage : null,
    channelPartner: null,
    teamLeader: null,
    taskType: null,
    member: null,
    propertyType: null,
  });

  const { user, loading, getSocket, reconnectSocket } = useUser();
  const {
    fetchSearchLeads,
    searchLeadInfo,
    leads,
    loadingLeads,
    fetchingMoreLeads,
    updateLeadDetails,
  } = useData();

  const socket = getSocket();

  const handleSearchChange = async (query: string) => {
    setSearchQuery(query);
    setLoadingSearch(true);

    try {
      await fetchSearchLeads({ query });
    } finally {
      setLoadingSearch(false);
    }
  };

  // Sync with URL status parameter
  // useEffect(() => {
  //   if (status) {
  //     console.log("URL status changed:", status);
  //     setSelectedFilter(prev => ({
  //       ...prev,
  //       status: status === "all" ? null : status
  //     }));
  //   }
  // }, [status]);

  // Function to handle filter application
  const handleApplyFilters = useCallback(
    (filterParams: any) => {
      // Reset to page 1 when applying new filters
      fetchSearchLeads({
        query: debouncedSearchQuery,
        page: 1,
        limit: 10,
        status: status === "all" ? null : status,
        ...filterParams, // Spread the filter parameters
      });
    },
    [debouncedSearchQuery, status, fetchSearchLeads]
  );

  // Function to clear all filters
  const handleClearFilters = useCallback(() => {
    setFilters({
      visitType: "",
      leadFilter: "",
      statusFilter: "",
      feedbackFilter: "",
      clientStatus: "",
      leadStatus: "",
      cycleStatus: 0,
      propertyType: "",
      dateFrom: "",
      dateTo: "",
    });

    // Fetch without any filters
    fetchSearchLeads({
      query: debouncedSearchQuery,
      page: 1,
      limit: 10,
      status: status === "all" ? null : status,
    });
  }, [debouncedSearchQuery, status, fetchSearchLeads]);

  // Initial data fetch with status from URL
  useEffect(() => {
    if (user && !loading) {
      console.log("Initial fetch with status:", status);
      fetchSearchLeads({
        query: debouncedSearchQuery,
        page: 1,
        limit: 10,
        status: status === "all" ? null : status,
      });
    }
  }, [user, loading, status]);

  useEffect(() => {
    if (user && !loading) {
      fetchSearchLeads({
        query: debouncedSearchQuery,
        page: 1,
        limit: 10,
        status: status === "all" ? null : status,
        //  ...selectedFilter,
        // Add other filter parameters as needed
      });
    }
  }, [debouncedSearchQuery, user, loading, status]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);

    // fetchSearchLeads({
    //   id: user?._id ?? null,
    //   status: newFilters.visitType || null,
    //   status2: newFilters.statusFilter || null,
    //   callData: newFilters.feedbackFilter || null,
    //   clientstatus: newFilters.clientStatus || null,
    //   leadstatus: newFilters.leadStatus || null,
    //   cycle: newFilters.cycleStatus || null,
    //   startDateDeadline: newFilters.dateFrom || null,
    //   endDateDeadline: newFilters.dateTo || null,
    //   page: 1,
    // });
    // Apply filters with search
    fetchSearchLeads({
      query: debouncedSearchQuery,
      page: 1,
      limit: 10,
      status: status === "all" ? null : status,
      ...newFilters,
    });
  };

  // Function to handle call functionality - can be passed to child components
  const handleCall = useCallback(
    (lead: any) => {
      console.log("Making call to:", lead);
      socket?.emit("callCustomerWeb", {
        lead: lead?._id,
        phoneNumber: `${lead?.countryCode}${lead?.phoneNumber}`,
        type: "call",
        message: "call",
        userId: user?._id,
      });
    },
    [socket, user?._id]
  );

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
    reconnectSocket();
  }, []);

  // Initial data fetch

  // Initial data fetch
  // useEffect(() => {
  //   fetchSearchLeads({
  //     // id: user?._id,
  //     query: searchTerm,
  //     page: 1,
  //     limit: 10,
  //   });
  // }, [debouncedSearch]);

  // Update refs when leadInfo changes
  // useEffect(() => {
  //   if (searchLeadInfo) {
  //     hasMoreRef.current = (searchLeadInfo.page ?? 0) < (searchLeadInfo.totalPages ?? 0);
  //     loadingRef.current = loadingLeads || fetchingMoreLeads;
  //   }
  // }, [searchLeadInfo, loadingLeads, fetchingMoreLeads]);

  // Find selected visit when visitId changes
  useEffect(() => {
    if (visitId && leads!.length > 0) {
      const foundVisit = leads?.find((v: any) => v?._id === visitId);
      if (foundVisit) {
        setSelectedLead(foundVisit);
      }
    }
  }, [visitId, leads]);

  // useEffect(() => {
  //   const fetchLeadsBasedOnStatus = async () => {
  //     if (user && !loading) {
  //       try {
  //         await fetchSearchLeads({
  //           query: searchQuery,
  //           page: (searchLeadInfo?.page ?? 0) + 1, // Start from page 1
  //           limit: 10,
  //           status: selectedFilter?.status,
  //         });
  //       } catch (error) {
  //         console.error("Error fetching leads:", error);
  //       }
  //     }
  //   };

  //   fetchLeadsBasedOnStatus();
  // }, [user, loading, selectedFilter]);

  // Fixed loadMoreVisits function
  const loadMoreLeads = useCallback(async () => {
    if (searchLeadInfo && searchLeadInfo.page && searchLeadInfo.totalPages) {
      const nextPage = searchLeadInfo.page + 1;
      if (nextPage <= searchLeadInfo.totalPages) {
        await fetchSearchLeads({
          query: debouncedSearchQuery,
          page: nextPage,
          limit: 10,
          status: status === "all" ? null : status,
        });
      }
    }
  }, [
    searchLeadInfo,
    selectedFilter,
    fetchSearchLeads,
    debouncedSearchQuery,
    status,
  ]);

  // const fetchLeads = () => {
  //   fetchTeamLeaderReportingToLeads({
  //     id: user?._id,
  //     ...filters,
  //     page: 1,
  //   });
  // };

  // Fixed scroll handler with debouncing
  const handleScroll = useCallback(
    (e: any) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const threshold = 100;

      if (scrollHeight - scrollTop <= clientHeight + threshold) {
        if (
          !loadingLeads &&
          searchLeadInfo?.page &&
          searchLeadInfo.totalPages &&
          searchLeadInfo.page < searchLeadInfo.totalPages
        ) {
          loadMoreLeads();
        }
      }
    },
    [loadMoreLeads, loadingLeads, searchLeadInfo]
  );

  // Debounced scroll handler to prevent excessive calls
  const debouncedHandleScroll = useCallback(debounce(handleScroll, 200), [
    handleScroll,
  ]);

  const formatDate = (date: number | Date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date: number | Date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return styles.approved;
      case "rejected":
        return styles.rejected;
      case "pending":
        return styles.pending;
      default:
        return styles.pending;
    }
  };

  const getTimeLineStatus = (
    status: string,
    lead: { bookingStatus?: string }
  ) => {
    const lowerStatus = status?.toLowerCase();
    const bookingStatus = lead?.bookingStatus?.toLowerCase();

    if (lowerStatus.includes("booking") && bookingStatus === "cancelled") {
      return styles.cancelled;
    }
    switch (lowerStatus) {
      case "approved":
        return styles.approved;
      case "rejected":
        return styles.rejected;
      case "pending":
        return styles.pending;
      default:
        return styles.pending;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source?.toLowerCase()) {
      case "cp":
        return styles.cp;
      case "walk-in":
        return styles.walkin;
      case "internal lead":
        return styles.internallead;
      case "online":
        return styles.online;
      case "reference":
        return styles.reference;
      default:
        return styles.cp;
    }
  };

  // const handleVisitSelect = (SelectedLead: Lead) => {
  //   router.push(`/super-admin/lead-details?id=${SelectedLead._id}`);
  //   setShowSidebar(false);
  // };

  // const handleBackToList = () => {
  //   router.push("/super-admin/lead-details");
  // };

  // const clearFilters = () => {
  //   setFilters({
  //     visitType: "",
  //     leadFilter: "string",
  //     statusFilter: "string",
  //     feedbackFilter: "string",
  //     clientStatus: "string",
  //     leadStatus: "string",
  //     cycleStatus: 0,
  //     dateFrom: "string",
  //     dateTo: "string",
  //   });
  // };

  // Desktop view (list and details)
  if (!isMobile) {
    return (
      <div className={styles.desktopContainer}>
        {/* Left Sidebar - Visits List with Filters */}
        {sidebarOpen && <DashboardSidebar />}

        <div className={styles.leftSidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.serchlable}>
              <button
                className={styles.sidebarOpenBtn}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X size={20} /> : <PiSidebarSimple size={25} />}
              </button>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>

            <button
              className={styles.filterBtn}
              onClick={() => setShowFilterDialog(true)}
            >
              <SlidersHorizontal className={styles.filterIcon} />
            </button>
          </div>
          <div className={styles.visitsList} onScroll={debouncedHandleScroll}>
            {loadingSearch ? (
              <div className={styles.loadingContainer}>
                <span className={styles.loadingText}>Loading...</span>
              </div>
            ) : leads && leads.length > 0 ? (
              <>
                {leads?.map((visit, index) => (
                  <div
                    key={`${visit._id}-${index}-${visit.phoneNumber}`} // Add index and phone as fallback
                    className={`${styles.visitCard} ${
                      SelectedLead?._id === visit._id ? styles.selectedCard : ""
                    }`}
                    onClick={() => {
                      setSelectedLead(visit);

                      // router.push(`/super-admin/lead-details?id=${visit._id}`, {
                      //   scroll: false,
                      // });
                      router.push(
                        `/lead-details?status=${status}&id=${visit._id}`,
                        {
                          scroll: false,
                        }
                      );
                    }}
                  >
                    <div className={styles.tag}></div>
                    <div className={styles.leadInfo}>
                      {/* <div className={styles.clientIcon}>
                    {visit?.firstName?.charAt(0)?.toUpperCase()}
                  </div> */}
                      <Image
                        src={tagIcon}
                        alt="Tag"
                        className={styles.tagImage}
                        width={55}
                        height={20}
                      />
                      <div className={styles.clientDetails}>
                        {/* <p className={styles.trns}>Transferred From</p> */}
                        <p className={styles.trnsname}>Vicky</p>
                        <div className={styles.namecl}>
                          {visit?.firstName ?? ""} {visit?.lastName ?? ""}
                        </div>
                        <p className={styles.phone}>
                          {visit?.countryCode ?? "91"} {visit?.phoneNumber}
                        </p>
                      </div>
                    </div>
                    {/* Task Details */}

                    <div className={styles.leadMeta}>
                      <p>
                        Assign Date :{" "}
                        {visit.cycle?.startDate ? (
                          <span>
                            {formatDate(new Date(visit.cycle.startDate))}
                          </span>
                        ) : (
                          <span>Not available</span>
                        )}
                      </p>
                      <p>
                        Visit Deadline:{" "}
                        {visit.cycle?.validTill ? (
                          <span>
                            {formatDate(new Date(visit.cycle.validTill))}
                          </span>
                        ) : (
                          <span>Not available</span>
                        )}
                      </p>

                      <div className={styles.taskContainer}>
                        <div className={styles.taskHeader}>
                          <div
                            className={styles.accentLine}
                            style={{
                              backgroundColor:
                                visit?.taskRef?.completed === true
                                  ? "rgb(5, 170, 5)"
                                  : "orange",
                            }}
                          ></div>
                          <span className={styles.taskTitle}>Task Details</span>
                        </div>

                        <span className={styles.taskName}>
                          {`${visit.taskRef?.assignTo?.firstName ?? ""} ${
                            visit.taskRef?.assignTo?.lastName ?? ""
                          }`}
                          <span className={styles.status}>
                            <span
                              className={styles.statusText}
                              style={{
                                color:
                                  visit?.taskRef?.completed === true
                                    ? "rgb(5, 170, 5)"
                                    : "orange",
                              }}
                            >
                              {visit?.taskRef?.completed === true
                                ? "COMPLETED"
                                : "PENDING"}
                            </span>
                            <span className={styles.statusIcon}>⏳</span>
                          </span>
                        </span>
                      </div>

                      {visit.teamLeader ? (
                        <div className={styles.assignby}>
                          {visit?.teamLeader?.firstName
                            ?.charAt(0)
                            ?.toUpperCase()}
                          {visit?.teamLeader?.lastName
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>
                      ) : (
                        <span>Not available</span>
                      )}

                      <div className={styles.lastpart}>
                        {visit?.clientInterestedStatus ? (
                          <div className={styles.clientStatus}>
                            {formatStatus(visit.clientInterestedStatus)}
                          </div>
                        ) : null}

                        <div
                          style={{
                            backgroundColor: "#387478",
                          }}
                          className={styles.clientStatus}
                        >
                          {visit.leadType === "cp"
                            ? visit.channelPartner?.firmName ?? "-"
                            : visit.leadType ?? "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {searchLeadInfo?.page &&
                  searchLeadInfo.totalPages &&
                  searchLeadInfo.page < searchLeadInfo.totalPages && (
                    <div className={styles.loadMoreContainer}>
                      <button
                        className={styles.loadMoreBtn}
                        onClick={() => loadMoreLeads}
                        disabled={loadingLeads}
                      >
                        {loadingLeads ? "Loading..." : ""}
                      </button>
                    </div>
                  )}
              </>
            ) : (
              <div className={styles.noResults}>No leads found</div>
            )}
          </div>
        </div>

        {/* Right Panel - Visit Details Preview */}
        <div className={styles.rightPanel}>
          {SelectedLead ? (
            <>
              <div className={styles.detailsHeader}>
                <div className={styles.headerInfo}>
                  <h2 className={styles.detailsTitle}>
                    {SelectedLead.prefix} {SelectedLead.firstName}{" "}
                    {SelectedLead.lastName}
                    <span
                      className={`${styles.statusBadge} ${getStatusColor(
                        SelectedLead.approvalStatus ?? ""
                      )}`}
                    >
                      {SelectedLead.approvalStatus}
                    </span>
                  </h2>
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.editb}
                      onClick={() => {
                        setEditFormData(SelectedLead);
                        setShowEditDialog(true);
                      }}
                    >
                      <Edit size={15} />
                    </button>
                    {/* <button
                      className={styles.verifiedBadge}
                      onClick={() => {
                        handleCall({
                          ...SelectedLead,
                          phoneNumber: SelectedLead.phoneNumber,
                        });
                      }}
                    >
                      <MdCall size={15} />
                    </button> */}

                    {/* <button
                      className={styles.whatsbtn}
                      onClick={() => {
                        console.log("clicked 1");

                        socket?.emit("callCustomerWeb", {
                          lead: SelectedLead?._id,
                          phoneNumber: `${SelectedLead?.countryCode}${SelectedLead?.phoneNumber}`,
                          type: "whatsapp",
                          message: "hey",
                          userId: user?._id,
                        });

                        console.log("clicked 2");
                      }}
                    >
                      <IoLogoWhatsapp size={15} />
                    </button> */}

                    <ThemeToggle />
                    {/* {SelectedLead.approvalStatus === "pending" && (
                      <button
                        className={styles.approveBtn}
                        onClick={() => setShowApprovalDialog(true)}
                      >
                        <Check className={styles.btnIcon} />
                        Approve/Reject
                      </button>
                    )} */}
                  </div>
                </div>
                {/* Action buttons */}
              </div>
              {/* Visit Details Content - Pass handleCall function */}
              <div className={styles.detsilpart}>
                <div className={styles.detailsContent}>
                  {activeTab === "overview" && (
                    <VisitDetailsContent
                      visit={SelectedLead}
                      onCall={handleCall}
                      user={user}
                      socket={socket}
                    />
                  )}

                  {activeTab === "access" && (
                    <QuickAccess lead={SelectedLead} />
                  )}
                  {activeTab === "taskDetails" && (
                    <TaskOverview task={SelectedLead?.taskRef} />
                  )}
                  {activeTab === "followup" && <FollowUp lead={SelectedLead} />}
                  {activeTab === "siteVisit" && (
                    <VisitHistory lead={SelectedLead} />
                  )}
                  {activeTab === "transfer" && (
                    <TransferHistory
                      cycleHistory={SelectedLead?.cycleHistoryNew}
                    />
                  )}

                  {activeTab === "booking" && (
                    <div className={styles.tabContent}>
                      <BookingOverview />
                    </div>
                  )}
                  {/* Similar Visits Section */}
                  {similarVisits.length > 0 && (
                    <div className={styles.similarVisitsSection}>
                      <div
                        className={styles.similarVisitsHeader}
                        onClick={() => setShowSimilarVisits(!showSimilarVisits)}
                      >
                        <h3 className={styles.similarVisitsTitle}>
                          Similar Visits ({similarVisits.length})
                        </h3>
                        {showSimilarVisits ? (
                          <ChevronUp className={styles.chevron} />
                        ) : (
                          <ChevronDown className={styles.chevron} />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.detailstab}>
                  <div className={styles.navbar}>
                    <button
                      className={`${styles.navItem} ${
                        activeTab === "overview" ? styles.active : ""
                      }`}
                      onClick={() => setActiveTab("overview")}
                    >
                      <FaUser className={styles.icon} /> Client Overview
                    </button>

                    <button
                      className={`${styles.navItem} ${
                        activeTab === "access" ? styles.active : ""
                      }`}
                      onClick={() => setActiveTab("access")}
                    >
                      <FaBolt className={styles.icon} /> Quick Access
                    </button>

                    <button
                      className={`${styles.navItem} ${
                        activeTab === "taskDetails" ? styles.active : ""
                      }`}
                      onClick={() => setActiveTab("taskDetails")}
                    >
                      <FaTasks className={styles.icon} /> Task Details
                    </button>

                    <button
                      className={`${styles.navItem} ${
                        activeTab === "followup" ? styles.active : ""
                      }`}
                      onClick={() => setActiveTab("followup")}
                    >
                      <FaHistory className={styles.icon} /> Follow-up History
                    </button>

                    <button
                      className={`${styles.navItem} ${
                        activeTab === "siteVisit" ? styles.active : ""
                      }`}
                      onClick={() => setActiveTab("siteVisit")}
                    >
                      <FaMapMarkedAlt className={styles.icon} /> Site Visit
                      History
                    </button>

                    <button
                      className={`${styles.navItem} ${
                        activeTab === "transfer" ? styles.active : ""
                      }`}
                      onClick={() => setActiveTab("transfer")}
                    >
                      <FaExchangeAlt className={styles.icon} /> Transfer History
                    </button>

                    {SelectedLead?.bookingRef != null && (
                      <button
                        className={`${styles.navItem} ${
                          activeTab === "booking" ? styles.active : ""
                        }`}
                        onClick={() => setActiveTab("booking")}
                      >
                        <FaFileContract className={styles.icon} /> Booking
                        Overview
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <FileText className={styles.emptyIcon} />
              <p className={styles.emptyText}>Select a lead to view details</p>
            </div>
          )}
        </div>

        {/* Filter Dialog */}
        <LeadFilterDialog
          open={showFilterDialog}
          onClose={() => setShowFilterDialog(false)}
          onOpenChange={setShowFilterDialog}
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
          onApplyFilters={handleApplyFilters} // Pass the apply function
          visits={leads || []}
          resultCount={leads?.length || 0}
        />

        {/* Edit Dialog */}
        {showEditDialog && (
          <AddFeedBaack
            lead={SelectedLead}
            openclick={() => setShowEditDialog(false)}
            onSave={async (payload) => {
              const response = await updateLeadDetails(
                SelectedLead?._id ?? "",
                payload
              );

              console.log(response);
              if (response.success) {
                // setSelectedLead(response);
                setShowEditDialog(false);
              } else {
                console.error(response.message);
              }
            }}
          />
        )}
      </div>
    );
  }

  // Mobile view (details)
  if (!SelectedLead) {
    return (
      <div className={styles.leftSidebar}>
        {/* <DashboardSidebar /> */}
        <div className={styles.sidebarHeader}>
          <div className={styles.serchlable}>
            <button
              className={styles.backBtn}
              onClick={() => {
                router.push("/super-admin/supar-admin-dashboard");
              }}
            >
              <ArrowLeft className={styles.backIcon} />
            </button>

            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
          <button
            className={styles.filterBtn}
            onClick={() => setShowFilterDialog(true)}
          >
            <SlidersHorizontal className={styles.filterIcon} />
          </button>


        </div>
        <div className={styles.visitsList} onScroll={debouncedHandleScroll}>
          {loadingSearch ? (
            <div className={styles.loadingContainer}>
              <span className={styles.loadingText}>Loading...</span>
            </div>
          ) : leads && leads.length > 0 ? (
            <>
              {leads?.map((visit, index) => (
                <div
                  key={`${visit._id}-${index}-${visit.phoneNumber}`} // Add index and phone as fallback
                  // key={visit._id}
                  className={`${styles.visitCard}`}
                  onClick={() => {
                    setSelectedLead(visit);

                    // router.push(`/super-admin/lead-details?id=${visit._id}`, {
                    //   scroll: false,
                    // });
                    router.push(
                      `/lead-details?status=${status}&id=${visit._id}`,
                      {
                        scroll: false,
                      }
                    );
                  }}
                >
                  <div className={styles.leadInfo}>
                    <Image
                      src={tagIcon}
                      alt="Tag"
                      className={styles.tagImage}
                      width={55}
                      height={20}
                    />
                    <div className={styles.clientDetails}>
                      {/* <p className={styles.trns}>Transferred From</p> */}
                      {/* <p className={styles.trnsname}>Vicky</p> */}
                      <div className={styles.namecl}>
                        {visit?.firstName ?? ""} {visit?.lastName ?? ""}
                      </div>
                      <p className={styles.phone}>
                        {visit?.countryCode ?? "91"}{" "}
                        {visit?.phoneNumber ?? "NA"}
                      </p>
                    </div>
                  </div>

                  <div className={styles.leadMeta}>
                    <p>
                      Assign Date:{" "}
                      {visit.cycle?.startDate ? (
                        <span>
                          {formatDate(new Date(visit.cycle.startDate ?? "NA"))}
                        </span>
                      ) : (
                        <span>Not available</span>
                      )}
                    </p>
                    <p>
                      Visit Deadline:{" "}
                      {visit.cycle?.validTill ? (
                        <span>
                          {formatDate(new Date(visit.cycle.validTill ?? "NA"))}
                        </span>
                      ) : (
                        <span>Not available</span>
                      )}
                    </p>
                    <div className={styles.taskContainer}>
                      <div className={styles.taskHeader}>
                        <div
                          className={styles.accentLine}
                          style={{
                            backgroundColor:
                              visit?.taskRef?.completed === true
                                ? "rgb(5, 170, 5)"
                                : "orange",
                          }}
                        ></div>
                        <span className={styles.taskTitle}>Task Details</span>
                      </div>

                      <span className={styles.taskName}>
                        {`${visit.taskRef?.assignTo?.firstName ?? ""} ${
                          visit.taskRef?.assignTo?.lastName ?? ""
                        }`}
                        <span className={styles.status}>
                          <span
                            className={styles.statusText}
                            style={{
                              color:
                                visit?.taskRef?.completed === true
                                  ? "rgb(5, 170, 5)"
                                  : "orange",
                            }}
                          >
                            {visit.taskRef?.completed === true
                              ? "COMPLETED"
                              : "PENDING"}
                          </span>
                          <span className={styles.statusIcons}>⏳</span>
                        </span>
                      </span>
                    </div>

                    <div className={styles.lastpart}>
                      {visit?.clientInterestedStatus ? (
                        <p className={styles.clientStatus}>
                          {visit?.clientInterestedStatus}
                        </p>
                      ) : (
                        <></>
                      )}

                      {visit.teamLeader ? (
                        <div className={styles.assignby}>
                          {visit?.teamLeader?.firstName
                            ?.charAt(0)
                            ?.toUpperCase()}
                          {visit?.teamLeader?.lastName
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>
                      ) : (
                        <span>Not available</span>
                      )}
                      <div
                        style={{
                          backgroundColor: "#387478",
                        }}
                        className={styles.clientStatus}
                      >
                        {visit.leadType === "cp"
                          ? visit.channelPartner?.firmName ?? "-"
                          : visit.leadType ?? "-"}
                      </div>
                    </div>
                  </div>

                  {/* <div className={styles.detailRow}>
                    <Phone className={styles.icon} />
                    <span>
                      {visit?.countryCode ?? ""} {visit?.phoneNumber ?? "NA"}
                    </span>
                    <MdAddCall
                      size={25}
                      color="dodgerblue"
                      style={{ cursor: "pointer", marginLeft: "auto" }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card selection
                        handleCall(visit);
                      }}
                    />
                    
                  </div> */}
                </div>
              ))}

              {searchLeadInfo?.page &&
                searchLeadInfo.totalPages &&
                searchLeadInfo.page < searchLeadInfo.totalPages && (
                  <div className={styles.loadMoreContainer}>
                    <button
                      className={styles.loadMoreBtn}
                      onClick={loadMoreLeads}
                      disabled={loadingLeads}
                    >
                      {loadingLeads ? "Loading..." : ""}
                    </button>
                  </div>
                )}
            </>
          ) : (
            <div className={styles.noResults}>No leads found</div>
          )}
        </div>
      </div>
    );
  }

  // Mobile view (details)
  return (
    <div className={styles.container}>
      {/* Mobile Header */}

      <div className={styles.detailsHeader}>
        <div className={styles.headerInfo}>
          <button
            className={styles.backBtn}
            onClick={() => {
              setSelectedLead(null);
              const apiStatus = status === "all" ? null : status;

              router.push(`/lead-details?status=${apiStatus}`, {
                scroll: false,
              });
            }}
          >
            <ArrowLeft className={styles.backIcon} />
          </button>

          <div className={styles.actionButtons}>
            {/* <button
              className={styles.verifiedBadge}
              onClick={() => {
                handleCall({
                  ...SelectedLead,
                  phoneNumber: SelectedLead.phoneNumber,
                });
              }}
            >
              <MdCall size={15} />
            </button> */}

            {/* <button
              className={styles.whatsbtn}
              onClick={() => {
                console.log("clicked 1");

                socket?.emit("callCustomerWeb", {
                  lead: SelectedLead?._id,
                  phoneNumber: `${SelectedLead?.countryCode}${SelectedLead?.phoneNumber}`,
                  type: "whatsapp",
                  message: "hey",
                  userId: user?._id,
                });

                console.log("clicked 2");
              }}
            >
              <IoLogoWhatsapp size={15} />
            </button> */}

            <button
              className={styles.menuBtn}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? " " : <Menu className={styles.menuIcon} />}
            </button>

            {/* Sidebar Overlay */}
            {isOpen && (
              <div
                className={styles.overlay}
                onClick={() => setIsOpen(false)}
              />
            )}

            {/* Sidebar Panel */}
            <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <button
                  className={styles.editb}
                  onClick={() => {
                    setEditFormData(SelectedLead);
                    setShowEditDialog(true);
                  }}
                >
                  <Edit size={15} />
                </button>
                <ThemeToggle />
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 lg:hidden"
                style={{ color: "red" }}
              >
                ✕
              </button>
              <button
                className={`${styles.navItem} ${
                  activeTab === "overview" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("overview")}
              >
                <FaUser className={styles.icon} /> Client Overview
              </button>

              <button
                className={`${styles.navItem} ${
                  activeTab === "access" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("access")}
              >
                <FaBolt className={styles.icon} /> Quick Access
              </button>

              <button
                className={`${styles.navItem} ${
                  activeTab === "taskDetails" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("taskDetails")}
              >
                <FaTasks className={styles.icon} /> Task Details
              </button>

              <button
                className={`${styles.navItem} ${
                  activeTab === "followup" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("followup")}
              >
                <FaHistory className={styles.icon} /> Follow-up History
              </button>

              <button
                className={`${styles.navItem} ${
                  activeTab === "siteVisit" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("siteVisit")}
              >
                <FaMapMarkedAlt className={styles.icon} /> Site Visit History
              </button>

              <button
                className={`${styles.navItem} ${
                  activeTab === "transfer" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("transfer")}
              >
                <FaExchangeAlt className={styles.icon} /> Transfer History
              </button>

              <button
                className={`${styles.navItem} ${
                  activeTab === "booking" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("booking")}
              >
                <FaFileContract className={styles.icon} /> Booking Overview
              </button>
            </div>
            {/* {SelectedLead.approvalStatus === "pending" && (
              <button
                className={styles.approveBtn}
                onClick={() => setShowApprovalDialog(true)}
              >
                <Check className={styles.btnIcon} />
                Approve/Reject
              </button>
            )} */}
          </div>
        </div>
      </div>
      <div className={styles.detsilpart}>
        <div className={styles.detailsContent}>
          {activeTab === "overview" && (
            <VisitDetailsContent
              visit={SelectedLead}
              onCall={handleCall}
              user={user}
              socket={socket}
            />
          )}

          {activeTab === "access" && <QuickAccess />}

          {activeTab === "taskDetails" && (
            <TaskOverview task={SelectedLead?.taskRef} />
          )}

          {activeTab === "followup" && <FollowUp lead={SelectedLead} />}

          {activeTab === "siteVisit" && <VisitHistory lead={SelectedLead} />}

          {activeTab === "transfer" && (
            <TransferHistory cycleHistory={SelectedLead?.cycleHistoryNew} />
          )}

          {activeTab === "booking" && (
            <div className={styles.tabContent}>
              <BookingOverview />
            </div>
          )}
          {/* Similar Visits Section */}
          {similarVisits.length > 0 && (
            <div className={styles.similarVisitsSection}>
              <div
                className={styles.similarVisitsHeader}
                onClick={() => setShowSimilarVisits(!showSimilarVisits)}
              >
                <h3 className={styles.similarVisitsTitle}>
                  Similar Visits ({similarVisits.length})
                </h3>
                {showSimilarVisits ? (
                  <ChevronUp className={styles.chevron} />
                ) : (
                  <ChevronDown className={styles.chevron} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rest of mobile code... */}
    </div>
  );
};

// Debounce utility function
function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Updated VisitDetailsContent component with call functionality
const VisitDetailsContent = ({
  visit,
  onCall,
  user,
  socket,
}: {
  visit: Lead;
  onCall: (lead: any) => void;
  user: any;
  socket: any;
}) => {
  const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const renderValue = (value: any) => {
    if (value === null || value === undefined) return "Not specified";
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        return value
          .map((item) =>
            typeof item === "object"
              ? item.name || item.title || JSON.stringify(item)
              : item
          )
          .join(", ");
      }
      return (
        value.name || value.title || value.address || JSON.stringify(value)
      );
    }
    return value;
  };

  return (
    <>
      <div className={styles.infobutton}>
        <div
          className={`${styles.statusCard} ${styles.blue}`}
          style={{ border: "1px solid blue" }}
        >
          <div className={styles.statusIcon}>📅</div>
          <span className={styles.statusLabel}>Status</span>
          <span className={styles.statusValue}>{visit?.stage ?? "NA"}</span>
        </div>
        <div
          className={`${styles.statusCard} ${styles.red}`}
          style={{ border: "1px solid red" }}
        >
          <div className={styles.statusIcon}>⏰</div>
          <span className={styles.statusLabel}>Visit Deadline</span>
          <span className={styles.statusValue}>
            {" "}
            {dateFormatOnly(visit?.cycle?.validTill)}
          </span>
        </div>
        <div
          className={`${styles.statusCard} ${styles.purple}`}
          style={{ border: "1px solid purple" }}
        >
          <div className={styles.statusIcon}>👨🏻‍💼</div>
          <span className={styles.statusLabel}>Client Status</span>
          <span className={styles.statusValue}>
            {" "}
            {visit?.clientInterestedStatus ?? "NA"}
          </span>
        </div>
        <div
          className={`${styles.statusCard} ${styles.yellow}`}
          style={{ border: "1px solid yellow" }}
        >
          <div className={styles.statusIcon}>💡</div>
          <span className={styles.statusLabel}>Lead Status</span>
          <span className={styles.statusValue}>
            {" "}
            {visit?.interestedStatus ?? "NA"}
          </span>
        </div>
      </div>

      <div className={styles.cardrow}>
        <div className={styles.detailsCard}>
          <div className={styles.cardTitle}>
            <User className={styles.titleIcon} />
            Personal Information
          </div>
          <div className={styles.cardContent}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <IoPersonSharp size={11} color="#4a84ff" /> Full Name
                </label>
                <p className={styles.infoValue}>
                  {visit?.prefix ?? ""} {visit?.firstName ?? ""}{" "}
                  {visit?.lastName ?? ""}
                </p>
              </div>

              {/* Phone with Call Button */}
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <FaPhoneAlt size={11} color="#4a84ff" />
                  Phone Number
                </label>
                <p className={styles.infoValue}>
                  <button
                    className={styles.whatsbtn}
                    onClick={() => {
                      console.log("clicked 1");

                      socket?.emit("callCustomerWeb", {
                        lead: visit?._id,
                        phoneNumber: `${visit?.countryCode}${visit?.phoneNumber}`,
                        type: "whatsapp",
                        message: "hey",
                        userId: user?._id,
                      });

                      console.log("clicked 2");
                    }}
                  >
                    <IoLogoWhatsapp size={12} />
                  </button>
                  <button
                    className={styles.verifiedBadge}
                    onClick={() => {
                      onCall({
                        ...visit,
                        phoneNumber: visit.phoneNumber,
                      });
                    }}
                  >
                    <MdCall size={12} />
                  </button>
                  {/* <FiPhoneCall
                    size={15}
                    color="dodgerblue"
                    style={{ cursor: "pointer", color: "green" }}
                    onClick={() =>
                      onCall({
                        ...visit,
                        phoneNumber: visit.phoneNumber,
                      })
                    }
                    title="Make a call to number"
                  /> */}
                  {visit?.phoneNumber ?? "NA"}
                </p>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <MdEmail size={11} color="#4a84ff" />
                  Email
                </label>
                <p className={styles.infoValue}>{visit.email ?? "NA"}</p>
              </div>

              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <FaPhoneAlt size={11} color="#4a84ff" />
                  Alt Phone
                </label>
                <div className={styles.phoneContainer}>
                  <p className={styles.infoValue}>
                    <button
                      className={styles.whatsbtn}
                      onClick={() => {
                        console.log("clicked 1");

                        socket?.emit("callCustomerWeb", {
                          lead: visit?._id,
                          phoneNumber: `${visit?.countryCode}${visit.altPhoneNumber}`,
                          type: "whatsapp",
                          message: "hey",
                          userId: user?._id,
                        });

                        console.log("clicked 2");
                      }}
                    >
                      <IoLogoWhatsapp size={12} />
                    </button>
                    <button
                      className={styles.verifiedBadge}
                      onClick={() => {
                        onCall({
                          ...visit,
                          phoneNumber: visit.altPhoneNumber,
                        });
                      }}
                    >
                      <MdCall size={12} />
                    </button>
                    {visit.countryCode} {visit.altPhoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Project Information */}
        <div className={styles.detailsCard}>
          <div className={styles.cardTitle}>
            <Building className={styles.titleIcon} />
            Lead Information
          </div>
          <div className={styles.cardContent}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <IoIosPerson size={12} color="#4a84ff" />
                  Property Type
                </label>
                <p className={styles.infoValue}>
                  {visit?.propertyType ?? "NA"}
                </p>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <IoIosPerson size={12} color="#4a84ff" />
                  Channel Partner
                </label>
                <p className={styles.infoValue}>
                  {visit?.channelPartner?.firmName ?? ""}
                </p>
              </div>
              <div className={styles.infoItem} style={{ paddingLeft: "5px" }}>
                <label className={styles.infoLabel}>
                  <PiBuildingApartmentBold size={14} color="#4a84ff" />
                  Apartment Choices
                </label>
                <div className={styles.choicesList}>
                  {visit.requirement?.map((choice: any, index: number) => (
                    <span key={choice} className={styles.choiceBadge}>
                      {choice}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <BsFillBuildingFill size={12} color="#4a84ff" />
                  Projects
                </label>
                <div className={styles.projectsList}>
                  {visit.project?.map((project: any, index: number) => (
                    <span key={index} className={styles.projectBadge}>
                      {project?.name ?? ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cardrow}>
        {/* Lead Information */}
        <div className={styles.detailsCard}>
          <div className={styles.cardTitle}>
            <Calendar className={styles.titleIcon} />
            Work Information
          </div>
          <div className={styles.cardContent}>
            <div className={styles.infoGridwork}>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  {" "}
                  <Calendar size={14} color="#4a84ff" />
                  Occupation
                </label>
                <p className={styles.infoValue}>
                  {visit?.occupation == "" || visit?.occupation == null
                    ? "NA"
                    : visit?.occupation}
                </p>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  {" "}
                  <Calendar size={14} color="#4a84ff" />
                  Remark
                </label>
                <p className={styles.infoValue}>
                  {" "}
                  {visit?.additionLinRemark ?? "NA"}
                </p>
              </div>
              <div
                className={styles.infoItem}
                style={{ flexDirection: "column" }}
              >
                {visit?.linkedIn && visit.linkedIn !== "" && (
                  <div className={styles.buttonGroup}>
                    {visit?.linkedIn && (
                      <button
                        className={`${styles.infoButton} ${styles.visitBtn}`}
                        onClick={() =>
                          window.open(
                            visit.linkedIn || "https://evhomes.tech/",
                            "_blank"
                          )
                        }
                      >
                        <span>🔗 Visit Profile</span>
                      </button>
                    )}

                    {visit?.uploadedLinkedIn && (
                      <button
                        className={`${styles.infoButton} ${styles.visitBtn}`}
                        onClick={() =>
                          window.open(
                            visit.uploadedLinkedIn || "https://evhomes.tech/",
                            "_blank"
                          )
                        }
                      >
                        <span>📄 View Document</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
