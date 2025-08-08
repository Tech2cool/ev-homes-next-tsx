import React from "react";
import styles from "./approvalsection.module.css";
import Image from "next/image";
import { dateFormatOnly } from "@/hooks/useDateFormat";

const LeaveCard = ({ pendingLeave }) => {
  return (
    <div className={styles.leaveCard}>
      <div className={styles.cardHeader}>
        <div className={styles.nameSection}>
          <Image
            src="https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg"
            alt="Profile"
            className={styles.profilePic}
            width={100}
            height={100}
            priority={true}
          />
          <span className={styles.employeeName}>
            {pendingLeave?.employeeName}
          </span>
        </div>
        <div className={styles.daysBox}>{pendingLeave?.numberOfDays} days</div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.firstRow}>
          <span className={styles.leaveType}>{pendingLeave?.leaveType}</span>
        </div>

        <div className={styles.secondRow}>
          <span className={styles.date}>
            Start: {dateFormatOnly(pendingLeave?.startDate)}
          </span>
          <span className={styles.date}>
            End: {dateFormatOnly(pendingLeave?.endDate)}
          </span>
        </div>

        <div className={styles.thirdRow}>
          <span>Reason:</span> {pendingLeave?.reason}
        </div>
      </div>
    </div>
  );
};

export default LeaveCard;
