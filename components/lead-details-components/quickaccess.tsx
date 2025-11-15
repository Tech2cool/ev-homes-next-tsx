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
import BrokerageCalculator from "./Dailog/brokerageCalculator";


import { useRouter } from "next/navigation";
import { useUser } from "@/providers/userContext";
import FeedbackTwo from "./Dailog/feedbacktwo";
import { useData } from "@/providers/dataContext";
import Estimategenerator from "./Dailog/estimategenerator";
interface QuickAccessProps {
  lead?: Lead | null;
  task?: Task | null;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ lead }) => {
  const {
    fetchSearchLeads,
    searchLeadInfo,
    leads,
    loadingLeads,
    fetchingMoreLeads,
    updateLeadDetails,
  } = useData();
  const [showfb, setshowfb] = useState(false);
  const [showsite, setshowsite] = useState(false);
  const [showtask, setshowtask] = useState(false);
  const [showlinkdin, setshowlinkdin] = useState(false);
  const [showcancelboking, setshowcancelbooking] = useState(false);
  const [showmeeting, setshowmeeting] = useState(false);
  const [showrunstatus, setshowrunstatus] = useState(false);
  const [estimategenerator, setestimategenerator] = useState(false);
  const [showaddbooking, setshowaddbooking] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const pagenavigate = () => {
  router.push(`/estimate-history?leadId=${lead?._id}`);

  };

//   const pagenavigate = () => {
//   const params = new URLSearchParams();
//   if (lead?._id) {
//     params.set('leadId', lead._id);
//   }
//   router.push(`/estimate-history?${params.toString()}`);
// };
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
    if (label === "Estimate Generator") {
      setestimategenerator(true);
    }
    if (label === "Add Booking") {
      setshowaddbooking(true);
    }

    if (label === "Brokerage Calculator") {
      setIsCalculatorOpen(true);
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
              // "Brokerage Calculator",
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

      {showfb && (
        <FeedbackTwo openclick={setshowfb} lead={lead} task={lead?.taskRef} />
      )}
      {showsite && <SiteVisit openclick={setshowsite} visit={lead} />}

      {showtask && (
        <AssignTask openclick={setshowtask} lead={lead} task={lead?.taskRef} />
      )}

      {showlinkdin && (
        <LinkdinUpdate
          openclick={setshowlinkdin}
          lead={lead}
          onSave={async (payload) => {
            console.log("payload", payload);
            const response = await updateLeadDetails(lead?._id ?? "", payload);

            console.log(response);
            if (response.success) {
              setshowlinkdin(false);
            } else {
              console.error(response.message);
            }
          }}
        />
      )}

      {showcancelboking && (
        <CancelBooking openclick={setshowcancelbooking} leadId={lead} />
      )}
      {showmeeting && <ScheduleMeeting openclick={setshowmeeting} />}
      {showrunstatus && <RunningStatus openclick={setshowrunstatus} />}

      {estimategenerator && <Estimategenerator openclick={setestimategenerator} />}


      {showaddbooking && <AddBooking openclick={setshowaddbooking} />}

      {isCalculatorOpen && (
        <BrokerageCalculator
          openclick={setIsCalculatorOpen}
          // Optional: pass a lead if you have one
          lead={lead}
        />
      )}
    </div>
  );
};

export default QuickAccess;
