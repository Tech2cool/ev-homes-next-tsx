"use client";
import React, { useState } from "react";
import styles from "./QuickAccess.module.css";
import {
  MdAssignment,
  MdMeetingRoom,
  MdOutlineRateReview,
} from "react-icons/md";
import { IoCarSport, IoReceipt } from "react-icons/io5";
import { HiKey } from "react-icons/hi2";
import { FaLinkedin, FaReceipt } from "react-icons/fa6";
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
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/userContext";
const QuickAccess = () => {
  const [showfb, setshowfb] = useState(false);
  const [showsite, setshowsite] = useState(false);
  const [showtask, setshowtask] = useState(false);
  const [showlinkdin, setshowlinkdin] = useState(false);
  const [showcancelboking, setshowcancelbooking] = useState(false);
  const [showmeeting, setshowmeeting] = useState(false);
  const [showrunstatus, setshowrunstatus] = useState(false);
  const [showaddbooking, setshowaddbooking] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const pagenavigate = () => {
    router.push("/estimate-history");
  };
  const costsheetnavigate = () => {
    router.push("/generate/costsheetgenerator");
  };

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
  ];

  const handleClick = (label: string) => {
    if (label === "Add Feedback") {
      setshowfb(true);
    }
    if (label === "Add Visit") {
      setshowsite(true);
    }
    if (label === "Assign Task") {
      setshowtask(true);
    }
    if (label === "LinkedIn Update") {
      setshowlinkdin(true);
    }
    if (label === "Cancel Booking") {
      setshowcancelbooking(true);
    }

    if (label === "Schedule Meeting") {
      setshowmeeting(true);
    }
    if (label === "Lead Running Status") {
      setshowrunstatus(true);
    }
    if (label === "Add Booking") {
      setshowaddbooking(true);
    }

    if (label === "Estimate History") return pagenavigate();
    if (label === "Generate") return costsheetnavigate();
  };
  return (
    <div className={styles.quickAccessContainer}>
      <h3 className={styles.title}>⚡ Quick Access</h3>

      <div className={styles.buttonGrid}>
        {actions.map((action, index) =>
          user?.designation?._id === "desg-sales-manager" ||
          (user?.designation?._id === "desg-sales-executive" &&
            [
              "Schedule Meeting", 
              "Cancel Booking",
              "Brokerage Calculator",
            ].includes(action.label)) ? null : (
            <button
              key={index}
              className={styles.actionButton}
              onClick={() => handleClick(action.label)}
            >
              <div className={styles.circleicon}>{action.icon}</div>
              <div className={styles.iconlable}>{action.label}</div>
            </button>
          )
        )}
      </div>

      <button className={styles.aiButton}>
        <FaRobot className={styles.aiIcon} />
      </button>

      {showfb && <AddFeedBaack openclick={setshowfb} />}
      {showsite && <SiteVisit openclick={setshowsite} />}
      {showtask && <AssignTask openclick={setshowtask} />}
      {showlinkdin && <LinkdinUpdate openclick={setshowlinkdin} />}
      {showcancelboking && <CancelBooking openclick={setshowcancelbooking} />}
      {showmeeting && <ScheduleMeeting openclick={setshowmeeting} />}
      {showrunstatus && <RunningStatus openclick={setshowrunstatus} />}

      {showaddbooking && <AddBooking openclick={setshowaddbooking} />}
    </div>
  );
};

export default QuickAccess;
