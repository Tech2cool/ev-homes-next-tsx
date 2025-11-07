"use client";
import React from "react";
import styles from "../QuickAccess.module.css";
import { FaCheck } from "react-icons/fa";
import { Phone } from "lucide-react";

const BookingFeedback = () => {
  const visits = [
    {
      status: "moderate",
      teamleader: "Hiral Joshi",
      date: "05 Sep 25 19:24",
      feedback: "Don't received the call.",
      icon: <Phone />,
      
    },
    {
      status: "NA",
      teamleader: "NA",
      date: "05 Oct 25 20:24",
      feedback: "Don't received the call.",
      icon: <Phone />,
      
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
                <div className={styles.feedback}>Feedback</div>
                <div className={styles.conts}>{item.feedback}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingFeedback;
