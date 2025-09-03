import React from "react";
import styles from "./approvalsection.module.css";
import Image from "next/image";
import { dateFormatOnly } from "@/hooks/useDateFormat";

// ✅ Define TypeScript interface for reimbursement data
export interface ReimbursementData {
  employeeName: string;
  reimDate: Date;
  reimburseType: string;
  amount: number;
  remark: string;
  status?: string;
}

interface ReimbursementCardProps {
  pendingReim: ReimbursementData;
}

const ReimbursementCard: React.FC<ReimbursementCardProps> = ({ pendingReim }) => {
  return (
    <div className={styles.leaveCard}>
      <div className={styles.reimCardHeader}>
        <div className={styles.nameSection}>
          <Image
            src="https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg"
            alt="Profile"
            className={styles.profilePic}
            width={100}
            height={100}
            priority
          />
          <span className={styles.employeeName}>{pendingReim.employeeName}</span>
        </div>
        <div className={styles.daysBox}>{dateFormatOnly(pendingReim.reimDate)}</div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.firstRow}>
          <span className={styles.leaveType}>
            Reimburse Type: {pendingReim.reimburseType}
          </span>
        </div>

        <div className={styles.secondRow}>
          <span className={styles.date}>Amount: {pendingReim.amount}</span>
        </div>

        <div className={styles.thirdRow}>
          <span>Remark:</span> {pendingReim.remark}
        </div>
      </div>
    </div>
  );
};

export default ReimbursementCard;
