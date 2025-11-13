"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css"
import { IoLocation } from "react-icons/io5";

import ReactDOM from "react-dom";
import { MdCancel } from "react-icons/md";
import { useData } from "@/providers/dataContext";

interface CancelBookingProps {
  openclick: React.Dispatch<React.SetStateAction<boolean>>;
  leadId?: Lead | null; 
}

interface FormState {
  remark: string;
}

const CancelBooking: React.FC<CancelBookingProps> = ({ openclick, leadId }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<FormState>({ remark: "" });
  const { cancelBooking } = useData(); // ✅ access from dataContext

  // Close dialog when clicking outside
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

  const handleCancel = () => {
    setFormData({ remark: "" });
    openclick(false);
  };

  const onChangeField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    const newErrors: { [key: string]: string } = {};  
    if (!formData.remark.trim()) {
      newErrors.remark = "Please enter Remark";
    }
    setErrors(newErrors);


    if (!leadId) {
      alert("Lead ID missing — cannot cancel booking.");
      return;
    }

    const result = await cancelBooking({id:leadId.bookingRef?._id??"",remark: formData.remark});

    console.log(result);
    if (result.success) {
      alert("Booking cancelled successfully!");
      openclick(false);
    } else {
      alert("Failed to cancel booking: " + (result.message || ""));
    }
  };

  const RequiredLabel: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
    <label style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {icon}
      <span>{text}</span>
      <span style={{ color: "red", fontSize: "15px", marginLeft: "-1px" }}>*</span>
    </label>
  );

  return ReactDOM.createPortal(
    <div className={styles.dialogOverlay}>
      <div ref={dialogRef} className={styles.dialogBox}>
        <h3 className={styles.dialogTitle}>🚫 Cancel Booking</h3>
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
        <p
          className={styles.dialogTitle}
          style={{ fontSize: "15px", letterSpacing: "1px", color: "grey" }}
        >
          Please provide a reason for cancellation:
        </p>

        <div className={styles.dailogcnt}>
          <div className={styles.formControl}>
            <RequiredLabel icon={<IoLocation className={styles.iconcolor} />} text="Remark" />
            <textarea
              rows={3}
              placeholder="Reason for Cancellation"
              value={formData.remark}
              name="remark"
              onChange={onChangeField}
            />
            {errors.remark && <p className={styles.errorMsg}>{errors.remark}</p>}
          </div>

          <div className={styles.dialogButtons}>
            <button className={styles.cancelBtn} onClick={handleCancel}>
              Cancel
            </button>
            <button className={styles.submitBtn} onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CancelBooking;
