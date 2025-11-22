"use client";
import React, { useState } from "react";
import styles from "./QuickAccess.module.css";
import { IoPricetagSharp } from "react-icons/io5";
import { FaHashtag, } from "react-icons/fa6";
import { GrCycle } from "react-icons/gr";
import { FaRobot } from "react-icons/fa6";
import RunningStatus from "./Dailog/runningstatus";
import { RiUserAddFill } from "react-icons/ri";
import AddChannelPartner from "./Dailog/addchannelpartner";
import ReTagLead from "./Dailog/retaglead";
import { useRouter } from "next/navigation";
const AnalyzerQuickaccess = () => {
    const [addchannelpatner, setaddchannelpatner] = useState(false);
    const [retag, setretag] = useState(false);

    const [showrunstatus, setshowrunstatus] = useState(false);
    const [updatelead, setupdatelead] = useState(false);

    const router = useRouter();
    const pagenavigate = () => {
        router.push("/tagging-form")
    }
    const actions = [
        { icon: <RiUserAddFill />, label: "Add Channel Partner" },
        { icon: <IoPricetagSharp />, label: "Re-Tag Lead" },
        { icon: <GrCycle />, label: "Lead Running Status" },
        { icon: <FaHashtag />, label: "Update Lead Details" },



    ];

    const handleClick = (label: string) => {
        if (label === "Add Channel Partner") {
            setaddchannelpatner(true);
        };
        if (label === "Re-Tag Lead") {
            setretag(true);
        };
        if (label === "Lead Running Status") {
            setshowrunstatus(true);
        };
        if (label === "Update Lead Details") {
            return pagenavigate();
        };



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

           

            {addchannelpatner && (
                <AddChannelPartner openclick={setaddchannelpatner} />
            )}
            {retag && (
                <ReTagLead openclick={setretag} />
            )}

            {showrunstatus && (
                <RunningStatus openclick={setshowrunstatus} />
            )}
        </div>

    );
};

export default AnalyzerQuickaccess;
