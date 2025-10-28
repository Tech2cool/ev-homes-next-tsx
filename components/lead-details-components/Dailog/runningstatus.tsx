"use client";
import React, { useEffect, useRef, useState } from "react";
import stylerun from "./dailog.module.css";
import styles from "../QuickAccess.module.css";

import ReactDOM from "react-dom";
import { TbArrowsTransferDown } from "react-icons/tb";
import { BiTransferAlt } from "react-icons/bi";
import { MdCancel } from "react-icons/md";

interface RunningStatusProps {
  openclick: React.Dispatch<React.SetStateAction<boolean>>;
}

const RunningStatus: React.FC<RunningStatusProps> = ({ openclick }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        openclick(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openclick]);

  const visits = [
    {

      teamleader: "Ranjna Gupta",
      date: "05 Sep 25 -> 06 Oct 25",
      text: "Transferred from",
      icon: <TbArrowsTransferDown />,
      isCurrent: false,
    },
    {
      teamleader: "Jaspreet Arora",
      date: "05 Oct 25 -> 16 Nov 25",
      text: "Transferred from",
      icon: <TbArrowsTransferDown />,
      isCurrent: true, // highlight this one
    },
    {

      teamleader: "Amit Sharma",
      date: "20 Nov 25 -> 28 Nov 25",
      text: "Transferred from",
      icon: <TbArrowsTransferDown />,
      isCurrent: false,
    },
    {
      teamleader: "Neha Kapoor",
      date: "01 Dec 25 -> 05 Dec 25",
      text: "Transferred from",
      icon: <TbArrowsTransferDown />,
      isCurrent: false,
    },
    {
      teamleader: "Vikram Singh",
      date: "10 Dec 25 -> 20 Dec 25",
      text: "Transferred from",
      icon: <TbArrowsTransferDown />,
      isCurrent: false,
    },
  ];

  return ReactDOM.createPortal(
    <div className={stylerun.dialogOverlay}>
      <div ref={dialogRef} className={stylerun.dialogBox}>
        <h3 className={stylerun.dialogTitle}>Lead Running Status</h3>
        <MdCancel
          onClick={() => openclick(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "red",
            border: "none",
            borderRadius: "50%",
            width: "23px",
            height: "23px",
            cursor: "pointer",
            zIndex: "999",
          }}
        />

        <div className={styles.fullList} style={{ width: "100%" }}>
          {visits.map((item, index) => (
            <div key={index} className={styles.cont}>
              <div className={styles.iconSection}>
                <div
                  className={`${styles.circle} ${item.isCurrent ? styles.visitCircle : ""
                    }`}
                >
                  {React.cloneElement(item.icon, {
                    className: item.isCurrent ? styles.homeicon : styles.callicon,
                  })}
                </div>

                <div className={styles.vlinerun}></div>
              </div>

              <div
                className={`${styles.maincot} ${item.isCurrent ? styles.visitMain : ""
                  }`}
              >

                <div className={styles.firstrow}>
                  <div className={styles.com} style={{ alignItems: "center" }}>
                    <div className={styles.lable}>{item.teamleader}</div>
                    <div className={styles.call}  >
                      <p>{item.date}</p>
                    </div>
                  </div>

                </div>

                <div className={styles.secrow}>

                  <div className={styles.tran} style={{ letterSpacing: "1px", display: "flex", gap: "10px" }}><BiTransferAlt className={styles.icontrans} /> {item.text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RunningStatus;
