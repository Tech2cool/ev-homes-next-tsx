"use client";
import React from "react";
import styles from "./QuickAccess.module.css";
import { MdAssignment, MdMeetingRoom, MdOutlineRateReview } from "react-icons/md";
import { IoCarSport, IoReceipt } from "react-icons/io5";
import { HiKey } from "react-icons/hi2";
import { FaLinkedin, FaReceipt } from "react-icons/fa6";
import { GrCycle } from "react-icons/gr";
import { LuReceiptIndianRupee } from "react-icons/lu";
import { TbCancel } from "react-icons/tb";
import { AiFillCalculator } from "react-icons/ai";
import { FaRobot } from "react-icons/fa6"; 

const QuickAccess = () => {
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

  return (
    <div className={styles.quickAccessContainer}>
      <h3 className={styles.title}>⚡ Quick Access</h3>

      <div className={styles.buttonGrid}>
        {actions.map((action, index) => (
          <button key={index} className={styles.actionButton}>
            <div className={styles.circleicon}>{action.icon}</div>
            <div className={styles.iconlable}>{action.label}</div>
          </button>
        ))}
      </div>

  <button className={styles.aiButton}>
  <FaRobot className={styles.aiIcon} />
</button>


    </div>
  );
};

export default QuickAccess;
