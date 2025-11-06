"use client";
import React from "react";
import styles from "./QuickAccess.module.css";
import { FaCheck } from "react-icons/fa";

interface VisitHistoryProps {
  lead?: Lead | null;
}

const VisitHistory: React.FC<VisitHistoryProps> = ({ lead }) => {
  const formatDateTime = (dateString: string | null | undefined) => {
    if (!dateString) return "NA";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const getVisitHistory = () => {
    const history: any[] = [];

    // ✅ Add site visit entry if available
    if (lead?.visitStatus || lead?.visitDate) {
      history.push({
        status: lead.visitStatus || "Site Visit",
        teamleader:
          lead.visitRef?.closingManager?.firstName ||
          lead.visitRef?.closingManager?.lastName ||
          "Team Leader",
        date: formatDateTime(lead.visitDate),
        cpFeedback: lead.visitRef?.cpfeedback || "No CP feedback provided",
        evFeedback: lead.visitRef?.feedback || "No EV feedback provided",
        icon: <FaCheck />,
      });
      
    }

    return history;
  };

  const visits = getVisitHistory();

  if (!visits.length) {
    return (
      <div className={styles.teamplat}>
        <div className={styles.fullList}>
          <div className={styles.noHistory}>No visit history available</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.teamplat}>
      <div className={styles.fullList}>
        {visits.map((item, index) => (
          <div key={index} className={styles.cont}>
            <div className={styles.iconSection}>
              <div className={styles.circle}>
                {React.cloneElement(item.icon, {
                  className: styles.callicon,
                })}
              </div>
              {index !== visits.length - 1 && <div className={styles.vline}></div>}
            </div>

            <div className={styles.maincot}>
              <div className={styles.tag}>{item.status}</div>

              <div className={styles.firstrow}>
                <div className={styles.com} style={{ alignItems: "center" }}>
                  <div className={styles.lable}>{item.teamleader}</div>
                  <div className={styles.date}>{item.date}</div>
                </div>
              </div>

              <div className={styles.secrow}>
                <div className={styles.feedback}>CP Feedback</div>
                <div className={styles.conts}>{item.cpFeedback}</div>
              </div>

              <div className={styles.secrow}>
                <div className={styles.feedback}>EV Feedback</div>
                <div className={styles.conts}>{item.evFeedback}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitHistory;