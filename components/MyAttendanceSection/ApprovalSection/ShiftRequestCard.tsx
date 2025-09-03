import React from "react";
import styles from "./approvalsection.module.css";
import Image from "next/image";
import { dateFormatOnly } from "@/hooks/useDateFormat";

interface ShiftRequestData {
  employeeName: string;
  shiftrequestdate: Date;
  shift: string;
  reason: string;
  status?: string;
}

interface ShiftRequestCardProps {
  pendingShift: ShiftRequestData;
}

const ShiftRequestCard: React.FC<ShiftRequestCardProps> = ({ pendingShift }) => {
  return (
    <div className={styles.weekoffCard}>
      <div className={styles.shiftCardHeader}>
        <div className={styles.nameSection}>
          <Image
            src="https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg"
            alt="Profile"
            className={styles.profilePic}
            width={100}
            height={100}
            priority
          />
          <span className={styles.employeeName}>{pendingShift.employeeName}</span>
        </div>
        <div className={styles.daysBox}>{dateFormatOnly(pendingShift.shiftrequestdate)}</div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.firstRow}>
          <span className={styles.leaveType}>Shift: {pendingShift.shift}</span>
        </div>

        <div className={styles.thirdRow}>
          <span>Reason:</span> {pendingShift.reason}
        </div>
      </div>
    </div>
  );
};

export default ShiftRequestCard;
