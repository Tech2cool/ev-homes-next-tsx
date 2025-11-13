"use client";
import React, { useState } from "react";
import styles from "./QuickAccess.module.css";
import { MdAssignment, MdMeetingRoom, MdOutlineRateReview } from "react-icons/md";
import { IoCarSport, IoReceipt } from "react-icons/io5";
import { HiKey } from "react-icons/hi2";
import { FaLinkedin, FaReceipt, FaRegFilePdf } from "react-icons/fa6";
import { GrCycle } from "react-icons/gr";
import { LuReceiptIndianRupee } from "react-icons/lu";
import { TbCancel } from "react-icons/tb";
import { AiFillCalculator } from "react-icons/ai";
import { FaRobot } from "react-icons/fa6";

import AddFeedBaack from "./Dailog/addfeedback";
import SiteVisit from "./Dailog/sitevisit";
import AssignTask from "./Dailog/assigntask";
import LinkdinUpdate from "./Dailog/linkdinupdate";
import CancelBooking from "./Dailog/cancelbooking";
import ScheduleMeeting from "./Dailog/schedulemeeting";
import RunningStatus from "./Dailog/runningstatus";
import AddBooking from "./Dailog/addbooking";
import GeneratePdf from "./Dailog/GeneratePdf";
import PdfForm from "./Dailog/pdfForm";
import ConfirmationPdf from "./Dailog/confirmationPdf";
import ConfirmationPdfForm from "./Dailog/ConfirmationPdfForm";
import { useRouter } from "next/navigation";

const QuickAccess = () => {
  const [showfb, setshowfb] = useState(false);
  const [showsite, setshowsite] = useState(false);
  const [showtask, setshowtask] = useState(false);
  const [showlinkdin, setshowlinkdin] = useState(false);
  const [showcancelboking, setshowcancelbooking] = useState(false);
  const [showmeeting, setshowmeeting] = useState(false);
  const [showrunstatus, setshowrunstatus] = useState(false);
  const [showaddbooking, setshowaddbooking] = useState(false);

  const [showpdfDialog, setshowpdfDialog] = useState(false);
  const [showpdfForm, setshowpdfForm] = useState(false);
  const [showpdf, setshowpdf] = useState(false);
  const [pdfData, setPdfData] = useState<any>(null);

  const [showConfirmationForm, setShowConfirmationForm] = useState(false);
  const [showConfirmationPdf, setShowConfirmationPdf] = useState(false);
  const [confirmationData, setConfirmationData] = useState<any>(null);

  const router = useRouter();

  const pagenavigate = () => router.push("/estimate-history");
  const costsheetnavigate = () => router.push("/generate/costsheetgenerator");

  const actions = [
    { icon: <MdOutlineRateReview />, label: "Add Feedback" },
    { icon: <IoCarSport />, label: "Add Visit" },
    { icon: <HiKey />, label: "Add Booking" },
    { icon: <LuReceiptIndianRupee />, label: "Estimate Generator" },
    { icon: <FaReceipt />, label: "Estimate History" },
    { icon: <GrCycle />, label: "Lead Running Status" },
    { icon: <MdAssignment />, label: "Assign Task" },
    { icon: <IoReceipt />, label: "Generate" },
    { icon: <MdMeetingRoom />, label: "Schedule Meeting" },
    { icon: <TbCancel />, label: "Cancel Booking" },
    { icon: <FaLinkedin />, label: "LinkedIn Update" },
    { icon: <AiFillCalculator />, label: "Brokerage Calculator" },
    { icon: <FaRegFilePdf />, label: "EOI Pdf" },
    { icon: <FaRegFilePdf />, label: "Confirmation Pdf" },
  ];

  // 🔹 Handle Click Actions
  const handleClick = (label: string) => {
    switch (label) {
      case "Add Feedback":
        setshowfb(true);
        break;
      case "Add Visit":
        setshowsite(true);
        break;
      case "Assign Task":
        setshowtask(true);
        break;
      case "LinkedIn Update":
        setshowlinkdin(true);
        break;
      case "Cancel Booking":
        setshowcancelbooking(true);
        break;
      case "Schedule Meeting":
        setshowmeeting(true);
        break;
      case "EOI Pdf":
        setshowpdfDialog(true);
        break;
      case "Lead Running Status":
        setshowrunstatus(true);
        break;
      case "Add Booking":
        setshowaddbooking(true);
        break;
      case "Confirmation Pdf":
        setShowConfirmationForm(true);
        break;
      case "Estimate History":
        return pagenavigate();
      case "Generate":
        return costsheetnavigate();
    }
  };

  // 🔹 Handle PDF Option
  const handlePdfOption = (type: string) => {
    setshowpdfDialog(false);
    localStorage.setItem("pdfType", type);
    setshowpdfForm(true);
  };

  // 🔹 Handle PDF Submission
  const handlePdfSubmit = (data: any) => {
    console.log("Form data received from PdfForm:", data);
    setPdfData(data);
    setshowpdfForm(false);
    setshowpdf(true);
  };

  // 🔹 Handle Confirmation PDF Submission
  const handleConfirmationPdfSubmit = (data: any) => {
    console.log("✅ Confirmation PDF Data:", data);
    setShowConfirmationForm(false);
    setConfirmationData(data);
    setShowConfirmationPdf(true);
  };

  return (
    <>
      <div className={styles.quickAccessContainer}>
        <h3 className={styles.title}>⚡ Quick Access</h3>

        <div className={styles.buttonGrid}>
          {actions.map((action, index) => (
            <button
              key={index}
              className={styles.actionButton}
              onClick={() => handleClick(action.label)}
            >
              <div className={styles.circleicon}>{action.icon}</div>
              <div className={styles.iconlable}>{action.label}</div>
            </button>
          ))}
        </div>

        <button className={styles.aiButton}>
          <FaRobot className={styles.aiIcon} />
        </button>

        {/* DIALOG COMPONENTS */}
        {showfb && <AddFeedBaack openclick={setshowfb} />}
        {showsite && <SiteVisit openclick={setshowsite} />}
        {showtask && <AssignTask openclick={setshowtask} />}
        {showlinkdin && <LinkdinUpdate openclick={setshowlinkdin} />}
        {showcancelboking && <CancelBooking openclick={setshowcancelbooking} />}
        {showmeeting && <ScheduleMeeting openclick={setshowmeeting} />}
        {showrunstatus && <RunningStatus openclick={setshowrunstatus} />}
        {showaddbooking && <AddBooking openclick={setshowaddbooking} />}
      </div>

      {/* EOI PDF Form */}
      {showpdfForm && (
        <PdfForm
          onClose={() => setshowpdfForm(false)}
          onSubmit={handlePdfSubmit}
        />
      )}
      {showpdf && pdfData && <GeneratePdf openclick={setshowpdf} formData={pdfData} />}

      {/* Confirmation PDF Form */}
      {showConfirmationForm && (
        <ConfirmationPdfForm
          onClose={() => setShowConfirmationForm(false)}
          onSubmit={handleConfirmationPdfSubmit}
        />
      )}
      {showConfirmationPdf && confirmationData && (
        <ConfirmationPdf formData={confirmationData} />
      )}

      {/* EOI PDF Dialog */}
      {showpdfDialog && (
        <div className={styles.overlay}>
          <div className={styles.dialog}>
            <h3 style={{ color: "white" }}>Select Type</h3>
            <div className={styles.btnGroup}>
              <button
                className={`${styles.btn} ${styles.notFullPaid}`}
                onClick={() => handlePdfOption("Not Full Paid")}
              >
                Not Full Paid
              </button>
              <button
                className={`${styles.btn} ${styles.fullPaid}`}
                onClick={() => handlePdfOption("Full Paid")}
              >
                Full Paid
              </button>
            </div>
            <button
              className={styles.cancel}
              onClick={() => setshowpdfDialog(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickAccess;
