"use client";
import React from "react";
import styles from "./QuickAccess.module.css";

const BookingOverview = () => {
  return (
    <div className={styles.bosec}>
      <div className={styles.boctn}>
        <div className={styles.bonamerow}>
          <div className={styles.boname}>Deepak Test</div>
          <div className={`${styles.bostatus} ${styles.pending}`}>Pending</div>
        </div>

        <div className={styles.boid}>EST/25-26/175</div>

        <div className={styles.bonbtnctn}>
          <div className={styles.bocull}>
            <div className={styles.bolable}>Final Price</div>
            <div className={styles.bobtn}>₹ 36,40,000</div>
          </div>

          <div className={styles.bocull}>
            <div className={styles.bolable}>Expected</div>
            <div className={styles.bobtn}>₹ 36,40,000</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingOverview;
