import React from "react";
import styles from "./approvalsection.module.css";
import Image from "next/image";
import { dateFormatOnly } from "@/hooks/useDateFormat";

const AssetCard = ({ pendingAsset }) => {
  return (
    <div className={styles.leaveCard}>
      <div className={styles.assetCardHeader}>
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
            {pendingAsset.employeeName}
          </span>
        </div>
        <div className={styles.daysBox}>{pendingAsset.quantity} No.</div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.firstRow}>
          <span className={styles.leaveType}>
            Asset Type: {pendingAsset.assetType}
          </span>
        </div>

        <div className={styles.secondRow}>
          <span className={styles.date}>
            Date: {dateFormatOnly(pendingAsset.assetDate)}
          </span>
        </div>

        <div className={styles.thirdRow}>
          <span>Remark:</span> {pendingAsset.remark}
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
