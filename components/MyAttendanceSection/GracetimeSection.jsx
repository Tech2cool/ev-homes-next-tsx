import React from "react";
import styles from "./gracetimesection.module.css";
import Image from "next/image";
import GraImg from "../../public/images/Banquet hall.png"
const GracetimeSection = () => {
  return (
    <div className={styles.templet}>
      <div className={styles.lablesection}>
        You have <span style={{ color: "red" }}>3 </span>grace day avalaible.
      </div>
      <div className={styles.maincontainer}>
        <div className={styles.card}>
          <div className={styles.headlline}>
            <div className={styles.leftSection}>
              <Image
                src={GraImg}
                alt="profile"
                className={styles.profileImage}
                width={100}
                height={100}
              />
              <div className={styles.name}>Mahek Tulve</div>
            </div>
            <div className={styles.shift}>11am to 7pm</div>
          </div>
          <div className={styles.infocard}>
            <div className={styles.checkin}>
              <Image
                src={GraImg}
                alt="checkin"
                className={styles.photo}
                width={100}
                height={100}
              />
              <div className={styles.infolable}>Check In</div>
              <div className={styles.infovalue}>11:26am</div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.checkin}>
              <Image
               src={GraImg}
                alt="checkin"
                className={styles.photo}
                width={100}
                height={100}
              />
              <div className={styles.infolable}>Check Out</div>
              <div className={styles.infovalue}>07:26pm</div>
            </div>
          </div>
          <button className={styles.button}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default GracetimeSection;
