import React, { useRef, useState } from "react";
import styles from "./leaveform.module.css";
import { FaCalendarDay } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";

const WeekOffForm = ({ onCancel }) => {
  const [weekoffdate, setweekoffdate] = useState("");
  const [reason, setreason] = useState("");

  const weekoffDateRef = useRef(null);

  return (
    <div>
      <div className={styles.formHeadline}>Week Off Application Form</div>

      <div
        className={styles.formControl}
        onClick={() => weekoffDateRef.current?.showPicker()}
      >
        <label htmlFor="weekoffdate" className={styles.iconLabel}>
          <FaCalendarDay className={styles.icon} />
          <span>
            WeekOff Date <span style={{ color: "red" }}>*</span>
          </span>
        </label>
        <input
          type="date"
          ref={weekoffDateRef}
          id="weekoffdate"
          value={weekoffdate}
          onChange={(e) => setweekoffdate(e.target.value)}
        />
      </div>

      <div className={styles.formControl}>
        <label htmlFor="reason" className={styles.iconLabel}>
          <MdOutlineFeedback className={styles.icon} />
          <span>
            Reason <span style={{ color: "red" }}>*</span>
          </span>
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setreason(e.target.value)}
          placeholder="Enter your reason"
          rows={4}
        />
      </div>

      <div className={styles.buttonRow}>
        <button className={styles.cancelButton} onClick={onCancel} type="button">
          Cancel
        </button>
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default WeekOffForm;
