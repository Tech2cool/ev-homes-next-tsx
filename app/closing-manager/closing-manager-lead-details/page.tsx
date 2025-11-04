"use client";
import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import Image from "next/image";

import { useRouter, useSearchParams } from "next/navigation";
import { MdAddCall, MdCall, MdEmail } from "react-icons/md";
import styles from "../../super-admin/lead-details/lead-details.module.css";
import {
  FaExchangeAlt,
  FaHistory,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaTasks,
  FaBolt,
  FaFileContract,
  FaUser,
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
  FileText,
  Check,
  Edit,
  Building,
  User,
  Menu,
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import EditDialog from "@/components/lead-details-components/edit-dialog";
import { LeadFilterDialog } from "@/components/lead-details-components/filter-dialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BsFillBuildingFill } from "react-icons/bs";
import { PiBuildingApartmentBold } from "react-icons/pi";
import { CiLink } from "react-icons/ci";
import { IoIosPerson } from "react-icons/io";
import { useData } from "@/providers/dataContext";
import { useUser } from "@/providers/userContext";
import { dateFormatOnly } from "@/hooks/useDateFormat";

const closingdetilsWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Closingdetaispage />
    </Suspense>
  );
};

export default closingdetilsWrapper;

const Closingdetaispage = () => {
  const {
    searchLeadInfo,

    channelPartners,
    leads,
    fetchTeamLeaderLeads,
    employees,
    getProjects,
    getRequirements,
    projects,
    requirements,
  } = useData();

  const router = useRouter();
  const { user } = useUser();

  const visitId = "lead-1";
  // const [leads, setLeads] = useState<Lead[]>(DUMMY_LEADS);
  // const [SelectedLead, setSelectedLead] = useState<Lead | null>(DUMMY_LEADS[0] || null);
  const [SelectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [setQuery, query] = useState<String>("");


  const [similarVisits, setSimilarVisits] = useState<Lead[]>([]);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showSimilarVisits, setShowSimilarVisits] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState<boolean>(false);
  const [showPdfDialog, setShowPdfDialog] = useState<boolean>(false);
  const [pdfGenerating, setPdfGenerating] = useState<boolean>(false);

  const [editFormData, setEditFormData] = useState({});
  const [approvalData, setApprovalData] = useState({
    action: "approve",
    remark: "",
  });

  const loadingRef = useRef(false);
  const hasMoreRef = useRef(false);
  // const leadInfo = DUMMY_LEAD_INFO;
  const loading = false;
  const loadingLeads = false;
  const fetchingMoreLeads = false;
  // const user = DUMMY_USER;

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
    propertyType: null,
    taskType: null,
    project: null,
    bulkLead: null,
    member: null,
  });

  useEffect(() => {
    const fetchLeadsBasedOnStatus = async () => {
      if (user && !loading) {
        try {
          await fetchTeamLeaderLeads({
            id: user._id,
            query: "",
            page: (searchLeadInfo?.page ?? 0) + 1, // Start from page 1
            limit: 10,
            status: selectedFilter?.status,
          });
        } catch (error) {
          console.error("Error fetching leads:", error);
        }
      }
    };

    fetchLeadsBasedOnStatus();
  }, [user, loading, selectedFilter]); // Remove searchLeadInfo?.page from dependencies

  // useEffect(() => {
  //   if (visitId && leads!.length > 0) {
  //     const foundVisit = leads?.find((v: any) => v?._id === visitId);
  //     if (foundVisit) {
  //       setSelectedLead(foundVisit);
  //     }
  //   }
  // }, [visitId, leads]);

  const loadMoreLeads = useCallback(async () => {
    if (searchLeadInfo && searchLeadInfo.page && searchLeadInfo.totalPages) {
      const nextPage = searchLeadInfo.page + 1;
      if (nextPage <= searchLeadInfo.totalPages) {
        await fetchTeamLeaderLeads({
          id: user?._id,
          query: "",
          page: nextPage,
          limit: 10,
          status: selectedFilter?.status,
        });
      }
    }
  }, [searchLeadInfo, selectedFilter, fetchTeamLeaderLeads]);

  // Update your scroll handler
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

  // Fix the lead selection handler
  const handleVisitSelect = (lead: Lead) => {
    setSelectedLead(lead);
    const currentParams = new URLSearchParams(window.location.search);
    const statusParam = currentParams.get("status");

    let url = `/closing-manager/closing-manager-lead-details?id=${lead._id}`;
    if (statusParam) {
      url += `&status=${statusParam}`;
    }

    router.push(url, { scroll: false });
  };

  const [filters, setFilters] = useState({
    visitType: "",
    leadFilter: "",
    statusFilter: "",
    feedbackFilter: "",
    clientStatus: "",
    leadStatus: "",
    cycleStatus: 0,
    dateFrom: "",
    dateTo: "",
  });

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    console.log("Filters applied (Dummy):", newFilters);
  };

  const handleCall = useCallback((lead: any) => {
    alert(`Simulating call to: ${lead?.phoneNumber} for lead: ${lead?._id}`);
    console.log("Simulating call to:", lead);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const handleBackToList = () => {
    router.push("/closing-manager-lead-details");
  };

  const clearFilters = () => {
    setFilters({
      visitType: "",
      leadFilter: "string",
      statusFilter: "string",
      feedbackFilter: "string",
      clientStatus: "string",
      leadStatus: "string",
      cycleStatus: 0,
      dateFrom: "string",
      dateTo: "string",
    });
    console.log("Filters cleared (Dummy)");
  };

  //desktop view (list and details)
  if (!isMobile) {
    return (
      <div className={styles.desktopContainer}>
        <div className={styles.leftSidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.serchlable}>
              <h1 className={styles.title}>Leads</h1>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
            {leads?.map((visit: Lead, index: number) => {
              console.log(`.Rendering lead ${index}:`, visit);
              return (
                <div
                  key={`${visit._id}-${index}`}
                  className={`${styles.visitCard} ${
                    SelectedLead?._id === visit._id ? styles.selectedCard : ""
                  }`}

                  onClick={() => {
                    handleVisitSelect(visit);
                    // Preserve status in navigation
                    const currentParams = new URLSearchParams(
                      window.location.search
                    );
                    const statusParam = currentParams.get("status");

                    let url = `/closing-manager/closing-manager-lead-details?id=${visit._id}`;
                    if (statusParam) {
                      url += `&status=${statusParam}`;
                    }

                    router.push(url, { scroll: false });
                  }}
                >
                  <div className={styles.tag}></div>
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
                        {visit?.teamLeader?.firstName?.charAt(0)?.toUpperCase()}
                        {visit?.teamLeader?.lastName?.charAt(0)?.toUpperCase()}
                      </div>
                    ) : (
                      <span>Not available</span>
                    )}

                    <div className={styles.lastpart}>
                      {visit?.clientInterestedStatus ? (
                        <div className={styles.clientStatus}>
                          {visit?.clientInterestedStatus}
                        </div>
                      ) : null}
                      <div
                        style={{
                          backgroundColor: "rgba(3, 84, 214, 1)",
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
              );
            })}
            {searchLeadInfo?.page &&
              searchLeadInfo.totalPages &&
              searchLeadInfo.page < searchLeadInfo.totalPages && (
                <div className={styles.loadMoreContainer}>
                  <button
                    className={styles.loadMoreBtn}
                    onClick={loadMoreLeads}
                    disabled={loadingLeads}
                  >
                    {loadingLeads ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
          </div>
        </div>

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
                    <button
                      className={styles.verifiedBadge}
                      onClick={() => {
                        handleCall(SelectedLead);
                      }}
                    >
                      <MdCall size={15} />
                    </button>

                    <button
                      className={styles.whatsbtn}
                      onClick={() => {
                        alert("Simulating WhatsApp chat.");
                      }}
                    >
                      <IoLogoWhatsapp size={15} />
                    </button>

                    <ThemeToggle />
                    {SelectedLead.approvalStatus === "pending" && (
                      <button
                        className={styles.approveBtn}
                        onClick={() => setShowApprovalDialog(true)}
                      >
                        <Check className={styles.btnIcon} />
                        Approve/Reject
                      </button>
                    )}
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
                    />
                  )}

                  {activeTab === "access" && <QuickAccess />}

                  {activeTab === "taskDetails" && <TaskOverview />}
                  {activeTab === "followup" && <FollowUp />}
                  {activeTab === "siteVisit" && <VisitHistory />}
                  {activeTab === "transfer" && <TransferHistory />}
                  {activeTab === "booking" && (
                    <div className={styles.tabContent}>
                      <BookingOverview />
                    </div>
                  )}
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

                    <button
                      className={`${styles.navItem} ${
                        activeTab === "booking" ? styles.active : ""
                      }`}
                      onClick={() => setActiveTab("booking")}
                    >
                      <FaFileContract className={styles.icon} /> Booking
                      Overview
                    </button>
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
          onFiltersChange={handleFiltersChange}
          onClearFilters={() => {
            const cleared = {
              visitType: "",
              leadFilter: "",
              statusFilter: "",
              feedbackFilter: "",
              clientStatus: "",
              leadStatus: "",
              cycleStatus: 0,
              dateFrom: "",
              dateTo: "",
            };
            setFilters(cleared);
            console.log("Filters cleared and data refresh simulated.");
          }}
          visits={leads || []}
          resultCount={leads?.length || 0}
        />

        {showEditDialog && (
          <EditDialog
            visit={editFormData}
            onClose={() => setShowEditDialog(false)}
            onSave={(updatedVisit: any) => {
              console.log("Saving visit (Dummy):", updatedVisit);
              setSelectedLead(updatedVisit);
              // setLeads((prev) =>
              //   prev.map((l) => (l._id === updatedVisit._id ? updatedVisit : l))
              // );
              setShowEditDialog(false);
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
        <div className={styles.sidebarHeader}>
          <div className={styles.serchlable}>
            <h1 className={styles.title}>Leads</h1>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
          {leads?.map((visit) => (
            <div
              key={visit._id}
              className={`${styles.visitCard}`}
              onClick={() => {
                setSelectedLead(visit);
                router.push(`/closing-manager/closing-manager-lead-details?id=${visit._id}`, {
                  scroll: false,
                });
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
                  <p className={styles.trnsname}>Vicky</p>
                  <div className={styles.namecl}>
                    {visit?.firstName ?? ""} {visit?.lastName ?? ""}
                  </div>
                  <p className={styles.phone}>
                    {visit?.countryCode ?? "91"} {visit?.phoneNumber}
                  </p>
                </div>
              </div>

              <div className={styles.leadMeta}>
                <p>
                  Assign Date:{" "}
                  {visit.cycle?.startDate ? (
                    <span>{formatDate(new Date(visit.cycle.startDate))}</span>
                  ) : (
                    <span>Not available</span>
                  )}
                </p>
                <p>
                  Visit Deadline:{" "}
                  {visit.cycle?.validTill ? (
                    <span>{formatDate(new Date(visit.cycle.validTill))}</span>
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
                      {visit?.teamLeader?.firstName?.charAt(0)?.toUpperCase()}
                      {visit?.teamLeader?.lastName?.charAt(0)?.toUpperCase()}
                    </div>
                  ) : (
                    <span>Not available</span>
                  )}
                  <div
                    style={{
                      backgroundColor: "rgba(3, 84, 214, 1)",
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
          {hasMoreRef.current && (
            <div className={styles.loadMoreContainer}>
              <button
                className={styles.loadMoreBtn}
                onClick={() => loadMoreLeads}
                disabled={loadingRef.current}
              >
                {loadingRef.current ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile view (details)
  return (
    <div className={styles.container}>
      <div className={styles.detailsHeader}>
        <div className={styles.headerInfo}>
          <button
            className={styles.backBtn}
            onClick={() => {
              setSelectedLead(null);
              router.push("/closing-manager/closing-manager-lead-details", { scroll: false });
            }}
          >
            <ArrowLeft className={styles.backIcon} />
          </button>

          <div className={styles.actionButtons}>
            <button
              className={styles.verifiedBadge}
              onClick={() => {
                handleCall(SelectedLead);
              }}
            >
              <MdCall size={15} />
            </button>

            <button
              className={styles.whatsbtn}
              onClick={() => {
                alert("Simulating WhatsApp chat.");
              }}
            >
              <IoLogoWhatsapp size={15} />
            </button>

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
            {SelectedLead.approvalStatus === "pending" && (
              <button
                className={styles.approveBtn}
                onClick={() => setShowApprovalDialog(true)}
              >
                <Check className={styles.btnIcon} />
                Approve/Reject
              </button>
            )}
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
            />
          )}

          {activeTab === "access" && <QuickAccess />}

          {activeTab === "taskDetails" && <TaskOverview />}

          {activeTab === "followup" && <FollowUp />}

          {activeTab === "siteVisit" && <VisitHistory />}

          {activeTab === "transfer" && <TransferHistory />}

          {activeTab === "booking" && (
            <div className={styles.tabContent}>
              <BookingOverview />
            </div>
          )}
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
    </div>
  );
};

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

//Details Page (client overview for both)
const VisitDetailsContent = ({
  visit,
  onCall,
  user,
}: {
  visit: Lead;
  onCall: (lead: any) => void;
  user: any;
}) => {
  const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const renderValue = (value: any) => {
    if (value === null || value === undefined || value === "")
      return "Not specified";
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
          <span className={styles.statusValue}> {visit?.stage ?? "NA"}</span>
        </div>
        <div
          className={`${styles.statusCard} ${styles.red}`}
          style={{ border: "1px solid red" }}
        >
          <div className={styles.statusIcon}>⏰</div>
          <span className={styles.statusLabel}>Visit Deadline</span>
          <span className={styles.statusValue}>{dateFormatOnly(visit?.cycle?.validTill) }</span>
        </div>
        <div
          className={`${styles.statusCard} ${styles.purple}`}
          style={{ border: "1px solid purple" }}
        >
          <div className={styles.statusIcon}>👨🏻‍💼</div>
          <span className={styles.statusLabel}>Client Status</span>
          <span className={styles.statusValue}>
            {visit?.clientInterestedStatus ?? "NA"}
          </span>
        </div>
        <div
          className={`${styles.statusCard} ${styles.yellow}`}
          style={{ border: "1px solid yellow" }}
        >
          <div className={styles.statusIcon}>💡</div>
          <span className={styles.statusLabel}>Lead Status</span>
          <span className={styles.statusValue}>{visit?.interestedStatus ?? "NA"}</span>
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

              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <FaPhoneAlt size={11} color="#4a84ff" />
                  Phone Number
                </label>
                <p className={styles.infoValue}>
                  <MdAddCall
                    size={15}
                    color="dodgerblue"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      onCall({
                        ...visit,
                        phoneNumber: visit.phoneNumber,
                      })
                    }
                    title="Make a call to number"
                  />
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
                    <MdAddCall
                      size={15}
                      color="dodgerblue"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        onCall({
                          ...visit,
                          phoneNumber: visit.altPhoneNumber,
                        })
                      }
                      title="Make a call to alternate number"
                    />
                    {visit.countryCode} {visit.altPhoneNumber ?? "NA"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                <p className={styles.infoValue}>NA</p>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <IoIosPerson size={12} color="#4a84ff" />
                  Channel Partner
                </label>
                <p className={styles.infoValue}>
                  {visit?.channelPartner?.firmName ?? "NA"}
                </p>
              </div>
              <div className={styles.infoItem} style={{ paddingLeft: "5px" }}>
                <label className={styles.infoLabel}>
                  <PiBuildingApartmentBold size={14} color="#4a84ff" />
                  Apartment Choices
                </label>
                <div className={styles.choicesList}>
                  {visit.requirement && visit.requirement.length > 0 ? (
                    visit.requirement.map((choice: any) => (
                      <span key={choice} className={styles.choiceBadge}>
                        {choice}
                      </span>
                    ))
                  ) : (
                    <span className={styles.choiceBadge}>NA</span>
                  )}
                </div>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  <BsFillBuildingFill size={12} color="#4a84ff" />
                  Projects
                </label>
                <div className={styles.projectsList}>
                  {visit.project && visit.project.length > 0 ? (
                    visit.project.map((project: any, index: number) => (
                      <span key={index} className={styles.projectBadge}>
                        {project?.name ?? "NA"}
                      </span>
                    ))
                  ) : (
                    <span className={styles.projectBadge}>NA</span>
                  )}
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
                <p className={styles.infoValue}> {visit?.occupation ?? "NA"}</p>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>
                  {" "}
                  <Calendar size={14} color="#4a84ff" />
                  Remark
                </label>
                <p className={styles.infoValue}>
                  {visit?.additionLinRemark ?? "NA"}
                </p>
              </div>
              <div
                className={styles.infoItem}
                style={{ flexDirection: "column" }}
              >
                <div className={`${styles.infoHeader} ${styles.center}`}>
                  <CiLink size={18} color="#4a84ff" />

                  <label className={styles.infoLabel}>LinkedIn</label>
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.infoButton} ${styles.visitBtn}`}
                    onClick={() => alert("Simulating Visit Profile")}
                  >
                    <span>🔗 Visit Profile</span>
                  </button>
                  <button
                    className={`${styles.infoButton} ${styles.visitBtn}`}
                    onClick={() => alert("Simulating View Document")}
                  >
                    <span>📄 View Document</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
