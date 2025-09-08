"use client";
import React, { useRef, useState } from "react";
import styles from "./leaveform.module.css";
import { FaCalendarDays } from "react-icons/fa6";
import { MdOutlineFeedback } from "react-icons/md";
import { Clock } from "lucide-react";

interface RegularizationFormProps {
  oncancel: () => void;
}

const RegularizationForm: React.FC<RegularizationFormProps> = ({ oncancel }) => {
  const [checkIn, setcheckIn] = useState<string>("");
  const [checkout, setcheckout] = useState<string>("");
  const [regularizatype, setregularizatype] = useState<string>("Week-Off");
  const [reason, setreason] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const checkInRef = useRef<HTMLInputElement | null>(null);
  const checkOutRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    const payload = {
      regularizationDate: "2025-04-06",
      regularizationType: regularizatype,
      checkIn: regularizatype !== "Week-Off" ? checkIn : "NA",
      checkOut: regularizatype !== "Week-Off" ? checkout : "NA",
      reason,
      appliedOn: new Date().toISOString(),
      status: "pending",
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Regularization submitted:", payload);

      setSuccessMessage("Regularization submitted successfully!");
      setcheckIn("");
      setcheckout("");
      setreason("");
      setregularizatype("Week-Off");

      setTimeout(() => {
        setSuccessMessage("");
        oncancel();
      }, 1500);
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Failed to submit. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formHeadline}>Regularization Form</div>

      <div className={styles.regularizedate}>
        <h6>Regularization date</h6>
        <p>6 April 2025</p>
      </div>

      <div className={styles.formControl}>
        <label htmlFor="select">
          <FaCalendarDays /> Regularization Type <span style={{ color: "red" }}>*</span>
        </label>
        <select
          id="select"
          value={regularizatype}
          onChange={(e) => setregularizatype(e.target.value)}
        >
          <option value="Week-Off">Week Off</option>
          <option value="Present">Present</option>
          <option value="Half-Day">Half Day</option>
        </select>
        <p>You have 2.0 regularizations remaining</p>
      </div>

      {regularizatype !== "Week-Off" && (
        <>
          <div className={styles.formControl} onClick={() => checkInRef.current?.showPicker()}>
            <label><Clock /> Check In <span style={{ color: "red" }}>*</span></label>
            <input
              type="time"
              ref={checkInRef}
              value={checkIn}
              onChange={(e) => setcheckIn(e.target.value)}
              required
            />
          </div>

          <div className={styles.formControl} onClick={() => checkOutRef.current?.showPicker()}>
            <label><Clock /> Check Out <span style={{ color: "red" }}>*</span></label>
            <input
              type="time"
              ref={checkOutRef}
              value={checkout}
              onChange={(e) => setcheckout(e.target.value)}
              required
            />
          </div>
        </>
      )}

      <div className={styles.formControl}>
        <label htmlFor="reason"><MdOutlineFeedback /> Reason <span style={{ color: "red" }}>*</span></label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setreason(e.target.value)}
          placeholder="Enter your reason"
          rows={4}
          required
        />
      </div>

      <div className={styles.buttonRow}>
        <button className={styles.cancelButton} type="button" onClick={oncancel} disabled={loading}>
          Cancel
        </button>
        <button className={styles.submitButton} type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
    </form>
  );
};

export default RegularizationForm;
