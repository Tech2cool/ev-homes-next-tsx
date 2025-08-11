import React from "react";
import styles from "./approvalsection.module.css";
import Image from "next/image";
import { dateFormatOnly, timeFormatOnly } from "@/hooks/useDateFormat";

const RegularizationCard = ({
  pendingRegu,
}) => {
  return (
    <div className={styles.leaveCard}>
      <div className={styles.reguCardHeader}>
        <div className={styles.nameSection}>
          <Image
            src="https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg"
            alt="Profile"
            className={styles.profilePic}
            width={100}
            height={100}
            priority={true}
          />

          <span className={styles.employeeName}>{pendingRegu.employeeName}</span>
        </div>
        <div className={styles.daysBox}>{dateFormatOnly(pendingRegu.appliedOn)}</div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.firstRow}>
          <span className={styles.leaveType}>Regularize Type: {pendingRegu.reguType}</span>
        </div>

        <div className={styles.secondRow}>
          <span className={styles.date}>CheckIn: {timeFormatOnly(pendingRegu.checkIn)}</span>
          <span className={styles.date}>CheckOut: {timeFormatOnly(pendingRegu.checkOut)}</span>
        </div>
        <div className={styles.thirdRow}>
          <span>Reason:</span> {pendingRegu.reason}
        </div>
      </div>
    </div>
  );
};

export default RegularizationCard;
