import React, { useRef, useState, useEffect } from "react";
import styles from "./leaveform.module.css";
import { FaCalendarDay, FaFileUpload } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";
import { FaPersonWalkingLuggage } from "react-icons/fa6";

const LeaveForm = ({ oncancel }) => {
  const [leaveType, setLeaveType] = useState("Paid Leave");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [numberleave, setNumberLeave] = useState("");
  const [dayType, setDayType] = useState("full");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  // Calculate number of days automatically
  useEffect(() => {
    if (startdate && enddate) {
      const start = new Date(startdate);
      const end = new Date(enddate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setNumberLeave(diffDays);
    }
  }, [startdate, enddate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      leaveType,
      startdate,
      enddate,
      numberleave,
      dayType,
      reason,
      fileName: file?.name ?? "No file",
      leaveStatus: "pending",
      appliedOn: new Date().toISOString().slice(0, 10), // current date
    };

    console.log("Submitted Dummy Leave Data:", formData);

    alert("Leave submitted (dummy)!");
    oncancel(); // close modal
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formHeadline}>Leave Application Form</div>

      <div className={styles.formControl}>
        <label htmlFor="leaveType">
          <FaPersonWalkingLuggage /> Leave Type{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <select
          id="leaveType"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        >
          <option value="Paid Leave">Paid Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Compensation Leave">Compensation Leave</option>
        </select>
      </div>

      <div className={styles.dateSection}>
        <div
          className={`${styles.formControlForDate} ${styles.formControl}`}
          onClick={() => startDateRef.current?.showPicker()}
        >
          <label htmlFor="startdate">
            <FaCalendarDay /> Start Date <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            ref={startDateRef}
            id="startdate"
            value={startdate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div
          className={`${styles.formControlForDate} ${styles.formControl}`}
          onClick={() => endDateRef.current?.showPicker()}
        >
          <label htmlFor="enddate">
            <FaCalendarDay /> End Date <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            ref={endDateRef}
            id="enddate"
            value={enddate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.formControl}>
        <label htmlFor="numberleave">
          <FaCalendarDay /> Number of Days <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          id="numberleave"
          value={numberleave}
          onChange={(e) => setNumberLeave(e.target.value)}
          placeholder="Enter number of days"
          disabled
        />
      </div>

      <div className={styles.formControl}>
        <input
          type="file"
          id="attachment"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "none" }}
        />

        <div
          className={styles.uploadBox}
          onClick={() => fileInputRef.current.click()}
        >
          <FaFileUpload className={styles.inputIcon} />
          <div>
            <span className={styles.uploadText}>Upload File</span>
          </div>
        </div>

        {file && <span className={styles.fileName}>{file.name}</span>}
      </div>

      <div className={styles.radioSection}>
        <label>
          <input
            type="radio"
            name="dayType"
            value="full"
            checked={dayType === "full"}
            onChange={() => setDayType("full")}
          />
          Full Day
        </label>
        <label>
          <input
            type="radio"
            name="dayType"
            value="half"
            checked={dayType === "half"}
            onChange={() => setDayType("half")}
          />
          Half Day
        </label>
      </div>

      <div className={styles.formControl}>
        <label htmlFor="reason">
          <MdOutlineFeedback /> Reason <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter your reason"
          rows={4}
        />
      </div>

      <div className={styles.buttonRow}>
        <button
          className={styles.cancelButton}
          onClick={oncancel}
          type="button"
        >
          Cancel
        </button>
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default LeaveForm;
