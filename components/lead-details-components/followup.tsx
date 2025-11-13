"use client";
import React from "react";
import styles from "./QuickAccess.module.css";
import { IoCall } from "react-icons/io5";
import { FaHome, FaMobile, FaPhone } from "react-icons/fa";

interface FollowUpProps {
  lead?: Lead | null;
}

const FollowUp: React.FC<FollowUpProps> = ({ lead }) => {
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

  // Helper function to get caller name from caller object
  const getCallerName = (caller: any) => {
    if (!caller) return "Unknown";

    // If caller is a string, return it directly
    if (typeof caller === "string") return caller;

    // If caller is an object with name properties
    if (typeof caller === "object") {
      return (
        `${caller.firstName || ""} ${caller.lastName || ""}`.trim() ||
        "Unknown Caller"
      );
    }

    return "Unknown";
  };

  // Combine callHistory and followupHistory for display
  const getFollowUpData = () => {
    const history: any[] = [];

    // Add call history entries
    if (lead?.callHistory && lead.callHistory.length > 0) {
      lead.callHistory.forEach((call) => {
        history.push({
          type: "call",
          data: call,
          name:
            `${call?.caller?.firstName || ""} ${
              call?.caller?.lastName || ""
            }`.trim() || "Customer",
          status: call.interestedStatus || call.stage || "No Status",
          callType: call.remark || "Call",
          date: formatDateTime(call.callDate),
          feedback: call.feedback || call.feedback || "No feedback provided",
          icon: <IoCall />,
          isVisit: false,
          isBooking: false,
          caller: getCallerName(call.caller), // Use helper function here
        });
      });
    }

    // Add followup history entries
    if (lead?.followupHistory && lead.followupHistory.length > 0) {
      lead.followupHistory.forEach((followup) => {
        history.push({
          type: "followup",
          data: followup,
          name:
            `${followup.caller.firstName || ""} ${
              followup.caller.lastName || ""
            }`.trim() || "Customer",
          status: followup.interestedStatus || followup.stage || "Follow Up",
          callType: followup.remark || "Follow Up",
          date: formatDateTime(followup.callDate),
          feedback:
            followup.feedback || followup.feedback || "No feedback provided",
          icon: <IoCall />,
          isVisit: false,
          isBooking: false,
          caller: getCallerName(followup.caller), // Use helper function here
        });
      });
    }

    // Add site visit entry if applicable
    if (lead?.visitStatus === "scheduled" || lead?.visitDate) {
      history.push({
        type: "visit",
        status: "Completed",
        siteVisit: "Site Visit",
        visits: "Visits",
        date: formatDateTime(lead.visitDate),
        cpFeedback: lead.remark || "CP confirmed site visit scheduled.",
        evFeedback:
          lead.followupStatus || "EV team assigned for visit coordination.",
        icon: <FaHome />,
        isVisit: true,
        isBooking: false,
      });
    }

    if (lead?.bookingRef && lead.bookingRef?.date) {
      history.push({
        type: "booking",
        status: lead.bookingStatus,
        name: "Booking Confirmed",
        date: formatDateTime(lead?.bookingRef?.date),
        feedback: `${
          lead.bookingRef.project?.name || "No project name"
        }\nFlat No: ${lead.bookingRef.unitNo || "Not specified"}`,
        icon: <FaMobile />,
        isVisit: false,
        isBooking: true,
      });
    }

    // Sort by date (newest first)
    return history.sort((a, b) => {
      const dateA = new Date(a.data?.callDate || a.date);
      const dateB = new Date(b.data?.callDate || b.date);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const followUpData = getFollowUpData();

  if (!followUpData || followUpData.length === 0) {
    return (
      <div className={styles.teamplat}>
        <div className={styles.fullList}>
          <div className={styles.noHistory}>No follow-up history available</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.teamplat}>
      <div className={styles.fullList}>
        {followUpData.map((item, index) => (
          <div key={index} className={styles.cont}>
            <div className={styles.iconSection}>
              <div
                className={`${styles.circle} ${
                  item.isVisit ? styles.visitCircle : ""
                } ${item.isBooking ? styles.bookingCircle : ""}`}
              >
                {React.cloneElement(item.icon, {
                  className: `${styles.callicon} ${
                    item.isVisit ? styles.homeicon : ""
                  } ${item.isBooking ? styles.bookingIcon : ""}`,
                })}
              </div>

              {index !== followUpData.length - 1 && (
                <div className={styles.vline ?? "NA"}></div>
              )}
            </div>

            <div
              className={`${styles.maincot} ${
                item.isVisit ? styles.visitMain : ""
              }
              ${item.isBooking ? styles.bookingMain : ""}`}
            >
              <div className={styles.tag}>{item.status ?? "NA"}</div>

              {!item.isVisit ? (
                <>
                  <div className={styles.firstrow}>
                    <div className={styles.com}>
                      <div className={styles.lable}>{item.name ?? "NA"}</div>
                       {!item.isBooking && (
                      <div className={styles.call}>
                        <p>{item.callType ?? "NA"}</p>
                      </div>
                       )}
                    </div>
                    <div className={styles.date}>{item.date ?? "NA"}</div>
                  </div>

                  <div className={styles.secrow}>
                    <div className={styles.feedback}>Feedback</div>
                    <div className={styles.conts}>{item.feedback ?? "NA"}</div>
                  </div>

                  {/* Show caller information if available */}
                  {/* {item.caller && item.caller !== "Unknown" && (
                    <div className={styles.secrow}>
                      <div className={styles.feedback}>Caller</div>
                      <div className={styles.conts}>{item.caller}</div>
                    </div>
                  )} */}
                </>
              ) : (
                <>
                  <div className={styles.firstrow}>
                    <div className={styles.com}>
                      <div className={styles.lable}>
                        {item.siteVisit ?? "NA"}
                      </div>
                      <div className={styles.callgreen}>
                        <p>{item.visits ?? "NA"}</p>
                      </div>
                    </div>
                    <div className={styles.date}>{item.date ?? "NA"}</div>
                  </div>

                  <div className={styles.secrow}>
                    <div className={styles.feedback}>CP Feedback</div>
                    <div className={styles.conts}>
                      {lead?.visitRef?.cpfeedback?.trim()
                        ? lead.visitRef.cpfeedback
                        : "No Feedback provided"}
                    </div>
                  </div>

                  <div className={styles.secrow}>
                    <div className={styles.feedback}>EV Feedback</div>
                    <div className={styles.conts}>
                      {lead?.visitRef?.feedback?.trim()
                        ? lead.visitRef.feedback
                        : "No Feedback provided"}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowUp;
