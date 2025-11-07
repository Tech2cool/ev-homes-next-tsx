"use client";
import React, { useEffect, useState } from "react";
import styles from "../lead-details/lead-details.module.css";
import bookstyle from "./booking.module.css"
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
import { MdCall, MdAddCall, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank, MdNoteAlt } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io5";
import { ArrowLeft, Check, ChevronDown, ChevronUp, Edit, FileText, Menu, Search, SlidersHorizontal } from "lucide-react";


import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";
import { HiDocumentCheck } from "react-icons/hi2";
import { IoMdRemove } from "react-icons/io";
import { FaHouseChimney } from "react-icons/fa6";
import BookingQuikAccess from "@/components/lead-details-components/bookingquikaccess";
import OverviewDetails from "@/components/lead-details-components/Booking-details-components/bookingoverview";
import ApplicantOverview from "@/components/lead-details-components/Booking-details-components/applicantoverview";
import BookingFeedback from "@/components/lead-details-components/Booking-details-components/bookingfeedback";
import AddBooking from "@/components/lead-details-components/Dailog/addbooking";
import { Leadbookingfilter } from "@/components/lead-details-components/Booking-details-components/bookingfilterdailog";

interface Lead {
    _id: string;

    prefix?: string;
    firstName?: string;
    lastName?: string;

    phoneNumber?: string;
    altPhoneNumber?: string;
    email?: string;
    countryCode?: string;
    clientInterestedStatus?: string;
    interestedStatus?: string;
    occupation?: string;
    additionLinRemark?: string;
    approvalStatus?: string;
    stage?: string;
    cycle?: {
        startDate?: string;
        validTill?: string;
    };

    project?: { name: string }[];
    requirement?: string[];
    leadType?: string;
    unitNo?: string;

    leadReceived?: string;
    revisitDate?: string;
    bookingDate?: string;
    teamleader?: string;
    channelPartner?: string;
}

const dummyLeads: Lead[] = [
    {
        _id: "1",
        prefix: "Mr.",
        firstName: "Rahul",
        lastName: "Sharma",
        phoneNumber: "9876543210",
        altPhoneNumber: "9898989898",
        email: "rahul.sharma@example.com",
        countryCode: "+91",
        clientInterestedStatus: "Interested",
        interestedStatus: "Hot Lead",
        occupation: "Software Engineer",
        additionLinRemark: "Looking for early possession project",
        approvalStatus: "Approved",
        stage: "EOI Done",
        cycle: {
            startDate: "2024-11-01",
            validTill: "2024-12-31",
        },
        project: [{ name: "Golden EV Homes" }],
        requirement: ["2BHK", "Sea View", "Parking Included"],
        leadType: "Direct",
        unitNo: "A-203",
        leadReceived: "2024-11-05",
        revisitDate: "2024-11-20",
        bookingDate: "2024-12-01",
        teamleader: "Rahul Mehta",
        channelPartner: "Real Ested"
    },
    {
        _id: "2",
        prefix: "Ms.",
        firstName: "Neha",
        lastName: "Patel",
        phoneNumber: "9876501234",
        altPhoneNumber: "9898708708",
        email: "neha.patel@example.com",
        countryCode: "+91",
        clientInterestedStatus: "Not Sure",
        interestedStatus: "Warm Lead",
        occupation: "Doctor",
        additionLinRemark: "Interested if good discount available",
        approvalStatus: "In Progress",
        stage: "Site Visit Completed",
        cycle: {
            startDate: "2024-10-10",
            validTill: "2024-12-10",
        },
        project: [{ name: "Skyline Residency" }],
        requirement: ["3BHK", "High Floor", "Furnished"],
        leadType: "Referral",
        unitNo: "B-502",
        leadReceived: "2024-10-12",
        revisitDate: "2024-10-25",
        bookingDate: "2024-11-02",
        teamleader: "Ranjana Gupta",
        channelPartner: "Real Ested"
    },
    {
        _id: "3",
        prefix: "Mr.",
        firstName: "Amit",
        lastName: "Verma",
        phoneNumber: "9765123409",
        altPhoneNumber: "9765987643",
        email: "amit.verma@example.com",
        countryCode: "+91",
        clientInterestedStatus: "Not Interested",
        interestedStatus: "Cold Lead",
        occupation: "Businessman",
        additionLinRemark: "Will decide next year",
        approvalStatus: "Rejected",
        stage: "Lead Assigned",
        cycle: {
            startDate: "2024-09-15",
            validTill: "2024-11-15",
        },
        project: [{ name: "Eco City Towers" }],
        requirement: ["1BHK", "Budget Home"],
        leadType: "Online",
        unitNo: "C-109",
        leadReceived: "2024-09-16",
        revisitDate: "2024-10-05",
        bookingDate: "",
        teamleader: "Akash Arora",
        channelPartner: "Real Ested"
    },
    {
        _id: "4",
        prefix: "Mrs.",
        firstName: "Priya",
        lastName: "Kadam",
        phoneNumber: "9823456780",
        altPhoneNumber: "9823111222",
        email: "priya.kadam@example.com",
        countryCode: "+91",
        clientInterestedStatus: "Interested",
        interestedStatus: "Hot Lead",
        occupation: "Bank Manager",
        additionLinRemark: "Prefers ready-to-move property",
        approvalStatus: "Approved",
        stage: "Booking Confirmed",
        cycle: {
            startDate: "2024-10-01",
            validTill: "2024-12-31",
        },
        project: [{ name: "Green Valley Residency" }],
        requirement: ["2BHK", "Corner Flat", "Garden Facing"],
        leadType: "Channel Partner",
        unitNo: "D-405",
        leadReceived: "2024-10-03",
        revisitDate: "2024-10-20",
        bookingDate: "2024-11-05",
        teamleader: "Raj Gupta",
        channelPartner: "Real Ested"
    },
];

const BookingDetails = () => {
    const [selectedLead, setSelectedLead] = useState<Lead | null>(dummyLeads[0]);
    const [activeTab, setActiveTab] = useState("overview");
    const [isOpen, setIsOpen] = useState(false);

    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [showaddbooking, setshowaddbooking] = useState(false);
    const [showFilterDialog, setShowFilterDialog] = useState(false);

    const router = useRouter();
    const currentStage = "Confirm Booking";

    const isConfirmed = currentStage === "Confirm Booking" || currentStage === "Registration Done";


    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);



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
                    <div className={styles.leftSidebar}>
                        <div className={styles.sidebarHeader}>
                            <div className={styles.serchlable}>
                                <h1 className={styles.title}>Leads</h1>
                                <div className={styles.searchContainer}>
                                    <Search className={styles.searchIcon} />
                                    <input
                                        type="text"
                                        placeholder="Search leads..."
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
                        </div>

                        <div className={styles.visitsList}>
                            {dummyLeads.map((lead) => (
                                <div
                                    key={lead._id}
                                    className={`${bookstyle.visitCard} ${selectedLead?._id === lead._id ? bookstyle.selectedCard : ""
                                        }`}
                                    onClick={() => setSelectedLead(lead)}
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
                                            <HiDocumentCheck className={`${bookstyle.statusIcon} ${bookstyle.iconDone}`} />
                                            <span className={`${bookstyle.statusLabel} ${bookstyle.labelActive}`} >EOI</span>
                                        </div>

                                        <div className={`${bookstyle.connector} ${bookstyle.connectorDone}`}>
                                            <IoMdRemove className={bookstyle.dashIcon} />
                                        </div>

                                        <div className={bookstyle.statusItem}>
                                            <FaClipboardList className={`${bookstyle.statusIcon} ${bookstyle.iconDone}`} />
                                            <span className={`${bookstyle.statusLabel} ${bookstyle.labelActive}`}>Confirm Booking</span>
                                        </div>

                                        <div className={bookstyle.connector}>
                                            <IoMdRemove className={bookstyle.dashIcon} />
                                        </div>

                                        <div className={bookstyle.statusItem}>
                                            <MdNoteAlt className={bookstyle.statusIcon} />
                                            <span className={bookstyle.statusLabel}>Registration Done</span>
                                        </div>
                                    </div>
                                    <div className={bookstyle.detailsGrid}>
                                        <div className={bookstyle.gridItem}>
                                            <p className={bookstyle.label}><FaBuilding />Project</p>
                                            <p className={bookstyle.value}>
                                                {lead.project?.[0]?.name ?? 'N/A'}
                                            </p>
                                        </div>
                                        <div className={bookstyle.gridItem}>
                                            <p className={bookstyle.label}><FaHouseChimney />
                                                Unit No</p>
                                            <p className={bookstyle.value}>
                                                {lead.unitNo ?? "N/A"}
                                            </p>
                                        </div>
                                        <div className={bookstyle.gridItem}>
                                            <p className={bookstyle.label}><FaUserTie />
                                                Closing Manager</p>
                                            <p className={bookstyle.value}>
                                                {lead.teamleader ?? "NA"}
                                            </p>
                                        </div>
                                        <div className={bookstyle.gridItem}>
                                            <p className={bookstyle.label}><FaUser />
                                                Post Sales Executive</p>
                                            <p className={bookstyle.value}>N/A</p>
                                        </div>
                                    </div>


                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.rightPanel}>
                        {selectedLead ? (
                            <>
                                <div className={styles.detailsHeader}>
                                    <div className={styles.headerInfo}>
                                        <h2 className={styles.detailsTitle}>
                                            {selectedLead.prefix} {selectedLead.firstName}{" "}
                                            {selectedLead.lastName}{" "}

                                        </h2>

                                        <div className={styles.actionButtons}>
                                            <button
                                                className={styles.editb}
                                                onClick={() => setshowaddbooking(true)}
                                            >
                                                <Edit size={15} />

                                            </button>
                                            <button
                                                className={styles.verifiedBadge}
                                                onClick={() => alert("Calling " + selectedLead.phoneNumber)}
                                            >
                                                <MdCall size={15} />
                                            </button>

                                            <button
                                                className={styles.whatsbtn}
                                                onClick={() =>
                                                    alert(
                                                        `Opening WhatsApp chat with ${selectedLead.phoneNumber}`
                                                    )
                                                }
                                            >
                                                <IoLogoWhatsapp size={15} />
                                            </button>

                                            <ThemeToggle />

                                        </div>
                                    </div>

                                </div>


                                <div className={styles.detsilpart}>
                                    <div className={styles.detailsContent}>
                                        {activeTab === "overview" && (
                                            <VisitDetailsContent
                                                visit={selectedLead}

                                            />
                                        )}
                                        {activeTab === "access" && <BookingQuikAccess />}
                                        {activeTab === "bookingoverview" && <OverviewDetails />}
                                        {activeTab === "applicant" && <ApplicantOverview />}
                                        {activeTab === "feedback" && <BookingFeedback />}


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
                                                <FaMapMarkedAlt className={styles.icon} /> Feedback Overview
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
                </div>
                <Leadbookingfilter
                    open={showFilterDialog}
                    onClose={() => setShowFilterDialog(false)}

                />
                {showaddbooking && (
                    <AddBooking openclick={setshowaddbooking} />
                )}
            </>

        );
    }


    if (!selectedLead) {
        return (
            <>
                <div className={styles.leftSidebar}>
                    <div className={styles.sidebarHeader}>
                        <div className={styles.serchlable}>
                            <h1 className={styles.title}>Leads</h1>
                            <div className={styles.searchContainer}>
                                <Search className={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Search leads..."
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

                    </div>

                    <div className={styles.visitsList} >
                        {dummyLeads.map((lead) => (
                            <div

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
                                        <HiDocumentCheck className={`${bookstyle.statusIcon} ${bookstyle.iconDone}`} />
                                        <span className={`${bookstyle.statusLabel} ${bookstyle.labelActive}`} >EOI</span>
                                    </div>

                                    <div className={`${bookstyle.connector} ${bookstyle.connectorDone}`}>
                                        <IoMdRemove className={bookstyle.dashIcon} />
                                    </div>

                                    <div className={bookstyle.statusItem}>
                                        <FaClipboardList className={`${bookstyle.statusIcon} ${bookstyle.iconDone}`} />
                                        <span className={`${bookstyle.statusLabel} ${bookstyle.labelActive}`}>Confirm Booking</span>
                                    </div>

                                    <div className={bookstyle.connector}>
                                        <IoMdRemove className={bookstyle.dashIcon} />
                                    </div>

                                    <div className={bookstyle.statusItem}>
                                        <MdNoteAlt className={bookstyle.statusIcon} />
                                        <span className={bookstyle.statusLabel}>Registration Done</span>
                                    </div>
                                </div>
                                <div className={bookstyle.detailsGrid}>
                                    <div className={bookstyle.gridItem}>
                                        <p className={bookstyle.label}><FaBuilding />Project</p>
                                        <p className={bookstyle.value}>
                                            {lead.project?.[0]?.name ?? 'N/A'}
                                        </p>
                                    </div>
                                    <div className={bookstyle.gridItem}>
                                        <p className={bookstyle.label}><FaHouseChimney />
                                            Unit No</p>
                                        <p className={bookstyle.value}>
                                            {lead.unitNo ?? "N/A"}
                                        </p>
                                    </div>
                                    <div className={bookstyle.gridItem}>
                                        <p className={bookstyle.label}><FaUserTie />
                                            Closing Manager</p>
                                        <p className={bookstyle.value}>
                                            {lead.teamleader ?? ""}
                                        </p>
                                    </div>
                                    <div className={bookstyle.gridItem}>
                                        <p className={bookstyle.label}><FaUser />
                                            Post Sales Executive</p>
                                        <p className={bookstyle.value}>N/A</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Leadbookingfilter
                    open={showFilterDialog}
                    onClose={() => setShowFilterDialog(false)}

                />
            </>


        )
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

                        <h2 className={styles.detailsTitle} style={{ flexGrow: 1, textAlign: 'left', marginLeft: '10px' }}>
                            {selectedLead.prefix} {selectedLead.firstName}{" "}
                            {selectedLead.lastName}{" "}

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
                                        padding: "10px 0"
                                    }}
                                >  <button
                                    className={styles.verifiedBadge}
                                    onClick={() => selectedLead && alert("Calling " + selectedLead.phoneNumber)}
                                >
                                        <MdCall size={15} />
                                    </button>

                                    <button
                                        className={styles.whatsbtn}
                                        onClick={() => selectedLead &&
                                            alert(
                                                `Opening WhatsApp chat with ${selectedLead.phoneNumber}`
                                            )
                                        }
                                    >
                                        <IoLogoWhatsapp size={15} />
                                    </button>

                                    <ThemeToggle />
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="absolute top-4 right-4 z-50 p-2 lg:hidden"
                                        style={{ color: "var(--text-color)", background: "transparent", border: "none" }}
                                    >
                                        ✕
                                    </button>
                                </div>


                                <button
                                    className={`${styles.navItem} ${activeTab === "overview" ? styles.active : ""
                                        }`}
                                    onClick={() => { setActiveTab("overview"); setIsOpen(false); }}
                                >
                                    <FaUser className={styles.icon} /> Client Overview
                                </button>

                                <button
                                    className={`${styles.navItem} ${activeTab === "access" ? styles.active : ""
                                        }`}
                                    onClick={() => { setActiveTab("access"); setIsOpen(false); }}
                                >
                                    <FaBolt className={styles.icon} /> Quick Access
                                </button>

                                <button
                                    className={`${styles.navItem} ${activeTab === "bookingoverview" ? styles.active : ""
                                        }`}
                                    onClick={() => { setActiveTab("bookingoverview"); setIsOpen(false); }}
                                >
                                    <FaTasks className={styles.icon} /> Booking Overview
                                </button>

                                <button
                                    className={`${styles.navItem} ${activeTab === "applicant" ? styles.active : ""
                                        }`}
                                    onClick={() => { setActiveTab("applicant"); setIsOpen(false); }}
                                >
                                    <FaHistory className={styles.icon} /> Applicant Overview
                                </button>

                                <button
                                    className={`${styles.navItem} ${activeTab === "feedback" ? styles.active : ""
                                        }`}
                                    onClick={() => { setActiveTab("feedback"); setIsOpen(false); }}
                                >
                                    <FaMapMarkedAlt className={styles.icon} /> Feedback Overview
                                </button>




                            </div>

                        </div>
                    </div>
                </div>
                <div className={styles.detsilpart}>
                    <div className={styles.detailsContent}>
                        {activeTab === "overview" && selectedLead && (
                            <VisitDetailsContent
                                visit={selectedLead}

                            />
                        )}

                        {activeTab === "access" && <BookingQuikAccess />}

                        {activeTab === "bookingoverview" && <OverviewDetails />}

                        {activeTab === "applicant" && <ApplicantOverview />}

                        {activeTab === "feedback" && <BookingFeedback />}




                    </div>
                </div>
            </div>

            {showaddbooking && (
                <AddBooking openclick={setshowaddbooking} />
            )}
        </>


    );
};

export default BookingDetails;

const VisitDetailsContent = ({
    visit,

}: {
    visit: Lead;

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
                    />  {visit.countryCode} {visit.phoneNumber}{" "}

                </p>
            </div>
        </div>

        <div className={bookstyle.infoGrid}>
            <div className={`${bookstyle.infoItem} ${bookstyle.infoItemChannelPartner}`}>
                <p className={bookstyle.cardlabel}>
                    <FaHandshake className={`${bookstyle.iconbg} ${bookstyle.iconChannelPartner}`} /> Channel Partner
                </p>
                <p className={bookstyle.cardvalue}>{visit.channelPartner ?? "N/A"}</p>
            </div>

            <div className={`${bookstyle.infoItem} ${bookstyle.infoItemLeadReceived}`}>
                <p className={bookstyle.cardlabel}>
                    <FaCalendarAlt className={`${bookstyle.iconbg} ${bookstyle.iconLeadReceived}`} /> Lead Received
                </p>
                <p className={bookstyle.cardvalue}>
                    {visit.leadReceived ? new Date(visit.leadReceived).toLocaleDateString() : "N/A"}
                </p>
            </div>

            <div className={`${bookstyle.infoItem} ${bookstyle.infoItemTeamLeader}`}>
                <p className={bookstyle.cardlabel}>
                    <FaUserTie className={`${bookstyle.iconbg} ${bookstyle.iconTeamLeader}`} /> Team Leader
                </p>
                <p className={bookstyle.cardvalue}>{visit.teamleader ?? ""}</p>
            </div>

            <div className={`${bookstyle.infoItem} ${bookstyle.infoItemRevisitDate}`}>
                <p className={bookstyle.cardlabel}>
                    <FaCalendarAlt className={`${bookstyle.iconbg} ${bookstyle.iconRevisitDate}`} /> Revisit Date
                </p>
                <p className={bookstyle.cardvalue}>
                    {visit.revisitDate ? new Date(visit.revisitDate).toLocaleDateString() : "N/A"}
                </p>
            </div>

            <div className={`${bookstyle.infoItem} ${bookstyle.infoItemBookingDate}`}>
                <p className={bookstyle.cardlabel}>
                    <FaCalendarAlt className={`${bookstyle.iconbg} ${bookstyle.iconBookingDate}`} /> Booking Date
                </p>
                <p className={bookstyle.cardvalue}>
                    {visit.bookingDate ? new Date(visit.bookingDate).toLocaleDateString() : "N/A"}
                </p>
            </div>
        </div>

    </div>
);
