"use client";
import React from "react";
import styles from "./QuickAccess.module.css";
import { FaCheck } from "react-icons/fa";

const VisitHistory = () => {
  const visits = [
    {
      status: "Virtual Meeting",
      teamleader: "Ranjna Gupta",
      date: "05 Sep 25 ",
      cpFeedback: "CP confirmed site visit scheduled.",
      evFeedback: "EV team assigned for visit coordination.",
      icon: <FaCheck />,
      
    },
    {
      status: "Revisit",
      teamleader: "Jaspreet Arora",
      date: "05 Oct 25 ",
      cpFeedback: "CP confirmed site visit scheduled.",
      evFeedback: "EV team assigned for visit coordination.",
      icon: <FaCheck />,
      
    },
  ];

  return (
    <div className={styles.teamplat}>
      <div className={styles.fullList}>
        {visits.map((item, index) => (
          <div key={index} className={styles.cont}>
          
            <div className={styles.iconSection}>
              <div className={styles.circle}>
                {React.cloneElement(item.icon, {
                  className:  styles.callicon,
                })}
              </div>
              {index !== visits.length - 1 && <div className={styles.vline}></div>}
            </div>

            
            <div className={styles.maincot} >
              <div className={styles.tag}>{item.status}</div>

              <div className={styles.firstrow}>
                <div className={styles.com} style={{alignItems:"center"}}>
                  <div className={styles.lable}>{item.teamleader}</div>
                  <div className={styles.date }>{item.date}</div>
                </div>
                
              </div>

              <div className={styles.secrow}>
                <div className={styles.feedback}>CP Feedback</div>
                <div className={styles.conts}>{item.cpFeedback}</div>
              </div>

              <div className={styles.secrow}>
                <div className={styles.feedback}>EV Feedback</div>
                <div className={styles.conts}>{item.evFeedback}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitHistory;
