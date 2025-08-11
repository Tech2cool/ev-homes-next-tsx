import React, { useRef, useState } from "react";
import styles from "./leaveform.module.css";
import { FaCalendarDay, FaFileUpload } from "react-icons/fa";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { MdOutlineFeedback } from "react-icons/md";

const ShiftPlannerForm = ({oncencel}) => {
  const [shiftrequestdate, setshiftrequestdate] = useState("");
  const [reason, setreason] = useState("");

  const shiftPlannerDateRef = useRef(null);

  return (
    <div>
      <div className={styles.formHeadline}>Request Shift Form</div>

      <div className={styles.formControl}>
        <label htmlFor="select">
          <FaPersonWalkingLuggage /> Select Shift{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <select name="select" id="select">
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div
        className={` ${styles.formControl}`}
        onClick={() => shiftPlannerDateRef.current?.showPicker()}
      >
        <label htmlFor="shiftrequestdate">
          <FaCalendarDay /> Request Date <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="date"
          ref={shiftPlannerDateRef}
          id="shiftrequestdate"
          value={shiftrequestdate}
          onChange={(e) => setshiftrequestdate(e.target.value)}
        />
      </div>

      <div className={styles.formControl}>
        <label htmlFor="reason">
          <MdOutlineFeedback /> Reason <span style={{ color: "red" }}>*</span>
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
        <button className={styles.cancelButton} onClick={oncencel} type="button">
          Cancel
        </button>
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ShiftPlannerForm;
