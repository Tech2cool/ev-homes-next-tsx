"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./dailog.module.css";
import { MdCancel } from "react-icons/md";


interface AlreadyTaskAssignProps {
  openclick: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlreadyTaskAssign: React.FC<AlreadyTaskAssignProps> = ({ openclick }) => {

  return ReactDOM.createPortal(
    <div className={styles.dialogOverlay}>
      <div className={styles.alertbox}>
        <h3 className={styles.dialogTitle} style={{ color: "#b4a32aff" }}>
          Task Already Assigned
        </h3>
        <MdCancel
          onClick={() => openclick(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "red",
            width: "23px",
            height: "23px",
            cursor: "pointer",
            zIndex: "999",
          }}
        />

        <div className={styles.altertext}>
          <p>The task is already assigned. Do you want to modify it?</p>
        </div>

        <div className={styles.alertdailog}>
          <button
            className={styles.cancelBtn}

          >
            Cancel
          </button>
          <button
            className={styles.submitBtn}

          >
            Modify
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AlreadyTaskAssign;
