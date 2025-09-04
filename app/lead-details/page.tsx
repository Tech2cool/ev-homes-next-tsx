"use client";
import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MdAddCall } from "react-icons/md";
import styles from "./lead-details.module.css";
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
} from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import { useUser } from "@/providers/userContext";
import { useData } from "@/providers/dataContext";
import EditDialog from "@/components/lead-details-components/edit-dialog";
import { LeadFilterDialog } from "@/components/lead-details-components/filter-dialog";
const VisitDetailWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeadDetailsPage />
    </Suspense>
  );
};

export default VisitDetailWrapper;

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

  const [showFilterDialog, setShowFilterDialog] = useState(false);

  // Dialog states
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState<boolean>(false);
  const [showPdfDialog, setShowPdfDialog] = useState<boolean>(false);
  const [pdfGenerating, setPdfGenerating] = useState<boolean>(false);

  // Form states
  const [editFormData, setEditFormData] = useState({});
  const [approvalData, setApprovalData] = useState({
    action: "approve",
    remark: "",
  });

  const debouncedSearch = useDebounce(searchTerm, 500);
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
    dateFrom: "",
    dateTo: "",
  });

  const { user, loading, getSocket, reconnectSocket } = useUser();
  const {
    fetchTeamLeaderReportingToLeads,
    leadInfo,
    leads,
    loadingLeads,
    fetchingMoreLeads,
  } = useData();

  const socket = getSocket();

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);

    fetchTeamLeaderReportingToLeads({
      id: user?._id ?? null,
      status: newFilters.visitType || null,
      status2: newFilters.statusFilter || null,
      callData: newFilters.feedbackFilter || null,
      clientstatus: newFilters.clientStatus || null,
      leadstatus: newFilters.leadStatus || null,
      cycle: newFilters.cycleStatus || null,
      startDateDeadline: newFilters.dateFrom || null,
      endDateDeadline: newFilters.dateTo || null,
      page: 1,
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
  useEffect(() => {
    if (user && !loading) {
      console.log("Initial fetch - visit details");
      fetchTeamLeaderReportingToLeads({
        id: user?._id,
        query: searchTerm,
        page: 1,
        limit: 10,
      });
    }
  }, [user, loading]);

  // Initial data fetch
  useEffect(() => {
    fetchTeamLeaderReportingToLeads({
      id: user?._id,
      query: searchTerm,
      page: 1,
      limit: 10,
    });
  }, [debouncedSearch]);

  // Update refs when leadInfo changes
  useEffect(() => {
    if (leadInfo) {
      hasMoreRef.current = (leadInfo.page ?? 0) < (leadInfo.totalPages ?? 0);
      loadingRef.current = loadingLeads || fetchingMoreLeads;
    }
  }, [leadInfo, loadingLeads, fetchingMoreLeads]);

  // Find selected visit when visitId changes
  useEffect(() => {
    if (visitId && leads!.length > 0) {
      const foundVisit = leads?.find((v: any) => v?._id === visitId);
      if (foundVisit) {
        setSelectedLead(foundVisit);
      }
    }
  }, [visitId, leads]);

  // Fixed loadMoreVisits function
  const loadMoreLeads = useCallback(
    (resetPage = false) => {
      console.log("Load more called", {
        loadingRef: loadingRef.current,
        hasMoreRef: hasMoreRef.current,
        currentPage: leadInfo?.page,
        totalPages: leadInfo?.totalPages,
        resetPage,
      });
      if (loadingRef.current) {
        console.log("Already loading, skipping");
        return;
      }
      if (!resetPage && !hasMoreRef.current) {
        console.log("No more pages to load");
        return;
      }

      const page = resetPage ? 1 : (leadInfo?.page || 0) + 1;
      console.log(`Fetching page ${page}`);
      fetchTeamLeaderReportingToLeads({
        id: user?._id,
        query: searchTerm,
        page: page,
        limit: 10,
      });
    },
    [leadInfo, fetchTeamLeaderReportingToLeads]
  );

  const fetchLeads = () => {
    fetchTeamLeaderReportingToLeads({
      id: user?._id,
      ...filters,
      page: 1,
    });
  };

  // Fixed scroll handler with debouncing
  const handleScroll = useCallback(
    (e: any) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const threshold = 100;
      if (scrollHeight - scrollTop <= clientHeight + threshold) {
        console.log("Reached end of scroll");
        loadMoreLeads(false);
      }
    },
    [loadMoreLeads]
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

  const handleVisitSelect = (SelectedLead: Lead) => {
    router.push(`/lead-details?id=${SelectedLead._id}`);
    setShowSidebar(false);
  };

  const handleBackToList = () => {
    router.push("/lead-details");
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
  };

  // Desktop view - Two panel layout
  if (!isMobile) {
    return (
      <div className={styles.desktopContainer}>
        {/* Left Sidebar - Visits List with Filters */}
        <div className={styles.leftSidebar}>
          <div className={styles.sidebarHeader}>
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
                className={`${styles.visitCard} ${
                  SelectedLead?._id === visit._id ? styles.selectedCard : ""
                }`}
                onClick={() => {
                  setSelectedLead(visit);
                  router.push(`/lead-details?id=${visit._id}`, {
                    scroll: false,
                  });
                }}
              >
                <div className={styles.cardHeader}>
                  <h3 className={styles.clientName}>
                    {visit?.prefix ?? ""} {visit?.firstName ?? ""}{" "}
                    {visit?.lastName ?? ""}
                  </h3>
                </div>
                <div className={styles.cardDetails}>
                  <div className={styles.detailRow}>
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
                  </div>
                  <div className={styles.detailRow}>
                    <Calendar className={styles.icon} />
                    Tagging Date:
                    {visit.cycle?.startDate ? (
                      <span>{formatDate(new Date(visit.cycle.startDate))}</span>
                    ) : (
                      <span>Not available</span>
                    )}
                  </div>
                  <div className={styles.detailRow}>
                    <Calendar className={styles.icon} />
                    Valid Till:
                    {visit.cycle?.validTill ? (
                      <span>{formatDate(new Date(visit.cycle.validTill))}</span>
                    ) : (
                      <span>Not available</span>
                    )}
                  </div>
                  <div className={styles.detailRow}>
                    <Calendar className={styles.icon} />
                    Team Leader:
                    {visit.teamLeader ? (
                      <span>
                        {visit.teamLeader.firstName ?? ""}{" "}
                        {visit.teamLeader.lastName ?? ""}
                      </span>
                    ) : (
                      <span>Not available</span>
                    )}
                  </div>
                  <div className={styles.detailRow}>
                    <PersonStanding className={styles.icon} />
                    Client Status:
                    <span>{visit.clientInterestedStatus}</span>
                  </div>
                </div>
              </div>
            ))}
            {hasMoreRef.current && (
              <div className={styles.loadMoreContainer}>
                <button
                  className={styles.loadMoreBtn}
                  onClick={() => loadMoreLeads(false)}
                  disabled={loadingRef.current}
                >
                  {loadingRef.current ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Visit Details Preview */}
        <div className={styles.rightPanel}>
          {SelectedLead ? (
            <>
              {/* Header with Actions */}
              <div className={styles.detailsHeader}>
                <div className={styles.headerInfo}>
                  <h2 className={styles.detailsTitle}>
                    {SelectedLead.prefix} {SelectedLead.firstName}{" "}
                    {SelectedLead.lastName}
                  </h2>
                  <div className={styles.badgeContainer}>
                    <span
                      className={`${styles.statusBadge} ${getStatusColor(
                        SelectedLead.approvalStatus ?? ""
                      )}`}
                    >
                      {SelectedLead.approvalStatus}
                    </span>
                    <span
                      className={`${styles.sourceBadge} ${getSourceColor(
                        SelectedLead.leadType ?? ""
                      )}`}
                    >
                      {SelectedLead.leadType}
                    </span>
                    <span className={styles.visitTypeBadge}>
                      {SelectedLead.leadType}
                    </span>
                    {SelectedLead.approvalStatus && (
                      <span className={styles.verifiedBadge}>✓ Verified</span>
                    )}
                  </div>
                </div>
                {/* Action buttons */}
                <div className={styles.actionButtons}>
                  <button
                    className={styles.editBtn}
                    onClick={() => {
                      setEditFormData(SelectedLead);
                      setShowEditDialog(true);
                    }}
                  >
                    <Edit className={styles.btnIcon} />
                    Edit
                  </button>
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
              {/* Visit Details Content - Pass handleCall function */}
              <div className={styles.detailsContent}>
                <VisitDetailsContent
                  visit={SelectedLead}
                  onCall={handleCall}
                  user={user}
                />
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
            fetchTeamLeaderReportingToLeads({
              id: user?._id,
              page: 1,
            });
          }}
          visits={leads || []}
          resultCount={leads?.length || 0}
        />

        {/* Edit Dialog */}
        {showEditDialog && (
          <EditDialog
            visit={editFormData}
            onClose={() => setShowEditDialog(false)}
            onSave={(updatedVisit: any) => {
              console.log("Saving visit:", updatedVisit);
              setSelectedLead(updatedVisit);
              setShowEditDialog(false);
            }}
          />
        )}
      </div>
    );
  }

  // Mobile views remain the same but also pass handleCall to VisitDetailsContent
  // ... rest of your mobile code with similar changes

  // Show detail view when visitId exists
  if (!SelectedLead) {
    return (
      <div className={styles.leftSidebar}>
        <div className={styles.sidebarHeader}>
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
              // className={`${styles.visitCard} ${
              //   SelectedLead?._id === visit?._id ? styles.selectedCard : ""
              // }`}
              onClick={() => {
                setSelectedLead(visit);
                router.push(`/lead-details?id=${visit._id}`, {
                  scroll: false,
                });
              }}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.clientName}>
                  {visit?.prefix ?? ""} {visit?.firstName ?? ""}{" "}
                  {visit?.lastName ?? ""}
                </h3>
              </div>
              <div className={styles.cardDetails}>
                <div className={styles.detailRow}>
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
                </div>
                <div className={styles.detailRow}>
                  <Calendar className={styles.icon} />
                  Tagging Date:
                  {visit.cycle?.startDate ? (
                    <span>{formatDate(new Date(visit.cycle.startDate))}</span>
                  ) : (
                    <span>Not available</span>
                  )}
                </div>
                <div className={styles.detailRow}>
                  <Calendar className={styles.icon} />
                  Valid Till:
                  {visit.cycle?.validTill ? (
                    <span>{formatDate(new Date(visit.cycle.validTill))}</span>
                  ) : (
                    <span>Not available</span>
                  )}
                </div>
                <div className={styles.detailRow}>
                  <Calendar className={styles.icon} />
                  Team Leader:
                  {visit.teamLeader ? (
                    <span>
                      {visit.teamLeader.firstName ?? ""}{" "}
                      {visit.teamLeader.lastName ?? ""}
                    </span>
                  ) : (
                    <span>Not available</span>
                  )}
                </div>
                <div className={styles.detailRow}>
                  <PersonStanding className={styles.icon} />
                  Client Status:
                  <span>{visit.clientInterestedStatus}</span>
                </div>
              </div>
            </div>
          ))}
          {hasMoreRef.current && (
            <div className={styles.loadMoreContainer}>
              <button
                className={styles.loadMoreBtn}
                onClick={() => loadMoreLeads(false)}
                disabled={loadingRef.current}
              >
                {loadingRef.current ? "Loading..." : "Load More"}
              </button>
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
            fetchTeamLeaderReportingToLeads({
              id: user?._id,
              page: 1,
            });
          }}
          visits={leads || []}
          resultCount={leads?.length || 0}
        />

        {/* Edit Dialog */}
        {showEditDialog && (
          <EditDialog
            visit={editFormData}
            onClose={() => setShowEditDialog(false)}
            onSave={(updatedVisit: any) => {
              console.log("Saving visit:", updatedVisit);
              setSelectedLead(updatedVisit);
              setShowEditDialog(false);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <button
          className={styles.backBtn}
          onClick={() => {
            setSelectedLead(null);
            router.push("/lead-details", { scroll: false });
          }}
        >
          <ArrowLeft className={styles.backIcon} />
        </button>
        <h1 className={styles.headerTitle}>
          {SelectedLead.prefix} {SelectedLead.firstName} {SelectedLead.lastName}
        </h1>
        <button className={styles.menuBtn} onClick={() => setShowSidebar(true)}>
          <Menu className={styles.menuIcon} />
        </button>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionBar}>
        <button
          className={styles.editBtn}
          onClick={() => {
            setEditFormData(SelectedLead);
            setShowEditDialog(true);
          }}
        >
          <Edit className={styles.btnIcon} />
          Edit
        </button>
        <button className={styles.pdfBtn}>
          <Download className={styles.btnIcon} />
          PDF
        </button>
        {SelectedLead.approvalStatus === "pending" && (
          <button className={styles.approveBtn}>
            <Check className={styles.btnIcon} />
            Approve
          </button>
        )}
        {showEditDialog && (
          <EditDialog
            visit={editFormData}
            onClose={() => setShowEditDialog(false)}
            onSave={(updatedVisit: any) => {
              console.log("Saving visit:", updatedVisit);
              setSelectedLead(updatedVisit);
              setShowEditDialog(false);
            }}
          />
        )}
      </div>

      {/* Visit Details Content - Pass handleCall function */}
      <div className={styles.detailsContent}>
        <VisitDetailsContent
          visit={SelectedLead}
          onCall={handleCall}
          user={user}
        />
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
      {/* Personal Information */}
      <div className={styles.detailsCard}>
        <div className={styles.cardTitle}>
          <User className={styles.titleIcon} />
          Personal Information
        </div>
        <div className={styles.cardContent}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label className={styles.infoLabel}>Full Name</label>
              <p className={styles.infoValue}>
                {visit?.prefix ?? ""} {visit?.firstName ?? ""}{" "}
                {visit?.lastName ?? ""}
              </p>
            </div>

            {/* Phone with Call Button */}
            <div className={styles.infoItem}>
              <label className={styles.infoLabel}>Phone</label>
              <div className={styles.phoneContainer}>
                <div className={styles.detailRow}>
                  <MdAddCall
                    size={25}
                    color="dodgerblue"
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                    onClick={() => onCall(visit)}
                    title="Make a call"
                  />{" "}
                  <span>{visit?.phoneNumber ?? "NA"}</span>
                </div>
              </div>
            </div>

            {visit?.altPhoneNumber && (
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>Alt Phone</label>
                <div className={styles.phoneContainer}>
                  <p className={styles.infoValue}>
                    <Phone className={styles.infoIcon} />
                    {visit.countryCode} {visit.altPhoneNumber}
                  </p>
                  <MdAddCall
                    size={25}
                    color="dodgerblue"
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                    onClick={() =>
                      onCall({
                        ...visit,
                        phoneNumber: visit.altPhoneNumber,
                      })
                    }
                    title="Make a call to alternate number"
                  />
                </div>
              </div>
            )}

            {visit?.email && (
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>Email</label>
                <p className={styles.infoValue}>
                  <Mail className={styles.infoIcon} />
                  {visit.email}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lead Information */}
      <div className={styles.detailsCard}>
        <div className={styles.cardTitle}>
          <Calendar className={styles.titleIcon} />
          Lead Information
        </div>
        <div className={styles.cardContent}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label className={styles.infoLabel}>Tagging Date</label>
              <p className={styles.infoValue}>
                <Calendar className={styles.infoIcon} />
                {formatDate(visit?.cycle?.startDate ?? "")}
              </p>
            </div>
            <div className={styles.infoItem}>
              <label className={styles.infoLabel}>Valid Till</label>
              <p className={styles.infoValue}>
                <Calendar className={styles.infoIcon} />
                {formatDate(visit?.cycle?.validTill ?? "")}
              </p>
            </div>
            <div className={styles.infoItem}>
              <label className={styles.infoLabel}>Source</label>
              <p className={styles.infoValue}>{renderValue(visit.leadType)}</p>
            </div>
            {visit?.channelPartner != null && (
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>Channel Partner</label>
                <p className={styles.infoValue}>
                  {visit?.channelPartner?.firmName ?? ""}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Information */}
      <div className={styles.detailsCard}>
        <div className={styles.cardTitle}>
          <Building className={styles.titleIcon} />
          Project Information
        </div>
        <div className={styles.cardContent}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label className={styles.infoLabel}>Projects</label>
              <div className={styles.projectsList}>
                {visit.project?.map((project: any, index: number) => (
                  <span key={index} className={styles.projectBadge}>
                    {project?.name ?? ""}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.infoItem}>
              <label className={styles.infoLabel}>Apartment Choices</label>
              <div className={styles.choicesList}>
                {visit.requirement?.map((choice: any, index: number) => (
                  <span key={choice} className={styles.choiceBadge}>
                    {choice}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Information */}
      {visit.taskRef && (
        <div className={styles.detailsCard}>
          <div className={styles.cardTitle}>
            <User className={styles.titleIcon} />
            Task Details
          </div>
          <div className={styles.cardContent}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>Assigned Date</label>
                <p className={styles.infoValue}>
                  {formatDate(visit?.taskRef.assignDate)}
                </p>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>Deadline</label>
                <p className={styles.infoValue}>
                  {formatDate(visit?.taskRef.deadline)}
                </p>
              </div>
            </div>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>Assigned By</label>
                <p className={styles.infoValue}>
                  {visit?.taskRef.assignBy?.firstName ?? ""}{" "}
                  {visit?.taskRef.assignBy?.lastName ?? ""}
                </p>
              </div>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>Assigned To</label>
                <p className={styles.infoValue}>
                  {visit?.taskRef.assignTo?.firstName ?? ""}{" "}
                  {visit?.taskRef.assignTo?.lastName ?? ""}
                </p>
              </div>
            </div>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem} style={{ gridColumn: "1 / -1" }}>
                <label className={styles.infoLabel}>Task Details</label>
                <p className={styles.infoValue}>{visit?.taskRef.details}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
