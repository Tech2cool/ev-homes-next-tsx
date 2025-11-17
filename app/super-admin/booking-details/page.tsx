"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "../lead-details/lead-details.module.css";
import bookstyle from "./booking.module.css";
import {
  FaUser,
  FaBolt,
  FaTasks,
  FaHistory,
  FaMapMarkedAlt,
  FaExchangeAlt,
  FaFileContract,
  FaClipboardList,
  FaBuilding,
  FaUserTie,
  FaHandshake,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  MdCall,
  MdAddCall,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
  MdNoteAlt,
} from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io5";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Edit,
  FileText,
  Menu,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter, useSearchParams } from "next/navigation";
import { HiDocumentCheck } from "react-icons/hi2";
import { IoMdRemove } from "react-icons/io";
import { FaHouseChimney } from "react-icons/fa6";
import BookingQuikAccess from "@/components/lead-details-components/bookingquikaccess";
import OverviewDetails from "@/components/lead-details-components/Booking-details-components/bookingoverview";
import ApplicantOverview from "@/components/lead-details-components/Booking-details-components/applicantoverview";
import BookingFeedback from "@/components/lead-details-components/Booking-details-components/bookingfeedback";
import AddBooking from "@/components/lead-details-components/Dailog/addbooking";
import { Leadbookingfilter } from "@/components/lead-details-components/Booking-details-components/bookingfilterdailog";
import { useData } from "@/providers/dataContext";
import { useUser } from "@/providers/userContext";
import useDebounce from "@/hooks/useDebounce";
import { PiSidebarSimple } from "react-icons/pi";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

const BookingDetails = () => {
  const {
    searchPostSaleLeadInfo,
    loadingPostSaleLeads,

    postSaleleads,
    currentLead,
    fetchPostSaleLeads,
    getLeadByBookingId,
    getClosingManagers,
  } = useData(); 
  const { user, loading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const postSaleId = searchParams.get("id");
  const status = searchParams.get("status");

  const [SelectedLead, setSelectedLead] = useState<PostSaleLead | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showaddbooking, setshowaddbooking] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<OurProject[]>([]);
  const [closingManagers, setClosingManagers] = useState<Employee[]>([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentStage = "Confirm Booking";
  const isConfirmed =
    currentStage === "Confirm Booking" || currentStage === "Registration Done";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (postSaleId && postSaleleads!.length > 0) {
      const foundVisit = postSaleleads?.find((v: any) => v?._id === postSaleId);
      if (foundVisit) {
        setSelectedLead(foundVisit);
      }
    }
  }, [postSaleId, postSaleleads]);

  useEffect(() => {
    if (user && !loading) {
      console.log("use effect dashboard");

      getClosingManagers();
    }
  }, [user, loading]);

  useEffect(() => {
    if (SelectedLead) {
      getLeadByBookingId(SelectedLead._id ?? "");
    }
  }, [SelectedLead]);

  useEffect(() => {
    if (user && !loading) {
      const statusParam = searchParams.get("status");
      const projectIdParam = searchParams.get("projectId");

      fetchPostSaleLeads({
        query: debouncedSearchQuery,
        page: 1,
        limit: 10,
        status: statusParam,
        project: projectIdParam,
      });
    }
  }, [user, loading, debouncedSearchQuery, searchParams]);

  const loadMoreLeads = useCallback(async () => {
    if (
      searchPostSaleLeadInfo &&
      searchPostSaleLeadInfo.page &&
      searchPostSaleLeadInfo.totalPages
    ) {
      const nextPage = searchPostSaleLeadInfo.page + 1;
      const statusParam = searchParams.get("status");
      const projectIdParam = searchParams.get("projectId");

      if (nextPage <= searchPostSaleLeadInfo.totalPages) {
        await fetchPostSaleLeads({
          query: debouncedSearchQuery,
          page: nextPage,
          limit: 10,
          status: statusParam,
          project: projectIdParam,
        });
      }
    }
  }, [
    searchPostSaleLeadInfo,
    fetchPostSaleLeads,
    debouncedSearchQuery,
    searchParams,
  ]);

  const handleApplyFilters = useCallback(
    (filterParams: any) => {
      fetchPostSaleLeads({
        query: debouncedSearchQuery,
        page: 1,
        limit: 10,
        ...filterParams, // Spread the filter parameters
      });
    },
    [debouncedSearchQuery, fetchPostSaleLeads]
  );

  const handleScroll = useCallback(
    (e: any) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const threshold = 100;

      if (scrollHeight - scrollTop <= clientHeight + threshold) {
        if (
          !loadingPostSaleLeads &&
          searchPostSaleLeadInfo?.page &&
          searchPostSaleLeadInfo.totalPages &&
          searchPostSaleLeadInfo.page < searchPostSaleLeadInfo.totalPages
        ) {
          loadMoreLeads();
        }
      }
    },
    [loadMoreLeads, loadingPostSaleLeads, searchPostSaleLeadInfo]
  );

  const handleSearchChange = async (query: string) => {
    setSearchQuery(query);
    setLoadingSearch(true);

    try {
      await fetchPostSaleLeads({ query });
    } finally {
      setLoadingSearch(false);
    }
  };
  const debouncedHandleScroll = useCallback(debounce(handleScroll, 200), [
    handleScroll,
  ]);

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
  const formatDate = (date: any) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  if (!isMobile) {
    return (
      <>
        <div className={styles.desktopContainer}>
           {sidebarOpen && (
                    <DashboardSidebar />
                  )}
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
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>
                <button
                  className={styles.filterBtn}
                  onClick={() => setShowFilterDialog(true)}
                >
                  <SlidersHorizontal className={styles.filterIcon} />
                </button>
              </div>
            </div>

            <div className={styles.visitsList} onScroll={debouncedHandleScroll}>
              {loadingSearch ? (
                <div className={styles.loadingContainer}>
                  <span className={styles.loadingText}>Loading...</span>
                </div>
              ) : postSaleleads && postSaleleads.length > 0 ? (
                <>
                  {postSaleleads?.map((lead, index) => (
                    <div
                      key={`${lead._id}-${index}-${lead.phoneNumber}`} // Add index and phone as fallback
                      className={`${bookstyle.visitCard} ${SelectedLead?._id === lead._id ? bookstyle.selectedCard : ""
                        }`}
                      onClick={() => {
                        setSelectedLead(lead);
                        // router.push(
                        //   `/lead-details?status=${status}&id=${lead._id}`,
                        //   {
                        //     scroll: false,
                        //   }
                        // );
                      }}
                    >
                      <div className={bookstyle.topRow}>
                        <div className={bookstyle.nameBlock}>
                          <div>
                            <div className={bookstyle.clientName}>
                              {lead.firstName} {lead.lastName}
                            </div>
                            <div className={bookstyle.clientPhone}>
                              {lead.countryCode} {lead.phoneNumber}
                            </div>
                          </div>
                        </div>
                        <div className={bookstyle.statusBlock}>
                          <div className={bookstyle.dateText}>05 Nov 25</div>
                          <button className={bookstyle.confirmButton}>
                            CONFIRM-BOOKING
                          </button>
                        </div>
                      </div>

                      <hr className={bookstyle.divider} />

                      <div className={bookstyle.statusTimeline}>
                        <div className={bookstyle.statusItem}>
                          <HiDocumentCheck
                            className={`${bookstyle.statusIcon} ${bookstyle.iconDone}`}
                          />
                          <span
                            className={`${bookstyle.statusLabel} ${bookstyle.labelActive}`}
                          >
                            EOI
                          </span>
                        </div>

                        <div
                          className={`${bookstyle.connector} ${bookstyle.connectorDone}`}
                        >
                          <IoMdRemove className={bookstyle.dashIcon} />
                        </div>

                        <div className={bookstyle.statusItem}>
                          <FaClipboardList
                            className={`${bookstyle.statusIcon} ${bookstyle.iconDone}`}
                          />
                          <span
                            className={`${bookstyle.statusLabel} ${bookstyle.labelActive}`}
                          >
                            Confirm Booking
                          </span>
                        </div>

                        <div className={bookstyle.connector}>
                          <IoMdRemove className={bookstyle.dashIcon} />
                        </div>

                        <div className={bookstyle.statusItem}>
                          <MdNoteAlt className={bookstyle.statusIcon} />
                          <span className={bookstyle.statusLabel}>
                            Registration Done
                          </span>
                        </div>
                      </div>
                      <div className={bookstyle.detailsGrid}>
                        <div className={bookstyle.gridItem}>
                          <p className={bookstyle.label}>
                            <FaBuilding />
                            Project
                          </p>
                          <p className={bookstyle.value}>
                            {lead.project?.name ?? "N/A"}
                          </p>
                        </div>
                        <div className={bookstyle.gridItem}>
                          <p className={bookstyle.label}>
                            <FaHouseChimney />
                            Unit No
                          </p>
                          <p className={bookstyle.value}>{lead.unitNo ?? "N/A"}</p>
                        </div>
                        <div className={bookstyle.gridItem}>
                          <p className={bookstyle.label}>
                            <FaUserTie />
                            Closing Manager
                          </p>
                          <p className={bookstyle.value}>
                            {lead.closingManager?.firstName ?? "NA"}
                          </p>
                        </div>
                        <div className={bookstyle.gridItem}>
                          <p className={bookstyle.label}>
                            <FaUser />
                            Post Sales Executive
                          </p>
                          <p className={bookstyle.value}>N/A</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className={styles.noResults}>No leads found</div>
              )}
            </div>
          </div>

          <div className={styles.rightPanel}>
            {SelectedLead ? (
              <>
                <div className={styles.detailsHeader}>
                  <div className={styles.headerInfo}>
                    <h2 className={styles.detailsTitle}>
                      {SelectedLead.firstName} {SelectedLead.lastName}{" "}
                    </h2>

                    <div className={styles.actionButtons}>
                      <button
                        className={styles.editb}
                        onClick={() => setshowaddbooking(true)}
                      >
                        <Edit size={15} />
                      </button>


                      <ThemeToggle />
                    </div>
                  </div>
                </div>

                <div className={styles.detsilpart}>
                  <div className={styles.detailsContent}>
                    {activeTab === "overview" && (
                      <VisitDetailsContent
                        visit={SelectedLead}
                        currentLead={currentLead}
                      />
                    )}
                    {activeTab === "access" && <BookingQuikAccess />}
                    {activeTab === "bookingoverview" && (
                      <OverviewDetails booking={SelectedLead} />
                    )}
                    {activeTab === "applicant" && (
                      <ApplicantOverview booking={SelectedLead} />
                    )}
                    {activeTab === "feedback" && (
                      <BookingFeedback
                        booking={SelectedLead}
                        lead={currentLead}
                      />
                    )}
                  </div>
                  <div className={styles.detailstab}>
                    <div className={styles.bookingnavbar}>
                      <button
                        className={`${styles.navItem} ${activeTab === "overview" ? styles.active : ""
                          }`}
                        onClick={() => setActiveTab("overview")}
                      >
                        <FaUser className={styles.icon} /> Lead Overview
                      </button>

                      <button
                        className={`${styles.navItem} ${activeTab === "access" ? styles.active : ""
                          }`}
                        onClick={() => setActiveTab("access")}
                      >
                        <FaBolt className={styles.icon} /> Quick Access
                      </button>

                      <button
                        className={`${styles.navItem} ${activeTab === "bookingoverview" ? styles.active : ""
                          }`}
                        onClick={() => setActiveTab("bookingoverview")}
                      >
                        <FaTasks className={styles.icon} /> Booking Overview
                      </button>

                      <button
                        className={`${styles.navItem} ${activeTab === "applicant" ? styles.active : ""
                          }`}
                        onClick={() => setActiveTab("applicant")}
                      >
                        <FaHistory className={styles.icon} /> Applicant Overview
                      </button>

                      <button
                        className={`${styles.navItem} ${activeTab === "feedback" ? styles.active : ""
                          }`}
                        onClick={() => setActiveTab("feedback")}
                      >
                        <FaMapMarkedAlt className={styles.icon} /> Feedback
                        Overview
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.emptyState}>
                <FileText className={styles.emptyIcon} />
                <p className={styles.emptyText}>
                  Select a lead to view details
                </p>
              </div>
            )}
          </div>
        </div>
        <Leadbookingfilter
          open={showFilterDialog}
          onClose={() => setShowFilterDialog(false)}
          projects={projects}
          closingManagers={closingManagers}
          onApplyFilters={handleApplyFilters}
        />
        {showaddbooking && <AddBooking openclick={setshowaddbooking} lead={currentLead}/>}
      </>
    );
  }

  if (!SelectedLead) {
    return (
      <>
        <div className={styles.leftSidebar}>
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
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
              <button
                className={styles.filterBtn}
                onClick={() => setShowFilterDialog(true)}
              >
                <SlidersHorizontal className={styles.filterIcon} />
              </button>
            </div>
          </div>

          <div className={styles.visitsList} onScroll={debouncedHandleScroll}>
            {loadingSearch ? (
              <div className={styles.loadingContainer}>
                <span className={styles.loadingText}>Loading...</span>
              </div>
            ) : postSaleleads && postSaleleads.length > 0 ? (
              <>
                {postSaleleads?.map((lead) => (
                  <div
                    key={lead._id}
                    className={bookstyle.visitCard}
                    onClick={() => {
                      setSelectedLead(lead);
                    }}
                  >
                    <div className={bookstyle.topRow}>
                      <div className={bookstyle.nameBlock}>
                        <div>
                          <div className={bookstyle.clientName}>
                            {lead.firstName} {lead.lastName}
                          </div>
                          <div className={bookstyle.clientPhone}>
                            {lead.countryCode} {lead.phoneNumber}
                          </div>
                        </div>
                      </div>
                      <div className={bookstyle.statusBlock}>
                        <div className={bookstyle.dateText}>05 Nov 25</div>
                        <button className={bookstyle.confirmButton}>
                          CONFIRM-BOOKING
                        </button>
                      </div>
                    </div>

                    <hr className={bookstyle.divider} />

                    <div className={bookstyle.statusTimeline}>
                      <div className={bookstyle.statusItem}>
                        <HiDocumentCheck
                          className={`${bookstyle.statusIcon} ${bookstyle.iconDone}`}
                        />
                        <span
                          className={`${bookstyle.statusLabel} ${bookstyle.labelActive}`}
                        >
                          EOI
                        </span>
                      </div>

                      <div
                        className={`${bookstyle.connector} ${bookstyle.connectorDone}`}
                      >
                        <IoMdRemove className={bookstyle.dashIcon} />
                      </div>

                      <div className={bookstyle.statusItem}>
                        <FaClipboardList
                          className={`${bookstyle.statusIcon} ${bookstyle.iconDone}`}
                        />
                        <span
                          className={`${bookstyle.statusLabel} ${bookstyle.labelActive}`}
                        >
                          Confirm Booking
                        </span>
                      </div>

                      <div className={bookstyle.connector}>
                        <IoMdRemove className={bookstyle.dashIcon} />
                      </div>

                      <div className={bookstyle.statusItem}>
                        <MdNoteAlt className={bookstyle.statusIcon} />
                        <span className={bookstyle.statusLabel}>
                          Registration Done
                        </span>
                      </div>
                    </div>
                    <div className={bookstyle.detailsGrid}>
                      <div className={bookstyle.gridItem}>
                        <p className={bookstyle.label}>
                          <FaBuilding />
                          Project
                        </p>
                        <p className={bookstyle.value}>
                          {lead.project?.name ?? "N/A"}
                        </p>
                      </div>
                      <div className={bookstyle.gridItem}>
                        <p className={bookstyle.label}>
                          <FaHouseChimney />
                          Unit No
                        </p>
                        <p className={bookstyle.value}>{lead.unitNo ?? "N/A"}</p>
                      </div>
                      <div className={bookstyle.gridItem}>
                        <p className={bookstyle.label}>
                          <FaUserTie />
                          Closing Manager
                        </p>
                        <p className={bookstyle.value}>
                          {lead.closingManager?.firstName ?? ""}
                        </p>
                      </div>
                      <div className={bookstyle.gridItem}>
                        <p className={bookstyle.label}>
                          <FaUser />
                          Post Sales Executive
                        </p>
                        <p className={bookstyle.value}>N/A</p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className={styles.noResults}>No leads found</div>
            )}
          </div>
        </div>
        <Leadbookingfilter
          open={showFilterDialog}
          onClose={() => setShowFilterDialog(false)}
          projects={projects}
          closingManagers={closingManagers}
          onApplyFilters={handleApplyFilters}
        />
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.detailsHeader}>
          <div className={styles.headerInfo}>
            <button
              className={styles.backBtn}
              onClick={() => {
                setSelectedLead(null);
              }}
            >
              <ArrowLeft className={styles.backIcon} />
            </button>

            <h2
              className={styles.detailsTitle}
              style={{ flexGrow: 1, textAlign: "left", marginLeft: "10px" }}
            >
              {SelectedLead.firstName} {SelectedLead.lastName}{" "}
            </h2>

            <div className={styles.actionButtons}>
              <button
                className={styles.editb}
                onClick={() => setshowaddbooking(true)}
              >
                <Edit size={15} />
              </button>

              <button
                className={styles.menuBtn}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? " " : <Menu className={styles.menuIcon} />}
              </button>

              {isOpen && (
                <div
                  className={styles.overlay}
                  onClick={() => setIsOpen(false)}
                />
              )}

              <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 0",
                  }}
                >
                  {" "}
                  
                  <ThemeToggle />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 z-50 p-2 lg:hidden"
                    style={{
                      color: "var(--text-color)",
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    ✕
                  </button>
                </div>

                <button
                  className={`${styles.navItem} ${activeTab === "overview" ? styles.active : ""
                    }`}
                  onClick={() => {
                    setActiveTab("overview");
                    setIsOpen(false);
                  }}
                >
                  <FaUser className={styles.icon} /> Client Overview
                </button>

                <button
                  className={`${styles.navItem} ${activeTab === "access" ? styles.active : ""
                    }`}
                  onClick={() => {
                    setActiveTab("access");
                    setIsOpen(false);
                  }}
                >
                  <FaBolt className={styles.icon} /> Quick Access
                </button>

                <button
                  className={`${styles.navItem} ${activeTab === "bookingoverview" ? styles.active : ""
                    }`}
                  onClick={() => {
                    setActiveTab("bookingoverview");
                    setIsOpen(false);
                  }}
                >
                  <FaTasks className={styles.icon} /> Booking Overview
                </button>

                <button
                  className={`${styles.navItem} ${activeTab === "applicant" ? styles.active : ""
                    }`}
                  onClick={() => {
                    setActiveTab("applicant");
                    setIsOpen(false);
                  }}
                >
                  <FaHistory className={styles.icon} /> Applicant Overview
                </button>

                <button
                  className={`${styles.navItem} ${activeTab === "feedback" ? styles.active : ""
                    }`}
                  onClick={() => {
                    setActiveTab("feedback");
                    setIsOpen(false);
                  }}
                >
                  <FaMapMarkedAlt className={styles.icon} /> Feedback Overview
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.detsilpart}>
          <div className={styles.detailsContent}>
            {activeTab === "overview" && SelectedLead && (
              <VisitDetailsContent
                visit={SelectedLead}
                currentLead={currentLead}
              />
            )}

            {activeTab === "access" && <BookingQuikAccess />}

            {activeTab === "bookingoverview" && (
              <OverviewDetails booking={SelectedLead} />
            )}

            {activeTab === "applicant" && (
              <ApplicantOverview booking={SelectedLead} />
            )}

            {activeTab === "feedback" && (
              <BookingFeedback
                booking={SelectedLead}
                lead={currentLead}
              />
            )}
          </div>
        </div>
      </div>

      {showaddbooking && <AddBooking openclick={setshowaddbooking} lead={currentLead}/>}
    </>
  );
};

export default BookingDetails;

const VisitDetailsContent = ({
  visit,
  currentLead,
}: {
  visit: PostSaleLead;
  currentLead: Lead | null;
}) => (
  <div className={bookstyle.visitContainer}>
    <div className={bookstyle.headerRow}>
      <div>
        <h3 className={bookstyle.title}>Lead Overiew</h3>
        <p className={bookstyle.subtitle}>
          <MdAddCall
            size={16}
            color="dodgerblue"
            style={{ cursor: "pointer" }}
          />{" "}
          {visit.countryCode} {visit.phoneNumber}{" "}
        </p>
      </div>
    </div>

    <div className={bookstyle.infoGrid}>
      <div
        className={`${bookstyle.infoItem} ${bookstyle.infoItemChannelPartner}`}
      >
        <p className={bookstyle.cardlabel}>
          <FaHandshake
            className={`${bookstyle.iconbg} ${bookstyle.iconChannelPartner}`}
          />{" "}
          Channel Partner
        </p>
        <p className={bookstyle.cardvalue}>
          {currentLead?.channelPartner?.firmName ?? "N/A"}
        </p>
      </div>

      <div
        className={`${bookstyle.infoItem} ${bookstyle.infoItemLeadReceived}`}
      >
        <p className={bookstyle.cardlabel}>
          <FaCalendarAlt
            className={`${bookstyle.iconbg} ${bookstyle.iconLeadReceived}`}
          />{" "}
          Lead Received
        </p>
        <p className={bookstyle.cardvalue}>
          {currentLead?.startDate
            ? new Date(currentLead?.startDate).toLocaleDateString()
            : "N/A"}
        </p>
      </div>

      <div className={`${bookstyle.infoItem} ${bookstyle.infoItemTeamLeader}`}>
        <p className={bookstyle.cardlabel}>
          <FaUserTie
            className={`${bookstyle.iconbg} ${bookstyle.iconTeamLeader}`}
          />{" "}
          Team Leader
        </p>
        <p className={bookstyle.cardvalue}>
          {visit.closingManager?.firstName ?? ""}{" "}
          {visit.closingManager?.lastName ?? ""}
        </p>
      </div>

      <div className={`${bookstyle.infoItem} ${bookstyle.infoItemRevisitDate}`}>
        <p className={bookstyle.cardlabel}>
          <FaCalendarAlt
            className={`${bookstyle.iconbg} ${bookstyle.iconRevisitDate}`}
          />{" "}
          Revisit Date
        </p>
        <p className={bookstyle.cardvalue}>
          {currentLead?.revisitRef?.date
            ? new Date(currentLead?.revisitRef?.date).toLocaleDateString()
            : "N/A"}
        </p>
      </div>

      <div className={`${bookstyle.infoItem} ${bookstyle.infoItemBookingDate}`}>
        <p className={bookstyle.cardlabel}>
          <FaCalendarAlt
            className={`${bookstyle.iconbg} ${bookstyle.iconBookingDate}`}
          />{" "}
          Booking Date
        </p>
        <p className={bookstyle.cardvalue}>
          {visit.date ? new Date(visit.date).toLocaleDateString() : "N/A"}
        </p>
      </div>
    </div>
  </div>
);
