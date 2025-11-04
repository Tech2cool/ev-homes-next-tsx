"use client";
import React from "react";
import styles from "./QuickAccess.module.css";
import { BiTransferAlt } from "react-icons/bi";
import { TbArrowsTransferDown } from "react-icons/tb";

// Correct interface based on the error - teamLeader is an object
interface TeamLeader {
  _id?: string;
  firstName?: string;
  lastName?: string;
}

interface Cycle {
  _id?: string;
  teamLeader?: TeamLeader | null;
  startDate?: string | null;
  validTill?: string | null;
}

interface TransferHistoryProps {
  cycleHistory?: Cycle[];
}

const TransferHistory: React.FC<TransferHistoryProps> = ({ cycleHistory = [] }) => {
  const formatDateOnly = (dateString: string | null | undefined) => {
    if (!dateString) return "NA";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  if (!cycleHistory || cycleHistory.length === 0) {
    return (
      <div className={styles.teamplat}>
        <div className={styles.fullList}>
          <div className={styles.noHistory}>
            No transfer history available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.teamplat}>
      <div className={styles.fullList}>
        {cycleHistory.map((cycle, index) => {
          // Properly handle teamLeader as an object
          const teamLeaderName = cycle.teamLeader 
            ? `${cycle.teamLeader.firstName || ''} ${cycle.teamLeader.lastName || ''}`.trim()
            : "NA";
          
          const dateRange = `${formatDateOnly(cycle.startDate)} -> ${formatDateOnly(cycle.validTill)}`;

          // Unique key with fallback
          const uniqueKey = cycle._id ? `${cycle._id}-${index}` : `cycle-${index}`;

          return (
            <div key={uniqueKey} className={styles.cont}>
              <div className={styles.iconSection}>
                <div className={styles.circle}>
                  <TbArrowsTransferDown className={styles.callicon} />
                </div>
                {index !== cycleHistory.length - 1 && <div className={styles.vline}></div>}
              </div>

              <div className={styles.maincot}>
                <div className={styles.firstrow}>
                  <div className={styles.com} style={{alignItems:"center"}}>
                    <div className={styles.lable}>{teamLeaderName}</div>
                    <div className={styles.call}>
                      <p>{dateRange}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.secrow}>
                  <div className={styles.tran} style={{letterSpacing:"1px", display:"flex", gap:"10px"}}>
                    <BiTransferAlt className={styles.icontrans} /> 
                    Transferred from
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransferHistory;