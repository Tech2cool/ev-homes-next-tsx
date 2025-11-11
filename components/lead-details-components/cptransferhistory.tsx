"use client";
import React, { useState } from "react";
import styles from "./QuickAccess.module.css";
import { BiTransferAlt } from "react-icons/bi";
import { TbArrowsTransferDown } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import AddChannelPartner from "./Dailog/addchannelpartner";

interface ChannelPartnerHistory {
  _id?: string;
  channelPartner?: ChannelPartner
  status: string | null;
  stage: string | null;
  date: string | null;
  startDate: string | null;
  validTill: string | null;
  approval?: any;
}

interface CPTransferHistoryProps {
  channelPartnerHistory?: ChannelPartnerHistory[];
}

const CPTransferHistory: React.FC<CPTransferHistoryProps> = ({ 
  channelPartnerHistory = [] 
}) => {
  const formatDateOnly = (dateString: string | null | undefined) => {
    if (!dateString) return "NA";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const formatStatus = (status: string | null) => {
    if (!status) return "NA";
    // Convert status to readable format
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (!channelPartnerHistory || channelPartnerHistory.length === 0) {
    return (
      <div className={styles.teamplat}>
        <div className={styles.fullList}>
          <div className={styles.noHistory}>No channel partner history available</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.teamplat}>
      <div className={styles.fullList}>
        {channelPartnerHistory.map((cpHistory, index) => {
          const firmName = cpHistory.channelPartner?.firmName || 'NA';
          const status = formatStatus(cpHistory.status);
          const date = formatDateOnly(cpHistory.date);
          
          // Format tagging date range
          const taggingDateRange = (cpHistory.startDate && cpHistory.validTill) 
            ? `${formatDateOnly(cpHistory.startDate)} -> ${formatDateOnly(cpHistory.validTill)}`
            : null;

          const uniqueKey = cpHistory._id ? `${cpHistory._id}-${index}` : `cp-history-${index}`;

          return (
            <div key={uniqueKey} className={styles.cont}>
              <div className={styles.iconSection}>
                <div className={styles.circle} style={{ backgroundColor: '#DEAA7D' }}>
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="white"
                    className={styles.callicon}
                  >
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 3.5C14.8 3.4 14.6 3.3 14.3 3.3C14 3.3 13.8 3.4 13.6 3.5L7 7V9C7 9.6 7.4 10 8 10H9V19C9 19.6 9.4 20 10 20H14C14.6 20 15 19.6 15 19V14H17V19C17 19.6 17.4 20 18 20H20C20.6 20 21 19.6 21 19V10H22C22.6 10 23 9.6 23 9Z"/>
                  </svg>
                </div>
                {index !== channelPartnerHistory.length - 1 && <div className={styles.vline}></div>}
              </div>

              <div className={styles.maincot}>
                <div className={styles.firstrow}>
                  <div className={styles.com} style={{ alignItems: "center" }}>
                    <div className={styles.lable}>{firmName}</div>
                    <div className={styles.call}>
                      <p>{taggingDateRange}</p>
                    </div>
                  </div>
                </div>

              <div className={styles.tag}>{date}</div>

                <div className={styles.secrow}>
                   <div className={styles.tran} style={{ letterSpacing: "1px", display: "flex", gap: "10px" }}><BiTransferAlt className={styles.icontrans} /> {status}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CPTransferHistory;
