import React, { useRef, useState, useEffect } from "react";
import styles from "./leaveform.module.css";
import { FaCalendarDay, FaFileUpload } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";
import { FaPersonWalkingLuggage } from "react-icons/fa6";

interface LeaveFormProps {
  oncancel: () => void;
}

const LeaveForm: React.FC<LeaveFormProps> = ({ oncancel }) => {
  const [leaveType, setLeaveType] = useState<string>("Paid Leave");
  const [startdate, setStartDate] = useState<string>("");
  const [enddate, setEndDate] = useState<string>("");
  const [numberleave, setNumberLeave] = useState<number | string>("");
  const [dayType, setDayType] = useState<"full" | "half">("full");
  const [reason, setReason] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const endDateRef = useRef<HTMLInputElement | null>(null);

  // Calculate number of days automatically
  useEffect(() => {
    if (startdate && enddate) {
      const start = new Date(startdate);
      const end = new Date(enddate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setNumberLeave(diffDays);
    }
  }, [startdate, enddate]);

  const handleSubmit = (e: React.FormEvent) => {
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
      appliedOn: new Date().toISOString().slice(0, 10),
    };

    console.log("Submitted Dummy Leave Data:", formData);
    alert("Leave submitted (dummy)!");
    oncancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formHeadline}>Leave Application Form</div>

      <div className={styles.formControl}>
        <label htmlFor="leaveType">
          <FaPersonWalkingLuggage /> Leave Type <span style={{ color: "red" }}>*</span>
        </label>
        <select id="leaveType" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
          <option value="Paid Leave">Paid Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Compensation Leave">Compensation Leave</option>
        </select>
      </div>

      <div className={styles.dateSection}>
        <div className={`${styles.formControlForDate} ${styles.formControl}`} onClick={() => startDateRef.current?.showPicker()}>
          <label htmlFor="startdate">
            <FaCalendarDay /> Start Date <span style={{ color: "red" }}>*</span>
          </label>
          <input type="date" ref={startDateRef} id="startdate" value={startdate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className={`${styles.formControlForDate} ${styles.formControl}`} onClick={() => endDateRef.current?.showPicker()}>
          <label htmlFor="enddate">
            <FaCalendarDay /> End Date <span style={{ color: "red" }}>*</span>
          </label>
          <input type="date" ref={endDateRef} id="enddate" value={enddate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>

      <div className={styles.formControl}>
        <label htmlFor="numberleave">
          <FaCalendarDay /> Number of Days <span style={{ color: "red" }}>*</span>
        </label>
        <input type="text" id="numberleave" value={numberleave} placeholder="Enter number of days" disabled />
      </div>

      <div className={styles.formControl}>
        <input type="file" id="attachment" ref={fileInputRef} onChange={(e) => setFile(e.target.files?.[0] || null)} style={{ display: "none" }} />
        <div className={styles.uploadBox} onClick={() => fileInputRef.current?.click()}>
          <FaFileUpload className={styles.inputIcon} />
          <div><span className={styles.uploadText}>Upload File</span></div>
        </div>
        {file && <span className={styles.fileName}>{file.name}</span>}
      </div>

      <div className={styles.radioSection}>
        <label>
          <input type="radio" name="dayType" value="full" checked={dayType === "full"} onChange={() => setDayType("full")} />
          Full Day
        </label>
        <label>
          <input type="radio" name="dayType" value="half" checked={dayType === "half"} onChange={() => setDayType("half")} />
          Half Day
        </label>
      </div>

      <div className={styles.formControl}>
        <label htmlFor="reason">
          <MdOutlineFeedback /> Reason <span style={{ color: "red" }}>*</span>
        </label>
        <textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Enter your reason" rows={4} />
      </div>

      <div className={styles.buttonRow}>
        <button className={styles.cancelButton} onClick={oncancel} type="button">Cancel</button>
        <button className={styles.submitButton} type="submit">Submit</button>
      </div>
    </form>
  );
};

export default LeaveForm;
