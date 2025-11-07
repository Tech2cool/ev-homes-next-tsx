"use client";
import React, { useState } from "react";
import styles from "./QuickAccess.module.css";
import { FaHashtag, FaSheetPlastic, } from "react-icons/fa6";
import { FaRobot } from "react-icons/fa6";

import { TbReportSearch } from "react-icons/tb";
import { MdOutlineHistory } from "react-icons/md";
import { AiFillCalculator } from "react-icons/ai";
import { RiAiGenerate, RiFileUploadFill } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import { IoDocumentSharp } from "react-icons/io5";
const BookingQuikAccess = () => {


    const actions = [
        { icon: <TbReportSearch />, label: "Demand Report" },
        { icon: <MdOutlineHistory />, label: "Demand History" },
        { icon: <FaSheetPlastic  />, label: "Cost Sheet" },
        { icon: <AiFillCalculator  />, label: "Payment Calculator" },
        { icon: <RiAiGenerate  />, label: "Generate Demand" },
        { icon: <CgNotes  />, label: "Add Feesback" },
        { icon: <AiFillCalculator />, label: "Brokerage Calculator" },
        { icon: <RiFileUploadFill  />, label: "Upload Documents" },
        { icon: <IoDocumentSharp  />, label: "View Documents" },




    ];

    const handleClick = (label: string) => {

    }
    return (
        <div className={styles.quickAccessContainer}>
            <h3 className={styles.title}>⚡ Quick Access</h3>

            <div className={styles.buttonGrid}>
                {actions.map((action, index) => (
                    <button key={index} className={styles.actionButton} onClick={() => handleClick(action.label)}>
                        <div className={styles.circleicon}>{action.icon}</div>
                        <div className={styles.iconlable}>{action.label}</div>
                    </button>
                ))}
            </div>

           

        </div>

    );
};

export default BookingQuikAccess;
