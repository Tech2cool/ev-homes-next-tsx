"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  X,
  Eye,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  SlidersHorizontal,
  PersonStanding,
} from "lucide-react";

import React from "react";
import useDebounce from "@/hooks/useDebounce";
import { useUser } from "@/providers/userContext";
import { useData } from "@/providers/dataContext";
import { FilterDialog } from "@/components/visit-components/filterDialog";
import ApprovalDialog from "@/components/visit-components/approvalDialog";
import PdfDialog from "@/components/visit-components/pdfDialog";
import EditDialog from "@/components/lead-details-components/edit-dialog";

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
  const [selectedVisit, setSelectedVisit] = useState<Lead | null>(null);
  const [similarVisits, setSimilarVisits] = useState<Lead[]>([]);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showSimilarVisits, setShowSimilarVisits] = useState<boolean>(false);
  const [showFilterDialog, setShowFilterDialog] = useState<boolean>(false); // Changed from showFilters
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  // Add refs to prevent multiple calls
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  // Filter states
  const [filters, setFilters] = useState({
    status: "",
    source: "",
    visitType: "",
    location: "",
    dateFrom: "",
    dateTo: "",
  });

  const { user, loading } = useUser();
  const {
    fetchTeamLeaderReportingToLeads,
    leadInfo,
    leads,
    loadingLeads,
    fetchingMoreLeads,
  } = useData();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
        setSelectedVisit(foundVisit);
        // Find similar visits logic here if needed
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

      // loadingRef.current = true;
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

    // Handle booking cancelled
    if (lowerStatus.includes("booking") && bookingStatus === "cancelled") {
      return styles.cancelled; // Add this class to your CSS module
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

  const handleVisitSelect = (selectedVisit: Lead) => {
    router.push(`/lead-details?id=${selectedVisit._id}`);
    setShowSidebar(false);
  };

  const handleBackToList = () => {
    router.push("/lead-details");
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      source: "",
      visitType: "",
      location: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  // const getUniqueValues = (key) => {
  //   return [
  //     ...new Set(visits?.map((visit) => visit[key]).filter(Boolean) || []),
  //   ];
  // };

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
            {/* Filters Toggle - Now opens dialog */}
            <button
              className={styles.filterBtn}
              onClick={() => setShowFilterDialog(true)}
            >
              <SlidersHorizontal className={styles.filterIcon} />
              Filters
            </button>
          </div>

          <div
            className={styles.visitsList}
              onScroll={debouncedHandleScroll}  
          >
            {leads?.map((visit) => (
              <div
                key={visit._id}
                className={`${styles.visitCard} ${
                  selectedVisit?._id === visit._id ? styles.selectedCard : ""
                }`}
                onClick={() => {
                  setSelectedVisit(visit);
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
                  {/* <span
                    className={`${styles.statusBadge} ${getStatusColor(
                      visit?.approvalStatus || ""
                    )}`}
                  >
                    {visit?.approvalStatus}
                  </span> */}
                </div>
                <div className={styles.cardDetails}>
                  <div className={styles.detailRow}>
                    <Phone className={styles.icon} />
                    <span>
                      {visit?.countryCode ?? ""} {visit?.phoneNumber ?? "NA"}
                    </span>
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
                    valid Till:
                    {visit.cycle?.validTill ? (
                      <span>{formatDate(new Date(visit.cycle.validTill))}</span>
                    ) : (
                      <span>Not available</span>
                    )}
                  </div>

                  <div className={styles.detailRow}>
                    <Calendar className={styles.icon} />
                    Team Leader :
                    {visit.teamLeader ? (
                      <span>
                        {visit.teamLeader.firstName ?? ""}{" "}
                        {visit.teamLeader.lastName ?? ""}
                      </span>
                    ) : (
                      <span>Not available</span>
                    )}
                  </div>

                  {/* <div className={styles.detailRow}>
                    <Calendar className={styles.icon} />
                    {visit.date != null && (
                      <span>
                        {formatDate(visit?.date)} at {formatTime(visit.date)}
                      </span>
                    )}
                  </div> */}
                  <div className={styles.detailRow}>
                    <PersonStanding className={styles.icon} />
                    Client Status:
                    <span>{visit.clientInterestedStatus}</span>
                    {/* <span
                      className={`${styles.sourceBadge} ${getSourceColor(
                        visit.source ?? ""
                      )}`}
                    >
                      {visit.source}
                    </span> */}
                    {/* <span className={styles.visitType}>
                      • {visit.visitType}
                    </span> */}
                  </div>
                  {/* {visit.verified && (
                    <div className={styles.verifiedBadge}>✓ Verified</div>
                  )} */}
                </div>
              </div>
            ))}

            {/* Load More Button */}
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
          {selectedVisit ? (
            <>
              {/* Header with Actions */}
              <div className={styles.detailsHeader}>
                <div className={styles.headerInfo}>
                  <h2 className={styles.detailsTitle}>
                    {selectedVisit.prefix} {selectedVisit.firstName}{" "}
                    {selectedVisit.lastName}
                  </h2>
                  <div className={styles.badgeContainer}>
                    <span
                      className={`${styles.statusBadge} ${getStatusColor(
                        selectedVisit.approvalStatus ?? ""
                      )}`}
                    >
                      {selectedVisit.approvalStatus}
                    </span>
                    <span
                      className={`${styles.sourceBadge} ${getSourceColor(
                        selectedVisit.leadType ?? ""
                      )}`}
                    >
                      {selectedVisit.leadType}
                    </span>
                    <span className={styles.visitTypeBadge}>
                      {selectedVisit.leadType}
                    </span>
                    {selectedVisit.approvalStatus && (
                      <span className={styles.verifiedBadge}>✓ Verified</span>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className={styles.actionButtons}>
                  <button
                    className={styles.editBtn}
                    onClick={() => {
                      setEditFormData(selectedVisit);
                      setShowEditDialog(true);
                    }}
                  >
                    <Edit className={styles.btnIcon} />
                    Edit
                  </button>

                  {selectedVisit.approvalStatus === "pending" && (
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

              {/* Visit Details Content */}
              <div className={styles.detailsContent}>
                <VisitDetailsContent visit={selectedVisit} />
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
                    {/* {showSimilarVisits && (
                      <div className={styles.similarVisitsList}>
                        {similarVisits.map((visit) => (
                          <div
                            key={visit._id}
                            className={styles.similarVisitCard}
                            onClick={() => {
                              setSelectedVisit(visit);
                              router.push(`/visit-details?id=${visit._id}`, {
                                scroll: false,
                              });
                            }}
                          >
                            <div className={styles.similarVisitHeader}>
                              <span className={styles.similarVisitName}>
                                {visit.namePrefix} {visit.firstName}{" "}
                                {visit.lastName}
                              </span>
                              <span
                                className={`${
                                  styles.statusBadge
                                } ${getStatusColor(visit.approvalStatus)}`}
                              >
                                {visit.approvalStatus}
                              </span>
                            </div>
                            <div className={styles.similarVisitDetails}>
                              <span>{formatDate(visit.date)}</span>
                              <span>•</span>
                              <span>{visit.source}</span>
                              <span>•</span>
                              <span>{visit.location}</span>
                            </div>
                            <button className={styles.overviewBtn}>
                              <Eye className={styles.overviewIcon} />
                              Show Overview
                            </button>
                          </div>
                        ))}
                      </div>
                    )} */}
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
        {
          <FilterDialog
            open={showFilterDialog}
            onClose={() => setShowFilterDialog(false)}
            onOpenChange={setShowFilterDialog}
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
            visits={leads || []}
            resultCount={leads?.length || 0}
          />
        }

        {/* Mobile Sidebar */}
        {showSidebar && (
          <div
            className={styles.sidebarOverlay}
            onClick={() => setShowSidebar(false)}
          >
            <div
              className={styles.sidebar}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.sidebarHeader}>
                <h2 className={styles.sidebarTitle}>All Visits</h2>
                <button
                  className={styles.closeBtn}
                  onClick={() => setShowSidebar(false)}
                >
                  <X className={styles.closeIcon} />
                </button>
              </div>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search visits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              {/* Filters in Sidebar - Now opens dialog */}
              <div className={styles.sidebarFilters}>
                <button
                  className={styles.filtersToggle}
                  onClick={() => setShowFilterDialog(true)}
                >
                  <Filter className={styles.filterIcon} />
                  Filters
                  <ChevronDown className={styles.chevron} />
                </button>
              </div>

              <div className={styles.visitsList}>
                {leads?.map((visitItem) => (
                  <div
                    key={visitItem._id}
                    className={`${styles.visitCard} ${
                      visitItem._id === visitId ? styles.selectedCard : ""
                    }`}
                    onClick={() => handleVisitSelect(visitItem)}
                  >
                    <div className={styles.cardHeader}>
                      <h3 className={styles.clientName}>
                        {visitItem.prefix} {visitItem.firstName}{" "}
                        {visitItem.lastName}
                      </h3>
                      <span
                        className={`${styles.statusBadge} ${getStatusColor(
                          visitItem?.approvalStatus ?? ""
                        )}`}
                      >
                        {visitItem.approvalStatus}
                      </span>
                    </div>
                    <div className={styles.cardDetails}>
                      <div className={styles.detailRow}>
                        <Phone className={styles.icon} />
                        <span>
                          {visitItem.countryCode} {visitItem.phoneNumber}
                        </span>
                      </div>
                      <div className={styles.detailRow}>
                        <span
                          className={`${styles.sourceBadge} ${getSourceColor(
                            visitItem.leadType ?? ""
                          )}`}
                        >
                          {visitItem.leadType}
                        </span>
                        <span className={styles.visitType}>
                          • {visitItem.leadType}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Edit Dialog */}
        {showEditDialog && (
          <EditDialog
            visit={editFormData}
            onClose={() => setShowEditDialog(false)}
            onSave={(updatedVisit: any) => {
              console.log("Saving visit:", updatedVisit);
              setSelectedVisit(updatedVisit);
              setShowEditDialog(false);
            }}
          />
        )}
      </div>
    );
  }

  // Show list view when no visitId
  if (!visitId) {
    return (
      <div className={styles.container}>
        {/* List Header */}
        <div className={styles.listHeader}>
          <div className={styles.headerTop}>
            <h1 className={styles.listTitle}>Site Visits</h1>
            <button
              className={styles.filterBtn}
              onClick={() => setShowFilterDialog(true)}
            >
              <SlidersHorizontal className={styles.filterIcon} />
              Filters
            </button>
          </div>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search visits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Visits List */}
        <div className={styles.visitsList} onScroll={debouncedHandleScroll}>
          {leads?.map((visit) => (
            <div
              key={visit._id}
              className={styles.visitCard}
              onClick={() => handleVisitSelect(visit)}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.clientName}>
                  {visit.prefix} {visit.firstName} {visit.lastName}
                </h3>
                <span
                  className={`${styles.statusBadge} ${getStatusColor(
                    visit.approvalStatus ?? ""
                  )}`}
                >
                  {visit.approvalStatus}
                </span>
              </div>
              <div className={styles.cardDetails}>
                <div className={styles.detailRow}>
                  <Phone className={styles.icon} />
                  <span>
                    {visit.countryCode} {visit.phoneNumber}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <Calendar className={styles.icon} />

                  {visit.startDate != null && (
                    <span>
                      {formatDate(new Date(visit.startDate))} at{" "}
                      {formatTime(new Date(visit.startDate))}
                    </span>
                  )}
                </div>
                <div className={styles.detailRow}>
                  <Building className={styles.icon} />
                  <span
                    className={`${styles.sourceBadge} ${getSourceColor(
                      visit.leadType ?? ""
                    )}`}
                  >
                    {visit.leadType}
                  </span>
                  <span className={styles.visitType}>• {visit.leadType}</span>
                </div>
                {/* {visit.verified && (
                  <div className={styles.verifiedBadge}>✓ Verified</div>
                )} */}
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
        {
          <FilterDialog
            open={showFilterDialog}
            onOpenChange={setShowFilterDialog}
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
            visits={leads || []}
            resultCount={leads?.length || 0}
          />
        }
      </div>
    );
  }

  // Show detail view when visitId exists
  if (!selectedVisit) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <button className={styles.backBtn} onClick={handleBackToList}>
          <ArrowLeft className={styles.backIcon} />
        </button>
        <h1 className={styles.headerTitle}>
          {selectedVisit.prefix} {selectedVisit.firstName}{" "}
          {selectedVisit.lastName}
        </h1>
        <button className={styles.menuBtn} onClick={() => setShowSidebar(true)}>
          <Menu className={styles.menuIcon} />
        </button>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionBar}>
        <button className={styles.editBtn}>
          <Edit className={styles.btnIcon} />
          Edit
        </button>
        <button className={styles.pdfBtn}>
          <Download className={styles.btnIcon} />
          PDF
        </button>
        {selectedVisit.approvalStatus === "pending" && (
          <button className={styles.approveBtn}>
            <Check className={styles.btnIcon} />
            Approve
          </button>
        )}
      </div>

      {/* Visit Details Content */}
      <div className={styles.detailsContent}>
        <VisitDetailsContent visit={selectedVisit} />
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
            {showSimilarVisits && (
              <div className={styles.similarVisitsList}>
                {similarVisits.map((similarVisit) => (
                  <div
                    key={similarVisit._id}
                    className={styles.similarVisitCard}
                    onClick={() => handleVisitSelect(similarVisit)}
                  >
                    <div className={styles.similarVisitHeader}>
                      <span className={styles.similarVisitName}>
                        {similarVisit.prefix} {similarVisit.firstName}{" "}
                        {similarVisit.lastName}
                      </span>
                      <span
                        className={`${styles.statusBadge} ${getStatusColor(
                          similarVisit.approvalStatus ?? ""
                        )}`}
                      >
                        {similarVisit.approvalStatus}
                      </span>
                    </div>
                    <div className={styles.similarVisitDetails}>
                      {/* <span>{formatDate(similarVisit.date)}</span> */}
                      <span>•</span>
                      <span>{similarVisit.leadType}</span>
                      <span>•</span>
                      {/* <span>{similarVisit.location??""}</span> */}
                    </div>
                    <button className={styles.overviewBtn}>
                      <Eye className={styles.overviewIcon} />
                      Show Overview
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Sidebar */}
      {showSidebar && (
        <div
          className={styles.sidebarOverlay}
          onClick={() => setShowSidebar(false)}
        >
          <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
            <div className={styles.sidebarHeader}>
              <h2 className={styles.sidebarTitle}>All Visits</h2>
              <button
                className={styles.closeBtn}
                onClick={() => setShowSidebar(false)}
              >
                <X className={styles.closeIcon} />
              </button>
            </div>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search visits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            {/* Filters in Sidebar - Now opens dialog */}
            <div className={styles.sidebarFilters}>
              <button
                className={styles.filtersToggle}
                onClick={() => setShowFilterDialog(true)}
              >
                <Filter className={styles.filterIcon} />
                Filters
                <ChevronDown className={styles.chevron} />
              </button>
            </div>

            <div className={styles.visitsList}>
              {leads?.map((visitItem) => (
                <div
                  key={visitItem._id}
                  className={`${styles.visitCard} ${
                    visitItem._id === visitId ? styles.selectedCard : ""
                  }`}
                  onClick={() => handleVisitSelect(visitItem)}
                >
                  <div className={styles.cardHeader}>
                    <h3 className={styles.clientName}>
                      {visitItem.prefix} {visitItem.firstName}{" "}
                      {visitItem.lastName}
                    </h3>
                    <span
                      className={`${styles.statusBadge} ${getStatusColor(
                        visitItem.approvalStatus ?? ""
                      )}`}
                    >
                      {visitItem.approvalStatus}
                    </span>
                  </div>
                  <div className={styles.cardDetails}>
                    <div className={styles.detailRow}>
                      <Phone className={styles.icon} />
                      <span>
                        {visitItem.countryCode} {visitItem.phoneNumber}
                      </span>
                    </div>
                    <div className={styles.detailRow}>
                      <span
                        className={`${styles.sourceBadge} ${getSourceColor(
                          visitItem.leadType ?? ""
                        )}`}
                      >
                        {visitItem.leadType}
                      </span>
                      <span className={styles.visitType}>
                        • {visitItem.leadType}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filter Dialog */}
      {/* <FilterDialog
          open={showFilterDialog}
          onClose={() => setShowFilterDialog(false)}
          onOpenChange={setShowFilterDialog}
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
          visits={visits || []}
          resultCount={visits?.length || 0}
        /> */}

      {/* Edit Dialog */}
      {showSidebar && (
        <div
          className={styles.sidebarOverlay}
          onClick={() => setShowSidebar(false)}
        >
          <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
            <div className={styles.sidebarHeader}>
              <h2 className={styles.sidebarTitle}>All Visits</h2>
              <button
                className={styles.closeBtn}
                onClick={() => setShowSidebar(false)}
              >
                <X className={styles.closeIcon} />
              </button>
            </div>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search visits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            {/* Filters in Sidebar - Now opens dialog */}
            <div className={styles.sidebarFilters}>
              <button
                className={styles.filtersToggle}
                onClick={() => setShowFilterDialog(true)}
              >
                <Filter className={styles.filterIcon} />
                Filters
                <ChevronDown className={styles.chevron} />
              </button>
            </div>

            <div className={styles.visitsList}>
              {leads?.map((visitItem) => (
                <div
                  key={visitItem._id}
                  className={`${styles.visitCard} ${
                    visitItem._id === visitId ? styles.selectedCard : ""
                  }`}
                  onClick={() => handleVisitSelect(visitItem)}
                >
                  <div className={styles.cardHeader}>
                    <h3 className={styles.clientName}>
                      {visitItem.prefix} {visitItem.firstName}{" "}
                      {visitItem.lastName}
                    </h3>
                    <span
                      className={`${styles.statusBadge} ${getStatusColor(
                        visitItem.approvalStatus ?? ""
                      )}`}
                    >
                      {visitItem.approvalStatus}
                    </span>
                  </div>
                  <div className={styles.cardDetails}>
                    <div className={styles.detailRow}>
                      <Phone className={styles.icon} />
                      <span>
                        {visitItem.countryCode} {visitItem.phoneNumber}
                      </span>
                    </div>
                    <div className={styles.detailRow}>
                      <span
                        className={`${styles.sourceBadge} ${getSourceColor(
                          visitItem.leadType ?? ""
                        )}`}
                      >
                        {visitItem.leadType}
                      </span>
                      <span className={styles.visitType}>
                        • {visitItem.leadType}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Approval Dialog */}
      {showApprovalDialog && (
        <ApprovalDialog
          visit={selectedVisit}
          onClose={() => setShowApprovalDialog(false)}
          onSubmit={(action: any, remark: any) => {
            console.log("Approval action:", action, "Remark:", remark);
            const updatedVisit = {
              ...selectedVisit,
              approvalStatus: action,
              approvalRemark: remark,
              approveBy: user?.firstName || "Current User",
              approvalDate: new Date(),
            };
            // setSelectedVisit(updatedVisit);
            setShowApprovalDialog(false);
          }}
        />
      )}

      {/* PDF Generation Dialog */}
      {showPdfDialog && (
        <PdfDialog
          visit={selectedVisit}
          isGenerating={pdfGenerating}
          onClose={() => setShowPdfDialog(false)}
          onGenerate={() => {
            setPdfGenerating(true);
            setTimeout(() => {
              setPdfGenerating(false);
              setShowPdfDialog(false);
              console.log("PDF generated for visit:", selectedVisit._id);
            }, 3000);
          }}
        />
      )}
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

// VisitDetailsContent component (keeping it the same as your original)
const VisitDetailsContent = ({ visit }: { visit: Lead }) => {
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

            <div className={styles.infoItem}>
              <label className={styles.infoLabel}>Phone Number</label>
              <p className={styles.infoValue}>
                <Phone className={styles.infoIcon} />
                {visit.countryCode} {visit.phoneNumber}
              </p>
            </div>
            {visit?.altPhoneNumber && (
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>Alt Phone</label>
                <p className={styles.infoValue}>
                  <Phone className={styles.infoIcon} />
                  {visit.countryCode} {visit.altPhoneNumber}
                </p>
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
                {formatDate(visit.cycle.startDate)}
              </p>
            </div>
            <div className={styles.infoItem}>
              <label className={styles.infoLabel}>Valid Till</label>
              <p className={styles.infoValue}>
                <Calendar className={styles.infoIcon} />
                {formatDate(visit.cycle.validTill)}
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
            {/* Row 1: Assigned Date & Deadline */}
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

            {/* Row 2: Assigned By & Assigned To */}
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

            {/* Row 3: Task Details */}
            <div className={styles.infoGrid}>
              <div className={styles.infoItem} style={{ gridColumn: "1 / -1" }}>
                <label className={styles.infoLabel}>Task Details</label>
                <p className={styles.infoValue}>{visit?.taskRef.details}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback */}
      {/* {(visit?.visitRef!=null ) && (
        <div className={styles.detailsCard}>
          <div className={styles.cardTitle}>
            <FileText className={styles.titleIcon} />
            Follow up History
          </div>
          <div className={styles.cardContent}>
            {
              <div className={styles.feedbackItem}>
                <label className={styles.infoLabel}>Visit Feedback</label>
                <p className={styles.feedbackText}>{visit?.feedback ?? "NA"}</p>
              </div>
            }
            {visit?.cpfeedback && (
              <div className={styles.feedbackItem}>
                <label className={styles.infoLabel}>CP Feedback</label>
                <p className={styles.feedbackText}>
                  {visit?.cpfeedback ?? "NA"}
                </p>
              </div>
            )}
          </div>
        </div>
      )} */}
    </>
  );
};
