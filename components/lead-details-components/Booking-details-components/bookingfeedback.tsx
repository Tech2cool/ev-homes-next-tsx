"use client";
import React, { useMemo } from "react";
import styles from "../QuickAccess.module.css";
import { Phone, User } from "lucide-react";

interface BookingFeedbackProps {
  booking?: PostSaleLead | null;
  lead?: Lead | null;
}

const BookingFeedback: React.FC<BookingFeedbackProps> = ({ booking, lead }) => {
  const timeline = useMemo(() => {
    const entries: any[] = [];

    // VISIT ENTRY
    if (lead?.visitRef?.date) {
      entries.push({
        type: "visit",
        priority: 1,
        date: new Date(lead.visitRef.date),
        title: `${lead.visitRef.closingManager?.firstName ?? ""} ${lead.visitRef.closingManager?.lastName ?? ""}`,
        subTitle: lead.visitStatus ?? "",
        description: `Feedback:\n${lead.visitRef.cpfeedback ?? ""}`,
        color: "#1e8e3e", // green
        icon: <User size={12} />,
      });
    }

    // REVISIT ENTRY
    if (lead?.revisitRef?.date) {
      entries.push({
        type: "revisit",
        priority: 2,
        date: new Date(lead.revisitRef.date),
        title: `${lead.revisitRef.closingManager?.firstName ?? ""} ${lead.revisitRef.closingManager?.lastName ?? ""}`,
        subTitle: lead.revisitStatus ?? "",
        description: `Feedback:\n${lead.revisitRef.cpfeedback ?? ""}`,
        color: "#dba400", // amber
        icon: <User size={12} />,
      });
    }

    // LEAD CALL HISTORY
    if (lead?.callHistory && lead.callHistory.length > 0) {
      lead.callHistory.forEach((c) => {
        if (c.callDate) {
          entries.push({
            type: "call",
            priority: 3,
            date: new Date(c.callDate),
            title: `${c.caller?.firstName ?? ""} ${c.caller?.lastName ?? ""}`,
            subTitle: c.interestedStatus ? ` - ${c.interestedStatus}` : "",
            description: `Feedback:\n${c.feedback ?? ""}`,
            color: "#0066cc", // blue
            icon: <Phone size={12} />,
          });
        }
      });
    }

    // BOOKING CALL HISTORY
    if (booking?.callHistory && booking.callHistory.length > 0) {
      booking.callHistory.forEach((c) => {
        if (c.callDate) {
          entries.push({
            type: "call",
            priority: 3,
            date: new Date(c.callDate),
            title: `${c.caller?.firstName ?? ""} ${c.caller?.lastName ?? ""}`,
            subTitle: c.stage ?? "",
            description: `Feedback:\n${c.feedback ?? ""}`,
            color: "#0066cc", // blue
            icon: <Phone size={12} />,
          });
        }
      });
    }

    // SORT LIKE FLUTTER (newest first, then priority)
    return entries.sort((a, b) => {
      const dateCompare = b.date.getTime() - a.date.getTime();
      if (dateCompare !== 0) return dateCompare;
      return a.priority - b.priority;
    });
  }, [lead, booking]);

  if (!timeline.length) {
    return <div className={styles.empty}>No Follow-up Yet</div>;
  }

  return (
    <div className={styles.teamplat}>
      <div className={styles.fullList}>
        {timeline.map((item, index) => (
          <div key={index} className={styles.cont}>
            <div className={styles.iconSection}>
              <div className={styles.circle} style={{ background: item.color }}>
                {item.icon}
              </div>
              {index !== timeline.length - 1 && <div className={styles.vline}></div>}
            </div>

            <div className={styles.maincot}>
              {item.subTitle && <div className={styles.tag}>{item.subTitle}</div>}

              <div className={styles.firstrow}>
                <div className={styles.com}>
                  <div className={styles.lable}>{item.title}</div>
                  <div className={styles.date}>
                    {item.date.toLocaleDateString("en-IN")}
                  </div>
                </div>
              </div>

              <div className={styles.secrow}>
                <div className={styles.feedback}>Feedback</div>
                <div className={styles.conts}>{item.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingFeedback;
