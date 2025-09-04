import React from "react";
import styles from "./approvalsection.module.css";
import Image from "next/image";
import { dateFormatOnly } from "@/hooks/useDateFormat";

interface WeekOffData {
  employeeName: string;
  weekoffdate: string | Date;
  appliedOn: string | Date;
  reason: string;
}

interface WeekOffCardProps {
  pendingWeekoff: WeekOffData | null;
}

const WeekOffCard: React.FC<WeekOffCardProps> = ({ pendingWeekoff }) => {
  if (!pendingWeekoff) return null;

  return (
    <div className={styles.weekoffCard}>
      <div className={styles.weekOffCardHeader}>
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
            {pendingWeekoff.employeeName}
          </span>
        </div>
        <div className={styles.daysBox}>
          {dateFormatOnly(pendingWeekoff.weekoffdate)}
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.firstRow}>
          <span className={styles.leaveType}>
            Applied On: {dateFormatOnly(pendingWeekoff.appliedOn)}
          </span>
        </div>

        <div className={styles.thirdRow}>
          <span>Reason:</span> {pendingWeekoff.reason}
        </div>
      </div>
    </div>
  );
};

export default WeekOffCard;
