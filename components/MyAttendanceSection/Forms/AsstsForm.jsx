import React, { useRef, useState } from "react";
import styles from "./leaveform.module.css";
import { FaCalendarDay, FaClock, } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";
import { FaCalendarDays, FaClockRotateLeft, FaTypo3 } from "react-icons/fa6";

function AsstsForm({ onCancel }) {
  const [assetDate, setassetDate] = useState("");
  const [Remark, setRemark] = useState("");
  const [Assettype, setAssettype] = useState("Mobile",)
  const assetDateRef = useRef(null);
  return (
    <div>
      <div className={styles.formHeadline}>Apply Asset Request</div>
      <div
        className={` ${styles.formControl}`}
        onClick={() => assetDateRef.current?.showPicker()}
      >
        <label htmlFor="assetdate">
          <FaCalendarDay />Date <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="date"
          ref={assetDateRef}
          id="assetDate"
          value={assetDate}
          onChange={(e) => setassetDate(e.target.value)}
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="select">
          <FaCalendarDays />Asset Type{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <select name="select" id="select" value={Assettype} onChange={(e) => setAssettype(e.target.value)}>
          <option value="Mobile">Mobile</option>
          <option value="Labtop">Labtop</option>
          <option value="SIM">SIM</option>
        </select>

      </div>

      <div className={styles.formControl}>
        <label htmlFor="remark">
          <MdOutlineFeedback /> Remark <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          id="Remark"
          value={Remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Enter your Remark"
          rows={4}
        />
      </div>
      <div className={styles.buttonRow}>
        <button className={styles.cancelButton} onClick={onCancel}
          type="button">
          Cancel
        </button>
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </div>
    </div>
  );
}

export default AsstsForm;
