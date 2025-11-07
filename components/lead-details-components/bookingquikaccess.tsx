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
import DemandHistory from "./Dailog/demandhistory";
import BookingFeedback from "./Dailog/bookingfeedback";
import UploadDocument from "./Dailog/uploaddocument";
import { useRouter } from "next/navigation";

const BookingQuikAccess = () => {
    const [demardhistory, setdemardhistory] = useState(false);
    const [addfeedback, setaddfeedback] = useState(false);
    const [upladdoc, setupladdoc] = useState(false);
      const router= useRouter();
    
    const costsheetnavigate = () => {
        router.push("/generate/costsheetgenerator")
    }
      const brokeragenavigate = () => {
        router.push("/generate/brokeragecalculate")
    }
    const actions = [
        { icon: <TbReportSearch />, label: "Demand Report" },
        { icon: <MdOutlineHistory />, label: "Demand History" },
        { icon: <FaSheetPlastic />, label: "Cost Sheet" },
        { icon: <AiFillCalculator />, label: "Payment Calculator" },
        { icon: <RiAiGenerate />, label: "Generate Demand" },
        { icon: <CgNotes />, label: "Add Feesback" },
        { icon: <AiFillCalculator />, label: "Brokerage Calculator" },
        { icon: <RiFileUploadFill />, label: "Upload Documents" },
        { icon: <IoDocumentSharp />, label: "View Documents" },

    ];

    const handleClick = (label: string) => {
        if (label === "Demand History") {
            setdemardhistory(true);
        };
        if (label === "Add Feesback") {
            setaddfeedback(true);
        };
        if (label === "Upload Documents") {
            setupladdoc(true);
        };
        if (label === "Cost Sheet") return costsheetnavigate();
        if (label === "Brokerage Calculator") return brokeragenavigate();
        
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
            {demardhistory && (
                <DemandHistory openclick={setdemardhistory} />
            )}
            {addfeedback && (
                <BookingFeedback openclick={setaddfeedback} />
            )}
            {upladdoc && (
                <UploadDocument openclick={setupladdoc} />
            )}



        </div>

    );
};

export default BookingQuikAccess;
