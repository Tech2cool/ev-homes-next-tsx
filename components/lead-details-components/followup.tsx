"use client";
import React from "react";
import styles from "./QuickAccess.module.css";
import { IoCall } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

const FollowUp = () => {
  const followUps = [
    {
      name: "Renu Thapa",
      status: "No Status",
      callType: "Call Received",
      date: "25 Sep 25 (02:01 PM)",
      feedback: "He said right now not looking any property.",
      icon: <IoCall />,
      isVisit: false,
    },
    {
      name: "Rahul Mehra",
      status: "Moderate",
      callType: "Call Busy",
      date: "28 Sep 25 (11:45 AM)",
      feedback: "Will call back in evening for discussion.",
      icon: <IoCall />,
      isVisit: false,
    },
    {
      name: "Neha Kapoor",
      status: "Interested",
      callType: "Call Done",
      date: "02 Oct 25 (04:22 PM)",
      feedback: "Interested in visiting property this weekend.",
      icon: <IoCall />,
      isVisit: false,
    },
    {
      // 🏠 The last (special) card
      status: "Completed",
      siteVisit: "Site Visit",
      visits: "Visits",
      date: "05 Oct 25 (03:10 PM)",
      cpFeedback: "CP confirmed site visit scheduled.",
      evFeedback: "EV team assigned for visit coordination.",
      icon: <FaHome />,
      isVisit: true,
    },
  ];

  return (
    <div className={styles.teamplat}>
      <div className={styles.fullList}>
        {followUps.map((item, index) => (
          <div key={index} className={styles.cont}>
            <div className={styles.iconSection}>
              <div
                className={`${styles.circle} ${
                  item.isVisit ? styles.visitCircle : ""
                }`}
              >
                {React.cloneElement(item.icon, {
                  className: item.isVisit
                    ? styles.homeicon
                    : styles.callicon,
                })}
              </div>

              {index !== followUps.length - 1 && (
                <div className={styles.vline}></div>
              )}
            </div>

            <div
              className={`${styles.maincot} ${
                item.isVisit ? styles.visitMain : ""
              }`}
            >
              <div className={styles.tag}>{item.status}</div>

              {!item.isVisit ? (
                <>
                  <div className={styles.firstrow}>
                    <div className={styles.com}>
                      <div className={styles.lable}>{item.name}</div>
                      <div className={styles.call}  >
                        <p>{item.callType}</p>
                      </div>
                    </div>
                    <div className={styles.date}>{item.date}</div>
                  </div>

                  <div className={styles.secrow}>
                    <div className={styles.feedback}>Feedback</div>
                    <div className={styles.conts}>{item.feedback}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.firstrow}>
                    <div className={styles.com}>
                      <div className={styles.lable}>{item.siteVisit}</div>
                      <div className={styles.callgreen}>
                        <p>{item.visits}</p>
                      </div>
                    </div>
                    <div className={styles.date}>{item.date}</div>
                  </div>

                  <div className={styles.secrow}>
                    <div className={styles.feedback}>CP Feedback</div>
                    <div className={styles.conts}>{item.cpFeedback}</div>
                  </div>

                  <div className={styles.secrow}>
                    <div className={styles.feedback}>EV Feedback</div>
                    <div className={styles.conts}>{item.evFeedback}</div>
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
